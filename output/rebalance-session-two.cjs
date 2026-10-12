const fs = require('node:fs');
const path = require('node:path');
const root = 'D:/Code/ai-shortterms/.sites-publish/ai-field-notes';
const read = file => fs.readFileSync(path.join(root,file),'utf8');
const write = (file,body) => fs.writeFileSync(path.join(root,file),body);
const replace = (file,from,to) => { const body=read(file); if(!body.includes(from)) throw new Error(`Missing text: ${file}: ${from.slice(0,50)}`); write(file,body.replace(from,to)); };
let plan = JSON.parse(read('app/session-2/cue-plan.json'));
fs.writeFileSync('D:/Code/ai-shortterms/output/session-two-before.json',JSON.stringify(plan,null,2));
const get=id=>plan.find(c=>c.id===id);
const set=(id,patch)=>Object.assign(get(id),patch);
const cue=(id,beat,label,labelEn,action,actionEn,scene,look,say,transition=['',''])=>({id,beat,label,labelEn,action,actionEn,scene,look,say,transition});
set('C4-submit',{
 label:'提交，再用新截图验证',labelEn:'Submit, then verify in a fresh screenshot',
 action:'提交申请，自动取回截图并确认回执',actionEn:'Submit, capture a fresh screen and confirm the receipt',
 scene:{kind:'desktop',from:7,to:11},
 look:get('C4-verify').look,
 say:['应用先出现 R-204，随后新截图把回执带进 context，模型才拿到完成的证据。Agent 把目标、观察、工具和反馈串成循环。看过表单、点过提交都不够，要确认应用真的达到了目标。','The app first shows R-204. A fresh screenshot then brings that receipt into context, giving the model evidence of completion. The agent connects the goal, observations, tools and feedback. Seeing the form or clicking Submit is not enough; check that the application reached the goal.'],
 transition:get('C4-verify').transition
});
set('C5-recover',{
 label:'重新观察，修正动作',labelEn:'Observe again and change the action',
 action:'取回新截图，关闭弹窗，重新提交并验证',actionEn:'Capture the popup, close it, resubmit and verify',
 scene:{kind:'desktop',from:9,to:17,interrupted:true},
 say:['新截图把弹窗带进 context，下一步就变成先关闭它，再重新提交、确认回执。这里的修正来自新观察；模型的 weights，也就是内部学到的参数，并没有在这次操作中重新训练。','The fresh screenshot brings the popup into context. The next action becomes closing it, then resubmitting and checking the receipt. The correction follows new evidence. The model’s weights, its learned internal parameters, are not retrained during this interaction.']
});
const c7transition=get('C7-summary').transition;
const c7=[
 cue('C7-practice','C7','操作能力从练习与反馈而来','Practice and feedback shape the ability',
 '尝试一次点击，检查失败结果','Try a click and inspect the failed result',{kind:'learning',from:0,to:2},
 ['目标是创建退货，模型却点了取消；没有回执，任务失败成为反馈。','The goal is to create a return, but the model clicks Cancel. No receipt appears; failure provides feedback.'],
 ['刚才看的是使用，现在看训练。目标是创建退货，模型却点了取消；点击执行了，任务没有完成。训练会检查结果，让成功和失败提供反馈。图里是简化的练习，不是在浏览器里训练真实模型。','We have seen the model in use. Now consider training. The goal is a return, but the model clicks Cancel. The action ran; the task failed. Training checks outcomes so successes and failures can provide feedback. This is a simplified exercise, not a live model being trained in the browser.']),
 cue('C7-update','C7','许多练习改变 weights','Many practice tasks change weights',
 '展开多种任务，让反馈引导参数更新','Show varied tasks and feedback guiding a weight update',{kind:'learning',from:3,to:5},
 ['多种任务的成功与失败汇入训练信号，模型格子的数值示意从 v1 变为 v2。','Successes and failures across tasks supply a training signal. The illustrative weight grid changes from v1 to v2.'],
 ['练习许多任务，把反馈用于调整 weights：模型内部影响判断的可调数值。反复小幅调整，才可能学到更好的操作方式。Reinforcement learning，强化学习，就是利用结果反馈学习行动的一类方法；OpenAI 的 CUA 使用了这条路线。','Practice many tasks and use feedback to adjust weights: internal, adjustable numbers that influence predictions. Repeated small updates can teach better actions. Reinforcement learning is a family of methods that learn actions from outcome feedback. OpenAI used this route for CUA.']),
 cue('C7-use','C7','使用时换 context，参数保持不变','New context with the same learned weights',
 '换一张布局不同的截图，定位新的按钮位置','Use a different layout and locate the button again',{kind:'learning',from:6,to:7},
 ['按钮位置变了，模型读取新截图，重新定位；v2 的 weights 保持固定。','The button has moved. The model uses the new screenshot to locate it; v2’s weights stay fixed.'],
 ['训练后换一张布局不同的画面。新截图进入 context，模型用学到的能力重新找按钮。这里变化的是这次能看到的信息，weights 保持不变。看新截图、修正动作，通常属于 inference，也就是使用已经训练好的模型。','After training, show a different layout. The screenshot enters context, and the model uses its learned ability to locate the button again. The available information changes; the weights stay fixed. Reading a new screenshot and correcting an action normally happens during inference: using an already trained model.'],c7transition)
];
plan.splice(plan.findIndex(c=>c.id==='C7-summary'),1,...c7);
set('J2-we',{
 label:'换开头，观察后续怎样改变',labelEn:'Change the beginning and watch what follows',
 action:'改选 We，再自动生成 can help .','actionEn':'Choose We, then generate can help .',
 scene:{kind:'tokens',tokens:['We','can','help','.'],from:0,to:4},
 look:['开头换成 We，候选随之改变；We can help . 逐 token 完成。','Choosing We changes the candidates. We can help . completes one token at a time.'],
 say:['换成 We，后面就适合接 can 或 will，再逐步生成完整句子。每个选入的 token 都会影响下一步。这里自动选最高概率；按概率采样是另一种规则。Decoding 说的就是这一套逐步选取的过程。','Choose We, and can or will becomes a suitable continuation. Repeat until the sentence is complete. Each selected token conditions the next step. This demo takes the highest probability; sampling is another rule. Decoding is this step-by-step selection process.'],
 transition:get('J2-finish').transition
});
set('J3-jev',{say:[
 'Jev 面向预先定义的判断，不自由续写文本。多个问题共用 state，独立判断，可以并行处理；结果和概率交给代码选分支。TypeSafe 还把训练目标放在判断和校准概率上。是否比普通 LLM 合适，要比较实际任务；这里演示输出关系，不是内部架构或速度测试。',
 'Jev handles predefined decisions rather than freely continuing text. Questions share state, are evaluated independently and can run in parallel. Code uses the results and probabilities to choose a branch. TypeSafe also targets decisions and calibrated probabilities in training. Whether it fits better than an ordinary LLM needs testing on real tasks. This shows output relationships, not internal architecture or measured speed.'
]});
set('J5-feedback',{
 scene:{kind:'calibration',from:0,to:2},
 say:['这封邮件说扣了两次钱，鞋子要留着。已知答案是账单问题，模型却选了退货，还给出 0.95。训练先把预测和答案放在一起比较，让错误形成反馈。一次高概率的错误，还不能判断模型整体是否校准。','The customer was charged twice and wants to keep the shoes. The known answer is billing, but the model chose returns with probability 0.95. Comparing its prediction with the answer provides training feedback. One confident mistake cannot establish whether the model is calibrated overall.']
});
set('J5-update',{
 label:'反馈怎样改变模型',labelEn:'How feedback changes the model',
 action:'展开多种训练案例，示意反馈与 weights 更新',actionEn:'Show varied cases, training feedback and a weight update',
 scene:{kind:'calibration',from:3,to:5},
 look:['不同工单与已知结果提供训练反馈，weights 格子变化，模型从 v1 变为 v2。','Varied tickets and known outcomes provide feedback. The weight grid changes, taking the model from v1 to v2.'],
 say:['许多例子的反馈变成训练信号，用来调整 weights，影响以后面对新输入时的判断。TypeSafe 将这条路线称为 RLCD：Reinforcement Learning for Calibrated Decisions，面向判断与校准概率的强化学习。这里展示通用原理；公开说明没有给出具体更新算法。','Feedback from many examples becomes a signal for adjusting weights, affecting judgments on future inputs. TypeSafe calls its approach RLCD: Reinforcement Learning for Calibrated Decisions. It targets decisions and calibrated probabilities. This shows the general principle; the public explanation does not specify the update algorithm.']
});
set('J5-heldout',{
 action:'一次揭晓整组独立新案例，比较预测概率与实际结果',actionEn:'Reveal the separate batch together and compare predictions with outcomes',
 scene:{kind:'calibration',from:6,to:7},
 look:['v2 的 weights 固定；另一批新题报出约 0.8，十个结果同时揭晓，八对两错。','v2’s weights stay fixed. A separate batch has predictions near 0.8; all ten outcomes appear together, eight correct and two wrong.'],
 say:['换一批没参与训练的新题。Calibration 检查许多相近概率的预测，和实际发生的频率能否对上。这里的 0.8 属于新题，不是把旧答案的 0.95 调低；也不保证每十题恰好八对。十道教学题不能证明训练已经改善模型。','Use cases that did not contribute to training. Calibration asks whether many predictions with similar probabilities match observed frequencies. This 0.8 belongs to new cases; it is not a reduction of the earlier 0.95, nor a guarantee of eight successes in every ten. Ten teaching cases cannot prove that training improved the model.']
});
set('J6-distribution',{say:[
 '邮件现在既要退货，又有重复扣款。退货排第一，账单也占了明显一部分。0.61 是某个选项的概率，confidence 则概括整个分布的形状。它们不是两个版本的正确率，分歧会影响接下来的流程。',
 'The message now asks for a return and reports a duplicate charge. Returns leads, but billing also has substantial probability. The 0.61 describes an option; confidence summarizes the distribution’s shape. These are not two versions of accuracy. The ambiguity matters for the next workflow step.'
]});
set('R4-b',{
 label:'更少操作，却没有做对',labelEn:'Less work, but the wrong result',
 action:'运行 B，自动检查并拒绝错误候选',actionEn:'Run B, check it and reject the faulty candidate',
 scene:{kind:'sort',candidate:'B',run:true,checked:true},look:get('R4-reject').look,
 say:['B 只走一遍，操作少了，但顺序还不对。自动检查把错误标红，保留者仍然是 A。少做了工作，却没完成任务，就不能算改进。','B makes one pass and uses less work, but the output is still out of order. The check marks the errors red, and A stays retained. Less work without completing the task is not an improvement.']
});
set('R4-c',{
 say:['C 把每个新数字插入已经有序的左侧。它通过六项检查，并在同一组测试上做了更少的工作，这次才替换 A。留下的是可复用的程序；六项测试只支持这组结果，既不证明所有输入都正确，也不证明完整 RSI。','C inserts each new item into the sorted left side. It passes all six checks and uses less work on the same suite, so it replaces A. What persists is a reusable program. Six tests support a bounded result, not correctness for every input or proof of full RSI.'],
 transition:get('R4-transfer').transition
});
const r6transition=get('R6-gap').transition;
const r6=[
 cue('R6-recipe','R6','A 提出修改训练配方','A proposes a training-recipe change',
 '找出缺少失败案例的问题，补进排查练习','Find missing failure examples and propose diagnostic exercises',{kind:'successor',from:0,to:1},
 ['A 发现训练材料几乎只有成功案例；新配方补进失败实验与原因。','A finds mostly successful training examples. The proposed recipe adds failed experiments and their diagnoses.'],
 ['先看一条假设路径。AI A 发现训练材料几乎只有成功实验，于是提出：补进不同失败原因，以及怎样排查的练习。这里改的是下一代的训练数据配方。补了材料不代表一定更强，还要经过训练和检验。','Consider a hypothetical route. AI A notices that the training material mostly shows successful experiments. It proposes examples of different failures and how to investigate them. That changes a successor’s training-data recipe. Adding examples does not guarantee a stronger model; the proposal still needs training and testing.']),
 cue('R6-train','R6','按新配方训练 B','Train B using the new recipe',
 '展示做练习、比较 loss、更新 weights 的过程','Show practice, loss comparison and weight updates',{kind:'successor',from:2,to:3},
 ['新材料进入 B 的训练；练习与目标比较得到 loss，参数格子随更新变化。','The new examples enter B’s training. Comparing attempts with targets produces loss, and the weight grid changes.'],
 ['接着按新配方训练 B：做练习，对照目标计算 loss，也就是误差，再调整 weights，如此反复。这里变化的是保存下来的参数；让模型重答一遍，通常只改变这次输出。训练完成，也还不能宣布 B 更强。','Next, train B using the new recipe: attempt examples, compare with targets to calculate loss, an error score, then adjust weights and repeat. Saved parameters change. Asking for another reply usually changes only the current output. Completing training does not yet establish that B is stronger.']),
 cue('R6-next','R6','检查能力，再尝试下一轮','Evaluate the ability before another cycle',
 '独立比较 A 与 B 的研究能力，再显示通往 C 的条件箭头','Compare A and B on separate research tasks, then show the conditional path to C',{kind:'successor',from:4,to:5},
 ['独立新任务比较 A 与 B；只有研究能力确有改善，才进入 B 帮助改进 C 的尝试。','Separate research tasks compare A and B. Evidence of improved research ability is required before B attempts to help improve C.'],
 ['拿没用于训练的研究任务，比较 A 和 B：谁能找准失败原因，提出值得做的实验？只有研究能力确实改善，才有理由让 B 尝试下一轮修改。它能否再造出更好的后继，仍需逐轮验证。人继续设定目标、评估、权限与停止条件。','Compare A and B on research tasks not used for training: which can diagnose a failure and propose a useful experiment? Evidence of improved research ability would justify asking B to attempt another change. Whether it can help build a better successor still needs checking each cycle. People continue to set objectives, evaluation, permissions and stopping conditions.'],r6transition)
];
plan.splice(plan.findIndex(c=>c.id==='R6-gap'),1,...r6);
const removed=['C4-verify','C5-observe','J2-finish','J6-mixed','R4-reject','R4-new','R4-transfer'];
plan=plan.filter(c=>!removed.includes(c.id));
if(plan.length!==42)throw new Error(`Expected 42 cues, got ${plan.length}`);
write('app/session-2/cue-plan.json',JSON.stringify(plan,null,2)+'\n');
// Remove the replaced scene so the retired calibration sequence cannot drift.
write('app/session-2/jev-lab.tsx',read('app/session-2/jev-lab.tsx').split('\nexport function CalibrationLab()')[0].trimEnd()+'\n');
replace('app/session-2/content.ts',"{ id:'C7', label:'Takeaway', title:'Give the agent a way to check.', subtitle:'The same loop connects simple forms and complex creative software.', takeaway:'Define the goal, give the right tools, and inspect the actual result.', next:'Replay chapter' }","{ id:'C7', label:'Training and use', title:'Practice changes the model.', subtitle:'Training updates weights. Inference uses the learned model with new context.', takeaway:'Feedback from many practice tasks can shape later actions. A new screenshot alone does not retrain the model.', next:'From actions to decisions' }");
replace('app/session-2/content.ts',"next:'What makes this useful?'","next:'How does it learn to act?'");
replace('app/session-2/content.ts',"{ id:'R6', label:'The gap and boundaries', title:'A better component. A better improver?', subtitle:'Optimizing a component does not establish repeated cycles of better AI researchers.', takeaway:'The successor must improve research ability again. People set the objective, evaluation, permissions, and stopping rule.', next:'Bring the three questions together' }","{ id:'R6', label:'The recursive step', title:'Train a successor. Test the improver.', subtitle:'A hypothetical path from a changed recipe to the next research cycle.', takeaway:'A recipe change must improve research ability before the successor can use it to attempt the next cycle.', next:'Bring the three questions together' }");
replace('app/session-2/content.ts',"  'computer-use': [","  'computer-use': [\n    'C7 illustrates a generic reinforcement-learning principle: practice across tasks, inspect outcomes, and use feedback for parameter updates. OpenAI described CUA as using reinforcement learning. The diagram is not a disclosed CUA training algorithm or a live training run. At inference, new screenshots change context while the illustrated model weights remain fixed.',");
replace('app/session-2/content.ts',"  rsi: [","  rsi: [\n    'R6 is a hypothetical training-data change: add failed experiments and diagnoses, train a successor using target comparisons and loss, then independently test research ability. It is one possible route, not the definition of all RSI methods, a live training run, or an established improvement. The next cycle remains conditional on evidence.',");
replace('app/session-2/content.ts','const computerSources = [',"const computerSources = [\n  { label: 'OpenAI · CUA: vision and reinforcement learning', url: 'https://openai.com/index/computer-using-agent/' },");
replace('app/session-2/content.ts','const rsiSources = [',"const rsiSources = [\n  { label: 'PyTorch · Training, loss and parameter updates', url: 'https://docs.pytorch.org/tutorials/beginner/basics/optimization_tutorial.html' },");
replace('app/session-2/session-two.tsx',"'llm', 'calibration'","'llm', 'calibration', 'learning', 'successor'");
replace('app/session-2/session-two.tsx','Primary sources checked 25 September 2026.','Teaching notes updated 3 October 2026.');
replace('app/session-2/labs.module.css','transition:transform 290ms','transition:transform 170ms');
const css='app/session-2/learning-scenes.module.css';
replace(css,'opacity:calc(.2 + mod(var(--cell),4)*.17);','');
replace(css,'opacity:calc(.35 + mod(var(--cell) + 2,4)*.2);','');
write(css,read(css)+'\n.teachingRow[data-using=true]{grid-template-columns:1.2fr 36px .65fr 36px 1fr}\n.miniScreen[data-new=true] .cursor{left:calc(100% - 55px)}.miniScreen[data-new=true] .cursor[data-correct=true]{left:60px}\n.trainingWeights{display:grid;grid-template-columns:repeat(8,1fr);gap:5px;margin-top:14px}.trainingWeights>i{height:22px;background:var(--ink);transition:opacity .6s,background .6s,transform .6s}.trainingWeights[data-updated=true]>i{background:var(--accent);transform:scale(.8)}\n@media(max-width:760px){.teachingRow[data-using=true]{grid-template-columns:1fr}}\n');
console.log(JSON.stringify({pages:new Set(plan.map(c=>c.beat)).size,cues:plan.length,removed}));
