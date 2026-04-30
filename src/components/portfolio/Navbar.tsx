import { useState, useCallback } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import clsx from 'clsx';
import { Magnetic } from './Magnetic';
import { InstagramLogoIcon as Instagram } from '@radix-ui/react-icons';

const sections = [
  { id: 'hero', label: 'HOME' },
  { id: 'about', label: 'ABOUT' },
  { id: 'projects', label: 'WORK' },
  { id: 'skills', label: 'SKILLS' },
  { id: 'experience', label: 'JOURNEY' },
  { id: 'contact', label: 'CONTACT' },
];

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [hoveredDot, setHoveredDot] = useState<string | null>(null);

  const { scrollY } = useScroll();
  const bgOpacity = useTransform(scrollY, [0, 80], [0, 0.8]);
  const blur = useTransform(scrollY, [0, 80], [0, 12]);
  const borderOpacity = useTransform(scrollY, [0, 80], [0, 0.06]);

  const scrollTo = useCallback((id: string) => {
    setMenuOpen(false);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  }, []);

  return (
    <>
      <motion.nav
        className="fixed top-0 left-0 right-0 z-50 px-6 md:px-12 py-4 flex items-center justify-between"
        style={{
          backgroundColor: useTransform(bgOpacity, (v) => `rgba(8,8,8,${v})`),
          backdropFilter: useTransform(blur, (v) => `blur(${v}px)`),
          borderBottom: useTransform(borderOpacity, (v) => `1px solid rgba(255,255,255,${v})`),
        }}
      >
        <Magnetic>
          <button onClick={() => scrollTo('hero')} className="font-display font-extrabold text-lg text-mint tracking-tight" data-cursor="link">
            AB
          </button>
        </Magnetic>

        <div className="hidden md:flex items-center gap-6">
          {sections.map((s) => (
            <button
              key={s.id}
              onClick={() => scrollTo(s.id)}
              onMouseEnter={() => setHoveredDot(s.id)}
              onMouseLeave={() => setHoveredDot(null)}
              className="relative flex items-center gap-2 group"
              data-cursor="link"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-text-secondary group-hover:bg-mint transition-colors" />
            </button>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-6">
          <div className="flex items-center gap-4">
            <a 
              href="https://www.instagram.com/amanbam__" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-text-secondary hover:text-mint transition-colors flex items-center"
              data-cursor="link"
            >
              <Instagram width={16} height={16} />
            </a>
            <span className="flex items-center gap-2 font-mono text-[11px] text-text-secondary">
              <motion.span
                className="w-1.5 h-1.5 rounded-full bg-mint"
                animate={{ opacity: [0.4, 1, 0.4] }}
                transition={{ duration: 1.4, repeat: Infinity }}
              />
              AVAILABLE
            </span>
          </div>
          <Magnetic>
            <motion.button
              onClick={() => scrollTo('contact')}
              className="font-mono text-[11px] tracking-wider border border-mint/60 text-mint px-4 py-2 hover:bg-mint hover:text-primary-foreground transition-colors"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              data-cursor="link"
            >
              HIRE ME
            </motion.button>
          </Magnetic>
        </div>

        <button
          className="md:hidden flex flex-col gap-1.5 z-50"
          onClick={() => setMenuOpen(!menuOpen)}
          data-cursor="link"
          aria-label="Toggle menu"
        >
          <motion.span animate={{ rotate: menuOpen ? 45 : 0, y: menuOpen ? 6 : 0 }} className="block w-6 h-px bg-foreground" />
          <motion.span animate={{ opacity: menuOpen ? 0 : 1 }} className="block w-6 h-px bg-foreground" />
          <motion.span animate={{ rotate: menuOpen ? -45 : 0, y: menuOpen ? -6 : 0 }} className="block w-6 h-px bg-foreground" />
        </button>
      </motion.nav>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-background flex flex-col items-center justify-center gap-8"
          >
            {sections.map((s, i) => (
              <motion.button
                key={s.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
                onClick={() => scrollTo(s.id)}
                className="font-display font-bold text-3xl text-foreground hover:text-mint transition-colors"
                data-cursor="link"
              >
                {s.label}
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
