import React from 'react';
import {AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig} from 'remotion';
import {ACCENT_COLOR} from '../constants';

const popStyle = (enter: number, exitFade: number, scaleFrom: number) => ({
  opacity: enter * exitFade,
  transform: `scale(${interpolate(enter, [0, 1], [scaleFrom, 1])})`,
});

const computeEnterExit = (frame: number, startFrame: number, endFrame: number, fps: number) => {
  const local = Math.max(frame - startFrame, 0);
  const enter = spring({frame: local, fps, config: {damping: 12, stiffness: 260, mass: 0.5}, durationInFrames: 9});
  const exitLocal = frame - (endFrame - 6);
  const exitFade =
    exitLocal > 0 ? interpolate(exitLocal, [0, 6], [1, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'}) : 1;
  return {enter, exitFade};
};

// Small circular "1" / "2" markers on the "Первый," / "Второй," beats — a
// classic listicle cue that reinforces the structure the voiceover is
// already giving, without adding a random picture.
const NumberBadge: React.FC<{label: string; startFrame: number; endFrame: number; frame: number; fps: number}> = ({
  label,
  startFrame,
  endFrame,
  frame,
  fps,
}) => {
  if (frame < startFrame - 2 || frame > endFrame) return null;
  const {enter, exitFade} = computeEnterExit(frame, startFrame, endFrame, fps);

  return (
    <div
      style={{
        ...popStyle(enter, exitFade, 0.5),
        width: 118,
        height: 118,
        borderRadius: '50%',
        background: 'rgba(12, 12, 12, 0.55)',
        border: `3px solid ${ACCENT_COLOR}`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: '0 8px 26px rgba(0, 0, 0, 0.4)',
      }}
    >
      <span style={{fontSize: 54, fontWeight: 900, color: ACCENT_COLOR, fontFamily: '"Arial Black", Arial, sans-serif'}}>
        {label}
      </span>
    </div>
  );
};

// A small "GPT" chip timed to the word itself — the one moment in the clip
// that names the actual subject, so it earns a visual beat.
const GptChip: React.FC<{startFrame: number; endFrame: number; frame: number; fps: number}> = ({
  startFrame,
  endFrame,
  frame,
  fps,
}) => {
  if (frame < startFrame - 2 || frame > endFrame) return null;
  const {enter, exitFade} = computeEnterExit(frame, startFrame, endFrame, fps);

  return (
    <div
      style={{
        ...popStyle(enter, exitFade, 0.6),
        display: 'flex',
        alignItems: 'center',
        gap: 10,
        background: 'rgba(12, 12, 12, 0.6)',
        border: `2.5px solid ${ACCENT_COLOR}`,
        borderRadius: 999,
        padding: '14px 30px',
        boxShadow: '0 8px 26px rgba(0, 0, 0, 0.4)',
      }}
    >
      <span style={{fontSize: 32, color: ACCENT_COLOR}}>✦</span>
      <span
        style={{
          fontSize: 38,
          fontWeight: 900,
          color: '#FAFAFA',
          letterSpacing: 1,
          fontFamily: '"Arial Black", Arial, sans-serif',
        }}
      >
        GPT
      </span>
    </div>
  );
};

export const VisualOverlay: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();

  return (
    <AbsoluteFill style={{alignItems: 'center', justifyContent: 'flex-start', paddingTop: 280}}>
      <GptChip startFrame={84} endFrame={110} frame={frame} fps={fps} />
      <NumberBadge label="1" startFrame={112} endFrame={130} frame={frame} fps={fps} />
      <NumberBadge label="2" startFrame={160} endFrame={178} frame={frame} fps={fps} />
    </AbsoluteFill>
  );
};
