'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import api from '@/lib/axios';

interface BankAccountForm {
  bank_name: string;
  account_number: string;
  account_holder: string;
  is_active: boolean;
  logo: string | null;
}

const STORAGE_URL =
  process.env.NEXT_PUBLIC_STORAGE_URL || 'http://localhost:8000/storage/';

export default function EditBankAccountPage() {
  const { id } = useParams();
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [form, setForm] = useState<BankAccountForm>({
    bank_name: '',
    account_number: '',
    account_holder: '',
    is_active: true,
    logo: null,
  });

  const [newLogo, setNewLogo] = useState<File | null>(null);

  // Ambil data rekening
  useEffect(() => {
    const fetchBank = async () => {
      try {
        const res = await api.get('/admin/bank-accounts');
        const bank = res.data.data.find((b: any) => b.id == id);

        if (!bank) {
          alert('Rekening tidak ditemukan');
          router.push('/admin/bank-accounts');
          return;
        }

        setForm({
          bank_name: bank.bank_name,
          account_number: bank.account_number,
          account_holder: bank.account_holder,
          is_active: bank.is_active,
          logo: bank.logo,
        });
      } catch (err) {
        alert('Gagal mengambil data rekening');
      } finally {
        setLoading(false);
      }
    };

    fetchBank();
  }, [id, router]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]:
        name === 'is_active'
          ? value === 'true'
          : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const fd = new FormData();
    fd.append('bank_name', form.bank_name);
    fd.append('account_number', form.account_number);
    fd.append('account_holder', form.account_holder);
    fd.append('is_active', String(form.is_active));

    if (newLogo) {
      fd.append('logo', newLogo);
    }

    try {
      setSaving(true);
      await api.post(`/admin/bank-accounts/${id}?_method=PUT`, fd, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      alert('Rekening berhasil diperbarui');
      router.push('/admin/bank-accounts');
    } catch (err) {
      console.error(err);
      alert('Gagal menyimpan perubahan');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <p>Memuat data rekening...</p>;
  }

  return (
    <div className="max-w-xl">
      <h1 className="text-2xl font-bold mb-6">Edit Rekening</h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-xl shadow border border-gray-100 space-y-4"
      >
        <div>
          <label className="block text-sm font-semibold mb-1">Nama Bank</label>
          <input
            name="bank_name"
            value={form.bank_name}
            onChange={handleChange}
            required
            className="w-full border rounded-lg px-3 py-2"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold mb-1">
            Nomor Rekening
          </label>
          <input
            name="account_number"
            value={form.account_number}
            onChange={handleChange}
            required
            className="w-full border rounded-lg px-3 py-2 font-mono"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold mb-1">
            Atas Nama
          </label>
          <input
            name="account_holder"
            value={form.account_holder}
            onChange={handleChange}
            required
            className="w-full border rounded-lg px-3 py-2"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold mb-1">Status</label>
          <select
            name="is_active"
            value={String(form.is_active)}
            onChange={handleChange}
            className="w-full border rounded-lg px-3 py-2"
          >
            <option value="true">Aktif</option>
            <option value="false">Nonaktif</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-semibold mb-1">
            Logo / QRIS Saat Ini
          </label>

          {form.logo ? (
            <img
              src={`${STORAGE_URL}${form.logo}`}
              alt="Logo Bank"
              className="w-40 h-auto mb-3 border rounded"
            />
          ) : (
            <p className="text-sm text-gray-400 mb-2">
              Tidak ada logo
            </p>
          )}

          <input
            type="file"
            accept="image/*"
            onChange={(e) => setNewLogo(e.target.files?.[0] || null)}
            className="text-sm"
          />
          <p className="text-xs text-gray-400 mt-1">
            Upload jika ingin mengganti logo / QRIS
          </p>
        </div>

        <div className="pt-4 flex gap-3">
          <button
            type="submit"
            disabled={saving}
            className="bg-navy text-white px-6 py-2 rounded-lg font-semibold disabled:opacity-50"
          >
            {saving ? 'Menyimpan...' : 'Simpan Perubahan'}
          </button>

          <button
            type="button"
            onClick={() => router.back()}
            className="px-6 py-2 rounded-lg border"
          >
            Batal
          </button>
        </div>
      </form>
    </div>
  );
}
