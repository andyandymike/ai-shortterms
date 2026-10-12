const fs=require('node:fs'),path=require('node:path');
const root='D:/Code/ai-shortterms/.sites-publish/ai-field-notes';
const edit=(file,fn)=>{const p=path.join(root,file);fs.writeFileSync(p,fn(fs.readFileSync(p,'utf8')));};
edit('scripts/build-session-2-notes.mjs',s=>s
 .replaceAll('约 25–30 分钟，含观众观察与 Blender 短片。','以约 25 分钟安排排练，含观众观察与 Blender 短片；实际时长随语速与停顿调整。')
 .replace('about 25–30 minutes including audience observation and the Blender film.','budget about 25 minutes for rehearsal, including audience observation and the Blender film; adjust for speaking pace and pauses.'));
edit('public/notes/session-2/index.md',s=>s.replaceAll('45 个讲解点','42 个讲解点')
 .replace('预计 25–30 分钟，包括观众观察与 Blender 短片。建议分配：开场 1 分钟，Computer Use 8 分钟，Jev 10 分钟，RSI 8 分钟；收束与提问另留时间。','建议以约 25 分钟安排排练，包括观众观察与 Blender 短片，实际时长随语速与停顿调整。原理段慢讲，重复动作已提速；提问另留时间。')
 .replace('暂停点包括看见回执与确认截图、Blender 首次预览与修正、训练反馈与独立案例检查、候选运行与独立检查。','提交与截图验证连成一段；Blender 首次预览与修正保留停顿。C7、J5、R6 各用三个停点解释练习、参数更新与独立检查。排序只保留 A、B、C 三次运行，每段自动检查。')
 .replace('比如 R4 的 B 候选先运行完、停下来让观众看顺序，下一次继续才执行独立检查。','比如 C5 先停在旧截图导致的失败，再连续播放重新观察与修正。R4 的 B 运行与检查已合并，停下时直接讨论为什么操作少却被拒绝。')
 .replace('- [J2：Decoding]','- [C7：练习、weights 与 inference](/session-2#computer-use/C7)\n- [J2：Decoding]')
 .replace('- [R4：正确性先于速度](/session-2#rsi/R4)','- [R4：正确性先于速度](/session-2#rsi/R4)\n- [R6：改配方、训练后继与下一轮](/session-2#rsi/R6)')
 .replace('确认表单、回执、验证各自在讲解点停住','确认填表后停住，随后提交与新截图验证连续完成')
 .replace('从 J2 看 The 与 We 的不同延续；从 J5 看训练反馈、示意调整与另一批案例检查。','从 C7 看训练与 inference 的区别；从 J2 看 The 与 We 的不同延续；从 J5 看多例反馈、weights 变化与整批新题检查。')
 .replace('从 R4 走完 A、B、C 与新输入，确认错误会被拒绝，C 会被保留。','从 R4 走完 A、B、C，确认错误被拒绝、C 被保留；从 R6 检查新配方、loss 与 weights、独立研究任务及下一轮的条件箭头。'));
edit('public/notes/session-2/reference.md',s=>s
 .replace('资料核对日期：2026-09-25。第二场为 21 页、45 个讲解点','原资料核对日期：2026-09-25；训练与递归原理补充于 2026-10-03 核对。第二场为 21 页、42 个讲解点')
 .replace('| Render | 根据三维场景、相机与灯光算出图像 |','| Render | 根据三维场景、相机与灯光算出图像 |\n| Weights | 模型内部影响判断的可调数值，训练会更新并保存它们 |\n| Reinforcement learning | 利用结果反馈学习行动的一类方法，中文称强化学习 |\n| Inference | 使用已经训练好的模型，对当前输入作出判断或生成结果 |')
 .replace('- [OpenAI：Computer use]', '- [OpenAI：CUA 的视觉与强化学习](https://openai.com/index/computer-using-agent/)\n- [OpenAI：Computer use]')
 .replace('## Jev · J1–J6、J8','C7 替换重复总结，用三个停点区分训练与使用：练习点击但任务失败；多种任务的结果反馈用于更新 weights；训练后换新布局，截图进入 context，固定的 weights 用于重新定位。OpenAI 公开介绍 CUA 结合视觉能力与强化学习。这里展示通用训练原理，没有复现 CUA 的具体训练算法，也没有在网页里更新真实模型。图示 v1、v2 与小格子只是教学表现，不能当成实测能力提升。\n\n## Jev · J1–J6、J8')
 .replace(/J5 用三个停顿点讲训练与检查。[^\r\n]+/,'J5 用三个停顿点讲训练与检查。先用重复扣款但保留鞋子的邮件，对照 v1 错误预测 returns、0.95 与已知答案 billing；再展开多种工单，展示反馈形成训练信号并更新 weights；最后固定 v2 参数，换一批未参与此次训练的新工单，整体揭晓八对两错的教学结果。0.80 属于新题，与原例子的 0.95 无直接增减关系。图示是通用原理，RLCD 的具体更新算法未公开，不能把它当成真实训练记录。一条错误不能证明整体校准不足；十个例子也不能证明训练有效或 Jev 的测评成绩。0.8 不保证每十次必有八次正确，calibration 需要大量独立样本。')
 .replace('更换可视输入保留已经选定的方法；比较时测试组始终相同。','主线只保留 A、B、C 三段，每段运行与检查连续完成，比较时测试组始终相同。删除单独换输入、再运行的重复停点。')
 .replace(/R6 把证据边界与运行条件放在同一页：[^\r\n]+/,'R6 将静态边界页替换成一条假设的训练路径：A 发现材料偏重成功实验，提出加入失败原因与排查练习；按新配方训练 B，练习与目标比较产生 loss（误差），反复更新 weights；在未用于训练的研究任务上独立比较 A、B 的诊断与实验提案能力。只有确有研究能力改善，才有理由让 B 尝试下一轮配方修改，能否造出更好的 C 仍需检验。补充失败案例只是教学假设，未在项目中实测；参数训练也只是改进后继的一种路线，不是 RSI 唯一算法。人定义目标、评估、权限和停止条件。')
 .replace('- [Anthropic Institute：When AI builds itself]', '- [PyTorch：训练、loss 与参数更新](https://docs.pytorch.org/tutorials/beginner/basics/optimization_tutorial.html)\n- [Anthropic Institute：When AI builds itself]')
 .replace('建议保留 C5 的观察与修正、J3 的公平比较、J5 的训练与独立检查区别、J6 的概率区别，以及 R5–R6 的证据范围。','建议保留 C5 的观察与修正、C7 的训练与 inference、J3 的公平比较、J5 的训练与独立检查、J6 的概率区别，以及 R5–R6 从组件改善到后继研究能力的区别。'));
console.log('Updated rehearsal guidance and source notes.');
