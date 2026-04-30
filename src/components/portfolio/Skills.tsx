import { memo, useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  Code2, 
  ChevronRight,
  ExternalLink
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

const CoreSkillTile = memo(({ skill, color }: { skill: Skill, color: string }) => (
  <motion.div
    whileHover={{ y: -5, borderColor: `var(--color-${color})` }}
    className={`col-span-2 row-span-2 group relative bg-[#121212] border border-white/10 rounded-sm p-6 flex flex-col justify-between transition-all duration-300 hover:shadow-[0_10px_30px_rgba(0,0,0,0.5)]`}
    style={{ willChange: 'transform' }} // GPU hint
  >
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <span className={`text-[10px] font-mono uppercase tracking-widest px-2 py-0.5 rounded-full border border-white/10 text-white bg-white/5`}>
          {skill.proficiency}
        </span>
        {skill.projectLink && (
          <a href={skill.projectLink} className="text-zinc-500 hover:text-white transition-colors">
            <ExternalLink className="w-4 h-4" />
          </a>
        )}
      </div>
      <h3 className="font-display text-3xl font-black tracking-tight text-white group-hover:text-mint transition-colors">
        {skill.name}
      </h3>
      <p className="text-zinc-500 text-sm font-mono leading-relaxed opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
        {skill.statement}
      </p>
    </div>
    
    <div className="flex items-center gap-2 pt-4">
      <div className={`h-[1px] flex-1 bg-gradient-to-r from-white/10 to-transparent`} />
      <span className="text-[9px] font-mono text-zinc-600 uppercase tracking-[0.2em]">Signal_Strong</span>
    </div>
  </motion.div>
));

const StandardSkillTile = memo(({ skill, color }: { skill: Skill, color: string }) => (
  <motion.div
    whileHover={{ y: -3 }}
    className="col-span-1 row-span-1 bg-[#121212] border border-white/10 rounded-sm p-4 flex flex-col justify-between hover:border-mint/30 transition-all duration-300"
    style={{ willChange: 'transform' }}
  >
    <div className="flex items-center justify-between gap-2">
      <h4 className="font-display font-bold text-sm text-white truncate">{skill.name}</h4>
      <div className={`w-1.5 h-1.5 rounded-full bg-white/20`} />
    </div>
    <span className="text-[9px] font-mono text-zinc-500 uppercase tracking-widest mt-2">
      {skill.proficiency}
    </span>
  </motion.div>
));

const MicroSkillTile = memo(({ skill }: { skill: Skill }) => (
  <motion.div
    whileHover={{ scale: 1.02 }}
    className="col-span-1 row-span-1 bg-white/5 border border-white/10 rounded-sm px-3 py-2 flex items-center justify-center group transition-all duration-300"
    style={{ willChange: 'transform' }}
  >
    <span className={`text-[10px] font-mono text-zinc-500 group-hover:text-mint transition-colors ${skill.proficiency === 'Learning' ? 'animate-pulse text-amber' : ''}`}>
      {skill.name}
    </span>
  </motion.div>
));

const gridVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05
    }
  }
};

const tileVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.4,
      ease: "easeOut"
    }
  }
};

const Skills = () => {
  const [activeGroup, setActiveGroup] = useState(0);

  const navigate = useNavigate();

  return (
    <section id="skills" className="relative py-32 px-6 md:px-12 max-w-7xl mx-auto overflow-hidden">
      {/* Optimized background decoration */}
      <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-[400px] h-[400px] bg-mint/5 rounded-full blur-[80px] pointer-events-none" />
      
      {/* Section Header */}
      <div className="relative mb-24">
        <div className="flex items-center gap-4 mb-6">
          <div className="h-[1px] w-12 bg-mint/40" />
          <p className="font-mono text-[11px] tracking-[0.3em] uppercase text-mint font-bold">
            04 / Engineering Stack
          </p>
        </div>
        
        <h2 className="font-display font-black tracking-tighter leading-[0.85] text-white mb-8" style={{ fontSize: 'clamp(48px, 8vw, 80px)' }}>
          TECHNICAL<br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-white/50">
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
              ? `bg-mint text-black border-mint` 
              : 'border-white/10 text-zinc-500 hover:border-mint/40 hover:text-white'
            }`}
          >
            {group.label}
          </button>
        ))}
      </div>

      {/* Optimized Bento Grid */}
      <motion.div 
        key={activeGroup}
        variants={gridVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="grid grid-cols-2 md:grid-cols-4 gap-4 auto-rows-[140px]"
      >
        {SKILL_GROUPS[activeGroup].skills.map((skill) => {
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
      <div id="capability-callout" className="mt-24 pt-12 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="flex items-center gap-6">
          <div className="flex -space-x-2">
            {[1, 2, 3].map((i) => (
              <div key={i} className="w-8 h-8 rounded-full border-2 border-black bg-zinc-900 flex items-center justify-center">
                <Code2 className="w-4 h-4 text-mint" />
              </div>
            ))}
          </div>
          <p className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider">
            Deep mastery in <span className="text-white">distributed systems & AI orchestration</span>.
          </p>
        </div>
        
        <button 
          onClick={() => navigate('/capability-deck')}
          className="group flex items-center gap-3 bg-white text-black px-6 py-3 rounded-sm font-display font-bold text-xs hover:bg-mint transition-all duration-300"
        >
          REQUEST FULL CAPABILITY DECK
          <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </section>
  );
};

export default Skills;
