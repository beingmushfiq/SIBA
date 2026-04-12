<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Course;
use App\Models\Enrollment;
use Illuminate\Http\Request;

class TrainerDashboardController extends Controller
{
    /**
     * Get trainer overview metrics and courses
     */
    public function index(Request $request)
    {
        $user = $request->user();

        // Ensure only TRAINER or ADMIN can access
        if (!in_array($user->role, ['TRAINER', 'ADMIN'])) {
            return response()->json(['error' => 'Unauthorized'], 403);
        }

        $courses = Course::withCount(['enrollments', 'modules'])
            ->where('trainer_id', $user->id)
            ->latest()
            ->get();

        $totalStudents = $courses->sum('enrollments_count');
        $totalRevenue = 0; // If you wanted to sum price * enrollments: $courses->sum(fn($c) => $c->price * $c->enrollments_count);

        return response()->json([
            'metrics' => [
                'totalCourses' => $courses->count(),
                'totalStudents' => $totalStudents,
                'activeStudents' => $totalStudents, // Simplified
            ],
            'courses' => $courses->map(function($course) {
                return [
                    'id' => $course->id,
                    'title' => $course->title,
                    'slug' => $course->slug,
                    'price' => $course->price,
                    'level' => $course->level,
                    'published' => $course->published,
                    'enrollments_count' => $course->enrollments_count,
                    'modules_count' => $course->modules_count,
                    'created_at' => $course->created_at,
                ];
            })
        ]);
    }
}
