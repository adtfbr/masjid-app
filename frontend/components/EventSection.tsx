'use client';

import { useState, useEffect } from 'react';
import { FaCalendarAlt, FaClock, FaMapMarkerAlt, FaUserTie } from 'react-icons/fa';
import ScrollReveal from './ScrollReveal';
import axios from 'axios';
import moment from 'moment';
import 'moment/locale/id';
import Link from 'next/link';

export default function EventSection() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  // MENGGUNAKAN ENV VARIABLE DENGAN FALLBACK
  const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000';
  const STORAGE_URL = process.env.NEXT_PUBLIC_STORAGE_URL || 'http://127.0.0.1:8000/storage/';

  useEffect(() => {
    // Panggil API menggunakan variable
    axios.get(`${API_URL}/api/public-data`)
      .then(res => {
        if(res.data.success) {
          setEvents(res.data.data.events);
        }
      })
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, []); // Hapus API_URL dari dependency agar tidak re-render berulang

  if (loading) return null;
  if (events.length === 0) return null;

  return (
    <section id="agenda" className="py-20 bg-slate-50 relative overflow-hidden">
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-96 h-96 bg-navy/5 rounded-full blur-3xl -mr-20"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <ScrollReveal>
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-navy mb-4">Agenda & Kegiatan</h2>
            <div className="w-20 h-1 bg-aqua mx-auto rounded-full mb-4"></div>
            <p className="text-slate-500 max-w-2xl mx-auto">
              Hadirilah majelis ilmu dan kegiatan sosial untuk mempererat ukhuwah.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {events.map((event: any, index) => (
            <ScrollReveal key={event.id} delay={index * 0.1}>
              <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl hover:border-aqua/30 transition-all duration-300 group h-full flex flex-col">
                
                {/* Poster Image */}
                <div className="relative h-48 w-full bg-gray-200 overflow-hidden">
                    {event.image ? (
                        <img 
                            src={`${STORAGE_URL}${event.image}`} 
                            alt={event.title}
                            className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                        />
                    ) : (
                        <div className="w-full h-full bg-navy flex items-center justify-center relative">
                             <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_1px_1px,#fff_1px,transparent_0)] bg-[size:10px_10px]"></div>
                             <FaCalendarAlt className="text-white/20 text-6xl" />
                        </div>
                    )}
                    
                    <div className="absolute top-4 left-4">
                        <span className="text-xs font-bold px-3 py-1 rounded-full bg-white/90 text-navy shadow-sm backdrop-blur-sm">
                            {event.category}
                        </span>
                    </div>
                </div>

                {/* Body Kartu */}
                <div className="p-6 flex-1 flex flex-col">
                  <div className="flex items-center gap-2 text-slate-500 text-xs mb-3 font-medium">
                    <FaCalendarAlt className="text-aqua" />
                    <span>{moment(event.date).format('dddd, D MMMM YYYY')}</span>
                  </div>

                  <h3 className="text-xl font-bold text-navy mb-3 group-hover:text-aqua transition-colors line-clamp-2 leading-snug">
                    {event.title}
                  </h3>
                  
                  <div className="space-y-3 text-sm text-slate-600 mt-auto pt-4 border-t border-dashed border-gray-100">
                    {event.speaker && (
                      <div className="flex items-start gap-3">
                        <FaUserTie className="text-aqua mt-1 shrink-0" />
                        <span>{event.speaker}</span>
                      </div>
                    )}
                    <div className="flex items-center gap-3">
                      <FaClock className="text-aqua shrink-0" />
                      <span>{event.time}</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <FaMapMarkerAlt className="text-aqua mt-1 shrink-0" />
                      <span>{event.location}</span>
                    </div>
                  </div>
                </div>

                {/* Footer Kartu (Action) */}
                <div className="p-4 border-t border-gray-100 bg-gray-50 text-center">
                  <Link 
                    href={`/agenda/${event.slug}`}
                    className="text-navy text-sm font-bold hover:text-aqua transition-colors w-full block"
                  >
                    Detail Kegiatan &rarr;
                  </Link>
                </div>

              </div>
            </ScrollReveal>
          ))}
        </div>

      </div>
    </section>
  );
}