'use client';

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";
import { FaHistory, FaBullseye, FaUsers, FaMosque } from 'react-icons/fa';
import Image from "next/image";

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />

      {/* 1. Header Hero Kecil */}
      <section className="pt-32 pb-16 bg-navy text-white text-center relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-aqua opacity-10 rounded-full blur-3xl -mr-10 -mt-10"></div>
        <div className="max-w-4xl mx-auto px-4 relative z-10">
          <h1 className="text-4xl font-bold mb-4">Tentang Masjid Al-Huda</h1>
          <p className="text-white/80 text-lg">
            Mengenal lebih dekat pusat ibadah dan pembinaan umat di Cikumpa Griya Depok Asri.
          </p>
        </div>
      </section>

      {/* 2. Sejarah Singkat */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="w-full md:w-1/2">
                {/* Ganti src dengan foto masjid lama/sejarah jika ada */}
                <div className="relative h-80 bg-gray-200 rounded-2xl overflow-hidden shadow-lg">
                    <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                        [Foto Sejarah Masjid]
                    </div>
                </div>
            </div>
            <div className="w-full md:w-1/2">
              <ScrollReveal direction="right">
                <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-navy/10 rounded-full flex items-center justify-center text-navy">
                        <FaHistory />
                    </div>
                    <h2 className="text-2xl font-bold text-navy">Sejarah Berdiri</h2>
                </div>
                <p className="text-slate-600 leading-relaxed mb-4">
                  Masjid Al-Huda didirikan pada tahun 1993 atas inisiatif warga Muslim di lingkungan Cikumpa Griya Depok Asri yang merindukan tempat ibadah yang layak.
                </p>
                <p className="text-slate-600 leading-relaxed">
                  Berawal dari musholla sederhana, kini Masjid Al-Huda telah berkembang menjadi pusat kegiatan keislaman yang menampung ratusan jamaah, dilengkapi dengan berbagai fasilitas sosial dan pendidikan untuk melayani umat.
                </p>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Visi & Misi */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-navy mb-4">Visi & Misi</h2>
              <div className="w-20 h-1 bg-aqua mx-auto rounded-full"></div>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Visi */}
            <ScrollReveal direction="left">
                <div className="bg-white p-8 rounded-2xl shadow-md border-t-4 border-navy h-full">
                    <div className="flex items-center gap-4 mb-6">
                        <FaMosque className="text-4xl text-aqua" />
                        <h3 className="text-2xl font-bold text-navy">Visi</h3>
                    </div>
                    <p className="text-lg text-slate-700 font-medium italic">
                        "Terwujudnya Masjid Al-Huda sebagai pusat peradaban umat yang makmur, ramah, dan melayani, serta mencetak generasi Rabbani."
                    </p>
                </div>
            </ScrollReveal>

            {/* Misi */}
            <ScrollReveal direction="right" delay={0.2}>
                <div className="bg-white p-8 rounded-2xl shadow-md border-t-4 border-aqua h-full">
                    <div className="flex items-center gap-4 mb-6">
                        <FaBullseye className="text-4xl text-navy" />
                        <h3 className="text-2xl font-bold text-navy">Misi</h3>
                    </div>
                    <ul className="space-y-3 text-slate-600">
                        <li className="flex items-start gap-3">
                            <span className="w-6 h-6 bg-navy/10 rounded-full flex items-center justify-center text-navy text-xs font-bold mt-0.5">1</span>
                            <span>Menyelenggarakan peribadatan yang khusyuk dan sesuai sunnah.</span>
                        </li>
                        <li className="flex items-start gap-3">
                            <span className="w-6 h-6 bg-navy/10 rounded-full flex items-center justify-center text-navy text-xs font-bold mt-0.5">2</span>
                            <span>Mengelola dana umat (ZISWAF) secara transparan dan produktif.</span>
                        </li>
                        <li className="flex items-start gap-3">
                            <span className="w-6 h-6 bg-navy/10 rounded-full flex items-center justify-center text-navy text-xs font-bold mt-0.5">3</span>
                            <span>Menyediakan layanan sosial (ambulans, santunan) yang mudah diakses.</span>
                        </li>
                    </ul>
                </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* 4. Struktur Pengurus (DKM) */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <ScrollReveal>
                <div className="text-center mb-12">
                    <div className="flex items-center justify-center gap-3 mb-2 text-navy">
                        <FaUsers className="text-2xl" />
                        <h2 className="text-3xl font-bold">Pengurus DKM</h2>
                    </div>
                    <p className="text-slate-500">Khadimul Ummah (Pelayan Umat) Periode 2024-2027</p>
                </div>
            </ScrollReveal>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
                {/* Item Pengurus */}
                {[
                    { name: 'H. Fulan Abdullah', role: 'Ketua DKM' },
                    { name: 'Ust. Ahmad Zaki', role: 'Imam Besar' },
                    { name: 'Bpk. Budi Santoso', role: 'Bendahara' },
                    { name: 'Sdr. Rizky', role: 'Ketua Remaja' },
                ].map((person, idx) => (
                    <ScrollReveal key={idx} delay={idx * 0.1}>
                        <div className="group">
                            <div className="w-32 h-32 mx-auto bg-gray-200 rounded-full mb-4 overflow-hidden border-4 border-white shadow-lg group-hover:border-aqua transition-colors">
                                {/* Placeholder Foto */}
                                <div className="w-full h-full flex items-center justify-center bg-slate-300 text-slate-500 text-4xl">
                                    <FaUsers /> 
                                </div>
                            </div>
                            <h4 className="font-bold text-navy text-lg">{person.name}</h4>
                            <p className="text-aqua text-sm font-medium">{person.role}</p>
                        </div>
                    </ScrollReveal>
                ))}
            </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}