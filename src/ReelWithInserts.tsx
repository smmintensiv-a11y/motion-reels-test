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
import {HOOK_TEMPLATE, INSERT_TEMPLATE} from './hookTemplate.config';
import {HookCard} from './HookCard';
import {InsertCard} from './InsertCard';

export interface InsertChunk {
	text: string;
	/** How long this insert stays on screen (including its own fade in/out), in frames. */
	durationInFrames: number;
}

export interface ReelWithInsertsProps {
	/** Path to the source video, relative to the public/ folder. */
	videoFileName: string;
	/** Same hook headline/style as ReelWithHook. Auto-uppercased, "\n" forces a line break. */
	hookText: string;
	/** How long the hook stays on screen, in seconds. Inserts never start before this. */
	hookDurationInSeconds?: number;
	/** The source video's own real length, in frames. Playback freezes on its last frame after this point. */
	videoNaturalDurationInFrames: number;
	/** Short, paraphrased visual text inserts, shown one after another after the hook disappears. */
	inserts: InsertChunk[];
	/** Gap between consecutive inserts (nothing shown), in frames. */
	gapFrames?: number;
	/** How long to hold the frozen frame after the last insert fades out, before the final fade to black. */
	postInsertHoldFrames?: number;
	/** Duration of the final fade to black, in frames. */
	fadeOutFrames?: number;
	/**
	 * Total length of the composition, in frames. Must equal
	 * hookDurationInSeconds*fps + sum(insert durations) + gaps + postInsertHoldFrames + fadeOutFrames.
	 */
	durationInFrames: number;
}

const easeOut = Easing.out(Easing.cubic);

const InsertChunkRenderer: React.FC<{text: string; durationInFrames: number}> = ({
	text,
	durationInFrames,
}) => {
	const frame = useCurrentFrame();
	const {fadeFrames, slideDistance} = INSERT_TEMPLATE;

	const opacity = interpolate(
		frame,
		[0, fadeFrames, durationInFrames - fadeFrames, durationInFrames],
		[0, 1, 1, 0],
		{extrapolateLeft: 'clamp', extrapolateRight: 'clamp'}
	);
	const slideIn = interpolate(frame, [0, fadeFrames], [slideDistance, 0], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
		easing: easeOut,
	});
	const slideOut = interpolate(
		frame,
		[durationInFrames - fadeFrames, durationInFrames],
		[0, -slideDistance * 0.6],
		{extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.in(Easing.cubic)}
	);

	return <InsertCard text={text} opacity={opacity} translateY={slideIn + slideOut} />;
};

export const ReelWithInserts: React.FC<ReelWithInsertsProps> = ({
	videoFileName,
	hookText,
	hookDurationInSeconds = 6,
	videoNaturalDurationInFrames,
	inserts,
	gapFrames = 10,
	postInsertHoldFrames = 15,
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

	// --- Insert sequencing: cards play back to back (with a gap), starting exactly when the hook is gone ---
	let cursor = hookVisibleEnd;
	const insertSequences = inserts.map((chunk, i) => {
		if (i > 0) cursor += gapFrames;
		const from = cursor;
		cursor += chunk.durationInFrames;
		return (
			<Sequence key={i} from={from} durationInFrames={chunk.durationInFrames} layout="none">
				<InsertChunkRenderer text={chunk.text} durationInFrames={chunk.durationInFrames} />
			</Sequence>
		);
	});
	const insertsEnd = cursor;

	// --- Final fade to black, after the hold following the last insert ---
	const fadeOutStart = insertsEnd + postInsertHoldFrames;
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

			{/* Insert cards, only after the hook has fully disappeared */}
			{insertSequences}

			{/* Final fade to black */}
			<AbsoluteFill style={{backgroundColor: '#000000', opacity: finalFadeOpacity}} />
		</AbsoluteFill>
	);
};
