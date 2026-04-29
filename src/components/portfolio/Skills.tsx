import { memo } from 'react';
import { motion } from 'framer-motion';

const groups: { label: string; color: string; skills: string[]; primary?: string[] }[] = [
  { label: 'FRONTEND', color: 'bg-mint', skills: ['React 19', 'TypeScript', 'Next.js', 'Tailwind CSS', 'Framer Motion', 'HTML5', 'CSS3'], primary: ['React 19', 'TypeScript'] },
  { label: 'BACKEND', color: 'bg-amber', skills: ['Node.js', 'Express.js', 'Python', 'Flask', 'REST API design'], primary: ['Node.js'] },
  { label: 'DATABASE', color: 'bg-blue-400', skills: ['MongoDB', 'MongoDB Atlas', 'Mongoose', 'SQLite'], primary: ['MongoDB'] },
  { label: 'AI / APIS', color: 'bg-purple-400', skills: ['Gemini API', 'Anthropic API', 'OpenAI API', 'Google Maps API'] },
  { label: 'TOOLING', color: 'bg-orange-400', skills: ['Git', 'GitHub', 'VS Code', 'Claude Code', 'Vite', 'npm'] },
  { label: 'SYSTEMS', color: 'bg-red-400', skills: ['Linux (Arch)', 'Bash scripting', 'Chrome Extension APIs'] },
];

const SkillTile = memo(({ name, isPrimary, color, delay }: { name: string; isPrimary: boolean; color: string; delay: number }) => (
  <motion.div
    className={`bg-surface border ${isPrimary ? 'border-mint/40' : 'border-border'} rounded-sm px-3 py-2 flex items-center gap-2 hover:border-mint/60 hover:-translate-y-0.5 transition-all`}
    style={isPrimary ? { boxShadow: '0 0 20px rgba(0,232,122,0.08)' } : undefined}
    initial={{ opacity: 0, scale: 0.8 }}
    whileInView={{ opacity: 1, scale: 1 }}
    viewport={{ once: true }}
    transition={{ delay, duration: 0.3 }}
  >
    <span className={`w-1 h-1 rounded-full ${color} shrink-0`} />
    <span className="font-display text-[13px] font-medium text-foreground">{name}</span>
  </motion.div>
));
SkillTile.displayName = 'SkillTile';

const Skills = () => (
  <section id="skills" className="py-32 px-6 md:px-12 max-w-7xl mx-auto">
    <p className="font-mono text-[11px] tracking-[0.25em] uppercase text-mint mb-6">004 — TOOLS OF TRADE</p>
    <h2 className="font-display font-extrabold tracking-tight leading-[0.95] mb-20" style={{ fontSize: 'clamp(48px, 8vw, 80px)' }}>
      WHAT I<br /><span className="text-red-600">WORK</span> WITH.
    </h2>

    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12">
      {groups.map((g) => (
        <div key={g.label}>
          <p className="font-mono text-[10px] tracking-widest uppercase text-text-secondary mb-4 flex items-center gap-2">
            <span className={`w-2 h-2 rounded-full ${g.color}`} />
            {g.label}
          </p>
          <div className="flex flex-wrap gap-2">
            {g.skills.map((s, i) => (
              <SkillTile key={s} name={s} isPrimary={g.primary?.includes(s) ?? false} color={g.color} delay={i * 0.03} />
            ))}
          </div>
        </div>
      ))}
    </div>
  </section>
);

export default Skills;
