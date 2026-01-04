'use client';

import { useEffect, useState } from 'react';
import api from '@/lib/axios';
import { Donation, PaginatedResponse } from '@/types';
import { CheckCircle, XCircle, Loader2, Eye, AlertCircle } from 'lucide-react';

export default function DonationsPage() {
    const [donations, setDonations] = useState<Donation[]>([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('pending'); // pending, verified, rejected

    const fetchDonations = async () => {
        setLoading(true);
        try {
            const response = await api.get<PaginatedResponse<Donation>>(`/admin/donations?status=${filter}`);
            setDonations(response.data.data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchDonations();
    }, [filter]);

    const handleUpdateStatus = async (id: number, status: string) => {
        if (!confirm(`Ubah status menjadi ${status}?`)) return;

        try {
            await api.put(`/admin/donations/${id}`, { status });
            fetchDonations(); // Refresh data
        } catch (error) {
            alert('Gagal update status');
        }
    };

    const formatRupiah = (val: number) => new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(val);

    return (
        <div>
            <div className="mb-6">
                <h1 className="text-2xl font-bold text-slate-900">Donasi Masuk</h1>
                <p className="text-slate-500 text-sm">Verifikasi bukti transfer dari jamaah.</p>
            </div>

            {/* Filter Tabs */}
            <div className="flex gap-2 mb-6 border-b border-slate-200">
                {['pending', 'verified', 'rejected'].map((status) => (
                    <button
                        key={status}
                        onClick={() => setFilter(status)}
                        className={`px-4 py-2 text-sm font-medium capitalize border-b-2 transition-colors ${
                            filter === status 
                            ? 'border-amber-500 text-amber-600' 
                            : 'border-transparent text-slate-500 hover:text-slate-700'
                        }`}
                    >
                        {status}
                    </button>
                ))}
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                {loading ? (
                    <div className="p-12 flex justify-center"><Loader2 className="animate-spin text-slate-400" /></div>
                ) : donations.length === 0 ? (
                    <div className="p-12 text-center text-slate-500">Tidak ada data donasi {filter}.</div>
                ) : (
                    <table className="w-full text-sm text-left">
                        <thead className="bg-slate-50 text-slate-700 font-semibold border-b border-slate-200">
                            <tr>
                                <th className="px-6 py-4">Donatur</th>
                                <th className="px-6 py-4">Nominal</th>
                                <th className="px-6 py-4">Bank Tujuan</th>
                                <th className="px-6 py-4">Bukti</th>
                                <th className="px-6 py-4 text-center">Aksi</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {donations.map((item) => (
                                <tr key={item.id} className="hover:bg-slate-50">
                                    <td className="px-6 py-4">
                                        <div className="font-medium text-slate-900">{item.donor_name}</div>
                                        <div className="text-xs text-slate-500">{new Date(item.created_at).toLocaleDateString()}</div>
                                        {item.notes && <div className="text-xs text-slate-400 italic mt-1">&quot;{item.notes}&quot;</div>}
                                    </td>
                                    <td className="px-6 py-4 font-medium text-emerald-600">
                                        {formatRupiah(item.amount)}
                                    </td>
                                    <td className="px-6 py-4">
                                        {item.bank_account ? (
                                            <span className="bg-slate-100 text-slate-700 px-2 py-1 rounded text-xs">
                                                {item.bank_account.bank_name}
                                            </span>
                                        ) : '-'}
                                    </td>
                                    <td className="px-6 py-4">
                                        {item.proof_file ? (
                                            <a 
                                                href={`${process.env.NEXT_PUBLIC_STORAGE_URL}${item.proof_file}`} 
                                                target="_blank"
                                                className="text-blue-600 hover:underline flex items-center gap-1 text-xs"
                                            >
                                                <Eye className="w-3 h-3" /> Lihat Bukti
                                            </a>
                                        ) : (
                                            <span className="text-slate-400 text-xs">Tanpa Bukti</span>
                                        )}
                                    </td>
                                    <td className="px-6 py-4 text-center">
                                        {item.status === 'pending' && (
                                            <div className="flex items-center justify-center gap-2">
                                                <button 
                                                    onClick={() => handleUpdateStatus(item.id, 'verified')}
                                                    className="p-1 text-emerald-600 hover:bg-emerald-50 rounded" 
                                                    title="Terima"
                                                >
                                                    <CheckCircle className="w-5 h-5" />
                                                </button>
                                                <button 
                                                    onClick={() => handleUpdateStatus(item.id, 'rejected')}
                                                    className="p-1 text-red-600 hover:bg-red-50 rounded" 
                                                    title="Tolak"
                                                >
                                                    <XCircle className="w-5 h-5" />
                                                </button>
                                            </div>
                                        )}
                                        {item.status !== 'pending' && (
                                            <span className={`text-xs font-bold px-2 py-1 rounded capitalize ${
                                                item.status === 'verified' ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'
                                            }`}>
                                                {item.status}
                                            </span>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
}