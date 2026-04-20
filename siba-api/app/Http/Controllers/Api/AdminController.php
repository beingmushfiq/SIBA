<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\Course;
use App\Models\Enrollment;
use App\Models\Certificate;
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
     * Get analytics data for dashboard
     */
    public function analytics()
    {
        $activeUsers = User::where('is_active', true)->count();
        $totalEnrollments = Enrollment::count();
        $totalCompleted = Enrollment::where('status', 'COMPLETED')->count();
        $completionRate = $totalEnrollments > 0 ? round(($totalCompleted / $totalEnrollments) * 100) : 0;
        $totalCertificates = Certificate::count();

        // Course completion data
        $courseCompletionData = Course::withCount(['enrollments', 'enrollments as completed_count' => function($query) {
            $query->where('status', 'COMPLETED');
        }])
        ->take(10)
        ->get()
        ->map(function($course) {
            return [
                'course' => $course->title,
                'enrolled' => $course->enrollments_count,
                'completed' => $course->completed_count,
                'rate' => $course->enrollments_count > 0 
                    ? round(($course->completed_count / $course->enrollments_count) * 100) 
                    : 0
            ];
        });

        // Top Performers based on progress/score
        $topPerformers = Enrollment::with(['user:id,name', 'course:id,title'])
            ->orderBy('progress', 'desc')
            ->take(5)
            ->get()
            ->map(function($en) {
                return [
                    'name' => $en->user->name ?? 'Unknown',
                    'course' => $en->course->title ?? 'Deleted Course',
                    'score' => round($en->progress), 
                    'badge' => ''
                ];
            });

        // User Growth (last 12 months)
        $userGrowth = [];
        for ($i = 0; $i < 12; $i++) {
            $month = now()->subMonths($i);
            $count = User::whereMonth('created_at', $month->month)
                ->whereYear('created_at', $month->year)
                ->count();
            
            $userGrowth[] = [
                'label' => $month->format('M'),
                'value' => $count
            ];
        }

        return response()->json([
            'stats' => [
                'activeUsers' => $activeUsers,
                'completionRate' => $completionRate,
                'avgSession' => '0m',
                'certificatesIssued' => $totalCertificates
            ],
            'courseCompletionData' => $courseCompletionData,
            'topPerformers' => $topPerformers,
            'userGrowth' => array_reverse($userGrowth)
        ]);
    }

    /**
     * Revenue dashboard data
     */
    public function revenue()
    {
        $totalRevenue = Enrollment::join('courses', 'enrollments.course_id', '=', 'courses.id')
            ->sum('courses.price');
            
        $recentTransactions = Enrollment::with(['user', 'course'])
            ->latest()
            ->take(10)
            ->get()
            ->map(function($en) {
                return [
                    'id' => $en->id,
                    'student' => $en->user->name ?? 'Unknown',
                    'course' => $en->course->title ?? 'Deleted Course',
                    'amount' => $en->course->price ?? 0,
                    'date' => $en->created_at->format('Y-m-d'),
                    'type' => 'enrollment'
                ];
            });

        $trend = [];
        for ($i = 0; $i < 12; $i++) {
            $month = now()->subMonths($i);
            $rev = Enrollment::join('courses', 'enrollments.course_id', '=', 'courses.id')
                ->whereMonth('enrollments.created_at', $month->month)
                ->whereYear('enrollments.created_at', $month->year)
                ->sum('courses.price');
                
            $trend[] = [
                'month' => $month->format('M'),
                'revenue' => $rev
            ];
        }

        return response()->json([
            'totalRevenue' => $totalRevenue,
            'thisMonth' => $trend[0]['revenue'],
            'transactionsCount' => Enrollment::count(),
            'avgOrderValue' => Enrollment::count() > 0 ? $totalRevenue / Enrollment::count() : 0,
            'transactions' => $recentTransactions,
            'trend' => array_reverse($trend)
        ]);
    }

    /**
     * Export revenue data to CSV
     */
    public function exportRevenue(Request $request)
    {
        $headers = [
            'Content-Type' => 'text/csv',
            'Content-Disposition' => 'attachment; filename="siba_revenue_' . date('Y-m-d') . '.csv"',
            'Pragma' => 'no-cache',
            'Cache-Control' => 'must-revalidate, post-check=0, pre-check=0',
            'Expires' => '0',
        ];

        $transactions = Enrollment::with(['user:id,name', 'course:id,title'])
            ->orderBy('created_at', 'desc')
            ->get();

        $callback = function() use ($transactions) {
            $file = fopen('php://output', 'w');
            fputcsv($file, ['ID', 'Student', 'Course', 'Amount', 'Date', 'Status']);

            foreach ($transactions as $tx) {
                fputcsv($file, [
                    $tx->id,
                    $tx->user->name ?? 'N/A',
                    $tx->course->title ?? 'N/A',
                    $tx->course->price ?? 0,
                    $tx->created_at->format('Y-m-d H:i:s'),
                    $tx->status
                ]);
            }
            fclose($file);
        };

        return response()->stream($callback, 200, $headers);
    }

    /**
     * User management
     */
    public function users(Request $request)
    {
        $query = User::latest();
        if ($request->has('search')) {
            $search = $request->search;
            $query->where(function($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                  ->orWhere('email', 'like', "%{$search}%");
            });
        }
        return response()->json(['users' => $query->get()]);
    }

    public function storeUser(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:8',
            'role' => 'required|in:STUDENT,TRAINER,MENTOR,ADMIN',
        ]);

        $user = User::create([
            ...$validated,
            'is_active' => true,
        ]);

        return response()->json(['success' => true, 'user' => $user], 201);
    }

    public function updateUser(Request $request, $id)
    {
        $user = User::findOrFail($id);
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => "required|string|email|max:255|unique:users,email,{$id}",
            'role' => 'required|in:STUDENT,TRAINER,MENTOR,ADMIN',
        ]);

        $user->update($validated);
        return response()->json(['success' => true, 'user' => $user]);
    }

    public function toggleUserStatus($id)
    {
        $user = User::findOrFail($id);
        if (auth()->id() === $user->id) return response()->json(['error' => 'Self-deactivation denied.'], 400);
        $user->is_active = !$user->is_active;
        $user->save();
        return response()->json(['success' => true, 'is_active' => $user->is_active]);
    }

    public function bulkUpdateRole(Request $request)
    {
        $validated = $request->validate([
            'user_ids' => 'required|array',
            'user_ids.*' => 'exists:users,id',
            'role' => 'required|in:STUDENT,TRAINER,MENTOR,ADMIN',
        ]);

        User::whereIn('id', $validated['user_ids'])->update(['role' => $validated['role']]);
        return response()->json(['success' => true]);
    }

    public function deleteUser($id)
    {
        $user = User::findOrFail($id);
        if (auth()->id() === $user->id) return response()->json(['error' => 'Self-deletion denied.'], 400);
        $user->delete();
        return response()->json(['success' => true]);
    }

    /**
     * Get all enrollments for Admin
     */
    public function getEnrollments()
    {
        $enrollments = Enrollment::with(['user:id,name', 'course:id,title'])
            ->latest()
            ->paginate(50);

        return response()->json([
            'enrollments' => $enrollments->map(function($en) {
                return [
                    'id' => $en->id,
                    'student' => $en->user->name ?? 'Unknown',
                    'course' => $en->course->title ?? 'Deleted Course',
                    'status' => $en->status,
                    'progress' => $en->progress,
                    'enrolled' => $en->created_at->format('Y-m-d')
                ];
            })
        ]);
    }
}
