import React from 'react';

export const CinematicGrain: React.FC = () => {
  return (
    <div className="fixed inset-0 pointer-events-none z-[9999] opacity-20 mix-blend-overlay">
      <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
        <filter id="noiseFilter">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.65"
            numOctaves="3"
            stitchTiles="stitch"
          />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#noiseFilter)" />
      </svg>
      <style dangerouslySetInnerHTML={{ __html: `
        svg {
          width: 100%;
          height: 100%;
          display: block;
        }
      `}} />
    </div>
  );
};
