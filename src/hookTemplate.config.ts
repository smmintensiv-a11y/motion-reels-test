/**
 * Default styling for the Reels templates (src/ReelWithHook.tsx, src/ReelWithSubtitles.tsx,
 * src/ReelWithInserts.tsx). Tweak values here to restyle every future render without
 * touching component logic.
 */

const fontFamily =
	'-apple-system, BlinkMacSystemFont, "Helvetica Neue", Helvetica, Arial, sans-serif';

// Shared brand palette used by both the hook card and the subtitle card, so they
// always look like the same design system.
export const BRAND_COLORS = {
	// Background shown while the video is loading (never visible once the video plays)
	background: '#000000',
	// Dark semi-transparent plate background
	plateBackground: 'rgba(10,10,12,0.6)',
	// Red accent line gradient (top -> bottom)
	accentTop: '#ff3b3b',
	accentBottom: '#d0102b',
	textColor: '#ffffff',
};

export const HOOK_TEMPLATE = {
	fps: 30,

	// Timing (in frames @ fps above)
	fadeInFrames: 20,
	fadeOutDurationFrames: 28,

	colors: BRAND_COLORS,

	plate: {
		// Distance from the left/right screen edges to the plate, in px (1080px-wide canvas)
		sideMargin: 64,
		// Distance from the top of the screen to the top of the plate, in px (1920px-tall canvas)
		topPosition: 1310,
		borderRadius: 18,
		accentWidth: 7,
		paddingTop: 34,
		paddingBottom: 34,
		paddingLeft: 30,
		paddingRight: 38,
	},

	text: {
		fontSize: 50,
		lineHeight: 1.28,
		letterSpacing: 0.5,
		fontWeight: 800,
		fontFamily,
	},
};

// Dialogue subtitle card shown after the hook disappears. Same design language
// (colors, plate shape, accent line) as the hook, but bottom-anchored, smaller,
// and in sentence case since it's continuous dialogue rather than a headline.
export const SUBTITLE_TEMPLATE = {
	fps: 30,

	// How long each subtitle chunk fades in/out at its own edges, in frames.
	chunkFadeFrames: 6,

	colors: BRAND_COLORS,

	plate: {
		sideMargin: 64,
		// Distance from the bottom of the screen to the bottom of the plate, in px
		// (1920px-tall canvas). Anchoring from the bottom keeps the plate inside the
		// mobile "safe zone" regardless of whether a chunk wraps to 1 or 2 lines.
		bottomSafeMargin: 260,
		borderRadius: 16,
		accentWidth: 6,
		paddingTop: 20,
		paddingBottom: 20,
		paddingLeft: 24,
		paddingRight: 28,
	},

	text: {
		fontSize: 40,
		lineHeight: 1.32,
		letterSpacing: 0.2,
		fontWeight: 700,
		fontFamily,
	},
};

// Short "insert" statement card shown after the hook disappears - a paraphrased
// takeaway rather than a subtitle. Same design language as the hook (colors,
// accent line, bold uppercase), but a small, center-anchored card instead of a
// full-width plate, so it reads as a distinct visual beat.
export const INSERT_TEMPLATE = {
	fps: 30,

	// How long each insert fades/slides in and out at its own edges, in frames.
	fadeFrames: 10,
	// How far (px) the card slides vertically during its fade in/out.
	slideDistance: 18,

	colors: BRAND_COLORS,

	plate: {
		// Card is centered horizontally and capped at this width so it stays "small".
		maxWidth: 800,
		// Distance from the bottom of the screen to the bottom of the card, in px
		// (1920px-tall canvas) - keeps it in the safe zone regardless of line count.
		bottomSafeMargin: 300,
		borderRadius: 16,
		accentWidth: 6,
		paddingTop: 24,
		paddingBottom: 24,
		paddingLeft: 26,
		paddingRight: 30,
	},

	text: {
		fontSize: 42,
		lineHeight: 1.3,
		letterSpacing: 0.4,
		fontWeight: 800,
		fontFamily,
	},
};
