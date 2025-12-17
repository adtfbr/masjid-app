'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import moment from 'moment';
import ScrollReveal from './ScrollReveal'; // Pastikan path ini benar

interface PrayerData {
  city: string;
  hijri: string;
  timings: {
    [key: string]: string;
  };
}

export default function PrayerTimes() {
  const [data, setData] = useState<PrayerData | null>(null);
  const [loading, setLoading] = useState(true);
  
  const [nextPrayer, setNextPrayer] = useState<string>('-');
  const [countdown, setCountdown] = useState<string>('00:00:00');

  useEffect(() => {
    fetchSchedule();
  }, []);

  useEffect(() => {
    if (!data) return;
    const timer = setInterval(() => {
      calculateNextPrayer(data.timings);
    }, 1000);
    return () => clearInterval(timer);
  }, [data]);

  const fetchSchedule = async () => {
    try {
      const res = await axios.get('http://127.0.0.1:8000/api/prayer-times');
      if (res.data.success) {
        setData(res.data.data);
        calculateNextPrayer(res.data.data.timings);
      }
    } catch (error) {
      console.error('Gagal ambil jadwal:', error);
    } finally {
      setLoading(false);
    }
  };

  const calculateNextPrayer = (timings: { [key: string]: string }) => {
    const now = moment();
    let foundNext = false;
    let nextPrayerName = 'Subuh';
    let nextPrayerTime = moment(timings['Subuh'], 'HH:mm').add(1, 'days');

    // Urutan waktu sholat (Keluarkan 'Terbit' jika ingin 5 waktu saja)
    const order = ['Subuh', 'Terbit', 'Dzuhur', 'Ashar', 'Maghrib', 'Isya'];

    for (const name of order) {
      const timeStr = timings[name];
      const timeMoment = moment(timeStr, 'HH:mm');
      if (timeMoment.isAfter(now)) {
        nextPrayerName = name;
        nextPrayerTime = timeMoment;
        foundNext = true;
        break;
      }
    }

    setNextPrayer(nextPrayerName);
    const duration = moment.duration(nextPrayerTime.diff(now));
    setCountdown(`${String(duration.hours()).padStart(2, '0')}:${String(duration.minutes()).padStart(2, '0')}:${String(duration.seconds()).padStart(2, '0')}`);
  };

  if (loading) {
    return (
      <section className="max-w-7xl mx-auto px-4 -mt-12 relative z-20 mb-12">
        <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 flex justify-center h-40 items-center">
            <div className="w-8 h-8 border-4 border-aqua border-t-transparent rounded-full animate-spin"></div>
        </div>
      </section>
    );
  }

  if (!data) return null;

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-16 relative z-20 mb-12">
      <ScrollReveal>
        <div className="bg-white rounded-3xl shadow-xl shadow-gray-200/50 border border-gray-100 p-6 lg:p-8 overflow-hidden">
          <div className="flex flex-col xl:flex-row items-center justify-between gap-8">
              
              {/* KOLOM KIRI: INFO WAKTU & COUNTDOWN */}
              <div className="text-center xl:text-left border-b xl:border-b-0 xl:border-r border-gray-100 pb-6 xl:pb-0 xl:pr-10 w-full xl:w-auto min-w-[250px]">
                  <div className="inline-block bg-navy/5 px-3 py-1 rounded-full mb-3">
                    <p className="text-navy text-xs font-bold uppercase tracking-widest">
                        📍 {data.city}
                    </p>
                  </div>
                  <h3 className="text-sm text-slate-500 font-medium mb-1">
                      Menuju <span className="text-aqua font-bold">{nextPrayer}</span>
                  </h3>
                  <div className="text-5xl font-mono font-bold text-navy tracking-tight my-2">
                      {countdown}
                  </div>
                  <p className="text-xs text-slate-400 font-medium">
                    📅 {data.hijri}
                  </p>
              </div>

              {/* KOLOM KANAN: GRID JADWAL SHOLAT (RESPONSIF) */}
              <div className="flex-1 w-full">
                  {/* Gunakan Grid: 3 Kolom di HP, 6 Kolom di Tablet/Desktop */}
                  <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
                      {Object.entries(data.timings).map(([name, time]) => {
                          const isNext = name === nextPrayer;
                          return (
                              <div key={name} className={`relative flex flex-col items-center justify-center p-3 rounded-2xl transition-all duration-300 w-full aspect-square md:aspect-auto md:h-24 ${
                                  isNext 
                                      ? 'bg-navy text-white shadow-lg shadow-navy/30 scale-105 ring-2 ring-offset-2 ring-aqua z-10' 
                                      : 'bg-slate-50 hover:bg-white hover:shadow-md border border-transparent hover:border-gray-100 text-slate-600'
                              }`}>
                                  {/* Indikator Aktif (Titik Hijau) */}
                                  {isNext && (
                                    <span className="absolute top-2 right-2 w-2 h-2 bg-aqua rounded-full animate-pulse"></span>
                                  )}
                                  
                                  <span className={`text-[10px] sm:text-xs font-bold uppercase tracking-wider mb-1 ${isNext ? 'text-aqua' : 'text-slate-400'}`}>
                                      {name}
                                  </span>
                                  <span className="text-lg sm:text-xl font-bold font-mono tracking-tight">{time}</span>
                              </div>
                          );
                      })}
                  </div>
              </div>

          </div>
        </div>
      </ScrollReveal>
    </section>
  );
}