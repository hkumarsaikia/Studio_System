import React from 'react';
import { Sequence } from 'remotion';
import { SceneBlock } from '../scenes/SceneBlock.jsx';

export const SceneManager = ({ scenes }) => {
  let startFrame = 0;

  return (
    <>
      {scenes.map((scene, index) => {
        const sequence = (
          <Sequence
            key={index}
            from={startFrame}
            durationInFrames={scene.duration}
          >
            <SceneBlock scene={scene} />
          </Sequence>
        );

        startFrame += scene.duration;
        return sequence;
      })}
    </>
  );
};