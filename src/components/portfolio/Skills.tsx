import { memo } from 'react';
import { motion } from 'framer-motion';

type Proficiency = 'Expert' | 'Advanced' | 'Proficient' | 'Learning';

interface Skill {
  name: string;
  proficiency: Proficiency;
  statement?: string;
  projectLink?: string;
}

interface SkillGroup {
  label: string;
  color: string;
  skills: Skill[];
}

const groups: SkillGroup[] = [
  {
    label: 'FRONTEND',
    color: 'bg-mint',
    skills: [
      { name: 'React 19', proficiency: 'Expert', statement: 'Mastery of Concurrent Rendering & Server Components' },
      { name: 'TypeScript', proficiency: 'Expert', statement: 'Type-safe architecture with advanced generics and mapped types' },
      { name: 'Next.js', proficiency: 'Advanced', statement: 'Optimized App Router patterns and Streaming SSR' },
      { name: 'Tailwind CSS', proficiency: 'Advanced' },
      { name: 'Framer Motion', proficiency: 'Advanced' },
      { name: 'HTML5', proficiency: 'Proficient' },
      { name: 'CSS3', proficiency: 'Proficient' },
    ],
  },
  {
    label: 'BACKEND',
    color: 'bg-amber',
    skills: [
      { name: 'Node.js', proficiency: 'Expert', statement: 'High-performance asynchronous event-driven architectures' },
      { name: 'Express.js', proficiency: 'Advanced' },
      { name: 'Python', proficiency: 'Advanced' },
      { name: 'Flask', proficiency: 'Proficient' },
      { name: 'REST API design', proficiency: 'Advanced' },
    ],
  },
  {
    label: 'DATABASE',
    color: 'bg-blue-400',
    skills: [
      { name: 'MongoDB', proficiency: 'Advanced' },
      { name: 'MongoDB Atlas', proficiency: 'Advanced' },
      { name: 'Mongoose', proficiency: 'Advanced' },
      { name: 'SQLite', proficiency: 'Proficient' },
    ],
  },
  {
    label: 'AI / APIS',
    color: 'bg-purple-400',
    skills: [
      { name: 'Gemini API', proficiency: 'Advanced' },
      { name: 'Anthropic API', proficiency: 'Advanced' },
      { name: 'OpenAI API', proficiency: 'Advanced' },
      { name: 'Google Maps API', proficiency: 'Proficient' },
    ],
  },
  {
    label: 'TOOLING',
    color: 'bg-orange-400',
    skills: [
      { name: 'Git', proficiency: 'Advanced' },
      { name: 'GitHub', proficiency: 'Advanced' },
      { name: 'VS Code', proficiency: 'Advanced' },
      { name: 'Claude Code', proficiency: 'Advanced' },
      { name: 'Vite', proficiency: 'Advanced' },
      { name: 'npm', proficiency: 'Advanced' },
    ],
  },
  {
    label: 'SYSTEMS',
    color: 'bg-red-400',
    skills: [
      { name: 'Linux (Arch)', proficiency: 'Advanced' },
      { name: 'Bash scripting', proficiency: 'Proficient' },
      { name: 'Chrome Extension APIs', proficiency: 'Proficient' },
    ],
  },
];

const SkillTile = memo(({ skill, isPrimary, color, delay }: { skill: Skill; isPrimary: boolean; color: string; delay: number }) => (
  <motion.div
    className={`bg-surface border ${isPrimary ? 'border-mint/40' : 'border-border'} rounded-sm px-3 py-2 flex items-center gap-2 hover:border-mint/60 hover:-translate-y-0.5 transition-all cursor-default group/tile`}
    style={isPrimary ? { boxShadow: '0 0 20px rgba(0,232,122,0.08)' } : undefined}
    initial={{ opacity: 0, scale: 0.8 }}
    whileInView={{ opacity: 1, scale: 1 }}
    viewport={{ once: true }}
    transition={{ delay, duration: 0.3 }}
  >
    <span className={`w-1 h-1 rounded-full ${color} shrink-0`} />
    <div className="flex flex-col">
      <span className="font-display text-[13px] font-medium text-foreground">{skill.name}</span>
      {skill.statement && (
        <span className="text-[10px] text-text-secondary opacity-0 group-hover/tile:opacity-100 transition-opacity duration-200 line-clamp-1">
          {skill.statement}
        </span>
      )}
    </div>
  </motion.div>
));
SkillTile.displayName = 'SkillTile';

const Skills = () => (
  <section id="skills" className="py-32 px-6 md:px-12 max-w-7xl mx-auto">
    <p className="font-mono text-[11px] tracking-[0.25em] uppercase text-mint mb-6">004 — TOOLS OF TRADE</p>
    <h2 className="font-display font-extrabold tracking-tight leading-[0.95] mb-20" style={{ fontSize: 'clamp(48px, 8vw, 80px)' }}>
      WHAT I<br /><span className="text-red-600">WORK</span> WITH.
    </h2>

    <div className="grid md:grid-cols-2 lg:grid-cols-s3 gap-12">
      {groups.map((g) => (
        <div key={g.label}>
          <p className="font-mono text-[10px] tracking-widest uppercase text-text-secondary mb-4 flex items-center gap-2">
            <span className={`w-2 h-2 rounded-full ${g.color}`} />
            {g.label}
          </p>
          <div className="flex flex-wrap gap-2">
            {g.skills.map((s, i) => (
              <SkillTile
                key={s.name}
                skill={s}
                isPrimary={s.proficiency === 'Expert'}
                color={g.color}
                delay={i * 0.03}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  </section>
);

export default Skills;
