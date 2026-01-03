<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
{
    Schema::create('bank_accounts', function (Blueprint $table) {
        $table->id();
        $table->string('bank_name');      // Misal: BSI
        $table->string('account_number'); // Misal: 7299xxx
        $table->string('account_name');   // Misal: Masjid Al Huda
        $table->string('qris_image')->nullable(); // Path gambar QRIS
        $table->boolean('is_active')->default(true); // Agar bisa ganti-ganti rekening aktif
        $table->timestamps();
    });
}

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('bank_accounts');
    }
};
