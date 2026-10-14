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

Jev 是 TypeSafe 的模型名，System One 是厂商对这类决策模型的称呼。2026-10-14 复核官方接口、Models、RLCD 介绍和发布文章。这一章保留 6 页、12 个停留画面：J1 从一幅改为两幅，让观众看见题目数量可以变；J5 从四幅收为三幅。全场仍为 19 页、36 个画面、25 组讲解。

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

J2 延续 We can help. 的短句，解释常见自回归 LLM 如何逐 token 生成；先留住第一个 token，再生成完整句子。候选概率与 token 切分均为教学示意。

J3 两边回答与 J1 相同的两道题，并使用相同的教学概率。左边明确是 LLM + JSON Schema：普通 LLM 也能在一次请求中回答多题、按格式返回 JSON。画面按可读片段逐步显示，不是实际 tokenizer 或 API 调用记录。右边按 TypeSafe 的公开说明展示并行概率输出：多个问题共用 state，但各自的答案不作为其他题的隐藏 context。对 Choice 而言，多个选项的概率共同构成一份答案，并不相互独立；独立性指不同问题的评估。

JSON 是 API 交付结果的形式。根据厂商所述，Jev 模型不靠自回归文字生成来写出这些概率，API 仍可把结构化结果组织成 JSON。因此区别不能概括为“一个逐字写三个字段，另一个固定同时写三个字段”。完整内部架构没有公开；不声称每次只需一次 forward pass、不含 Transformer 或不会判断错。格式合法也不保证答案正确或概率校准，普通 LLM 同样可以另行训练或校准。

### 训练与校准

J5 的三个画面用一般训练原理解释 RLCD 的目标，没有复现厂商算法或数据。先看一封重复扣款但保留商品的邮件：示意模型错误地给 returns 0.95，已知答案为 billing。再展示许多带答案例子提供反馈、反复调整 weights；同一封邮件的示意预测变成 returns 0.10、billing 0.88、shipping 0.02。变化不是单个错例的固定更新公式，也不是实测提升。

最后换成未参与训练的新邮件，weights 固定，模型给 billing 0.80，再揭晓答案及十个小格。八对两错帮助解释 calibration：很多接近 0.8 的预测，其正确比例应接近 80%。一封答对或十个示例不能证明校准，任意十次也不保证恰好八次正确。RLCD 的正式英文名放在术语和参考资料中，口播重点跟随“练习、反馈、调整、新题检查”的画面，不反复念长定义。

### 为什么可能更快，什么时候考虑使用

J8 第一幅只展开计算步骤。两边都是一次请求，也都需要处理输入；中间的输出工作不同：常见自回归 LLM 反复生成下一个 token，Jev 按厂商所述并行输出判断概率。减少顺序输出工作是降低延迟的一个原因，厂商还描述了专门的架构、parallel sampler 和训练方法。不能把原因归结为省掉聊天界面、JSON.parse、三个网络调用，或仅仅少输出几个字符。

图中方框宽度、出现顺序和播放时长均不表示实测耗时。实际比较还取决于输入长度、对比模型及 reasoning 设置、输出要求、硬件和网络。厂商发布的测试报告了速度优势，但也说明短输入对 Jev 有利，某些 LLM 对照使用生成完整概率的 wrapper，这比仅输出标签更慢。主讲不套用一个普遍倍数，也没有把演示动画当性能证明。

第二幅回到退货邮件：每来一封工单，Jev 给出处理部门，普通代码将它分到队列，需要文字回复时可交给 LLM。这是一种分工示例，普通 LLM 也可以完成同一流程。高频、范围明确的判断值得测试专门模型；偶发分类或本就需要完整回复时，现有 LLM JSON 可能足够。选择前应在同一批独立工单上比较判断错误、概率校准、延迟和成本。该页删掉了原来的两份大 JSON、三条工单及密集选型文字。

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

各画面停留时间由讲者决定，没有讲解倒计时。时间紧时，可缩短解释或用「直接到讲解画面」跳过当前画面的过渡；主按钮继续到下一画面。建议保留 C5 的观察与修正、C7 的训练与 inference、J3 的公平比较、J5 的独立检查、J1 的自定义问题、J8 的输出工作与工单分流，以及 R5–R6 中同一项 kernel 改进如何可能进入后继和下一轮研发。不要把动画速度讲成模型性能；R4 即使跳到结果，也应说明 B 未完成任务、C 经过独立检查才被保留。
