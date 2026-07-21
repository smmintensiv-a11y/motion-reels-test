#!/usr/bin/env node
/**
 * Renders the ReelWithHook template with a new video + hook text, without any
 * manual frame-count math: it probes the source video's real duration with
 * ffprobe and passes the computed durationInFrames through to Remotion.
 *
 * Usage:
 *   npm run render:hook -- <videoFileName> "<hookText>" <outputPath> [hookDurationInSeconds]
 *
 * <videoFileName> is a path relative to public/, e.g. "input/new-video.mp4".
 * Place the source video file there before running this script.
 */
import {execFileSync} from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';

const [, , videoFileName, hookText, outputPath, hookDurationArg] = process.argv;

if (!videoFileName || !hookText || !outputPath) {
	console.error(
		'Usage: npm run render:hook -- <videoFileName> "<hookText>" <outputPath> [hookDurationInSeconds]\n' +
			'Example: npm run render:hook -- input/new-video.mp4 "YOUR HOOK TEXT HERE" output/final-reel.mp4'
	);
	process.exit(1);
}

const fps = 30;
const hookDurationInSeconds = hookDurationArg ? Number(hookDurationArg) : 6;

const videoPath = path.join('public', videoFileName);
if (!fs.existsSync(videoPath)) {
	console.error(
		`Video not found at ${videoPath}.\n` +
			`Place the source video under public/ first (e.g. public/input/new-video.mp4), ` +
			`then pass "input/new-video.mp4" as <videoFileName>.`
	);
	process.exit(1);
}

const durationOutput = execFileSync('ffprobe', [
	'-v',
	'error',
	'-show_entries',
	'format=duration',
	'-of',
	'default=noprint_wrappers=1:nokey=1',
	videoPath,
])
	.toString()
	.trim();

const durationInFrames = Math.round(parseFloat(durationOutput) * fps);

const props = {
	videoFileName,
	hookText,
	hookDurationInSeconds,
	durationInFrames,
};

const propsPath = path.join('.render-hook-props.tmp.json');
fs.writeFileSync(propsPath, JSON.stringify(props));

console.log(`Source video: ${videoPath} (${durationOutput}s -> ${durationInFrames} frames @ ${fps}fps)`);
console.log(`Hook text: ${hookText}`);
console.log(`Hook duration: ${hookDurationInSeconds}s`);
console.log(`Rendering -> ${outputPath}`);

try {
	execFileSync(
		'npx',
		['remotion', 'render', 'src/index.ts', 'ReelWithHook', outputPath, `--props=${propsPath}`],
		{stdio: 'inherit'}
	);
	console.log(`Done: ${outputPath}`);
} finally {
	fs.rmSync(propsPath, {force: true});
}
