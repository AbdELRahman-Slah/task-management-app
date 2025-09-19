import { Navbar } from "@/components/global/Navbar";
import HeroSection from "@/components/landing/HeroSection";
import FeaturesSection from "@/components/landing/FeaturesSection";

const Landing = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-accent/10 to-background">
      <Navbar isLoggedIn={false} />

      <HeroSection />

      <FeaturesSection />
    </div>
  );
};

export default Landing;
