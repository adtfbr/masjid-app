import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import PrayerTimes from "@/components/PrayerTimes";
import ServiceGrid from "@/components/ServiceGrid";
import EventSection from "@/components/EventSection";
import DonationSection from "@/components/DonationSection";
import FinancialReport from "@/components/FinancialReport";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50">
      <Navbar />
      
      <Hero />
      
      <PrayerTimes />

      <ServiceGrid />

      <EventSection />

      <DonationSection />

      <FinancialReport />

      <Footer />
    </main>
  );
}