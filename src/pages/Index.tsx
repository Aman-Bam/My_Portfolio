import { ArrowRight, Github, Linkedin, Mail, ExternalLink, Code2, Database, Server, Wrench, CheckCircle2, Zap, Shield, MessageSquare, Clock, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import TrustStrip from "@/components/TrustStrip";
import AboutSection from "@/components/AboutSection";
import SkillsSection from "@/components/SkillsSection";
import ProjectsSection from "@/components/ProjectsSection";
import ProcessSection from "@/components/ProcessSection";
import WhyHireSection from "@/components/WhyHireSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import CTASection from "@/components/CTASection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main>
        <HeroSection />
        <TrustStrip />
        <AboutSection />
        <SkillsSection />
        <ProjectsSection />
        <ProcessSection />
        <WhyHireSection />
        <TestimonialsSection />
        <CTASection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
