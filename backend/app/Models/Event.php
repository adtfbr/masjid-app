<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Event extends Model
{
    use HasFactory;

    protected $guarded = ['id'];

    protected $casts = [
        'start_time' => 'datetime',
        'end_time' => 'datetime',
        'is_active' => 'boolean',
    ];

    // --- SCOPE PENTING INI MUNGKIN HILANG/BELUM ADA ---
    public function scopeUpcoming($query)
    {
        return $query->where('start_time', '>=', now())
                     ->where('is_active', true)
                     ->orderBy('start_time', 'asc');
    }
}
