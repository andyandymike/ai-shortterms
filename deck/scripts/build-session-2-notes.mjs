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

Computer Use → Jev → RSI。共 **${pages.length} 页**，页内画面编号与 Presenter 一致。

**播放 → 自动停住 → 讲当前段落 → 继续。**动画和影片都等待点击播放；停住后没有讲解倒计时。引用块是画面提示，不用念；转场句单独列在每页最后。[操作说明与目录](index.md)。

`,
  `# Talk 02 speaker notes | From Answers to Actions

Computer Use → Jev → RSI. **${pages.length} pages**, with visual numbers matching Presenter.

**Play → automatic hold → speak this paragraph → continue.** Animations and the film wait for play; held visuals have no speaking countdown. Blockquotes identify the picture and are not spoken. Each page ends with a separate transition. [Controls and contents](index.md).

`,
];
function chapterFor(id) {
  return id[0] === 'C' ? 'computer-use' : id[0] === 'J' ? 'jev' : id[0] === 'R' ? 'rsi' : id[0] === 'O' ? 'opening' : 'closing';
}
function pageHeader(page, index, lang) {
  const link = lang === 0 ? '打开本页' : 'Open this page';
  return `## ${String(index + 1).padStart(2, '0')} · ${page.id}｜${page.title}\n\n[${link}](/session-2#${chapterFor(page.id)}/${page.id})`;
}
const pageVisuals = (page) => page.cues.flatMap((cue) => sceneSegments(cue.scene, cue.id));
function pageScript(page, lang) {
  const visuals = pageVisuals(page);
  const body = visuals.map((visual, index) => `> ${lang === 0 ? '画面' : 'Visual'} ${index + 1} / ${visuals.length} · ${visual.end[lang]}\n\n${visual.say[lang]}`).join('\n\n');
  return body + `\n\n**${lang === 0 ? '转场' : 'Transition'}｜** ${page.cues.at(-1).transition[lang]}`;
}
for (const lang of [0,1]) {
  const body = pages.map((page, index) => pageHeader(page, index, lang) + '\n\n' + pageScript(page, lang)).join('\n\n---\n\n');
  fs.writeFileSync(path.join(output, lang === 0 ? 'speaker-notes-zh.md' : 'speaker-notes-en.md'), intros[lang] + body + '\n');
}
const bilingualIntro = `# 第二场双语排练稿｜Talk 02 bilingual rehearsal

共 **${pages.length} 页**，按同一幅画面配对中英文；实际演讲选一种语言。先点击播放，自动停住后再讲当前段落，讲完继续。引用块只提示画面，转场句放在每页最后。[操作说明与目录](index.md)。

The languages are paired by visual; choose one for delivery. Press play, wait for the automatic hold, speak the current paragraph, then continue. Blockquotes identify the picture. Transitions appear at the end of each page.

`;
const bilingual = bilingualIntro + pages.map((page, index) => {
  const visuals = pageVisuals(page);
  const body = visuals.map((visual, visualIndex) => `> 画面 / Visual ${visualIndex + 1} / ${visuals.length} · ${visual.end[0]}\n>\n> ${visual.end[1]}\n\n**中文｜** ${visual.say[0]}\n\n**English｜** ${visual.say[1]}`).join('\n\n');
  const transition = page.cues.at(-1).transition;
  return pageHeader(page, index, 0) + '\n\n' + body + `\n\n**转场｜** ${transition[0]}\n\n**Transition｜** ${transition[1]}`;
}).join('\n\n---\n\n') + '\n';
fs.writeFileSync(path.join(output, 'speaker-notes-bilingual.md'), bilingual);
const index = `# 第二场｜From Answers to Actions

独立 Atlas 演示：**Computer Use → Jev → RSI**。共 **${pages.length} 页**，每章从独立术语页开始。讲稿按页面和页内画面组织，与 Presenter 使用同一份口播。

- [中文讲稿](speaker-notes-zh.md)
- [English script](speaker-notes-en.md)
- [中英对照排练稿](speaker-notes-bilingual.md)
- [术语、来源与事实边界](reference.md)
- [进入观众页](/session-2) · [回到两场目录](/)

## 现场怎么讲

1. 从观众页底部打开 **Presenter ↗**，观众页投影，讲者窗口留在自己屏幕。
2. 进入动画画面后，点击 **Play animation / 播放动画**；短过渡结束会自动停住。静态页可以直接讲。
3. 按“现在讲”读当前段落，讲完再继续。下一段讲稿默认折叠，右侧先预告下一个画面。
4. 本页最后一幅画面讲完，说转场句，再点下一页。进入下一幅动画不会自动播放。

动画进度只表示画面变化，没有讲解倒计时。无需边播放边赶着讲完。讲稿引用块是画面提示，不用念；中英文选一种讲。

## 控制

| 操作 | 作用 |
| --- | --- |
| 主按钮 / Space / → / Page Down / N | 待播放时开始；过渡中暂停；暂停后续播；停住后进入下一画面或下一页 |
| 上一步 / ← / Page Up | 回到上一幅画面，保留其结果 |
| 重播 / R | 重放当前画面的变化 |
| Presenter：直接到讲解画面 | 跳过变化，停在当前画面的结果 |
| 章节名 / 页内进度轨道 | 进入章节开场 / 指定页面；动画等待点击播放 |
| Sources / S | 查看来源；Escape 关闭 |

## 按页排练

${pages.map((page, i) => `${i + 1}. [${page.id} · ${page.title}](/session-2#${chapterFor(page.id)}/${page.id})`).join('\n')}

C4 依次保留定位结果、填好的表单和验证回执。R4 依次保留原程序 A、被拒绝的尝试 B、替换 A 的 C。每段口播只对应当时停住的结果。

## 开讲前

确认 Presenter 同步，试一次继续、回退和重播。Blender 影片约 30 秒，静音播放，结束后停住；若无法播放，显示案例静帧。它是创作成片，配合右侧流程讲解。

教学互动无需模型密钥或在线请求；排序程序在本地执行。来源与限制见[参考稿](reference.md)。整场时长以实际排练为准。
`;
fs.writeFileSync(path.join(output, 'index.md'), index);
console.log(`Generated index and three synchronized scripts: ${pages.length} page sections, ${viewCount} narrated visuals, ${cues.length} validated cue groups.`);
