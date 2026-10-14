# 第二场双语排练稿｜Talk 02 bilingual rehearsal

共 **18 页**，按同一幅画面配对中英文；实际演讲选一种语言。先点击播放，自动停住后再讲当前段落，讲完继续。引用块只提示画面，转场句放在每页最后。[操作说明与目录](index.md)。

The languages are paired by visual; choose one for delivery. Press play, wait for the automatic hold, speak the current paragraph, then continue. Blockquotes identify the picture. Transitions appear at the end of each page.

## 01 · O1｜Talk 02 overview

[打开本页](/session-2#opening/O1)

> 画面 / Visual 1 / 1 · 开场地图
>
> The opening map

**中文｜** 今天讲三个概念：Computer Use 怎样操作软件，Jev 怎样给流程做判断，以及 RSI 中的改进怎样进入下一轮。前两章沿着退货流程展开。互动图是教学示意，不调用在线模型；Blender 部分会看一段真实成片。

**English｜** Today we’ll follow three ideas: how Computer Use operates software, how Jev makes decisions for a workflow, and how improvement could repeat in RSI. A returns workflow connects the first two chapters. The interactive diagrams are teaching examples, not live model calls; the Blender section includes a real published render.

**转场｜** 先看 Computer Use。

**Transition｜** Start with Computer Use.

---

## 02 · C0｜Computer Use

[打开本页](/session-2#computer-use/C0)

> 画面 / Visual 1 / 1 · Computer Use 和“通过软件界面做事”独占一页。
>
> Computer Use and its plain-language meaning fill a dedicated page.

**中文｜** Computer Use，就是让 AI 通过软件界面做事：看屏幕，决定下一步，再由工具点击或输入。

**English｜** Computer Use lets AI act through a software interface: observe the screen, choose the next action, and use tools to click or type.

**转场｜** 为什么需要通过界面操作？

**Transition｜** Why work through the interface?

---

## 03 · C1｜Why Computer Use?

[打开本页](/session-2#computer-use/C1)

> 画面 / Visual 1 / 1 · 同一目标，两种入口
>
> Two routes to the same goal

**中文｜** 目标是给 1048 号订单创建退货记录。上面这条路用 API，也就是给程序调用的接口，直接请求应用完成。下面这条路适用于没有合适 API 的地方：通过界面填表、提交。Computer Use 提供了这种入口，两条路也可以在同一个任务里配合。

**English｜** The goal is to create a return for order 1048. The upper route uses an API, an interface programs can call directly. The lower route handles work without a suitable API by filling and submitting the form through the interface. Computer Use supplies that route, and a task can combine both.

**转场｜** 跟着下面这条路，实际走一遍。

**Transition｜** Follow the interface route through the task.

---

## 04 · C4｜How Computer Use works

[打开本页](/session-2#computer-use/C4)

> 画面 / Visual 1 / 3 · 定位输入框
>
> Locate the field

**中文｜** 右边是 context，也就是模型当前能用的信息：目标、截图和操作记录。左边已经标出了订单号输入框。把“要找什么”对应到屏幕位置，叫 UI grounding。

**English｜** The context on the right contains the goal, screenshot and action history available to the model. The order-number field is now marked on the left. Connecting what we want to a position on screen is called UI grounding.

> 画面 / Visual 2 / 3 · 完整表单
>
> The completed form

**中文｜** 表单已经填好。模型通过 tool call 请求工具输入订单号、选择原因；工具执行后，新截图回到 context。现在确认的是表单填对了，还没有创建退货。

**English｜** The form is now filled. Through tool calls, the model asks tools to enter the order number and choose a reason. A fresh screenshot returns to context. This confirms the fields, but the return has not been created yet.

> 画面 / Visual 3 / 3 · 新截图确认退货已创建
>
> A fresh screenshot confirms the return

**中文｜** 提交后，应用生成了 R-204 回执，新截图也把它带了回来。这才确认目标完成。Agent 就是这样把观察、判断、操作和结果检查接成循环。

**English｜** After submission, the app produced receipt R-204, and a fresh screenshot brought it back. Now the goal is confirmed. The agent connects observation, decisions, actions and checks into a loop.

**转场｜** 如果截图之后，界面又变了呢？

**Transition｜** What if the screen changes after the screenshot?

---

## 05 · C5｜How Computer Use recovers

[打开本页](/session-2#computer-use/C5)

> 画面 / Visual 1 / 3 · 旧位置点击失败
>
> The stale click fails

**中文｜** 这次表单被弹窗挡住了，右边却还是旧截图。工具按旧位置点了下去，但退货没有创建。点击成功执行，和任务成功完成，是两件事。

**English｜** This time a popup covers the form, while context still holds the old screenshot. The tool clicked the old position, but no return was created. Executing a click and completing the task are different outcomes.

> 画面 / Visual 2 / 3 · 新截图看见弹窗，定位关闭按钮
>
> The fresh screenshot shows the popup and locates Close

**中文｜** 新截图已经把弹窗带进 context，关闭按钮也重新定位好了。模型现在知道障碍在哪里，下一步才有依据。

**English｜** The fresh screenshot has brought the popup into context, and its Close button is located. The model can now choose an action based on the actual obstruction.

> 画面 / Visual 3 / 3 · 新截图确认完成
>
> A fresh screenshot confirms success

**中文｜** 关掉弹窗、检查表单、重新提交，最后拿到回执。这次恢复靠的是更新观察，再调整动作；并没有现场重新训练模型。

**English｜** The agent dismissed the popup, checked the form, submitted again and verified the receipt. Recovery came from fresh observations and revised actions, without retraining the model during the task.

**转场｜** 那操作能力最初从哪里来？接着看训练。

**Transition｜** Where did the ability to act come from? Look at training.

---

## 06 · C7｜How Computer Use is trained

[打开本页](/session-2#computer-use/C7)

> 画面 / Visual 1 / 3 · 点击没有完成退货；任务结果成为训练反馈
>
> The click failed to create a return; the outcome becomes training feedback

**中文｜** 先看一次练习：点击执行了，却没有创建退货。训练反馈要看任务有没有完成，不能只看有没有点击。

**English｜** Start with one practice attempt: the click ran, but no return was created. Training feedback must reflect the task outcome, rather than a click alone.

> 画面 / Visual 2 / 3 · 训练得到新模型
>
> Training produces an updated model

**中文｜** 把这样的练习积累起来，训练程序根据反馈反复调整 weights，也就是模型内部学到的参数。OpenAI 的 Computer Use 模型就使用了强化学习，英文是 reinforcement learning。这里把多轮练习和更新缩成一段示意。

**English｜** Across many practice tasks, feedback guides updates to the weights: the model’s learned parameters. OpenAI’s computer-using agent uses reinforcement learning. This diagram condenses many rounds of practice and updates.

> 画面 / Visual 3 / 3 · 截图变了，weights 保持不变
>
> New screenshots, fixed weights

**中文｜** 现在是 inference，也就是使用训练好的模型。按钮换了位置，新截图改变 context；中间的 weights 保持固定，模型仍能重新找按钮。刚才的弹窗恢复也属于这个阶段。

**English｜** Now we are in inference: using the trained model. The button moved, so the new screenshot changes context. The weights in the middle stay fixed while the model locates the button again. Recovering from the popup belongs to this stage too.

**转场｜** 最后看这种能力怎样进入 Blender 的创作流程。

**Transition｜** Now see how it fits into a Blender workflow.

---

## 07 · C6｜Computer Use in Blender

[打开本页](/session-2#computer-use/C6)

> 画面 / Visual 1 / 1 · 成片静帧与 bpy → render → Computer Use 流程
>
> Source still and the bpy → render → Computer Use workflow

**中文｜** 这是 Thomas Ricouard 发布的 Blender 成片，展示的是成果，不是鼠标操作录像。右侧是制作流程：bpy 是 Blender 的 Python API，用它建立可编辑场景；render 把场景算成图像；Computer Use 再打开 Blender 检查。直接调用和界面操作在这里配合起来了。

**English｜** This is Thomas Ricouard’s published Blender render: the finished result, not a mouse-action recording. On the right, bpy is Blender’s Python API for building an editable scene. Rendering turns the scene into images, and Computer Use opens Blender to inspect it. Programmatic access and interface actions work together.

**转场｜** 操作之外，流程还要判断：一封邮件该交给谁？

**Transition｜** A workflow also needs decisions: which team should receive an email?

---

## 08 · J0｜Jev

[打开本页](/session-2#jev/J0)

> 画面 / Visual 1 / 1 · Jev：面向分类、评分等明确判断
>
> Jev: a model for focused decisions

**中文｜** Jev 是 TypeSafe 的 System One 模型，用来处理答案范围清楚的判断。例如：这封邮件该交给哪个部门？我们先看怎样给它出题。

**English｜** Jev is TypeSafe’s System One model for decisions with a defined answer space. For example, which team should receive an email? Let’s see how to ask it.

**转场｜** 从一封退货邮件开始。

**Transition｜** Start with a return email.

---

## 09 · J1｜How to ask Jev a question

[打开本页](/session-2#jev/J1)

> 画面 / Visual 1 / 2 · 一题对应一个答案；三个部门是我们给的选项
>
> One question, one answer; we chose the three team options

**中文｜** 这封退货邮件就是本次输入，这里叫 state。我们定义问题“交给哪个部门”，再提供退货、账单、物流三个选项。这种题型叫 Choice。Jev 给每个选项一个概率；选项由我们定，判断由模型做。

**English｜** The return email is the input, called state here. We define the question, “Which team?”, and supply returns, billing and shipping as options. This question type is Choice. Jev assigns probabilities; we define the options, and the model makes the judgment.

> 画面 / Visual 2 / 2 · 两题、两个答案；Choice、Score、Noul 是可选题型
>
> Two questions, two answers; Choice, Score and Noul are available types

**中文｜** 再加一道题：“客户想退货吗？”Noul 返回“是”的概率。现在两题对应两个答案。下面的 Choice、Score、Noul 是三种题型，Score 用来自定标准打分；它们不是固定三个输出。问题和数量可以随请求改变，不用为每道新题重新训练。

**English｜** Add “Does the customer want a return?” Noul gives the probability of yes, so two questions now have two answers. Choice, Score and Noul are question types, not three mandatory outputs; Score uses a rating scale we define. Questions and their number can change with each request without retraining for each new question.

**转场｜** 普通 LLM 也能回答；先看它怎样生成文字。

**Transition｜** An ordinary LLM can answer too. First, see how it generates text.

---

## 10 · J2｜How decoding works

[打开本页](/session-2#jev/J2)

> 画面 / Visual 1 / 1 · We 已加入 context，下一轮候选已出现
>
> We has joined context; the next candidates are visible

**中文｜** 普通 LLM 写文字时，会逐步选出下一个 token，这个过程叫 decoding。Token 是词、字符或文字片段。这里已经选出 We，并把它加进左边的 context；右边接着预测 can 还是 will。新生成的内容参与下一步判断，重复这个过程就能写出一句话。

**English｜** When an ordinary LLM writes text, it selects the next token step by step: decoding. A token can be a word, character or text fragment. We has been added to the context on the left; the next candidates are can and will. Each new token informs the next prediction, and repeating the process produces text.

**转场｜** 接着用同样两道题比较 LLM 和 Jev。

**Transition｜** Now compare the LLM and Jev on the same two questions.

---

## 11 · J3｜How Jev differs from an LLM

[打开本页](/session-2#jev/J3)

> 画面 / Visual 1 / 2 · 一次请求的 JSON 包含两题的答案
>
> One JSON response contains both answers

**中文｜** 回到刚才那封邮件和两道题。左边的 LLM 一次请求就能回答，用 JSON Schema 限定字段和类型。它仍然通过 decoding 顺序生成这份 JSON。画面为了好读，把输出分成了较大的文字片段。

**English｜** Return to the same email and two questions. The LLM can answer both in one request, with JSON Schema constraining fields and types. It still decodes the JSON sequentially. We use larger readable chunks for the display.

> 画面 / Visual 2 / 2 · 两个独立答案由 API 装进 JSON
>
> The API packages the two independent answers as JSON

**中文｜** 按 TypeSafe 的说明，右边的 Jev 根据同一份 state，并行给出各题的概率，再由 API 包装成 JSON。它省去了把答案逐段写成文字的顺序输出，所以可能降低延迟；具体快多少仍要实测。两边拿到的都是 JSON，产生答案的过程不同。

**English｜** According to TypeSafe, Jev produces each question’s probabilities in parallel from the same state; the API packages them as JSON. Avoiding sequential text output can reduce latency, but the actual gain needs measurement. Both deliver JSON through different output processes.

**转场｜** 输出方式不同，还得把判断训练好。

**Transition｜** The output process differs; the decisions still need training.

---

## 12 · J5｜How Jev is trained

[打开本页](/session-2#jev/J5)

> 画面 / Visual 1 / 3 · 预测退货 95%，已知答案是账单
>
> Prediction: returns at 95%; known answer: billing

**中文｜** 这次换成重复扣款的邮件，客户还说要留下鞋子。已知应该交给账单部门，示意模型却给“退货”95% 的概率。训练要纠正两件事：判断错了，而且错得很有把握。

**English｜** Now the email reports a duplicate charge and says the customer is keeping the shoes. The known answer is billing, but our illustrative model assigns 95% to returns. Training must address both the wrong choice and the misplaced confidence.

> 画面 / Visual 2 / 3 · 同一封邮件的判断变为 billing
>
> The same email is now assigned to billing

**中文｜** 和上一章一样，许多练习的反馈用来调整 weights。TypeSafe 把这类继续训练称为 RLCD，目标是判断更准、概率更可信。再看同一封邮件，模型已偏向账单；是否学会，还要换新题检查。

**English｜** As in the previous chapter, feedback from many examples adjusts the weights. TypeSafe calls this further training RLCD, aiming for better decisions and better-calibrated probabilities. The same email now favors billing; new cases are still needed to test learning.

> 画面 / Visual 3 / 3 · 80% 的含义：长期接近八成正确
>
> 80% should mean roughly eight in ten over many cases

**中文｜** 上面是没参与训练的新邮件，weights 固定，模型给账单 80% 的概率。Calibration，校准，要看许多类似预测：说八成把握时，长期是否约八成正确。下面的十格只解释这个含义，不能用这一封邮件证明校准。

**English｜** The new email above was not used in training. With weights fixed, the model gives billing 80%. Calibration checks many such predictions: are those near 80% correct about 80% of the time? The ten squares illustrate that idea; one email cannot establish calibration.

**转场｜** 最后把这个判断放回工作流程。

**Transition｜** Now put the decision back into a workflow.

---

## 13 · J8｜When to use Jev

[打开本页](/session-2#jev/J8)

> 画面 / Visual 1 / 1 · 邮件已分到退货队列，写回复仍可用 LLM
>
> The ticket is assigned to returns; an LLM can write the reply

**中文｜** 回到开头的退货邮件：Jev 给出判断，代码把工单送进退货队列，需要写回复时再用 LLM。高频、范围清楚的判断适合拿来比较两种方案；先比错误，再比延迟和成本。若只是偶尔分类，或一次就需要完整回复，现有的 LLM JSON 可能已经够用。

**English｜** Back to the original return email: Jev makes the decision, code routes the ticket, and an LLM can write a reply. Frequent, focused decisions are a useful workload for comparing the two options: errors first, then latency and cost. For occasional classification or a complete reply in one call, the existing LLM with JSON may already suffice.

**转场｜** 接下来把视角转向研发：AI 能否帮助改进下一代 AI？

**Transition｜** Now turn to development: can AI help improve the next AI?

---

## 14 · R0｜RSI

[打开本页](/session-2#rsi/R0)

> 画面 / Visual 1 / 1 · RSI、Recursive Self-Improvement 和下一代 AI 的问题独占一页。
>
> RSI, Recursive Self-Improvement and the successor question fill a dedicated page.

**中文｜** RSI 是 Recursive Self-Improvement，递归自我改进。关键在于：AI 帮助开发出更会做研发的新 AI，再由新 AI 推动下一轮改进。先从一次最小的改进看起。

**English｜** RSI means Recursive Self-Improvement: AI helps develop a new AI that is better at research, and that new AI drives another round of improvement. Start with one small improvement loop.

**转场｜** 用排序程序看看，什么改动值得留下。

**Transition｜** Use a sorting program to see which changes deserve to stay.

---

## 15 · R4｜How an improvement loop works

[打开本页](/session-2#rsi/R4)

> 画面 / Visual 1 / 3 · A 能做对，先保留 A
>
> A works; keep it for now

**中文｜** A 是原来使用的排序程序，它能排对。下面记录比较和写入的次数，把它们相加作为本例的工作量。我们想找一个同样做对、工作量更少的办法。A、B、C 是预写的程序，动画来自它们的实际运行。

**English｜** A is the original sorting program, and it works. We count comparisons and array writes, adding them to measure work in this example. We want the same correct result with less work. A, B and C are prewritten programs, and the animation follows their execution.

> 画面 / Visual 2 / 3 · B 顺序不对，继续使用 A
>
> B leaves the output out of order; keep using A

**中文｜** 第一次尝试 B，只排一遍。操作确实少了，但红色数字的顺序还不对，所以拒绝 B。右边 IN USE 仍然是 A。

**English｜** First, try B with just one pass. It uses less work, but the red numbers are still out of order. Reject B; IN USE on the right remains A.

> 画面 / Visual 3 / 3 · C 通过同一组测试，且操作更少；A 被 C 替换
>
> C passes the same suite with less work and replaces A

**中文｜** B 失败后再试 C。C 通过同样的六项检查，总工作量也更少，才替换 A。这个循环改进了排序程序，还没有改进做研发的 AI，所以本身不等于 RSI。

**English｜** After B fails, try C. It passes the same six checks with less total work, so it replaces A. This loop improved a sorting program, not the AI doing the research. By itself, it is not RSI.

**转场｜** Google 把类似的循环，用到了训练 AI 的程序上。

**Transition｜** Google applies a similar loop to code used in AI training.

---

## 16 · R5｜How AlphaEvolve improves AI training

[打开本页](/session-2#rsi/R5)

> 画面 / Visual 1 / 2 · Gemini 提出的 kernel 改法通过检查
>
> The proposed kernel change passes the checks

**中文｜** 把排序程序换成训练 AI 用的 kernel，也就是反复执行的小段计算程序，比如矩阵乘法。AlphaEvolve 用 Gemini 提出改法，再由评估器检查结果和速度。现在 K 已经通过检查。

**English｜** Replace the sorting program with a kernel used in AI training: a small repeated computation, such as matrix multiplication. AlphaEvolve uses Gemini to propose changes, then evaluators check correctness and speed. K has now passed those checks.

> 画面 / Visual 2 / 2 · 改好的 K 进入 Gemini 训练；提效数字出现
>
> The improved K enters Gemini training; the reported savings appear

**中文｜** 同一块 K 已经进入 Gemini 的训练流程。DeepMind 报告，这个 kernel 提速 23%，整体训练时间减少约 1%。它和 RSI 的联系在于：AI 改好的工具，又用来训练 AI。但目前证明的是训练提效，还不是更会研发的新 AI。

**English｜** The same K has entered Gemini training. DeepMind reported a 23% kernel speedup and about 1% less total training time. The link to RSI is that a tool improved with AI is used to train AI. This establishes a training-efficiency gain, not a better AI researcher.

**转场｜** 还缺的一步，是让新 AI 接手下一轮改进。

**Transition｜** The missing step is for the new AI to take over the next improvement round.

---

## 17 · R6｜How improvement becomes recursive

[打开本页](/session-2#rsi/R6)

> 画面 / Visual 1 / 3 · v2 出现，但是否更会做研发仍未知
>
> v2 appears; better research ability remains unproven

**中文｜** 从这里开始是假设。假如把省下的算力用于更多训练，帮助开发出了右边的 v2，它也不一定比 v1 更会做研发，所以还带着问号。

**English｜** The rest is hypothetical. Suppose saved compute funds more training and helps develop v2 on the right. That does not establish that v2 is better at research than v1, so it still has a question mark.

> 画面 / Visual 2 / 3 · v1 和 v2：新任务，相同预算
>
> v1 and v2: new tasks, the same budget

**中文｜** 给 v1 和 v2 新的 kernel 优化任务，用相同的尝试预算，比较谁能找到正确、有用的改法。这是在检验下一轮的改进能力，图里还没有胜负。

**English｜** Give v1 and v2 new kernel-optimization tasks with the same experiment budget. Compare their ability to find correct, useful improvements. This tests their ability to improve the next round; no winner is shown here.

> 画面 / Visual 3 / 3 · v2 接替 v1，提出下一项改进；右侧出现 v3？
>
> v2 replaces v1 and proposes the next improvement; v3? appears on the right

**中文｜** 假设 v2 通过检验，确实更擅长这项工作，它就接过左边 v1 的位置，继续帮助开发 v3。v3 还要重新检验。上一轮得到的新 AI，成为下一轮的改进者，这一步才让改进递归下去。

**English｜** If evaluation shows that v2 is better at this work, it takes v1’s place on the left and helps develop v3. v3 must be evaluated again. The AI produced by one round becomes the improver in the next: that is the recursive step.

**转场｜** 回到今天的三个概念。

**Transition｜** Return to the three concepts.

---

## 18 · E1｜Comparing the three concepts

[打开本页](/session-2#closing/E1)

> 画面 / Visual 1 / 1 · 总结画面
>
> The closing map

**中文｜** Computer Use 关心操作有没有完成；Jev 关心判断是否可靠、是否划算；RSI 关心改进后的 AI 能否把下一轮研发做得更好。三个概念都要看实际结果，但需要验证的东西不同。

**English｜** Computer Use asks whether the action achieved its goal. Jev asks whether a decision is reliable and worth its cost. RSI asks whether the improved AI can make the next round of research better. All three need evidence, but they need evidence of different things.

**转场｜** 今天先讲到这里。

**Transition｜** That’s where we’ll leave it today.
