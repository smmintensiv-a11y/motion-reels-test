import React from 'react';
import {Composition} from 'remotion';
import {ReelComposition} from './ReelComposition';
import {VIDEO_FPS, VIDEO_WIDTH, VIDEO_HEIGHT, VIDEO_DURATION_FRAMES} from './constants';

export const RemotionRoot: React.FC = () => {
  return (
    <Composition
      id="ReelComposition"
      component={ReelComposition}
      durationInFrames={VIDEO_DURATION_FRAMES}
      fps={VIDEO_FPS}
      width={VIDEO_WIDTH}
      height={VIDEO_HEIGHT}
    />
  );
};
