<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        // Certificates
        Schema::create('certificates', function (Blueprint $table) {
            $table->string('id', 30)->primary();
            $table->string('certificate_no')->unique();
            $table->string('verification_hash')->unique();
            $table->string('user_id', 30);
            $table->string('course_id', 30);
            $table->date('issue_date');
            $table->string('pdf_path')->nullable();
            $table->enum('status', ['issued', 'revoked'])->default('issued');
            $table->timestamps();

            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
            $table->foreign('course_id')->references('id')->on('courses')->onDelete('cascade');
        });

        // Mentor Assignments
        Schema::create('mentor_assignments', function (Blueprint $table) {
            $table->string('id', 30)->primary();
            $table->string('mentor_id', 30);
            $table->string('student_id', 30);
            $table->string('course_id', 30)->nullable();
            $table->timestamps();

            $table->foreign('mentor_id')->references('id')->on('users');
            $table->foreign('student_id')->references('id')->on('users');
            $table->unique(['mentor_id', 'student_id']);
        });

        // Live Sessions
        Schema::create('live_sessions', function (Blueprint $table) {
            $table->string('id', 30)->primary();
            $table->string('title');
            $table->text('description')->nullable();
            $table->dateTime('scheduled_at');
            $table->integer('duration')->default(60);
            $table->string('meeting_url')->nullable();
            $table->string('status')->default('SCHEDULED'); // SCHEDULED, LIVE, COMPLETED, CANCELLED
            $table->string('trainer_id', 30);
            $table->timestamps();

            $table->foreign('trainer_id')->references('id')->on('users');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('live_sessions');
        Schema::dropIfExists('mentor_assignments');
        Schema::dropIfExists('certificates');
    }
};
