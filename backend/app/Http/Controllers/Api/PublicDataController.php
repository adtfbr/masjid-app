<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\BankAccount;
use App\Models\Donation;
use App\Models\Event;
use App\Models\Expense;
use Illuminate\Http\Request;

class PublicDataController extends Controller
{
    public function getInitialData()
    {
        try {
            // 1. Ambil Data Kegiatan Akan Datang (Limit 3)
            $events = Event::upcoming()->take(3)->get();

            // 2. Ambil Rekening Aktif
            $bankAccounts = BankAccount::where('is_active', true)->get();

            // 3. Hitung Keuangan (Financial Summary)
            $totalIncome = Donation::verified()->sum('amount');
            $totalExpense = Expense::sum('amount');
            $balance = $totalIncome - $totalExpense;

            // 4. Mutasi Transaksi Terakhir (Gabungan Donasi & Pengeluaran)

            // FIX: Tambahkan toBase() agar menjadi koleksi standar, bukan Eloquent Collection
            $latestDonations = Donation::verified()->latest()->limit(5)->get()->toBase()->map(function ($item) {
                return [
                    'id' => 'd-' . $item->id,
                    'type' => 'in',
                    'date' => $item->created_at,
                    'description' => 'Donasi: ' . $item->donor_name,
                    'amount' => $item->amount,
                ];
            });

            // FIX: Tambahkan toBase() di sini juga
            $latestExpenses = Expense::latest()->limit(5)->get()->toBase()->map(function ($item) {
                return [
                    'id' => 'e-' . $item->id,
                    'type' => 'out',
                    // Pastikan field tanggal sesuai database
                    'date' => $item->created_at ?? $item->expense_date,
                    'description' => $item->title,
                    'amount' => $item->amount,
                ];
            });

            // Sekarang merge akan aman karena keduanya adalah Base Collection
            $mutations = $latestDonations->merge($latestExpenses)
                ->sortByDesc('date')
                ->values()
                ->take(7);

            return response()->json([
                'success' => true,
                'data' => [
                    'masjid_info' => [
                        'name' => 'Masjid Al-Huda',
                        'address' => 'Jl. Tole Iskandar No.3, Mekar Jaya, Depok',
                    ],
                    'events' => $events,
                    'bank_accounts' => $bankAccounts,
                    'financial' => [
                        'balance' => $balance,
                        'total_income' => $totalIncome,
                        'total_expense' => $totalExpense,
                        'mutations' => $mutations
                    ],
                ]
            ]);


        } catch (\Exception $e) {
            return response()->json([
                'error' => true,
                'message' => $e->getMessage(),
                'file' => $e->getFile(),
                'line' => $e->getLine()
            ], 500);
        }
    }

    public function storeDonation(Request $request)
    {
        $validated = $request->validate([
            'donor_name' => 'required|string|max:255',
            'amount' => 'required|numeric|min:1000',
            'bank_account_id' => 'nullable|exists:bank_accounts,id',
            'donor_phone' => 'nullable|string',
            'notes' => 'nullable|string',
            'proof_file' => 'nullable|image|max:2048'
        ]);

        $proofPath = null;
        if ($request->hasFile('proof_file')) {
            $proofPath = $request->file('proof_file')->store('donations', 'public');
        }

        $donation = Donation::create([
            'donor_name' => $validated['donor_name'],
            'amount' => $validated['amount'],
            'bank_account_id' => $validated['bank_account_id'] ?? null,
            'donor_phone' => $validated['donor_phone'],
            'notes' => $validated['notes'],
            'proof_file' => $proofPath,
            'status' => 'pending'
        ]);

        return response()->json([
            'message' => 'Terima kasih! Donasi Anda sedang diverifikasi.',
            'data' => $donation
        ], 201);
    }
}
