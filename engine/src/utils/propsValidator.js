import { normalizeSceneDuration } from './sceneTiming.js';

export const validateScene = (scene, index) => {
  if (!scene || typeof scene !== 'object') {
    throw new Error(`Scene at index ${index} is invalid.`);
  }

  if (!scene.text || typeof scene.text !== 'string') {
    throw new Error(`Scene at index ${index} must include a text string.`);
  }

  return {
    ...scene,
    duration: normalizeSceneDuration(scene),
  };
};

export const validateScenes = (scenes = []) => {
  if (!Array.isArray(scenes) || scenes.length === 0) {
    throw new Error('Video must include at least one scene.');
  }

  return scenes.map((scene, index) => validateScene(scene, index));
};
