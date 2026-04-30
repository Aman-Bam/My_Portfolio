import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const events = [
  { year: '2024', title: 'Started BCA at Kumaun University', desc: 'First MERN project. Immediately went deeper than the curriculum.' },
  { year: '2025', title: 'Won Uttarakhand AI Mission – UDBHAV 2025 Hackathon', desc: 'Apuni Sarkar: React + Gemini AI govt services platform. Beat every team. Solo build under pressure.' },
  { year: '2025', title: 'Built Employment Management System', desc: 'Dark glassmorphism UI, full MERN stack, admin + task management.' },
  { year: '2026', title: 'University Bug Audit — kunainital.ac.in', desc: "Contracted to audit KU's official site. Professional report: JS errors, broken API calls, React visual issues." },
  { year: '2026', title: 'Worked on Rebooked',   desc: 'Worked on building a SaaS for appointment-driven businesses. Solved real-world bugs, improved performance, and developed a high-converting Lost Revenue Calculator. Focused on both product thinking and engineering execution.' },
  { year: '2027', title: 'Graduating — Seeking First Full-Time Role', desc: 'Open to full-time, part-time, freelance, contract. Remote preferred.' },
];

const Experience = () => {
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (lineRef.current) {
        gsap.fromTo(lineRef.current, { scaleY: 0 }, {
          scaleY: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: lineRef.current,
            start: 'top 80%',
            end: 'bottom 20%',
            scrub: true,
          },
        });
      }
    });
    return () => ctx.revert();
  }, []);

  return (
    <section id="experience" className="py-32 px-6 md:px-12 max-w-7xl mx-auto">
      <p className="font-mono text-[11px] tracking-[0.25em] uppercase text-mint mb-6">005 — THE JOURNEY</p>
      <h2 className="font-display font-extrabold tracking-tight leading-[0.95] mb-20" style={{ fontSize: 'clamp(48px, 8vw, 80px)' }}>
        HOW I GOT<br /><span className="text-amber">HERE</span>.
      </h2>

      <div className="relative">
        <div ref={lineRef} className="absolute left-4 md:left-8 top-0 bottom-0 w-px bg-mint/30 origin-top" />

        <div className="space-y-16 pl-14 md:pl-24">
          {events.map((ev, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-10%' }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="relative"
            >
              <span className="absolute -left-10 md:-left-16 top-1 font-mono text-sm text-mint font-bold">{ev.year}</span>
              <div className="absolute -left-[2.85rem] md:-left-[4.85rem] top-2 w-2 h-2 rounded-full bg-mint/60 border-2 border-background" />
              <h3 className="font-display font-semibold text-lg text-foreground mb-1">{ev.title}</h3>
              <p className="text-text-secondary text-sm leading-relaxed">{ev.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
