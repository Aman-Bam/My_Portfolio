# Skills Matrix Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Transform the skills section into a Cyber-Industrial Bento Grid that communicates mastery, proficiency, and proof of work.

**Architecture:** A responsive CSS Grid layout using non-uniform cell spanning. Three specialized tile components (`CoreSkillTile`, `StandardSkillTile`, `MicroSkillTile`) driven by a refined skill data object.

**Tech Stack:** React, Tailwind CSS, Framer Motion.

---

### Task 1: Data Structure Evolution

**Files:**
- Modify: `src/components/portfolio/Skills.tsx`

- [ ] **Step 1: Define the new `Skill` and `SkillGroup` types**
Replace the existing `groups` type definition with a structured system.

```typescript
type Proficiency = 'Expert' | 'Advanced' | 'Proficient' | 'Learning';

interface Skill {
  name: string;
  proficiency: Proficiency;
  statement?: string; // Power statement for Core skills
  projectLink?: string; // Link to a specific project
}

interface SkillGroup {
  label: string;
  color: string;
  skills: Skill[];
}
```

- [ ] **Step 2: Update the `groups` data to use the new structure**
Convert the existing string arrays into `Skill` objects.
- Set React, TypeScript, Node.js as 'Expert' with power statements.
- Set others as 'Advanced' or 'Proficient'.
- Map relevant projects to `projectLink`.

- [ ] **Step 3: Commit**
```bash
git add src/components/portfolio/Skills.tsx
git commit -m "refactor: upgrade skills data structure for capability matrix"
```

### Task 2: Base Bento Layout & Containers

**Files:**
- Modify: `src/components/portfolio/Skills.tsx`

- [ ] **Step 1: Implement the Bento Grid container**
Replace the `grid md:grid-cols-2 lg:grid-cols-3` with a more flexible grid.
Use `grid-cols-4` (or similar) and utilize `col-span` and `row-span` for varying tile sizes.

- [ ] **Step 2: Implement the Glassmorphism base style**
Create a shared utility class or component wrapper for the "Industrial" look:
`bg-surface/80 backdrop-blur-md border border-border rounded-sm`

- [ ] **Step 3: Commit**
```bash
git add src/components/portfolio/Skills.tsx
git commit -m "feat: implement bento grid layout and glassmorphism base"
```

### Task 3: Core Skill Tiles (The High-Signal Components)

**Files:**
- Modify: `src/components/portfolio/Skills.tsx`

- [ ] **Step 1: Create `CoreSkillTile` component**
This tile should be large (e.g., `col-span-2 row-span-2`).
Include:
- Large Skill Name.
- Proficiency Badge (e.g., "Expert" in mint text).
- The "Power Statement" (fading in on hover).
- A subtle "Proof of Work" link.

- [ ] **Step 2: Add Neon Glow & Hover Animations**
Implement the `whileHover` effect:
- Translate-Y shift.
- Transition `border-color` to `mint-400` and add a `box-shadow: 0 0 20px rgba(0,232,122,0.2)`.

- [ ] **Step 3: Commit**
```bash
git add src/components/portfolio/Skills.tsx
git commit -m "feat: add high-impact CoreSkillTile with neon accents"
```

### Task 4: Standard & Micro Skill Tiles

**Files:**
- Modify: `src/components/portfolio/Skills.tsx`

- [ ] **Step 1: Create `StandardSkillTile`**
Medium size. Focuses on the skill name and proficiency.
Visuals: Simpler glassmorphism, no power statement.

- [ ] **Step 2: Create `MicroSkillTile`**
Small tag-like tiles for tools/exploring skills.
Implement the "Pulse" animation for skills marked as 'Learning'.

- [ ] **Step 3: Integrate all tiles into the main loop**
Update the `Skills` component to map through the groups and assign tiles based on the `proficiency` level.

- [ ] **Step 4: Commit**
```bash
git add src/components/portfolio/Skills.tsx
git commit -m "feat: complete bento grid with standard and micro skill tiles"
```

### Task 5: Final Polish & Responsiveness

**Files:**
- Modify: `src/components/portfolio/Skills.tsx`

- [ ] **Step 1: Refine Grid Spans for Mobile/Tablet**
Ensure the bento layout collapses gracefully to a single column on mobile while maintaining visual hierarchy.

- [ ] **Step 2: Add Staggered Entry Animations**
Use Framer Motion's `variants` to make the grid tiles "pop in" sequentially.

- [ ] **Step 3: Final Visual Audit**
Check contrast ratios, border thicknesses, and glow intensities against the "Cyber-Industrial" spec.

- [ ] **Step 4: Commit**
```bash
git add src/components/portfolio/Skills.tsx
git commit -m "style: final polish of skills matrix animations and responsiveness"
```