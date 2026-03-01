import React from 'react';
import { Html5Audio, staticFile } from 'remotion';

export const SceneAudio = ({ audioFile }) => {
  return <Html5Audio src={staticFile(`audio/${audioFile}`)} />;
};