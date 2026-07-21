import React from 'react';
import {Composition} from 'remotion';
import {SearchBarReel} from './SearchBarReel';
import {ReelWithHook, ReelWithHookProps} from './ReelWithHook';
import {ReelWithSubtitles, ReelWithSubtitlesProps} from './ReelWithSubtitles';

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

// Subtitles start exactly when the hook disappears (frame 180 @ 6s) and run back to
// back. Because the source clip is only 7.47s (224 frames) but the transcript needs
// ~7.4s to read comfortably, playback freezes on the video's last frame (Freeze in
// ReelWithSubtitles.tsx) for the remainder so the captions never race ahead of a
// static frame. durationInFrames = 180 (hook) + 222 (subtitles) + 15 (hold) + 30 (fade).
const REEL_WITH_SUBTITLES_DEFAULT_PROPS: ReelWithSubtitlesProps = {
	videoFileName: 'source.mov',
	hookText: 'РЕКТИФИКАЦИЯ —\nЭТО НЕ УГАДЫВАНИЕ\nВРЕМЕНИ',
	hookDurationInSeconds: 6,
	videoNaturalDurationInFrames: 224,
	subtitles: [
		{text: 'Вот что значит материнская любовь.', durationInFrames: 60},
		{text: 'Сегодня с утра мне позвонила дочь и сказала:', durationInFrames: 84},
		{text: '«Мама, я так соскучилась по тебе!»', durationInFrames: 78},
	],
	postSubtitleHoldFrames: 15,
	fadeOutFrames: 30,
	durationInFrames: 447,
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
			<Composition
				id="ReelWithSubtitles"
				component={ReelWithSubtitles}
				durationInFrames={REEL_WITH_SUBTITLES_DEFAULT_PROPS.durationInFrames}
				fps={FPS}
				width={1080}
				height={1920}
				defaultProps={REEL_WITH_SUBTITLES_DEFAULT_PROPS}
				calculateMetadata={async ({props}: {props: ReelWithSubtitlesProps}) => ({
					durationInFrames: props.durationInFrames,
				})}
			/>
		</>
	);
};
