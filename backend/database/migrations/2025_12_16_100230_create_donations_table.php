<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('donations', function (Blueprint $table) {
            $table->id();

            // RELASI BARU: Menghubungkan donasi ke rekening bank tertentu
            // onDelete('set null') artinya jika rekening dihapus, data donasi TETAP ADA tapi bank_id jadi null
            $table->foreignId('bank_account_id')->nullable()->constrained('bank_accounts')->onDelete('set null');

            $table->string('donor_name')->default('Hamba Allah');
            $table->string('donor_email')->nullable();
            $table->string('donor_phone')->nullable(); // Penting untuk fitur konfirmasi WA

            $table->decimal('amount', 15, 2); // Nominal
            $table->string('proof_file')->nullable(); // Foto bukti transfer
            $table->text('notes')->nullable(); // Doa donatur

            // Status verifikasi admin
            $table->enum('status', ['pending', 'verified', 'rejected'])->default('pending');

            $table->timestamps();
            $table->softDeletes(); // Fitur "Sampah", kalau dihapus admin tidak langsung hilang permanen
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('donations');
    }
};
