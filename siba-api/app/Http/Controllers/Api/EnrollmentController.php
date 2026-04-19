<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Enrollment;
use App\Models\ActivityLog;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class EnrollmentController extends Controller
{
    /**
     * POST /api/enrollments
     * Replaces: actions/enrollments.ts → enrollInCourse()
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'course_id' => 'required|exists:courses,id',
        ]);

        $userId = $request->user()->id;

        // Check if already enrolled
        $existing = Enrollment::where('user_id', $userId)
            ->where('course_id', $validated['course_id'])
            ->first();

        if ($existing) {
            return response()->json(['error' => 'You are already enrolled in this course'], 409);
        }

        $enrollment = Enrollment::create([
            'user_id' => $userId,
            'course_id' => $validated['course_id'],
            'status' => 'ACTIVE',
            'progress' => 0,
        ]);

        // Log activity
        ActivityLog::create([
            'user_id' => $userId,
            'action' => 'ENROLLMENT',
            'details' => json_encode(['course_id' => $validated['course_id']]),
        ]);

        \App\Models\Notification::create([
            'user_id' => $userId,
            'type' => 'ENROLLMENT',
            'title' => 'Enrollment Successful',
            'message' => 'You have joined a new course. Start your first lesson today!',
            'read' => false
        ]);

        return response()->json(['success' => true, 'enrollment' => $enrollment], 201);
    }
}
