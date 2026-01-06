'use client';

import { useEffect, useState } from 'react';
import api from '@/lib/axios';
import {
  Wallet,
  TrendingUp,
  TrendingDown,
  HandCoins,
  Loader2,
} from 'lucide-react';

type Financial = {
  balance: number;
  total_income: number;
  total_expense: number;
  mutations: Array<{
    id: string;
    type: 'in' | 'out';
    date: string;
    description: string;
    amount: number;
  }>;
};

export default function DashboardPage() {
  const [financial, setFinancial] = useState<Financial | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const res = await api.get('/public/initial-data');

        // Aman terhadap perubahan struktur
        const f = res.data?.data?.financial ?? res.data?.financial;

        if (f) {
          setFinancial(f);
        }
      } catch (err) {
        console.error('Gagal mengambil data dashboard:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
  }, []);

  const rupiah = (n: number) =>
    new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(n);

  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-slate-400" />
      </div>
    );
  }

  if (!financial) {
    return (
      <div className="rounded-xl border border-slate-200 bg-white p-6 text-center text-slate-500">
        Data dashboard belum tersedia.
      </div>
    );
  }

  const latestIn = financial.mutations
    ?.filter((m) => m.type === 'in')
    ?.slice(0, 5) ?? [];

  return (
    <div className="space-y-6">
      {/* Title */}
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Dashboard</h1>
        <p className="text-sm text-slate-500">
          Ringkasan keuangan masjid hari ini
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {/* Saldo */}
        <div className="rounded-xl border border-slate-200 bg-white p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-500">Total Saldo</p>
              <h3 className="mt-1 text-2xl font-bold text-slate-900">
                {rupiah(financial.balance)}
              </h3>
            </div>
            <div className="rounded-lg bg-blue-50 p-3 text-blue-600">
              <Wallet className="h-6 w-6" />
            </div>
          </div>
        </div>

        {/* Pemasukan */}
        <div className="rounded-xl border border-slate-200 bg-white p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-500">Total Pemasukan</p>
              <h3 className="mt-1 text-2xl font-bold text-emerald-600">
                {rupiah(financial.total_income)}
              </h3>
            </div>
            <div className="rounded-lg bg-emerald-50 p-3 text-emerald-600">
              <TrendingUp className="h-6 w-6" />
            </div>
          </div>
        </div>

        {/* Pengeluaran */}
        <div className="rounded-xl border border-slate-200 bg-white p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-500">Total Pengeluaran</p>
              <h3 className="mt-1 text-2xl font-bold text-red-600">
                {rupiah(financial.total_expense)}
              </h3>
            </div>
            <div className="rounded-lg bg-red-50 p-3 text-red-600">
              <TrendingDown className="h-6 w-6" />
            </div>
          </div>
        </div>
      </div>

      {/* Latest Donations */}
      <div className="rounded-xl border border-slate-200 bg-white">
        <div className="border-b border-slate-200 px-6 py-4">
          <h2 className="text-lg font-semibold text-slate-900">
            Donasi Terbaru
          </h2>
        </div>

        {latestIn.length === 0 ? (
          <div className="p-6 text-center text-slate-500">
            Belum ada donasi terbaru.
          </div>
        ) : (
          <ul className="divide-y">
            {latestIn.map((item) => (
              <li
                key={item.id}
                className="flex items-center justify-between px-6 py-4"
              >
                <div className="flex items-center gap-3">
                  <div className="rounded-lg bg-emerald-50 p-2 text-emerald-600">
                    <HandCoins className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="font-medium text-slate-800">
                      {item.description}
                    </p>
                    <p className="text-xs text-slate-500">
                      {new Date(item.date).toLocaleDateString('id-ID')}
                    </p>
                  </div>
                </div>
                <div className="font-semibold text-emerald-600">
                  {rupiah(item.amount)}
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
