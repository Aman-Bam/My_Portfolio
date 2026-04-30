# Design Spec: 0.1% Technical Capability Matrix

## Overview
Transformation of the portfolio skills section from a basic tag cloud to a "Technical Capability Matrix" using a Cyber-Industrial Bento Grid layout. The goal is to signal extreme technical competence through a combination of visual polish and detailed proficiency data.

## 1. Visual Language & Aesthetic
- **Mood:** Cyber-Industrial / High-End IDE.
- **Layout:** Bento Grid (non-uniform cells) with a responsive grid system.
- **Styling:**
  - **Glassmorphism:** Semi-transparent backgrounds with `backdrop-blur`.
  - **Borders:** Thin, high-contrast borders with neon mint/red accents.
  - **Glows:** Subtle `box-shadow` glows on 'Core' skill tiles that intensify on hover.
  - **Typography:** Combination of `font-mono` for technical labels and `font-display` for high-impact headings.

## 2. Information Architecture
Instead of a flat list, skills are categorized by "Signal Strength":

### A. Core Mastery (Large Bento Tiles)
- **What:** Top 3-5 skills (e.g., React 19, TypeScript).
- **Content:** 
  - Skill Name
  - "Power Statement" (e.g., "Mastery of Concurrent Rendering & Server Components")
  - Proficiency Badge (e.g., "Expert")
  - Link to primary project showcasing this skill.

### B. Proficient (Medium Bento Tiles)
- **What:** Skills used daily but not the absolute primary focus.
- **Content:**
  - Skill Name
  - Short description or specific sub-tool mastery.
  - Proficiency Badge (e.g., "Advanced").

### C. Exploring/Tooling (Small Tiles/Tags)
- **What:** Supporting tools and current learning paths.
- **Content:**
  - Skill Name only.
  - Subtle pulse animation if marked as "Learning".

## 3. Interaction Design
- **Hover Effects:**
  - Tiles shift slightly on the Y-axis (`-translate-y-1`).
  - Border glow transitions from `mint/40` to `mint/100`.
  - Power statements slide in or fade in.
- **Connectivity:** (Optional/Phase 2) Subtle SVG lines connecting Core skills to related Proficient skills.
- **Entry Animation:** Staggered "pop-in" using Framer Motion with a spring transition.

## 4. Technical Implementation Plan
- **Data Structure:** Upgrade `groups` array to a more complex object containing `proficiency`, `statement`, and `projectLink`.
- **Components:**
  - `BentoGrid`: Container using CSS Grid `grid-template-areas` or `span` for varying sizes.
  - `CoreSkillTile`: Large, detailed component.
  - `StandardSkillTile`: Medium, streamlined component.
  - `MicroSkillTile`: Small, tag-like component.
- **Performance:** Use `memo` for tiles to prevent unnecessary re-renders during hover animations.

## 5. Success Criteria
- The section feels like a "dashboard of capabilities" rather than a "list of keywords."
- A visitor immediately identifies the developer's strongest areas.
- The visual polish matches top-tier engineering portfolios (Awwwards style).