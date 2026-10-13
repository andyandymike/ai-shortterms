# 第二场双语排练稿｜Talk 02 bilingual rehearsal

同一份内容按 **16 页**组织，实际演讲选一种语言。页内段落对应当前留住的画面，不增加新的讲解主题。

打开观众页底部的 **Presenter ↗**。每次短过渡后，画面自动停住，留给讲者和观众充分时间。讲完当前段落，再按主按钮进入下一画面或下一页；不会按倒计时催你继续。引用块只标画面，不用念。目录、章节链接与刷新先准备画面；回退和重播针对当前画面。

Choose one language for the talk. Each visual holds after its short transition for as long as you need. Finish its paragraph, then use the main button for the next visual or page. No countdown controls speaking time. Blockquotes identify the visual and are not spoken. Direct navigation prepares the page; Back and Replay apply to the current visual.

## 01 · O1｜今天的三个问题 / From answers to actions.

[打开本页](/session-2#opening/O1)

**中文**

今天讲 Computer Use、Jev 和 RSI：AI 怎样在软件里把事情办完？流程需要判断时，为什么考虑专门的模型？AI 能不能参与制造下一代 AI？每章沿着一个例子往前走。画面里的小实验帮助我们看清原理，不是现场调用这些模型。先给客户创建一条退货申请。

**English**

Today we’ll connect Computer Use, Jev and RSI through three questions. How can AI finish a task inside software? When a workflow needs a decision, why consider a specialized model? And can AI help build the next AI? Each chapter follows a concrete example. The small experiments illustrate the mechanism; they are not live calls to these models. Let’s create a return request for a customer.

---

## 02 · C1｜为什么让 AI 操作界面 / Two routes into the same app.

[打开本页](/session-2#computer-use/C1)

**中文**

客户要给 1048 号订单退货。AI 告诉我们点哪里，还不算办完，应用里得出现退货记录。Computer Use 就是让 AI 通过软件界面做事。软件如果提供 API，也就是给程序调用的接口，可以直接请求创建退货；需要在屏幕上处理时，再观察和操作界面。实际工作可以把两条路接起来。跟着界面这条路，走到完成。

**English**

The customer wants to return order 1048. Instructions about where to click are not enough; the app needs an actual return record. Computer Use lets AI act through a software interface. An API provides a direct interface for programs, so an available API can create the return directly. When work requires the screen, the system observes and operates the interface. A workflow can combine both routes. Let’s follow the interface route to completion.

---

## 03 · C4｜从观察到完成 / See. Act. Check.

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

## 04 · C5｜动作执行了，事情办成了吗 / Change the screen. What now?

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

## 05 · C7｜能力怎样通过练习形成 / Practice changes the model.

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

## 06 · C6｜Blender：代码与视觉检查配合 / Blender: build, render, inspect.

[打开本页](/session-2#computer-use/C6)

**中文**

> 留住画面：成片静帧与 bpy → render → Computer Use 流程

这段约三十秒的影片，是发布案例里的真实 Blender 成片。旁边是工作流程：用 bpy，也就是 Blender 的 Python API，建立可编辑场景；再 render，根据物体、相机和灯光算出图像；然后通过 Computer Use 打开 Blender 检查结果。影片展示创作成果，不是鼠标操作录像。这项工作把直接调用和视觉检查接在了一起。流程除了操作，还需要判断。

**English**

> Hold this visual: Source still and the bpy → render → Computer Use workflow

This approximately thirty-second film is a real Blender render from the published case. Follow the workflow alongside it: bpy, Blender’s Python API, builds an editable scene. Rendering then produces images from the objects, camera and lighting. Computer Use opens Blender to inspect the result. The film shows the creative output, not a recording of mouse actions. Direct programmatic control and visual inspection contribute to the same task. Alongside actions, workflows need decisions.

---

## 07 · J1｜一个流程需要怎样的判断 / Sometimes you need a decision.

[打开本页](/session-2#jev/J1)

**中文**

> 留住画面：Choice 返回预设选项

邮件说鞋子尺码不合适，想退货。系统需要先选处理部门。Jev 是 TypeSafe AI 面向这类判断任务的模型。输入材料叫 state，这里是一封邮件，也可以加入相关记录。Choice 就是从预先给好的选项中选择，比如退货、账单或物流。定义清楚问题和答案范围，结果就容易接入后续流程。先看普通 LLM 怎样生成答案。

**English**

> Hold this visual: Choice returns a predefined option

The message says the shoes are the wrong size and asks for a return. The system needs to choose a team before drafting a reply. Jev is TypeSafe AI’s model for decision tasks like this. State is the input material: a message here, potentially with relevant records. Choice selects from predefined options, such as returns, billing or shipping. Defining the question and answer space makes the result usable by the workflow. First, how does an ordinary LLM generate an answer?

---

## 08 · J2｜Decoding：一步接一步生成 / Choose a token. Change what follows.

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

## 09 · J3｜两种模型，处理同一项判断 / Same decision. Different output path.

[打开本页](/session-2#jev/J3)

**中文**

> 留住画面：JSON 答案生成完毕

普通 LLM 也能分类、输出 JSON，一次回答多个问题。左边通过 decoding 生成结构化结果。

> 留住画面：两条输出路径并排对照

Jev 围绕预先定义的判断来训练和提供接口：问题共用 state，独立判断，返回结果和概率。它还有按标准评分的 Score、判断陈述概率的 Noul。大量重复的有限判断，是考虑 Jev 的理由；是否更合适，要实测准确性、校准、成本和延迟。动画不代表速度对比。从一个错例看训练和校准。

**English**

> Hold this visual: The JSON answer is complete

An ordinary LLM can classify, return JSON and answer several questions in one call. On the left, decoding produces a structured response.

> Hold this visual: Both output paths remain side by side

Jev’s training and interface focus on predefined decisions: questions share state, are evaluated independently and return results and probabilities. Alongside Choice, Score uses a scoring standard, while Noul estimates the probability of a proposition. Repeated, bounded decisions are a reason to evaluate Jev. Suitability still depends on measured accuracy, calibration, cost and latency. The animation is not a speed comparison. A mistaken example will introduce training and calibration.

---

## 10 · J5｜把判断反馈带入训练 / Learn from feedback. Check on new cases.

[打开本页](/session-2#jev/J5)

**中文**

> 留住画面：错且自信的判断受到反馈

客户说钱扣了两次，鞋子要留下。已知答案是账单，模型却选了退货，还给出很高的概率。

> 留住画面：weights 更新为 v2，新题留到下一段

训练利用预测与结果的差异，让许多例子的反馈进入参数更新。TypeSafe 把这条路线称为 RLCD，即面向校准判断的强化学习，目标包括做判断和给出校准的概率。这里展示通用关系，公开说明没有展开具体更新算法。

> 留住画面：新题报出约八成概率，结果尚未揭晓

训练完，换一批没参与训练的新题。Calibration，校准，检查的是模型报出的概率和长期实际发生的频率能不能对上。比如大量报出约八成把握的判断，实际是否也约八成正确。

> 留住画面：比较概率与实际结果频率

这里十题八对只是帮助理解，不是性能证明，更不保证每十题都恰好八对。看一次自信的回答，无法替代这种检查。这些概率，怎样影响流程的下一步？

**English**

> Hold this visual: Feedback for a confidently wrong decision

The customer was charged twice and wants to keep the shoes. The known answer is billing, yet the model chooses returns with a high probability.

> Hold this visual: Weights updated to v2; separate cases come next

Training uses differences between predictions and outcomes, bringing feedback from many examples into weight updates. TypeSafe calls its approach RLCD, Reinforcement Learning for Calibrated Decisions, targeting both decisions and calibrated probabilities. This shows the general training relationship; its public explanation does not detail the update algorithm.

> Hold this visual: Separate cases report roughly eighty percent; outcomes remain hidden

After training, use cases that did not contribute to it. Calibration asks whether reported probabilities match observed frequencies over many cases. Across many predictions near eighty percent, are roughly eighty percent correct?

> Hold this visual: Compare probabilities with outcome frequencies

Eight correct answers here illustrate the idea; they do not establish performance or guarantee that every ten will contain eight successes. One confident answer cannot replace this evaluation. How do these probabilities affect the next step?

---

## 11 · J8｜一句邮件里有两个问题 / A decision becomes a next step.

[打开本页](/session-2#jev/J8)

**中文**

> 留住画面：分布已经出现，尚未选择路线

现在客户既想退货，又说扣了两次钱。退货排在前面，但账单也占了明显一部分。这里不是让大家记住几个小数，而是看清问题本身有歧义。假如系统只拿最高的那一个选项就往下走，另一件事可能被忽略。先停在这个分岔口：你会直接交给退货部门，还是先把两个需求理清？

> 留住画面：先澄清，再处理

这条教学流程选择先请人澄清。分流规则由实际业务制定，概率帮助我们决定下一步，不替我们制定政策。Jev 负责范围明确的判断，普通代码选分支，生成式 LLM 可以写解释和回复，人处理需要澄清的情况。这样看，选择模型就是看工作里缺哪一项能力，再在真实任务上比较。再看 AI 能否帮助改进下一代 AI。

**English**

> Hold this visual: The distribution is visible; the route is undecided

Now the customer wants a return and reports a duplicate charge. Returns leads, but billing also has substantial probability. The point is the ambiguity, not the decimal values. Taking only the leading option could leave the second issue unattended. Pause at this branch: would you send it straight to returns, or first clarify the two requests?

> Hold this visual: Clarify before proceeding

This teaching workflow asks a person to clarify first. Routing rules come from the actual business; probabilities inform the next action without setting the policy themselves. Jev handles bounded decisions, code selects a branch, a generative LLM can draft explanations and replies, and people clarify ambiguity. Model selection starts with the capability the workflow needs, followed by testing on real tasks. Now, can AI help improve the next AI?

---

## 12 · R1｜改进能力能否传到下一代 / Improve the recipe for improving.

[打开本页](/session-2#rsi/R1)

**中文**

RSI 是 Recursive Self-Improvement，递归自我改进。研究常常有很多想法，缺的是实现和实验的时间，所以会让 AI 帮忙提出、实现和检查方案。RSI 再问一步：AI 能否帮助造出更有能力的后继，而后继又更擅长推动下一轮改进？关键是改进能力能不能继续传下去。让同一个模型改写一次答案，还没有走到这个问题。用一个小实验看看，什么改进值得留下。

**English**

RSI means Recursive Self-Improvement. Research often has more ideas than time for implementation and experiments, motivating AI assistance with proposals, implementation and checks. RSI asks a further question: can AI help build a more capable successor that becomes better at driving another improvement cycle? The issue is whether improvement ability carries forward. Asking the same model to revise one answer does not establish that. A small experiment will show which changes deserve to stay.

---

## 13 · R4｜操作更少，就该留下吗 / Which program should we keep?

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

## 14 · R5｜真实改进，数字各有范围 / Propose code. Test it. Keep the gain.

[打开本页](/session-2#rsi/R5)

**中文**

> 留住画面：局部 kernel 收益与整体收益并列

AlphaEvolve 用 Gemini 提出代码候选，再由自动评估筛选。DeepMind 报告过一个矩阵乘法 kernel 加速 23%。Kernel 是训练中反复调用的一小段计算程序。这个改进让 Gemini 整体训练时间减少约 1%。一个数字讲组件，一个讲整体，证明的是具体计算效率改善，还没有测到研究能力能否一代接一代增强。递归还缺后继系统能力这一环。

**English**

> Hold this visual: Kernel and whole-training gains together

AlphaEvolve uses Gemini to propose code candidates and automated evaluation to select them. DeepMind reported a twenty-three percent speedup in a matrix-multiplication kernel, a small computation routine used repeatedly during training. That local improvement reduced total Gemini training time by about one percent. One figure concerns the component and the other the whole process. They establish a specific efficiency improvement, without measuring research ability growing across successive generations. Recursion also needs evidence about the successor’s capability.

---

## 15 · R6｜新版本有了，能力更强了吗 / Train a successor. Test the improver.

[打开本页](/session-2#rsi/R6)

**中文**

> 留住画面：失败实验和诊断进入配方

看一条假设路径。AI A 发现训练材料几乎都是成功实验，于是提议补进失败案例和排查方法。

> 留住画面：B 已训练，研究能力尚未验证

按这个新配方训练 B，练习和反馈改变了保存下来的 weights。到这里，我们得到一个新版本，但还不能说它更强。补材料可能有帮助，也可能没有；真正要看的，是它面对新研究问题时，能不能提出更有用的改进。

> 留住画面：用没参与训练的研究任务比较 A 与 B

拿没用于训练的研究任务来比较 A 和 B：谁更能找准失败原因，提出值得做的实验？

> 留住画面：只有能力提升才尝试下一轮

只有这项能力确实改善，才有理由让 B 尝试改进 C。如果它又能带来更好的后继，递归才开始有证据，而且每一轮都要重新验证。人仍要设定目标、评估方法、权限和停止条件。图上这条回路是需要证明的路径。回到开场的三个问题。

**English**

> Hold this visual: Add failed experiments and diagnoses

Consider a hypothetical route. AI A notices that the training material mostly contains successful experiments, and proposes adding failures and ways to investigate them.

> Hold this visual: B is trained; its research ability is untested

B trains with that recipe; practice and feedback change its saved weights. We now have a new version, but not yet evidence that it is more capable. The added material may or may not help. The question is whether B can propose more useful improvements on new research problems.

> Hold this visual: Compare A and B on research tasks excluded from training

Compare A and B on research tasks excluded from training: which diagnoses failures better and proposes worthwhile experiments?

> Hold this visual: A further cycle depends on improved ability

Evidence of improvement justifies trying B’s help with C. If B helps produce a better successor in turn, that begins to support recursion, with each cycle requiring fresh validation. People still set objectives, evaluation methods, permissions and stopping conditions. This return path is something to establish with evidence. Let’s return to the three opening questions.

---

## 16 · E1｜三个词，三种检查 / Three ways to move forward.

[打开本页](/session-2#closing/E1)

**中文**

Computer Use 让 AI 通过界面行动，我们检查应用里的目标有没有完成。Jev 面向定义清楚的判断，我们检查它在真实任务中是否可靠、是否适合接入流程。RSI 关注改进能力能否进入后继并继续循环，这要靠逐轮的独立验证。遇到新的 AI 术语，可以沿着今天这条线去看：它做了什么，能力从哪里来，结果又怎样检查。今天先讲到这里。

**English**

Computer Use lets AI act through interfaces; we check whether the application reached the goal. Jev targets defined decisions; we check reliability and suitability in the real workflow. RSI concerns improvement ability passing to a successor and continuing the cycle, which requires independent evidence at each round. For a new AI term, follow the same questions: what does it do, where does its capability come from, and how do we check the result? That’s where we’ll finish today.
