# 第二场参考｜术语、来源与事实边界

原资料核对日期：2026-09-25；训练与递归原理补充于 2026-10-03 核对。2026-10-13 重新核对 Jev 官方的模型介绍、RLCD 与 confidence 说明，以及 Anthropic 的结构化输出文档；未重新核对全部其他外部来源。第二场共 19 页，其中 3 页为各章独立术语开场。内容页使用主题标题，如 Why Computer Use?、How Jev is trained；定义口播放在开场页，例子与原理接在其后。主线是 Computer Use、Jev、RSI。投影使用英文，口播按页、按当前画面组织。动画与影片默认等待点击播放；进入下一画面或下一页不会同时播放。每段短过渡后自动停住，直到讲者继续；Presenter 显示当前口播及下一画面预告，过渡进度不限制讲解时间。

## Computer Use · C0、C1、C4、C5、C7、C6

| 术语 | 讲给普通观众听 |
| --- | --- |
| Computer Use | 通过截图、点击、输入、滚动等操作软件界面 |
| Context | 模型这次判断能用的信息，如目标、截图与相关历史 |
| Vision | 读取和理解画面 |
| UI grounding | 把“这个按钮”这样的目标对应到界面位置 |
| Tool call | 模型提出一项请求，由外部工具实际执行 |
| Agent | 组织目标、context、工具和反馈循环的系统 |
| API | 软件提供给程序调用的接口 |
| Render | 根据三维场景、相机与灯光算出图像 |
| Weights | 模型内部影响判断的可调数值，训练会更新并保存它们 |
| Reinforcement learning | 利用结果反馈学习行动的一类方法，中文称强化学习 |
| Inference | 使用已经训练好的模型，对当前输入作出判断或生成结果 |

核心循环为截图 → 模型请求动作 → 工具执行 → 新截图反馈。模型提出请求，实际点击和键盘操作由工具执行。C1 合并原 C3 的 API 比较，将同一个退货目标分成 API 与界面操作两条路线；真实流程可以混合使用两者，都需要检查完成证据。C4 合并原 C2 的 context 与 UI grounding 解释，依次留住定位结果、已填好的表单和验证回执，让每一段解释都有对应画面。

- [OpenAI：CUA 的视觉与强化学习](https://openai.com/index/computer-using-agent/)
- [OpenAI：Computer use](https://developers.openai.com/api/docs/guides/tools-computer-use)
- [Thomas Ricouard / OpenAI：Architectural visualization with Astra，2026-09-04](https://developers.openai.com/blog/architectural-visualization-with-astra)
- [Blender：Python API](https://docs.blender.org/api/current/)

C1、C4、C5 的订单、鼠标、输入、弹窗、截图历史与回执是教学模拟，没有操纵真实业务软件。应用出现回执后，最新截图仍可能是提交前的表单；新截图返回后才完成验证。弹窗出现时，旧观察也会暂时失效。场景说明的是反馈关系，不是某个模型的真实动作日志。

C6 只保留发布案例中的约 30 秒 Blender 渲染短片与工作流程说明，已删除搭房、移动灯光的教学动画；影片结束后留住静帧与 bpy → render → Computer Use 流程，讲者可停留解释。该素材是 Atelier House 的成品漫游，另有 Garden House 静帧用于海报、片尾停留及播放失败时的替代画面，静帧不是影片的第一帧。案例流程结合 bpy 建立可编辑场景、render 预览，以及 Computer Use 打开 Blender 检查。成片不是鼠标操作录像，也不能单凭它推出任意任务都能无人干预完成。来源与散列见 `deck/public/media/session-2/PROVENANCE.md`。

C7 保留训练与使用的比较：先留住练习反馈，再看 weights 更新后的模型；最后换到新布局，截图进入 context，固定的 weights 用于重新定位。每个画面等对应口播讲完再继续。OpenAI 公开介绍 CUA 结合视觉能力与强化学习。这里展示通用训练原理，没有复现 CUA 的具体训练算法，也没有在网页里更新真实模型。图示 v1、v2 与小格子只是教学表现，不能当成实测能力提升。

## Jev · J0、J1、J2、J3、J5、J8

Jev 是 TypeSafe AI 的模型名称，不是 Jevons paradox 或 JEPA。System One 是厂商对这类决策模型的称呼。

| 术语 | 解释 |
| --- | --- |
| Token | 模型使用的文本单位，可以是字符、词或文本片段 |
| Decoding | 从模型预测的下一 token 概率中按规则选择，再接回 context，继续生成 |
| State | 多个判断问题共用的输入材料，可以包含文字、JSON 与相关记录；它为这些判断提供 context |
| Choice | 在明确候选项之间分类，返回标签、概率分布和 confidence |
| Score | 根据 rubric 评分，返回期望分数、等级概率和 confidence |
| Noul | 对一个陈述返回 0–1 概率，没有单独的 confidence |
| Rubric | 评分标准，以及每个等级的含义 |
| Calibration | 在很多相似预测中，预测概率和实际出现频率是否相符 |
| Confidence | 从分布形状计算的统计量；不是最高选项概率，也不是正确率 |
| RLCD | Reinforcement Learning for Calibrated Decisions；TypeSafe 介绍的训练方法 |

J1 让同一封邮件进入 state，借 Choice 展示明确的分类结果。J2 只保留 We can help. 这一条生成路径，先留住 We 已进入 context 后的下一轮候选，再生成完整句子，说明前面的 token 会改变后面的条件；不再重放 The 分支或展开采样规则。候选、切分和概率是有限的教学示意，没有调用真实 LLM。Decoding 的参考来源是 Hugging Face 的生成策略文档；TypeSafe 的 machine-learning primer 在这里用于 RLCD 与决策训练。

J3 公平比较两个输出路径。左侧明确使用 LLM + JSON Schema：字段、类型和允许值可以受约束，普通 LLM 能返回合法 JSON、一次回答多个问题。约束 decoding 限制可生成的 token，响应仍按序列生成；动画使用可读片段，不是实际 token 切分。Jev 把输出范围收窄到预先定义的决策类型，放弃自由字符串续写；多个问题共用 state，独立评估并可并行处理，不依赖前一个答案再生成下一个答案。结果与概率交给普通代码决定工作流。这里画的是接口与输出关系；完整内部架构没有公开，不声称没有 Transformer、只需一次 forward pass，或不会发生语义判断错误。动画时长也不是模型延迟。

补充参考：输出类型细节（原 J4 内容，不设独立主讲页）。主线在 J1 解释 Choice，在 J3 简述 Score 与 Noul；以下数值和计算用于备查。Choice 的清晰请求分布为 returns 0.94、billing 0.04、shipping 0.02。Score 使用五档教学 rubric：0 routine、1 soon、2 same-day、3 urgent、4 critical；概率为 0.1、0.5、0.3、0.1、0，期望分数为 0×0.1 + 1×0.5 + 2×0.3 + 3×0.1 + 4×0 = 1.4。Noul 的教学陈述是“客户想退货”，概率为 0.96。它们不是实测成绩；没有提供 confidence 的示例不另编一个数值。

J5 保留四个讲解画面，沿具体邮件解释训练。第一段显示“重复扣款但保留鞋子”：v1 预测 returns 0.95、billing 0.04、shipping 0.01；再揭晓已知答案 billing。第二段保留这封邮件，让多个带答案例子的反馈进入 weights 更新，再将同一封邮件的教学预测改为 returns 0.10、billing 0.88、shipping 0.02。这样变化的是具体预测，而不只是抽象参数格子。它表示多例、反复训练可能改变预测，不表示单个样本的固定概率调整，也不表示这些是实测训练前后的输出。RLCD 是 TypeSafe 介绍的面向决策和校准概率的后训练，公开说明未披露具体更新算法；本演示没有复现它。

第三段换成未参与训练的新邮件：“订单 2062 的付款处理了两遍。”v2 的 weights 固定，显示 returns 0.12、billing 0.80、shipping 0.08，先不揭晓答案。第四段对照已知答案 billing，并用一组接近 0.80 的教学预测及八对两错的结果解释 calibration。新题的 0.80 不由旧题的 0.95 直接减出来。一个错误不能证明整体校准不足，一个正确预测或十个示例也不能证明训练有效；0.8 不保证每十次必有八次正确。校准需要在大量独立样本中比较概率与实际频率。

补充参考：概率与 confidence 细节（原 J6 内容，不设独立主讲页）。Confidence 是由分布计算的统计量，不等于最高选项的概率。Choice 在三个候选项、最高概率为 0.61 时，按文档公式得到 confidence 约 0.42；本次 J8 直接用最高选项概率演示分流，不显示或混用 confidence。不同问题可以具有不同的不确定性，不能把这封邮件某一问题的概率挪给另一问题。

J8 仍在同一页讲两段。第一段使用同一封混合诉求邮件，让 LLM + JSON Schema 和 Jev 展示相同的 JSON：returns 0.61、billing 0.35、shipping 0.04。数字全部作为教学设定，既不代表现场模型输出，也不代表两个 API 的原始响应结构。刻意保持格式和数字相同，是为了排除“只有 Jev 能返回 JSON”的错误理由：Schema 能约束格式，一个合法数字不能独自证明校准。Jev 的专门决策训练与概率输出是值得评估的设计取舍；普通 LLM 也可接受额外训练或校准，双方都需要独立评估。

第二段模拟反复处理工单。退货、账单和混合请求的最高选项概率分别设为 0.94、0.93、0.61；普通代码按“最高概率 ≥ 0.80 才直接分流，否则人工复核”的教学规则处理。这条流程同样能由普通 LLM 驱动，阈值不是通用生产建议。场景要说明的选择依据是工作负载：高频、范围明确的分类和评分不需要自由生成，值得检查专门决策模型是否能在相同质量要求下改善延迟或成本；偶发任务、或者本来需要生成完整回复时，LLM JSON 可能已经够用。应对同一批独立新工单比较判断错误、calibration、延迟和成本。这里没有编造测评成绩，也不宣布 Jev 普遍更准、更快或更便宜。

- [TypeSafe：Introducing System One models and Jev](https://typesafe.ai/blog/introducing-system-one-models-and-jev)
- [TypeSafe：Models / supported inputs](https://docs.typesafe.ai/models)
- [TypeSafe：Choice / support-ticket example](https://docs.typesafe.ai/primitives/choice)
- [TypeSafe：Score](https://docs.typesafe.ai/primitives/score)
- [TypeSafe：Noul](https://docs.typesafe.ai/primitives/noul)
- [TypeSafe：Confidence](https://docs.typesafe.ai/confidence)
- [TypeSafe：Machine-learning primer / RLCD](https://docs.typesafe.ai/introduction/machine-learning-primer)
- [Hugging Face：Generation strategies / decoding](https://huggingface.co/docs/transformers/main/en/generation_strategies)
- [Anthropic：Structured outputs](https://platform.claude.com/docs/en/build-with-claude/structured-outputs)

## RSI · R0、R1、R4、R5、R6

R0 单独介绍 RSI = Recursive Self-Improvement，递归自我改进。R1 继续区分当前答案的修正、可复用方法的改进，以及更有研究能力的后继系统继续推动下一轮改进。递归要求改进能力能够传到后续循环，不能把三种变化直接等同。

研究实现与实验耗时的动机已并入 R1，原 R3 的抽象候选筛选动画省略。R4 直接用本地执行的确定性排序实验展示提出候选、检查与保留。A 完整重复相邻比较与交换；B 只走一遍；C 将每个元素插入已经有序的左侧。数字方块位置来自执行轨迹。工作量等于比较次数加数组写入次数，两种操作等权，只用于本例；不等于实测时间、CPU 指令数或通用性能。

独立检查同时验证升序和输入值是否完整保留，再运行固定的六项测试：含两个局部乱序区的输入、另一种排列、完全逆序、重复值与负数、空数组、单元素。投影显示通过数与检查后的工作量。候选只有全部通过，并且在同一测试组上比当前方法操作更少，才会被保留。B 不能因为操作少就替换正确候选。主线依次留住四个结果：运行并检查 A；运行 B 但尚未检查、尚未标红，留给观众判断；检查并拒绝 B；运行、检查并保留 C。比较时测试组始终相同，不另外讲解排序算法或重复换输入运行。

这些候选由演示作者事先编写，不是现场 AI 生成。它说明有限目标上的提出、执行、验证、保留循环；通过六项测试既不证明所有输入都正确，也不证明完整 RSI。

R5 的中心是 AI 如何改进训练 AI 的工具：AlphaEvolve 使用 Gemini 提出代码改法，检查正确性与速度，再把改进后的 kernel 用于 Gemini 训练。动画里的 K 从改进位置进入训练流程，帮助观众跟随同一项成果。Google DeepMind 报告这个矩阵计算 kernel 加速 23%，带来 Gemini 整体训练时间约 1% 的减少。两项数字作为组件与整体的结果证据，不再占据主画面。Kernel 在此是训练中反复使用的小段计算程序，K 的移动只是流程示意，没有现场优化代码或调用 Gemini。效率改善不代表模型智力或递归改进能力的实测提升。2026-10-13 复核了下方 DeepMind 与 Anthropic 原文。

R6 沿用同一个 kernel 继续讲，替换原先加入失败案例、讲解 weights 与 loss 的支线，从四个停留画面收为三个。上方保留已经报告的训练效率改善，下方标明 Hypothetical extension，并用虚线和问号表示尚未验证的后续路径。第一段假设把节省的算力用于更多训练或实验、开发后继 B；它不保证 B 更聪明或更擅长研究。第二段用没参与前一轮开发的 kernel 优化任务，在相同任务与尝试预算下比较当前 AI A 与 B，检查正确性和有用的提速。第三段只在 B 确实更擅长这项工作的条件下，让 B 接过 A 的工作，提出下一项 kernel 改进并帮助开发 C，C 也要重新检验。重点是上一轮改善了参与研发的 AI，随后这项能力进入下一轮。

R6 没有训练真实后继、运行 A/B 研究能力测评或证明递归已经成立；Google 的 kernel 成果只支持前面的有限效率改善。节省算力再投入、参数训练与 kernel 优化只是帮助解释因果的一条可能路径，不是所有 RSI 方法必须采用的步骤；狭窄任务上的提升也不能直接推广为全面研究能力的提升。现实开发中，人仍需定义目标、评估条件与是否采用候选结果。

- [Google DeepMind：AlphaEvolve](https://deepmind.google/blog/alphaevolve-a-gemini-powered-coding-agent-for-designing-advanced-algorithms/)
- [Anthropic Institute：When AI builds itself](https://www.anthropic.com/institute/recursive-self-improvement)

## 时间不足时

各画面停留时间由讲者决定，没有讲解倒计时。时间紧时，可缩短解释或用「直接到讲解画面」跳过当前画面的过渡；主按钮继续到下一画面。建议保留 C5 的观察与修正、C7 的训练与 inference、J3 的公平比较、J5 的独立检查、J8 的相同 JSON 与重复工单比较，以及 R5–R6 中同一项 kernel 改进如何可能进入后继和下一轮研发。不要把动画速度讲成模型性能；R4 即使跳到结果，也应说明 B 未完成任务、C 经过独立检查才被保留。
