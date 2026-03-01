export const getSceneStartFrame = (scenes, sceneIndex) => {
  return scenes.slice(0, sceneIndex).reduce((acc, scene) => acc + scene.duration, 0);
};

export const mapAudioOffsets = (scenes) => {
  return scenes
    .map((scene, index) => ({
      audio: scene.audio,
      startFrame: getSceneStartFrame(scenes, index),
      duration: scene.duration,
    }))
    .filter((item) => Boolean(item.audio));
};
