import { memo, useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Code2, 
  Cpu, 
  Database, 
  Layout, 
  Terminal, 
  Zap,
  ChevronRight,
  ExternalLink,
  ShieldCheck,
  Workflow
} from 'lucide-react';

type Proficiency = 'Expert' | 'Advanced' | 'Proficient' | 'Learning';

interface Skill {
  name: string;
  proficiency: Proficiency;
  statement?: string;
  projectLink?: string;
  icon?: React.ReactNode;
}

interface SkillGroup {
  label: string;
  color: string;
  skills: Skill[];
}

const SKILL_GROUPS: SkillGroup[] = [
  {
    label: 'Frontend Systems',
    color: 'mint',
    skills: [
      { 
        name: 'React 19', 
        proficiency: 'Expert', 
        statement: 'Mastery of Concurrent Rendering, Server Components, and the Transition API for high-performance apps.',
        projectLink: '#projects'
      },
      { 
        name: 'TypeScript', 
        proficiency: 'Expert', 
        statement: 'Advanced type engineering and zero-runtime-error architectures for complex enterprise systems.',
        projectLink: '#projects'
      },
      { 
        name: 'Next.js 15', 
        proficiency: 'Expert', 
        statement: 'Expertise in App Router orchestration, Streaming SSR, and hybrid caching strategies.',
        projectLink: '#projects'
      },
      { name: 'Tailwind CSS', proficiency: 'Advanced' },
      { name: 'Framer Motion', proficiency: 'Advanced' },
      { name: 'Three.js', proficiency: 'Proficient' },
    ]
  },
  {
    label: 'Backend & Architecture',
    color: 'amber',
    skills: [
      { 
        name: 'Node.js', 
        proficiency: 'Expert', 
        statement: 'Building high-throughput, event-driven microservices and real-time WebSocket systems.',
        projectLink: '#projects'
      },
      { name: 'Python', proficiency: 'Advanced' },
      { name: 'Go', proficiency: 'Learning' },
      { name: 'PostgreSQL', proficiency: 'Advanced' },
      { name: 'MongoDB', proficiency: 'Advanced' },
      { name: 'Redis', proficiency: 'Advanced' },
    ]
  },
  {
    label: 'AI & Intelligence',
    color: 'purple-400',
    skills: [
      { 
        name: 'LLM Orchestration', 
        proficiency: 'Advanced',
        statement: 'Integrating Gemini/GPT with tool-calling and RAG for intelligent autonomous agents.'
      },
      { name: 'Agentic Workflows', proficiency: 'Advanced' },
      { name: 'Vector DBs', proficiency: 'Proficient' },
      { name: 'Prompt Engineering', proficiency: 'Expert' },
    ]
  }
];

const CoreSkillTile = ({ skill, color }: { skill: Skill, color: string }) => (
  <motion.div
    whileHover={{ y: -5, borderColor: `var(--color-${color})` }}
    className={`col-span-2 row-span-2 group relative bg-surface/80 backdrop-blur-md border border-border/50 rounded-sm p-6 flex flex-col justify-between transition-colors duration-300 hover:shadow-[0_0_30px_rgba(0,232,122,0.1)]`}
  >
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <span className={`text-[10px] font-mono uppercase tracking-widest px-2 py-0.5 rounded-full border border-${color}/20 text-${color} bg-${color}/5`}>
          {skill.proficiency}
        </span>
        {skill.projectLink && (
          <a href={skill.projectLink} className="text-text-secondary hover:text-foreground transition-colors">
            <ExternalLink className="w-4 h-4" />
          </a>
        )}
      </div>
      <h3 className="font-display text-3xl font-black tracking-tight text-white group-hover:text-mint transition-colors">
        {skill.name}
      </h3>
      <p className="text-text-secondary text-sm font-mono leading-relaxed opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
        {skill.statement}
      </p>
    </div>
    
    <div className="flex items-center gap-2 pt-4">
      <div className={`h-[1px] flex-1 bg-gradient-to-r from-${color}/40 to-transparent`} />
      <span className="text-[9px] font-mono text-text-secondary uppercase tracking-[0.2em]">Signal_Strong</span>
    </div>
  </motion.div>
);

const StandardSkillTile = ({ skill, color }: { skill: Skill, color: string }) => (
  <motion.div
    whileHover={{ y: -3 }}
    className="col-span-1 row-span-1 bg-surface/40 backdrop-blur-sm border border-border/50 rounded-sm p-4 flex flex-col justify-between hover:border-mint/30 transition-colors"
  >
    <div className="flex items-center justify-between gap-2">
      <h4 className="font-display font-bold text-sm text-foreground truncate">{skill.name}</h4>
      <div className={`w-1.5 h-1.5 rounded-full bg-${color} shadow-[0_0_8px_rgba(0,232,122,0.4)]`} />
    </div>
    <span className="text-[9px] font-mono text-text-secondary uppercase tracking-widest mt-2">
      {skill.proficiency}
    </span>
  </motion.div>
);

const MicroSkillTile = ({ skill }: { skill: Skill }) => (
  <motion.div
    whileHover={{ scale: 1.02 }}
    className="col-span-1 row-span-1 bg-white/5 border border-white/10 rounded-sm px-3 py-2 flex items-center justify-center group"
  >
    <span className={`text-[10px] font-mono text-text-secondary group-hover:text-mint transition-colors ${skill.proficiency === 'Learning' ? 'animate-pulse text-amber' : ''}`}>
      {skill.name}
    </span>
  </motion.div>
);

const gridVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const tileVariants = {
  hidden: { opacity: 0, scale: 0.9, y: 20 },
  visible: { 
    opacity: 1, 
    scale: 1, 
    y: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 15
    }
  }
};

const Skills = () => {
  const [activeGroup, setActiveGroup] = useState(0);

  return (
    <section id="skills" className="relative py-32 px-6 md:px-12 max-w-7xl mx-auto overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-[500px] h-[500px] bg-mint/5 rounded-full blur-[120px] pointer-events-none" />
      
      {/* Section Header Section */}
      <div className="relative mb-24">
        <div className="flex items-center gap-4 mb-6">
          <div className="h-[1px] w-12 bg-mint/40" />
          <p className="font-mono text-[11px] tracking-[0.3em] uppercase text-mint font-bold">
            04 / Engineering Stack
          </p>
        </div>
        
        <h2 className="font-display font-black tracking-tighter leading-[0.85] text-foreground mb-8" style={{ fontSize: 'clamp(48px, 8vw, 80px)' }}>
          TECHNICAL<br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-foreground via-foreground to-muted-foreground/40">
            CAPABILITY MATRIX.
          </span>
        </h2>
      </div>

      {/* Group Navigation */}
      <div className="flex flex-wrap gap-4 mb-12">
        {SKILL_GROUPS.map((group, i) => (
          <button
            key={group.label}
            onClick={() => setActiveGroup(i)}
            className={`px-6 py-2 rounded-full font-mono text-[10px] uppercase tracking-widest border transition-all duration-300 ${
              activeGroup === i 
              ? `bg-${group.color}/10 border-${group.color} text-${group.color}` 
              : 'border-border text-text-secondary hover:border-mint/40'
            }`}
          >
            {group.label}
          </button>
        ))}
      </div>

      {/* Bento Grid Implementation */}
      <motion.div 
        key={activeGroup}
        variants={gridVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="grid grid-cols-2 md:grid-cols-4 gap-4 auto-rows-[140px]"
      >
        {SKILL_GROUPS[activeGroup].skills.map((skill, index) => {
          let Content;
          if (skill.proficiency === 'Expert') {
            Content = <CoreSkillTile skill={skill} color={SKILL_GROUPS[activeGroup].color} />;
          } else if (skill.proficiency === 'Advanced') {
            Content = <StandardSkillTile skill={skill} color={SKILL_GROUPS[activeGroup].color} />;
          } else {
            Content = <MicroSkillTile skill={skill} />;
          }

          return (
            <motion.div 
              key={skill.name} 
              variants={tileVariants}
              className={skill.proficiency === 'Expert' ? 'col-span-2 row-span-2' : 'col-span-1 row-span-1'}
            >
              {Content}
            </motion.div>
          );
        })}
      </motion.div>

      {/* Footer Callout */}
      <div className="mt-24 pt-12 border-t border-border/40 flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="flex items-center gap-6">
          <div className="flex -space-x-2">
            {[1, 2, 3].map((i) => (
              <div key={i} className="w-8 h-8 rounded-full border-2 border-background bg-surface flex items-center justify-center">
                <Code2 className="w-4 h-4 text-mint" />
              </div>
            ))}
          </div>
          <p className="text-[10px] font-mono text-text-secondary uppercase tracking-wider">
            Deep mastery in <span className="text-foreground">distributed systems & AI orchestration</span>.
          </p>
        </div>
        
        <a 
          href="#contact"
          className="group flex items-center gap-3 bg-foreground text-background px-6 py-3 rounded-sm font-display font-bold text-xs hover:bg-mint transition-all duration-300"
        >
          REQUEST FULL CAPABILITY DECK
          <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </a>
      </div>
    </section>
  );
};

export default Skills;
