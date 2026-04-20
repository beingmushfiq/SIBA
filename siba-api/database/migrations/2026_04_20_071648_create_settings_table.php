<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('settings', function (Blueprint $table) {
            $table->id();
            $table->string('key')->unique();
            $table->text('value')->nullable();
            $table->string('type')->default('text'); // text, image, boolean, json
            $table->string('group')->default('general'); // general, design, social
            $table->timestamps();
        });

        // Seed some default settings
        DB::table('settings')->insert([
            ['key' => 'site_name', 'value' => 'SIBA Training Platform', 'type' => 'text', 'group' => 'general'],
            ['key' => 'site_logo', 'value' => null, 'type' => 'image', 'group' => 'design'],
            ['key' => 'site_favicon', 'value' => null, 'type' => 'image', 'group' => 'design'],
            ['key' => 'contact_email', 'value' => 'admin@siba.com', 'type' => 'text', 'group' => 'general'],
        ]);
    }

    public function down(): void
    {
        Schema::dropIfExists('settings');
    }
};
