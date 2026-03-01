import React from 'react';
import { AbsoluteFill } from 'remotion';
import { SceneAudio } from '../components/SceneAudio.jsx';
import { themes } from '../styles/theme.js';
import { typography } from '../styles/typography.js';

export const SceneBlock = ({ scene, themeName }) => {
  const theme = themes[themeName] || themes.dark;

  return (
    <AbsoluteFill
      style={{
        backgroundColor: theme.background,
        color: theme.text,
        justifyContent: 'center',
        alignItems: 'center',
        display: 'flex',
        textAlign: 'center',
        padding: 40,
        ...typography.title,
      }}
    >
      {scene.text}
      <SceneAudio audioFile={scene.audio} />
    </AbsoluteFill>
  );
};