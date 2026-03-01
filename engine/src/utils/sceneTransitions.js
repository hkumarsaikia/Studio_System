import { interpolate } from 'remotion';

export const fadeInOut = (frame, duration, edge = 12) => {
  return interpolate(frame, [0, edge, duration - edge, duration], [0, 1, 1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
};

export const slideY = (frame, duration, amount = 30, edge = 16) => {
  return interpolate(frame, [0, edge, duration - edge, duration], [amount, 0, 0, -amount], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
};
