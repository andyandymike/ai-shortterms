# AI Beyond Bigger Models

An HTML presentation about four concepts behind two shifts in recent AI progress.

The projected slides and the spoken layer are intentionally separate. Start with [speaker-notes.md](speaker-notes.md), then use the current [bilingual rehearsal script](speaker-notes-bilingual.md), where Chinese and plain English are paired step by step. Dedicated [Chinese](speaker-notes-zh.md) and [simple English](speaker-notes-en.md) talk tracks remain available for single-language delivery. The original detailed bilingual notes, alternate modes, caveats, and sources are preserved in [speaker-notes-reference.md](speaker-notes-reference.md).

## View on macOS

Requires Node.js 22.13 or newer.

```bash
cd deck
npm ci
npm run dev
```

Open the local URL printed in the terminal. The 30-minute route contains Opening, MoE, Distillation, World Model, VLA, and Closing. FDE and RSI remain implemented as a hidden backup part. World Model and VLA use locally packaged official Google DeepMind recordings, so the presentation itself works without internet access after installation. The main button inside each demo advances its internal story; the step rail jumps to a specific internal step. `Space` or `→` moves to the next global slide; `←` moves back, `R` resets the current scene, and `S` shows sources for the current slide.

## Production check

```bash
cd deck
npm run build
```

Dependencies and generated build files are intentionally excluded from Git. `npm ci` recreates the correct local dependencies on each machine.

Media origins and reuse boundaries are recorded in `deck/public/media/PROVENANCE.md`.
