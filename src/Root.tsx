import React from 'react';
import {Composition} from 'remotion';
import {SearchBarReel} from './SearchBarReel';
import {ReelWithHook, ReelWithHookProps} from './ReelWithHook';

export const FPS = 30;
export const DURATION_IN_SECONDS = 8;
export const DURATION_IN_FRAMES = FPS * DURATION_IN_SECONDS;

// Reference render (public/source.mov) is 7.466667s @ 30fps = 224 frames exactly.
// npm run render:hook overrides videoFileName / hookText / durationInFrames per project
// via --props, so this is only the fallback used by Remotion Studio / plain renders.
const REEL_WITH_HOOK_DEFAULT_PROPS: ReelWithHookProps = {
	videoFileName: 'source.mov',
	hookText: 'РЕКТИФИКАЦИЯ —\nЭТО НЕ УГАДЫВАНИЕ\nВРЕМЕНИ',
	hookDurationInSeconds: 6,
	durationInFrames: 224,
};

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
				durationInFrames={REEL_WITH_HOOK_DEFAULT_PROPS.durationInFrames}
				fps={FPS}
				width={1080}
				height={1920}
				defaultProps={REEL_WITH_HOOK_DEFAULT_PROPS}
				calculateMetadata={async ({props}: {props: ReelWithHookProps}) => ({
					durationInFrames: props.durationInFrames,
				})}
			/>
		</>
	);
};
