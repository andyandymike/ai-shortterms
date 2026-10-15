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

**中文｜** 研发 AI 要反复想方案、写实验、检查结果。人能做的尝试有限，所以希望 AI 也能承担这些工作。RSI，Recursive Self-Improvement，递归自我改进，进一步问：改进后的 AI 系统，能不能继续参与下一轮改进？先看怎样判断一次改动有没有用，再看三种不同做法。

**English｜** Developing AI involves proposing ideas, running experiments and checking results. People have limited time for those trials, so we want AI to help. Recursive Self-Improvement asks a further question: can the improved AI system participate in the next improvement round? First see how we judge one change, then compare three approaches.

**转场｜** 先从一个容易看懂的排序程序开始。

**Transition｜** Start with a sorting program we can inspect.

---

## 15 · R4｜How an improvement loop works

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

**中文｜** 再试 C。它通过同一组六项测试，工作量也更少，才替换 A。这就是提出改法、测试、保留结果。眼下变好的是排序程序；如果改的是 AI 自己的工具、参数，或者训练程序，才开始接近我们今天要讲的几条路线。

**English｜** Try C next. It passes the same six tests with less work, so it replaces A. That is propose, test and retain. So far, a sorting program has improved. Now apply that idea to an AI system’s own tools, parameters or training code.

**转场｜** 第一种做法：模型不变，改它做事的方法。

**Transition｜** First: keep the model, change how the agent works.

---

## 16 · R8｜How an agent improves its workflow

[打开本页](/session-2#rsi/R8)

> 画面 / Visual 1 / 2 · 工作流新增 Validate the patch，失败补丁修正后成功应用
>
> Validate the patch is inserted; a failed patch is revised and applied

**中文｜** 第一条路线改 Agent 的代码。Agent 可以理解成模型加上工具和做事流程。左边 LLM 的 weights 没变，变的是中间：编辑代码后先检查补丁能不能应用，有错就返回重试。DGM，也就是 Darwin Gödel Machine，报告过这类自改工具的做法；这里把过程画成一个简单例子。

**English｜** The first route changes agent code. Think of an agent as a model plus its tools and workflow. The LLM weights on the left stay fixed. The middle gains a patch check: if an edit cannot apply, return the error and retry. DGM, the Darwin Gödel Machine, reported this kind of tool improvement. This is a simplified illustration.

> 画面 / Visual 2 / 2 · 在别的编程任务上评估版本，版本库中的 v2 参与后续修改
>
> Evaluate variants on other coding tasks; v2 from the archive helps make later variants

**中文｜** 一个补丁成功还不够，要用别的编程任务评估整个 Agent。DGM 会保留一个版本库，从不同版本继续探索；图里只画了一条分支。关键是，改好的 Agent 也会参与后面的自我修改。底层模型没重训，系统的做事能力仍然可能改善。

**English｜** One successful patch is not enough: evaluate the whole agent on other coding tasks. DGM keeps an archive and explores from different variants; this diagram shows one branch. A modified agent also participates in later self-modification. The system can improve even though its base model was not retrained.

**转场｜** 第二条路线直接改变模型的 weights。

**Transition｜** The second route changes the model’s weights.

---

## 17 · R9｜How a model learns from its own solutions

[打开本页](/session-2#rsi/R9)

> 画面 / Visual 1 / 2 · 正确答案被筛出；错误的 7 根据答案提示重试为 10
>
> Matching answers are selected; the wrong 7 is retried with a hint and becomes 10

**中文｜** 第二条路线像做题后整理练习材料。STaR 从已有题目和标准答案开始，让模型写解题过程。第一题答对，留下；第二题答成 7，给它答案 10，再试着写出能得到 10 的过程。它生成的是解题过程，题目和判断答案的依据仍由外部提供。

**English｜** The second route resembles collecting useful practice solutions. STaR starts with existing questions and known answers, and asks the model for solution steps. Keep the first correct answer. For the second, wrong answer of 7, give the answer 10 as a hint and try again. The model generates the solution steps; the questions and answer key come from outside.

> 画面 / Visual 2 / 2 · 训练改变 weights，得到的模型继续生成下一批解题过程
>
> Fine-tuning changes weights; the resulting model generates another batch of solutions

**中文｜** 积累很多这样的例子，再做 fine-tuning，微调：用选出的题目和解题过程训练模型，改变 weights。训练后的模型再生成下一批，继续筛选和训练。这比在一次聊天的 context 里记住一句提示多了一步。也要注意，答案碰巧正确不保证过程正确，模型有没有学好还得用新题检查。

**English｜** Collect many such examples, then fine-tune: train on the selected questions and solutions to change the weights. The resulting model generates the next batch for another round of selection and training. This goes beyond adding a hint to one conversation’s context. A matching answer does not guarantee sound reasoning, so evaluate learning on new questions.

**转场｜** 第三条路线不改做题方式，而是改训练所用的计算程序。

**Transition｜** The third route improves the computation used for training.

---

## 18 · R5｜How AlphaEvolve improves AI training

[打开本页](/session-2#rsi/R5)

> 画面 / Visual 1 / 2 · Gemini 提议的 kernel 改动通过正确性与速度检查
>
> Gemini’s proposed kernel change passes correctness and speed checks

**中文｜** 训练 AI 时，有些小段计算会反复运行，这叫 kernel。可以把一次大计算分成小块，怎样分才更适合硬件，会影响效率。AlphaEvolve 用 Gemini 提出改法，再实际运行，检查答案是否正确、速度是否改善。和排序页一样，不能只听 AI 说它更好。

**English｜** Training repeatedly runs small compute routines called kernels. A large computation can be divided into smaller pieces; how those pieces fit the hardware affects efficiency. AlphaEvolve uses Gemini to propose changes, then runs checks for correctness and speed. As with sorting, a claim of improvement is not enough.

> 画面 / Visual 2 / 2 · 同一块 K 移入 Gemini 训练，显示已报告的效率收益
>
> The same K enters Gemini training and the reported efficiency gains appear

**中文｜** 现在改好的 K 回到 Gemini 的训练里。DeepMind 报告，这类 kernel 平均加速 23%，整体训练时间约减少 1%。因为它反复运行，局部节省也有价值。但这里证明的是训练更省；是否因此得到更会研发的 AI，还要另外检验。

**English｜** The improved K now goes into Gemini training. DeepMind reported an average 23% kernel speedup and about 1% less total training time. Repeated computation makes those savings useful. This establishes more efficient training; better AI research ability needs separate evidence.

**转场｜** 三种做法改的地方不同，最后看递归发生在哪里。

**Transition｜** The three approaches change different things. Now locate the recursive step.

---

## 19 · R6｜When does improvement become recursive?

[打开本页](/session-2#rsi/R6)

> 画面 / Visual 1 / 2 · 三列分别是 Agent 代码、模型 weights、训练工具
>
> Three columns compare agent code, model weights and training tools

**中文｜** 把三种做法并排看：DGM 改工具和流程，STaR 通过训练改 weights，AlphaEvolve 改训练用的程序。这是帮助理解的分法，不是 RSI 只有这三种。它们的共同问题是：改进会不会反馈到下一轮，帮助系统做出后续改进？

**English｜** Side by side: DGM changes tools and workflows, STaR trains weights, and AlphaEvolve improves training code. These are useful examples, not an exhaustive taxonomy of RSI. The shared question is whether an improvement feeds back and helps the system make later improvements.

> 画面 / Visual 2 / 2 · 条件性回路：v2 回到左侧做改进，右侧出现 v3 问号
>
> Conditional loop: v2 takes over on the left; v3 appears with a question mark

**中文｜** 递归发生在这条回来的箭头：上一轮改好的系统，参与下一轮改进。这里的系统既可以是模型，也可以包含工具和流程。要检验它是否真的更会改进，得用新任务和相同预算比较。DGM 展示了有限编程 Agent 的反馈回路；这些例子都不能直接推出 AI 已经能无限自我升级。

**English｜** The return arrow is the recursive step: the improved system participates in the next improvement round. A system can include both a model and its tools and workflow. Compare on new tasks with the same budget to test whether improvement ability grew. DGM demonstrates a bounded coding-agent feedback loop; these examples do not establish unlimited self-improvement.

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
