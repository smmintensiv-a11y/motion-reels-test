# Design spec — Reels #1 (motion layer)

Brand truth for this project. Derived from `../../MOTION_STYLE_GUIDE.md` (already approved) — this file exists only to satisfy the "establish design before HTML" gate with the exact tokens used in code; the style guide remains the source of record for rationale.

## Canvas

1080×1920, 30fps, ~34.93s. In-feed vertical (Reels) — scale type up (headline ≥90px, body ≥32px per `hyperframes-creative/typography.md`).

## Palette

One accent hue (red), two neutral scene grounds (light/dark), tinted-not-pure blacks/whites per house-style.

| Token | Hex | Role |
|---|---|---|
| `--bg-light` | `#EFEBE2` | light scene ground |
| `--bg-dark` | `#0A0A0A` | dark scene ground |
| `--ink` | `#1A1A1A` | text/icons on light |
| `--paper` | `#FFFFFF` | text/icons on dark |
| `--accent` | `#E5231C` | signal red — punch word / punch object only |
| `--structural` | `#9A9A96` | grid / connector lines / secondary decoratives |

No gradients, no cyan/purple neon defaults. Same two grounds across the whole piece, hard cut between them (no crossfade) — this IS the deliberate choice, not a lazy default.

## Typography

Single family, two weights — deliberate "one font, extreme weight contrast" per typography guardrails, matching the style guide's "one gramматика, роль различается весом+цветом" rule.

- Family: **Montserrat** (geometric sans, embeds natively, not on the banned-monoculture list — unlike Inter/Poppins/Outfit).
- Connector words: weight 500, color `--ink`/`--paper`.
- Punch word: weight 900, color `--accent`, tight tracking (`-0.02em`).
- Headline size: 88–96px (in-feed minimum). Sentence case, never caps.
- Max 2 lines per text accent, ≤4-6 words.

## Composition grid (1080×1920)

```
y=0–1000      face-video zone           — nothing meaningful placed here
y=1000–1056   seam buffer               — no text, no cropped object edges
y=1056–1750   motion content-safe zone  — all hero visuals + text
y=1750–1920   Reels UI safe zone        — kept clear
```

Slots inside the content-safe zone (all coordinates fixed, reused verbatim from the storyboard):

- **H** (hero solo): x 430–650, y 1120–1340 (220px)
- **T** (punch text): x 60–1020, y 1500–1650
- **C** (3-channel row, reused for callback): icon1 x130–320 / icon2 x350–540 / icon3 x570–760, y 1300–1490 (190px each)
- **D** (docked chain pair): voice x100–230 / connector x230–330 / system x330–460, y 1080–1210 (130px each)
- **P** (payoff text): x 60–1020, y 1620–1700

Right-edge clearance in the lower two-thirds of the motion zone: nothing past x=880 (Reels action-rail safe margin).

## Background layer

Per scene, 2–4 slow ambient decoratives (house-style "background layer" rule), all finite/deterministic:

- Light scenes: faint dot-grid (`--structural` at ~8% opacity), plus — only in scene A — a slow diagonal drift of the 3 channel-icon silhouettes at ~4% opacity behind the hero (idle, `sine-wave-loop` idiom, finite repeats).
- Dark scenes: same dot-grid inverted (`--structural` at ~10% opacity on `--bg-dark`), no icon drift (keeps the "poворот" beat uncluttered per storyboard's "no new object" note).

## Motion system → named rules

Per `MOTION_STORYBOARD.md` § Motion System, mapped to `hyperframes-animation/rules-index.md`:

| Storyboard technique | Rule cited |
|---|---|
| Punch Word Pop-In | `spring-pop-entrance` (subtle overshoot, not full slam) |
| Scene Flip (Light↔Dark) | zero-duration `tl.set` background swap — hard cut, not a listed tween rule |
| Hero Object Reveal | `spring-pop-entrance` + `svg-icon-enrichment` (clock hand / gear teeth internal motion) |
| Chain/Flow Connector | `svg-path-draw` |
| Repeating Icon Pattern Drift | `sine-wave-loop` idiom (finite repeats) |
| Counter/Callback Tag | `spring-pop-entrance` (checkmark pop+settle) |
| Dock-transition | direct transform tween (scale+x/y, `power2.inOut`) — simple enough it needs no named recipe |
| Cursor click (scene D) | `cursor-click-ripple` |

## Focal element / edge anchors / supporting detail / background (per scene family)

- **A (thesis + 3 channels, light):** focal = slot H hero icon → slot C channel row; edge anchor = none (centered composition); supporting detail = punch word in slot T; background = dot-grid + icon drift.
- **B/C (cost → poворот, dark):** focal = slot H clock, continuous across the cut; supporting detail = punch word in slot T; background = dot-grid only.
- **D (hook, dark):** focal = cursor click, no hero object; minimal.
- **E (mechanism, light):** focal = slot D docked chain → slot C payoff row with checkmarks; supporting detail = slot P text; background = dot-grid only (icon drift not reused here — avoids repeating the same background beat, keeps payoff clean).
