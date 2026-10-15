# 第二场参考｜术语、来源与事实边界

内容整理于 2026-10-15。共 18 页，主线为 Computer Use、Jev、RSI，每章从独立术语页开始。投影使用英文；中英文讲稿按当前停留画面组织，转场单列。动画与影片等待点击播放，短过渡后自动停住。操作说明和页面目录见[讲稿入口](index.md)。

本参考稿保留来源、教学简化和事实边界，不是额外口播。基础资料核对始于 2026-09-25；训练原理补充于 2026-10-03，Jev 与 RSI 主要来源于 2026-10-14 复核，2026-10-15 再查 Jev primitives、RLCD primer 和 OpenAI CUA 说明。未重新核对全部外部来源。

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

核心循环为截图 → 模型请求动作 → 工具执行 → 新截图反馈。实际点击和键盘操作由工具执行。C1 比较同一个退货目标的 API 与界面路线；两者可以配合，都需要检查完成证据。C4 依次留住定位结果、填好的表单和验证回执。C5 依次留住旧截图导致的失败、新截图中的弹窗与关闭目标、恢复后的回执。

- [OpenAI：CUA 的视觉与强化学习](https://openai.com/index/computer-using-agent/)
- [OpenAI：Computer use](https://developers.openai.com/api/docs/guides/tools-computer-use)
- [Thomas Ricouard / OpenAI：Architectural visualization with Astra，2026-09-04](https://developers.openai.com/blog/architectural-visualization-with-astra)
- [Blender：Python API](https://docs.blender.org/api/current/)

C1、C4、C5 的订单、鼠标、输入、弹窗、截图历史与回执是教学模拟，没有操纵真实业务软件。应用出现回执后，最新截图仍可能是提交前的表单；新截图返回后才完成验证。弹窗出现时，旧观察也会暂时失效。场景说明的是反馈关系，不是某个模型的真实动作日志。

C6 播放约 30 秒 Blender 渲染短片，结束后保留静帧与 bpy → render → Computer Use 流程。素材是 Atelier House 的成品漫游；Garden House 静帧用于海报、片尾及播放失败时的替代画面，不是影片的第一帧。案例结合 bpy 建立可编辑场景、render 预览、Computer Use 打开 Blender 检查。成片不是鼠标操作录像，也不能证明任意任务都能无人干预完成。来源与散列见 `deck/public/media/session-2/PROVENANCE.md`。

C7 比较训练与使用：第一段光标移到 Cancel 并点击，表单关闭、退货未创建，中间显示失败反馈；第二段积累多次练习并更新 weights；最后换到新布局，用固定 weights 重新定位。每段结束后停住，等待对应口播讲完。OpenAI 公开介绍 CUA 结合视觉能力与强化学习。这里展示通用训练原理，没有复现 CUA 的具体训练算法，也没有在网页里更新真实模型。图示 v1、v2 与小格子只是教学表现，不能当成实测能力提升。

## Jev · J0、J1、J2、J3、J5、J8

Jev 是 TypeSafe 的模型名，System One 是厂商对这类决策模型的称呼。本章顺序是：定义问题 → decoding → 同题比较 → 训练与新题检查 → 工单分流。输出机制和潜在延迟收益集中在 J3 讲，J8 只讲适用流程。

| 术语 | 解释 |
| --- | --- |
| State | 提供给问题的输入材料，例如邮件、订单记录和规则；这些内容提供 context |
| Choice | 从调用者提供的选项中选择；返回选项、各选项概率与 confidence |
| Score | 按调用者定义的有序等级评分；返回分数、等级概率等 |
| Noul | 判断一个是非问题，返回“是”的概率 |
| Token | 模型使用的文本单位，可以是字符、词或文字片段 |
| Decoding | 选择下一个 token，接到已有内容后面，继续生成 |
| Weights | 模型内部影响判断的参数 |
| RLCD | Reinforcement Learning for Calibrated Decisions，TypeSafe 的决策与概率校准后训练 |
| Calibration | 在很多独立样本上，预测概率与实际频率是否相符 |

### 问题、题型、选项、答案数量

J1 左侧是调用者提供的请求。第一幅问“哪个部门处理”，选择 Choice，并提供 returns、billing、shipping 三个选项；右侧是一份 Choice 答案，内含三个选项的概率。第二幅增加“客户是否想退货”，选择 Noul，右侧增加一份答案。因此是两题、两份答案，不是“Jev 固定输出三个值”。Choice、Score、Noul 是三种可选题型，也不是每次必须各用一个。图中概率由教学作者设定，实际值应随输入和问题变化。

调用者在每次请求里定义 questions、instructions、type、criteria 和答案 ID。候选选项或评分等级需要提前给出，但题目并非训练时写死的题库。同一模型可以处理新的问题定义，无需每道题重新训练。官方 Models 页说明当前各账户使用同一组模型 weights，领域资料和规则通过请求提供。问题数量受接口和 context 限制，不能理解成无限；Choice 当前最多 255 个候选项，这个上限不在主讲中展开。

### LLM、Jev 和 JSON

J2 完整播放 We → can → help → 句号，约五秒后自动停住。左侧保留生成的短句，右侧保留四步记录，说明每个新 token 如何进入 context、参与下一步预测。候选概率与 token 切分均为教学示意；演示终点不是对真实 tokenizer 或停止条件的复现。

J3 两边回答与 J1 相同的两道题，并使用相同的教学概率。左边明确是 LLM + JSON Schema：普通 LLM 也能在一次请求中回答多题、按格式返回 JSON。画面按可读片段逐步显示，不是实际 tokenizer 或 API 调用记录。右边按 TypeSafe 的公开说明展示并行概率输出：多个问题共用 state，但各自的答案不作为其他题的隐藏 context。对 Choice 而言，多个选项的概率共同构成一份答案，并不相互独立；独立性指不同问题的评估。

JSON 是 API 交付结果的形式。根据厂商所述，Jev 模型不靠自回归文字生成来写出这些概率，API 仍可把结构化结果组织成 JSON。因此区别不能概括为“一个逐字写三个字段，另一个固定同时写三个字段”。完整内部架构没有公开；不声称每次只需一次 forward pass、不含 Transformer 或不会判断错。格式合法也不保证答案正确或概率校准，普通 LLM 同样可以另行训练或校准。

### 训练与校准

J5 的三个画面用一般训练原理解释 RLCD 的目标，没有复现厂商算法或数据。先看一封重复扣款但保留商品的邮件：示意模型错误地给 returns 0.95，已知答案为 billing。再展示许多带答案例子提供反馈、反复调整 weights；同一封邮件的示意预测变成 returns 0.10、billing 0.88、shipping 0.02。变化不是单个错例的固定更新公式，也不是实测提升。

最后换成未参与训练的新邮件，weights 固定，模型给 billing 0.80，再揭晓答案及十个小格。八对两错帮助解释 calibration：很多接近 0.8 的预测，其正确比例应接近 80%。一封答对或十个示例不能证明校准，任意十次也不保证恰好八次正确。RLCD 的正式英文名放在术语和参考资料中，口播重点跟随“练习、反馈、调整、新题检查”的画面，不反复念长定义。

### 为什么可能更快，什么时候考虑使用

J3 用同题比较解释潜在的延迟差异。两边都是一次请求，也都需要处理输入；常见自回归 LLM 反复生成下一个 token，Jev 按厂商所述并行输出判断概率。减少顺序输出工作是降低延迟的一个原因，厂商还描述了专门的架构、parallel sampler 和训练方法。不能把原因归结为省掉聊天界面、JSON.parse、三个网络调用，或仅仅少输出几个字符。

图中方框宽度、出现顺序和播放时长均不表示实测耗时。实际比较还取决于输入长度、对比模型及 reasoning 设置、输出要求、硬件和网络。厂商发布的测试报告了速度优势，但也说明短输入对 Jev 有利，某些 LLM 对照使用生成完整概率的 wrapper，这比仅输出标签更慢。主讲不套用一个普遍倍数，也没有把演示动画当性能证明。

J8 保持一页，用三个停住的画面讲适用流程。先看清晰的退货邮件：returns 的示意概率为 0.94，按作者设定的“最高选项概率至少 0.90 才自动分流”规则进入退货队列。再加入重复扣款问题：示意概率变成 returns 0.61、billing 0.35、shipping 0.04，代码将工单转人工。这里使用的是选项概率，不是 Jev 的 distribution confidence；0.90 不是官方推荐阈值，不保证不出错，实际规则需要按业务错误代价及独立数据上的校准结果设计。单选部门只是教学任务，真实多问题工单也可以拆题处理。

第三幅对照两种工作量：高频、答案范围明确、延迟或成本敏感的小判断值得测试 Jev；偶发分类或主要需要完整回复时，现有 LLM 的 JSON 或文字输出可能足够。Jev 给判断、普通代码执行分流、LLM 写回复是一种组合方式，普通 LLM 也能完成整个流程。选择前应在同一批独立工单上比较判断错误、概率校准、延迟和成本。适用建议是基于输出能力的工程判断，不是测得的普遍性能结论。

- [TypeSafe：问题由谁定义，如何同时问多题](https://docs.typesafe.ai/primitives)
- [TypeSafe：Choice 的请求、选项与答案](https://docs.typesafe.ai/primitives/choice)
- [TypeSafe：Score](https://docs.typesafe.ai/primitives/score)
- [TypeSafe：Noul](https://docs.typesafe.ai/primitives/noul)
- [TypeSafe：模型输入与通过请求定制行为](https://docs.typesafe.ai/models)
- [TypeSafe：RLCD 与校准](https://docs.typesafe.ai/introduction/machine-learning-primer)
- [TypeSafe：并行输出、速度结果与测评限制](https://typesafe.ai/blog/introducing-system-one-models-and-jev)
- [TypeSafe：Confidence 与概率的区别](https://docs.typesafe.ai/confidence)
- [Hugging Face：Generation strategies](https://huggingface.co/docs/transformers/main/en/generation_strategies)
- [Anthropic：JSON Schema 与 constrained decoding](https://platform.claude.com/docs/en/build-with-claude/structured-outputs)

## RSI · R0、R4、R8、R9、R5、R6

本章共六页、十二个停留画面。顺序是：为什么关注 RSI → 一个改进循环 → 改 Agent 代码 → 用生成的解题过程训练模型 → 改训练工具 → 递归发生在哪里。保留章节独立开场，将原来三段的 kernel 后继假设换为两段比较与接棒。三个方法是教学组织方式，不是统一的学术分类，也不表示它们各自证明了完整 RSI。提示词、记忆和经验复用也能改变 Agent 的工作方式；self-play 等训练路线可归入改变 weights 的方向，主讲不再另开名词页。

### R4：先看一次改进

A、B、C 是预先编写的排序程序，不是 AI 的三个版本。先运行原有 A，再试只有一遍相邻交换的 B，检查失败后继续用 A；最后试插入排序 C，通过同一套测试且工作更少才替换 A。数字运动来自实际执行。工作量为比较次数加数组写入次数，两者等权，不等于运行时间。

六项固定测试检查升序以及输入值完整保留，覆盖两个局部乱序区、另一种排列、逆序、重复值与负数、空输入、单元素。通过此测试集是有限证据，不是对所有输入的正确性证明。该页说明提出、执行、评估、保留，尚未改进执行研究的 AI。

### R8：DGM 改 Agent 代码

Agent 包含基础模型、工具和流程。DGM 研究让编程 Agent 修改自己的代码，基础模型 weights 保持冻结，并在编程任务上评估变体。画面用新增补丁检查说明这类改动：补丁无法应用时返回错误，再修订。DGM 官方报告包括 patch validation、文件查看、编辑工具和历史记录等改进；画面的补丁、任务和 v1/v2 序列是作者的教学例子，不是原研究录像、真实运行日志或复现实验。

第二幅展示版本评估和复用。真实 DGM 维护有分支的版本库，可从不同旧版本探索，不是永远只保留当前最高分或最新版本；图中只画一条分支。新的 Agent 参与后续自我修改，是系统层面反馈回路的例子。编程 benchmark 的结果和对照实验支持有限范围内的改进，不能外推为无限、自主的通用能力增长。人设计任务、评估和实验边界。

### R9：STaR 用生成的解题过程做训练

STaR = Self-Taught Reasoner，是一条清楚易讲的既有研究路线，不宣称是最新或所有自训练方法的代表。它以已有问题、标准答案和少量带推理过程的示例为起点，生成解题过程；最终答案不对的例子可给出正确答案提示，让模型重试解释，再收集得到正确答案的过程用于 fine-tuning。训练结果用于生成下一轮数据。原论文每轮微调从最初的预训练 checkpoint 重启，不能把示意理解成永远在上一轮 weights 上接着训练。

画面的两道苹果题是教学例子。第二题先显示 5 + 2 = 7，再根据已知答案 10 重试，筛选后用于训练；网络连线变化仅表示 weights 会更新，没有网页内的训练或实测性能数据。题目和答案依据来自外部，不是模型无条件给自己打分。筛选看答案，因此匹配答案也可能保留有问题的解释；需要独立新题评价学习效果。这种反复训练与在一次聊天的 context 中增加提示是不同的操作。

### R5：AlphaEvolve 改训练工具

Kernel 是训练中反复执行的小段计算。此例优化矩阵乘法 kernel 的 tiling heuristic，即如何选择分块方式；它不是模型 weights 或整套训练目标。Gemini 提出改动，评估器检查正确性和性能，改进再进入 Gemini 训练。DeepMind 技术报告第 15–16 页给出相对于专家设计启发式的平均 23% kernel 加速，以及整体训练时间约 1% 减少。这说明 AI 帮助改善 AI 训练的效率，并不证明新模型更会研发。K 移动是教学示意，没有现场调用或优化真实 kernel。

### R6：比较后再解释递归

第一幅对照三处改动：Agent code、Model weights、Training tools。第二幅展示条件性回路：改进后的 system v2 回到执行改进的位置，参与下一轮，右侧 v3 仍带问号。System 可以包含模型和工具；不必把每次系统更新都说成从头训练了一个新 LLM。新任务、同预算的检查用来解释需要什么证据，图中没有虚构测评分数或赢家。DGM 的有限反馈回路、STaR 的迭代训练、AlphaEvolve 的训练效率结果，各有不同证据范围；不能据此宣布完整、无界的递归自我改进已经实现。

2026-10-15 核对以下原始资料。DGM 参数冻结与版本库来自论文第 1、3 节；STaR 的答案筛选、提示重试和初始 checkpoint 重启来自论文第 3、5 节；AlphaEvolve 数字来自技术报告的 kernel 优化部分。

- [Sakana AI / UBC：Darwin Gödel Machine](https://sakana.ai/dgm/)
- [DGM 论文](https://arxiv.org/html/2505.22954v2)
- [STaR 论文摘要](https://arxiv.org/abs/2203.14465)
- [STaR 论文全文](https://arxiv.org/html/2203.14465v2)
- [Google DeepMind：AlphaEvolve](https://deepmind.google/blog/alphaevolve-a-gemini-powered-coding-agent-for-designing-advanced-algorithms/)
- [AlphaEvolve 技术报告](https://storage.googleapis.com/deepmind-media/DeepMind.com/Blog/alphaevolve-a-gemini-powered-coding-agent-for-designing-advanced-algorithms/AlphaEvolve.pdf)
- [Anthropic Institute：When AI builds itself](https://www.anthropic.com/institute/recursive-self-improvement)

## 时间不足时

时间紧时，优先跳过过渡，直接到讲解画面，而不是另加一段总结。每页只讲当前画面的主因果：C5 更新观察才能恢复，C7 训练更新 weights、使用时更新 context，J3 比较同题输出，J5 用新题检查，R4 检查后才替换程序，R8 改工具、R9 改 weights、R5 改训练计算，R6 再说明接棒。不要把动画速度说成模型性能，或把 Google 的 kernel 成果说成已实现完整 RSI。
