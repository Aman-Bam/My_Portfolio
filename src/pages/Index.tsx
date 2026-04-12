import { useEffect } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import CustomCursor from '../components/portfolio/CustomCursor';
import Navbar from '../components/portfolio/Navbar';
import Hero from '../components/portfolio/Hero';
import About from '../components/portfolio/About';
import Projects from '../components/portfolio/Projects';
import Skills from '../components/portfolio/Skills';
import Experience from '../components/portfolio/Experience';
import Stats from '../components/portfolio/Stats';
import Contact from '../components/portfolio/Contact';
import Footer from '../components/portfolio/Footer';

gsap.registerPlugin(ScrollTrigger);

const Index = () => {
  useEffect(() => {
    const lenis = new Lenis({ lerp: 0.075, duration: 1.2, smoothWheel: true });
    gsap.ticker.add((time) => lenis.raf(time * 1000));
    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
      gsap.ticker.remove(() => {});
    };
  }, []);

  return (
    <main className="bg-background text-foreground min-h-screen overflow-x-hidden">
      <CustomCursor />
      <Navbar />
      <Hero />
      <About />
      <Projects />
      <Skills />
      <Experience />
      <Stats />
      <Contact />
      <Footer />
    </main>
  );
};

export default Index;
