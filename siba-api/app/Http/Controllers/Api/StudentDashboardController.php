<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Enrollment;
use App\Models\Course;
use Illuminate\Http\Request;

class StudentDashboardController extends Controller
{
    /**
     * Get the student dashboard overview
     */
    public function index(Request $request)
    {
        $user = $request->user();

        // 1. Get Active Enrollments
        $enrollments = Enrollment::with([
            'course.category',
            'course.trainer'
        ])
        ->where('user_id', $user->id)
        ->latest()
        ->get();

        // Map progress data. Simplified for now.
        $enrichedEnrollments = $enrollments->map(function ($enrollment) {
            $course = $enrollment->course;
            
            // In a real app we'd calculate via progress records
            // Here we use a fake completion percentage based on time for demo, 
            // or we evaluate against actual progress table.
            $progressRecords = $enrollment->progress;
            $completedCount = $progressRecords ? clone($progressRecords)->where('completed', true)->count() : 0;
            $totalLessons = $course->modules()->withCount('lessons')->get()->sum('lessons_count');
            
            $percentage = $totalLessons > 0 ? round(($completedCount / $totalLessons) * 100) : 0;

            return [
                'id' => $enrollment->id,
                'status' => $enrollment->status,
                'progress_percentage' => $percentage,
                'course' => [
                    'id' => $course->id,
                    'title' => $course->title,
                    'slug' => $course->slug,
                    'level' => $course->level,
                    'category' => $course->category->name ?? 'Uncategorized',
                    'trainer' => $course->trainer->name ?? 'Unknown',
                ]
            ];
        });

        // 2. Metrics
        $totalCompleted = $enrollments->where('status', 'COMPLETED')->count();
        $inProgress = $enrollments->where('status', 'ACTIVE')->count();
        $totalCertificates = \App\Models\Certificate::where('user_id', $user->id)->count();

        return response()->json([
            'metrics' => [
                'inProgress' => $inProgress,
                'completed' => $totalCompleted,
                'totalCertificates' => $totalCertificates,
            ],
            'enrollments' => $enrichedEnrollments
        ]);
    }

    /**
     * Get learning path payload for the specific course
     */
    public function learningPath(Request $request, $slug)
    {
        $user = $request->user();
        
        $course = Course::where('slug', $slug)
            ->with([
                'modules' => function ($query) {
                    $query->orderBy('order_idx');
                },
                'modules.lessons' => function ($query) {
                    $query->orderBy('order_idx');
                }
            ])
            ->firstOrFail();

        $enrollment = Enrollment::with('progress')
            ->where('user_id', $user->id)
            ->where('course_id', $course->id)
            ->first();

        if (!$enrollment) {
            return response()->json(['error' => 'Not enrolled in this course'], 403);
        }

        return response()->json([
            'course' => $course,
            'enrollment' => $enrollment,
            'progress' => $enrollment->progress
        ]);
    }
}
