<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Models\Donation;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class DonationController extends Controller
{
    public function index(Request $request)
    {
        // Filter berdasarkan status (pending/verified/rejected)
        $status = $request->query('status');

        $query = Donation::with('bankAccount')->latest();

        if ($status && in_array($status, ['pending', 'verified', 'rejected'])) {
            $query->where('status', $status);
        }

        return $query->paginate(10);
    }

    // Update Status (Verifikasi / Tolak)
    public function update(Request $request, $id)
    {
        $request->validate([
            'status' => 'required|in:pending,verified,rejected'
        ]);

        $donation = Donation::findOrFail($id);
        $donation->update(['status' => $request->status]);

        return response()->json([
            'message' => 'Status donasi berhasil diperbarui.',
            'data' => $donation
        ]);
    }

    // Hapus Donasi (Soft Delete)
    public function destroy($id)
    {
        $donation = Donation::findOrFail($id);

        // Opsional: Hapus bukti transfer fisik
        // if ($donation->proof_file) Storage::disk('public')->delete($donation->proof_file);

        $donation->delete();

        return response()->json(['message' => 'Data donasi dihapus.']);
    }
}
