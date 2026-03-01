import React from 'react';
import { Composition } from 'remotion';
import videoData from '../../data/video_001.json';
import { TemplateLoader } from './core/TemplateLoader.jsx';

export const RemotionRoot = () => {
  const totalDuration = videoData.scenes.reduce(
    (acc, scene) => acc + scene.duration,
    0
  );

  return (
    <>
      <Composition
        id="MainComposition"
        component={TemplateLoader}
        durationInFrames={totalDuration}
        fps={videoData.fps}
        width={videoData.width}
        height={videoData.height}
        defaultProps={{
          template: videoData.template,
          scenes: videoData.scenes
        }}
      />
    </>
  );
};