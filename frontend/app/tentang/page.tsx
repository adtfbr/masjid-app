'use client';

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";
import { FaHistory, FaBullseye, FaUsers, FaMosque, FaHandHoldingHeart } from 'react-icons/fa';

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />

      {/* 1. Header Hero */}
      <section className="pt-32 pb-20 bg-navy text-white text-center relative overflow-hidden">
        {/* Dekorasi Background */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 opacity-20">
            <div className="absolute -top-24 -left-24 w-96 h-96 bg-aqua rounded-full blur-[100px]"></div>
            <div className="absolute top-1/2 right-0 w-64 h-64 bg-white rounded-full blur-[80px]"></div>
        </div>

        <div className="max-w-4xl mx-auto px-4 relative z-10">
          <ScrollReveal>
            <span className="inline-block py-1 px-3 rounded-full bg-white/10 border border-white/20 text-aqua text-xs font-semibold mb-4 backdrop-blur-sm">
                Profil Masjid
            </span>
            <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
                Mengenal Lebih Dekat <br/> Masjid Al-Huda
            </h1>
            <p className="text-slate-300 text-lg max-w-2xl mx-auto leading-relaxed">
                Pusat ibadah dan pembinaan umat di Cikumpa Griya Depok Asri. 
                Berkhidmat melayani jamaah, membangun peradaban.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* 2. Sejarah Singkat */}
      <section className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center gap-16">
            <div className="w-full md:w-1/2">
                <ScrollReveal direction="left">
                    <div className="relative h-[400px] bg-slate-200 rounded-3xl overflow-hidden shadow-2xl border-8 border-white transform -rotate-2 hover:rotate-0 transition-all duration-500">
                        {/* Placeholder Foto Sejarah - Bisa diganti nanti */}
                        <div className="absolute inset-0 flex flex-col items-center justify-center text-slate-400 bg-slate-100">
                            <FaHistory className="text-6xl mb-4 opacity-20" />
                            <span className="text-sm font-semibold">[Foto Dokumentasi Lama/Baru]</span>
                        </div>
                    </div>
                </ScrollReveal>
            </div>
            <div className="w-full md:w-1/2">
              <ScrollReveal direction="right" delay={0.2}>
                <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 bg-navy/10 rounded-full flex items-center justify-center text-navy text-xl">
                        <FaMosque />
                    </div>
                    <h2 className="text-3xl font-bold text-navy">Sejarah & Perjalanan</h2>
                </div>
                <div className="space-y-4 text-slate-600 leading-relaxed text-justify">
                    <p>
                    <strong>Masjid Al-Huda</strong> berdiri pada tahun <strong>1993</strong>, bermula dari semangat gotong royong warga Muslim di lingkungan Cikumpa Griya Depok Asri yang mendambakan sarana ibadah yang representatif.
                    </p>
                    <p>
                    Awalnya hanya berupa bangunan sederhana, namun seiring bertambahnya jumlah jamaah dan dukungan masyarakat, masjid ini terus mengalami renovasi dan perluasan. Kini, Al-Huda bukan sekadar tempat sholat, melainkan pusat ekosistem umat.
                    </p>
                    <p>
                    Dengan semangat <em>"Masjid Peduli Umat & Masyarakat"</em>, kami terus berinovasi menghadirkan program-program yang menyentuh langsung kebutuhan jamaah, mulai dari layanan ambulans, santunan, hingga pendidikan Al-Quran.
                    </p>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Visi & Misi Cards */}
      <section className="py-24 bg-slate-50 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <ScrollReveal>
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-navy mb-4">Visi & Misi</h2>
              <div className="w-24 h-1.5 bg-aqua mx-auto rounded-full"></div>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Visi */}
            <ScrollReveal direction="up" delay={0.1} className="h-full">
                <div className="bg-white p-10 rounded-3xl shadow-xl hover:shadow-2xl transition-shadow border-t-8 border-navy h-full flex flex-col items-center text-center">
                    <div className="w-20 h-20 bg-navy/5 rounded-full flex items-center justify-center text-navy text-4xl mb-6">
                        <FaBullseye />
                    </div>
                    <h3 className="text-2xl font-bold text-navy mb-4">Visi Kami</h3>
                    <p className="text-lg text-slate-600 font-medium leading-relaxed italic">
                        "Terwujudnya Masjid Al-Huda sebagai pusat peradaban umat yang makmur, ramah, dan melayani, serta mencetak generasi Rabbani yang bermanfaat bagi masyarakat."
                    </p>
                </div>
            </ScrollReveal>

            {/* Misi */}
            <ScrollReveal direction="up" delay={0.2} className="h-full">
                <div className="bg-white p-10 rounded-3xl shadow-xl hover:shadow-2xl transition-shadow border-t-8 border-aqua h-full flex flex-col">
                    <div className="flex items-center gap-4 mb-6">
                        <div className="w-16 h-16 bg-aqua/10 rounded-full flex items-center justify-center text-aqua text-3xl shrink-0">
                            <FaHandHoldingHeart />
                        </div>
                        <h3 className="text-2xl font-bold text-navy">Misi Utama</h3>
                    </div>
                    <ul className="space-y-4 text-slate-600">
                        <li className="flex items-start gap-4">
                            <span className="w-6 h-6 bg-navy text-white rounded-full flex items-center justify-center text-xs font-bold mt-0.5 shrink-0">1</span>
                            <span>Menyelenggarakan peribadatan yang khusyuk, nyaman, dan sesuai sunnah Rasulullah SAW.</span>
                        </li>
                        <li className="flex items-start gap-4">
                            <span className="w-6 h-6 bg-navy text-white rounded-full flex items-center justify-center text-xs font-bold mt-0.5 shrink-0">2</span>
                            <span>Mengelola dana umat (Infaq, Shodaqoh, Wakaf) secara transparan, akuntabel, dan produktif.</span>
                        </li>
                        <li className="flex items-start gap-4">
                            <span className="w-6 h-6 bg-navy text-white rounded-full flex items-center justify-center text-xs font-bold mt-0.5 shrink-0">3</span>
                            <span>Menyediakan layanan sosial dan pendidikan yang mudah diakses oleh seluruh lapisan masyarakat.</span>
                        </li>
                    </ul>
                </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* 4. Struktur DKM (Grid) */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <ScrollReveal>
                <div className="text-center mb-16">
                    <h2 className="text-3xl font-bold text-navy mb-2">Struktur Pengurus DKM</h2>
                    <p className="text-slate-500">Khadimul Ummah (Pelayan Umat) Masjid Al-Huda</p>
                </div>
            </ScrollReveal>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                {[
                    { name: 'H. Nama Ketua', role: 'Ketua DKM' },
                    { name: 'Ust. Nama Imam', role: 'Imam Besar' },
                    { name: 'Bpk. Nama Sekretaris', role: 'Sekretaris' },
                    { name: 'Bpk. Nama Bendahara', role: 'Bendahara' },
                ].map((person, idx) => (
                    <ScrollReveal key={idx} delay={idx * 0.1}>
                        <div className="group bg-white p-6 rounded-2xl border border-slate-100 hover:border-aqua transition-all hover:shadow-lg">
                            <div className="w-24 h-24 mx-auto bg-slate-100 rounded-full mb-4 overflow-hidden border-2 border-slate-200 group-hover:border-aqua transition-colors flex items-center justify-center text-slate-300">
                                <FaUsers className="text-3xl" />
                            </div>
                            <h4 className="font-bold text-navy text-lg leading-tight mb-1">{person.name}</h4>
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