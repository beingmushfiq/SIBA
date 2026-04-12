<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        // Quizzes
        Schema::create('quizzes', function (Blueprint $table) {
            $table->string('id', 30)->primary();
            $table->string('title');
            $table->text('description')->nullable();
            $table->json('questions');
            $table->integer('passing_score')->default(70);
            $table->integer('time_limit')->nullable();
            $table->string('module_id', 30);
            $table->timestamps();

            $table->foreign('module_id')->references('id')->on('modules')->onDelete('cascade');
        });

        // Quiz Attempts
        Schema::create('quiz_attempts', function (Blueprint $table) {
            $table->string('id', 30)->primary();
            $table->integer('score');
            $table->json('answers');
            $table->boolean('passed');
            $table->string('quiz_id', 30);
            $table->string('user_id', 30);
            $table->timestamps();

            $table->foreign('quiz_id')->references('id')->on('quizzes')->onDelete('cascade');
        });

        // Tasks
        Schema::create('tasks', function (Blueprint $table) {
            $table->string('id', 30)->primary();
            $table->string('title');
            $table->text('instructions');
            $table->json('rubric')->nullable();
            $table->dateTime('due_date')->nullable();
            $table->string('type')->default('ASSIGNMENT'); // ASSIGNMENT, PROJECT, SCENARIO
            $table->integer('max_score')->default(100);
            $table->string('module_id', 30);
            $table->timestamps();

            $table->foreign('module_id')->references('id')->on('modules')->onDelete('cascade');
        });

        // Submissions
        Schema::create('submissions', function (Blueprint $table) {
            $table->string('id', 30)->primary();
            $table->text('content');
            $table->string('file_url')->nullable();
            $table->integer('score')->nullable();
            $table->text('feedback')->nullable();
            $table->string('status')->default('PENDING'); // PENDING, REVIEWED, REVISION_NEEDED, APPROVED
            $table->string('task_id', 30);
            $table->string('user_id', 30);
            $table->dateTime('reviewed_at')->nullable();
            $table->timestamps();

            $table->foreign('task_id')->references('id')->on('tasks')->onDelete('cascade');
            $table->foreign('user_id')->references('id')->on('users');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('submissions');
        Schema::dropIfExists('tasks');
        Schema::dropIfExists('quiz_attempts');
        Schema::dropIfExists('quizzes');
    }
};
