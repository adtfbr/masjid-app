'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import axios from 'axios';
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { FaCalendarAlt, FaClock, FaMapMarkerAlt, FaUserTie, FaWhatsapp, FaArrowLeft, FaCheckCircle } from 'react-icons/fa';
import moment from 'moment';
import 'moment/locale/id';
import Link from 'next/link';

export default function EventDetailPage() {
  const params = useParams();
  const { slug } = params;
  
  const [event, setEvent] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // URL Storage (Sesuaikan port backend)
  const STORAGE_URL = 'http://127.0.0.1:8000/storage/';

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/public-data')
      .then(res => {
        if(res.data.success) {
          const found = res.data.data.events.find((e: any) => e.slug === slug);
          setEvent(found);
        }
      })
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) return <div className="min-h-screen flex items-center justify-center text-navy">Memuat Detail...</div>;
  
  if (!event) return (
    <main className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-1 flex items-center justify-center text-slate-500">
            Kegiatan tidak ditemukan.
        </div>
        <Footer />
    </main>
  );

  // Template Pesan WA (Revisi: Bertanya Info, bukan Daftar)
  const message = `Assalamualaikum Admin, saya ingin bertanya informasi lebih lanjut mengenai kegiatan: ${event.title}.`;
  const waLink = `https://wa.me/628567861311?text=${encodeURIComponent(message)}`;

  return (
    <main className="min-h-screen bg-white">
      <Navbar />

      <section className="pt-32 pb-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
            
            {/* Breadcrumb / Back */}
            <Link href="/#agenda" className="inline-flex items-center text-slate-500 hover:text-navy mb-6 text-sm font-medium transition-colors">
                <FaArrowLeft className="mr-2" /> Kembali ke Agenda
            </Link>

            {/* Poster Image (Banner) */}
            <div className="rounded-3xl overflow-hidden shadow-2xl mb-10 bg-gray-100 border border-slate-100">
                {event.image ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img 
                        src={`${STORAGE_URL}${event.image}`} 
                        alt={event.title}
                        className="w-full h-auto max-h-[500px] object-cover"
                    />
                ) : (
                    <div className="h-64 flex items-center justify-center bg-navy text-white/30 text-xl font-bold">
                        Poster Belum Tersedia
                    </div>
                )}
            </div>

            <div className="flex flex-col md:flex-row gap-10">
                
                {/* Kolom Kiri: Konten Utama */}
                <div className="md:w-2/3">
                    <span className="text-aqua font-bold tracking-wider text-sm uppercase mb-2 block">
                        {event.category}
                    </span>
                    <h1 className="text-3xl md:text-4xl font-bold text-navy mb-6 leading-tight">
                        {event.title}
                    </h1>

                    {/* Label Terbuka Umum */}
                    <div className="inline-flex items-center gap-2 bg-green-50 text-green-700 px-4 py-2 rounded-lg text-sm font-semibold mb-8 border border-green-100">
                        <FaCheckCircle />
                        Terbuka untuk Umum (Ikhwan & Akhwat)
                    </div>

                    <div className="prose prose-lg text-slate-600 leading-relaxed mb-8">
                        {/* Render Deskripsi (Support Newline) */}
                        {event.description?.split('\n').map((line: string, i: number) => (
                            <p key={i} className="mb-4">{line}</p>
                        ))}
                        {!event.description && <p className="italic text-slate-400">Belum ada deskripsi detail.</p>}
                    </div>
                </div>

                {/* Kolom Kanan: Sidebar Info & CTA */}
                <div className="md:w-1/3">
                    <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 sticky top-28">
                        <h3 className="text-lg font-bold text-navy mb-4 border-b border-slate-200 pb-2">
                            Waktu & Tempat
                        </h3>
                        
                        <div className="space-y-4 mb-8">
                            <div className="flex items-start gap-3">
                                <FaCalendarAlt className="text-aqua mt-1 text-lg" />
                                <div>
                                    <span className="block text-xs text-slate-400 font-bold uppercase">Tanggal</span>
                                    <span className="text-slate-700 font-medium">
                                        {moment(event.date).format('dddd, D MMMM YYYY')}
                                    </span>
                                </div>
                            </div>

                            <div className="flex items-start gap-3">
                                <FaClock className="text-aqua mt-1 text-lg" />
                                <div>
                                    <span className="block text-xs text-slate-400 font-bold uppercase">Waktu</span>
                                    <span className="text-slate-700 font-medium">{event.time}</span>
                                </div>
                            </div>

                            {event.speaker && (
                                <div className="flex items-start gap-3">
                                    <FaUserTie className="text-aqua mt-1 text-lg" />
                                    <div>
                                        <span className="block text-xs text-slate-400 font-bold uppercase">Pemateri</span>
                                        <span className="text-slate-700 font-medium">{event.speaker}</span>
                                    </div>
                                </div>
                            )}

                            <div className="flex items-start gap-3">
                                <FaMapMarkerAlt className="text-aqua mt-1 text-lg" />
                                <div>
                                    <span className="block text-xs text-slate-400 font-bold uppercase">Lokasi</span>
                                    <span className="text-slate-700 font-medium">{event.location}</span>
                                </div>
                            </div>
                        </div>

                        {/* Tombol Tanya Admin (Bukan Daftar) */}
                        <a 
                            href={waLink}
                            target="_blank"
                            className="block w-full bg-white border-2 border-green-600 text-green-600 hover:bg-green-50 font-bold py-3 rounded-xl transition-all flex items-center justify-center gap-2"
                        >
                            <FaWhatsapp className="text-xl" />
                            Tanya Admin
                        </a>
                        <p className="text-xs text-center text-slate-400 mt-3 italic">
                            Acara ini Gratis & Tanpa Pendaftaran. Silakan langsung hadir.
                        </p>
                    </div>
                </div>

            </div>

        </div>
      </section>

      <Footer />
    </main>
  );
}