'use client';

import { useEffect, useState } from 'react';
import api from '@/lib/axios';
import { Loader2, TrendingDown, TrendingUp, Wallet } from 'lucide-react';

export default function DashboardPage() {
    const [stats, setStats] = useState({
        balance: 0,
        total_income: 0,
        total_expense: 0,
    });
    const [loading, setLoading] = useState(true);

    const fetchStats = async () => {
        try {
            // Kita gunakan endpoint public dulu karena datanya sama (Total Saldo & Pemasukan/Pengeluaran)
            // Endpoint ini sudah kita buat di PublicDataController
            const response = await api.get('/public/initial-data');
            setStats(response.data.financial);
        } catch (error) {
            console.error('Gagal mengambil data dashboard:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchStats();
    }, []);

    const formatRupiah = (amount: number) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0
        }).format(amount);
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center h-64">
                <Loader2 className="w-8 h-8 animate-spin text-slate-400" />
            </div>
        );
    }

    return (
        <div>
            <h1 className="text-2xl font-bold text-slate-900 mb-6">Overview</h1>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                {/* Card 1: Saldo (Pemasukan - Pengeluaran) */}
                <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 flex items-start justify-between">
                    <div>
                        <p className="text-slate-500 text-sm mb-1">Total Saldo Kas</p>
                        <h3 className="text-2xl md:text-3xl font-bold text-slate-900">{formatRupiah(stats.balance)}</h3>
                        <div className="mt-2 text-xs text-slate-400 flex items-center gap-1">
                            <Wallet className="w-3 h-3" /> Update Realtime
                        </div>
                    </div>
                    <div className="p-3 bg-blue-50 rounded-lg text-blue-600">
                        <Wallet className="w-6 h-6" />
                    </div>
                </div>

                {/* Card 2: Pemasukan */}
                <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 flex items-start justify-between">
                    <div>
                        <p className="text-slate-500 text-sm mb-1">Total Pemasukan</p>
                        <h3 className="text-2xl md:text-3xl font-bold text-emerald-600">+ {formatRupiah(stats.total_income)}</h3>
                        <div className="mt-2 text-xs text-slate-400">Donasi Terverifikasi</div>
                    </div>
                    <div className="p-3 bg-emerald-50 rounded-lg text-emerald-600">
                        <TrendingUp className="w-6 h-6" />
                    </div>
                </div>

                {/* Card 3: Pengeluaran */}
                <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 flex items-start justify-between">
                    <div>
                        <p className="text-slate-500 text-sm mb-1">Total Pengeluaran</p>
                        {/* Kita tambahkan tanda minus secara manual agar visualnya jelas */}
                        <h3 className="text-2xl md:text-3xl font-bold text-red-600">- {formatRupiah(stats.total_expense)}</h3>
                        <div className="mt-2 text-xs text-slate-400">Biaya Operasional</div>
                    </div>
                    <div className="p-3 bg-red-50 rounded-lg text-red-600">
                        <TrendingDown className="w-6 h-6" />
                    </div>
                </div>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-sm border border-slate-100 text-center">
                <h3 className="text-lg font-medium text-slate-900 mb-2">Grafik Keuangan</h3>
                <p className="text-slate-500 text-sm">Fitur visualisasi grafik akan ditambahkan pada tahap selanjutnya.</p>
            </div>
        </div>
    );
}