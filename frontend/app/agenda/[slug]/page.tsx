'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import api from '@/lib/axios'; // ✅ WAJIB
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  FaCalendarAlt,
  FaClock,
  FaMapMarkerAlt,
  FaUserTie,
  FaWhatsapp,
  FaArrowLeft,
  FaCheckCircle
} from 'react-icons/fa';
import moment from 'moment';
import 'moment/locale/id';
import Link from 'next/link';

export default function EventDetailPage() {
  const { slug } = useParams<{ slug: string }>();

  const [event, setEvent] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const STORAGE_URL =
    process.env.NEXT_PUBLIC_STORAGE_URL || 'http://127.0.0.1:8000/storage/';

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        // ✅ ENDPOINT BENAR
        const res = await api.get('/public/initial-data');

        if (res.data?.data?.events) {
          const found = res.data.data.events.find(
            (e: any) => e.slug === slug && e.is_active
          );
          setEvent(found || null);
        }
      } catch (err) {
        console.error('Gagal mengambil detail kegiatan:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchEvent();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-navy">
        Memuat Detail...
      </div>
    );
  }

  if (!event) {
    return (
      <main className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-1 flex items-center justify-center text-slate-500">
          Kegiatan tidak ditemukan.
        </div>
        <Footer />
      </main>
    );
  }

  const message = `Assalamualaikum Admin, saya ingin bertanya informasi lebih lanjut mengenai kegiatan: ${event.title}.`;
  const waLink = `https://wa.me/628567861311?text=${encodeURIComponent(message)}`;

  return (
    <main className="min-h-screen bg-white">
      <Navbar />

      <section className="pt-32 pb-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          
          <Link
            href="/#agenda"
            className="inline-flex items-center text-slate-500 hover:text-navy mb-6 text-sm font-medium"
          >
            <FaArrowLeft className="mr-2" /> Kembali ke Agenda
          </Link>

          <div className="rounded-3xl overflow-hidden shadow-2xl mb-10 bg-gray-100 border">
            {event.poster ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={`${STORAGE_URL}${event.poster}`}
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
            
            {/* KONTEN */}
            <div className="md:w-2/3">
              <h1 className="text-3xl md:text-4xl font-bold text-navy mb-6">
                {event.title}
              </h1>

              <div className="inline-flex items-center gap-2 bg-green-50 text-green-700 px-4 py-2 rounded-lg text-sm font-semibold mb-8">
                <FaCheckCircle />
                Terbuka untuk Umum (Ikhwan & Akhwat)
              </div>

              <div className="prose prose-lg text-slate-600">
                {event.description
                  ? event.description.split('\n').map((line: string, i: number) => (
                      <p key={i}>{line}</p>
                    ))
                  : <p className="italic text-slate-400">Belum ada deskripsi detail.</p>
                }
              </div>
            </div>

            {/* SIDEBAR */}
            <div className="md:w-1/3">
              <div className="bg-slate-50 p-6 rounded-2xl border sticky top-28">
                <h3 className="text-lg font-bold text-navy mb-4 border-b pb-2">
                  Waktu & Tempat
                </h3>

                <div className="space-y-4 mb-8">
                  <div className="flex gap-3">
                    <FaCalendarAlt className="text-aqua mt-1" />
                    <span>
                      {moment(event.start_time).format('dddd, D MMMM YYYY')}
                    </span>
                  </div>

                  <div className="flex gap-3">
                    <FaClock className="text-aqua mt-1" />
                    <span>
                      {moment(event.start_time).format('HH:mm')}
                    </span>
                  </div>

                  {event.lecturer && (
                    <div className="flex gap-3">
                      <FaUserTie className="text-aqua mt-1" />
                      <span>{event.lecturer}</span>
                    </div>
                  )}

                  <div className="flex gap-3">
                    <FaMapMarkerAlt className="text-aqua mt-1" />
                    <span>{event.location}</span>
                  </div>
                </div>

                <a
                  href={waLink}
                  target="_blank"
                  className="block w-full bg-white border-2 border-green-600 text-green-600 hover:bg-green-50 font-bold py-3 rounded-xl flex items-center justify-center gap-2"
                >
                  <FaWhatsapp className="text-xl" />
                  Tanya Admin
                </a>
              </div>
            </div>

          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
