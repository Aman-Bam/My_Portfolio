# Design Spec: Spatial Tunnel Hero Experience
Date: 2026-04-30
Topic: Elite Hero Section Overhaul

## 1. Vision
Transform the Hero section from a static landing page into a cinematic "Spatial Tunnel." The user doesn't just scroll down the page; they travel *through* the technical architecture of the portfolio.

## 2. Core Experience
- **Initial State:** A clean, minimalist dark screen with a central 3D wireframe and bold, high-contrast typography.
- **The Transition:** As the user scrolls, the camera accelerates forward.
- **The "Wow" Moment:** The user passes through the vertices of the 3D mesh, which expands to fill the entire viewport, transitioning the background into a technical grid for the next section.

## 3. Technical Implementation

### 3.1 3D Engine (React Three Fiber)
- **Camera:** Transition from `PerspectiveCamera` at `[0, 0, 5]` to `[0, 0, -10]`.
- **Geometry:** An `IcosahedronGeometry` that scales from `1` to `50` based on scroll progress.
- **Material:** Wireframe with emissive orange (`#FF6B2B`), utilizing `transparent: true` and dynamic `opacity` to create a "ghostly" technical feel.

### 3.2 Motion Orchestration (GSAP & Framer Motion)
- **ScrollTrigger:** A single master timeline that binds `window.scrollY` to:
    - Camera Z-position.
    - Mesh Scale.
    - Text Opacity and Scale.
- **Typography:** Use `framer-motion` for the initial load and GSAP for the scroll-synced "zoom-out" effect.

### 3.3 Layout & Typography
- **Hierarchy:** Massive, tight-tracking (letter-spacing: -0.05em) headings.
- **Colors:** Background `#080808`, Primary Accent `#FF6B2B`, Text White/Slate-400.

## 4. Success Criteria
- 60fps performance during the tunnel transition.
- Seamless transition from Hero $\rightarrow$ Next Section.
- "Technical Awe" factor upon first scroll.
