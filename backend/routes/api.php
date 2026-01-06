<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\PublicDataController;
use App\Http\Controllers\Api\PrayerTimeController;
use App\Http\Controllers\Api\Admin\AuthController;
use App\Http\Controllers\Api\Admin\ExpenseController;
use App\Http\Controllers\Api\Admin\DonationController;
use App\Http\Controllers\Api\Admin\EventController;
use App\Http\Controllers\Api\Admin\BankAccountController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
*/

// =======================================================
// PUBLIC ROUTES (RATE LIMITED)
// =======================================================

Route::middleware('throttle:60,1')->group(function () {
    Route::get('/public/initial-data', [PublicDataController::class, 'getInitialData']);
    Route::get('/prayer-times', [PrayerTimeController::class, 'getDailySchedule']);
});

Route::middleware('throttle:10,1')->group(function () {
    Route::post('/donations', [PublicDataController::class, 'storeDonation']);
});

// =======================================================
// ADMIN AUTH (RATE LIMITED KETAT)
// =======================================================

Route::middleware('throttle:5,1')->group(function () {
    Route::post('/admin/login', [AuthController::class, 'login']);
});

// =======================================================
// PROTECTED ADMIN ROUTES
// =======================================================

Route::middleware(['auth:sanctum', 'throttle:60,1'])
    ->prefix('admin')
    ->group(function () {

        Route::get('/me', [AuthController::class, 'me']);
        Route::post('/logout', [AuthController::class, 'logout']);

        // ===== CRUD =====
        Route::apiResource('expenses', ExpenseController::class);
        Route::apiResource('donations', DonationController::class);
        Route::apiResource('events', EventController::class)->except(['show']);
        Route::apiResource('bank-accounts', BankAccountController::class)->except(['show']);

        // ✅ TOGGLE EVENT (SATU-SATUNYA)
        Route::patch('/events/{event}/toggle', [EventController::class, 'toggle']);

    });
