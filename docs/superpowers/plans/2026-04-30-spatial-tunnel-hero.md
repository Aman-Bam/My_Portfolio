# Spatial Tunnel Hero Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Transform the Hero section into a cinematic "Spatial Tunnel" where the user flies through a 3D mesh as they scroll.

**Architecture:** Use a master GSAP ScrollTrigger timeline to synchronize the React Three Fiber camera position and mesh scale with the window scroll progress, while simultaneously fading out the Hero typography.

**Tech Stack:** React, Three.js (@react-three/fiber), GSAP (ScrollTrigger), Framer Motion, Tailwind CSS.

---

## File Mapping
- Modify: `src/components/portfolio/Hero.tsx` (Core logic for camera, mesh, and scroll orchestration)

## Implementation Tasks

### Task 1: Implement Global Scroll Progress State
The current `scrollProgress` is a local ref in `Hero`. We need a more robust way to track progress and ensure the `WireframeMesh` and `HeroMainContent` are perfectly synced.

**Files:**
- Modify: `src/components/portfolio/Hero.tsx`

- [ ] **Step 1: Refactor scroll tracking to use a state-driven or shared ref approach that ensures the `WireframeMesh` receives updates every frame.**
- [ ] **Step 2: Implement a `useScroll` hook or internal logic to calculate progress as `window.scrollY / (window.innerHeight * 0.8)`.**
- [ ] **Step 3: Commit**
```bash
git add src/components/portfolio/Hero.tsx
git commit -m "refactor: implement precision scroll tracking for spatial tunnel"
```

### Task 2: Engineer the "Fly-Through" Camera Motion
The core of the "Tunnel" effect is the camera moving from the front of the mesh to behind it.

**Files:**
- Modify: `src/components/portfolio/Hero.tsx`

- [ ] **Step 1: Update `WireframeMesh` to accept `cameraRef` and `progress` props.**
- [ ] **Step 2: In `useFrame`, animate the camera position:**
```javascript
// Target camera movement
const targetZ = 5 - (progress * 15); // Moves from 5 to -10
camera.position.z += (targetZ - camera.position.z) * 0.1;
```
- [ ] **Step 3: Implement a "FOV Shift" to increase the sense of speed as the user scrolls.**
- [ ] **Step 4: Commit**
```bash
git add src/components/portfolio/Hero.tsx
git commit -m "feat: implement cinematic camera fly-through logic"
```

### Task 3: Mesh Scaling and "Envelopment" Logic
The mesh must scale up to a massive size so the user feels they are entering it.

**Files:**
- Modify: `src/components/portfolio/Hero.tsx`

- [ ] **Step 1: Modify `WireframeMesh` to scale the `groupRef` exponentially based on progress.**
```javascript
const scale = 1 + Math.pow(progress, 2) * 40; 
groupRef.current.scale.set(scale, scale, scale);
```
- [ ] **Step 2: Add dynamic opacity and emissive intensity to the material so the mesh "glows" more as the user gets closer.**
- [ ] **Step 3: Commit**
```bash
git add src/components/portfolio/Hero.tsx
git commit -m "feat: implement mesh scaling and envelopment effect"
```

### Task 4: Typographic Depth-Fade Transition
The text must not just vanish; it should feel like the camera is passing through it.

**Files:**
- Modify: `src/components/portfolio/Hero.tsx`

- [ ] **Step 1: Wrap `HeroMainContent` in a `motion.div` that tracks `scrollProgress`.**
- [ ] **Step 2: Implement scaling and opacity shifts:**
```javascript
// In the render loop
<motion.div 
  style={{ 
    scale: 1 + progress * 2, 
    opacity: 1 - progress * 1.5,
    filter: `blur(${progress * 10}px)` 
  }}
>
  <HeroMainContent />
</motion.div>
```
- [ ] **Step 3: Commit**
```bash
git add src/components/portfolio/Hero.tsx
git commit -m "feat: implement typographic depth-fade transition"
```

### Task 5: Performance Polishing and Final Integration
Ensure the experience is buttery smooth at 60fps.

**Files:**
- Modify: `src/components/portfolio/Hero.tsx`

- [ ] **Step 1: Optimize `WireframeMesh` geometry using `BufferGeometry` if necessary.**
- [ ] **Step 2: Add `will-change: transform` to all animating HTML elements.**
- [ ] **Step 3: Final test of the transition from Hero $\rightarrow$ Next Section.**
- [ ] **Step 4: Commit**
```bash
git add src/components/portfolio/Hero.tsx
git commit -m "perf: optimize spatial tunnel performance for 60fps"
```
