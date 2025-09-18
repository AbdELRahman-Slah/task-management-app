import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Navbar } from "@/components/global/Navbar";
import { CheckCircle, Users, Zap } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import HeroSection from "@/components/landing/HeroSection";
import FeaturesSection from "@/components/landing/FeaturesSection";

const isLoggedIn = Boolean(localStorage.getItem("token"));

const Landing = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/dashboard");
    }
  }, [navigate]);

  if (isLoggedIn) {
    return;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-accent/10 to-background">
      <Navbar isLoggedIn={false} />

      <HeroSection />

      <FeaturesSection />
    </div>
  );
};

export default Landing;
