import React from 'react';
import {HOOK_TEMPLATE} from './hookTemplate.config';

export const HookCard: React.FC<{text: string}> = ({text}) => {
	const {colors, plate, text: textStyle} = HOOK_TEMPLATE;
	const lines = text.split('\n');

	return (
		<div
			style={{
				position: 'absolute',
				left: plate.sideMargin,
				right: plate.sideMargin,
				top: plate.topPosition,
				display: 'flex',
				alignItems: 'stretch',
				borderRadius: plate.borderRadius,
				background: colors.plateBackground,
				backdropFilter: 'blur(10px)',
				boxShadow: '0 24px 60px rgba(0,0,0,0.45)',
				overflow: 'hidden',
			}}
		>
			{/* Red accent line */}
			<div
				style={{
					width: plate.accentWidth,
					alignSelf: 'stretch',
					background: `linear-gradient(180deg, ${colors.accentTop} 0%, ${colors.accentBottom} 100%)`,
					boxShadow: '0 0 18px rgba(255,40,50,0.65)',
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
					textShadow: '0 2px 12px rgba(0,0,0,0.5)',
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
