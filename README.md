# AI Field Notes — The Atlas Collection

Two independent HTML talks. The root page is an Atlas-styled collection; neither talk is appended to the other.

| Entry | Talk | Route |
| --- | --- | --- |
| `/` | Collection | Choose talk 01 or talk 02 |
| `/session-1` | Beyond Bigger Models | Opening → MoE → Distillation → World Model → VLA → Closing |
| `/session-2` | From Answers to Actions | Opening → Computer Use → Jev → RSI → Closing |

Talk 02 uses Atlas only, with 16 pages and narration matched to the visuals within each page. It includes local Blender source footage and teaching interactions for action feedback, training, decoding, uncertainty, routing and algorithm selection. Each page has a shareable URL, for example `/session-2#jev/J2`. State and navigation are independent of talk 01.

The desktop holds each explanatory visual: observation and targeting, the completed form, and verification. It then introduces a stale screenshot and pop-up recovery. C7 compares training with inference using fixed weights. The Blender page plays the published film alongside its bpy / render / Computer Use workflow. Jev uses one decoding path, compares ordinary LLM and typed decision outputs, separates training from held-out evaluation, and connects an ambiguous request to routing on the same page. The sorting experiment runs locally, pausing before B is checked; R6 similarly pauses after a hypothetical successor is trained, before independent evaluation. Each visual stays in place until the presenter has finished its paragraph and chooses to continue.

Open **Presenter ↗** in the audience footer to get a synchronized presenter window. Keep it on your own screen and put the audience window on the projector. Presenter shows narration for the current visual and previews the next click. A short transition ends in a visual that holds indefinitely. The main control then advances to the next visual or, at the end of the page, the next page. Transition progress is not a speaking countdown. Direct page links, chapter jumps and refreshes prepare the animation and wait for you to start. The presenter link is created by the audience window so both share a session; open it there.

## Talk 02 notes

The projected slides are English. The spoken layer is separate: [notes index](deck/public/notes/session-2/index.md), [Chinese](deck/public/notes/session-2/speaker-notes-zh.md), [plain English](deck/public/notes/session-2/speaker-notes-en.md), [bilingual rehearsal](deck/public/notes/session-2/speaker-notes-bilingual.md), and [sources / terminology / claim boundaries](deck/public/notes/session-2/reference.md).

The three scripts and the live presenter use the same bilingual source, `deck/app/session-2/cue-plan.json`. Each script has 16 page sections, with its existing narration divided by visual and brief notes identifying the held image. The generator reads each scene segment’s narration and endpoint from the same scene plan as the controls; there is no separate global list of numbered speaking points. After changing narration, run `npm run notes:session-2` inside `deck`; the generator checks page order, unique cue IDs, paired language fields and each scene’s narration, label and endpoint, then rebuilds the scripts. The generator itself is `deck/scripts/build-session-2-notes.mjs`.

## Talk 01 notes

The projected slides and the spoken layer are intentionally separate. Start with [speaker-notes.md](speaker-notes.md), then use the current [bilingual rehearsal script](speaker-notes-bilingual.md), where Chinese and plain English are paired step by step. Dedicated [Chinese](speaker-notes-zh.md) and [simple English](speaker-notes-en.md) talk tracks remain available for single-language delivery. The original detailed bilingual notes, alternate modes, caveats, and sources are preserved in [speaker-notes-reference.md](speaker-notes-reference.md).

## Sites publication

[Open the published collection](https://ai-shortterms-atlas.andyandyandylu.chatgpt.site). Published on 12 October 2026 with owner-only access. Choose talk 02 for Computer Use, Jev and RSI; open Presenter from the audience footer.

The Site identity is saved in `deck/.openai/hosting.json`. Authoring stays in `deck/`; the independent Sites source checkout is `.sites-publish/ai-field-notes`, ignored by this GitHub repository. For later releases, open that Site checkout with the Sites workflow and copy the current presentation source into it before building and publishing. Do not initialize another Git repository inside `deck/` or create a replacement Site.

## Run locally (Windows or macOS)

Requires Node.js 22.13 or newer.

```bash
cd deck
npm ci
npm run dev
```

Open the local URL printed in the terminal. Talk 01 retains its original content and alternate visual modes; FDE and the old RSI remain hidden backup material there. Its active World Model and VLA clips are from Google DeepMind and Unitree respectively. Talk 02 includes the official OpenAI / Thomas Ricouard Blender case. All presentation media is packaged locally and can play without external internet access after installation.

For **talk 02**, the main button, `Space`, `→`, `Page Down` and `N` all control the same sequence. In the prepared state they start the current visual’s transition; during playback they pause it; when paused they resume it; once it holds, they advance to the next visual or page. The held visual waits indefinitely for the presenter. `←` / `Page Up` returns to the previous held visual, and `R` replays only the current visual’s transition. Chapter endings continue into the next chapter. On the closing page, the main button returns to the collection. The page rail and chapter names jump directly to a prepared page. Presenter also offers “直接到讲解画面” to hold the current visual’s result immediately.

In the audience window, `S` opens sources, `Escape` closes them, and `Home` / `End` jumps to the opening / closing. The film uses the same pause/resume control as other segments. The talk 02 footer returns to the collection. Talk 01 retains its existing controls, including chapter navigation with `Space` / `→` / `←` and chapter replay with `R`.

## Production check

```bash
cd deck
npm run build
```

Dependencies and generated build files are intentionally excluded from Git. `npm ci` recreates the correct local dependencies on each machine.

Media origins and reuse boundaries are recorded in [talk 01 provenance](deck/public/media/PROVENANCE.md) and [talk 02 provenance](deck/public/media/session-2/PROVENANCE.md). The Blender film is a rendered result, not an agent-action recording. All other new interactive scenes are explicitly labeled teaching simulations or documented source examples; no live model requests are made.
