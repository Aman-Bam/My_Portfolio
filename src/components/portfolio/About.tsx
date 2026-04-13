import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const terminalRows = [
  ['LOCATION', 'Uttarakhand, India Available for (Global Work)'],
  ['STATUS', 'Open to Work (Frontend /Backend / Full Stack / AI Tools)'],
  ['EDUCATION', 'BCA, Kumaun University (2024–2027)'],
  ['GRAD', 'May 2027'],
  ['STACK', 'MERN • Next.js • TypeScript • Tailwindn • AI Integrations'],
  ['OS', 'Windows/Linux'],
  ['BUILDING', 'KarrigerConnect – SaaS for developer networking & referrals'],
  ['INTERESTS', 'AI Agents • Automation • Open Source • SaaS Systems'],
];

const About = () => {
  const borderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (borderRef.current) {
        gsap.fromTo(borderRef.current, { scaleY: 0 }, {
          scaleY: 1,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: { trigger: borderRef.current, start: 'top 80%', once: true },
        });
      }
    });
    return () => ctx.revert();
  }, []);

  return (
    <section id="about" className="py-32 px-6 md:px-12 max-w-7xl mx-auto">
      <p className="font-mono text-[11px] tracking-[0.25em] uppercase text-mint mb-16">002 — ABOUT</p>

      <div className="flex flex-col lg:flex-row gap-16 lg:gap-20">
        <div className="lg:w-[55%]">
          <div className="relative pl-6 mb-12">
            <div ref={borderRef} className="absolute left-0 top-0 w-[2px] h-full bg-mint origin-bottom" />
            <p className="font-editorial text-4xl md:text-5xl text-foreground leading-snug">
              I don't just write code.
              I <br />
              <span className="text-red-600">build systems</span>
              <br />
              that solve real problems.
            </p>
          </div>

          {[
            "Building SaaS tools that solve real revenue problems for appointment-based businesses. BCA student at Kumaun University — built 10+ production MERN apps. Self-taught out of obsession, not obligation.",

            "I ship full-stack products: SaaS platforms, AI automation tools, Chrome extensions, and web scrapers. Currently doing QA testing and building cold outreach infrastructure at Rebooked while hunting for remote dev roles. Real projects, real users, real impact — not class assignments.",

            "I debug production systems at 2 AM because I care how things work under the hood as much as how they look on screen. Obsessed with systems thinking, developer tooling, and building UX that doesn't suck. Daily driver: Arch Linux. Because of course."
          ].map((text, i) => (
            <motion.p
              key={i}
              className="text-text-secondary text-base leading-relaxed mb-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-10%' }}
              transition={{ delay: i * 0.15, duration: 0.6 }}
            >
              {text}
            </motion.p>
          ))}
        </div>

        <div className="lg:w-[45%]">
          <div className="bg-surface border border-border rounded-lg overflow-hidden">
            <div className="flex items-center gap-2 px-4 py-3 border-b border-border">
              <span className="w-2 h-2 rounded-full bg-red-500" />
              <span className="w-2 h-2 rounded-full bg-yellow-500" />
              <span className="w-2 h-2 rounded-full bg-green-500" />
              <span className="font-mono text-[11px] text-text-secondary ml-2">aman@portfolio ~ $</span>
            </div>
            <div className="p-5 space-y-3">
              {terminalRows.map(([key, val], i) => (
                <motion.div
                  key={key}
                  className="flex justify-between font-mono text-[13px]"
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08, duration: 0.4 }}
                >
                  <span className="text-text-secondary">{key}</span>
                  <span className="text-foreground flex items-center gap-1.5">
                    {val === '● Open to Work' ? (
                      <>
                        <motion.span
                          className="w-1.5 h-1.5 rounded-full bg-mint inline-block"
                          animate={{ opacity: [0.4, 1, 0.4] }}
                          transition={{ duration: 1.4, repeat: Infinity }}
                        />
                        Open to Work
                      </>
                    ) : val}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
