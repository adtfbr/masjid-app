'use client';

import { useState, useEffect } from 'react';
import { FaArrowUp, FaArrowDown, FaWallet, FaFilePdf } from 'react-icons/fa';
import ScrollReveal from './ScrollReveal';
import axios from 'axios';

// 1. Definisikan Interface agar tidak pakai 'any'
interface FinancialData {
  financial: {
    total_balance: string;
    income_month: string;
    last_update: string;
  };
  recent_donations: Array<{
    name: string;
    amount: string;
    category: string;
    time: string;
  }>;
}

export default function FinancialReport() {
  const [data, setData] = useState<FinancialData | null>(null);
  const [loading, setLoading] = useState(true); // Tambah loading state

  const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000';

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`${API_URL}/api/public-data`);
        if(res.data.success) {
          setData(res.data.data);
        }
      } catch (err) {
        console.error("Gagal mengambil data keuangan:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // 2. Tampilkan Skeleton Loading jika data belum ada
  if (loading) {
    return (
        <section className="py-20 bg-white">
            <div className="max-w-7xl mx-auto px-4 text-center">
                <div className="animate-pulse flex flex-col items-center">
                    <div className="h-8 bg-gray-200 rounded w-1/3 mb-4"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/4 mb-12"></div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
                        <div className="h-40 bg-gray-200 rounded-2xl"></div>
                        <div className="h-40 bg-gray-200 rounded-2xl"></div>
                        <div className="h-40 bg-gray-200 rounded-2xl"></div>
                    </div>
                </div>
            </div>
        </section>
    );
  }

  if (!data) return null; // Jika error / kosong

  const { financial, recent_donations } = data;

  return (
    <section id="laporan" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <ScrollReveal>
          <div className="flex flex-col md:flex-row justify-between items-end mb-10 gap-4">
            <div>
              <h2 className="text-3xl font-bold text-navy">Transparansi Keuangan</h2>
              <div className="w-20 h-1 bg-aqua rounded-full mt-2 mb-2"></div>
              <p className="text-slate-500 text-sm">
                Laporan infaq dan penggunaan dana umat yang akuntabel.
                <br/>Update terakhir: <span className="font-semibold text-navy">{financial.last_update}</span>
              </p>
            </div>
            {/* Tombol PDF bisa dibuat nanti */}
            <button disabled className="opacity-50 cursor-not-allowed bg-white border border-slate-200 text-navy px-4 py-2 rounded-lg text-sm font-semibold flex items-center gap-2">
              <FaFilePdf className="text-red-500" /> Download Laporan PDF (Segera)
            </button>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {/* Kartu Saldo */}
            <ScrollReveal delay={0.1}>
              <div className="bg-gradient-to-br from-navy to-navy-light p-6 rounded-2xl text-white shadow-xl shadow-navy/20 relative overflow-hidden h-full transform hover:-translate-y-1 transition-transform duration-300">
                  <div className="relative z-10">
                      <p className="text-aqua text-sm font-medium mb-1 flex items-center gap-2">
                          <FaWallet /> Total Donasi Masuk
                      </p>
                      <h3 className="text-3xl font-bold font-mono">Rp {financial.total_balance}</h3>
                  </div>
                  <div className="absolute right-0 bottom-0 opacity-10 transform translate-x-4 translate-y-4">
                      <FaWallet size={100} />
                  </div>
              </div>
            </ScrollReveal>

            {/* Kartu Pemasukan */}
            <ScrollReveal delay={0.2}>
              <div className="bg-green-50 p-6 rounded-2xl border border-green-100 h-full">
                  <p className="text-green-600 text-sm font-medium mb-1 flex items-center gap-2">
                      <FaArrowUp /> Pemasukan Bulan Ini
                  </p>
                  <h3 className="text-2xl font-bold text-slate-800 font-mono">Rp {financial.income_month}</h3>
                  <p className="text-xs text-slate-400 mt-2">Alhamdulillah</p>
              </div>
            </ScrollReveal>

            {/* Placeholder Pengeluaran */}
            <ScrollReveal delay={0.3}>
              <div className="bg-red-50 p-6 rounded-2xl border border-red-100 h-full opacity-70">
                  <p className="text-red-600 text-sm font-medium mb-1 flex items-center gap-2">
                      <FaArrowDown /> Pengeluaran Bulan Ini
                  </p>
                  <h3 className="text-2xl font-bold text-slate-800 font-mono">Rp -</h3>
                  <p className="text-xs text-slate-400 mt-2">Belum ada data</p>
              </div>
            </ScrollReveal>
        </div>

        {/* Marquee Donatur */}
        {recent_donations.length > 0 && (
            <ScrollReveal direction="up" delay={0.4}>
            <div className="bg-slate-900 rounded-xl p-3 flex items-center overflow-hidden shadow-lg">
                <div className="bg-aqua text-navy text-xs font-bold px-3 py-1 rounded mr-4 flex-shrink-0 animate-pulse">
                    DONASI TERBARU
                </div>
                <div className="whitespace-nowrap overflow-hidden flex-1 relative group">
                    <div className="animate-marquee inline-block text-slate-300 text-sm hover:pause">
                        {/* Render 2x untuk efek looping yang mulus */}
                        {[...recent_donations, ...recent_donations].map((d, i) => (
                            <span key={i} className="mx-6 inline-block">
                                <span className="text-white font-semibold">{d.name}</span> 
                                <span className="text-aqua mx-2 font-mono text-xs bg-navy-light px-2 py-0.5 rounded">Rp {d.amount}</span> 
                                <span className="text-slate-500 text-xs">({d.category})</span>
                            </span>
                        ))}
                    </div>
                </div>
            </div>
            </ScrollReveal>
        )}

      </div>
      
      <style jsx>{`
        .animate-marquee {
          animation: marquee 25s linear infinite;
        }
        /* Fitur pause saat hover agar user bisa baca */
        .hover\\:pause:hover {
            animation-play-state: paused;
        }
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </section>
  );
}