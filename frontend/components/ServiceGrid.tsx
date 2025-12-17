'use client'; 

import { 
  FaAmbulance, 
  FaBookOpen, 
  FaHandsHelping, 
  FaUserGraduate, 
  FaUtensils 
} from 'react-icons/fa';
import ScrollReveal from './ScrollReveal';

export default function ServiceGrid() {
  const services = [
    {
      title: 'Ambulans & Jenazah',
      icon: <FaAmbulance className="text-3xl" />,
      desc: 'Layanan gratis/terjangkau untuk kondisi darurat dan pengurusan jenazah.',
      action: 'Hubungi',
      link: 'https://wa.me/628567861311'
    },
    {
      title: 'Makan Gratis',
      icon: <FaUtensils className="text-3xl" />,
      desc: 'Berbagi makan siang gratis setiap hari. Mulai dari 100 porsi untuk siapa saja yang membutuhkan.',
      action: 'Donasi',
      link: '#donasi'
    },
    {
      title: 'Pendidikan Yatim',
      icon: <FaUserGraduate className="text-3xl" />,
      desc: 'Beasiswa dan biaya pendidikan untuk anak yatim & dhuafa di lingkungan sekitar.',
      action: 'Dukung',
      link: '#donasi'
    },
    {
      title: 'Bimbingan Quran',
      icon: <FaBookOpen className="text-3xl" />,
      desc: 'Belajar Baca Tulis Quran (BTQ) gratis untuk orang tua (via Online).',
      action: 'Daftar',
      link: 'https://wa.me/628567861311'
    },
    {
      title: 'Santunan Rutin',
      icon: <FaHandsHelping className="text-3xl" />,
      desc: 'Penyaluran bantuan rutin untuk keluarga prasejahtera.',
      action: 'Info',
      link: '#donasi'
    }
  ];

  return (
    <section id="layanan" className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <ScrollReveal>
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-navy mb-4">Layanan & Program Umat</h2>
            <div className="w-20 h-1 bg-aqua mx-auto rounded-full mb-4"></div>
            <p className="text-slate-500 max-w-2xl mx-auto">
              Masjid Al-Huda hadir dengan program nyata untuk membantu dan memberdayakan masyarakat.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {services.map((item, index) => (
            // Tambahkan h-full di sini agar wrapper ScrollReveal mengisi tinggi grid
            <ScrollReveal key={index} delay={index * 0.1} className="h-full">
              <div 
                className="group bg-slate-50 rounded-2xl p-6 border border-transparent hover:border-aqua hover:bg-white hover:shadow-xl transition-all duration-300 text-center cursor-pointer h-full flex flex-col"
              >
                {/* Bagian Atas (Icon & Judul) */}
                <div className="flex-1 flex flex-col items-center">
                    <div className="w-16 h-16 mx-auto bg-white rounded-full flex items-center justify-center text-aqua shadow-sm mb-4 group-hover:bg-aqua group-hover:text-white transition-colors">
                        {item.icon}
                    </div>
                    
                    <h3 className="text-lg font-bold text-navy mb-2">{item.title}</h3>
                    <p className="text-sm text-slate-500 mb-4 leading-relaxed">
                        {item.desc}
                    </p>
                </div>
                
                {/* Bagian Bawah (Tombol Aksi) - Akan selalu di dasar karena margin-top-auto */}
                <div className="mt-auto pt-4 border-t border-slate-100 w-full group-hover:border-transparent transition-colors">
                    <a href={item.link} className="text-xs font-bold text-navy uppercase tracking-wider border-b-2 border-transparent group-hover:border-aqua transition-all pb-1 inline-block">
                        {item.action} <span aria-hidden="true">&rarr;</span>
                    </a>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

      </div>
    </section>
  );
}