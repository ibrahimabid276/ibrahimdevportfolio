import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import ParticleBackground from "@/components/ParticleBackground";
import CustomCursor from "@/components/CustomCursor";
import AIChatBubble from "@/components/AIChatBubble";
import BackToTop from "@/components/BackToTop";
import Loader from "@/components/Loader";

const Index = () => (
  <div className="min-h-screen bg-background relative cursor-none">
    <Loader />
    <ParticleBackground />
    <CustomCursor />
    <Navbar />
    <Hero />
    <About />
    <Skills />
    <Projects />
    <Contact />
    <Footer />
    <AIChatBubble />
    <BackToTop />
  </div>
);

export default Index;
