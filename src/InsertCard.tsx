import React from 'react';
import {INSERT_TEMPLATE} from './hookTemplate.config';

export const InsertCard: React.FC<{text: string; opacity: number; translateY: number}> = ({
	text,
	opacity,
	translateY,
}) => {
	const {colors, plate, text: textStyle} = INSERT_TEMPLATE;
	const lines = text.split('\n');

	return (
		<div
			style={{
				position: 'absolute',
				left: '50%',
				bottom: plate.bottomSafeMargin,
				maxWidth: plate.maxWidth,
				opacity,
				transform: `translateX(-50%) translateY(${translateY}px)`,
				display: 'flex',
				alignItems: 'stretch',
				borderRadius: plate.borderRadius,
				background: colors.plateBackground,
				backdropFilter: 'blur(10px)',
				boxShadow: '0 18px 46px rgba(0,0,0,0.45)',
				overflow: 'hidden',
			}}
		>
			{/* Accent line, matching the hook card */}
			<div
				style={{
					width: plate.accentWidth,
					alignSelf: 'stretch',
					background: `linear-gradient(180deg, ${colors.accentTop} 0%, ${colors.accentBottom} 100%)`,
					boxShadow: '0 0 14px rgba(255,40,50,0.6)',
				}}
			/>

			{/* Text block */}
			<div
				style={{
					padding: `${plate.paddingTop}px ${plate.paddingRight}px ${plate.paddingBottom}px ${plate.paddingLeft}px`,
					fontFamily: textStyle.fontFamily,
					fontWeight: textStyle.fontWeight,
					textTransform: 'uppercase',
					color: colors.textColor,
					fontSize: textStyle.fontSize,
					lineHeight: textStyle.lineHeight,
					letterSpacing: textStyle.letterSpacing,
					textShadow: '0 2px 10px rgba(0,0,0,0.55)',
					textAlign: 'center',
					whiteSpace: 'nowrap',
				}}
			>
				{lines.map((line, i) => (
					<React.Fragment key={i}>
						{line}
						{i < lines.length - 1 && <br />}
					</React.Fragment>
				))}
			</div>
		</div>
	);
};
