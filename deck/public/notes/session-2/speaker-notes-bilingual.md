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

Jev 是 TypeSafe 的一个模型，属于他们所说的 System One model。它用来处理范围清楚的判断，比如把邮件分给哪个部门、给一项风险打几分。先看我们怎么给它出题。用一封退货邮件开始。

**English**

Jev is TypeSafe’s model in the class it calls System One. It is designed for focused decisions, such as choosing a team for an email or rating a risk. Let’s start with how we ask it a question. Start with a return request.

---

## 09 · J1｜谁来定义 Jev 的问题 / How to ask Jev a question

[打开本页](/session-2#jev/J1)

**中文**

> 留住画面：一题对应一个答案；三个部门是我们给的选项

这封邮件想退货。我们先写一道题：交给哪个部门？再给出退货、账单、物流三个选项。这叫 Choice。问题和选项都由我们提供，Jev 负责根据输入判断，并给每个选项一个概率。我们规定能选哪些，具体选谁、概率多少，由模型算。

> 留住画面：两题、两个答案；Choice、Score、Noul 是可选题型

现在再问一句：客户是不是想退货？这题选 Noul，返回“是”的概率。两道题就有两个答案。底下的 Choice、Score、Noul 是三种题型，不是固定三个输出；Score 用来按我们定的标准打分。题目、选项和题目数量都能在请求里改，换一道题不用重新训练模型。再看普通 LLM 怎样生成答案。

**English**

> Hold this visual: One question, one answer; we chose the three team options

This customer wants a return. We write a question: which team should handle it? We supply returns, billing and shipping as the options. That is a Choice. We provide the question and options; Jev evaluates the input and assigns probabilities. We define what it may choose, while the model determines the result.

> Hold this visual: Two questions, two answers; Choice, Score and Noul are available types

Now add: does the customer want a return? We use Noul, which gives the probability of yes. Two questions produce two answers. Choice, Score and Noul below are three available types, not three required outputs. Score rates something against levels we define. We can change the questions, options and question count in the request without retraining the model. Next, how does an ordinary LLM produce an answer?

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

## 11 · J3｜Jev 和 LLM 怎样产生答案 / How Jev differs from an LLM

[打开本页](/session-2#jev/J3)

**中文**

> 留住画面：一次请求的 JSON 包含两题的答案

现在给两边相同的两道题。左边的普通 LLM 可以一次回答，也可以用 JSON Schema 规定输出格式。它仍然通过 decoding，一个 token 接一个 token 地生成这份 JSON。这里把文字分成方便阅读的片段，实际 token 切分可能不同。

> 留住画面：两个独立答案由 API 装进 JSON

按 TypeSafe 的公开说明，Jev 不写自由文本，而是并行输出这些判断的概率。两道题都看同一份 state，各自判断，不必等上一题答完。API 再把结果装成 JSON 交给程序。所以差别在模型怎样产生答案；接口返回的格式可以一样。图里的数字是教学设定，动画不代表实际速度。这种判断能力怎么训练出来？

**English**

> Hold this visual: One JSON response contains both answers

Both models get the same two questions. An ordinary LLM can answer them in one request and use JSON Schema to constrain the format. It still decodes the JSON token by token. We display readable chunks here; they are not actual tokenizer boundaries.

> Hold this visual: The API packages the two independent answers as JSON

According to TypeSafe, Jev outputs these probabilities in parallel instead of generating free-form text. Both questions use the same state and are evaluated independently. The API packages the answers as JSON. The delivery format can be the same while the model’s output process differs. These values are illustrative, and the animation is not a timing measurement. How is this decision capability trained?

---

## 12 · J5｜Jev 如何训练 / How Jev is trained

[打开本页](/session-2#jev/J5)

**中文**

> 留住画面：预测退货 95%，已知答案是账单

前面是在使用模型，这里用简化例子看模型训练的目标。邮件说“钱扣了两次，鞋子我要留着”，模型却选退货，还给了 95% 的概率。对答案，应该是账单部门。训练时，这类错误会成为反馈：既要学会选对，也要学会给出合适的概率。

> 留住画面：同一封邮件的判断变为 billing

让模型练很多有答案的例子，根据反馈反复调整 weights，也就是影响判断的内部参数。再看同一封邮件，它这次偏向账单。TypeSafe 把面向决策和概率校准的后训练叫 RLCD。这里用一个变化说明训练在做什么，具体算法没有公开；真正有没有学会，要用新题检查。

> 留住画面：80% 的含义：长期接近八成正确

换一封没参与训练的邮件：付款被处理了两遍。现在 weights 固定，只让模型作答。它选账单，给出 80% 的概率。Calibration，校准，就是检查它说八成把握的时候，长期是不是也大约八成正确。下面十个格子只是帮助理解；要判断是否校准，得看大量新题，不能只看这一封。知道了输出和训练，再看为什么值得考虑它。

**English**

> Hold this visual: Prediction: returns at 95%; known answer: billing

We have been using the model; now we illustrate training. The email says the customer was charged twice and is keeping the shoes. The model chooses returns with 95% probability, but the known answer is billing. Mistakes like this provide feedback for learning both better choices and appropriate probabilities.

> Hold this visual: The same email is now assigned to billing

Practice on many examples with known answers, using feedback to adjust the weights: the internal parameters that shape decisions. Revisit the same email; it now favors billing. TypeSafe calls its post-training for decisions and calibrated probabilities RLCD. This change illustrates the principle, not its undisclosed algorithm. New cases are needed to check what was learned.

> Hold this visual: 80% should mean roughly eight in ten over many cases

Try an email not used in training: a payment went through twice. Keep the weights fixed and ask for a prediction. It selects billing with 80% probability. Calibration asks whether predictions near 80% are correct about 80% of the time across many cases. The ten squares illustrate the idea; this one email cannot establish calibration. With output and training in view, why consider using Jev?

---

## 13 · J8｜为什么 Jev 可能更快 / Why use Jev?

[打开本页](/session-2#jev/J8)

**中文**

> 留住画面：减少顺序生成的工作；输入仍需读取

两边都只调用一次，也都要读输入。差别在中间：LLM 要一轮轮生成后面的 token；Jev 专门输出判断概率，可以并行给出，不必把答案作为文字逐步生成。减少的是这段顺序输出的工作，所以有机会降低延迟。它也为这种任务专门训练和设计。具体快多少，还受输入长度、对比模型、硬件和网络影响，不能拿动画的时长当成绩。

> 留住画面：邮件已分到退货队列，写回复仍可用 LLM

例如每来一封工单，都先判断该交给谁。这样的判断量大、范围清楚，值得试 Jev：让它给判断，代码分流，需要写回复再用 LLM。要用到概率时，也要检查它是否校准。如果只是偶尔分类，或者一次就要拿到完整回复，现有的 LLM JSON 可能已经够用。选型时用同一批工单，先看错误和概率是否可用，再比延迟和成本。最后看 AI 能否帮助改进下一代 AI。

**English**

> Hold this visual: Less sequential output work; the input still needs processing

Both routes make one request and read the input. The middle differs: an LLM generates successive tokens, while Jev outputs decision probabilities in parallel without generating the answer as text. Reducing sequential output work can lower latency; its training and design also focus on these tasks. The gain still depends on input length, the comparison model, hardware and network. Animation duration is not a benchmark.

> Hold this visual: The ticket is assigned to returns; an LLM can write the reply

Every incoming ticket needs a routing decision. Frequent, focused judgments make Jev worth testing: let it decide, let code route, and use an LLM when a written reply is needed. If probabilities drive the workflow, check their calibration. For occasional classification or a complete reply in one call, an existing LLM with JSON may suffice. Compare errors and probability quality first, then latency and cost on the same tickets. Finally, can AI help improve the next AI?

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
