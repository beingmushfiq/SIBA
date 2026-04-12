<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\Course;
use App\Models\Enrollment;
use Illuminate\Http\Request;

class AdminController extends Controller
{
    /**
     * System statistics for Admin Dashboard
     */
    public function stats()
    {
        $totalUsers = User::count();
        $studentCount = User::where('role', 'STUDENT')->count();
        $trainerCount = User::where('role', 'TRAINER')->count();
        $mentorCount = User::where('role', 'MENTOR')->count();

        $totalCourses = Course::count();
        $publishedCourses = Course::where('published', true)->count();

        $totalEnrollments = Enrollment::count();
        $completedEnrollments = Enrollment::where('status', 'COMPLETED')->count();

        $recentUsers = User::select('id', 'name', 'email', 'role', 'created_at')
            ->latest()
            ->take(5)
            ->get();

        return response()->json([
            'metrics' => [
                ['label' => 'Total Users', 'value' => $totalUsers, 'icon' => 'Users'],
                ['label' => 'Active Students', 'value' => $studentCount, 'icon' => 'GraduationCap'],
                ['label' => 'Platform Trainers', 'value' => $trainerCount, 'icon' => 'ShieldCheck'],
                ['label' => 'Active Mentors', 'value' => $mentorCount, 'icon' => 'UserSearch'],
                ['label' => 'Total Courses', 'value' => $totalCourses, 'icon' => 'BookOpen'],
                ['label' => 'Published', 'value' => $publishedCourses, 'icon' => 'Globe'],
                ['label' => 'Enrollments', 'value' => $totalEnrollments, 'icon' => 'UserCheck'],
                ['label' => 'Completions', 'value' => $completedEnrollments, 'icon' => 'CheckCircle2'],
            ],
            'recentUsers' => $recentUsers
        ]);
    }

    /**
     * List all users with pagination
     */
    public function users(Request $request)
    {
        $users = User::latest()->paginate(20);
        return response()->json($users);
    }

    /**
     * Update user role
     */
    public function updateRole(Request $request, $id)
    {
        $request->validate([
            'role' => 'required|in:STUDENT,TRAINER,MENTOR,ADMIN'
        ]);

        $user = User::findOrFail($id);
        $user->role = $request->role;
        $user->save();

        return response()->json(['success' => true, 'user' => $user]);
    }

    /**
     * Delete user
     */
    public function deleteUser($id)
    {
        $user = User::findOrFail($id);
        // Prevent deleting self
        if (auth()->id() === $user->id) {
            return response()->json(['error' => 'Cannot delete yourself.'], 400);
        }
        $user->delete();
        return response()->json(['success' => true]);
    }
}
