import React from 'react';
import {Composition} from 'remotion';
import {SearchBarReel} from './SearchBarReel';
import {ReelWithHook} from './ReelWithHook';

export const FPS = 30;
export const DURATION_IN_SECONDS = 8;
export const DURATION_IN_FRAMES = FPS * DURATION_IN_SECONDS;

// Source video (public/source.mov) is 7.466667s @ 30fps = 224 frames exactly
export const REEL_WITH_HOOK_DURATION_FRAMES = 224;

export const Root: React.FC = () => {
	return (
		<>
			<Composition
				id="SearchBarReel"
				component={SearchBarReel}
				durationInFrames={DURATION_IN_FRAMES}
				fps={FPS}
				width={1080}
				height={1920}
			/>
			<Composition
				id="ReelWithHook"
				component={ReelWithHook}
				durationInFrames={REEL_WITH_HOOK_DURATION_FRAMES}
				fps={FPS}
				width={1080}
				height={1920}
			/>
		</>
	);
};
