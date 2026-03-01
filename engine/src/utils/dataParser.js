import { validateScenes } from './propsValidator.js';

export const parseVideoData = (videoData) => {
  const scenes = validateScenes(videoData?.scenes ?? []);

  return {
    ...videoData,
    fps: Number(videoData?.fps) || 30,
    width: Number(videoData?.width) || 1080,
    height: Number(videoData?.height) || 1920,
    template: videoData?.template || 'shorts',
    scenes,
  };
};
