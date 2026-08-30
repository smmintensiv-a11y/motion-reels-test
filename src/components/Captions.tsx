import React from 'react';
import {AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig} from 'remotion';
import {captionGroups} from '../captions';
import {CaptionWord} from './CaptionWord';

// Every caption group is a short, meaningful chunk (a real pause in the
// speech, not an arbitrary line break). Only one group is ever on screen —
// it pops in the instant its first word starts, and stays until the next
// group takes over, which reads as a fast, deliberate beat instead of a
// scrolling line.
export const Captions: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps, durationInFrames} = useVideoConfig();

  let activeIndex = -1;
  for (let i = 0; i < captionGroups.length; i++) {
    const start = captionGroups[i].words[0].start;
    const isLast = i === captionGroups.length - 1;
    const end = isLast
      ? Math.min(captionGroups[i].words[captionGroups[i].words.length - 1].end + 24, durationInFrames)
      : captionGroups[i + 1].words[0].start;
    if (frame >= start && frame < end) {
      activeIndex = i;
      break;
    }
  }

  if (activeIndex === -1) {
    return null;
  }

  const group = captionGroups[activeIndex];
  const groupStart = group.words[0].start;
  const localFrame = frame - groupStart;

  const enter = spring({
    frame: localFrame,
    fps,
    config: {damping: 16, mass: 0.5, stiffness: 190},
    durationInFrames: 10,
  });

  const isLastGroup = activeIndex === captionGroups.length - 1;
  const lastWordEnd = group.words[group.words.length - 1].end;
  const tailFadeStart = lastWordEnd + 14;
  const tailOpacity = isLastGroup
    ? interpolate(frame, [tailFadeStart, tailFadeStart + 8], [1, 0], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
      })
    : 1;

  const translateY = interpolate(enter, [0, 1], [18, 0]);
  const scale = interpolate(enter, [0, 1], [0.9, 1]);

  return (
    <AbsoluteFill style={{justifyContent: 'flex-start', alignItems: 'center', paddingTop: 460}}>
      <div
        style={{
          opacity: enter * tailOpacity,
          transform: `translateY(${translateY}px) scale(${scale})`,
          maxWidth: '86%',
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          alignItems: 'baseline',
          columnGap: 26,
          rowGap: 4,
        }}
      >
        {group.words.map((word, idx) => (
          <CaptionWord key={`${activeIndex}-${idx}`} word={word} frame={frame} />
        ))}
      </div>
    </AbsoluteFill>
  );
};
