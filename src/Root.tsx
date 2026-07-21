import React from 'react';
import {Composition} from 'remotion';
import {SearchBarReel} from './SearchBarReel';

export const FPS = 30;
export const DURATION_IN_SECONDS = 8;
export const DURATION_IN_FRAMES = FPS * DURATION_IN_SECONDS;

export const Root: React.FC = () => {
	return (
		<Composition
			id="SearchBarReel"
			component={SearchBarReel}
			durationInFrames={DURATION_IN_FRAMES}
			fps={FPS}
			width={1080}
			height={1920}
		/>
	);
};
