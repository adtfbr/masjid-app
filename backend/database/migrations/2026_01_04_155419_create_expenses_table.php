<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('expenses', function (Blueprint $table) {
            $table->id();

            // Mencatat SIAPA admin yang menginput data ini
            $table->foreignId('user_id')->constrained('users');

            $table->string('title'); // Contoh: Bayar Listrik
            $table->text('description')->nullable();

            $table->decimal('amount', 15, 2); // Nominal keluar

            // Kategori
            $table->enum('category', ['operasional', 'pembangunan', 'sosial', 'honor', 'lainnya'])->default('operasional');

            $table->date('expense_date'); // Tanggal transaksi
            $table->string('proof_file')->nullable(); // Foto nota

            $table->timestamps();
            $table->softDeletes();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('expenses');
    }
};
