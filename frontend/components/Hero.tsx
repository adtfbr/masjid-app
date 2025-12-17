'use client';

import { FaHeart, FaCalculator, FaWhatsapp, FaClock, FaMapMarkerAlt } from 'react-icons/fa';
import { motion } from 'framer-motion';

export default function Hero() {
  return (
    <section id="beranda" className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden bg-navy">
      
      {/* Background Shapes (Parallax effect simple) */}
      <motion.div 
        animate={{ scale: [1, 1.1, 1], rotate: [0, 5, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 rounded-full bg-aqua opacity-10 blur-3xl"
      />
      <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 rounded-full bg-white opacity-5 blur-3xl"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col-reverse lg:flex-row items-center gap-12">
        
        {/* TEXT CONTENT (Masuk dari Kiri) */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="w-full lg:w-1/2 text-center lg:text-left"
        >
          <div className="inline-flex items-center px-3 py-1 rounded-full bg-navy-light border border-white/10 text-aqua text-xs font-semibold mb-6">
            <span className="w-2 h-2 rounded-full bg-aqua mr-2 animate-pulse"></span>
            Melayani Jamaah Sejak 1993
          </div>
          
          <h1 className="text-4xl lg:text-6xl font-bold text-white mb-6 leading-tight">
            Masjid Peduli Umat <br/>
            <span className="text-aqua">& Masyarakat</span>
          </h1>
          
          <p className="text-gray-300 text-lg mb-8 leading-relaxed max-w-lg mx-auto lg:mx-0">
            Selamat datang di Masjid Al-Huda Cikumpa. Kami berkomitmen menjadi masjid yang ramah dan melayani seluruh kebutuhan jamaah.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => document.getElementById('donasi')?.scrollIntoView({ behavior: 'smooth' })}
              className="w-full sm:w-auto px-8 py-4 bg-aqua text-navy rounded-xl font-bold shadow-lg shadow-aqua/20 hover:bg-white transition-all flex items-center justify-center gap-2"
            >
              <FaHeart /> Infaq & Sedekah
            </motion.button>
            <motion.a 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="https://wa.me/628567861311?text=Assalamualaikum%20Admin%20Masjid%20Al-Huda"
              target="_blank"
              className="w-full sm:w-auto px-8 py-4 bg-transparent border-2 border-white/20 text-white rounded-xl font-bold hover:border-aqua hover:text-aqua transition-all flex items-center justify-center gap-2"
            >
              <FaWhatsapp /> Hubungi Admin
            </motion.a>
          </div>

          <div className="mt-10 flex flex-wrap items-center justify-center lg:justify-start gap-6 text-sm text-gray-400 pt-6 border-t border-white/10">
            <div className="flex items-center gap-2"><FaClock className="text-aqua"/> Buka 24 Jam</div>
            <div className="flex items-center gap-2"><FaMapMarkerAlt className="text-aqua"/> Sukmajaya, Depok</div>
            <div className="flex items-center gap-2 hover:text-aqua cursor-pointer transition-colors">
                <FaWhatsapp className="text-aqua text-lg"/> 0856-7861-311
            </div>
          </div>
        </motion.div>

        {/* IMAGE PLACEHOLDER (Masuk dari Kanan & Floating) */}
        <motion.div 
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="w-full lg:w-1/2 relative"
        >
          {/* Efek Melayang (Floating) */}
          <motion.div 
            animate={{ y: [0, -20, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-white/10"
          >
              <div className="aspect-[4/3] bg-gray-800 relative group">
                   <div className="absolute inset-0 flex items-center justify-center text-white/20 font-bold text-center p-4 z-10 group-hover:text-aqua transition-colors">
                      [Foto Masjid Al-Huda]<br/>Silakan ganti dengan foto asli
                   </div>
                   {/* Gradient Overlay */}
                   <div className="absolute inset-0 bg-gradient-to-t from-navy via-transparent to-transparent"></div>
              </div>
          </motion.div>
          
          {/* Decorative Dots */}
          <div className="absolute -bottom-10 -left-10 w-24 h-24 bg-dots opacity-20"></div>
        </motion.div>

      </div>
    </section>
  );
}