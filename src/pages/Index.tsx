import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import BentoAboutSkills from "@/components/BentoAboutSkills";
import Projects from "@/components/Projects";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import ParticleBackground from "@/components/ParticleBackground";
import CustomCursor from "@/components/CustomCursor";
import AIChatBubble from "@/components/AIChatBubble";

const Index = () => (
  <div className="min-h-screen bg-background relative cursor-none">
    <ParticleBackground />
    <CustomCursor />
    <Navbar />
    <Hero />
    <BentoAboutSkills />
    <Projects />
    <Contact />
    <Footer />
    <AIChatBubble />
  </div>
);

export default Index;
