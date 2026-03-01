import React from 'react';
import { Sequence } from 'remotion';
import { SceneBlock } from '../scenes/SceneBlock.jsx';
import { validateScenes } from '../utils/propsValidator.js';

export const SceneManager = ({ scenes, theme }) => {
  let startFrame = 0;
  const safeScenes = validateScenes(scenes);

  return (
    <>
      {safeScenes.map((scene, index) => {
        const sequence = (
          <Sequence key={index} from={startFrame} durationInFrames={scene.duration}>
            <SceneBlock scene={scene} themeName={theme} />
          </Sequence>
        );

        startFrame += scene.duration;
        return sequence;
      })}
    </>
  );
};
