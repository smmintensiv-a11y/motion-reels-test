---
format: 1080x1920
duration: 34.93s
message: "Голосовое → система → готовый текст сразу для всех трёх каналов"
arc: Проблема → Боль → Поворот → Хук → Механизм
audience: подписчики эксперта в Reels
mode: autonomous
---

Single-file (monolithic) composition — `index.html`. All frames below share one `src`/`data-composition-id="main"`; `poster` seeks to each frame's representative moment. Dispatch not used (small, highly-continuous project — built inline). Scenes and timing are locked from `../../MOTION_STORYBOARD.md`; this file is the HyperFrames-native mirror of that approved plan, not a new decision surface.

## Frame 1 — Cold open

- status: animated
- src: index.html
- duration: 0.7s
- poster: 0.3
- transition_in: cut
- scene: Пустой light-фон, тишина перед первым словом

Empty light ground, dot-grid only. No graphics per storyboard (nothing to visualize yet).

## Frame 2 — Проблема: тезис

- status: animated
- src: index.html
- duration: 6.4s
- poster: 3
- transition_in: cut
- scene: Slot H — cycle/repeat icon pops in; slot T — «одна и та же задача» (red)
- voiceover: "У большинства экспертов есть одна и та же повторяющаяся задача каждую неделю"

Rules: spring-pop-entrance (icon + text), svg-icon-enrichment (icon idle rotation), sine-wave-loop (background icon drift).

## Frame 3 — Пример-связка (без графики)

- status: animated
- src: index.html
- duration: 2.1s
- poster: 8
- transition_in: cut
- scene: Сцена держится неизменной, никакой новой графики
- voiceover: "например, у вас прямой эфир"

No new rule — deliberate silence per storyboard's "лучше без графики" call.

## Frame 4 — Канал 1: рассылка

- status: animated
- src: index.html
- duration: 3.35s
- poster: 10.5
- transition_in: cut
- scene: Slot C icon1 — envelope въезжает; текст «рассылки» (red)
- voiceover: "и нужно отдельно дописать текст для рассылки"

Rules: spring-pop-entrance.

## Frame 5 — Каналы 2–3: Telegram + ВК

- status: animated
- src: index.html
- duration: 2.15s
- poster: 13.3
- transition_in: cut
- scene: Slot C icon2/icon3 — Telegram и VK логотипы въезжают последовательно, без текста (логотипы самоочевидны)
- voiceover: "отдельно для телеграм, отдельно для ВК"

Rules: spring-pop-entrance, stagger ≤0.5s.

## Frame 6 — Цена времени

- status: animated
- src: index.html
- duration: 1.9s
- poster: 15.5
- transition_in: cut
- scene: Slot H — clock/timer заменяет ряд из 3 каналов; текст «целый день» (red)
- voiceover: "и на это уходит целый день"

Rules: spring-pop-entrance, svg-icon-enrichment (часовая стрелка вращается).

## Frame 7 — Обоснование боли (dark flip)

- status: animated
- src: index.html
- duration: 4.25s
- poster: 18.5
- transition_in: cut
- scene: Scene Flip → dark; те же часы остаются; текст «реально долго» (red)
- voiceover: "потому что писать одно и то же тремя разными способами под разные площадки реально долго"

Rules: hard-cut background swap (tl.set), spring-pop-entrance (text only, no new object).

## Frame 8 — Поворот

- status: animated
- src: index.html
- duration: 4.55s
- poster: 22.5
- transition_in: cut
- scene: Dark держится; часы сжимаются/останавливаются; punch-текст «не занимает столько времени» с glow (red, максимальный акцент)
- voiceover: "У меня та же задача не занимает близко, даже близко столько времени"

Rules: direct transform tween (сжатие часов), spring-pop-entrance (max emphasis text).

## Frame 9 — Хук

- status: animated
- src: index.html
- duration: 2.35s
- poster: 26
- transition_in: cut
- scene: Dark держится; курсор въезжает и кликает; без текста
- voiceover: "Сейчас покажу, как."

Rules: cursor-click-ripple.

## Frame 10 — Механизм шаг 1: голосовое

- status: animated
- src: index.html
- duration: 2.55s
- poster: 28.5
- transition_in: cut
- scene: Scene Flip → light; slot H — voice-message icon появляется крупно; текст «голосовое» (red)
- voiceover: "Беру голосовое одно от эксперта"

Rules: hard-cut background swap, spring-pop-entrance.

## Frame 11 — Механизм шаг 2: система

- status: animated
- src: index.html
- duration: 1.6s
- poster: 31
- transition_in: cut
- scene: Voice докуется в slot D (130px); gear/system icon входит рядом компактно; коннектор рисуется между ними; текст «систему» (red)
- voiceover: "закидываю свою систему"

Rules: direct transform tween (dock), svg-path-draw (коннектор), spring-pop-entrance (system icon), svg-icon-enrichment (шестерёнка вращается).

## Frame 12 — Payoff: callback

- status: animated
- src: index.html
- duration: 2.08s
- poster: 32.9
- transition_in: cut
- scene: Коннектор веером спускается в slot C; те же 3 канала с чекмарками; текст «готовый текст» (red)
- voiceover: "и на выходе получаю сразу готовый текст для всех трех каналов"

Rules: svg-path-draw (коннектор), spring-pop-entrance (чекмарки), 2-е и последнее появление callback-мотива.

## Frame 13 — Outro

- status: animated
- src: index.html
- duration: 0.95s
- poster: 34.5
- transition_in: cut
- scene: Freeze на собранной сцене payoff; чекмарки доигрывают settle; ничего нового не входит

Никакого CTA — по прямому указанию пользователя.
