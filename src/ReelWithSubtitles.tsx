import React from 'react';
import {
	AbsoluteFill,
	Easing,
	Freeze,
	Sequence,
	interpolate,
	OffthreadVideo,
	staticFile,
	useCurrentFrame,
} from 'remotion';
import {HOOK_TEMPLATE, SUBTITLE_TEMPLATE} from './hookTemplate.config';
import {HookCard} from './HookCard';
import {SubtitleCard} from './SubtitleCard';

export interface SubtitleChunk {
	text: string;
	/** How long this chunk stays on screen, in frames. */
	durationInFrames: number;
}

export interface ReelWithSubtitlesProps {
	/** Path to the source video, relative to the public/ folder. */
	videoFileName: string;
	/** Same hook headline/style as ReelWithHook. Auto-uppercased, "\n" forces a line break. */
	hookText: string;
	/** How long the hook stays on screen, in seconds. Subtitles never start before this. */
	hookDurationInSeconds?: number;
	/** The source video's own real length, in frames. Playback freezes on its last frame after this point. */
	videoNaturalDurationInFrames: number;
	/** Subtitle chunks, shown one after another starting right when the hook disappears. */
	subtitles: SubtitleChunk[];
	/** How long to hold the frozen frame after the last subtitle fades out, before the final fade to black. */
	postSubtitleHoldFrames?: number;
	/** Duration of the final fade to black, in frames. */
	fadeOutFrames?: number;
	/**
	 * Total length of the composition, in frames. Must equal
	 * hookDurationInSeconds*fps + sum(subtitles durations) + postSubtitleHoldFrames + fadeOutFrames.
	 */
	durationInFrames: number;
}

const easeOut = Easing.out(Easing.cubic);

const SubtitleChunkRenderer: React.FC<{text: string; durationInFrames: number}> = ({
	text,
	durationInFrames,
}) => {
	const frame = useCurrentFrame();
	const {chunkFadeFrames} = SUBTITLE_TEMPLATE;

	const opacity = interpolate(
		frame,
		[0, chunkFadeFrames, durationInFrames - chunkFadeFrames, durationInFrames],
		[0, 1, 1, 0],
		{extrapolateLeft: 'clamp', extrapolateRight: 'clamp'}
	);

	return <SubtitleCard text={text} opacity={opacity} />;
};

export const ReelWithSubtitles: React.FC<ReelWithSubtitlesProps> = ({
	videoFileName,
	hookText,
	hookDurationInSeconds = 6,
	videoNaturalDurationInFrames,
	subtitles,
	postSubtitleHoldFrames = 15,
	fadeOutFrames = 30,
}) => {
	const frame = useCurrentFrame();
	const {fps, fadeInFrames, fadeOutDurationFrames, colors} = HOOK_TEMPLATE;

	// --- Hook timing (identical to ReelWithHook) ---
	const hookVisibleEnd = Math.round(hookDurationInSeconds * fps);
	const hookFadeOutStart = hookVisibleEnd - fadeOutDurationFrames;

	const hookOpacity = interpolate(
		frame,
		[0, fadeInFrames, hookFadeOutStart, hookVisibleEnd],
		[0, 1, 1, 0],
		{extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: easeOut}
	);
	const hookSlideIn = interpolate(frame, [0, fadeInFrames], [16, 0], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
		easing: easeOut,
	});
	const hookSlideOut = interpolate(frame, [hookFadeOutStart, hookVisibleEnd], [0, -10], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
		easing: Easing.in(Easing.cubic),
	});
	const hookTranslateY = hookSlideIn + hookSlideOut;

	// --- Subtitle sequencing: chunks play back to back, starting exactly when the hook is gone ---
	let cursor = hookVisibleEnd;
	const subtitleSequences = subtitles.map((chunk, i) => {
		const from = cursor;
		cursor += chunk.durationInFrames;
		return (
			<Sequence key={i} from={from} durationInFrames={chunk.durationInFrames} layout="none">
				<SubtitleChunkRenderer text={chunk.text} durationInFrames={chunk.durationInFrames} />
			</Sequence>
		);
	});
	const subtitlesEnd = cursor;

	// --- Final fade to black, after the hold following the last subtitle ---
	const fadeOutStart = subtitlesEnd + postSubtitleHoldFrames;
	const fadeOutEnd = fadeOutStart + fadeOutFrames;
	const finalFadeOpacity = interpolate(frame, [fadeOutStart, fadeOutEnd], [0, 1], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
		easing: easeOut,
	});

	// --- Video freeze: plays normally, then holds on its last real frame for the rest of the composition ---
	const freezeAtFrame = Math.min(frame, videoNaturalDurationInFrames - 1);

	return (
		<AbsoluteFill style={{backgroundColor: colors.background}}>
			<Freeze frame={freezeAtFrame}>
				<OffthreadVideo
					src={staticFile(videoFileName)}
					style={{
						width: '100%',
						height: '100%',
						objectFit: 'cover',
						objectPosition: 'center',
					}}
				/>
			</Freeze>

			{/* Hook text overlay (first hookDurationInSeconds only) */}
			<AbsoluteFill
				style={{
					opacity: hookOpacity,
					transform: `translateY(${hookTranslateY}px)`,
					alignItems: 'flex-start',
					justifyContent: 'flex-start',
				}}
			>
				<HookCard text={hookText} />
			</AbsoluteFill>

			{/* Subtitle chunks, only after the hook has fully disappeared */}
			{subtitleSequences}

			{/* Final fade to black */}
			<AbsoluteFill style={{backgroundColor: '#000000', opacity: finalFadeOpacity}} />
		</AbsoluteFill>
	);
};
