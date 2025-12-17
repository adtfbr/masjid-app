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
            $table->string('donor_name')->default('Hamba Allah');
            $table->decimal('amount', 15, 2); // Nominal uang
            $table->string('category'); // Operasional, Yatim, dll
            $table->string('payment_method')->default('manual'); // Manual / QRIS
            $table->string('status')->default('pending'); // pending, verified
            $table->text('notes')->nullable(); // Pesan doa
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('donations');
    }
};
