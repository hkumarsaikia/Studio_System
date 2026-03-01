import React from 'react';
import { AbsoluteFill } from 'remotion';
import { SceneAudio } from '../components/SceneAudio.jsx';

export const SceneBlock = ({ scene }) => {
  return (
    <AbsoluteFill
      style={{
        backgroundColor: 'black',
        color: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        display: 'flex',
        fontSize: 60,
        textAlign: 'center',
        padding: 40
      }}
    >
      {scene.text}
      <SceneAudio audioFile={scene.audio} />
    </AbsoluteFill>
  );
};