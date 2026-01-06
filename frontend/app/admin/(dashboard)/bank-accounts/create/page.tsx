'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import api from '@/lib/axios';

export default function CreateBankAccountPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    bank_name: '',
    account_number: '',
    account_holder: '',
    is_active: true,
  });

  const [logo, setLogo] = useState<File | null>(null);

  const handleChange = (e: any) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const fd = new FormData();
    Object.entries(form).forEach(([k, v]) => fd.append(k, String(v)));
    if (logo) fd.append('logo', logo);

    try {
      setLoading(true);
      await api.post('/admin/bank-accounts', fd, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
        });
      router.push('/admin/bank-accounts');
    } catch {
      alert('Gagal menyimpan rekening');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl">
      <h1 className="text-2xl font-bold mb-6">Tambah Rekening</h1>
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl space-y-4">
        <input name="bank_name" required placeholder="Nama Bank" className="w-full border px-3 py-2 rounded" onChange={handleChange} />
        <input name="account_number" required placeholder="No Rekening" className="w-full border px-3 py-2 rounded" onChange={handleChange} />
        <input name="account_holder" required placeholder="Atas Nama" className="w-full border px-3 py-2 rounded" onChange={handleChange} />

        <div>
          <label className="block text-sm font-semibold mb-1">Logo / QRIS</label>
          <input type="file" accept="image/*" onChange={(e) => setLogo(e.target.files?.[0] || null)} />
        </div>

        <button className="bg-navy text-white px-6 py-2 rounded-lg font-semibold">
          {loading ? 'Menyimpan...' : 'Simpan'}
        </button>
      </form>
    </div>
  );
}
