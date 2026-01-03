import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'upload.wikimedia.org',
      },
      // Izinkan SEMUA akses ke IP lokal 127.0.0.1
      {
        protocol: 'http',
        hostname: '127.0.0.1',
        port: '', // Biarkan kosong agar match semua port
        pathname: '/**', 
      },
      // Izinkan SEMUA akses ke localhost
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '', // Biarkan kosong agar match semua port
        pathname: '/**', 
      },
    ],
  },
};

export default nextConfig;