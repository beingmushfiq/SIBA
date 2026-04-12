<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        // Categories
        Schema::create('categories', function (Blueprint $table) {
            $table->string('id', 30)->primary();
            $table->string('name')->unique();
            $table->string('icon')->nullable();
            $table->string('color')->nullable();
            $table->timestamps();
        });

        // Courses
        Schema::create('courses', function (Blueprint $table) {
            $table->string('id', 30)->primary();
            $table->string('title');
            $table->string('slug')->unique();
            $table->text('description');
            $table->string('thumbnail')->nullable();
            $table->double('price')->default(0);
            $table->string('level')->default('BEGINNER');
            $table->boolean('published')->default(false);
            $table->boolean('featured')->default(false);
            $table->string('trainer_id', 30);
            $table->string('category_id', 30)->nullable();
            $table->timestamps();

            $table->foreign('trainer_id')->references('id')->on('users')->onDelete('cascade');
            $table->foreign('category_id')->references('id')->on('categories')->onDelete('set null');
        });

        // Modules
        Schema::create('modules', function (Blueprint $table) {
            $table->string('id', 30)->primary();
            $table->string('title');
            $table->text('description')->nullable();
            $table->integer('order');
            $table->string('type')->default('CORE'); // ORIENTATION, CORE, PRACTICAL, EVALUATION, CERTIFICATION
            $table->string('course_id', 30);
            $table->timestamps();

            $table->foreign('course_id')->references('id')->on('courses')->onDelete('cascade');
        });

        // Lessons
        Schema::create('lessons', function (Blueprint $table) {
            $table->string('id', 30)->primary();
            $table->string('title');
            $table->longText('content');
            $table->string('video_url')->nullable();
            $table->json('resources')->nullable();
            $table->integer('duration')->nullable();
            $table->integer('order');
            $table->string('module_id', 30);
            $table->timestamps();

            $table->foreign('module_id')->references('id')->on('modules')->onDelete('cascade');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('lessons');
        Schema::dropIfExists('modules');
        Schema::dropIfExists('courses');
        Schema::dropIfExists('categories');
    }
};
