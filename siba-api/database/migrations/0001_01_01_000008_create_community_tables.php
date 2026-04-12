<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        // Discussions
        Schema::create('discussions', function (Blueprint $table) {
            $table->string('id', 30)->primary();
            $table->string('title');
            $table->text('content');
            $table->string('course_id', 30);
            $table->string('user_id', 30);
            $table->timestamps();

            $table->foreign('course_id')->references('id')->on('courses')->onDelete('cascade');
            $table->foreign('user_id')->references('id')->on('users');
        });

        // Replies
        Schema::create('replies', function (Blueprint $table) {
            $table->string('id', 30)->primary();
            $table->text('content');
            $table->string('discussion_id', 30);
            $table->string('user_id', 30);
            $table->timestamps();

            $table->foreign('discussion_id')->references('id')->on('discussions')->onDelete('cascade');
            $table->foreign('user_id')->references('id')->on('users');
        });

        // Notifications
        Schema::create('notifications', function (Blueprint $table) {
            $table->string('id', 30)->primary();
            $table->string('type'); // ENROLLMENT, SUBMISSION, REMINDER, SYSTEM
            $table->string('title');
            $table->text('message');
            $table->boolean('read')->default(false);
            $table->string('user_id', 30);
            $table->timestamps();

            $table->foreign('user_id')->references('id')->on('users');
        });

        // Activity Logs
        Schema::create('activity_logs', function (Blueprint $table) {
            $table->string('id', 30)->primary();
            $table->string('action');
            $table->text('details')->nullable();
            $table->string('user_id', 30);
            $table->timestamps();

            $table->foreign('user_id')->references('id')->on('users');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('activity_logs');
        Schema::dropIfExists('notifications');
        Schema::dropIfExists('replies');
        Schema::dropIfExists('discussions');
    }
};
