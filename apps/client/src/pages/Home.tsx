import Navbar from "@/features/home/components/Navbar";
import HeroSection from "@/features/home/components/HeroSection";
import FeaturesSection from "@/features/home/components/FeaturesSection";
import PricingPreview from "@/features/home/components/PricingPreview";
import FAQSection from "@/features/home/components/FAQSection";
import CTASection from "@/features/home/components/CTASection";
import Footer from "@/features/home/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />

      <HeroSection />

      <FeaturesSection />

      <PricingPreview />

      <FAQSection />

      <CTASection />

      <Footer />
    </>
  );
}
