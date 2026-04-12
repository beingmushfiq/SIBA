<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Progress;
use App\Models\Enrollment;
use Illuminate\Http\Request;

class ProgressController extends Controller
{
    /**
     * Mark a lesson as completed
     */
    public function markCompleted(Request $request)
    {
        $validated = $request->validate([
            'enrollment_id' => 'required|string',
            'lesson_id' => 'required|string',
        ]);

        $user = $request->user();

        // Verify enrollment belongs to user
        $enrollment = Enrollment::where('id', $validated['enrollment_id'])
            ->where('user_id', $user->id)
            ->firstOrFail();

        // Update or Create Progress
        $progress = Progress::updateOrCreate(
            [
                'enrollment_id' => $enrollment->id,
                'lesson_id' => $validated['lesson_id'],
            ],
            [
                'completed' => true,
                'completed_at' => now(),
            ]
        );

        return response()->json([
            'success' => true,
            'progress' => $progress
        ]);
    }
}
