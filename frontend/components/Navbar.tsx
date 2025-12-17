'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { FaMosque, FaBars, FaTimes, FaHandHoldingHeart } from 'react-icons/fa';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled ? 'bg-navy shadow-lg py-2' : 'bg-transparent py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          
          {/* LOGO & NAMA MASJID */}
          <div className="flex-shrink-0 flex items-center gap-3">
            <div className="w-10 h-10 bg-aqua rounded-lg flex items-center justify-center text-navy text-xl">
               <FaMosque />
            </div>
            <div>
              <h1 className="text-white font-bold text-lg leading-none">Masjid Al-Huda</h1>
              <p className="text-aqua text-xs font-medium">Cikumpa Griya Depok Asri</p>
            </div>
          </div>

          {/* DESKTOP MENU */}
          <nav className="hidden md:flex space-x-8">
            
            {/* Link ke Halaman Utama (Scroll) */}
            <Link href="/" className="text-gray-200 hover:text-aqua transition-colors font-medium text-sm">
                Beranda
            </Link>

            {/* Link ke Halaman Baru (Profil) */}
            <Link href="/tentang" className="text-gray-200 hover:text-aqua transition-colors font-medium text-sm">
                Profil
            </Link>

            {/* Link Scroll Lainnya */}
            {['Jadwal', 'Layanan', 'Laporan', 'Kontak'].map((item) => (
              <Link 
                key={item} 
                href={`/#${item.toLowerCase()}`} // Tambahkan '/' di depan agar bisa diakses dari halaman lain
                className="text-gray-200 hover:text-aqua transition-colors font-medium text-sm"
              >
                {item}
              </Link>
            ))}
          </nav>

          {/* CTA BUTTON */}
          <div className="hidden md:flex items-center gap-4">
            <span className="text-xs text-gray-300 font-mono bg-navy-light px-2 py-1 rounded">
              Est. 1993
            </span>
            <button 
              onClick={() => document.getElementById('donasi')?.scrollIntoView({ behavior: 'smooth' })}
              className="bg-aqua hover:bg-white hover:text-navy text-navy font-bold py-2 px-5 rounded-full transition-all transform hover:scale-105 shadow-lg flex items-center gap-2 text-sm"
            >
              <FaHandHoldingHeart />
              <span>Donasi</span>
            </button>
          </div>

          {/* MOBILE MENU BUTTON */}
          <div className="md:hidden flex items-center">
            <button 
              onClick={() => setIsOpen(!isOpen)} 
              className="text-white hover:text-aqua transition-colors"
            >
              {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* MOBILE MENU DROPDOWN */}
      {isOpen && (
        <div className="md:hidden bg-navy-light border-t border-navy-light shadow-xl absolute w-full">
          <div className="px-4 pt-2 pb-6 space-y-2">
            {['Beranda', 'Jadwal', 'Layanan', 'Laporan', 'Kontak'].map((item) => (
              <Link 
                key={item}
                href={`#${item.toLowerCase()}`} 
                className="block px-3 py-3 text-base font-medium text-white hover:bg-navy hover:text-aqua rounded-md transition-colors"
                onClick={() => setIsOpen(false)}
              >
                {item}
              </Link>
            ))}
            <button className="w-full mt-4 bg-aqua text-navy font-bold py-3 px-4 rounded-lg flex items-center justify-center gap-2">
               <FaHandHoldingHeart /> Donasi Sekarang
            </button>
          </div>
        </div>
      )}
    </header>
  );
}