import React from 'react';

export const SearchIcon: React.FC<{size?: number; color?: string; strokeWidth?: number}> = ({
	size = 34,
	color = 'rgba(255,255,255,0.92)',
	strokeWidth = 3.2,
}) => {
	return (
		<svg width={size} height={size} viewBox="0 0 24 24" fill="none">
			<circle cx="11" cy="11" r="7" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" />
			<line x1="16.2" y1="16.2" x2="21" y2="21" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" />
		</svg>
	);
};

export const CursorArrow: React.FC<{size?: number}> = ({size = 46}) => {
	return (
		<svg
			width={size}
			height={size * 1.28}
			viewBox="0 0 24 31"
			fill="none"
			style={{
				filter: 'drop-shadow(0 2px 6px rgba(0,0,0,0.55)) drop-shadow(0 0 10px rgba(255,255,255,0.25))',
			}}
		>
			<path
				d="M1.3 1.2 L1.3 24.8 L7.6 19.3 L11.6 28.4 L15.2 26.8 L11.1 17.9 L19.6 17.3 Z"
				fill="white"
				stroke="rgba(0,0,0,0.35)"
				strokeWidth="1"
				strokeLinejoin="round"
			/>
		</svg>
	);
};
