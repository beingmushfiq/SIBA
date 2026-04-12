<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        // Business Plans
        Schema::create('business_plans', function (Blueprint $table) {
            $table->string('id', 30)->primary();
            $table->string('title');
            $table->text('description')->nullable();
            $table->string('stage')->default('IDEA'); // IDEA, PLAN, EXECUTION, REVENUE, GROWTH
            $table->double('revenue')->default(0);
            $table->json('kpis')->nullable();
            $table->string('user_id', 30);
            $table->timestamps();

            $table->foreign('user_id')->references('id')->on('users');
        });

        // Business Entries
        Schema::create('business_entries', function (Blueprint $table) {
            $table->string('id', 30)->primary();
            $table->string('title');
            $table->text('notes')->nullable();
            $table->json('metrics')->nullable();
            $table->double('revenue')->default(0);
            $table->string('business_plan_id', 30);
            $table->timestamps();

            $table->foreign('business_plan_id')->references('id')->on('business_plans')->onDelete('cascade');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('business_entries');
        Schema::dropIfExists('business_plans');
    }
};
