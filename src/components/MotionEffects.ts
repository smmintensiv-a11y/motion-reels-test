import {interpolate, Easing} from 'remotion';

// Frames where the talking point lands on something worth a tiny push-in:
// "GPT" (the topic) and "нифига" (the punchline word).
const EMPHASIS_FRAMES = [88, 137];

// A slow continuous drift (100% -> ~105%) plus very short, subtle punch-ins
// on a couple of emphasis words. Kept small on purpose — the clip is 7.6s,
// so a few percent of scale reads as "alive" without feeling like a template.
export const getCameraScale = (frame: number, durationInFrames: number): number => {
  const baseScale = interpolate(frame, [0, durationInFrames], [1, 1.05], {
    easing: Easing.out(Easing.quad),
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  let punch = 0;
  for (const emphasisFrame of EMPHASIS_FRAMES) {
    const local = frame - emphasisFrame;
    if (local >= 0 && local < 10) {
      const value = interpolate(local, [0, 3, 10], [0, 0.018, 0], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
      });
      punch = Math.max(punch, value);
    }
  }

  return baseScale + punch;
};
