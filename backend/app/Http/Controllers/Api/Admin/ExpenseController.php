<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Models\Expense;
use Illuminate\Http\Request;

class ExpenseController extends Controller
{
    public function index()
    {
        // Tampilkan pengeluaran terbaru
        return Expense::with('user')->latest()->paginate(10);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'amount' => 'required|numeric|min:0',
            'category' => 'required|in:operasional,pembangunan,sosial,honor,lainnya',
            'expense_date' => 'required|date',
            'description' => 'nullable|string',
            'proof_file' => 'nullable|image|max:2048'
        ]);

        // Upload bukti nota/struk
        $path = null;
        if ($request->hasFile('proof_file')) {
            $path = $request->file('proof_file')->store('expenses', 'public');
        }

        $expense = Expense::create([
            'user_id' => $request->user()->id, // Siapa admin yg input
            'title' => $validated['title'],
            'amount' => $validated['amount'],
            'category' => $validated['category'],
            'expense_date' => $validated['expense_date'],
            'description' => $validated['description'],
            'proof_file' => $path
        ]);

        return response()->json(['message' => 'Pengeluaran berhasil dicatat', 'data' => $expense], 201);
    }

    public function destroy($id)
    {
        $expense = Expense::findOrFail($id);

        // Opsional: Hapus file fisik bukti jika ada
        // if ($expense->proof_file) Storage::disk('public')->delete($expense->proof_file);

        $expense->delete(); // Soft delete
        return response()->json(['message' => 'Data berhasil dihapus']);
    }
}
