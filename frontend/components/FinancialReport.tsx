'use client';

import { useState, useEffect } from 'react';
import { FaArrowUp, FaArrowDown, FaWallet, FaFilePdf } from 'react-icons/fa';
import ScrollReveal from './ScrollReveal';
import axios from 'axios';

export default function FinancialReport() {
  const [data, setData] = useState<any>(null);

  // MENGGUNAKAN ENV VARIABLE DENGAN FALLBACK
  const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000';

  useEffect(() => {
    axios.get(`${API_URL}/api/public-data`)
      .then(res => {
        if(res.data.success) {
          setData(res.data.data);
        }
      })
      .catch(err => console.error(err));
  }, []); // Hapus API_URL dari dependency

  if (!data) return null;

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
            <button className="bg-white border border-slate-200 text-navy px-4 py-2 rounded-lg text-sm font-semibold hover:border-navy hover:bg-slate-50 transition-colors flex items-center gap-2">
              <FaFilePdf className="text-red-500" /> Download Laporan PDF
            </button>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {/* Saldo Total */}
            <ScrollReveal delay={0.1}>
              <div className="bg-gradient-to-br from-navy to-navy-light p-6 rounded-2xl text-white shadow-xl shadow-navy/20 relative overflow-hidden h-full">
                  <div className="relative z-10">
                      <p className="text-aqua text-sm font-medium mb-1 flex items-center gap-2">
                          <FaWallet /> Total Donasi Masuk
                      </p>
                      <h3 className="text-3xl font-bold">Rp {financial.total_balance}</h3>
                  </div>
                  <div className="absolute right-0 bottom-0 opacity-10 transform translate-x-4 translate-y-4">
                      <FaWallet size={100} />
                  </div>
              </div>
            </ScrollReveal>

            {/* Pemasukan Bulan Ini */}
            <ScrollReveal delay={0.2}>
              <div className="bg-green-50 p-6 rounded-2xl border border-green-100 h-full">
                  <p className="text-green-600 text-sm font-medium mb-1 flex items-center gap-2">
                      <FaArrowUp /> Pemasukan Bulan Ini
                  </p>
                  <h3 className="text-2xl font-bold text-slate-800">Rp {financial.income_month}</h3>
                  <p className="text-xs text-slate-400 mt-2">Alhamdulillah</p>
              </div>
            </ScrollReveal>

            {/* Pengeluaran Bulan Ini (Placeholder) */}
            <ScrollReveal delay={0.3}>
              <div className="bg-red-50 p-6 rounded-2xl border border-red-100 h-full">
                  <p className="text-red-600 text-sm font-medium mb-1 flex items-center gap-2">
                      <FaArrowDown /> Pengeluaran Bulan Ini
                  </p>
                  <h3 className="text-2xl font-bold text-slate-800">Rp -</h3>
                  <p className="text-xs text-slate-400 mt-2">Belum ada data pengeluaran</p>
              </div>
            </ScrollReveal>
        </div>

        {/* Marquee Donatur */}
        <ScrollReveal direction="up" delay={0.4}>
          <div className="bg-slate-900 rounded-xl p-3 flex items-center overflow-hidden">
              <div className="bg-aqua text-navy text-xs font-bold px-3 py-1 rounded mr-4 flex-shrink-0 animate-pulse">
                  DONASI TERBARU
              </div>
              <div className="whitespace-nowrap overflow-hidden flex-1 relative">
                  <div className="animate-marquee inline-block text-slate-300 text-sm">
                      {recent_donations.map((d: any, i: number) => (
                          <span key={i} className="mx-4">
                              <span className="text-white font-semibold">{d.name}</span> 
                              <span className="text-aqua mx-1">Rp {d.amount}</span> 
                              <span className="text-slate-500">({d.category})</span>
                              <span className="mx-2 text-slate-600">•</span>
                          </span>
                      ))}
                      {/* Duplikasi untuk efek looping */}
                      {recent_donations.map((d: any, i: number) => (
                          <span key={`dup-${i}`} className="mx-4">
                              <span className="text-white font-semibold">{d.name}</span> 
                              <span className="text-aqua mx-1">Rp {d.amount}</span> 
                              <span className="text-slate-500">({d.category})</span>
                              <span className="mx-2 text-slate-600">•</span>
                          </span>
                      ))}
                  </div>
              </div>
          </div>
        </ScrollReveal>

      </div>
      
      <style jsx>{`
        .animate-marquee {
          animation: marquee 20s linear infinite;
        }
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </section>
  );
}