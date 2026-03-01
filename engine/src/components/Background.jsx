import React from 'react';
import { AbsoluteFill, interpolate, useCurrentFrame } from 'remotion';

export const Background = ({ palette, motion = 'pan' }) => {
  const frame = useCurrentFrame();

  const translateY = interpolate(frame, [0, 300], [0, -40], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const driftX = interpolate(frame, [0, 300], [-25, 25], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const glowA = interpolate(frame % 180, [0, 90, 180], [0.18, 0.33, 0.18]);
  const glowB = interpolate(frame % 220, [0, 110, 220], [0.12, 0.28, 0.12]);

  const gradient = `linear-gradient(160deg, ${palette.background} 0%, ${palette.secondary} 100%)`;

  return (
    <AbsoluteFill style={{ overflow: 'hidden' }}>
      <AbsoluteFill
        style={{
          background: gradient,
          transform: motion === 'pan' ? `translateY(${translateY}px)` : 'none',
        }}
      />

      <AbsoluteFill
        style={{
          backgroundImage:
            'radial-gradient(circle at 20% 25%, rgba(56,189,248,0.6) 0%, rgba(56,189,248,0.0) 38%), radial-gradient(circle at 78% 70%, rgba(244,114,182,0.45) 0%, rgba(244,114,182,0.0) 34%)',
          opacity: glowA,
          transform: `translateX(${driftX}px)`,
        }}
      />

      <AbsoluteFill
        style={{
          backgroundImage:
            'linear-gradient(rgba(148,163,184,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(148,163,184,0.08) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
          opacity: glowB,
        }}
      />
    </AbsoluteFill>
  );
};
