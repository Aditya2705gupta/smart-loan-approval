import Navbar from "@/components/navbar";
import Hero from "@/components/hero";
import Features from "@/components/features";
import HowItWorks from "@/components/how-it-works";
import ModelsSection from "@/components/models-section";
import Footer from "@/components/footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-[#fafafa] selection:bg-primary/30 font-sans">
      <Navbar />
      <Hero />
      <Features />
      <HowItWorks />
      <ModelsSection />
      <Footer />
    </div>
  );
}
