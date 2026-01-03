<?php

namespace App\Observers;

use App\Models\BankAccount;
use Illuminate\Support\Facades\Cache;

class BankAccountObserver
{
    /**
     * Handle the BankAccount "created" event.
     */
    public function created(BankAccount $bankAccount): void
    {
        $this->clearHomeCache();
    }

    /**
     * Handle the BankAccount "updated" event.
     */
    public function updated(BankAccount $bankAccount): void
    {
        $this->clearHomeCache();
    }

    /**
     * Handle the BankAccount "deleted" event.
     */
    public function deleted(BankAccount $bankAccount): void
    {
        $this->clearHomeCache();
    }

    /**
     * Handle the BankAccount "restored" event.
     */
    public function restored(BankAccount $bankAccount): void
    {
        $this->clearHomeCache();
    }

    /**
     * Handle the BankAccount "force deleted" event.
     */
    public function forceDeleted(BankAccount $bankAccount): void
    {
        $this->clearHomeCache();
    }

    /**
     * Helper untuk menghapus cache halaman depan
     */
    private function clearHomeCache(): void
    {
        // Hapus cache dengan key yang sama seperti di PublicDataController
        Cache::forget('home_public_data');
    }
}
