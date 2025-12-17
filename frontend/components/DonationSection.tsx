'use client';

import { useState } from 'react';
import Image from 'next/image';
import { FaWhatsapp, FaCopy, FaCheckCircle, FaHandHoldingHeart, FaInfoCircle } from 'react-icons/fa';
import ScrollReveal from './ScrollReveal'; // Import Helper

export default function DonationSection() {
  const [activeTab, setActiveTab] = useState('operasional');
  const [copied, setCopied] = useState(false);
  const [hasTransferred, setHasTransferred] = useState(false);
  const [amount, setAmount] = useState('');

  const bankDetails = {
    bank: 'BSI (Bank Syariah Indonesia)',
    number: '7299835515',
    name: 'MASJID AL HUDA CIKUMPA GRIYA'
  };

  const categories = [
    { id: 'operasional', label: 'Operasional', desc: 'Listrik, Air, Kebersihan & Imam' },
    { id: 'yatim', label: 'Pendidikan Yatim', desc: 'Beasiswa & Biaya Sekolah Yatim' },
    { id: 'makan', label: 'Makan Gratis', desc: '100 Porsi Jumat Berkah' },
    { id: 'infaq', label: 'Infaq Umum', desc: 'Pengembangan Fasilitas Masjid' },
  ];

  const handleCopy = () => {
    navigator.clipboard.writeText(bankDetails.number);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleConfirm = () => {
    if (!hasTransferred) return;

    const formattedAmount = amount ? `Rp ${parseInt(amount).toLocaleString('id-ID')}` : 'sekian';
    const categoryName = categories.find(c => c.id === activeTab)?.label;

    const message = `Assalamualaikum Admin Masjid Al-Huda.
Saya sudah melakukan transfer donasi.

📂 Kategori: ${categoryName}
💰 Nominal: ${formattedAmount}
🏦 Ke Bank: ${bankDetails.bank}

Mohon dicek. Terima kasih.`;

    const url = `https://wa.me/628567861311?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  return (
    <section id="donasi" className="py-20 bg-slate-50 relative overflow-hidden">
      
      <div className="absolute top-0 left-0 w-64 h-64 bg-navy opacity-5 rounded-full blur-3xl -ml-20 -mt-20"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="flex flex-col lg:flex-row gap-12 items-start">
          
          {/* BAGIAN KIRI (Animasi dari Kiri) */}
          <div className="w-full lg:w-3/5">
            <ScrollReveal direction="left">
                <h2 className="text-3xl font-bold text-navy mb-4">Salurkan Infaq Terbaik</h2>
                <p className="text-slate-600 mb-8 leading-relaxed">
                Dukung program kebaikan Masjid Al-Huda Cikumpa. Harta tidak akan berkurang karena sedekah, melainkan bertambah keberkahannya.
                </p>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-8">
                {categories.map((cat) => (
                    <button
                    key={cat.id}
                    onClick={() => setActiveTab(cat.id)}
                    className={`px-2 py-3 rounded-lg text-xs md:text-sm font-semibold transition-all duration-300 border ${
                        activeTab === cat.id
                        ? 'bg-navy text-white border-navy shadow-lg shadow-navy/20'
                        : 'bg-white text-slate-500 border-gray-200 hover:border-aqua hover:text-navy'
                    }`}
                    >
                    {cat.label}
                    </button>
                ))}
                </div>

                <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 bg-aqua/10 rounded-full flex items-center justify-center text-aqua text-xl">
                    <FaHandHoldingHeart />
                    </div>
                    <div>
                    <h4 className="font-bold text-navy text-lg">
                        {categories.find(c => c.id === activeTab)?.label}
                    </h4>
                    <p className="text-sm text-slate-500">
                        {categories.find(c => c.id === activeTab)?.desc}
                    </p>
                    </div>
                </div>
                </div>

                <div className="mt-8 p-4 bg-navy/5 rounded-xl border-l-4 border-navy flex gap-3">
                    <FaInfoCircle className="text-navy mt-1 flex-shrink-0" />
                    <p className="text-sm text-slate-600 italic">
                        "Naungan orang beriman di hari Kiamat adalah sedekahnya." (HR. Ahmad)
                    </p>
                </div>
            </ScrollReveal>
          </div>

          {/* BAGIAN KANAN (Animasi dari Kanan) */}
          <div className="w-full lg:w-2/5">
            <ScrollReveal direction="right" delay={0.2}>
                <div className="bg-white rounded-3xl shadow-2xl shadow-navy/10 border border-gray-100 overflow-hidden relative">
                <div className="bg-navy p-4 text-center">
                    <h3 className="text-white font-bold">Transfer Donasi</h3>
                    <p className="text-aqua text-xs">Rekening Resmi Yayasan</p>
                </div>
                
                <div className="p-6 flex flex-col items-center">
                    
                    <div className="w-48 h-48 bg-gray-100 border-4 border-white shadow-inner rounded-xl overflow-hidden relative mb-6">
                        <Image 
                        src="https://upload.wikimedia.org/wikipedia/commons/d/d0/QR_code_for_mobile_English_Wikipedia.svg" 
                        alt="QRIS Masjid"
                        fill
                        className="object-cover p-2"
                        />
                    </div>

                    <div className="w-full bg-slate-50 rounded-xl p-4 border border-dashed border-slate-300 mb-6">
                    <p className="text-xs text-slate-500 text-center mb-1">{bankDetails.bank}</p>
                    <div className="flex items-center justify-between bg-white px-3 py-2 rounded border border-gray-200">
                        <span className="font-mono font-bold text-lg text-slate-700 tracking-wide">{bankDetails.number}</span>
                        <button 
                        onClick={handleCopy}
                        className="text-navy hover:text-aqua transition-colors focus:outline-none p-1"
                        title="Salin Nomor"
                        >
                        {copied ? <FaCheckCircle className="text-green-500" /> : <FaCopy />}
                        </button>
                    </div>
                    <p className="text-xs text-center text-slate-400 mt-1 uppercase truncate px-2" title={bankDetails.name}>
                        a.n {bankDetails.name}
                    </p>
                    </div>

                    <div className="w-full mb-4">
                        <label className="block text-xs font-semibold text-slate-500 mb-1 ml-1">Nominal (Opsional)</label>
                        <div className="relative">
                            <span className="absolute left-3 top-2.5 text-slate-400 text-sm font-bold">Rp</span>
                            <input 
                                type="number" 
                                placeholder="0"
                                value={amount}
                                onChange={(e) => setAmount(e.target.value)}
                                className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-aqua focus:ring-1 focus:ring-aqua transition-all font-mono"
                            />
                        </div>
                    </div>

                    <div className="w-full mb-4 flex items-start gap-2 p-3 bg-yellow-50 rounded-lg border border-yellow-100">
                        <input 
                            type="checkbox" 
                            id="confirmCheck"
                            checked={hasTransferred}
                            onChange={(e) => setHasTransferred(e.target.checked)}
                            className="mt-1 w-4 h-4 text-navy rounded border-gray-300 focus:ring-navy cursor-pointer"
                        />
                        <label htmlFor="confirmCheck" className="text-xs text-slate-600 cursor-pointer select-none leading-relaxed">
                            Saya sudah transfer ke rekening di atas.
                        </label>
                    </div>

                    <button 
                    onClick={handleConfirm}
                    disabled={!hasTransferred}
                    className={`w-full font-bold py-3 rounded-xl transition-all flex items-center justify-center gap-2 shadow-lg ${
                        hasTransferred 
                            ? 'bg-green-600 hover:bg-green-700 text-white cursor-pointer shadow-green-600/20 transform hover:-translate-y-1' 
                            : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                    }`}
                    >
                    <FaWhatsapp className="text-xl" />
                    Konfirmasi via WhatsApp
                    </button>

                </div>
                </div>
            </ScrollReveal>
          </div>

        </div>
      </div>
    </section>
  );
}