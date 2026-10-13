# 第二场双语排练稿｜Talk 02 bilingual rehearsal

同一份内容按 **19 页**组织，实际演讲选一种语言。页内段落对应当前留住的画面，不增加新的讲解主题。

打开观众页底部的 **Presenter ↗**。动画与影片默认等待点击播放。主按钮先进入下一画面或下一页，再点同一个按钮播放；每段短过渡后自动停住，讲完再继续。引用块只标画面，不用念。目录、章节链接与刷新同样等待播放；回退保留上一画面，重播会重新播放当前这一段。

Choose one language for the talk. Animations and the film wait for play. The main button first enters the next visual or page; press the same button again to play. Each short transition ends in a visual that holds until you finish speaking. Blockquotes identify the visual and are not spoken. Direct navigation also waits for play. Back holds the previous visual; Replay explicitly restarts the current one.

## 01 · O1｜本场内容概览 / Talk 02 overview

[打开本页](/session-2#opening/O1)

**中文**

今天讲 Computer Use、Jev 和 RSI：AI 怎样在软件里把事情办完？流程需要判断时，为什么考虑专门的模型？AI 能不能参与制造下一代 AI？每章沿着一个例子往前走。画面里的小实验帮助我们看清原理，不是现场调用这些模型。先从 Computer Use 开始。

**English**

Today we’ll connect Computer Use, Jev and RSI through three questions. How can AI finish a task inside software? When a workflow needs a decision, why consider a specialized model? And can AI help build the next AI? Each chapter follows a concrete example. The small experiments illustrate the mechanism; they are not live calls to these models. Let’s start with Computer Use.

---

## 02 · C0｜Computer Use 是什么 / Computer Use

[打开本页](/session-2#computer-use/C0)

**中文**

Computer Use，就是让 AI 通过软件界面做事。AI 看屏幕、决定下一步，再由工具执行点击或输入。用一笔退货看看，它怎样把事情办完。

**English**

Computer Use lets AI act through a software interface. The AI observes the screen and decides what to do; tools carry out clicks or typing. Let’s see how it completes a customer return.

---

## 03 · C1｜为什么需要 Computer Use / Why Computer Use?

[打开本页](/session-2#computer-use/C1)

**中文**

客户要给 1048 号订单退货。AI 告诉我们点哪里，还不算办完，应用里得出现退货记录。软件如果提供 API，也就是给程序调用的接口，可以直接请求创建退货；需要在屏幕上处理时，再观察和操作界面。实际工作可以把两条路接起来。跟着界面这条路，走到完成。

**English**

The customer wants to return order 1048. Instructions about where to click are not enough; the app needs an actual return record. An API provides a direct interface for programs, so an available API can create the return directly. When work requires the screen, the system observes and operates the interface. A workflow can combine both routes. Let’s follow the interface route to completion.

---

## 04 · C4｜Computer Use 如何工作 / How Computer Use works

[打开本页](/session-2#computer-use/C4)

**中文**

> 留住画面：定位输入框

截图进入 context，也就是模型这次判断能用的目标、画面和操作记录。把“订单号输入框”对应到画面上的位置，叫 UI grounding。

> 留住画面：完整表单

模型再发出 tool call，请工具点击和键入。动作改变界面，新的观察又影响下一步。

> 留住画面：新截图确认退货已创建

最后提交成功，新截图带回回执，这才拿到完成证据。Agent 把目标、观察、工具和反馈串成这样一个循环。界面突然变了，原计划还能用吗？

**English**

> Hold this visual: Locate the field

First, the screenshot joins the context: the goal, screen and action history available for this decision. UI grounding connects “the order-number field” to a position on screen.

> Hold this visual: The completed form

A tool call asks a tool to click or type. Actions change the app, and fresh observations inform the next step.

> Hold this visual: A fresh screenshot confirms the return

Finally, submission produces a receipt, and a new screenshot supplies evidence of completion. The agent connects goals, observations, tools and feedback in this loop. Will the old plan work if the interface changes?

---

## 05 · C5｜Computer Use 如何处理意外 / How Computer Use recovers

[打开本页](/session-2#computer-use/C5)

**中文**

> 留住画面：旧位置点击失败

这次加一个变化：弹窗挡住了表单，但右边仍然是旧截图。模型按照旧画面给出了点击，工具也确实执行了。问题是，它点在遮挡层上，退货没有创建。只检查“鼠标点过没有”，就会误判完成。先停在这里：下一步该继续点，还是重新看一眼？

> 留住画面：新截图看见弹窗，定位关闭按钮

新截图把弹窗带进 context，下一步就有依据了：先关弹窗，再提交，最后看回执。

> 留住画面：新截图确认完成

它没有死守原来的动作列表，而是按眼前的情况修正计划。这里发生的是一次运行过程中的纠正。我们还可以问得更早一点：模型最初是怎样学会看界面、选动作的？先看看训练怎样让这种能力形成。

**English**

> Hold this visual: The stale click fails

Now a popup covers the form, but context still contains the old screenshot. The model requested a click from that old view, and the tool executed it. It hit the overlay, so no return was created. Checking only whether the mouse clicked would give the wrong impression. Pause here: should it click again, or take another look?

> Hold this visual: The fresh screenshot shows the popup and locates Close

The fresh screenshot brings the popup into context. Now the next steps have a basis: dismiss it, submit again and check the receipt.

> Hold this visual: A fresh screenshot confirms success

The plan changes with the observed situation instead of following the old action list blindly. This is a correction during use. We can also ask an earlier question: how did the model learn to read interfaces and choose actions? Let’s see how training develops this capability.

---

## 06 · C7｜Computer Use 如何训练 / How Computer Use is trained

[打开本页](/session-2#computer-use/C7)

**中文**

> 留住画面：练习结果进入反馈

训练会让模型练习许多任务：找按钮、填写信息、完成流程，再用结果提供反馈。

> 留住画面：训练得到新模型

训练程序根据这些反馈，反复调整 weights，也就是模型内部学到的参数。这样改变的是以后处理新任务的能力。以 OpenAI 的 CUA 为例，公开介绍包含强化学习，让模型通过尝试和反馈学习操作。这里把许多轮练习缩成了一段示意。

> 留住画面：截图变了，weights 保持不变

现在把按钮换个位置。模型读到新截图，更新 context，重新定位目标。刚才学到的 weights 保持不变，就像学会开车以后，看到新的路口要换路线，不需要每过一个路口就重新学开车。前一段训练留下能力，这一段使用眼前的信息。弹窗恢复属于后者。再到 Blender 看一次真实创作。

**English**

> Hold this visual: Practice outcomes become feedback

Training gives the model many tasks: finding controls, entering information and completing workflows. Their outcomes provide feedback.

> Hold this visual: Training produces an updated model

The training process uses this feedback to adjust weights, the model’s learned parameters. These changes affect future tasks. OpenAI’s CUA, for example, uses reinforcement learning to learn through attempts and feedback. This illustration condenses many practice rounds.

> Hold this visual: New screenshots, fixed weights

Now move the button. The model reads a fresh screenshot, updates context and locates the target again. Its learned weights stay fixed. Once you’ve learned to drive, a new junction may change your route without requiring another driving course. Training establishes capability; use applies that capability to current information. Recovering from the popup belonged to the latter. Now let’s see a real creative task in Blender.

---

## 07 · C6｜Computer Use 的 Blender 案例 / Computer Use in Blender

[打开本页](/session-2#computer-use/C6)

**中文**

> 留住画面：成片静帧与 bpy → render → Computer Use 流程

这段约三十秒的影片，是发布案例里的真实 Blender 成片。旁边是工作流程：用 bpy，也就是 Blender 的 Python API，建立可编辑场景；再 render，根据物体、相机和灯光算出图像；然后通过 Computer Use 打开 Blender 检查结果。影片展示创作成果，不是鼠标操作录像。这项工作把直接调用和视觉检查接在了一起。流程除了操作，还需要判断。

**English**

> Hold this visual: Source still and the bpy → render → Computer Use workflow

This approximately thirty-second film is a real Blender render from the published case. Follow the workflow alongside it: bpy, Blender’s Python API, builds an editable scene. Rendering then produces images from the objects, camera and lighting. Computer Use opens Blender to inspect the result. The film shows the creative output, not a recording of mouse actions. Direct programmatic control and visual inspection contribute to the same task. Alongside actions, workflows need decisions.

---

## 08 · J0｜Jev 是什么 / Jev

[打开本页](/session-2#jev/J0)

**中文**

Jev 是 TypeSafe AI 的 System One 模型，面向范围明确的判断任务，比如分类和评分。这一章看它怎样把判断交给后续流程。先让一封客户邮件找到处理部门。

**English**

Jev is TypeSafe AI’s System One model for bounded decision tasks, such as classification and scoring. This chapter follows a decision into the next step of a workflow. Start by choosing a team for a customer message.

---

## 09 · J1｜Jev 能做什么 / What Jev does

[打开本页](/session-2#jev/J1)

**中文**

> 留住画面：Choice 返回预设选项

邮件说鞋子尺码不合适，想退货。系统需要先选处理部门。输入材料叫 state，这里是一封邮件，也可以加入相关记录。Choice 就是从预先给好的选项中选择，比如退货、账单或物流。定义清楚问题和答案范围，结果就容易接入后续流程。先看普通 LLM 怎样生成答案。

**English**

> Hold this visual: Choice returns a predefined option

The message says the shoes are the wrong size and asks for a return. The system needs to choose a team before drafting a reply. State is the input material: a message here, potentially with relevant records. Choice selects from predefined options, such as returns, billing or shipping. Defining the question and answer space makes the result usable by the workflow. First, how does an ordinary LLM generate an answer?

---

## 10 · J2｜Decoding 如何工作 / How decoding works

[打开本页](/session-2#jev/J2)

**中文**

> 留住画面：We 已加入 context，下一轮候选已出现

Decoding 就是逐步选出下一个 token，接到已有内容后面。Token 可能是词、字符或文字片段。画面先选 We，把它加入 context，再预测适合接什么。

> 留住画面：We can help.

于是逐步得到 We can help。每一步都以刚刚生成的内容为条件。这一句短话展开了普通 LLM 生成文字的过程。把同一封邮件交给两种模型。

**English**

> Hold this visual: We has joined context; the next candidates are visible

Decoding selects the next token and appends it to what is already there. A token can be a word, character or piece of text. The demo chooses We and adds it to context, then predicts what can follow.

> Hold this visual: We can help.

This eventually produces We can help. Each step depends on the content generated so far. This short sentence makes the ordinary LLM’s text-generation process visible. Let’s give both models the same message.

---

## 11 · J3｜Jev 与普通 LLM 的输出方式 / How Jev differs from an LLM

[打开本页](/session-2#jev/J3)

**中文**

> 留住画面：JSON 答案生成完毕

左边给普通 LLM 加上 JSON Schema，也就是规定字段、类型和允许的值。它完全可以一次返回合法 JSON、回答多个问题。约束 decoding 会限制哪些 token 可以出现，但答案仍然逐段生成；这里展示的是可读片段，不是它真实的 token 切分。

> 留住画面：两条输出路径并排对照

右边的 Jev 收窄了输出能力：不续写自由文本，而是回答预先定义的问题。多个问题共用 state，独立判断并可并行处理。Choice 做分类，Score 按标准评分，Noul 返回一个陈述的概率。两边都能把结果交给代码；差别在模型面向什么来训练和输出。这里不做速度比较。从一个错例看训练和校准。

**English**

> Hold this visual: The JSON answer is complete

On the left, an ordinary LLM uses JSON Schema to specify fields, types and allowed values. It can return valid JSON and answer several questions in one call. Constrained decoding limits which tokens may appear, while the response is still generated sequentially. These are readable display fragments, not an actual tokenizer trace.

> Hold this visual: Both output paths remain side by side

Jev narrows its output capability: it answers predefined questions instead of continuing free-form text. Questions share state, are evaluated independently and can run in parallel. Choice classifies, Score uses a scoring standard, and Noul returns a proposition’s probability. Both routes give results to code; their training and output design differ. This animation is not a speed comparison. A mistaken example will introduce training and calibration.

---

## 12 · J5｜Jev 如何训练 / How Jev is trained

[打开本页](/session-2#jev/J5)

**中文**

> 留住画面：预测 returns 0.95，已知答案是 billing

先看这一封：钱扣了两次，但鞋子要留下。模型却选了退货，给出 0.95；对照右边的已知答案，应该交给账单部门。训练时，我们可以把这种差异作为反馈：不只看选对没有，还要看它给出的概率。一次错例说明这次需要反馈，不能单凭它评价整个模型的校准程度。

> 留住画面：同一封邮件的预测从 returns 变为 billing

现在让许多带答案的例子一起提供反馈，反复更新 weights，也就是模型内部影响判断的参数。再看同一封邮件，预测条从退货移向账单，这样就能看见训练改变了什么。TypeSafe 把面向决策和校准概率的后训练称为 RLCD。画面里的 v1、v2 和数值只是示意，不代表看过这一封就必定这样变化；公开资料也没有披露具体更新算法。学会旧题还不够，接下来换新题。

> 留住画面：新邮件预测 billing 0.80，答案暂不揭晓

这次换成订单 2062：付款被处理了两遍。它没参与刚才的训练，措辞也不同。现在 weights 固定，只让模型作答。它给账单部门约 0.80 的概率。先把答案藏起来，是为了区分“靠训练记住旧题”和“面对新材料作判断”。

> 留住画面：新邮件选对；十个教学结果帮助解释 calibration

这封的答案确实是账单，但一封答对还不够。Calibration，校准，要看很多次：模型报出约八成概率的那些判断，长期是否也约八成正确。下面用十个结果里的八对两错帮助理解。这不是 Jev 的实测成绩，也不保证每十次都恰好八对。训练目标是一回事，换到自己的任务上是否做到了，还得这样检验。那么，普通 LLM 直接返回同样的 JSON，不也可以吗？

**English**

> Hold this visual: Prediction: returns at 0.95; known answer: billing

Start with one email: the customer was charged twice but is keeping the shoes. The model picks returns with probability 0.95; the known answer on the right is billing. During training, this mismatch can provide feedback on both the decision and its probability. One mistake provides feedback for this example; it does not establish the model’s overall calibration.

> Hold this visual: The same email now receives billing instead of returns

Now many labeled examples provide feedback for repeated updates to weights, the internal parameters that shape predictions. Revisit the same email: the bars move from returns toward billing, making the illustrated change visible. TypeSafe calls its post-training for decisions and calibrated probabilities RLCD. The versions and numbers are illustrative, not a guaranteed change after seeing one email; the detailed update algorithm is not disclosed here. Doing better on an old case is not enough, so test new ones next.

> Hold this visual: The new email receives billing at 0.80; its answer is hidden

This time, payment for order 2062 went through twice. This differently worded email did not contribute to training. Keep the weights fixed and ask for a prediction: billing at about 0.80. Hiding the answer distinguishes revisiting a training example from making a decision on new material.

> Hold this visual: This email is correct; ten illustrative outcomes explain calibration

The correct answer is billing, but one correct prediction is not enough. Calibration requires many cases: among predictions near eighty percent, are roughly eighty percent correct over time? Eight successes out of ten below illustrate the idea. They are not measured Jev results, and every group of ten need not contain exactly eight successes. A training objective is one thing; checking that it holds on your tasks is another. Could an ordinary LLM simply return the same JSON?

---

## 13 · J8｜为什么考虑 Jev，而不只用 LLM JSON / Why use Jev instead of LLM JSON?

[打开本页](/session-2#jev/J8)

**中文**

> 留住画面：同样的合法 JSON，继续看训练和概率质量

可以。这里故意让两边返回一模一样的 JSON，连数字都一样；它们是教学数值，没有现场调用模型。给 LLM 加 JSON Schema，完全可以解决字段和格式问题。但写出 0.61，不等于这个概率已经校准。Jev 的区别是专门面向这类有限判断和概率来训练、提供输出。普通 LLM 也能做额外训练或校准；Jev 也必须实测。选择它的理由不能只是“会返回 JSON”。

> 留住画面：三封邮件完成分流，再比较是否值得换模型

把工作放大到每天反复分流工单：问的总是“交给哪个部门”，代码真正需要的是选项和可用的概率。这里按教学规则，概率达到 0.80 才直接分流，混合诉求交给人复核；用普通 LLM 也能实现。考虑 Jev，是因为这项工作不需要自由续写，而它把训练和输出集中在判断上，值得检查是否能在同样质量下减少延迟和成本。偶尔分类，或本来就需要一封完整回复，LLM JSON 可能已经够用。最终拿同一批新工单比较判断错误、校准、延迟和成本；演示不替我们宣布谁赢。再看 AI 能否帮助改进下一代 AI。

**English**

> Hold this visual: Identical valid JSON; examine training and probability quality

Yes. Both sides deliberately show identical JSON, including the numbers. These are teaching values, with no live model calls. JSON Schema can constrain an LLM’s fields and format, but writing 0.61 does not establish calibration. Jev’s distinction is specialized training and outputs for bounded decisions and probabilities. Ordinary LLMs can also receive additional training or calibration, and Jev still requires evaluation. Returning JSON alone is not a reason to choose it.

> Hold this visual: Three tickets are routed; compare whether changing models is worthwhile

Scale this to routing tickets repeatedly every day. The question stays the same: which team? Code needs a choice and usable probabilities. Under our illustrative rule, a top probability of at least 0.80 routes directly; the mixed request goes to human review. An ordinary LLM can do this too. Jev is worth considering because this job does not need free-form generation, and its training and outputs focus on decisions: test whether that reduces latency or cost at the same required quality. For occasional classification, or a workflow already needing a complete written reply, LLM JSON may suffice. Compare errors, calibration, latency and cost on the same new tickets; this demonstration does not declare a winner. Now, can AI help improve the next AI?

---

## 14 · R0｜RSI 是什么 / RSI

[打开本页](/session-2#rsi/R0)

**中文**

RSI 是 Recursive Self-Improvement，递归自我改进。它问的是：AI 能否帮助造出更有能力的后继，而后继又更擅长推动下一轮改进？关键在于，改进能力能不能继续传下去。

**English**

RSI means Recursive Self-Improvement. Can AI help build a more capable successor that becomes better at driving another improvement cycle? The key is whether improvement ability can carry forward.

---

## 15 · R1｜递归改进是什么意思 / What recursive improvement means

[打开本页](/session-2#rsi/R1)

**中文**

研究常常有很多想法，缺的是实现和实验的时间，所以会让 AI 帮忙提出、实现和检查方案。图里的 A 帮助改进出 B，B 通往下一轮的箭头仍然带着问号：它是否真的更擅长研究，能不能把改进能力传下去，都需要验证。让同一个模型改写一次答案，还没有走到这个问题。用一个小实验看看，什么改进值得留下。

**English**

Research often has more ideas than time for implementation and experiments, motivating AI assistance with proposals, implementation and checks. Here A helps improve B, but the arrow from B into another cycle still has a question mark. Whether B is better at research, and whether that ability carries forward, must be tested. Asking the same model to revise one answer does not establish that. A small experiment will show which changes deserve to stay.

---

## 16 · R4｜如何检验一次改进 / How to test an improvement

[打开本页](/session-2#rsi/R4)

**中文**

> 留住画面：保留已验证的 A

任务很简单：把数字从小到大排好，一个也不能丢。事先写好的程序在本地真正运行，方块和计数来自实际操作。A 已排好并通过检查，下面是它用的操作量。

> 留住画面：B 已运行完，正确性尚未检查

再换 B。B 用的操作明显少了。先别急着替换：结果还没有检查。你会根据操作量直接留下 B 吗？

> 留住画面：B 没有通过正确性检查

一检查，B 的顺序还不对。少做了操作，却没有完成任务，所以淘汰。

> 留住画面：保留通过测试且操作更少的 C

接着运行 C：它通过六项检查，在同一组测试里也比 A 用更少的操作，这才值得替换。留下的是一个下次还能使用的程序。六项测试支持的是这组结果，不能证明所有输入都正确。这里最重要的是提出候选之后，必须有独立检查。真实研究中的 AlphaEvolve 也使用这条思路。

**English**

> Hold this visual: Keep verified A

The task is simple: put the numbers in ascending order without losing any. These prewritten programs run locally; the movements and counts come from their actual operations. A has sorted the numbers and passed the checks. Below is the work it used.

> Hold this visual: B has finished; correctness is unchecked

Now B uses noticeably less work. Before replacing A, remember that B’s result has not been checked. Would the lower operation count alone persuade you to keep B?

> Hold this visual: B fails the correctness check

The check reveals that B’s output is still out of order. It did less work without completing the task, so it is rejected.

> Hold this visual: Keep C after it passes with less work

C then passes all six checks and uses less work than A on the same suite, earning its place as the retained program. That program can be reused on later tasks. Six tests support these results, not correctness for every possible input. A proposal needs an independent check. AlphaEvolve uses this approach in real research.

---

## 17 · R5｜AI 如何改进训练 AI 的工具 / How AI improves AI training

[打开本页](/session-2#rsi/R5)

**中文**

> 留住画面：改进后的 kernel 已进入 Gemini 训练过程

看这段代码从哪里来，又到哪里去。AlphaEvolve 用 Gemini 提出代码改法，再检查结果是否正确、运行是否更快。Kernel 就是训练时反复调用的一小段计算程序。通过检查的改进，又进入 Gemini 的训练过程。DeepMind 报告，这个矩阵计算 kernel 提速 23%，让整体训练时间减少约 1%。这两个数是局部和整体的结果证据；这一页的重点是，AI 已经能帮助改进用来训练 AI 的工具。接下来沿着这项节省，看看还要补上什么，才能形成递归。

**English**

> Hold this visual: The improved kernel enters Gemini training

Follow where this code comes from and where it goes. AlphaEvolve uses Gemini to propose code changes, then checks correctness and speed. A kernel is a small compute routine called repeatedly during training. The validated improvement enters Gemini’s training process. DeepMind reported a 23% speedup for this matrix kernel, reducing total training time by about 1%. The figures describe the component and the whole process; the central point is that AI can help improve the tools used to train AI. Follow that saving next: what else would be needed to make improvement recursive?

---

## 18 · R6｜改进如何进入下一代，并形成递归 / How improvement becomes recursive

[打开本页](/session-2#rsi/R6)

**中文**

> 留住画面：有了后继 B，但还不知道它是否更擅长改进

上面保留刚才有报告支持的结果：kernel 改善让训练更高效。下面开始是假设延伸。把当前帮助做研发的 AI 叫 A：如果把节省的算力用于更多训练或实验，可能得到后继 B。但训练更省，不会自动让 B 更聪明，更不保证它更会做研究，所以这里保留问号。

> 留住画面：相同任务与预算，检验 B 是否更会改进

怎样检查？继续用同一种工作：换一段没有参与刚才开发的 kernel，给 A 和 B 相同的任务与尝试预算。看谁能找到结果正确、提速有用的改法。这里测的是 B 能否更好地参与下一次改进，而不只是上次训练省了多少时间。

> 留住画面：若 B 的改进帮助开发 C，下一代再次接受检验

假如 B 确实更擅长这项工作，就让它接过原来 A 的位置，提出下一项 kernel 改进，再帮助开发 C。C 也要重新检验。Recursive，递归，强调的就是这种反馈：上一轮得到的更有能力的 AI，又参与推动下一轮改进。图里的后半段是需要验证的路径；Google 的那项 kernel 成果本身，还没有证明这个循环成立。回到开场的三个问题。

**English**

> Hold this visual: Successor B exists in this scenario; its improvement ability is still unknown

The reported result stays at the top: the improved kernel makes training more efficient. What follows is hypothetical. Call the current AI research assistant A. Reinvesting saved compute in more training or experiments might help produce successor B. More efficient training does not automatically make B more capable, especially at research, so its ability remains a question.

> Hold this visual: The same tasks and budget test whether B is better at improving

How would we test that? Keep the type of work the same: use new kernels excluded from the earlier development, and give A and B the same tasks and experiment budget. Compare their ability to find correct changes with useful speedups. This tests whether B can contribute more to the next improvement, beyond the time saved in its own training.

> Hold this visual: If B’s improvement helps develop C, that successor is tested again

If B is better at this work, it can take the role A held, propose the next kernel improvement, and help develop C. C must be evaluated again. Recursive describes this feedback: the more capable AI produced by one round contributes to the next round of improvement. The latter part of this diagram is a path to test; Google’s reported kernel result alone does not establish the cycle. Let’s return to the three opening questions.

---

## 19 · E1｜三个概念的比较 / Comparing the three concepts

[打开本页](/session-2#closing/E1)

**中文**

Computer Use 让 AI 通过界面行动，我们检查应用里的目标有没有完成。Jev 面向定义清楚的判断，我们检查它在真实任务中是否可靠、是否适合接入流程。RSI 关注改进能力能否进入后继并继续循环，这要靠逐轮的独立验证。遇到新的 AI 术语，可以沿着今天这条线去看：它做了什么，能力从哪里来，结果又怎样检查。今天先讲到这里。

**English**

Computer Use lets AI act through interfaces; we check whether the application reached the goal. Jev targets defined decisions; we check reliability and suitability in the real workflow. RSI concerns improvement ability passing to a successor and continuing the cycle, which requires independent evidence at each round. For a new AI term, follow the same questions: what does it do, where does its capability come from, and how do we check the result? That’s where we’ll finish today.
