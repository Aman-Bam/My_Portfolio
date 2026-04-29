import { useRef, useState, useEffect, useMemo, Suspense } from "react";
import { motion } from "framer-motion";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const WireframeMesh = ({ progress = 0 }: { progress?: number }) => {
  const groupRef = useRef<THREE.Group>(null);
  const mouse = useRef({ x: 0, y: 0 });
  const target = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      mouse.current.x = (e.clientX / window.innerWidth - 0.5) * 2;
      mouse.current.y = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener("mousemove", handler);
    return () => window.removeEventListener("mousemove", handler);
  }, []);

  const geo = useMemo(() => new THREE.IcosahedronGeometry(2, 1), []);

  useFrame((_, delta) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y += 0.001;
    target.current.x += (mouse.current.y * 0.26 - target.current.x) * 0.05;
    target.current.y += (mouse.current.x * 0.26 - target.current.y) * 0.05;
    groupRef.current.rotation.x +=
      (target.current.x - groupRef.current.rotation.x) * 0.05;

    // Scale and position based on scroll progress
    const scale = 1 + progress * 15; // Scale up to 16x
    groupRef.current.scale.set(scale, scale, scale);
    groupRef.current.position.z = -progress * 10; // Move camera "into" the mesh
  });

  return (
    <group ref={groupRef}>
      <mesh geometry={geo}>
        <meshStandardMaterial
          wireframe
          color="#FF6B2B"
          transparent
          opacity={0.15 + progress * 0.3}
          emissive="#FF6B2B"
          emissiveIntensity={progress * 2}
        />
      </mesh>
      <mesh geometry={geo} scale={1.3} rotation-y={Math.PI / 4}>
        <meshStandardMaterial
          wireframe
          color="#FF6B2B"
          transparent
          opacity={0.06 + progress * 0.1}
        />
      </mesh>
      <pointLight position={[5, 5, 5]} intensity={1} />
    </group>
  );
};

const StatusBadge = () => (
  <motion.div
    initial={{ opacity: 0, y: -20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.3, duration: 0.6 }}
    className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-orange-500/10 border border-orange-500/20 mb-8"
  >
    <span className="relative flex h-2 w-2">
      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
      <span className="relative inline-flex rounded-full h-2 w-2 bg-orange-500"></span>
    </span>
    <span className="text-[10px] sm:text-[11px] font-mono tracking-widest text-orange-400 uppercase font-bold">
      Available for Q4 2024 Projects
    </span>
  </motion.div>
);

const LetterReveal = ({
  text,
  delay = 0,
  className = "",
}: {
  text: string;
  delay?: number;
  className?: string;
}) => (
  <span className="inline-flex overflow-hidden">
    {text.split("").map((char, i) => (
      <motion.span
        key={i}
        initial={{ y: "100%" }}
        animate={{ y: 0 }}
        transition={{
          duration: 0.6,
          delay: delay + i * 0.06,
          ease: [0.22, 1, 0.36, 1],
        }}
        className={className}
      >
        {char === " " ? "\u00A0" : char}
      </motion.span>
    ))}
  </span>
);

const HeroMainContent = () => {
  return (
    <div className="flex flex-col items-center">
      <StatusBadge />

      <div className="relative mb-6">
        <h1
          className="text-4xl md:text-7xl lg:text-8xl font-black tracking-tighter text-white leading-[0.9] text-center"
          style={{ letterSpacing: "-0.04em" }}
        >
          <span className="block mb-2">I Build Full Stack &</span>
          <span className="block bg-clip-text  text-red-600 pb-2">
            AI Systems  vercel chal gaya
          </span>
          <span className="block mt-2">That Drive Real Results</span>
        </h1>
      </div>

      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.6 }}
        className="text-slate-400 text-sm md:text-lg max-w-2xl text-center font-medium leading-relaxed mb-10 px-4"
      >
        Transforming ideas into high-performance SaaS, Web Apps, and AI Tools
        with MERN, Next.js, and Tailwind CSS.
      </motion.p>
      <div className="grid grid-cols-2 gap-4 mt-16 w-full max-w-xs">
        {["MERN", "Next.js", "AI Tools", "SaaS"].map((tech) => (
          <div
            key={tech}
            className="flex items-center gap-2 justify-center py-2 px-3 bg-white/5 border border-white/10 rounded-lg text-[10px] font-bold text-slate-400"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-orange-500" />
            {tech}
          </div>
        ))}
      </div>
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

  const text = "Welcome Back";
  const chars = useMemo(() => text.split(""), [text]);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    const textEl = textRef.current;
    if (!wrapper || !textEl) return;

    // Use matchMedia for better performance
    const mm = gsap.matchMedia();

    mm.add("(min-width: 768px)", () => {
      const scrollTween = gsap.to(textEl, {
        xPercent: -100,
        ease: "none",
        scrollTrigger: {
          trigger: wrapper,
          pin: true,
          start: "top top",
          end: "+=300%",
          scrub: 1,
          anticipatePin: 1,
        },
      });

      scrollTriggerRef.current.push(scrollTween.scrollTrigger!);

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: textEl,
          containerAnimation: scrollTween,
          start: "left 100%",
          end: "right 0%",
          scrub: 1,
        },
      });

      charRefs.current.forEach((char, index) => {
        if (!char) return;
        tl.from(char, {
          yPercent: gsap.utils.random(-150, 150),
          rotation: gsap.utils.random(-30, 30),
          scale: 0.5,
          opacity: 0,
          ease: "back.out(2)",
          duration: 0.5,
        }, index * 0.1);
      });
    });

    mm.add("(max-width: 767px)", () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: textEl,
          start: "top 90%",
          end: "bottom 10%",
          scrub: 1,
        },
      });

      charRefs.current.forEach((char, index) => {
        if (!char) return;
        tl.from(char, {
          yPercent: gsap.utils.random(-120, 120),
          rotation: gsap.utils.random(-25, 25),
          scale: 0.4,
          opacity: 0,
          ease: "back.out(2)",
          duration: 0.5,
        }, index * 0.1);
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
        overflow: "hidden",
        height: isMobile ? "auto" : "100vh",
        minHeight: isMobile ? "60vh" : undefined,
        display: "flex",
        alignItems: "center",
        background: "#000000",
        position: "relative",
      }}
    >
      <h1
        ref={textRef}
        style={{
          display: "flex",
          width: "max-content",
          whiteSpace: "nowrap",
          gap: "0.1em",
          paddingLeft: "100vw",
          fontSize: "clamp(3rem, 12vw, 15rem)",
          fontWeight: 700,
          lineHeight: 1,
          margin: 0,
          letterSpacing: "-0.03em",
          willChange: "transform", // Performance hint
        }}
      >
        {chars.map((char, i) => (
          <span
            key={`${char}-${i}`} // Better key for duplicate chars
            ref={(el) => {
              charRefs.current[i] = el;
            }}
            style={{
              display: "inline-block",
              minWidth: char === " " ? "0.4em" : undefined,
              color: "#ffffff",
              willChange: "transform, opacity",
            }}
          >
            {char === " " ? "\u00A0" : char}
          </span>
        ))}
      </h1>
    </div>
  );
};
// ─────────────────────────────────────────────────────────────────────────────

// ─── Mobile Simple Hero ───────────────────────────────────────────────────────
const MobileHero = () => {
  return (
    <section
      id="hero"
      className="relative min-h-[100dvh] w-full overflow-hidden flex flex-col items-center justify-center bg-[#080808] px-6 py-20"
    >
      <div className="absolute inset-0 z-0">
        <Canvas camera={{ position: [0, 0, 5], fov: 50 }} dpr={[1, 1.5]}>
          <Suspense fallback={null}>
            <WireframeMesh />
          </Suspense>
        </Canvas>
      </div>

      <div className="relative z-10 w-full flex flex-col items-center text-center">
        <StatusBadge />

        <h1 className="text-5xl font-black leading-[0.95] tracking-tighter text-white mb-6">
          <span className="block">I Build Full Stack &</span>
          <span className="block text-red-600">AI Systems</span>
          <span className="block">That Drive Results</span>
        </h1>

        <p className="text-slate-400 text-sm leading-relaxed max-w-sm mb-10 font-medium">
          Transforming ideas into high-performance SaaS, Web Apps, and AI Tools
          with MERN and Next.js.
        </p>

        <div className="grid grid-cols-2 gap-4 mt-16 w-full max-w-xs">
          {["MERN", "Next.js", "AI Tools", "SaaS"].map((tech) => (
            <div
              key={tech}
              className="flex items-center gap-2 justify-center py-2 px-3 bg-white/5 border border-white/10 rounded-lg text-[10px] font-bold text-slate-400"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-orange-500" />
              {tech}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
// ─────────────────────────────────────────────────────────────────────────────

const Hero = () => {
  const [isMobile, setIsMobile] = useState(false);
  const scrollProgress = useRef(0);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  useEffect(() => {
    if (isMobile) return;

    const updateProgress = () => {
      const scrollY = window.scrollY;
      const maxScroll = window.innerHeight * 0.6; // Trigger over 60% of viewport height
      scrollProgress.current = Math.min(scrollY / maxScroll, 1);
    };

    window.addEventListener("scroll", updateProgress);
    return () => window.removeEventListener("scroll", updateProgress);
  }, [isMobile]);

  // ── Mobile: classic simple layout ──
  if (isMobile) return <MobileHero />;

  // ── Desktop: 3-part GSAP layout ──
  return (
    <>
      {/* ── Part 1: Hero intro (RotatingLabel + wireframe bg) ── */}
      <section
        id="hero"
        className="relative w-full flex items-center justify-center"
        style={{ minHeight: "60vh", background: "#080808" }}
      >
        <div className="absolute inset-0 z-0">
          <Canvas
            frameloop="demand"
            camera={{ position: [0, 0, 5], fov: 50 }}
            dpr={[1, 1.5]}
            onCreated={({ gl, invalidate }) => {
              gl.setClearColor("#080808");
              const handler = () => invalidate();
              window.addEventListener("mousemove", handler);
              return () => window.removeEventListener("mousemove", handler);
            }}
          >
            <Suspense fallback={null}>
              <WireframeMesh progress={scrollProgress.current} />
            </Suspense>
          </Canvas>
        </div>

        <div className="relative z-10 text-center px-6 max-w-5xl mx-auto pt-32 pb-12">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.7 }}
          >
            <HeroMainContent />
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default Hero;
