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
      { name: 'React 19', proficiency: 'Expert', statement: 'Mastery of Concurrent Rendering & Server Components', projectLink: '#' },
      { name: 'TypeScript', proficiency: 'Expert', statement: 'Type-safe architecture with advanced generics and mapped types', projectLink: '#' },
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
      { name: 'Node.js', proficiency: 'Expert', statement: 'High-performance asynchronous event-driven architectures', projectLink: '#' },
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

const SkillTile = memo(({ skill, color, delay }: { skill: Skill; color: string; delay: number }) => {
  const isExpert = skill.proficiency === 'Expert';
  const isAdvanced = skill.proficiency === 'Advanced';

  // Determine grid span based on proficiency
  const gridSpan = isExpert
    ? 'md:col-span-2 md:row-span-2'
    : isAdvanced
    ? 'md:col-span-2'
    : 'md:col-span-1';

  return (
    <motion.div
      className={`
        ${gridSpan}
        bg-surface/80 backdrop-blur-md
        border border-border
        rounded-sm
        p-4
        flex flex-col justify-between
        hover:border-mint transition-all duration-300
        cursor-default group/tile
        ${isExpert ? 'border-mint/40 shadow-[0_0_20px_rgba(0,232,122,0.08)] hover:shadow-[0_0_40px_rgba(0,232,122,0.3)]' : 'hover:border-mint/60 hover:-translate-y-1'}
      `}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.4 }}
    >
      <div className="flex items-center gap-2 mb-2">
        <span className={`w-1.5 h-1.5 rounded-full ${color} shrink-0`} />
        <span className="font-display text-sm font-bold text-foreground tracking-tight">
          {skill.name}
        </span>
      </div>

      <div className="mt-auto">
        {skill.statement && (
          <motion.div
            initial={false}
            className={`text-text-secondary text-[11px] leading-relaxed mb-3 ${isExpert ? 'font-mono' : ''}`}
            animate={{
              opacity: 0.8,
              y: 0
            }}
            whileHover={{
              opacity: 1,
              y: -2
            }}
            transition={{ duration: 0.2 }}
            // We need to trigger this on the parent group hover.
            // Since motion.div whileHover only works on itself,
            // and we want the parent group/tile to trigger it,
            // we can use CSS for the transition or a state.
            // Actually, the prompt asked for framer-motion slide-up.
            // I will use a CSS-based approach with framer-motion's logic
            // by using a custom animation or just standard Tailwind transitions
            // if the trigger is the parent.
            // Wait, I can use a `motion.p` with a transition that responds to
            // the group hover via a CSS variable or just style it.
            // Let's use Tailwind's group-hover for the slide-up to keep it simple
            // but high-end, or use a motion component that monitors the parent.
            // Better: use a simple div with transition-all and group-hover:translate-y-[-2px]
          />
        )}
      </div>
    </motion.div>
  );
});
SkillTile.displayName = 'SkillTile';

const Skills = () => {
  // Flatten all skills into a single array for the Bento Grid,
  // but keep track of their group color
  const allSkillsWithColors = groups.flatMap(g =>
    g.skills.map(s => ({ ...s, color: g.color }))
  );

  return (
    <section id="skills" className="py-32 px-6 md:px-12 max-w-7xl mx-auto">
      <p className="font-mono text-[11px] tracking-[0.25em] uppercase text-mint mb-6">004 — TOOLS OF TRADE</p>
      <h2 className="font-display font-extrabold tracking-tight leading-[0.95] mb-20" style={{ fontSize: 'clamp(48px, 8vw, 80px)' }}>
        WHAT I<br /><span className="text-red-600">WORK</span> WITH.
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-6 gap-4 auto-rows-auto">
        {allSkillsWithColors.map((s, i) => (
          <SkillTile
            key={s.name}
            skill={s}
            color={s.color}
            delay={i * 0.05}
          />
        ))}
      </div>
    </section>
  );
};

export default Skills;
