import LandingNavbar from "@/components/landing/LandingNavbar";
import HeroSection from "@/components/landing/HeroSection";
import FeaturesSection from "@/components/landing/FeaturesSection";

const Landing = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-accent/10 to-background">
      <LandingNavbar />

      <HeroSection />

      <FeaturesSection />
    </div>
  );
};

export default Landing;
