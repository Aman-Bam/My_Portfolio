import { useRef, useState, useEffect, useMemo, Suspense, memo } from "react";
import { motion, useSpring, useTransform } from "framer-motion";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Shared smooth progress value for R3F
const smoothProgress = { value: 0 };

const Particles = memo(() => {
  const count = 2500;
  const points = useMemo(() => {
    const p = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      p[i * 3] = (Math.random() - 0.5) * 25;
      p[i * 3 + 1] = (Math.random() - 0.5) * 25;
      p[i * 3 + 2] = (Math.random() - 0.5) * 40;
    }
    return p;
  }, []);

  const ref = useRef<THREE.Points>(null);

  useFrame(() => {
    if (!ref.current) return;
    ref.current.rotation.z += 0.0003;
    // Ultra-smooth lerp for particle position
    ref.current.position.z = THREE.MathUtils.lerp(ref.current.position.z, smoothProgress.value * 20, 0.05);
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={points.length / 3}
          array={points}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.015}
        color="#FF6B2B"
        transparent
        opacity={0.25}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
});

const StatusBadge = memo(() => (
  <motion.div
    initial={{ opacity: 0, y: -20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.3, duration: 0.8, ease: "easeOut" }}
    className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-orange-500/10 border border-orange-500/20 mb-8 backdrop-blur-md"
  >
    <span className="relative flex h-2 w-2">
      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
      <span className="relative inline-flex rounded-full h-2 w-2 bg-orange-500"></span>
    </span>
    <span className="text-[10px] sm:text-[11px] font-mono tracking-widest text-orange-400 uppercase font-bold">
      Available for Q4 2024 Projects
    </span>
  </motion.div>
));

const HeroMainContent = memo(({ springProgress }: { springProgress: any }) => {
  // UseTransform for silky smooth DOM updates tied to the spring
  const scale = useTransform(springProgress, [0, 1], [1, 4]);
  const opacity = useTransform(springProgress, [0, 0.4, 0.7], [1, 0.8, 0]);
  const y = useTransform(springProgress, [0, 1], [0, -100]);

  return (
    <motion.div
      style={{
        scale,
        opacity,
        y,
        pointerEvents: springProgress.get() > 0.5 ? "none" : "auto"
      }}
      className="flex flex-col items-center"
    >
      <StatusBadge />

      <div className="relative mb-6">
        <h1
          className="text-5xl md:text-8xl lg:text-9xl font-black tracking-tighter text-white leading-[0.8] text-center"
          style={{ letterSpacing: "-0.06em" }}
        >
          <span className="block mb-2">I Build Full Stack &</span>
          <span className="block bg-clip-text text-red-600 pb-2">
            AI Systems
          </span>
          <span className="block mt-2">That Drive Results</span>
        </h1>
      </div>

      <motion.p
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.8, ease: "easeOut" }}
        className="text-slate-400 text-base md:text-xl max-w-2xl text-center font-medium leading-relaxed mb-12 px-4"
      >
        Transforming ideas into high-performance SaaS, Web Apps, and AI Tools
        with MERN, Next.js, and TypeScript.
      </motion.p>
      
      <div className="flex flex-wrap justify-center gap-4 mt-8">
        {["MERN", "Next.js", "AI Tools", "SaaS"].map((tech, i) => (
          <motion.div
            key={tech}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1 + i * 0.1, duration: 0.5 }}
            className="flex items-center gap-2 py-2 px-5 bg-white/5 border border-white/10 rounded-full text-[12px] font-bold text-slate-300 backdrop-blur-sm"
          >
            <span className="w-2 h-2 rounded-full bg-orange-500 shadow-[0_0_12px_rgba(249,115,22,0.6)]" />
            {tech}
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
});

const Hero = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [dpr, setDpr] = useState(1);

  useEffect(() => {
    setDpr(Math.min(window.devicePixelRatio, 2));
  }, []);
  
  // Spring progress for DOM elements
  const xSpring = useSpring(0, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const indicatorOpacity = useTransform(xSpring, [0, 0.2], [1, 0]);
  const indicatorY = useTransform(xSpring, [0, 0.2], [0, 20]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top top",
        end: "bottom top",
        scrub: 1.5,
        onUpdate: (self) => {
          smoothProgress.value = self.progress;
          xSpring.set(self.progress);
        },
      });
    });
    return () => ctx.revert();
  }, [xSpring]);

  return (
    <div className="bg-[#080808]">
      <section
        ref={containerRef}
        id="hero"
        className="relative h-[150vh] w-full"
      >
        <div className="sticky top-0 h-screen w-full overflow-hidden">
          <div className="absolute inset-0 z-0">
            <Canvas
              camera={{ position: [0, 0, 5], fov: 50 }}
              dpr={dpr}
              gl={{ 
                antialias: true,
                alpha: true,
                powerPreference: "high-performance"
              }}
            >
              <Suspense fallback={null}>
                <Particles />
              </Suspense>
            </Canvas>
          </div>

          <div className="relative z-10 h-full flex items-center justify-center px-6">
            <HeroMainContent springProgress={xSpring} />
          </div>
          
          <motion.div 
            style={{ 
              opacity: indicatorOpacity,
              y: indicatorY
            }}
            className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
          >
            <span className="text-[10px] font-mono tracking-[0.3em] text-orange-500/80 uppercase font-bold">Initiate Fly-Through</span>
            <div className="w-[1px] h-16 bg-gradient-to-b from-orange-500 to-transparent animate-pulse" />
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Hero;
