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

        // Recalculate enrollment progress (Lessons + Quizzes)
        $totalItems = \App\Models\Lesson::whereHas('module', function($q) use ($enrollment) {
            $q->where('course_id', $enrollment->course_id);
        })->count() + \App\Models\Quiz::whereHas('module', function($q) use ($enrollment) {
            $q->where('course_id', $enrollment->course_id);
        })->count();

        $completedLessons = Progress::where('enrollment_id', $enrollment->id)
            ->where('completed', true)
            ->count();
        
        $passedQuizzes = \App\Models\QuizAttempt::where('user_id', $user->id)
            ->where('passed', true)
            ->whereIn('quiz_id', \App\Models\Quiz::whereHas('module', function($q) use ($enrollment) {
                $q->where('course_id', $enrollment->course_id);
            })->pluck('id'))
            ->count();

        $percentage = $totalItems > 0 ? (($completedLessons + $passedQuizzes) / $totalItems) * 100 : 0;
        $enrollment->update(['progress' => $percentage]);

        return response()->json([
            'success' => true,
            'progress' => $progress,
            'percentage' => $percentage
        ]);
    }
}
