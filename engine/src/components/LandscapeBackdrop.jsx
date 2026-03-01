import React from 'react';

export const LandscapeBackdrop = () => {
  return (
    <svg viewBox="0 0 1200 900" style={{ width: '100%', height: '100%' }}>
      <defs>
        <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#67d4ff" />
          <stop offset="100%" stopColor="#ffd3a0" />
        </linearGradient>
      </defs>
      <rect width="1200" height="900" fill="url(#sky)" />
      <ellipse cx="620" cy="560" rx="130" ry="100" fill="#ff5b3d" />
      <path d="M0 700 Q240 600 420 700 T860 700 T1200 720 V900 H0 Z" fill="#0f766e" />
      <path d="M0 760 Q300 640 520 760 T1200 760 V900 H0 Z" fill="#0b4f4a" opacity="0.85" />
      <path d="M510 900 Q650 760 760 690 Q850 620 980 700 V900 Z" fill="#1ea5d8" />
    </svg>
  );
};
