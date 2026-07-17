<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('settings', function (Blueprint $table) {
            $table->id();
            $table->string('site_name')->default('AprilCake');
            $table->string('site_tagline')->default('Homemade with Love');
            $table->string('hero_title_line1')->default('Kue Spesial untuk');
            $table->string('hero_title_line2')->default('Momen Berharga');
            $table->text('hero_description')->nullable();
            $table->string('hero_image')->nullable();
            $table->string('phone')->nullable();
            $table->string('whatsapp')->nullable();
            $table->string('instagram')->nullable();
            $table->string('tiktok')->nullable();
            $table->string('address')->nullable();
            $table->string('hours_weekday')->nullable();
            $table->string('hours_weekend')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('settings');
    }
};
