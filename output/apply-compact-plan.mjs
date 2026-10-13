import fs from 'node:fs';
const root = 'D:/Code/ai-shortterms/.sites-publish/ai-field-notes';
const plan = JSON.parse(fs.readFileSync('D:/Code/ai-shortterms/output/compact-talk-script.json', 'utf8'));
const part = (kind, label, end, extras = {}) => ({ kind, label, end, ...extras });
const seq = (...segments) => ({ kind:'sequence', segments });
const scenes = {
  'O1-intro':part('static',['三条主线','Three questions'],['开场地图','The opening map']),
  'C1-why':part('static',['API 与界面','API and interface'],['同一目标，两种入口','Two routes to the same goal']),
  'C4-loop':seq(
    part('desktop',['观察与定位','Observe and locate'],['定位输入框','Locate the field'],{from:0,to:2,delay:700,hold:700}),
    part('desktop',['填写表单','Fill the form'],['完整表单','The completed form'],{from:3,to:7,delay:600,hold:650}),
    part('desktop',['提交与验证','Submit and verify'],['新截图确认退货已创建','A fresh screenshot confirms the return'],{from:8,to:11,delay:650,hold:900})),
  'C5-block':part('desktop',['弹窗打断旧计划','A pop-up blocks the plan'],['旧位置点击失败','The stale click fails'],{from:7,to:9,interrupted:true,delay:850}),
  'C5-recover':seq(
    part('desktop',['重新观察与修正','Observe and repair'],['关掉弹窗，重新定位','Close the pop-up and locate again'],{from:10,to:13,interrupted:true,delay:700,hold:700}),
    part('desktop',['重新提交与验证','Submit and verify again'],['新截图确认完成','A fresh screenshot confirms success'],{from:14,to:17,interrupted:true,delay:650})),
  'C7-train':seq(
    part('learning',['练习与反馈','Practice and feedback'],['练习结果进入反馈','Practice outcomes become feedback'],{from:0,to:2,delay:1000,hold:700}),
    part('learning',['更新 weights','Update weights'],['训练得到新模型','Training produces an updated model'],{from:3,to:5,delay:950})),
  'C7-use':part('learning',['用新 context 做决定','Act on new context'],['截图变了，weights 保持不变','New screenshots, fixed weights'],{from:6,to:7,delay:1300}),
  'C6-film':part('film',['Blender 案例成片','Blender source film'],['成片静帧与 bpy → render → Computer Use 流程','Source still and the bpy → render → Computer Use workflow']),
  'J1-question':part('decision',['为同一工单选处理组','Choose a team for the ticket'],['Choice 返回预设选项','Choice returns a predefined option'],{from:0,to:3,delay:700}),
  'J2-decode':part('tokens',['逐个选择并追加 token','Choose and append each token'],['We can help.','We can help.'],{from:0,to:4,tokens:['We','can','help','.'],delay:1000}),
  'J3-compare':seq(
    part('llm',['LLM 生成结构化答案','The LLM generates structured output'],['JSON 答案生成完毕','The JSON answer is complete'],{from:0,to:9,delay:180,hold:500}),
    part('decision',['Jev 返回预定义判断','Jev returns typed decisions'],['两条输出路径并排对照','Both output paths remain side by side'],{from:0,to:3,llmStep:9,delay:600})),
  'J5-train':seq(
    part('calibration',['错误案例的反馈','Feedback on a wrong decision'],['错且自信的判断受到反馈','Feedback for a confidently wrong decision'],{from:0,to:2,delay:900,hold:650}),
    part('calibration',['多例训练，再换新题','Train on varied cases, then open new ones'],['新题结果尚未揭晓','New-case outcomes remain hidden'],{from:3,to:6,delay:850})),
  'J5-heldout':part('calibration',['揭晓独立测试结果','Reveal held-out outcomes'],['比较概率与实际结果频率','Compare probabilities with outcome frequencies'],{from:6,to:7,delay:1000}),
  'J8-ambiguity':part('decision',['查看混合诉求','Inspect mixed intent'],['分布已经出现，尚未选择路线','The distribution is visible; the route is undecided'],{from:1,to:4,mixed:true,delay:700}),
  'J8-route':part('decision',['根据判断选择后续动作','Use the decision to choose an action'],['先澄清，再处理','Clarify before proceeding'],{from:4,to:5,mixed:true,delay:900}),
  'R1-intro':part('static',['改进改进的方法','Improve the method of improvement'],['A → B → C？','A → B → C?']),
  'R4-challenge':seq(
    part('sort',['运行并检查基线 A','Run and check baseline A'],['保留已验证的 A','Keep verified A'],{candidate:'A',run:true,checked:true,delay:75,hold:950}),
    part('sort',['运行候选 B，暂不检查','Run B before checking'],['B 已运行完，正确性尚未检查','B has finished; correctness is unchecked'],{candidate:'B',run:true,checked:false,delay:110,hold:900})),
  'R4-keep':seq(
    part('sort',['检查并拒绝 B','Check and reject B'],['B 没有通过正确性检查','B fails the correctness check'],{candidate:'B',checked:true,hold:1500}),
    part('sort',['运行并检查 C','Run and check C'],['保留通过测试且操作更少的 C','Keep C after it passes with less work'],{candidate:'C',run:true,checked:true,delay:140,hold:1000})),
  'R5-example':part('research',['AlphaEvolve 的搜索与结果','AlphaEvolve search and results'],['局部 kernel 收益与整体收益并列','Kernel and whole-training gains together'],{from:0,to:3,delay:900}),
  'R6-build':seq(
    part('successor',['修改训练材料','Change the training material'],['失败实验和诊断进入配方','Add failed experiments and diagnoses'],{from:0,to:1,delay:1000,hold:750}),
    part('successor',['训练后继 B','Train successor B'],['B 已训练，研究能力尚未验证','B is trained; its research ability is untested'],{from:2,to:3,delay:1200})),
  'R6-next':part('successor',['独立评估，再决定下一轮','Evaluate independently before another cycle'],['只有能力提升才尝试下一轮','A further cycle depends on improved ability'],{from:4,to:5,delay:1300}),
  'E1-close':part('static',['三个验证问题','Three checks'],['总结画面','The closing map']),
};
if (plan.length !== 22 || plan.some(cue => !scenes[cue.id])) throw new Error('Unexpected cue IDs');
fs.writeFileSync(`${root}/app/session-2/cue-plan.json`,JSON.stringify(plan.map(cue=>({...cue,scene:scenes[cue.id]})),null,2)+'\n');
let content = fs.readFileSync(`${root}/app/session-2/content.ts`,'utf8');
for(const id of ['C2','C3','J4','J6','R3']) content=content.replace(new RegExp(`^    \\{ id:'${id}'.*\\r?\\n`,'m'),'');
const c6=content.match(/^    \{ id:'C6'.*\r?\n/m)[0];
content=content.replace(c6,'').replace(/(^    \{ id:'C7'.*\r?\n)/m,'$1'+c6);
content=content.replace("id:'C1', label:'The task', title:'Turn a request into a result.'","id:'C1', label:'The task and why', title:'Two routes into the same app.'")
  .replace("next:'What can the model see?'","next:'Follow one screen-to-action loop'")
  .replace("next:'Open the Blender case'","next:'How does it learn to act?'")
  .replace("subtitle:'Follow a simplified process, then watch a real Blender case.'","subtitle:'Watch the published render and the workflow that produced it.'")
  .replace("takeaway:'Render = scene + camera + light → an image.', next:'How does it learn to act?'","takeaway:'Python builds the scene; rendered previews and Computer Use help inspect it.', next:'From actions to decisions'")
  .replace("alone does not retrain the model.', next:'From actions to decisions'","alone does not retrain the model.', next:'Open the Blender case'")
  .replace("next:'See the three question types'","next:'How is this trained?'")
  .replace("next:'Probability or confidence?'","next:'Use uncertainty to choose a route'")
  .replace("next:'Why automate research?'","next:'Test a candidate before keeping it'")
  .replace('The Blender process is a simplified teaching animation, not Blender itself or a recording of the published workflow. The separate 30-second film is','The 30-second film is');
fs.writeFileSync(`${root}/app/session-2/content.ts`,content);
let scenesText=fs.readFileSync(`${root}/app/session-2/scenes.tsx`,'utf8');
scenesText=scenesText.replace("if (id === 'C3') return <ApiRouteScene />;","if (id === 'C1') return <ApiRouteScene />;");
fs.writeFileSync(`${root}/app/session-2/scenes.tsx`,scenesText);
console.log('Integrated 16 pages / 22 segments.');
