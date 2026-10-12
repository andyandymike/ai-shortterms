import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

// The same cue plan drives the audience, presenter and all three standalone scripts.
const deckRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const content = fs.readFileSync(path.join(deckRoot, 'app/session-2/content.ts'), 'utf8');
const cues = JSON.parse(fs.readFileSync(path.join(deckRoot, 'app/session-2/cue-plan.json'), 'utf8'));
const beats = [...content.matchAll(/\{ id:'([OCJRE]\d+)', label:'([^']+)', title:'([^']+)'/g)]
  .map((match) => ({ id:match[1], label:match[2], title:match[3] }));
const cueBeats = cues.filter((cue, index) => index === 0 || cue.beat !== cues[index - 1].beat).map((cue) => cue.beat);
if (cueBeats.join() !== beats.map((beat) => beat.id).join()) throw new Error('Cue groups must match every presentation beat in order.');
if (new Set(cues.map((cue) => cue.id)).size !== cues.length) throw new Error('Cue IDs must be unique.');
for (const [index, cue] of cues.entries()) {
  for (const field of ['say','look','transition']) {
    if (!Array.isArray(cue[field]) || cue[field].length !== 2 || cue[field].some((value) => typeof value !== 'string')) {
      throw new Error(`${cue.id}: ${field} must be a Chinese/English pair.`);
    }
    if (field !== 'transition' && cue[field].some((value) => !value.trim())) throw new Error(`${cue.id}: ${field} is empty.`);
  }
  for (const field of ['label','labelEn','action','actionEn']) {
    if (typeof cue[field] !== 'string' || !cue[field].trim()) throw new Error(`${cue.id}: ${field} is empty.`);
  }
  const lastInBeat = cues[index + 1]?.beat !== cue.beat;
  if (cue.transition.some((value) => Boolean(value.trim()) !== lastInBeat)) {
    throw new Error(`${cue.id}: only the last cue of a beat should have a transition, in both languages.`);
  }
}
const output = path.join(deckRoot, 'public/notes/session-2');
fs.mkdirSync(output, { recursive:true });
const headings = [
  '# 第二场讲稿｜From Answers to Actions\n\nComputer Use → Jev → RSI。独立 Atlas 演示，以约 25 分钟安排排练，含观众观察与 Blender 短片；实际时长随语速与停顿调整。\n\n从观众页底部的 Presenter 打开讲者窗口，把观众页放到投影，讲者窗口留在自己的屏幕。讲者窗口显示当前口播、画面停在哪里，以及下一次点击会发生什么。\n\n整场沿一条顺序前进：每次按 Continue / 下一步，演示自动完成对应动作，在讲解点停住；需要翻页时也由这次点击完成。无需另外寻找 Play，也不用记住下一页。动画中主按钮用于暂停，暂停后用于继续播放；到达讲解点后才进入下一段。等动作完成，再讲该停顿点的「说」；「转」说完后继续。下面的「画面」「自动动作」「下一次继续」只给讲者看。\n',
  '# Talk 02 speaker notes | From Answers to Actions\n\nComputer Use → Jev → RSI. A standalone Atlas talk, budget about 25 minutes for rehearsal, including audience observation and the Blender film; adjust for speaking pace and pauses.\n\nOpen the presenter window with Presenter in the audience page footer. Put the audience page on the projector and keep the presenter window on your own screen. It shows the current spoken cue, where the visual stops, and what the next click will do.\n\nThe talk follows one sequence. Each Continue completes the relevant action automatically and stops at a speaking point. The same click also changes the page when needed. There is no separate Play step and no need to memorize the next page. During an animation the main button pauses it; when paused, the same button resumes it. Only at a speaking point does it advance to the next segment. Wait for the action to finish, then deliver SAY. After TRANSITION, continue. VISUAL, AUTOMATIC ACTION and NEXT CONTINUE are private presenter instructions.\n',
];
const labels = [
  {visual:'画面', action:'自动动作', say:'说', transition:'转', next:'下一次继续'},
  {visual:'VISUAL', action:'AUTOMATIC ACTION', say:'SAY', transition:'TRANSITION', next:'NEXT CONTINUE'},
];
function chapterFor(id) {
  return id[0] === 'C' ? 'computer-use' : id[0] === 'J' ? 'jev' : id[0] === 'R' ? 'rsi' : id[0] === 'O' ? 'opening' : 'closing';
}
function nextAction(index, lang) {
  const next = cues[index + 1];
  if (!next) return lang === 0 ? '讲解结束，停留在总结页，留出提问时间；结束后用主按钮返回目录。' : 'The talk is complete. Hold the closing page for questions; use the main button to return to the collection when finished.';
  const page = next.beat !== cues[index].beat ? (lang === 0 ? `进入 ${next.beat}；` : `Open ${next.beat}; `) : '';
  return page + (lang === 0 ? next.action : next.actionEn) + (lang === 0 ? '。动作完成后自动停下。' : '. The action stops automatically at the next speaking point.');
}
function fields(cue, index, lang) {
  const values = [
    [labels[lang].visual, cue.look[lang]],
    [labels[lang].action, lang === 0 ? cue.action : cue.actionEn],
    [labels[lang].say, cue.say[lang]],
  ];
  if (cue.transition[lang]) values.push([labels[lang].transition, cue.transition[lang]]);
  values.push([labels[lang].next, nextAction(index, lang)]);
  return values;
}
function cueHeading(cue, index, lang) { return `### ${index + 1} / ${cues.length} · ${lang === 0 ? cue.label : cue.labelEn}`; }
function beatHeader(beat, lang) {
  const open = lang === 0 ? '直达本页第一个停顿点' : 'Open the first cue of this beat';
  return `## ${beat.id} · ${beat.title}\n\n[${open}](/session-2#${chapterFor(beat.id)}/${beat.id})`;
}
for (const lang of [0,1]) {
  const body = beats.map((beat) => beatHeader(beat, lang) + '\n\n' + cues
    .flatMap((cue, index) => cue.beat === beat.id ? [cueHeading(cue,index,lang) + '\n\n' + fields(cue,index,lang).map(([label,value]) => `**${label}** ${value}`).join('\n\n')] : [])
    .join('\n\n')).join('\n\n---\n\n');
  fs.writeFileSync(path.join(output, lang === 0 ? 'speaker-notes-zh.md' : 'speaker-notes-en.md'), headings[lang] + '\n' + body + '\n');
}
const bilingualIntro = '# 第二场双语排练稿｜Talk 02 bilingual rehearsal\n\n中英口播使用同一份演示顺序；实际演讲选择一种语言，不需要各念一遍。以约 25 分钟安排排练，含观众观察与 Blender 短片；实际时长随语速与停顿调整。\n\n从观众页底部 Presenter 打开讲者窗口。只沿 Continue / 下一步前进：自动播放这一段，在讲解点停下，需要翻页时自动翻页。讲者窗口显示当前口播与下一次点击的结果。不要在投影上展示讲者窗口。\n\nOpen the presenter window from Presenter in the audience footer. Continue runs each segment and stops at the next speaking point, changing pages when needed. Keep that window on your own screen.\n\n只有「说 / SAY」与「转 / TRANSITION」是口播。先等动作完成，观察，再解释结果。说完转场再继续。All other fields are private presenter cues.\n\n';
const bilingual = bilingualIntro + beats.map((beat) => beatHeader(beat, 0) + '\n\n' + cues.flatMap((cue,index) => {
  if (cue.beat !== beat.id) return [];
  const zh = fields(cue,index,0), en = fields(cue,index,1);
  return [`### ${index + 1} / ${cues.length} · ${cue.label} / ${cue.labelEn}\n\n` + zh.map(([label,value],i) => `**${label} / ${en[i][0]}**\n\n中：${value}\n\nEN: ${en[i][1]}`).join('\n\n')];
}).join('\n\n')).join('\n\n---\n\n') + '\n';
fs.writeFileSync(path.join(output, 'speaker-notes-bilingual.md'), bilingual);
console.log(`Generated three synchronized speaker-note files for ${beats.length} beats and ${cues.length} cues.`);
