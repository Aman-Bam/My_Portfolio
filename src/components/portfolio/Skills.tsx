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

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring',
      stiffness: 300,
      damping: 20,
    },
  },
};

const CoreSkillTile = memo(({ skill, color }: { skill: Skill; color: string }) => {
  return (
    <motion.div
      variants={itemVariants}
      className={`
        md:col-span-2 lg:col-span-2 md:row-span-2
        bg-surface/80 backdrop-blur-md
        border border-border
        rounded-sm
        p-4
        flex flex-col justify-between
        hover:border-mint transition-all duration-300
        cursor-default group/tile
        border-mint/40 shadow-[0_0_20px_rgba(0,232,122,0.08)] hover:shadow-[0_0_40px_rgba(0,232,122,0.3)]
      `}
    >
      <div className="flex items-center gap-2 mb-2">
        <span className={`w-1.5 h-1.5 rounded-full ${color} shrink-0`} />
        <span className="font-display text-sm font-bold text-foreground tracking-tight">
          {skill.name}
        </span>
      </div>

      <div className="mt-auto flex items-end justify-between gap-2">
        <span className="font-mono text-[9px] uppercase tracking-widest text-mint font-bold">
          {skill.proficiency}
        </span>

        {skill.projectLink && (
          <a
            href={skill.projectLink}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-mint/10 border border-mint/20 text-mint text-[9px] px-1.5 py-0.5 rounded-sm font-mono hover:bg-mint/20 transition-colors"
          >
            [ VIEW_SAMP → ]
          </a>
        )}
      </div>

      {skill.statement && (
        <motion.div
          className="text-text-secondary text-[11px] leading-relaxed mt-3 font-mono
            opacity-0 translate-y-2 group-hover/tile:opacity-100 group-hover/tile:translate-y-0 transition-all duration-300 ease-out"
        >
          {skill.statement}
        </motion.div>
      )}
    </motion.div>
  );
});
CoreSkillTile.displayName = 'CoreSkillTile';

const StandardSkillTile = memo(({ skill, color }: { skill: Skill; color: string }) => {
  return (
    <motion.div
      variants={itemVariants}
      className={`
        md:col-span-2 lg:col-span-2
        bg-surface/80 backdrop-blur-md
        border border-border
        rounded-sm
        p-4
        flex flex-col justify-between
        hover:border-mint/40 transition-all duration-300
        cursor-default group/tile
        hover:-translate-y-0.5
      `}
    >
      <div className="flex items-center gap-2 mb-2">
        <span className={`w-1.5 h-1.5 rounded-full ${color} shrink-0`} />
        <span className="font-display text-sm font-bold text-foreground tracking-tight">
          {skill.name}
        </span>
      </div>

      <div className="mt-auto flex items-end justify-between gap-2">
        <span className="font-mono text-[9px] uppercase tracking-widest text-text-secondary/60">
          {skill.proficiency}
        </span>

        {skill.projectLink && (
          <a
            href={skill.projectLink}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-mint/10 border border-mint/20 text-mint text-[9px] px-1.5 py-0.5 rounded-sm font-mono hover:bg-mint/20 transition-colors"
          >
            [ VIEW_SAMP → ]
          </a>
        )}
      </div>
    </motion.div>
  );
});
StandardSkillTile.displayName = 'StandardSkillTile';

const MicroSkillTile = memo(({ skill, color }: { skill: Skill; color: string }) => {
  const isLearning = skill.proficiency === 'Learning';

  return (
    <motion.div
      variants={itemVariants}
      className={`
        md:col-span-1 lg:col-span-1
        bg-surface/40 backdrop-blur-sm
        border border-border
        rounded-sm
        px-3 py-2
        flex items-center justify-between
        hover:border-mint/40 transition-all duration-300
        cursor-default group/tile
        hover:-translate-y-0.5
      `}
    >
      <div className="flex items-center gap-2">
        {isLearning && (
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-mint opacity-40"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-mint"></span>
          </span>
        )}
        <span className="font-display text-[12px] font-medium text-foreground tracking-tight">
          {skill.name}
        </span>
      </div>
      <span className="font-mono text-[8px] uppercase tracking-widest text-text-secondary/50">
        {skill.proficiency}
      </span>
    </motion.div>
  );
});
MicroSkillTile.displayName = 'MicroSkillTile';

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

      <motion.div
        className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-6 gap-4 auto-rows-auto"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        {allSkillsWithColors.map((s) => {
          if (s.proficiency === 'Expert') {
            return <CoreSkillTile key={s.name} skill={s} color={s.color} />;
          }
          if (s.proficiency === 'Advanced') {
            return <StandardSkillTile key={s.name} skill={s} color={s.color} />;
          }
          return <MicroSkillTile key={s.name} skill={s} color={s.color} />;
        })}
      </motion.div>
    </section>
  );
};

export default Skills;
