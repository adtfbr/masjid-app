'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import api from '@/lib/axios';

interface BankAccount {
  id: number;
  bank_name: string;
  account_number: string;
  account_holder: string;
  logo: string | null;
  is_active: boolean;
}

const STORAGE_URL =
  process.env.NEXT_PUBLIC_STORAGE_URL || 'http://localhost:8000/storage/';

export default function BankAccountsPage() {
  const [data, setData] = useState<BankAccount[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const res = await api.get('/admin/bank-accounts');
      setData(res.data.data);
    } catch {
      alert('Gagal memuat rekening');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDeactivate = async (id: number) => {
    if (!confirm('Nonaktifkan rekening ini?')) return;
    await api.delete(`/admin/bank-accounts/${id}`);
    fetchData();
  };

  if (loading) return <p>Memuat data...</p>;

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Rekening Donasi</h1>
        <Link
          href="/admin/bank-accounts/create"
          className="bg-navy text-white px-4 py-2 rounded-lg text-sm font-semibold"
        >
          + Tambah Rekening
        </Link>
      </div>

      <div className="bg-white rounded-xl shadow border overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="p-3 text-left">Logo</th>
              <th className="p-3 text-left">Bank</th>
              <th className="p-3 text-left">No Rekening</th>
              <th className="p-3 text-left">A/N</th>
              <th className="p-3 text-left">Status</th>
              <th className="p-3 text-left">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {data.map((b) => (
              <tr key={b.id} className="border-t">
                <td className="p-3">
                  {b.logo ? (
                    <img
                      src={`${STORAGE_URL}${b.logo}`}
                      className="w-12 h-12 object-contain"
                      alt={b.bank_name}
                    />
                  ) : (
                    <span className="text-xs text-gray-400">-</span>
                  )}
                </td>
                <td className="p-3 font-semibold">{b.bank_name}</td>
                <td className="p-3 font-mono">{b.account_number}</td>
                <td className="p-3">{b.account_holder}</td>
                <td className="p-3">
                  {b.is_active ? (
                    <span className="text-green-600 font-semibold">Aktif</span>
                  ) : (
                    <span className="text-gray-400">Nonaktif</span>
                  )}
                </td>
                <td className="p-3 space-x-2">
                  <Link
                    href={`/admin/bank-accounts/${b.id}/edit`}
                    className="text-blue-600 hover:underline"
                  >
                    Edit
                  </Link>
                  {b.is_active && (
                    <button
                      onClick={() => handleDeactivate(b.id)}
                      className="text-red-600 hover:underline"
                    >
                      Nonaktifkan
                    </button>
                  )}
                </td>
              </tr>
            ))}
            {data.length === 0 && (
              <tr>
                <td colSpan={6} className="p-6 text-center text-gray-400">
                  Belum ada rekening
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
