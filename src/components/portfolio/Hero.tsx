import { useRef, useState, useEffect, useMemo, Suspense } from 'react';
import { motion } from 'framer-motion';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const WireframeMesh = () => {
  const groupRef = useRef<THREE.Group>(null);
  const mouse = useRef({ x: 0, y: 0 });
  const target = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      mouse.current.x = (e.clientX / window.innerWidth - 0.5) * 2;
      mouse.current.y = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener('mousemove', handler);
    return () => window.removeEventListener('mousemove', handler);
  }, []);

  const geo = useMemo(() => new THREE.IcosahedronGeometry(2, 1), []);

  useFrame((_, delta) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y += 0.001;
    target.current.x += (mouse.current.y * 0.26 - target.current.x) * 0.05;
    target.current.y += (mouse.current.x * 0.26 - target.current.y) * 0.05;
    groupRef.current.rotation.x += (target.current.x - groupRef.current.rotation.x) * 0.05;
  });

  return (
    <group ref={groupRef}>
      <mesh geometry={geo}>
        <meshStandardMaterial wireframe color="#00E87A" transparent opacity={0.15} />
      </mesh>
      <mesh geometry={geo} scale={1.3} rotation-y={Math.PI / 4}>
        <meshStandardMaterial wireframe color="#00E87A" transparent opacity={0.06} />
      </mesh>
      <pointLight position={[5, 5, 5]} intensity={1} />
    </group>
  );
};

const LetterReveal = ({ text, delay = 0, className = '' }: { text: string; delay?: number; className?: string }) => (
  <span className="inline-flex overflow-hidden">
    {text.split('').map((char, i) => (
      <motion.span
        key={i}
        initial={{ y: '100%' }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, delay: delay + i * 0.06, ease: [0.22, 1, 0.36, 1] }}
        className={className}
      >
        {char === ' ' ? '\u00A0' : char}
      </motion.span>
    ))}
  </span>
);

const LABELS = [
  '🚀 Full Stack MERN Developer',
  '⚡ Building Scalable Production Systems',
  '🔐 Auth | APIs | Real-Time Apps',
  '🎯 Turning Complex Problems Into Clean Code',
];

const RotatingLabel = () => {
  const [index, setIndex] = useState(0);
  const [animating, setAnimating] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setAnimating(true);
      setTimeout(() => {
        setIndex(prev => (prev + 1) % LABELS.length);
        setAnimating(false);
      }, 500);
    }, 2800);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      style={{
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: 'clamp(56px, 8vw, 96px)',
        marginBottom: '1.5rem',
      }}
    >
      <motion.span
        key={index}
        initial={{ y: '100%', opacity: 0 }}
        animate={animating ? { y: '-100%', opacity: 0 } : { y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        style={{
          display: 'block',
          fontSize: 'clamp(22px, 4vw, 52px)',
          fontWeight: 800,
          fontFamily: 'inherit',
          letterSpacing: '-0.02em',
          background: 'linear-gradient(90deg, #00E87A 0%, #00cfff 60%, #a259ff 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          whiteSpace: 'nowrap',
          lineHeight: 1.1,
        }}
      >
        {LABELS[index]}
      </motion.span>
    </div>
  );
};

// ─── GSAP Horizontal Scroll Name Section ─────────────────────────────────────
//even batter
const HorizontalScrollName = () => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);
  const textRef = useRef<HTMLHeadingElement>(null);
  const charRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const scrollTriggerRef = useRef<ScrollTrigger[]>([]);
  
  const text = 'Welcome To My World Guys';
  const chars = useMemo(() => text.split(''), [text]);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    const textEl = textRef.current;
    if (!wrapper || !textEl) return;

    // Use matchMedia for better performance
    const mm = gsap.matchMedia();
    
    mm.add("(min-width: 768px)", () => {
      // Pin the wrapper and scroll text horizontally
      const scrollTween = gsap.to(textEl, {
        xPercent: -100,
        ease: 'none',
        scrollTrigger: {
          trigger: wrapper,
          pin: true,
          start: 'top top',
          end: '+=300%', // Percentage-based for responsiveness
          scrub: 1, // Smoother scrub value
          anticipatePin: 1,
        },
      });

      scrollTriggerRef.current.push(scrollTween.scrollTrigger!);

      // Animate characters with stagger effect
      charRefs.current.forEach((char, index) => {
        if (!char) return;
        
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: char,
            containerAnimation: scrollTween,
            start: 'left 100%',
            end: 'left 40%',
            scrub: 1,
          },
        });

        tl.from(char, {
          yPercent: gsap.utils.random(-150, 150),
          rotation: gsap.utils.random(-30, 30),
          scale: 0.5,
          opacity: 0,
          ease: 'back.out(2)',
        })
        .to(char, {
          scale: 1,
          opacity: 1,
        }, '<');

        scrollTriggerRef.current.push(tl.scrollTrigger!);
      });
    });

    // Mobile — per-character GSAP ScrollTrigger (mirrors desktop quality)
    mm.add("(max-width: 767px)", () => {
      charRefs.current.forEach((char) => {
        if (!char) return;

        const tl = gsap.timeline({
        scrollTrigger: {
            trigger: char,
            start: 'top 90%',
            end: 'top 40%',
          scrub: 1,
        },
      });

        tl.from(char, {
          yPercent: gsap.utils.random(-120, 120),
          rotation: gsap.utils.random(-25, 25),
          scale: 0.4,
          opacity: 0,
          ease: 'back.out(2)',
        })
        .to(char, { scale: 1, opacity: 1 }, '<');

        scrollTriggerRef.current.push(tl.scrollTrigger!);
      });
    });

    return () => {
      mm.revert();
      scrollTriggerRef.current.forEach((st) => st?.kill());
      scrollTriggerRef.current = [];
    };
  }, [chars]);

  return (
    <div
      ref={wrapperRef}
      className="scroll-name-wrapper"
      style={{
        overflow: 'hidden',
        height: isMobile ? 'auto' : '100vh',
        minHeight: isMobile ? '60vh' : undefined,
        display: 'flex',
        alignItems: 'center',
        background: '#000000',
        position: 'relative',
      }}
    >
      <h1
        ref={textRef}
        style={{
          display: 'flex',
          width: 'max-content',
          whiteSpace: 'nowrap',
          gap: '0.1em',
          paddingLeft: '100vw',
          fontSize: 'clamp(3rem, 12vw, 15rem)',
          fontWeight: 700,
          lineHeight: 1,
          margin: 0,
          letterSpacing: '-0.03em',
          willChange: 'transform', // Performance hint
        }}
      >
        {chars.map((char, i) => (
          <span
            key={`${char}-${i}`} // Better key for duplicate chars
            ref={(el) => { charRefs.current[i] = el; }}
            style={{
              display: 'inline-block',
              minWidth: char === ' ' ? '0.4em' : undefined,
              color: '#ffffff',
              willChange: 'transform, opacity',
            }}
          >
            {char === ' ' ? '\u00A0' : char}
          </span>
        ))}
      </h1>
    </div>
  );
};
// ─────────────────────────────────────────────────────────────────────────────

// ─── Mobile Simple Hero ───────────────────────────────────────────────────────
const MobileHero = () => {
  const [typed, setTyped] = useState('');
  const label = 'FULL — STACK DEVELOPER';

  useEffect(() => {
    let i = 0;
    const timer = setInterval(() => {
      if (i <= label.length) {
        setTyped(label.slice(0, i));
        i++;
      } else clearInterval(timer);
    }, 40);
    return () => clearInterval(timer);
  }, []);

  return (
    <section
      id="hero"
      className="relative h-screen w-full overflow-hidden flex items-center justify-center"
    >
      <div className="absolute inset-0 z-0" style={{
        background: 'radial-gradient(ellipse at center, rgba(0,232,122,0.06) 0%, transparent 70%)'
      }} />

      <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
        <motion.p
          className="font-mono text-[11px] tracking-[0.3em] uppercase text-mint mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          {typed}<span className="animate-pulse">_</span>
        </motion.p>

        <h1
          className="font-display font-extrabold tracking-tight leading-[0.9]"
          style={{ fontSize: 'clamp(64px, 18vw, 120px)' }}
        >
          <span className="block overflow-hidden">
            <LetterReveal text="AMAN" delay={0.6} className="text-foreground" />
          </span>
          <span className="block overflow-hidden">
            <LetterReveal text="BAM" delay={0.8} className="text-foreground" />
            <motion.span
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              transition={{ duration: 0.6, delay: 1.3, ease: [0.22, 1, 0.36, 1] }}
              className="text-amber inline-block"
            >.</motion.span>
          </span>
        </h1>

        <motion.p
          className="font-editorial text-lg text-text-secondary mt-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.8 }}
        >
          Building products that exist in the real world.
        </motion.p>

        <motion.div
          className="flex items-center justify-center gap-4 mt-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.6, duration: 0.6 }}
        >
          <motion.a
            href="#projects"
            className="font-mono text-sm border border-mint/60 text-mint px-6 py-3 hover:bg-mint hover:text-primary-foreground transition-colors"
            whileTap={{ scale: 0.97 }}
          >
            SEE MY WORK
          </motion.a>
          <motion.a
            href="#contact"
            className="font-mono text-sm border border-raised bg-raised text-foreground px-6 py-3 hover:border-mint transition-colors"
            whileTap={{ scale: 0.97 }}
          >
            GET IN TOUCH
          </motion.a>
        </motion.div>

        <motion.div
          className="flex flex-wrap items-center justify-center gap-3 mt-14 font-mono text-[10px] text-text-secondary"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
        >
          <span>🏆 Uttarakhand AI Mission UDBHAV 2025 Hackathon Winner</span>
        </motion.div>
      </div>

      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 w-px h-10 bg-mint origin-top"
        animate={{ scaleY: [1, 0.3, 1], opacity: [0.6, 1, 0.6] }}
        transition={{ duration: 2, repeat: Infinity }}
      />
    </section>
  );
};
// ─────────────────────────────────────────────────────────────────────────────

const Hero = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  // ── Mobile: classic simple layout ──
  if (isMobile) return <MobileHero />;

  // ── Desktop: 3-part GSAP layout ──
  return (
    <>
      {/* ── Part 1: Hero intro (RotatingLabel + wireframe bg) ── */}
      <section
        id="hero"
        className="relative w-full flex items-center justify-center"
        style={{ minHeight: '60vh', background: '#080808' }}
      >
        <div className="absolute inset-0 z-0">
          <Canvas frameloop="demand" camera={{ position: [0, 0, 5], fov: 50 }} dpr={[1, 1.5]}
            onCreated={({ gl, invalidate }) => {
              gl.setClearColor('#080808');
              const handler = () => invalidate();
              window.addEventListener('mousemove', handler);
              return () => window.removeEventListener('mousemove', handler);
            }}>
            <Suspense fallback={null}>
              <WireframeMesh />
            </Suspense>
          </Canvas>
        </div>

        <div className="relative z-10 text-center px-6 max-w-5xl mx-auto pt-32 pb-12">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.7 }}
          >
            <RotatingLabel />
          </motion.div>
        </div>
      </section>

      {/* ── Part 2: GSAP horizontal scroll (page pins here) ── */}
      <HorizontalScrollName />

      {/* ── Part 3: Description, buttons, stats ── */}
      <section
        style={{ background: '#080808', padding: '5rem 1.5rem 6rem' }}
        className="relative w-full flex flex-col items-center justify-center text-center"
      >
        <motion.p
          className="font-editorial text-xl md:text-2xl text-text-secondary"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.8 }}
        >
          Building products that exist in the real world.
        </motion.p>

        <motion.div
          className="flex items-center justify-center gap-4 mt-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.6, duration: 0.6 }}
        >
          <motion.a
            href="#projects"
            className="font-mono text-sm border border-mint/60 text-mint px-6 py-3 hover:bg-mint hover:text-primary-foreground transition-colors"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            data-cursor="link"
          >
            SEE MY WORK
          </motion.a>
          <motion.a
            href="#contact"
            className="font-mono text-sm border border-raised bg-raised text-foreground px-6 py-3 hover:border-mint transition-colors"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            data-cursor="link"
          >
            GET IN TOUCH
          </motion.a>
        </motion.div>

        <motion.div
          className="flex flex-wrap items-center justify-center gap-4 md:gap-6 mt-16 font-mono text-[11px] text-text-secondary"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
        >
          <span>🏆 Uttarakhand AI Mission UDBHAV 2025 Hackathon Winner</span>
          <span className="hidden md:inline text-mint/30">|</span>
        </motion.div>

        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 w-px h-10 bg-mint origin-top"
          animate={{ scaleY: [1, 0.3, 1], opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      </section>
    </>
  );
};

export default Hero;
