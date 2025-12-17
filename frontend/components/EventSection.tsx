'use client';

import { useState, useEffect } from 'react';
import { FaCalendarAlt, FaClock, FaMapMarkerAlt, FaUserTie } from 'react-icons/fa';
import ScrollReveal from './ScrollReveal';
import axios from 'axios';
import moment from 'moment';
import 'moment/locale/id'; // Bahasa Indonesia

export default function EventSection() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/public-data')
      .then(res => {
        if(res.data.success) {
          setEvents(res.data.data.events);
        }
      })
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return null; // Atau tampilkan loading spinner
  if (events.length === 0) return null; // Sembunyikan jika tidak ada event

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
                
                <div className="bg-navy p-4 flex justify-between items-center">
                  <span className="text-xs font-bold px-3 py-1 rounded-full bg-aqua/20 text-aqua">
                    {event.category}
                  </span>
                  <div className="flex items-center gap-2 text-white/80 text-sm">
                    <FaCalendarAlt className="text-aqua" />
                    <span>{moment(event.date).format('dddd, D MMM YYYY')}</span>
                  </div>
                </div>

                <div className="p-6 flex-1 flex flex-col">
                  <h3 className="text-xl font-bold text-navy mb-3 group-hover:text-aqua transition-colors line-clamp-2">
                    {event.title}
                  </h3>
                  
                  <div className="space-y-3 text-sm text-slate-600 mt-auto">
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

                <div className="p-4 border-t border-gray-100 bg-gray-50 text-center">
                  <button className="text-navy text-sm font-bold hover:text-aqua transition-colors w-full">
                    Detail Kegiatan &rarr;
                  </button>
                </div>

              </div>
            </ScrollReveal>
          ))}
        </div>

      </div>
    </section>
  );
}