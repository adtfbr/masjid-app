'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import api from '@/lib/axios';
import { ArrowLeft, Loader2, Save, Upload } from 'lucide-react';

export default function CreateExpensePage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    
    // Form State
    const [formData, setFormData] = useState({
        title: '',
        amount: '',
        category: 'operasional',
        expense_date: new Date().toISOString().split('T')[0], // Default hari ini
        description: '',
    });
    const [file, setFile] = useState<File | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        // Gunakan FormData untuk upload file
        const data = new FormData();
        data.append('title', formData.title);
        data.append('amount', formData.amount);
        data.append('category', formData.category);
        data.append('expense_date', formData.expense_date);
        data.append('description', formData.description);
        if (file) {
            data.append('proof_file', file);
        }

        try {
            await api.post('/admin/expenses', data, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            alert('Pengeluaran berhasil disimpan!');
            router.push('/admin/expenses');
        } catch (error: any) {
            console.error(error);
            alert(error.response?.data?.message || 'Terjadi kesalahan saat menyimpan.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-2xl mx-auto">
            <div className="mb-6">
                <Link href="/admin/expenses" className="text-slate-500 hover:text-slate-800 flex items-center gap-2 text-sm mb-2">
                    <ArrowLeft className="w-4 h-4" />
                    Kembali ke List
                </Link>
                <h1 className="text-2xl font-bold text-slate-900">Catat Pengeluaran Baru</h1>
            </div>

            <form onSubmit={handleSubmit} className="bg-white p-6 md:p-8 rounded-xl shadow-sm border border-slate-200 space-y-6">
                
                {/* Judul & Nominal */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Judul Pengeluaran <span className="text-red-500">*</span></label>
                        <input 
                            type="text" 
                            required
                            placeholder="Contoh: Bayar Listrik"
                            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 outline-none"
                            value={formData.title}
                            onChange={(e) => setFormData({...formData, title: e.target.value})}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Nominal (Rp) <span className="text-red-500">*</span></label>
                        <input 
                            type="number" 
                            required
                            min="0"
                            placeholder="0"
                            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 outline-none"
                            value={formData.amount}
                            onChange={(e) => setFormData({...formData, amount: e.target.value})}
                        />
                    </div>
                </div>

                {/* Kategori & Tanggal */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Kategori</label>
                        <select 
                            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 outline-none bg-white"
                            value={formData.category}
                            onChange={(e) => setFormData({...formData, category: e.target.value})}
                        >
                            <option value="operasional">Operasional</option>
                            <option value="pembangunan">Pembangunan</option>
                            <option value="sosial">Sosial / Santunan</option>
                            <option value="honor">Honor Petugas/Imam</option>
                            <option value="lainnya">Lainnya</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Tanggal Transaksi</label>
                        <input 
                            type="date" 
                            required
                            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 outline-none"
                            value={formData.expense_date}
                            onChange={(e) => setFormData({...formData, expense_date: e.target.value})}
                        />
                    </div>
                </div>

                {/* Deskripsi */}
                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Keterangan Tambahan</label>
                    <textarea 
                        rows={3}
                        className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 outline-none"
                        placeholder="Detail pengeluaran..."
                        value={formData.description}
                        onChange={(e) => setFormData({...formData, description: e.target.value})}
                    ></textarea>
                </div>

                {/* Upload Bukti */}
                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Bukti Nota / Struk (Opsional)</label>
                    <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-slate-300 border-dashed rounded-lg hover:bg-slate-50 transition-colors">
                        <div className="space-y-1 text-center">
                            <Upload className="mx-auto h-12 w-12 text-slate-400" />
                            <div className="flex text-sm text-slate-600">
                                <label className="relative cursor-pointer bg-white rounded-md font-medium text-amber-600 hover:text-amber-500 focus-within:outline-none">
                                    <span>Upload file</span>
                                    <input 
                                        type="file" 
                                        className="sr-only" 
                                        accept="image/*"
                                        onChange={(e) => setFile(e.target.files ? e.target.files[0] : null)}
                                    />
                                </label>
                                <p className="pl-1">atau drag and drop</p>
                            </div>
                            <p className="text-xs text-slate-500">
                                {file ? `File terpilih: ${file.name}` : 'PNG, JPG, GIF up to 2MB'}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Submit Button */}
                <div className="pt-4">
                    <button 
                        type="submit" 
                        disabled={loading}
                        className="w-full bg-slate-900 hover:bg-slate-800 text-white font-medium py-3 rounded-lg flex items-center justify-center gap-2 transition-all disabled:opacity-70"
                    >
                        {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : (
                            <>
                                <Save className="w-5 h-5" />
                                Simpan Pengeluaran
                            </>
                        )}
                    </button>
                </div>

            </form>
        </div>
    );
}