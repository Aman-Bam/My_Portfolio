import { useRef, useCallback, memo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
import { GitHubLogoIcon as Github } from '@radix-ui/react-icons';

interface Project {
  title: string;
  description: string;
  tech: string[];
  type?: string;
  badge?: string;
  featured?: boolean;
  status?: string;
}

const projects: Project[] = [
  {
    title: 'Apuni Sarkar',
    description: 'AI-powered platform simplifying access to Uttarakhand government schemes, documentation, and citizen services. Built with React 19 + Google Gemini API. No backend — pure frontend + AI.',
    tech: ['React 19', 'Gemini API', 'Tailwind CSS', 'Framer Motion'],
    badge: '🥇 HACKATHON WINNER — 1ST PLACE · KU 2024',
    featured: true,
  },
  {
    title: 'Employment Management System',
    description: 'Dark glassmorphism UI with emerald accents. Admin + employee dashboards, task management, role-based access, real-time updates.',
    tech: ['MongoDB', 'Express', 'React', 'Node.js', 'Tailwind CSS'],
  },
  {
    title: 'Banking System Backend',
    description: 'Pure backend REST API. Account management, transactions, authentication, and balance operations.',
    tech: ['Node.js', 'Express.js', 'MongoDB'],
    type: 'Backend API',
  },
  {
    title: 'Lead Extension',
    description: 'Browser-based lead capture tool for extracting and managing prospect data directly from any website.',
    tech: ['Chrome Extension APIs', 'JavaScript'],
    type: 'Chrome Extension',
  },
  {
    title: 'Job Aggregator',
    description: 'Multi-platform scraper (LinkedIn, Naukri, etc.), AI cover letter generator, email notifications, analytics dashboard.',
    tech: ['Python', 'React', 'Flask', 'SQLite', 'Gemini API'],
  },
  {
    title: 'Rebooked',
    description: 'SaaS for appointment-based businesses. Revenue leakage audit + Lost Revenue Calculator. Cold outreach automation.',
    tech: ['MERN Stack', 'TypeScript'],
    status: 'In Progress',
    type: 'SaaS · Co-founded',
  },
];

const useTilt = () => {
  const ref = useRef<HTMLDivElement>(null);
  const onMouseMove = useCallback((e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    ref.current.style.transform = `perspective(800px) rotateX(${-y * 8}deg) rotateY(${x * 10}deg) translateZ(4px)`;
  }, []);
  const onMouseLeave = useCallback(() => {
    if (ref.current) ref.current.style.transform = 'perspective(800px) rotateX(0) rotateY(0) translateZ(0)';
  }, []);
  return { ref, onMouseMove, onMouseLeave };
};

const SecondaryCard = memo(({ project, index }: { project: Project; index: number }) => {
  const [hovered, setHovered] = useState(false);
  const tilt = useTilt();

  return (
    <motion.div
      ref={tilt.ref}
      onMouseMove={tilt.onMouseMove}
      onMouseLeave={() => { tilt.onMouseLeave(); setHovered(false); }}
      onMouseEnter={() => setHovered(true)}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-10%' }}
      transition={{ delay: index * 0.1, duration: 0.6 }}
      className="bg-surface border border-border rounded-lg p-6 relative overflow-hidden group"
      style={{ transition: 'transform 0.2s ease-out' }}
      data-cursor="project"
    >
      <motion.div
        className="absolute top-0 left-0 h-[2px] bg-mint"
        initial={{ width: 0 }}
        animate={{ width: hovered ? '100%' : 0 }}
        transition={{ duration: 0.4 }}
      />
      <div className="flex items-start justify-between mb-3">
        <h3 className="font-display font-bold text-lg text-foreground">{project.title}</h3>
        {project.status && (
          <span className="font-mono text-[10px] uppercase text-amber bg-amber/10 border border-amber/20 px-2 py-0.5 rounded">{project.status}</span>
        )}
      </div>
      {project.type && <p className="font-mono text-[10px] uppercase tracking-wider text-text-secondary mb-3">{project.type}</p>}
      <AnimatePresence>
        {hovered && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.3 }}
          >
            <p className="text-text-secondary text-sm leading-relaxed mb-4">{project.description}</p>
          </motion.div>
        )}
      </AnimatePresence>
      <div className="flex flex-wrap gap-2 mt-auto">
        {project.tech.map((t) => (
          <span key={t} className="font-mono text-[10px] text-text-code bg-mint/5 border border-mint/10 px-2 py-0.5 rounded-sm">{t}</span>
        ))}
      </div>
    </motion.div>
  );
});
SecondaryCard.displayName = 'SecondaryCard';

const Projects = () => {
  const featured = projects[0];
  const secondary = projects.slice(1);
  const tilt = useTilt();

  return (
    <section id="projects" className="py-32 px-6 md:px-12 max-w-7xl mx-auto">
      <p className="font-mono text-[11px] tracking-[0.25em] uppercase text-mint mb-6">003 — SELECTED WORK</p>
      <h2 className="font-display font-extrabold tracking-tight leading-[0.95] mb-20" style={{ fontSize: 'clamp(48px, 8vw, 80px)' }}>
        THINGS I'VE<br />
        <span className="inline-block">SHIPPED<span className="text-amber">.</span></span>
      </h2>

      {/* Featured */}
      <motion.div
        ref={tilt.ref}
        onMouseMove={tilt.onMouseMove}
        onMouseLeave={tilt.onMouseLeave}
        className="bg-surface border border-border rounded-lg overflow-hidden mb-12 group"
        style={{ transition: 'transform 0.2s ease-out' }}
        data-cursor="project"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
      >
        <div className="flex flex-col lg:flex-row min-h-[360px]">
          <div className="lg:w-1/2 p-8 md:p-12 flex flex-col justify-center">
            {featured.badge && (
              <span className="inline-block self-start font-mono text-[10px] uppercase text-amber bg-amber/10 border border-amber/20 px-2 py-1 rounded mb-6">
                {featured.badge}
              </span>
            )}
            <h3 className="font-display font-extrabold text-3xl md:text-[42px] text-foreground mb-4">{featured.title}</h3>
            <p className="text-text-secondary leading-relaxed mb-6">{featured.description}</p>
            <div className="flex flex-wrap gap-2 mb-6">
              {featured.tech.map((t) => (
                <span key={t} className="font-mono text-[10px] text-text-code bg-mint/5 border border-mint/10 px-2 py-0.5 rounded-sm">{t}</span>
              ))}
            </div>
            <div className="flex gap-4">
              <a href="#" className="font-mono text-sm text-mint hover:underline flex items-center gap-1" data-cursor="link"><Github size={14} /> GitHub ↗</a>
              <a href="#" className="font-mono text-sm text-mint hover:underline flex items-center gap-1" data-cursor="link"><ExternalLink size={14} /> Live Demo ↗</a>
            </div>
          </div>
          <div className="lg:w-1/2 flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #101010, #0A1A0F)' }}>
            <span className="font-display font-extrabold text-[120px] text-mint/[0.06] select-none">A</span>
          </div>
        </div>
      </motion.div>

      {/* Secondary */}
      <div className="grid md:grid-cols-2 gap-6">
        {secondary.map((p, i) => (
          <SecondaryCard key={p.title} project={p} index={i} />
        ))}
      </div>
    </section>
  );
};

export default Projects;
