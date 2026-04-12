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
Route::get('/certificate/verify/{certificate_no}', [\App\Http\Controllers\Api\CertificateController::class, 'verify']);

// ─── AUTHENTICATED ROUTES ───────────────────────────────────────
Route::middleware('auth:api')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/user', [AuthController::class, 'user']);

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
        Route::get('/users', [\App\Http\Controllers\Api\AdminController::class, 'users']);
        Route::patch('/users/{id}/role', [\App\Http\Controllers\Api\AdminController::class, 'updateRole']);
        Route::delete('/users/{id}', [\App\Http\Controllers\Api\AdminController::class, 'deleteUser']);

        // Admin Certificate Control
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
    Route::get('/trainer/dashboard', [\App\Http\Controllers\Api\TrainerDashboardController::class, 'index']);
    Route::post('/courses', [CourseController::class, 'store']);
    Route::put('/courses/{course}', [CourseController::class, 'update']);
    Route::delete('/courses/{course}', [CourseController::class, 'destroy']);
    Route::post('/courses/{course}/toggle-publish', [CourseController::class, 'togglePublish']);
    Route::post('/courses/{course}/modules', [CourseController::class, 'createModule']);
    Route::post('/modules/{module}/lessons', [CourseController::class, 'createLesson']);
    Route::post('/categories', [CourseController::class, 'createCategory']);
});
