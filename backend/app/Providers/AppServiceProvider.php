<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use App\Models\BankAccount;
use App\Observers\BankAccountObserver;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        // Daftarkan Observer di sini
        BankAccount::observe(BankAccountObserver::class);
    }
}
