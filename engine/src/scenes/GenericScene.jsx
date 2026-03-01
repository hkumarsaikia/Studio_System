import React from 'react';
import { AbsoluteFill } from 'remotion';
import { Background } from '../components/Background.jsx';
import { CinematicText } from '../overlays/CinematicText.jsx';
import { SceneFactory } from './SceneFactory.jsx';
import { Camera } from '../core/Camera.jsx';
import { MotionLayer } from '../core/MotionLayer.jsx';

const defaultPalette = {
  background: '#0f172a',
  secondary: '#1e293b',
};

export const GenericScene = ({ scene }) => {
  const palette = scene.palette || defaultPalette;

  return (
    <AbsoluteFill style={{ color: '#f8fafc' }}>
      <Background palette={palette} motion={scene.motion || 'pan'} />
      <Camera duration={scene.duration || 300} panX={scene.panX ?? 12} panY={scene.panY ?? -10}>
        <MotionLayer duration={scene.duration || 300}>
          <SceneFactory scene={scene} />
        </MotionLayer>
      </Camera>
      <CinematicText title={scene.text} subtitle={scene.subtext} accentColor={scene.accentColor} category={scene.category || "SYSTEMS EXPLAINER"} />
    </AbsoluteFill>
  );
};
