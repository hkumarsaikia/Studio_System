export const DEFAULT_SCENE_DURATION = 300;

export const normalizeSceneDuration = (scene, fallback = DEFAULT_SCENE_DURATION) => {
  const duration = Number(scene?.duration);
  return Number.isFinite(duration) && duration > 0 ? Math.round(duration) : fallback;
};

export const computeTotalFrames = (scenes) => {
  return scenes.reduce((acc, scene) => acc + normalizeSceneDuration(scene), 0);
};
