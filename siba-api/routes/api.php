<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\CourseController;
use App\Http\Controllers\Api\EnrollmentController;
use Illuminate\Support\Facades\Route;

// ─── PUBLIC ROUTES ──────────────────────────────────────────────
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

// Public catalog (no auth needed)
Route::get('/courses', [CourseController::class, 'index']);
Route::get('/courses/{slug}', [CourseController::class, 'show']);
Route::get('/mentors', [\App\Http\Controllers\Api\MentorController::class, 'index']);
Route::get('/certificate/verify/{certificate_no}', [\App\Http\Controllers\Api\CertificateController::class, 'verify']);
Route::get('/settings', [\App\Http\Controllers\Api\SettingController::class, 'index']);

// ─── AUTHENTICATED ROUTES ───────────────────────────────────────
Route::middleware('auth:api')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/user', [AuthController::class, 'user']);
    Route::post('/user/profile', [AuthController::class, 'updateProfile']);
    Route::post('/user/avatar', [AuthController::class, 'updateAvatar']);

    // Notifications API
    Route::get('/notifications', [\App\Http\Controllers\Api\NotificationController::class, 'index']);
    Route::post('/notifications/mark-read', [\App\Http\Controllers\Api\NotificationController::class, 'markAllAsRead']);
    Route::post('/notifications/{id}/mark-read', [\App\Http\Controllers\Api\NotificationController::class, 'markAsRead']);

    // Student Protected API
    Route::get('/student/dashboard', [\App\Http\Controllers\Api\StudentDashboardController::class, 'index']);
    Route::get('/student/enrollment/{slug}', [\App\Http\Controllers\Api\StudentDashboardController::class, 'learningPath']);
    
    // Progress API
    Route::post('/progress/update', [\App\Http\Controllers\Api\ProgressController::class, 'markCompleted']);

    // Business Tracking
    Route::get('/business', [\App\Http\Controllers\Api\BusinessController::class, 'index']);
    Route::post('/business', [\App\Http\Controllers\Api\BusinessController::class, 'storePlan']);
    Route::post('/business/entries', [\App\Http\Controllers\Api\BusinessController::class, 'storeEntry']);
    Route::post('/business/{plan}/ai-advice', [\App\Http\Controllers\Api\AiController::class, 'generateAdvice']);

    // Certificates
    Route::get('/certificates', [\App\Http\Controllers\Api\CertificateController::class, 'index']);
    Route::post('/certificates/claim', [\App\Http\Controllers\Api\CertificateController::class, 'claim']);

    // Enrollment API
    Route::post('/enroll', [\App\Http\Controllers\Api\EnrollmentController::class, 'enroll']);

    // Admin API
    Route::middleware('role:ADMIN')->prefix('admin')->group(function () {
        Route::get('/stats', [\App\Http\Controllers\Api\AdminController::class, 'stats']);
        Route::get('/analytics', [\App\Http\Controllers\Api\AdminController::class, 'analytics']);
        Route::get('/users', [\App\Http\Controllers\Api\AdminController::class, 'users']);
        Route::post('/users', [\App\Http\Controllers\Api\AdminController::class, 'storeUser']);
        Route::put('/users/{id}', [\App\Http\Controllers\Api\AdminController::class, 'updateUser']);
        Route::post('/users/bulk-role', [\App\Http\Controllers\Api\AdminController::class, 'bulkUpdateRole']);
        Route::post('/users/{id}/toggle-status', [\App\Http\Controllers\Api\AdminController::class, 'toggleUserStatus']);
        Route::patch('/users/{id}/role', [\App\Http\Controllers\Api\AdminController::class, 'updateRole']);
        Route::delete('/users/{id}', [\App\Http\Controllers\Api\AdminController::class, 'deleteUser']);
        Route::get('/revenue', [\App\Http\Controllers\Api\AdminController::class, 'revenue']);
        Route::get('/revenue/export', [\App\Http\Controllers\Api\AdminController::class, 'exportRevenue']);
        Route::get('/enrollments', [\App\Http\Controllers\Api\AdminController::class, 'getEnrollments']);
        
        // Settings
        Route::post('/settings', [\App\Http\Controllers\Api\SettingController::class, 'update']);
        Route::post('/settings/logo', [\App\Http\Controllers\Api\SettingController::class, 'uploadLogo']);

        // Admin Certificate Control
        Route::post('/certificates', [\App\Http\Controllers\Api\CertificateController::class, 'store']);
        Route::post('/certificates/{id}/revoke', [\App\Http\Controllers\Api\CertificateController::class, 'revoke']);
        Route::post('/certificates/{id}/reissue', [\App\Http\Controllers\Api\CertificateController::class, 'reissue']);
    });

    // Enrollments
    Route::post('/enrollments', [EnrollmentController::class, 'store']);

    // Mentor API
    Route::middleware('role:MENTOR,ADMIN')->prefix('mentor')->group(function () {
        Route::get('/dashboard', [\App\Http\Controllers\Api\MentorDashboardController::class, 'index']);
        Route::get('/students/{studentId}', [\App\Http\Controllers\Api\MentorDashboardController::class, 'studentDetail']);
    });

    // Admin/Trainer routes
    Route::get('/trainer/dashboard', [TrainerDashboardController::class, 'index']);
    Route::get('/trainer/students', [TrainerDashboardController::class, 'students']);
    Route::post('/courses', [CourseController::class, 'store']);
    Route::put('/courses/{course}', [CourseController::class, 'update']);
    Route::delete('/courses/{course}', [CourseController::class, 'destroy']);
    Route::post('/courses/{course}/toggle-publish', [CourseController::class, 'togglePublish']);
    Route::post('/courses/{course}/modules', [CourseController::class, 'createModule']);
    Route::patch('/modules/{module}', [CourseController::class, 'updateModule']);
    Route::delete('/modules/{module}', [CourseController::class, 'deleteModule']);
    Route::post('/courses/{course}/modules/reorder', [CourseController::class, 'reorderModules']);
    
    Route::post('/modules/{module}/lessons', [CourseController::class, 'createLesson']);
    Route::patch('/lessons/{lesson}', [CourseController::class, 'updateLesson']);
    Route::delete('/lessons/{lesson}', [CourseController::class, 'deleteLesson']);
    Route::post('/modules/{module}/lessons/reorder', [CourseController::class, 'reorderLessons']);
    Route::post('/categories', [CourseController::class, 'createCategory']);
    
    // Quiz Management & Submissions
    Route::post('/modules/{module}/quizzes', [CourseController::class, 'storeQuiz']);
    Route::patch('/quizzes/{quiz}', [CourseController::class, 'updateQuiz']);
    Route::delete('/quizzes/{quiz}', [CourseController::class, 'deleteQuiz']);
    Route::post('/quizzes/{quiz}/submit', [\App\Http\Controllers\Api\QuizController::class, 'submit']);
});
