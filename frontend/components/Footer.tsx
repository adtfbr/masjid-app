import { FaMapMarkerAlt, FaPhone, FaEnvelope, FaInstagram, FaYoutube, FaFacebook } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer id="kontak" className="bg-navy text-white pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          
          {/* Kolom 1: Identitas */}
          <div>
            <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <span className="w-8 h-8 bg-aqua rounded flex items-center justify-center text-navy text-sm">
                <i className="fa-solid fa-mosque"></i>
              </span>
              Masjid Al-Huda
            </h3>
            <p className="text-gray-300 text-sm leading-relaxed mb-6">
              Masjid Peduli Umat/Masyarakat. Ramah dan melayani jamaah. Berdiri sejak 1993 di Cikumpa Griya Depok Asri.
            </p>
          </div>

          {/* Kolom 2: Kontak */}
          <div>
            <h4 className="text-lg font-bold text-aqua mb-6">Hubungi Kami</h4>
            <ul className="space-y-4 text-sm text-gray-300">
              <li className="flex items-start gap-3">
                <FaMapMarkerAlt className="text-aqua mt-1 flex-shrink-0" />
                <span>Jl. Tole Iskandar No.3, Mekar Jaya, Kec. Sukmajaya, Kota Depok, Jawa Barat 16411</span>
              </li>
              <li className="flex items-center gap-3">
                <FaPhone className="text-aqua flex-shrink-0" />
                <span>0856-7861-311 / 0858-8524-4151</span>
              </li>
            </ul>
          </div>

          {/* Kolom 3: Link Cepat */}
          <div>
            <h4 className="text-lg font-bold text-aqua mb-6">Akses Cepat</h4>
            <ul className="space-y-3 text-sm text-gray-300">
              <li><a href="#jadwal" className="hover:text-aqua transition-colors">Jadwal Sholat</a></li>
              <li><a href="#layanan" className="hover:text-aqua transition-colors">Program Umat</a></li>
              <li><a href="#laporan" className="hover:text-aqua transition-colors">Laporan Keuangan</a></li>
              <li><a href="#donasi" className="hover:text-aqua transition-colors">Rekening Donasi</a></li>
            </ul>
          </div>

          {/* Kolom 4: Peta Lokasi */}
          <div>
            <h4 className="text-lg font-bold text-aqua mb-6">Lokasi</h4>
            <div className="w-full h-40 bg-gray-700 rounded-xl overflow-hidden shadow-lg border border-white/10">
              {/* Embed Google Maps dengan query Al-Huda Cikumpa */}
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3964.9277987178143!2d106.83711749999999!3d-6.4033038!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69ebc1a1ec69ab%3A0xe5bfb95bd22ba2e9!2sMasjid%20Jami&#39;%20Al-Huda!5e0!3m2!1sid!2sid!4v1765894974794!5m2!1sid!2sid" 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen={true} 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                className="filter grayscale hover:grayscale-0 transition-all duration-500"
              ></iframe>
            </div>
            <a href="https://maps.app.goo.gl/zfuLRnc7gVvLSBWs5" target="_blank" className="text-xs text-aqua mt-2 block hover:underline">
              Buka di Google Maps &rarr;
            </a>
          </div>

        </div>

        <div className="border-t border-white/10 pt-8 text-center">
          <p className="text-xs text-gray-500">
            &copy; {new Date().getFullYear()} Masjid Al-Huda Cikumpa Depok. All rights reserved.
          </p>
        </div>

      </div>
    </footer>
  );
}