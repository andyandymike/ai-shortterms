# AI Beyond Bigger Models

An HTML presentation about the vocabulary behind recent AI progress.

The projected slides and the spoken layer are intentionally separate. See [speaker-notes.md](speaker-notes.md) for the full talk track, examples, caveats, and transitions.

## View on macOS

Requires Node.js 22.13 or newer.

```bash
cd deck
npm ci
npm run dev
```

Open the local URL printed in the terminal. Use the on-screen controls for the staged MoE, distillation, World Model → VLA, FDE, and RSI scenes. The World Model → VLA scene uses locally packaged official Google DeepMind recordings, so the presentation itself works without internet access after installation. `Space` or `→` moves to the next slide; `←` moves back, `R` resets the current scene, and `S` shows sources for the current slide.

## Production check

```bash
cd deck
npm run build
```

Dependencies and generated build files are intentionally excluded from Git. `npm ci` recreates the correct local dependencies on each machine.

Media origins and reuse boundaries are recorded in `deck/public/media/PROVENANCE.md`.
