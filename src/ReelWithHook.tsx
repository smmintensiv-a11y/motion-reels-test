import React from 'react';
import {AbsoluteFill, Easing, interpolate, OffthreadVideo, staticFile, useCurrentFrame} from 'remotion';

const fontFamily =
	'-apple-system, BlinkMacSystemFont, "Helvetica Neue", Helvetica, Arial, sans-serif';

// Hook overlay is visible for the first 6 seconds (180 frames @ 30fps)
const HOOK_VISIBLE_END = 180;
const FADE_IN_END = 20;
const FADE_OUT_START = 152;
const FADE_OUT_END = HOOK_VISIBLE_END;

const easeOut = Easing.out(Easing.cubic);

export const ReelWithHook: React.FC = () => {
	const frame = useCurrentFrame();

	const hookOpacity = interpolate(
		frame,
		[0, FADE_IN_END, FADE_OUT_START, FADE_OUT_END],
		[0, 1, 1, 0],
		{extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: easeOut}
	);

	const slideIn = interpolate(frame, [0, FADE_IN_END], [16, 0], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
		easing: easeOut,
	});
	const slideOut = interpolate(frame, [FADE_OUT_START, FADE_OUT_END], [0, -10], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
		easing: Easing.in(Easing.cubic),
	});
	const translateY = slideIn + slideOut;

	return (
		<AbsoluteFill style={{backgroundColor: '#000'}}>
			{/* Main video layer, source is already 9:16 so it fills the frame with no cropping needed */}
			<OffthreadVideo
				src={staticFile('source.mov')}
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
				<div
					style={{
						position: 'absolute',
						left: 64,
						right: 64,
						top: 1310,
						display: 'flex',
						alignItems: 'stretch',
						borderRadius: 18,
						background: 'rgba(10,10,12,0.6)',
						backdropFilter: 'blur(10px)',
						boxShadow: '0 24px 60px rgba(0,0,0,0.45)',
						overflow: 'hidden',
					}}
				>
					{/* Red accent line */}
					<div
						style={{
							width: 7,
							alignSelf: 'stretch',
							background: 'linear-gradient(180deg, #ff3b3b 0%, #d0102b 100%)',
							boxShadow: '0 0 18px rgba(255,40,50,0.65)',
						}}
					/>

					{/* Text block */}
					<div
						style={{
							padding: '34px 38px 34px 30px',
							fontFamily,
							fontWeight: 800,
							textTransform: 'uppercase',
							color: '#ffffff',
							fontSize: 50,
							lineHeight: 1.28,
							letterSpacing: 0.5,
							textShadow: '0 2px 12px rgba(0,0,0,0.5)',
						}}
					>
						РЕКТИФИКАЦИЯ —<br />
						ЭТО НЕ УГАДЫВАНИЕ
						<br />
						ВРЕМЕНИ
					</div>
				</div>
			</AbsoluteFill>
		</AbsoluteFill>
	);
};
