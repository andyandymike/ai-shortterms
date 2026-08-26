# AI Beyond Bigger Models

An HTML presentation about the vocabulary behind recent AI progress.

## View on macOS

Requires Node.js 22.13 or newer.

```bash
cd deck
npm ci
npm run dev
```

Open the local URL printed in the terminal. Use the arrow keys or space to move through the deck, and press `S` to show sources for the current slide.

## Production check

```bash
cd deck
npm run build
```

Dependencies and generated build files are intentionally excluded from Git. `npm ci` recreates the correct local dependencies on each machine.
