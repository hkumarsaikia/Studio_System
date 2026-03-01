import React from 'react';
import { AbsoluteFill, interpolate, useCurrentFrame } from 'remotion';

export const Camera = ({ children, duration = 300, panX = 20, panY = -18, zoom = 1.04 }) => {
  const frame = useCurrentFrame();
  const progress = interpolate(frame, [0, duration], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const translateX = panX * progress;
  const translateY = panY * progress;
  const scale = 1 + (zoom - 1) * progress;

  return (
    <AbsoluteFill style={{ transform: `translate(${translateX}px, ${translateY}px) scale(${scale})` }}>
      {children}
    </AbsoluteFill>
  );
};
