<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\MentorAssignment;
use App\Models\LiveSession;
use Illuminate\Http\Request;

class MentorDashboardController extends Controller
{
    /**
     * Get mentor overview stats and assigned students
     */
    public function index(Request $request)
    {
        $mentorId = $request->user()->id;

        // Fetch students assigned to this mentor
        $assignments = MentorAssignment::where('mentor_id', $mentorId)
            ->with(['student' => function($q) {
                $q->select('id', 'name', 'email', 'avatar');
            }])
            ->get();

        // Fetch upcoming coaching sessions
        $sessions = LiveSession::where('trainer_id', $mentorId)
            ->where('scheduled_at', '>=', now())
            ->orderBy('scheduled_at', 'asc')
            ->get();

        // Calculate completion rate based on assigned students progress
        $completionRate = $assignments->count() > 0 
            ? round($assignments->avg('student.enrollments.*.progress') ?? 0) . '%'
            : '0%';

        return response()->json([
            'metrics' => [
                ['label' => 'Assigned Students', 'value' => $assignments->count(), 'icon' => 'Users', 'color' => '#6366f1'],
                ['label' => 'Upcoming Sessions', 'value' => $sessions->count(), 'icon' => 'Video', 'color' => '#10b981'],
                ['label' => 'Total Students', 'value' => $assignments->count(), 'icon' => 'GraduationCap', 'color' => '#f59e0b'],
                ['label' => 'Avg Progress', 'value' => $completionRate, 'icon' => 'TrendingUp', 'color' => '#ec4899'],
            ],
            'assignments' => $assignments,
            'sessions' => $sessions
        ]);
    }

    /**
     * Get details for a specific student assignment
     */
    public function studentDetail(Request $request, $studentId)
    {
        $mentorId = $request->user()->id;
        
        $assignment = MentorAssignment::where('mentor_id', $mentorId)
            ->where('student_id', $studentId)
            ->with(['student.enrollments.course'])
            ->firstOrFail();

        return response()->json($assignment);
    }
}
