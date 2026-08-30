import React from 'react';
import {AbsoluteFill} from 'remotion';
import {VideoLayer} from './components/VideoLayer';
import {Captions} from './components/Captions';
import {VisualOverlay} from './components/VisualOverlay';

export const ReelComposition: React.FC = () => {
  return (
    <AbsoluteFill style={{backgroundColor: '#000'}}>
      <VideoLayer />
      {/* Soft top-down gradient so captions stay readable over the bright ceiling/wall */}
      <AbsoluteFill
        style={{
          background: 'linear-gradient(to bottom, rgba(0,0,0,0.35) 0%, rgba(0,0,0,0) 34%, rgba(0,0,0,0) 100%)',
        }}
      />
      <VisualOverlay />
      <Captions />
    </AbsoluteFill>
  );
};
