import React from 'react';
import { SceneManager } from '../core/SceneManager.jsx';

export const ShortsVertical = ({ scenes }) => {
  return (
    <SceneManager
      scenes={scenes}
      theme="minimal"
    />
  );
};