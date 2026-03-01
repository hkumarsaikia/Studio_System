import React from 'react';
import { SceneManager } from '../core/SceneManager.jsx';

export const ExplainerCinematic = ({ scenes }) => {
  return (
    <SceneManager
      scenes={scenes}
      theme="slate"
    />
  );
};