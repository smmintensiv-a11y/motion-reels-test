import React from 'react';
import {AbsoluteFill, Easing, interpolate, OffthreadVideo, staticFile, useCurrentFrame} from 'remotion';
import {HOOK_TEMPLATE} from './hookTemplate.config';
import {HookCard} from './HookCard';

export interface ReelWithHookProps {
	/** Path to the source video, relative to the public/ folder, e.g. "source.mov" or "input/new-video.mp4" */
	videoFileName: string;
	/** The hook headline. Auto-uppercased and word-wrapped. Use "\n" for a manual line break. */
	hookText: string;
	/** How long the hook stays on screen, in seconds. Defaults to 6. */
	hookDurationInSeconds?: number;
	/**
	 * Total length of the composition, in frames. Must match the source video's duration
	 * (durationInSeconds * fps). Computed automatically by `npm run render:hook`.
	 */
	durationInFrames: number;
}

const easeOut = Easing.out(Easing.cubic);

export const ReelWithHook: React.FC<ReelWithHookProps> = ({
	videoFileName,
	hookText,
	hookDurationInSeconds = 6,
}) => {
	const frame = useCurrentFrame();
	const {fps, fadeInFrames, fadeOutDurationFrames, colors} = HOOK_TEMPLATE;

	const hookVisibleEnd = Math.round(hookDurationInSeconds * fps);
	const fadeOutStart = hookVisibleEnd - fadeOutDurationFrames;

	const hookOpacity = interpolate(
		frame,
		[0, fadeInFrames, fadeOutStart, hookVisibleEnd],
		[0, 1, 1, 0],
		{extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: easeOut}
	);

	const slideIn = interpolate(frame, [0, fadeInFrames], [16, 0], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
		easing: easeOut,
	});
	const slideOut = interpolate(frame, [fadeOutStart, hookVisibleEnd], [0, -10], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
		easing: Easing.in(Easing.cubic),
	});
	const translateY = slideIn + slideOut;

	return (
		<AbsoluteFill style={{backgroundColor: colors.background}}>
			{/* Main video layer. If the source isn't already 9:16, objectFit "cover" crops it to fill the frame. */}
			<OffthreadVideo
				src={staticFile(videoFileName)}
				style={{
					width: '100%',
					height: '100%',
					objectFit: 'cover',
					objectPosition: 'center',
				}}
			/>

			{/* Hook text overlay */}
			<AbsoluteFill
				style={{
					opacity: hookOpacity,
					transform: `translateY(${translateY}px)`,
					alignItems: 'flex-start',
					justifyContent: 'flex-start',
				}}
			>
				<HookCard text={hookText} />
			</AbsoluteFill>
		</AbsoluteFill>
	);
};
