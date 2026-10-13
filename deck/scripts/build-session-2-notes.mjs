import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

// One content source drives the audience, presenter and page-based speaker notes.
const deckRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const content = fs.readFileSync(path.join(deckRoot, 'app/session-2/content.ts'), 'utf8');
const cues = JSON.parse(fs.readFileSync(path.join(deckRoot, 'app/session-2/cue-plan.json'), 'utf8'));
const beats = [...content.matchAll(/\{ id:'([OCJRE]\d+)', label:'([^']+)', title:'([^']+)'/g)]
  .map((match) => ({ id:match[1], label:match[2], title:match[3] }));
const cueBeats = cues.filter((cue, index) => index === 0 || cue.beat !== cues[index - 1].beat).map((cue) => cue.beat);
if (cueBeats.join() !== beats.map((beat) => beat.id).join()) throw new Error('Cue groups must match every presentation beat in order.');
if (new Set(cues.map((cue) => cue.id)).size !== cues.length) throw new Error('Cue IDs must be unique.');
function requirePair(value, name, allowEmpty = false) {
  if (!Array.isArray(value) || value.length !== 2 || value.some((item) => typeof item !== 'string')) {
    throw new Error(`${name} must be a Chinese/English pair.`);
  }
  if (!allowEmpty && value.some((item) => !item.trim())) throw new Error(`${name} is empty.`);
}
function sceneSegments(scene, cueId) {
  if (!scene || typeof scene.kind !== 'string') throw new Error(`${cueId}: scene.kind is missing.`);
  if (scene.kind === 'sequence') {
    if (!Array.isArray(scene.segments) || !scene.segments.length) throw new Error(`${cueId}: scene.segments is empty.`);
    return scene.segments.flatMap((segment) => sceneSegments(segment, cueId));
  }
  requirePair(scene.label, `${cueId}: scene.label`);
  requirePair(scene.end, `${cueId}: scene.end`);
  requirePair(scene.say, `${cueId}: scene.say`);
  return [scene];
}
for (const [index, cue] of cues.entries()) {
  for (const field of ['say','look','transition']) requirePair(cue[field], `${cue.id}: ${field}`, field === 'transition');
  for (const field of ['label','labelEn','action','actionEn']) {
    if (typeof cue[field] !== 'string' || !cue[field].trim()) throw new Error(`${cue.id}: ${field} is empty.`);
  }
  const lastInBeat = cues[index + 1]?.beat !== cue.beat;
  if (cue.transition.some((value) => Boolean(value.trim()) !== lastInBeat)) {
    throw new Error(`${cue.id}: only the last cue of a beat should have a transition, in both languages.`);
  }
  sceneSegments(cue.scene, cue.id);
}
const pages = beats.map((beat) => ({ ...beat, cues:cues.filter((cue) => cue.beat === beat.id) }));
const viewCount = cues.flatMap((cue) => sceneSegments(cue.scene, cue.id)).length;
const output = path.join(deckRoot, 'public/notes/session-2');
fs.mkdirSync(output, { recursive:true });

const intros = [
  `# 第二场讲稿｜From Answers to Actions

Computer Use → Jev → RSI。按 **${pages.length} 页**组织口播，同一页内按画面分成相应段落。

打开观众页底部的 **Presenter ↗**，把观众页放到投影，讲者窗口留在自己的屏幕。Presenter 显示当前画面的口播，以及下一次点击会出现什么。

**短过渡后，画面自动停住，讲多久都可以。**讲完当前段落，再按主按钮进入下一画面；本页讲完后，同一按钮进入下一页。画面不会自行继续，显示的过渡进度不限制讲解时间。

通过目录、章节链接或刷新进入时，先准备本页画面，等你点击开始。下文短引用块标出当前留住的画面，不用念。正文对应这一画面；回退和重播也只针对当前画面。Blender 成片约 30 秒，播放结束后同样停住，可再解释制作流程。

`,
  `# Talk 02 speaker notes | From Answers to Actions

Computer Use → Jev → RSI. The script follows **${pages.length} pages**, with paragraphs matched to the visuals within each page.

Open **Presenter ↗** in the audience footer. Put the audience view on the projector and keep the presenter window on your screen. Presenter shows the narration for the current visual and what the next click will reveal.

**After a short transition, the visual holds for as long as you need.** Finish the corresponding paragraph, then use the main button for the next visual or, at the end of the page, the next page. The visual never advances by itself. Transition progress is not a limit on speaking time.

A directory entry, chapter link or refresh prepares the page and waits for you to start. The short blockquotes identify the visual to hold; they are not spoken. Each paragraph belongs to that visual. Back and replay also apply to the current visual. The Blender film runs for about thirty seconds, then holds so you can explain its workflow.

`,
];
function chapterFor(id) {
  return id[0] === 'C' ? 'computer-use' : id[0] === 'J' ? 'jev' : id[0] === 'R' ? 'rsi' : id[0] === 'O' ? 'opening' : 'closing';
}
function pageHeader(page, index, lang, bilingual = false) {
  const title = bilingual ? `${page.cues[0].label} / ${page.title}` : lang === 0 ? page.cues[0].label : page.title;
  const link = lang === 0 ? '打开本页' : 'Open this page';
  return `## ${String(index + 1).padStart(2, '0')} · ${page.id}｜${title}\n\n[${link}](/session-2#${chapterFor(page.id)}/${page.id})`;
}
function pageScript(page, lang) {
  const paragraphs = [];
  for (const cue of page.cues) {
    const segments = sceneSegments(cue.scene, cue.id);
    for (const [index, segment] of segments.entries()) {
      if (segment.kind !== 'static') {
        paragraphs.push(lang === 0 ? `> 留住画面：${segment.end[lang]}` : `> Hold this visual: ${segment.end[lang]}`);
      }
      const transition = index === segments.length - 1 ? cue.transition[lang] : '';
      paragraphs.push(segment.say[lang] + (transition ? (lang === 0 ? '' : ' ') + transition : ''));
    }
  }
  return paragraphs.join('\n\n');
}
for (const lang of [0,1]) {
  const body = pages.map((page, index) => pageHeader(page, index, lang) + '\n\n' + pageScript(page, lang)).join('\n\n---\n\n');
  fs.writeFileSync(path.join(output, lang === 0 ? 'speaker-notes-zh.md' : 'speaker-notes-en.md'), intros[lang] + body + '\n');
}
const bilingualIntro = `# 第二场双语排练稿｜Talk 02 bilingual rehearsal

同一份内容按 **${pages.length} 页**组织，实际演讲选一种语言。页内段落对应当前留住的画面，不增加新的讲解主题。

打开观众页底部的 **Presenter ↗**。每次短过渡后，画面自动停住，留给讲者和观众充分时间。讲完当前段落，再按主按钮进入下一画面或下一页；不会按倒计时催你继续。引用块只标画面，不用念。目录、章节链接与刷新先准备画面；回退和重播针对当前画面。

Choose one language for the talk. Each visual holds after its short transition for as long as you need. Finish its paragraph, then use the main button for the next visual or page. No countdown controls speaking time. Blockquotes identify the visual and are not spoken. Direct navigation prepares the page; Back and Replay apply to the current visual.

`;
const bilingual = bilingualIntro + pages.map((page, index) => pageHeader(page, index, 0, true)
  + '\n\n**中文**\n\n' + pageScript(page, 0)
  + '\n\n**English**\n\n' + pageScript(page, 1)).join('\n\n---\n\n') + '\n';
fs.writeFileSync(path.join(output, 'speaker-notes-bilingual.md'), bilingual);
console.log(`Generated three synchronized scripts: ${pages.length} page sections, ${viewCount} narrated visuals, ${cues.length} validated cue groups.`);
