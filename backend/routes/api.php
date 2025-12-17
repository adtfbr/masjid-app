<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\PublicDataController;
use App\Http\Controllers\Api\PrayerTimeController; // <-- Pastikan baris ini ada


Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

// Route Jadwal Sholat
Route::get('/prayer-times', [PrayerTimeController::class, 'getDailySchedule']);
Route::get('/public-data', [PublicDataController::class, 'getHomeData']);
