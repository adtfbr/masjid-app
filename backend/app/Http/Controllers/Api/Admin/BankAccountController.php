<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Models\BankAccount;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class BankAccountController extends Controller
{
    protected $casts = [
    'is_active' => 'boolean',
];

    public function index()
    {
        return response()->json([
            'success' => true,
            'data' => BankAccount::orderBy('created_at', 'desc')->get(),
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'bank_name'       => 'required|string|max:255',
            'account_number' => 'required|string|max:255',
            'account_holder' => 'required|string|max:255',
            'logo'           => 'nullable|image|mimes:jpg,jpeg,png,webp|max:2048',
        ]);

        // ✅ CAST is_active KE 0 / 1 (AMAN UNTUK MYSQL)
        $isActive = filter_var(
            $request->input('is_active', true),
            FILTER_VALIDATE_BOOLEAN
        );

        $logoPath = null;
        if ($request->hasFile('logo')) {
            $logoPath = $request->file('logo')->store('qris-images', 'public');
        }

        $bank = BankAccount::create([
            'bank_name'       => $validated['bank_name'],
            'account_number' => $validated['account_number'],
            'account_holder' => $validated['account_holder'],
            'logo'            => $logoPath,
            'is_active'       => $isActive ? 1 : 0, // 🔥 KUNCI FIX
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Rekening berhasil ditambahkan',
            'data' => $bank,
        ], 201);
    }

    public function update(Request $request, BankAccount $bankAccount)
    {
        $validated = $request->validate([
            'bank_name'       => 'required|string|max:255',
            'account_number' => 'required|string|max:255',
            'account_holder' => 'required|string|max:255',
            'logo'           => 'nullable|image|mimes:jpg,jpeg,png,webp|max:2048',
        ]);

        // ✅ CAST is_active KE 0 / 1 (AMAN UNTUK MYSQL)
        $isActive = filter_var(
            $request->input('is_active', $bankAccount->is_active),
            FILTER_VALIDATE_BOOLEAN
        );

        if ($request->hasFile('logo')) {
            if ($bankAccount->logo && Storage::disk('public')->exists($bankAccount->logo)) {
                Storage::disk('public')->delete($bankAccount->logo);
            }

            $bankAccount->logo = $request->file('logo')->store('qris-images', 'public');
        }

        $bankAccount->update([
            'bank_name'       => $validated['bank_name'],
            'account_number' => $validated['account_number'],
            'account_holder' => $validated['account_holder'],
            'is_active'       => $isActive ? 1 : 0, // 🔥 KUNCI FIX
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Rekening berhasil diperbarui',
            'data' => $bankAccount,
        ]);
    }

    public function destroy(BankAccount $bankAccount)
    {
        $bankAccount->update([
            'is_active' => 0,
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Rekening berhasil dinonaktifkan',
        ]);
    }
}
