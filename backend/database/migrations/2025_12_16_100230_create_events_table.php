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
            $table->string('title'); // Judul Kajian
            $table->string('slug')->unique(); // Untuk URL: masjid.com/agenda/kajian-subuh
            $table->text('description')->nullable();
            $table->string('lecturer')->nullable(); // Nama Ustadz
            $table->string('location')->default('Masjid Al-Huda');

            // Perubahan: Menggunakan dateTime agar bisa dihitung countdown-nya
            $table->dateTime('start_time');
            $table->dateTime('end_time')->nullable();

            $table->string('poster')->nullable();
            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('events');
    }
};
