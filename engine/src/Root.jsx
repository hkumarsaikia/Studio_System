import React, { useEffect, useMemo, useState } from 'react';
import { Composition, cancelRender, continueRender, delayRender } from 'remotion';
import { TemplateLoader } from './core/TemplateLoader.jsx';
import { getVideoData } from './generated/videoManifest.js';
import { parseVideoData } from './utils/dataParser.js';
import { computeTotalFrames } from './utils/sceneTiming.js';

const getVideoIdFromEnv = () => {
  const envId = process.env.REMOTION_VIDEO_ID;
  return envId && typeof envId === 'string' ? envId : 'video_001';
};

export const RemotionRoot = () => {
  const [videoData, setVideoData] = useState(null);
  const [handle] = useState(() => delayRender('Loading selected video data'));
  const videoId = useMemo(() => getVideoIdFromEnv(), []);

  useEffect(() => {
    let active = true;

    getVideoData(videoId)
      .then((data) => {
        if (!active) {
          return;
        }
        setVideoData(parseVideoData(data));
        continueRender(handle);
      })
      .catch((error) => {
        cancelRender(error);
      });

    return () => {
      active = false;
    };
  }, [handle, videoId]);

  if (!videoData) {
    return null;
  }

  const totalDuration = computeTotalFrames(videoData.scenes);

  return (
    <Composition
      id="MainComposition"
      component={TemplateLoader}
      durationInFrames={totalDuration}
      fps={videoData.fps}
      width={videoData.width}
      height={videoData.height}
      defaultProps={{
        template: videoData.template,
        scenes: videoData.scenes,
      }}
    />
  );
};
