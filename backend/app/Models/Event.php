<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Event extends Model
{
    use HasFactory;

    // Izinkan semua kolom diisi (Mass Assignment)
    protected $guarded = [];

    // Casting tipe data agar tanggal & status terbaca benar
    protected $casts = [
        'date' => 'date',
        'is_active' => 'boolean',
    ];
}
