<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Quiz;
use App\Models\QuizAttempt;
use App\Models\Enrollment;
use Illuminate\Http\Request;

class QuizController extends Controller
{
    /**
     * Submit quiz answers
     */
    public function submit(Request $request, Quiz $quiz)
    {
        $validated = $request->validate([
            'answers' => 'required|array',
            'enrollment_id' => 'required|exists:enrollments,id',
        ]);

        $questions = $quiz->questions;
        $totalQuestions = count($questions);
        $correctAnswers = 0;

        foreach ($request->answers as $qIdx => $selectedOpt) {
            if (isset($questions[$qIdx]) && $questions[$qIdx]['correct'] == $selectedOpt) {
                $correctAnswers++;
            }
        }

        $score = ($correctAnswers / $totalQuestions) * 100;
        $passed = $score >= $quiz->passing_score;

        $attempt = QuizAttempt::create([
            'score' => $score,
            'answers' => $request->answers,
            'passed' => $passed,
            'quiz_id' => $quiz->id,
            'user_id' => auth()->id(),
        ]);

        if ($passed) {
            $enrollment = Enrollment::find($validated['enrollment_id']);
            
            $totalItems = \App\Models\Lesson::whereHas('module', function($q) use ($enrollment) {
                $q->where('course_id', $enrollment->course_id);
            })->count() + \App\Models\Quiz::whereHas('module', function($q) use ($enrollment) {
                $q->where('course_id', $enrollment->course_id);
            })->count();

            $completedLessons = \App\Models\Progress::where('enrollment_id', $enrollment->id)
                ->where('completed', true)
                ->count();
            
            $passedQuizzes = QuizAttempt::where('user_id', auth()->id())
                ->where('passed', true)
                ->whereIn('quiz_id', \App\Models\Quiz::whereHas('module', function($q) use ($enrollment) {
                    $q->where('course_id', $enrollment->course_id);
                })->pluck('id'))
                ->count();

            $percentage = $totalItems > 0 ? (($completedLessons + $passedQuizzes) / $totalItems) * 100 : 0;
            $enrollment->update(['progress' => $percentage]);
        }

        return response()->json([
            'success' => true,
            'attempt' => $attempt,
            'score' => $score,
            'passed' => $passed,
        ]);
    }
}
