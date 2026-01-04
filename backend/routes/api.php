<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\PublicDataController;
use App\Http\Controllers\Api\PrayerTimeController;
use App\Http\Controllers\Api\Admin\AuthController;
use App\Http\Controllers\Api\Admin\ExpenseController;
use App\Http\Controllers\Api\Admin\DonationController; // <--- Import ini

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
*/

// === PUBLIC ROUTES ===
Route::get('/public/initial-data', [PublicDataController::class, 'getInitialData']);
Route::post('/donations', [PublicDataController::class, 'storeDonation']);
Route::get('/prayer-times', [PrayerTimeController::class, 'getDailySchedule']);

// === ADMIN AUTH ===
Route::post('/admin/login', [AuthController::class, 'login']);

// === PROTECTED ADMIN ROUTES ===
Route::middleware(['auth:sanctum'])->prefix('admin')->group(function () {

    Route::get('/me', [AuthController::class, 'me']);
    Route::post('/logout', [AuthController::class, 'logout']);

    // Manajemen
    Route::apiResource('expenses', ExpenseController::class);
    Route::apiResource('donations', DonationController::class); // <--- Tambahkan ini
});
