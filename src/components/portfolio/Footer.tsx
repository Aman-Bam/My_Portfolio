import { useEffect, useRef } from 'react';
import { GitHubLogoIcon as Github, LinkedInLogoIcon as Linkedin, InstagramLogoIcon as Instagram } from '@radix-ui/react-icons';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Magnetic } from './Magnetic';

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
          {[
            { Icon: Github, url: 'https://github.com/Aman-Bam', label: 'GitHub' },
            { Icon: Linkedin, url: 'https://www.linkedin.com/in/aman-bam/', label: 'LinkedIn' },
            { Icon: Instagram, url: 'https://www.instagram.com/amanbam__', label: 'Instagram' }
          ].map(({ Icon, url, label }, i) => (
            <Magnetic key={i}>
              <a href={url} target="_blank" rel="noopener noreferrer" className="text-text-secondary hover:text-mint transition-colors" aria-label={label} data-cursor="link">
                <Icon width={20} height={20} />
              </a>
            </Magnetic>
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
