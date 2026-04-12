import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail } from 'lucide-react';
import { GitHubLogoIcon as Github, LinkedInLogoIcon as Linkedin } from '@radix-ui/react-icons';

const Contact = () => {
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent'>('idle');

  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    setTimeout(() => setStatus('sent'), 1500);
    setTimeout(() => setStatus('idle'), 4000);
  }, []);

  return (
    <section id="contact" className="py-32 px-6 md:px-12 max-w-7xl mx-auto">
      <p className="font-mono text-[11px] tracking-[0.25em] uppercase text-mint mb-6">007 — LET'S TALK</p>
      <h2 className="font-display font-extrabold tracking-tight leading-[0.95] mb-20" style={{ fontSize: 'clamp(48px, 8vw, 80px)' }}>
        READY TO<br />BUILD TOGETHER<span className="text-amber">?</span>
      </h2>

      <div className="flex flex-col lg:flex-row gap-16 lg:gap-20">
        <div className="lg:w-1/2">
          <p className="font-editorial text-lg md:text-xl text-text-secondary leading-relaxed mb-8">
            I'm currently open to full-time roles, freelance contracts, and interesting SaaS collaborations. If you're building something that needs a developer who genuinely cares about craft — let's talk.
          </p>

          <div className="flex items-center gap-2 font-mono text-sm text-foreground mb-8">
            <motion.span
              className="w-1.5 h-1.5 rounded-full bg-mint"
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{ duration: 1.4, repeat: Infinity }}
            />
            AVAILABLE NOW
          </div>

          <div className="space-y-4">
            {[
              { icon: Mail, label: 'amanb.dev@gmail.com', href: 'mailto:amanb.dev@gmail.com' },
              { icon: Github, label: 'github.com/amanBAM', href: '#' },
              { icon: Linkedin, label: 'linkedin.com/in/amanBAM', href: '#' },
            ].map(({ icon: Icon, label, href }) => (
              <a key={label} href={href} className="flex items-center gap-3 text-text-secondary hover:text-mint transition-colors group" data-cursor="link">
                <Icon size={16} />
                <span className="relative">
                  {label}
                  <span className="absolute bottom-0 left-0 w-0 h-px bg-mint group-hover:w-full transition-all duration-300" />
                </span>
              </a>
            ))}
          </div>
        </div>

        <div className="lg:w-1/2">
          <form onSubmit={handleSubmit} className="space-y-8">
            {[
              { name: 'name', label: 'NAME', type: 'text' },
              { name: 'email', label: 'EMAIL', type: 'email' },
            ].map(({ name, label, type }) => (
              <div key={name}>
                <label className="font-mono text-[10px] uppercase tracking-[0.2em] text-text-secondary block mb-2">{label}</label>
                <input
                  type={type}
                  required
                  className="w-full bg-transparent border-0 border-b border-input text-foreground py-2 font-display text-base focus:outline-none focus:border-mint transition-colors"
                />
              </div>
            ))}
            <div>
              <label className="font-mono text-[10px] uppercase tracking-[0.2em] text-text-secondary block mb-2">MESSAGE</label>
              <textarea
                required
                rows={4}
                className="w-full bg-transparent border-0 border-b border-input text-foreground py-2 font-display text-base focus:outline-none focus:border-mint transition-colors resize-none"
              />
            </div>

            <motion.button
              type="submit"
              className="w-full bg-mint text-primary-foreground font-display font-bold py-3 text-sm tracking-wide"
              whileHover={{ scale: 1.01, opacity: 0.9 }}
              whileTap={{ scale: 0.99 }}
              disabled={status !== 'idle'}
              data-cursor="link"
            >
              <AnimatePresence mode="wait">
                {status === 'idle' && <motion.span key="idle" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>SEND MESSAGE</motion.span>}
                {status === 'sending' && <motion.span key="sending" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>SENDING...</motion.span>}
                {status === 'sent' && <motion.span key="sent" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} aria-live="polite">✓ MESSAGE SENT.</motion.span>}
              </AnimatePresence>
            </motion.button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
