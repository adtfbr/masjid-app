<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Event;
use App\Models\Donation;
use App\Models\BankAccount; // Pastikan model ini sudah dibuat
use Illuminate\Http\Request;
use Carbon\Carbon;
use Illuminate\Support\Facades\Cache;

class PublicDataController extends Controller
{
    public function getHomeData()
    {
        // Cache data selama 1 jam (3600 detik) agar database tidak jebol saat traffic tinggi
        $data = Cache::remember('home_public_data', 3600, function () {

            // 1. Ambil Event (3 terdekat)
            $events = Event::where('is_active', true)
                ->whereDate('date', '>=', Carbon::today())
                ->orderBy('date', 'asc')
                ->take(3)
                ->get();

            // 2. Hitung Total Saldo (Hanya yang verified)
            $totalDonation = Donation::where('status', 'verified')->sum('amount');

            // 3. Hitung Pemasukan Bulan Ini
            $donationThisMonth = Donation::where('status', 'verified')
                ->whereMonth('created_at', Carbon::now()->month)
                ->whereYear('created_at', Carbon::now()->year)
                ->sum('amount');

            // 4. Ambil 10 Donasi Terakhir untuk Running Text
            $recentDonations = Donation::where('status', 'verified')
                ->orderBy('created_at', 'desc')
                ->take(10)
                ->get(['donor_name', 'amount', 'category', 'created_at']);

            // 5. Ambil Data Rekening & QRIS yang Aktif
            $bank = BankAccount::where('is_active', true)->first();

            return [
                'events' => $events,
                'financial' => [
                    'total_balance' => number_format($totalDonation, 0, ',', '.'),
                    'income_month' => number_format($donationThisMonth, 0, ',', '.'),
                    'last_update' => Carbon::now()->translatedFormat('d F Y H:i'),
                ],
                'recent_donations' => $recentDonations->map(function($d) {
                    return [
                        'name' => $d->donor_name,
                        'amount' => number_format($d->amount, 0, ',', '.'),
                        'category' => $d->category,
                        'time' => $d->created_at->diffForHumans(),
                    ];
                }),
                // Data Bank untuk Frontend
                'bank_account' => $bank ? [
                    'bank' => $bank->bank_name,
                    'number' => $bank->account_number,
                    'name' => $bank->account_name,
                    // Pastikan storage sudah dilink: php artisan storage:link
                    'qris_url' => $bank->qris_image ? asset('storage/' . $bank->qris_image) : null,
                ] : null,
            ];
        });

        return response()->json([
            'success' => true,
            'data' => $data
        ]);
    }
}
