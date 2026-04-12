<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        // Enrollments
        Schema::create('enrollments', function (Blueprint $table) {
            $table->string('id', 30)->primary();
            $table->string('status')->default('ACTIVE'); // ACTIVE, COMPLETED, PAUSED, DROPPED
            $table->double('progress')->default(0); // 0.0 to 100.0
            $table->dateTime('completed_at')->nullable();
            $table->string('user_id', 30);
            $table->string('course_id', 30);
            $table->timestamps();

            $table->foreign('user_id')->references('id')->on('users');
            $table->foreign('course_id')->references('id')->on('courses');
            $table->unique(['user_id', 'course_id']);
        });

        // Lesson Progress
        Schema::create('lesson_progress', function (Blueprint $table) {
            $table->string('id', 30)->primary();
            $table->boolean('completed')->default(false);
            $table->integer('time_spent')->default(0); // seconds
            $table->dateTime('completed_at')->nullable();
            $table->string('user_id', 30);
            $table->string('lesson_id', 30);
            $table->timestamps();

            $table->foreign('lesson_id')->references('id')->on('lessons')->onDelete('cascade');
            $table->unique(['user_id', 'lesson_id']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('lesson_progress');
        Schema::dropIfExists('enrollments');
    }
};
