# 第二场双语排练稿｜Talk 02 bilingual rehearsal

共 **20 页**，按同一幅画面配对中英文；实际演讲选一种语言。先点击播放，自动停住后再讲当前段落，讲完继续。引用块只提示画面，转场句放在每页最后。[操作说明与目录](index.md)。

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

> 画面 / Visual 1 / 3 · 误点 Cancel 后表单关闭；退货未创建，反馈为失败
>
> Cancel closes the form; no return is created, so the task feedback is failure

**中文｜** 模型点了 Cancel，表单被关掉，退货没有创建。中间把这个结果记为失败。训练反馈要看任务有没有完成，不能只看有没有点击。

**English｜** The model clicked Cancel, closing the form without creating a return. The middle panel records the outcome as a failure. Training feedback must reflect task completion, rather than a click alone.

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

> 画面 / Visual 1 / 3 · 任务：删掉立方体，添加球体并向上移动
>
> The task: remove the cube, add a sphere and raise it

**中文｜** 先看任务：删掉默认立方体，添加一个 UV Sphere，也就是球体，再向上移动。目标很具体，完成后可以直接在 Blender 里检查。这是 Kakarot Labs 发布的 Astra 实测录像。

**English｜** The task is concrete: remove the default cube, add a UV Sphere, and move it upward. We can check the result directly in Blender. This is an edited Astra demonstration published by Kakarot Labs.

> 画面 / Visual 2 / 3 · Blender 中的球体已经升起，Z 坐标为 2；播放失败时保留该操作静帧
>
> The sphere is raised in Blender, with Z set to 2; the same source frame is held if playback fails

**中文｜** 球体现在升起来了。录像里可以看到搜索菜单、添加球体，然后把右侧 Z 坐标从 0 改成 2。自然语言任务落实成了软件里的操作，最后检查的也是 Blender 中实际变化的结果。

**English｜** The sphere is now raised. The recording shows a search menu, a sphere being added, and the Z position changing from 0 to 2. The natural-language task becomes interface actions, and the result can be checked inside Blender.

> 画面 / Visual 3 / 3 · 另一个项目：房屋成片与 Python / bpy、Computer Use 的分工
>
> A separate project: an architecture render and the Python / bpy and Computer Use roles

**中文｜** 最后换一个更复杂的项目：这是 Thomas Ricouard 发布的房屋成片。bpy 是 Blender 的 Python API，用来建立可编辑场景；Computer Use 用来打开软件检查。复杂工作里，这两种方式可以配合使用。

**English｜** Now a separate, more complex project: Thomas Ricouard’s architecture render. Blender’s Python API, bpy, builds an editable scene; Computer Use opens the application to inspect it. The two approaches can work together.

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

> 画面 / Visual 1 / 1 · 短句已完成，右侧保留四步 context 变化
>
> The sentence is complete; four steps show how context grew

**中文｜** Decoding 就是根据当前 context，一步步选出下一个 token。看刚才的过程：先选 We，把它加进 context，再预测 can，然后是 help 和句号。左边得到完整短句，右边保留每一步用了什么 context。Token 可以是词、字符或文字片段，这里的切分只是示意。

**English｜** Decoding selects the next token from the current context, one step at a time. We is selected first and added to the context; then come can, help and the period. The finished sentence is on the left, and the history on the right shows how the context grew. A token can be a word, character or text fragment; the divisions here are illustrative.

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

> 画面 / Visual 1 / 3 · returns 0.94，代码把工单送到退货队列
>
> returns 0.94; code assigns the ticket to the returns queue

**中文｜** 这里每来一封工单，都要判断交给哪个部门。Jev 对这封退货邮件给出 returns 0.94，代码按示例规则：最高概率至少 0.90，就自动分流。Jev 给出判断，真正移动工单的是代码；0.90 是我们设置的演示门槛。

**English｜** Every incoming ticket needs a department. For this return request, Jev gives returns a probability of 0.94. Our example rule routes a ticket when the highest probability is at least 0.90. Jev supplies the judgment; code moves the ticket. We chose 0.90 for this illustration.

> 画面 / Visual 2 / 3 · 退货与扣款两个问题，工单转人工确认
>
> A return and a billing issue send the ticket to human review

**中文｜** 换一封邮件，客户既要退货，又说被重复扣款。现在 returns 是 0.61，billing 是 0.35。只拿最高的 returns 就直接分流，可能漏掉另一件事。按刚才的规则，代码把它交给人工确认。概率帮助我们决定何时自动处理、何时先检查；前提是用真实工单验证过这些概率是否可信。

**English｜** This customer has two issues: a return and a duplicate charge. The example gives returns 0.61 and billing 0.35. Routing only by the highest label could overlook the other issue. The same rule now sends the ticket to a person. Probabilities can help decide when to automate and when to check, provided their reliability has been tested on real tickets.

> 画面 / Visual 3 / 3 · 高频小判断值得比较 Jev；偶发分类或完整回复可保留 LLM
>
> Benchmark Jev for repeated decisions; an LLM may suffice for occasional labels or replies

**中文｜** 当同一种小判断反复出现、答案范围清楚，而且延迟或调用成本开始影响流程时，就值得试 Jev。比如工单分类、优先级评分。若只是偶尔分类，或主要任务是写完整回复，现有 LLM 返回 JSON 或文字可能已经够用。也可以让 Jev 给判断、代码分流、LLM 写回复。最终拿同一批新工单，先比错误和 calibration，再比延迟和成本。

**English｜** Jev is worth testing when a small decision repeats, its answer space is defined, and latency or per-call cost matters. Ticket classification and priority scoring are examples. For occasional labels or complete replies, an existing LLM producing JSON or text may suffice. They can also work together: Jev decides, code routes, and an LLM writes. Compare errors and calibration first, then latency and cost, using the same new test tickets.

**转场｜** 接下来把视角转向研发：AI 能否帮助改进下一代 AI？

**Transition｜** Now turn to development: can AI help improve the next AI?

---

## 14 · R0｜RSI

[打开本页](/session-2#rsi/R0)

> 画面 / Visual 1 / 1 · RSI 与英文全称独占开场页
>
> RSI and its full name fill the opening page

**中文｜** RSI 是 Recursive Self-Improvement，递归自我改进。设想一个 AI 助手先改好自己的工具，再让带着新工具的助手做下一次改进。我们要看的是：改好的那个，能不能接着改自己？先从一次容易看懂的改进开始。

**English｜** RSI means Recursive Self-Improvement. Imagine an AI assistant improving its own tools. The assistant with those new tools then works on the next improvement. Can the improved assistant keep improving itself? Start with one change we can easily check.

**转场｜** 先从一个容易看懂的排序程序开始。

**Transition｜** Start with a sorting program we can inspect.

---

## 15 · R4｜Try a change. Check the result.

[打开本页](/session-2#rsi/R4)

> 画面 / Visual 1 / 3 · A 排对了，右侧仍使用 A
>
> A sorts correctly and remains in use

**中文｜** A 是原来使用的排序程序，结果正确。现在想让它少做些工作。这里把比较和写入次数加起来当作工作量，不是运行秒数。三个候选是预先写好的，数字移动来自实际执行。

**English｜** A is our original sorting program, and its result is correct. We want it to do less work. Here work is the number of comparisons plus array writes, not elapsed seconds. The three candidates are prewritten, and the numbers follow their actual execution.

> 画面 / Visual 2 / 3 · B 的结果有误，继续使用 A
>
> B gives an incorrect result; keep A

**中文｜** 第一次尝试 B，只走一遍，工作确实少了，但红色数字还没排对。改得快没有用，先得正确，所以右边 IN USE 仍然是 A。

**English｜** The first attempt, B, makes only one pass. It uses less work, but the red numbers are still out of order. A cheaper change must still be correct, so IN USE stays A.

> 画面 / Visual 3 / 3 · C 通过六项测试，以更少工作替换 A
>
> C passes six tests with less work and replaces A

**中文｜** 再试 C。它通过同一组六项测试，工作量也更少，才替换 A。这次变好的是排序程序。下一页，把注意力转向做事的助手：如果它改的是自己的工具，又会怎样？

**English｜** Try C next. It passes the same six tests with less work, so it replaces A. Here we improved a sorting program. Next, watch the assistant doing the work: what happens when it changes its own tools?

**转场｜** 接下来，助手开始改自己的工具。

**Transition｜** Now the assistant changes its own tool.

---

## 16 · R8｜The improved assistant takes over

[打开本页](/session-2#rsi/R8)

> 画面 / Visual 1 / 3 · 同一块 Check 移进 A 自己的 Edit → Use 工具
>
> The same Check tile moves into A’s own Edit → Use tool

**中文｜** 看 A 自己的工具。原来改完就用，现在 A 在中间加了一步检查：先看看改动能不能用，再使用。DGM 研究中有这类改进；这里把它画成一个简单例子。

**English｜** Look at A’s own tool. It used to go straight from editing to using the result. A adds a check in between: check that the edit can be applied before using it. DGM includes this kind of improvement; this is a simple illustration.

> 画面 / Visual 2 / 3 · 新工具在其他任务上接受检查，带着它的助手 B 出现在右边
>
> The new tool is tested on other tasks; assistant B appears on the right with that tool

**中文｜** 这套新工具还要放到其他编程任务里试一试。检查之后，留下带着新工具的 B。这里的测试只是示意；真实研究要评估整个助手做事的结果。

**English｜** Try the new tool on other coding tasks. After checking it, keep B with the new tool. The tests here are only an illustration; the research evaluates how the whole assistant performs.

> 画面 / Visual 3 / 3 · B 从右边移到左边，带着新工具开始尝试下一次修改
>
> B moves from right to left and uses its new tool to begin another change

**中文｜** 注意 B 回到了左边。现在由 B 带着新工具，继续尝试改自己的工具。上一轮的成果，成了下一轮动手改进的助手。DGM 展示了这样的回路；下一次能否再改好，还要继续检查。

**English｜** Notice B moving back to the left. B now uses its new tool to try another change to itself. The result of one round becomes the assistant doing the next round. DGM shows this kind of loop; whether the next change helps still needs checking.

**转场｜** 另一个例子里，传到下一轮的是训练材料。

**Transition｜** In the next example, training material carries the process forward.

---

## 17 · R9｜The new model makes the next batch

[打开本页](/session-2#rsi/R9)

> 画面 / Visual 1 / 3 · A 写出的解题过程经过答案核对，选出的纸张留下
>
> A’s solution sheets are checked against known answers; selected sheets remain

**中文｜** STaR 从已有题目和标准答案开始。A 写出解题过程，再核对最后的答案，留下答对的那几份。纸上是它写出的解题过程，题目和标准答案由外部提供。

**English｜** STaR starts with supplied questions and known answers. A writes solution steps, then the final answers are checked. Keep the sheets whose answers match. The model writes the solutions; the questions and answer key come from outside.

> 画面 / Visual 2 / 3 · 选中的解题过程移入训练，右边出现新模型 B
>
> Selected solutions move into training; the new model B appears on the right

**中文｜** 这些被选中的解题过程移进训练，成为练习材料。积累很多这样的材料，再用它们训练模型，得到 B。图里的几张纸代表一大批例子。

**English｜** The selected solutions move into training as practice material. Collect many such examples and use them to train a model, producing B. The few sheets here stand for a much larger batch.

> 画面 / Visual 3 / 3 · B 移到左边，写出下一轮要筛选的解题过程
>
> B moves to the left and writes solutions for the next round of selection

**中文｜** B 回到了左边，开始写下一批解题过程。它既是上一轮训练的结果，又在制作下一轮的训练材料。这就是这个例子里回来的那一步。

**English｜** B moves back to the left and writes the next batch of solutions. It is both the result of the last training round and the maker of material for the next one. That is what comes back into the next round.

**转场｜** 再看一个只展示了部分过程的例子：AI 让训练更快。

**Transition｜** Now an example that shows part of the process: AI makes training faster.

---

## 18 · R5｜AI helps make AI training faster

[打开本页](/session-2#rsi/R5)

> 画面 / Visual 1 / 2 · Gemini 提出的改动接受正确性与速度检查
>
> Gemini’s proposed change is checked for correctness and speed

**中文｜** 训练 AI 时，有些小计算会反复运行。AlphaEvolve 让 Gemini 试着改快其中一个，再检查结果有没有算对、是否真的更快。接下来，这块改好的计算会放回训练里。

**English｜** Training AI repeats some small computations many times. AlphaEvolve uses Gemini to try improving one, then checks whether it is correct and faster. The improved computation will go back into training.

> 画面 / Visual 2 / 2 · 同一块计算移入 Gemini 训练，显示已报告的效率收益
>
> The same computation enters Gemini training and the reported gains appear

**中文｜** 同一块计算回到了 Gemini 的训练中。DeepMind 报告，这段计算平均加速 23%，让整体训练时间约少 1%。这说明训练更快了；这个结果没有展示新模型回来做下一轮改进。

**English｜** The same computation goes into Gemini training. DeepMind reported an average 23% speedup for that routine and about 1% less total training time. Training became faster; this result does not show the new model returning to make the next improvement.

**转场｜** 最后并排看清：哪些例子真的接上了下一轮？

**Transition｜** Finally, compare which examples show something returning for the next round.

---

## 19 · R6｜Who comes back for the next round?

[打开本页](/session-2#rsi/R6)

> 画面 / Visual 1 / 2 · DGM：新助手继续改自己；STaR：新模型做下一批材料；AlphaEvolve：训练更快，下一轮未展示
>
> DGM: improved helper works on itself again; STaR: new model makes the next practice set; AlphaEvolve: training is faster, next round not shown

**中文｜** DGM 中，改好的助手继续改自己的工具。STaR 中，新模型制作下一轮的训练材料。AlphaEvolve 这个成果让训练更快，但没有展示新模型接棒。这三个例子走到了不同的地方。

**English｜** In DGM, the improved assistant works on its own tools again. In STaR, the new model makes material for the next training round. This AlphaEvolve result makes training faster, but does not show the new model taking over. The examples show different parts of the process.

> 画面 / Visual 2 / 2 · B 回到左边成为改进者，右边的 C 仍带问号
>
> B returns to the left to make another improvement; C on the right still has a question mark

**中文｜** 看 B 的移动：它先出现在右边，是这轮的结果；接着回到左边，成为下一轮动手改进的助手。RSI 要看的，就是改好的自己能不能继续改自己。C 还带着问号，因为下一次是否进步，仍要测试。

**English｜** Watch B move. First it appears on the right as this round’s result. Then it returns to the left to make the next improvement. RSI asks whether the improved system can keep improving itself. C still has a question mark because the next improvement must be tested.

**转场｜** 回到今天的三个问题：能否操作、能否判断、能否继续改进。

**Transition｜** Return to our three questions: can it act, decide and keep improving?

---

## 20 · E1｜Comparing the three concepts

[打开本页](/session-2#closing/E1)

> 画面 / Visual 1 / 1 · 总结画面
>
> The closing map

**中文｜** Computer Use 关心操作有没有完成；Jev 关心判断是否可靠、是否划算；RSI 关心改进后的 AI 能否把下一轮研发做得更好。三个概念都要看实际结果，但需要验证的东西不同。

**English｜** Computer Use asks whether the action achieved its goal. Jev asks whether a decision is reliable and worth its cost. RSI asks whether the improved AI can make the next round of research better. All three need evidence, but they need evidence of different things.

**转场｜** 今天先讲到这里。

**Transition｜** That’s where we’ll leave it today.
