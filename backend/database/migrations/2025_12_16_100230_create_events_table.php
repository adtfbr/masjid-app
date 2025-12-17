<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('events', function (Blueprint $table) {
            $table->id();
            $table->string('title'); // Judul: Kajian Subuh
            $table->string('slug')->unique(); // kajian-subuh
            $table->string('category'); // Kajian, Sosial, Pendidikan
            $table->string('speaker')->nullable(); // Ustadz Fulan
            $table->string('location')->default('Masjid Al-Huda');

            // Waktu
            $table->date('date'); // 2025-12-25
            $table->string('time'); // 04:30 - Selesai

            $table->text('description')->nullable();
            $table->string('image')->nullable(); // Poster
            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('events');
    }
};
