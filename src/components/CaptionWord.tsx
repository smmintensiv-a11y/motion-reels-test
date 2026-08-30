import React from 'react';
import {interpolate} from 'remotion';
import {ACCENT_COLOR} from '../constants';
import type {CaptionWordData} from '../captions';

const WHITE = '#FAFAFA';

const hexToRgb = (hex: string): [number, number, number] => {
  const v = hex.replace('#', '');
  return [parseInt(v.slice(0, 2), 16), parseInt(v.slice(2, 4), 16), parseInt(v.slice(4, 6), 16)];
};

const mixColor = (a: string, b: string, t: number): string => {
  const [ar, ag, ab] = hexToRgb(a);
  const [br, bg, bb] = hexToRgb(b);
  const r = Math.round(ar + (br - ar) * t);
  const g = Math.round(ag + (bg - ag) * t);
  const bl = Math.round(ab + (bb - ab) * t);
  return `rgb(${r}, ${g}, ${bl})`;
};

export const CaptionWord: React.FC<{
  word: CaptionWordData;
  frame: number;
}> = ({word, frame}) => {
  const COLOR_RAMP = 3; // frames to blend color in/out — keeps the highlight feeling fast but not a hard cut
  const colorIn = interpolate(frame, [word.start, word.start + COLOR_RAMP], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const colorOut = interpolate(frame, [word.end, word.end + COLOR_RAMP], [1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const activeAmount = frame < word.end ? colorIn : colorOut;
  const color = mixColor(WHITE, ACCENT_COLOR, activeAmount);

  let scale = 1;
  if (frame >= word.start && frame < word.end) {
    const t = frame - word.start;
    scale = interpolate(t, [0, 3, Math.max(word.end - word.start, 4)], [1, 1.1, 1.03], {
      extrapolateRight: 'clamp',
    });
  } else if (frame >= word.end && frame < word.end + 4) {
    const t = frame - word.end;
    scale = interpolate(t, [0, 4], [1.03, 1], {extrapolateRight: 'clamp'});
  }

  const isActive = activeAmount > 0.5;

  return (
    <span
      style={{
        display: 'inline-block',
        color,
        fontSize: 68,
        fontWeight: 900,
        fontFamily: '"Arial Black", Arial, sans-serif',
        letterSpacing: -0.5,
        lineHeight: 1.15,
        transform: `scale(${scale})`,
        WebkitTextStroke: '2px rgba(0, 0, 0, 0.55)',
        textShadow: isActive
          ? '0 3px 14px rgba(0, 0, 0, 0.6), 0 0 26px rgba(215, 255, 62, 0.45)'
          : '0 3px 14px rgba(0, 0, 0, 0.6)',
      }}
    >
      {word.text}
    </span>
  );
};
