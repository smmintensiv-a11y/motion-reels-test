/**
 * Default styling for the "hook overlay" Reels template (src/ReelWithHook.tsx).
 * Tweak values here to restyle every future render without touching component logic.
 */

export const HOOK_TEMPLATE = {
	fps: 30,

	// Timing (in frames @ fps above)
	fadeInFrames: 20,
	fadeOutDurationFrames: 28,

	colors: {
		// Background shown while the video is loading (never visible once the video plays)
		background: '#000000',
		// Dark semi-transparent plate behind the hook text
		plateBackground: 'rgba(10,10,12,0.6)',
		// Red accent line gradient (top -> bottom)
		accentTop: '#ff3b3b',
		accentBottom: '#d0102b',
		textColor: '#ffffff',
	},

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
		fontFamily:
			'-apple-system, BlinkMacSystemFont, "Helvetica Neue", Helvetica, Arial, sans-serif',
	},
};
