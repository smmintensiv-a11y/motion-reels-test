import React from 'react';
import {AbsoluteFill, Easing, interpolate, useCurrentFrame} from 'remotion';
import {SearchIcon, CursorArrow} from './icons';

const fontFamily =
	'-apple-system, BlinkMacSystemFont, "Helvetica Neue", Helvetica, Arial, sans-serif';

const WIDTH = 1080;
const HEIGHT = 1920;

const BAR_WIDTH = 860;
const BAR_HEIGHT = 124;
const BAR_X = (WIDTH - BAR_WIDTH) / 2;
const BAR_Y = HEIGHT / 2 - BAR_HEIGHT / 2;
const BAR_CENTER_X = WIDTH / 2;
const BAR_CENTER_Y = HEIGHT / 2;

const LEFT_ICON_X = BAR_X + 58;
const TEXT_X = BAR_X + 108;
const BUTTON_SIZE = 84;
const BUTTON_CENTER_X = BAR_X + BAR_WIDTH - 18 - BUTTON_SIZE / 2;
const BUTTON_CENTER_Y = BAR_CENTER_Y;

const FULL_TEXT = 'Search anything...';

// Timeline (frames @ 30fps, 240 total)
const INTRO_END = 22;
const TYPE_START = 26;
const TYPE_END = 96;
const CURSOR_HIDE = 190;
const MOUSE_APPEAR_START = 152;
const MOUSE_APPEAR_END = 168;
const MOUSE_MOVE_END = 194;
const PRESS_DOWN_END = 198;
const PRESS_UP_END = 206;
const FADE_OUT_START = 210;
const FADE_OUT_END = 239;

const easeInOut = Easing.inOut(Easing.cubic);
const easeOut = Easing.out(Easing.cubic);

export const SearchBarReel: React.FC = () => {
	const frame = useCurrentFrame();

	// Scene intro fade in
	const introOpacity = interpolate(frame, [0, INTRO_END], [0, 1], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
		easing: easeOut,
	});

	// Continuous slow zoom-in across the whole clip
	const zoomScale = interpolate(frame, [0, 239], [1, 1.16], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
	});

	// Bar entrance pop
	const barScale = interpolate(frame, [0, 24], [0.9, 1], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
		easing: Easing.out(Easing.back(1.3)),
	});

	// Soft pulsing glow behind the bar
	const glowPulse = 0.55 + 0.15 * Math.sin(frame / 26);

	// Typing animation
	const typedChars = Math.round(
		interpolate(frame, [TYPE_START, TYPE_END], [0, FULL_TEXT.length], {
			extrapolateLeft: 'clamp',
			extrapolateRight: 'clamp',
			easing: Easing.inOut(Easing.ease),
		})
	);
	const typedText = FULL_TEXT.slice(0, typedChars);

	// Blinking cursor (on/off every 12 frames), hidden before typing starts and after click focus moves
	const blinkCycle = Math.floor(frame / 12) % 2 === 0;
	const cursorVisible = frame >= TYPE_START - 4 && frame < CURSOR_HIDE && blinkCycle;

	// Approximate width of typed text so the blinking caret sits right after it
	const caretX = TEXT_X + typedText.length * 21.5;

	// Mouse cursor appear + move
	const mouseAppear = interpolate(frame, [MOUSE_APPEAR_START, MOUSE_APPEAR_END], [0, 1], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
		easing: easeOut,
	});
	const startX = 742;
	const startY = 1318;
	const mouseX = interpolate(frame, [MOUSE_APPEAR_START, MOUSE_MOVE_END], [startX, BUTTON_CENTER_X + 6], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
		easing: easeInOut,
	});
	const mouseY = interpolate(frame, [MOUSE_APPEAR_START, MOUSE_MOVE_END], [startY, BUTTON_CENTER_Y + 6], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
		easing: easeInOut,
	});

	// Click press animation
	const pressScale = interpolate(
		frame,
		[MOUSE_MOVE_END, PRESS_DOWN_END, PRESS_UP_END],
		[1, 0.82, 1],
		{extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: easeInOut}
	);
	const buttonScale = interpolate(
		frame,
		[MOUSE_MOVE_END, PRESS_DOWN_END, PRESS_UP_END],
		[1, 0.88, 1.04],
		{extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: easeInOut}
	);
	const buttonGlow = interpolate(frame, [MOUSE_MOVE_END, PRESS_DOWN_END, PRESS_UP_END + 10], [0, 1, 0.35], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
	});

	// Click ripple
	const rippleProgress = interpolate(frame, [PRESS_DOWN_END, PRESS_DOWN_END + 30], [0, 1], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
		easing: easeOut,
	});
	const rippleScale = 1 + rippleProgress * 2.4;
	const rippleOpacity = interpolate(rippleProgress, [0, 1], [0.55, 0]);

	// Final fade to black
	const fadeOutOpacity = interpolate(frame, [FADE_OUT_START, FADE_OUT_END], [0, 1], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
		easing: easeInOut,
	});

	return (
		<AbsoluteFill style={{backgroundColor: '#020203'}}>
			{/* Base dark vignette background, stays static (outside zoom) so edges never reveal */}
			<AbsoluteFill
				style={{
					background:
						'radial-gradient(ellipse at 50% 42%, #14151a 0%, #08090b 45%, #020203 78%)',
				}}
			/>

			{/* Zoomed content group */}
			<AbsoluteFill
				style={{
					transform: `scale(${zoomScale})`,
					transformOrigin: '50% 50%',
					opacity: introOpacity,
				}}
			>
				{/* Soft glow behind the search bar */}
				<div
					style={{
						position: 'absolute',
						left: BAR_CENTER_X - 520,
						top: BAR_CENTER_Y - 260,
						width: 1040,
						height: 520,
						background:
							'radial-gradient(ellipse at center, rgba(255,255,255,0.16) 0%, rgba(160,180,255,0.08) 40%, rgba(0,0,0,0) 72%)',
						filter: 'blur(50px)',
						opacity: glowPulse,
					}}
				/>

				{/* Search bar */}
				<div
					style={{
						position: 'absolute',
						left: BAR_X,
						top: BAR_Y,
						width: BAR_WIDTH,
						height: BAR_HEIGHT,
						borderRadius: BAR_HEIGHT / 2,
						transform: `scale(${barScale})`,
						transformOrigin: '50% 50%',
						background: 'rgba(255,255,255,0.07)',
						border: '1.5px solid rgba(255,255,255,0.16)',
						boxShadow:
							'0 30px 80px rgba(0,0,0,0.55), 0 0 0 1px rgba(255,255,255,0.03) inset, 0 1px 0 rgba(255,255,255,0.08) inset',
						backdropFilter: 'blur(18px)',
						display: 'flex',
						alignItems: 'center',
						fontFamily,
					}}
				>
					{/* Left decorative search icon */}
					<div
						style={{
							position: 'absolute',
							left: LEFT_ICON_X - BAR_X - 15,
							top: BAR_HEIGHT / 2 - 15,
							opacity: 0.55,
						}}
					>
						<SearchIcon size={30} color="rgba(255,255,255,0.55)" strokeWidth={2.6} />
					</div>

					{/* Typed text + caret */}
					<div
						style={{
							position: 'absolute',
							left: TEXT_X - BAR_X,
							top: 0,
							height: BAR_HEIGHT,
							display: 'flex',
							alignItems: 'center',
							fontSize: 40,
							fontWeight: 400,
							letterSpacing: 0.2,
							color: 'rgba(255,255,255,0.92)',
							whiteSpace: 'nowrap',
						}}
					>
						{typedText}
					</div>
					<div
						style={{
							position: 'absolute',
							left: caretX - BAR_X,
							top: BAR_HEIGHT / 2 - 24,
							width: 3,
							height: 48,
							borderRadius: 2,
							background: 'rgba(255,255,255,0.95)',
							boxShadow: '0 0 8px rgba(255,255,255,0.6)',
							opacity: cursorVisible ? 1 : 0,
						}}
					/>

					{/* Right circular search button (click target) */}
					<div
						style={{
							position: 'absolute',
							left: BUTTON_CENTER_X - BAR_X - BUTTON_SIZE / 2,
							top: BUTTON_CENTER_Y - BAR_Y - BUTTON_SIZE / 2,
							width: BUTTON_SIZE,
							height: BUTTON_SIZE,
							borderRadius: BUTTON_SIZE / 2,
							transform: `scale(${buttonScale})`,
							transformOrigin: '50% 50%',
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'center',
							background: `rgba(255,255,255,${0.1 + buttonGlow * 0.14})`,
							border: '1.5px solid rgba(255,255,255,0.22)',
							boxShadow: `0 0 ${18 + buttonGlow * 30}px rgba(255,255,255,${0.15 + buttonGlow * 0.35})`,
						}}
					>
						<SearchIcon size={34} color="rgba(255,255,255,0.95)" strokeWidth={3.2} />
					</div>

					{/* Click ripple */}
					<div
						style={{
							position: 'absolute',
							left: BUTTON_CENTER_X - BAR_X - BUTTON_SIZE / 2,
							top: BUTTON_CENTER_Y - BAR_Y - BUTTON_SIZE / 2,
							width: BUTTON_SIZE,
							height: BUTTON_SIZE,
							borderRadius: BUTTON_SIZE / 2,
							transform: `scale(${rippleScale})`,
							border: '1.5px solid rgba(255,255,255,0.7)',
							opacity: rippleOpacity,
						}}
					/>
				</div>

				{/* Mouse cursor */}
				<div
					style={{
						position: 'absolute',
						left: mouseX,
						top: mouseY,
						opacity: mouseAppear,
						transform: `scale(${0.85 + mouseAppear * 0.15 * pressScale}) scale(${pressScale})`,
						transformOrigin: '20% 12%',
					}}
				>
					<CursorArrow size={50} />
				</div>
			</AbsoluteFill>

			{/* Final fade to black */}
			<AbsoluteFill style={{backgroundColor: '#000000', opacity: fadeOutOpacity}} />
		</AbsoluteFill>
	);
};
