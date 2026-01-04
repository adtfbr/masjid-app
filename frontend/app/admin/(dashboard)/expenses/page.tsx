'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import api from '@/lib/axios';
import { Expense, PaginatedResponse } from '@/types';
import { Plus, Trash2, Calendar, FileText, Loader2, Search } from 'lucide-react';

export default function ExpensesPage() {
    const [expenses, setExpenses] = useState<Expense[]>([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [lastPage, setLastPage] = useState(1);

    const fetchExpenses = async (pageNumber = 1) => {
        setLoading(true);
        try {
            const response = await api.get<PaginatedResponse<Expense>>(`/admin/expenses?page=${pageNumber}`);
            setExpenses(response.data.data);
            setPage(response.data.current_page);
            setLastPage(response.data.last_page);
        } catch (error) {
            console.error('Gagal mengambil data pengeluaran:', error);
            alert('Gagal memuat data.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchExpenses();
    }, []);

    const handleDelete = async (id: number) => {
        if (!confirm('Yakin ingin menghapus data pengeluaran ini?')) return;

        try {
            await api.delete(`/admin/expenses/${id}`);
            // Refresh data setelah hapus
            fetchExpenses(page); 
        } catch (error) {
            alert('Gagal menghapus data.');
        }
    };

    // Helper format rupiah
    const formatRupiah = (amount: number) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0
        }).format(amount);
    };

    return (
        <div>
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900">Data Pengeluaran</h1>
                    <p className="text-slate-500 text-sm">Catat semua biaya operasional masjid di sini.</p>
                </div>
                <Link 
                    href="/admin/expenses/create" 
                    className="bg-amber-600 hover:bg-amber-700 text-white px-4 py-2.5 rounded-lg flex items-center gap-2 transition-colors font-medium shadow-sm"
                >
                    <Plus className="w-4 h-4" />
                    Catat Pengeluaran
                </Link>
            </div>

            {/* Content */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                {loading ? (
                    <div className="p-12 flex justify-center">
                        <Loader2 className="w-8 h-8 animate-spin text-amber-500" />
                    </div>
                ) : expenses.length === 0 ? (
                    <div className="p-12 text-center text-slate-500">
                        <FileText className="w-12 h-12 mx-auto mb-3 text-slate-300" />
                        <p>Belum ada data pengeluaran.</p>
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm text-left">
                            <thead className="bg-slate-50 text-slate-700 font-semibold border-b border-slate-200">
                                <tr>
                                    <th className="px-6 py-4">Keterangan</th>
                                    <th className="px-6 py-4">Kategori</th>
                                    <th className="px-6 py-4">Tanggal</th>
                                    <th className="px-6 py-4 text-right">Nominal</th>
                                    <th className="px-6 py-4 text-center">Aksi</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {expenses.map((item) => (
                                    <tr key={item.id} className="hover:bg-slate-50 transition-colors">
                                        <td className="px-6 py-4">
                                            <div className="font-medium text-slate-900">{item.title}</div>
                                            {item.description && (
                                                <div className="text-xs text-slate-500 truncate max-w-xs">{item.description}</div>
                                            )}
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize
                                                ${item.category === 'operasional' ? 'bg-blue-100 text-blue-800' : 
                                                  item.category === 'pembangunan' ? 'bg-orange-100 text-orange-800' :
                                                  item.category === 'honor' ? 'bg-green-100 text-green-800' :
                                                  'bg-slate-100 text-slate-800'}
                                            `}>
                                                {item.category}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-slate-600">
                                            <div className="flex items-center gap-2">
                                                <Calendar className="w-3 h-3" />
                                                {new Date(item.expense_date).toLocaleDateString('id-ID')}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-right font-medium text-red-600">
                                            {formatRupiah(item.amount)}
                                        </td>
                                        <td className="px-6 py-4 text-center">
                                            <button 
                                                onClick={() => handleDelete(item.id)}
                                                className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"
                                                title="Hapus"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}

                {/* Pagination Simple */}
                {!loading && lastPage > 1 && (
                    <div className="p-4 border-t border-slate-200 flex justify-center gap-2">
                        <button 
                            disabled={page === 1}
                            onClick={() => fetchExpenses(page - 1)}
                            className="px-3 py-1 border rounded text-sm disabled:opacity-50 hover:bg-slate-50"
                        >
                            Prev
                        </button>
                        <span className="px-3 py-1 text-sm text-slate-600">
                            Hal {page} dari {lastPage}
                        </span>
                        <button 
                            disabled={page === lastPage}
                            onClick={() => fetchExpenses(page + 1)}
                            className="px-3 py-1 border rounded text-sm disabled:opacity-50 hover:bg-slate-50"
                        >
                            Next
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}