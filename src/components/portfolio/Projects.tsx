import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ExternalLink } from 'lucide-react';
import { GitHubLogoIcon } from '@radix-ui/react-icons';

gsap.registerPlugin(ScrollTrigger);

interface Project {
  title: string;
  description: string;
  tech: string[];
  type?: string;
  badge?: string;
  status?: string;
  github?: string;
  live?: string;
  color?: string;
}

const projects: Project[] = [
  {
    title: 'Apuni Sarkar',
    description:
      'AI-powered platform simplifying access to Uttarakhand government schemes, documentation, and citizen services. Built with React 19 + Google Gemini API. No backend — pure frontend + AI.',
    tech: ['React 19', 'Gemini API', 'Tailwind CSS', 'Framer Motion'],
    badge: '🥇 HACKATHON WINNER — KU 2024',
    color: '#00e87a',
  },
  {
    title: 'Employment Mgmt System',
    description:
      'Dark glassmorphism UI with emerald accents. Admin + employee dashboards, task management, role-based access, real-time updates.',
    tech: ['MongoDB', 'Express', 'React', 'Node.js', 'Tailwind CSS'],
    color: '#FFB347',
  },
  {
    title: 'Banking System Backend',
    description:
      'Pure backend REST API. Account management, transactions, authentication, and balance operations.',
    tech: ['Node.js', 'Express.js', 'MongoDB'],
    type: 'Backend API',
    color: '#7EB8F7',
  },
  {
    title: 'Lead Extension',
    description:
      'Browser-based lead capture tool for extracting and managing prospect data directly from any website.',
    tech: ['Chrome Extension APIs', 'JavaScript'],
    type: 'Chrome Extension',
    color: '#B97CF7',
  },
  {
    title: 'Job Aggregator',
    description:
      'Multi-platform scraper (LinkedIn, Naukri, etc.), AI cover letter generator, email notifications, analytics dashboard.',
    tech: ['Python', 'React', 'Flask', 'SQLite', 'Gemini API'],
    color: '#F77E7E',
  },
  {
    title: 'Rebooked',
    description:
      'SaaS for appointment-based businesses. Revenue leakage audit + Lost Revenue Calculator. Cold outreach automation.',
    tech: ['MERN Stack', 'TypeScript'],
    status: 'In Progress',
    type: 'SaaS · Co-founded',
    color: '#00e87a',
  },
];

const ProjectCard = ({ project }: { project: Project }) => {
  const accent = project.color ?? '#00e87a';

  return (
    <div className="project-card-wrap">
      <div
        className="project-card"
        style={{ '--accent': accent } as React.CSSProperties}
      >
        {/* Gradient blob */}
        <div
          className="card-blob"
          style={{ background: `radial-gradient(circle at 30% 30%, ${accent}22 0%, transparent 70%)` }}
        />

        {/* Top bar */}
        <div className="card-topbar">
          {project.badge ? (
            <span className="badge badge-gold">{project.badge}</span>
          ) : project.status ? (
            <span className="badge badge-amber">{project.status}</span>
          ) : project.type ? (
            <span className="badge badge-dim">{project.type}</span>
          ) : (
            <span />
          )}
          <div className="card-links">
            {project.github && (
              <a href={project.github} target="_blank" rel="noreferrer" aria-label="GitHub">
                <GitHubLogoIcon width={16} height={16} />
              </a>
            )}
            {project.live && (
              <a href={project.live} target="_blank" rel="noreferrer" aria-label="Live Demo">
                <ExternalLink size={16} />
              </a>
            )}
          </div>
        </div>

        {/* Number */}
        <span className="card-number" style={{ color: `${accent}18` }}>
          {String(projects.indexOf(project) + 1).padStart(2, '0')}
        </span>

        {/* Content */}
        <div className="card-content">
          <h3 className="card-title">{project.title}</h3>
          <p className="card-desc">{project.description}</p>
          <div className="card-tech">
            {project.tech.map((t) => (
              <span key={t} className="tech-tag" style={{ borderColor: `${accent}30`, color: accent }}>
                {t}
              </span>
            ))}
          </div>
        </div>

        {/* Bottom accent bar */}
        <div className="card-accent-bar" style={{ background: accent }} />
      </div>
    </div>
  );
};

const Projects = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const stripRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const wrapper = wrapperRef.current;
    const strip = stripRef.current;

    if (!section || !wrapper || !strip) return;

    let ctx = gsap.context(() => {
      const getScrollLength = () => strip.scrollWidth - window.innerWidth;

      const tween = gsap.to(strip, {
        x: () => -getScrollLength(),
        ease: 'none',
        scrollTrigger: {
          trigger: wrapper,
          pin: true,
          scrub: 1,
          start: 'center center',
          end: () => `+=${strip.scrollWidth}`,
          invalidateOnRefresh: true,
        },
      });

      return () => {
        tween.scrollTrigger?.kill();
        tween.kill();
      };
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <>
      <style>{`
        /* ── Section header ──────────────────────────── */
        .projects-header {
          padding: 7rem 3rem 4rem;
          max-width: 90rem;
          margin: 0 auto;
        }
        .projects-label {
          font-family: 'Space Mono', monospace;
          font-size: 11px;
          letter-spacing: 0.25em;
          text-transform: uppercase;
          color: #00e87a;
          margin-bottom: 1.25rem;
        }
        .projects-title {
          font-family: 'Syne', sans-serif;
          font-weight: 900;
          line-height: 0.95;
          font-size: clamp(52px, 9vw, 96px);
          letter-spacing: -0.02em;
          margin: 0;
        }
        .projects-title .highlight {
          color: #FF0000;
        }

        /* ── Scroll wrapper / strip ──────────────────── */
        .horiz-gallery-wrapper {
          width: 100%;
          overflow: hidden;
          will-change: transform;
        }
        .horiz-gallery-strip {
          display: flex;
          flex-wrap: nowrap;
          align-items: stretch;
          padding: 2rem 3rem 4rem;
          gap: 2rem;
          will-change: transform;
        }

        /* ── Project card ────────────────────────────── */
        .project-card-wrap {
          flex: 0 0 clamp(300px, 33vw, 420px);
        }
        .project-card {
          position: relative;
          height: 460px;
          background: #0e0e0e;
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 1.25rem;
          padding: 2rem;
          box-sizing: border-box;
          display: flex;
          flex-direction: column;
          overflow: hidden;
          transition: border-color 0.35s, transform 0.35s;
          cursor: default;
        }
        .project-card:hover {
          border-color: var(--accent);
          transform: translateY(-6px);
        }
        .card-blob {
          position: absolute;
          inset: 0;
          pointer-events: none;
          z-index: 0;
        }
        .card-topbar {
          position: relative;
          z-index: 1;
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: auto;
        }
        .badge {
          font-family: 'Space Mono', monospace;
          font-size: 9px;
          text-transform: uppercase;
          letter-spacing: 0.12em;
          padding: 4px 8px;
          border-radius: 4px;
          border: 1px solid;
        }
        .badge-gold {
          color: #FFB347;
          background: rgba(255,179,71,0.08);
          border-color: rgba(255,179,71,0.25);
        }
        .badge-amber {
          color: #FFD580;
          background: rgba(255,213,128,0.08);
          border-color: rgba(255,213,128,0.25);
        }
        .badge-dim {
          color: rgba(255,255,255,0.35);
          background: rgba(255,255,255,0.04);
          border-color: rgba(255,255,255,0.08);
        }
        .card-links {
          display: flex;
          gap: 0.75rem;
        }
        .card-links a {
          color: rgba(255,255,255,0.4);
          transition: color 0.2s;
          display: flex;
          align-items: center;
        }
        .card-links a:hover {
          color: #fff;
        }
        .card-number {
          position: absolute;
          bottom: 1.5rem;
          right: 1.75rem;
          font-family: 'Syne', sans-serif;
          font-weight: 900;
          font-size: 7rem;
          line-height: 1;
          pointer-events: none;
          user-select: none;
          z-index: 0;
          transition: color 0.3s;
        }
        .card-content {
          position: relative;
          z-index: 1;
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
          margin-top: 1.5rem;
        }
        .card-title {
          font-family: 'Syne', sans-serif;
          font-weight: 800;
          font-size: 1.45rem;
          line-height: 1.2;
          margin: 0;
          color: #ece9e0;
        }
        .card-desc {
          font-size: 0.83rem;
          line-height: 1.65;
          color: rgba(236,233,224,0.5);
          margin: 0;
          display: -webkit-box;
          -webkit-line-clamp: 4;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .card-tech {
          display: flex;
          flex-wrap: wrap;
          gap: 0.4rem;
          margin-top: 0.25rem;
        }
        .tech-tag {
          font-family: 'Space Mono', monospace;
          font-size: 9px;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          padding: 3px 8px;
          border-radius: 3px;
          border: 1px solid;
          background: rgba(255,255,255,0.02);
        }
        .card-accent-bar {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          height: 3px;
          transform: scaleX(0);
          transform-origin: left;
          transition: transform 0.4s cubic-bezier(0.4,0,0.2,1);
          border-radius: 0 0 1.25rem 1.25rem;
        }
        .project-card:hover .card-accent-bar {
          transform: scaleX(1);
        }

        /* ── Scroll hint ──────────────────────────────── */
        .scroll-hint {
          display: flex;
          align-items: center;
          gap: 0.6rem;
          padding: 0 3rem 1.5rem;
          font-family: 'Space Mono', monospace;
          font-size: 10px;
          text-transform: uppercase;
          letter-spacing: 0.18em;
          color: rgba(255,255,255,0.25);
        }
        .scroll-hint-line {
          flex: 0 0 40px;
          height: 1px;
          background: rgba(255,255,255,0.15);
        }
      `}</style>

      {/* Static header ABOVE the pinned zone */}
      <div className="projects-header">
        <p className="projects-label">003 — SELECTED WORK</p>
        <h2 className="projects-title">
          THINGS I'VE<br />
          <span className="highlight">SHIPPED</span>.
        </h2>
      </div>

      {/* The pinned horizontal gallery */}
      <section id="projects" ref={sectionRef}>
        <div ref={wrapperRef} className="horiz-gallery-wrapper">
          <div className="scroll-hint">
            <span className="scroll-hint-line" />
            scroll to explore
          </div>
          <div ref={stripRef} className="horiz-gallery-strip">
            {projects.map((p) => (
              <ProjectCard key={p.title} project={p} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Projects;
