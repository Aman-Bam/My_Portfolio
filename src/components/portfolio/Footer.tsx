import { useEffect, useRef } from 'react';
import { GitHubLogoIcon as Github, LinkedInLogoIcon as Linkedin, InstagramLogoIcon as Instagram } from '@radix-ui/react-icons';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Footer = () => {
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (lineRef.current) {
        gsap.fromTo(lineRef.current, { scaleX: 0 }, {
          scaleX: 1, duration: 1, ease: 'power2.out',
          scrollTrigger: { trigger: lineRef.current, start: 'top 95%', once: true },
        });
      }
    });
    return () => ctx.revert();
  }, []);

  return (
    <footer className="bg-background py-8 px-6 md:px-12">
      <div ref={lineRef} className="h-px bg-mint/30 mb-8 origin-left" />
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="font-mono text-xs text-text-secondary">
          Designed & built by <span className="hover:text-mint transition-colors">Aman BAM</span>
        </p>
        <div className="flex items-center gap-4">
          {[Github, Linkedin, Instagram].map((Icon, i) => (
            <a key={i} href="#" className="text-text-secondary hover:text-mint transition-colors" aria-label={Icon.displayName || 'social'} data-cursor="link">
              <Icon size={16} />
            </a>
          ))}
        </div>
        <p className="font-mono text-xs text-text-secondary">
          Open to opportunities · 2026
        </p>
      </div>
    </footer>
  );
};

export default Footer;
