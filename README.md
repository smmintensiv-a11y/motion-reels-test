# motion-reels-test

Remotion-based motion design project for vertical (1080x1920) Reels/TikTok/Shorts videos.

## Projects in this repo

- **SearchBarReel** — fully animated search-bar motion graphic (no source video).
- **ReelWithHook** — the reusable "hook overlay" template: takes any vertical source
  video and overlays a fading hook-text card on top of it. This is the template
  described below.

## The hook overlay template

### Which file controls the hook overlay design

- **`src/ReelWithHook.tsx`** — the component. Renders the video + the text plate +
  the red accent line, and drives the fade in/out and slide animation. You normally
  don't need to edit this file to make a new video — only to change *how* the
  template looks/behaves for every future render.
- **`src/hookTemplate.config.ts`** — all the visual constants (colors, position,
  sizes, timing) live here, separate from the animation logic. **Edit this file
  first** when you want to restyle the template.
- **`src/Root.tsx`** — registers the `ReelWithHook` composition and holds the
  `defaultProps` (the reference video/hook shown when you open Remotion Studio or
  render without overriding anything).

### Where to change the hook text

Per-render: pass `hookText` as a prop (see "Render a new MP4 version" below) — you
never need to edit code for a new hook line.

Default/reference text: `REEL_WITH_HOOK_DEFAULT_PROPS.hookText` in `src/Root.tsx`.

Text is auto-uppercased and word-wraps automatically to fit the plate width. Use
`\n` inside the string if you want to force a specific line break instead of
letting it wrap naturally. Keep it to roughly 3–4 lines for mobile readability —
if a long hook wraps to 5+ lines, either shorten it or reduce `text.fontSize` in
`src/hookTemplate.config.ts`.

### Where to change the duration of the hook

- **How long the hook stays visible**: `hookDurationInSeconds` prop (default `6`),
  set in `REEL_WITH_HOOK_DEFAULT_PROPS` in `src/Root.tsx` or passed per-render.
- **Fade in/out speed**: `fadeInFrames` and `fadeOutDurationFrames` in
  `src/hookTemplate.config.ts` (both in frames @ 30fps, e.g. `20` frames ≈ 0.67s).
- **Total video length**: `durationInFrames` — this must match the source video's
  real length and is computed automatically by `npm run render:hook` (see below),
  so you shouldn't need to set it by hand.

### Where to change the position of the text plate

`src/hookTemplate.config.ts` → `plate`:
- `sideMargin` — left/right gap from the screen edges (px, on a 1080-wide canvas).
- `topPosition` — distance from the top of the screen to the top of the plate (px,
  on a 1920-tall canvas). Lower this value to move the plate up (e.g. to avoid a
  subject's face lower/higher in a different video).
- `borderRadius`, `paddingTop/Bottom/Left/Right`, `accentWidth` — shape and
  internal spacing.

### Where to change the colors

`src/hookTemplate.config.ts` → `colors`:
- `plateBackground` — dark semi-transparent plate background (rgba).
- `accentTop` / `accentBottom` — the red accent line gradient.
- `textColor` — hook text color (white by default).
- `background` — fallback color behind the video (invisible once the video plays).

### Where to change the font size

`src/hookTemplate.config.ts` → `text`:
- `fontSize` — hook text size in px.
- `lineHeight`, `letterSpacing`, `fontWeight`, `fontFamily` — other typography
  controls.

### How to replace the source video

1. Put the new video file under `public/`, ideally in `public/input/`, e.g.
   `public/input/new-video.mp4`.
2. Reference it with a path **relative to `public/`** — for the example above
   that's `input/new-video.mp4`. This is the `videoFileName` value used in the
   render command below.
3. If the video isn't already 9:16 vertical, it's automatically center-cropped to
   fill the 1080x1920 frame (`objectFit: cover` in `ReelWithHook.tsx`) — no manual
   cropping needed.

### How to render a new MP4 version

Use the `render:hook` script — it probes the video's real duration with `ffprobe`
so you never have to calculate frame counts by hand:

```bash
npm run render:hook -- <videoFileName> "<hookText>" <outputPath> [hookDurationInSeconds]
```

Example:

```bash
npm run render:hook -- input/new-video.mp4 "YOUR HOOK TEXT HERE" output/final-reel.mp4
```

`hookDurationInSeconds` is optional and defaults to `6`.

Under the hood this just calls Remotion's renderer with computed props:

```bash
npx remotion render src/index.ts ReelWithHook output/final-reel.mp4 \
  --props='{"videoFileName":"input/new-video.mp4","hookText":"YOUR HOOK TEXT HERE","hookDurationInSeconds":6,"durationInFrames":295}'
```

(`render:hook` writes that JSON to a temp file and cleans it up afterwards — you
don't need to run this manually.)

## Usage example

```
New video: input/new-video.mp4
Hook text: "YOUR HOOK TEXT HERE"
Output: output/final-reel.mp4
```

```bash
npm run render:hook -- input/new-video.mp4 "YOUR HOOK TEXT HERE" output/final-reel.mp4
```

Once this is set up, a future request can simply be:

> "Use the same hook template. New video: `input/new-video.mp4`. Hook: `YOUR HOOK
> TEXT HERE`. Render final MP4."

## Setup

```bash
npm install
```

Rendering requires `ffmpeg`/`ffprobe` on the system PATH (used both by Remotion's
renderer and by the `render:hook` duration-probing script).

## Preview in Remotion Studio

```bash
npx remotion studio src/index.ts
```
