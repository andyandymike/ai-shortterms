# AI Field Notes — The Atlas Collection

Two independent HTML talks. The root page is an Atlas-styled collection; neither talk is appended to the other.

| Entry | Talk | Route |
| --- | --- | --- |
| `/` | Collection | Choose talk 01 or talk 02 |
| `/session-1` | Beyond Bigger Models | Opening → MoE → Distillation → World Model → VLA → Closing |
| `/session-2` | From Answers to Actions | Opening → Computer Use → Jev → RSI → Closing |

Talk 02 uses Atlas only, with 21 story beats and 42 guided speaking points, local Blender source footage, and teaching interactions for action feedback, training, decoding, uncertainty, routing, and algorithm selection. Each beat has a shareable URL, for example `/session-2#jev/J2`. State and navigation are independent of talk 01.

Its experiments show processes: a desktop with typing, stale screenshots and pop-up recovery; conditional token choices and message-driven routing; and locally executing sorting candidates with independent checks. The Blender case starts with a build/render/inspect teaching animation, then plays the published film. C7 replaces a recap with practice feedback, weight updates and inference with fixed weights. J5 separates varied training feedback from evaluation on a new batch. R6 replaces a static boundary diagram with a hypothetical training-recipe change, successor training and independent research evaluation before another cycle. Repeated submission, recovery, token and sorting sequences are merged or shortened. A single Continue sequence runs each segment, stops at a speaking point, and changes the page or chapter when needed.

Open **Presenter ↗** in the audience footer to get a synchronized presenter window. Keep it on your own screen and put the audience window on the projector. The presenter sees the current visual, spoken cue and next-click action. Its link is created by the audience window so the two windows share the same session; start there rather than opening an unrelated presenter page.

## Talk 02 notes

The projected slides are English. The spoken layer is separate: [notes index](deck/public/notes/session-2/index.md), [Chinese](deck/public/notes/session-2/speaker-notes-zh.md), [plain English](deck/public/notes/session-2/speaker-notes-en.md), [bilingual rehearsal](deck/public/notes/session-2/speaker-notes-bilingual.md), and [sources / terminology / claim boundaries](deck/public/notes/session-2/reference.md).

The three scripts and the live presenter use the same bilingual source, `deck/app/session-2/cue-plan.json`. Scenes stop at explanatory moments; repeated actions and their checks now complete together. After changing narration, run `npm run notes:session-2` inside `deck`; the generator checks beat order, unique cue IDs and paired language fields, then rebuilds the three scripts. The generator itself is `deck/scripts/build-session-2-notes.mjs`.

## Talk 01 notes

The projected slides and the spoken layer are intentionally separate. Start with [speaker-notes.md](speaker-notes.md), then use the current [bilingual rehearsal script](speaker-notes-bilingual.md), where Chinese and plain English are paired step by step. Dedicated [Chinese](speaker-notes-zh.md) and [simple English](speaker-notes-en.md) talk tracks remain available for single-language delivery. The original detailed bilingual notes, alternate modes, caveats, and sources are preserved in [speaker-notes-reference.md](speaker-notes-reference.md).

## Sites publication

[Open the published collection](https://ai-shortterms-atlas.andyandyandylu.chatgpt.site). Published on 3 October 2026 with owner-only access. Choose talk 02 for Computer Use, Jev and RSI; open Presenter from the audience footer.

The Site identity is saved in `deck/.openai/hosting.json`. Authoring stays in `deck/`; the independent Sites source checkout is `.sites-publish/ai-field-notes`, ignored by this GitHub repository. For later releases, open that Site checkout with the Sites workflow and copy the current presentation source into it before building and publishing. Do not initialize another Git repository inside `deck/` or create a replacement Site.

## Run locally (Windows or macOS)

Requires Node.js 22.13 or newer.

```bash
cd deck
npm ci
npm run dev
```

Open the local URL printed in the terminal. Talk 01 retains its original content and alternate visual modes; FDE and the old RSI remain hidden backup material there. Its active World Model and VLA clips are from Google DeepMind and Unitree respectively. Talk 02 includes the official OpenAI / Thomas Ricouard Blender case. All presentation media is packaged locally and can play without external internet access after installation.

For **talk 02**, the main button, `Space`, `→`, `Page Down` and `N` all control the same sequence. At a speaking point they continue; while an animation is running they pause it; when paused they resume that segment. `←` / `Page Up` goes to the previous speaking point, and `R` replays the current segment. `Home` / `End` goes to the opening / closing. Chapter endings continue straight into the next chapter. On the closing page, the main button returns to the collection. The beat rail and chapter names provide direct jumps. The presenter also offers “直接看结果” to finish the current segment immediately when time is short.

In the audience window, `S` opens sources, `Escape` closes them, and `Home` / `End` jumps to the opening / closing. The film uses the same pause/resume control as other segments. The talk 02 footer returns to the collection. Talk 01 retains its existing controls, including chapter navigation with `Space` / `→` / `←` and chapter replay with `R`.

## Production check

```bash
cd deck
npm run build
```

Dependencies and generated build files are intentionally excluded from Git. `npm ci` recreates the correct local dependencies on each machine.

Media origins and reuse boundaries are recorded in [talk 01 provenance](deck/public/media/PROVENANCE.md) and [talk 02 provenance](deck/public/media/session-2/PROVENANCE.md). The Blender film is a rendered result, not an agent-action recording. All other new interactive scenes are explicitly labeled teaching simulations or documented source examples; no live model requests are made.
