import React from 'react';
import { AbsoluteFill, useCurrentFrame } from 'remotion';
import { SceneAudio } from '../components/SceneAudio.jsx';
import { GenericScene } from './GenericScene.jsx';
import { themes } from '../styles/theme.js';
import { fadeInOut, slideY } from '../utils/sceneTransitions.js';

export const SceneBlock = ({ scene, themeName }) => {
  const frame = useCurrentFrame();
  const theme = themes[themeName] || themes.dark;
  const duration = scene.duration || 300;
  const opacity = fadeInOut(frame, duration);
  const y = slideY(frame, duration, 22);

  const enrichedScene = {
    ...scene,
    palette: scene.palette || {
      background: theme.background,
      secondary: theme.accent,
    },
    accentColor: scene.accentColor || theme.text,
  };

  return (
    <AbsoluteFill style={{ opacity, transform: `translateY(${y}px)` }}>
      <GenericScene scene={enrichedScene} />
      {scene.audio ? <SceneAudio audioFile={scene.audio} /> : null}
    </AbsoluteFill>
  );
};
