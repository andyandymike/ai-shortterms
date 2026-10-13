# 第二场参考｜术语、来源与事实边界

原资料核对日期：2026-09-25；训练与递归原理补充于 2026-10-03 核对。结构与演示说明更新于 2026-10-12，本次未重新核对全部外部来源。第二场保持 16 页，主线是 Computer Use、Jev、RSI。投影使用英文，口播按页、按当前画面组织。短过渡后画面自动停住，直到讲者点击下一画面或下一页；Presenter 显示当前口播及下一画面预告，过渡进度不限制讲解时间。

## Computer Use · C1、C4、C5、C7、C6

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

## Jev · J1、J2、J3、J5、J8

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

J3 公平比较两个输出路径。普通生成式 LLM 同样能输出单个标签、约束 JSON，或者一次回答多个问题。Jev 把输出范围收窄到预先定义的决策类型，放弃自由字符串续写；多个问题共用 state，独立评估并可并行处理，不依赖前一个答案再生成下一个答案。结果与概率交给普通代码决定工作流。这里画的是接口与输出关系；完整内部架构没有公开，不声称没有 Transformer、只需一次 forward pass，或不会发生语义判断错误。动画时长也不是模型延迟。

补充参考：输出类型细节（原 J4 内容，不设独立主讲页）。主线在 J1 解释 Choice，在 J3 简述 Score 与 Noul；以下数值和计算用于备查。Choice 的清晰请求分布为 returns 0.94、billing 0.04、shipping 0.02。Score 使用五档教学 rubric：0 routine、1 soon、2 same-day、3 urgent、4 critical；概率为 0.1、0.5、0.3、0.1、0，期望分数为 0×0.1 + 1×0.5 + 2×0.3 + 3×0.1 + 4×0 = 1.4。Noul 的教学陈述是“客户想退货”，概率为 0.96。它们不是实测成绩；没有提供 confidence 的示例不另编一个数值。

J5 依次留住训练反馈、参数更新、未揭晓的新题与检查结果。重复扣款但保留鞋子的邮件，对照 v1 错误预测 returns、0.95 与已知答案 billing；多种工单的反馈进入 weights 更新；固定 v2 参数后，先解释独立新题的预测概率，再整体揭晓八对两错的教学结果。0.80 属于新题，与原例子的 0.95 无直接增减关系。图示是通用原理，RLCD 的具体更新算法未公开，不能把它当成真实训练记录。一条错误不能证明整体校准不足；十个例子也不能证明训练有效或 Jev 的测评成绩。0.8 不保证每十次必有八次正确，calibration 需要大量独立样本。

补充参考：概率与 confidence 细节（原 J6 内容，不设独立主讲页）。J8 使用简化后的教学邮件，借用了官方 Choice 文档混合工单的部门数值；退货原因的对照留在本参考稿，不在主线另开一页。原例数值为：department 为 returns 0.61、billing 0.35、shipping 0.04，confidence 0.42；return_reason 的 wrong_size 概率为 1.0、confidence 为 1.0。输入已经改编，不能把借用数值说成对这封新邮件的测量或现场调用。它说明同一份材料对不同问题可以具有不同的不确定性。

J8 在同一页用两段连接分布与路由。第一段展示同时要求退货、处理重复扣款的混合请求，停在路线尚未选择的位置，让观众先判断；第二段将信封交给人澄清，并保留完整分工：Jev 做有限判断，普通代码选分支，生成式 LLM 写回复或由人澄清。教学分流规则不是通用生产阈值。Jev 当前接受文字 / JSON，不直接接收图像、音频或视频；界面任务还需要视觉模型与工具。是否采用它，要用自己的任务和相同质量要求比较准确性、calibration、成本与延迟，不能仅凭演示下结论。

- [TypeSafe：Introducing System One models and Jev](https://typesafe.ai/blog/introducing-system-one-models-and-jev)
- [TypeSafe：Models / supported inputs](https://docs.typesafe.ai/models)
- [TypeSafe：Choice / support-ticket example](https://docs.typesafe.ai/primitives/choice)
- [TypeSafe：Score](https://docs.typesafe.ai/primitives/score)
- [TypeSafe：Noul](https://docs.typesafe.ai/primitives/noul)
- [TypeSafe：Confidence](https://docs.typesafe.ai/confidence)
- [TypeSafe：Machine-learning primer / RLCD](https://docs.typesafe.ai/introduction/machine-learning-primer)
- [Hugging Face：Generation strategies / decoding](https://huggingface.co/docs/transformers/main/en/generation_strategies)
- [Anthropic：Structured outputs](https://platform.claude.com/docs/en/build-with-claude/structured-outputs)

## RSI · R1、R4、R5、R6

RSI = Recursive Self-Improvement，递归自我改进。R1 直接区分当前答案的修正、可复用方法的改进，以及更有研究能力的后继系统继续推动下一轮改进。递归要求改进能力能够传到后续循环，不能把三种变化直接等同。

研究实现与实验耗时的动机已并入 R1，原 R3 的抽象候选筛选动画省略。R4 直接用本地执行的确定性排序实验展示提出候选、检查与保留。A 完整重复相邻比较与交换；B 只走一遍；C 将每个元素插入已经有序的左侧。数字方块位置来自执行轨迹。工作量等于比较次数加数组写入次数，两种操作等权，只用于本例；不等于实测时间、CPU 指令数或通用性能。

独立检查同时验证升序和输入值是否完整保留，再运行固定的六项测试：含两个局部乱序区的输入、另一种排列、完全逆序、重复值与负数、空数组、单元素。投影显示通过数与检查后的工作量。候选只有全部通过，并且在同一测试组上比当前方法操作更少，才会被保留。B 不能因为操作少就替换正确候选。主线依次留住四个结果：运行并检查 A；运行 B 但尚未检查、尚未标红，留给观众判断；检查并拒绝 B；运行、检查并保留 C。比较时测试组始终相同，不另外讲解排序算法或重复换输入运行。

这些候选由演示作者事先编写，不是现场 AI 生成。它说明有限目标上的提出、执行、验证、保留循环；通过六项测试既不证明所有输入都正确，也不证明完整 RSI。

R5 在同一画面呈现 AlphaEvolve 的 Gemini 提案、自动评估流程及报告结果，不再重复演示筛选循环。Google DeepMind 报告某个矩阵乘法 kernel 加速 23%，带来 Gemini 整体训练时间约 1% 的减少。Kernel 在此是训练中反复使用的小段计算程序。组件快 23% 不等于整体训练快 23%，也不等于模型智力提高 23%。这是有明确范围的算法优化证据。

R6 依次留住一条假设路径的关键画面：A 发现材料偏重成功实验，提出加入失败原因与排查练习；按新配方训练 B，但研究能力尚未验证；用没参与训练的研究任务比较 A、B 的诊断与实验提案能力；最后说明进入下一轮的条件。作为补充原理，训练中的练习与目标比较可产生 loss（误差），用于反复更新 weights；主讲不再单独增加 loss 术语课。只有确有研究能力改善，才有理由让 B 尝试下一轮配方修改，能否造出更好的 C 仍需检验。补充失败案例只是教学假设，未在项目中实测；参数训练也只是改进后继的一种路线，不是 RSI 唯一算法。人定义目标、评估、权限和停止条件。

- [Google DeepMind：AlphaEvolve](https://deepmind.google/blog/alphaevolve-a-gemini-powered-coding-agent-for-designing-advanced-algorithms/)
- [PyTorch：训练、loss 与参数更新](https://docs.pytorch.org/tutorials/beginner/basics/optimization_tutorial.html)
- [Anthropic Institute：When AI builds itself](https://www.anthropic.com/institute/recursive-self-improvement)

## 时间不足时

各画面停留时间由讲者决定，没有讲解倒计时。时间紧时，可缩短解释或用「直接到讲解画面」跳过当前画面的过渡；主按钮继续到下一画面。建议保留 C5 的观察与修正、C7 的训练与 inference、J3 的公平比较、J5 的独立检查、J8 的歧义分流，以及 R5–R6 从组件改善到后继研究能力的区别。不要把动画速度讲成模型性能；R4 即使跳到结果，也应说明 B 未完成任务、C 经过独立检查才被保留。
