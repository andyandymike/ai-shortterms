# 第二场双语排练稿｜Talk 02 bilingual rehearsal

中英口播使用同一份演示顺序；实际演讲选择一种语言，不需要各念一遍。以约 25 分钟安排排练，含观众观察与 Blender 短片；实际时长随语速与停顿调整。

从观众页底部 Presenter 打开讲者窗口。只沿 Continue / 下一步前进：自动播放这一段，在讲解点停下，需要翻页时自动翻页。讲者窗口显示当前口播与下一次点击的结果。不要在投影上展示讲者窗口。

Open the presenter window from Presenter in the audience footer. Continue runs each segment and stops at the next speaking point, changing pages when needed. Keep that window on your own screen.

只有「说 / SAY」与「转 / TRANSITION」是口播。先等动作完成，观察，再解释结果。说完转场再继续。All other fields are private presenter cues.

## O1 · From answers to actions.

[直达本页第一个停顿点](/session-2#opening/O1)

### 1 / 42 · 今天的三个问题 / Three questions for today

**画面 / VISUAL**

中：三个图形：操作界面、选择分支、版本递进。

EN: Three pictures: an interface, a decision branch, and successive versions.

**自动动作 / AUTOMATIC ACTION**

中：打开三个章节的地图

EN: Show the map of the three chapters

**说 / SAY**

中：今天讲三个词：Computer Use、Jev 和 RSI。它们分别回答三个问题：AI 能不能在软件里把事情做完？一个流程需要判断时，该用什么模型？AI 能不能帮助改进制造下一代 AI 的方法？我们每一章都先看一个容易理解的场景，再讲术语、原理和真实例子。屏幕上的小实验是为了看清过程，不是在现场调用这些模型。

EN: Today we will look at Computer Use, Jev, and RSI. They ask three questions. Can AI finish a task inside software? Which model fits a decision in a workflow? And can AI help improve the method used to build the next AI? In each chapter, we will start with a familiar situation, then explain the terms, the mechanism, and a real example. The small experiments on screen illustrate the process; they are not live model calls.

**转 / TRANSITION**

中：先从最具体的一件事开始：帮客户创建一个退货申请。

EN: Let’s start with a concrete task: create a return request for a customer.

**下一次继续 / NEXT CONTINUE**

中：进入 C1；展示退货表单与任务。动作完成后自动停下。

EN: Open C1; Show the return form and task. The action stops automatically at the next speaking point.

---

## C1 · Turn a request into a result.

[直达本页第一个停顿点](/session-2#computer-use/C1)

### 2 / 42 · 先给一个可检查的目标 / Start with a checkable goal

**画面 / VISUAL**

中：左边是空表单，右边是 1048 号订单的退货目标；暂时没有截图。

EN: The empty form is on the left. The return goal for order 1048 is on the right, with no screenshot yet.

**自动动作 / AUTOMATIC ACTION**

中：展示退货表单与任务

EN: Show the return form and task

**说 / SAY**

中：用户想给 1048 号订单创建退货。如果 AI 只告诉我们点哪里，这件事还没有办完。最后得在应用里出现一条退货记录。Computer Use，就是让 AI 通过软件界面做事。今天我们盯住这张桌面，看看它怎样从一句话走到真正的结果。

EN: The user wants a return for order 1048. Advice about where to click does not finish the job. We need a return record in the app. Computer Use lets AI work through a software interface. We will follow this same desktop from the request to the result.

**转 / TRANSITION**

中：动手之前，它能看到哪些信息？

EN: Before acting, what information does it have?

**下一次继续 / NEXT CONTINUE**

中：进入 C2；截取第一张图，停在 context。动作完成后自动停下。

EN: Open C2; Capture the first screen and pause at context. The action stops automatically at the next speaking point.

---

## C2 · The screen becomes context.

[直达本页第一个停顿点](/session-2#computer-use/C2)

### 3 / 42 · 截图进入 context / A screenshot joins context

**画面 / VISUAL**

中：第一张屏幕缩略图已经出现在右边的 context。

EN: The first screen thumbnail has appeared in context on the right.

**自动动作 / AUTOMATIC ACTION**

中：截取第一张图，停在 context

EN: Capture the first screen and pause at context

**说 / SAY**

中：这张截图现在进入了 context。Context 就是模型这次判断能用的信息：目标是什么，画面现在怎样，之前已经试过什么。右边的小图是它最近看到的屏幕，不一定永远等于左边正在发生的事。

EN: This screenshot has joined the context: the information available for this decision. What is the goal, what does the screen look like, and what has already been tried? The thumbnail is the most recently observed screen. It may not always match the live application.

**下一次继续 / NEXT CONTINUE**

中：高亮订单号输入框。动作完成后自动停下。

EN: Highlight the order-number field. The action stops automatically at the next speaking point.

### 4 / 42 · 从文字找到界面位置 / Find a position from a description

**画面 / VISUAL**

中：鼠标已移到订单框，红色定位框标出了目标。

EN: The cursor is at the order field, marked by a red target outline.

**自动动作 / AUTOMATIC ACTION**

中：高亮订单号输入框

EN: Highlight the order-number field

**说 / SAY**

中：看见画面是 Vision。把“订单号输入框”对应到这个具体位置，叫 UI grounding。术语听起来抽象，画面上就是这个定位动作。

EN: Vision reads the screen. UI grounding connects “the order-number field” to this specific position. Here, you can see that connection as a target outline.

**转 / TRANSITION**

中：为什么要通过界面走这一遍？

EN: Why take the route through the interface?

**下一次继续 / NEXT CONTINUE**

中：进入 C3；翻页比较 API 和界面操作。动作完成后自动停下。

EN: Open C3; Compare an API call with interface actions. The action stops automatically at the next speaking point.

---

## C3 · Two routes into the same app.

[直达本页第一个停顿点](/session-2#computer-use/C3)

### 5 / 42 · 两种操作入口 / Two ways to act

**画面 / VISUAL**

中：同一个退货目标分成两条路线：API 直接调用，或观察并操作界面，最后都需要完成证据。

EN: The same return goal branches into an API call or observing and operating the interface. Both routes end with evidence of completion.

**自动动作 / AUTOMATIC ACTION**

中：翻页比较 API 和界面操作

EN: Compare an API call with interface actions

**说 / SAY**

中：API 是软件留给程序的接口。如果订单系统提供它，可以直接请求创建退货。如果任务只能通过界面完成，就需要观察、定位和操作。真实工作里两条路可以配合：能直接调用的部分用 API，需要在屏幕上处理的部分用 Computer Use。

EN: An API is an interface for software. If the order system provides one, a program can request the return directly. If the task requires the visible interface, it needs observation, targeting and actions. Real workflows can combine both routes: API calls where available, and Computer Use for work on screen.

**转 / TRANSITION**

中：现在继续刚才的桌面，看工具怎样把事情做完。

EN: Now continue on the same desktop and watch the tools do the work.

**下一次继续 / NEXT CONTINUE**

中：进入 C4；自动填表，停在新的截图。动作完成后自动停下。

EN: Open C4; Fill the form and pause after a new screenshot. The action stops automatically at the next speaking point.

---

## C4 · See. Act. Check.

[直达本页第一个停顿点](/session-2#computer-use/C4)

### 6 / 42 · 动作改变界面 / Actions change the application

**画面 / VISUAL**

中：表单已填好，新截图已经返回；还没有退货回执。

EN: The form is filled and a fresh screenshot has returned. There is still no receipt.

**自动动作 / AUTOMATIC ACTION**

中：自动填表，停在新的截图

EN: Fill the form and pause after a new screenshot

**说 / SAY**

中：模型提出 tool call，也就是请工具做一件事。鼠标移动、键入文字，是工具在执行。填好以后，新截图返回，模型才知道操作实际产生了什么结果。现在表单填好了，但还没有回执。做到这里，能算完成吗？

EN: The model requests a tool call: an operation for a tool to perform. The tool moves the cursor and types. A new screenshot then shows what actually happened. The form is filled, but there is no receipt yet. Is that enough to call the task complete?

**下一次继续 / NEXT CONTINUE**

中：提交申请，自动取回截图并确认回执。动作完成后自动停下。

EN: Submit, capture a fresh screen and confirm the receipt. The action stops automatically at the next speaking point.

### 7 / 42 · 提交，再用新截图验证 / Submit, then verify in a fresh screenshot

**画面 / VISUAL**

中：新的截图已经确认 R-204；应用结果与 context 对上了。

EN: A new screenshot confirms R-204. The application result now matches context.

**自动动作 / AUTOMATIC ACTION**

中：提交申请，自动取回截图并确认回执

EN: Submit, capture a fresh screen and confirm the receipt

**说 / SAY**

中：应用先出现 R-204，随后新截图把回执带进 context，模型才拿到完成的证据。Agent 把目标、观察、工具和反馈串成循环。看过表单、点过提交都不够，要确认应用真的达到了目标。

EN: The app first shows R-204. A fresh screenshot then brings that receipt into context, giving the model evidence of completion. The agent connects the goal, observations, tools and feedback. Seeing the form or clicking Submit is not enough; check that the application reached the goal.

**转 / TRANSITION**

中：接下来改变一下条件，看它还能不能照原计划走。

EN: Now change the conditions and see whether the old plan still works.

**下一次继续 / NEXT CONTINUE**

中：进入 C5；插入弹窗，让旧点击失败。动作完成后自动停下。

EN: Open C5; Insert a popup and let the old click fail. The action stops automatically at the next speaking point.

---

## C5 · Change the screen. What now?

[直达本页第一个停顿点](/session-2#computer-use/C5)

### 8 / 42 · 旧画面会带来错误动作 / An old screen can produce the wrong action

**画面 / VISUAL**

中：弹窗挡住表单，旧位置已经被点击；没有回执，右边仍是旧截图。

EN: A popup covers the form. The old position has been clicked, but there is no receipt and the right side still holds the old screenshot.

**自动动作 / AUTOMATIC ACTION**

中：插入弹窗，让旧点击失败

EN: Insert a popup and let the old click fail

**说 / SAY**

中：弹窗挡住了表单，右边却还保留旧截图。刚才那个点击执行了，但点在遮挡层上，没有退货回执。动作执行成功和任务完成，是两件事。继续照旧点下去，问题还会在。

EN: The popup covers the form, but the right side still holds the old screenshot. The click executed, yet it hit the overlay and produced no return receipt. Executing an action and completing the task are different things. Repeating the old click will leave the same problem.

**下一次继续 / NEXT CONTINUE**

中：取回新截图，关闭弹窗，重新提交并验证。动作完成后自动停下。

EN: Capture the popup, close it, resubmit and verify. The action stops automatically at the next speaking point.

### 9 / 42 · 重新观察，修正动作 / Observe again and change the action

**画面 / VISUAL**

中：弹窗已关闭，申请重新提交，新截图确认了回执。

EN: The popup is closed, the request is resubmitted, and a new screenshot confirms the receipt.

**自动动作 / AUTOMATIC ACTION**

中：取回新截图，关闭弹窗，重新提交并验证

EN: Capture the popup, close it, resubmit and verify

**说 / SAY**

中：新截图把弹窗带进 context，下一步就变成先关闭它，再重新提交、确认回执。这里的修正来自新观察；模型的 weights，也就是内部学到的参数，并没有在这次操作中重新训练。

EN: The fresh screenshot brings the popup into context. The next action becomes closing it, then resubmitting and checking the receipt. The correction follows new evidence. The model’s weights, its learned internal parameters, are not retrained during this interaction.

**转 / TRANSITION**

中：同样的观察和修正，也会出现在 Blender 这样的创作软件里。

EN: The same observation and correction can happen in creative software such as Blender.

**下一次继续 / NEXT CONTINUE**

中：进入 C6；搭建房子并生成第一张预览。动作完成后自动停下。

EN: Open C6; Build the house and produce the first preview. The action stops automatically at the next speaking point.

---

## C6 · Blender: build, render, inspect.

[直达本页第一个停顿点](/session-2#computer-use/C6)

### 10 / 42 · 从可编辑场景到渲染图 / From an editable scene to a render

**画面 / VISUAL**

中：简化教学动画已搭好房子并 render；正面仍很暗。

EN: The teaching animation has built and rendered the house. Its front is still dark.

**自动动作 / AUTOMATIC ACTION**

中：搭建房子并生成第一张预览

EN: Build the house and produce the first preview

**说 / SAY**

中：Blender 用来创作三维场景。刚才先用代码建立可编辑的物体，再 render。Render，就是根据场景、相机和灯光算出图像。现在房子出来了。这张预览可以交付了吗？先看一眼，你会改哪里？

EN: Blender creates 3D scenes. We first used code to build editable objects, then rendered them. Rendering produces an image from the scene, camera and lighting. The house is now visible. Is this preview ready to deliver? Look at it first. What would you change?

**下一次继续 / NEXT CONTINUE**

中：检查预览、移动灯光，再检查修正结果。动作完成后自动停下。

EN: Inspect the preview, move the light and check the corrected result. The action stops automatically at the next speaking point.

### 11 / 42 · 调整后再检查 / Adjust, then inspect again

**画面 / VISUAL**

中：灯光已移动，正面变亮，新的预览已完成检查。

EN: The light has moved, the front is brighter, and the new preview has been checked.

**自动动作 / AUTOMATIC ACTION**

中：检查预览、移动灯光，再检查修正结果

EN: Inspect the preview, move the light and check the corrected result

**说 / SAY**

中：原来的正面太暗，门窗细节看不清。检查把问题定位出来，灯光移过来以后，正面清楚了。修改场景，再 render、再检查，才知道调整有没有达到目的。这里是简化教学动画，说明代码修改和视觉检查怎样配合。

EN: The original front was too dark to show the doors and windows clearly. Inspection located the problem. Moving the light made the front clearer. Change the scene, render again, then inspect the result to see whether the adjustment worked. This teaching animation shows how code changes and visual inspection work together.

**下一次继续 / NEXT CONTINUE**

中：自动播放约 30 秒官方成品短片。动作完成后自动停下。

EN: Play the approximately 30-second published film. The action stops automatically at the next speaking point.

### 12 / 42 · 真实的成品画面 / The published result

**画面 / VISUAL**

中：约 30 秒的发布案例成片播放后，停在另一张已发布静帧；旁边保留 Python / bpy → Render → Computer Use 的流程。

EN: After the approximately 30-second published render film, a separate published still remains. The sidebar keeps the Python / bpy → Render → Computer Use workflow visible.

**自动动作 / AUTOMATIC ACTION**

中：自动播放约 30 秒官方成品短片

EN: Play the approximately 30-second published film

**说 / SAY**

中：刚才这段是发布案例中的真实 Blender 成片，结束后留着另一张案例静帧。这个流程结合了 bpy，也就是 Blender 的 Python API，先建立场景、render，再通过 Computer Use 打开 Blender 检查。影片展示的是创作结果，不是鼠标操作录像。刚才的小循环，在这里进入了更复杂的创作任务。

EN: That was the real Blender render from the published case; a separate published still remains at the end. The workflow combines bpy, Blender’s Python API, to build the scene and render it, with Computer Use to open Blender and inspect it. The film shows the creative result, not a mouse-action recording. The small loop we saw earlier is part of this richer creative task.

**转 / TRANSITION**

中：这些操作能力是怎么学来的？接下来把训练和使用分开看。

EN: How are these abilities learned? Next, separate training from using the model.

**下一次继续 / NEXT CONTINUE**

中：进入 C7；尝试一次点击，检查失败结果。动作完成后自动停下。

EN: Open C7; Try a click and inspect the failed result. The action stops automatically at the next speaking point.

---

## C7 · Practice changes the model.

[直达本页第一个停顿点](/session-2#computer-use/C7)

### 13 / 42 · 操作能力从练习与反馈而来 / Practice and feedback shape the ability

**画面 / VISUAL**

中：目标是创建退货，模型却点了取消；没有回执，任务失败成为反馈。

EN: The goal is to create a return, but the model clicks Cancel. No receipt appears; failure provides feedback.

**自动动作 / AUTOMATIC ACTION**

中：尝试一次点击，检查失败结果

EN: Try a click and inspect the failed result

**说 / SAY**

中：刚才看的是使用，现在看训练。目标是创建退货，模型却点了取消；点击执行了，任务没有完成。训练会检查结果，让成功和失败提供反馈。图里是简化的练习，不是在浏览器里训练真实模型。

EN: We have seen the model in use. Now consider training. The goal is a return, but the model clicks Cancel. The action ran; the task failed. Training checks outcomes so successes and failures can provide feedback. This is a simplified exercise, not a live model being trained in the browser.

**下一次继续 / NEXT CONTINUE**

中：展开多种任务，让反馈引导参数更新。动作完成后自动停下。

EN: Show varied tasks and feedback guiding a weight update. The action stops automatically at the next speaking point.

### 14 / 42 · 许多练习改变 weights / Many practice tasks change weights

**画面 / VISUAL**

中：多种任务的成功与失败汇入训练信号，模型格子的数值示意从 v1 变为 v2。

EN: Successes and failures across tasks supply a training signal. The illustrative weight grid changes from v1 to v2.

**自动动作 / AUTOMATIC ACTION**

中：展开多种任务，让反馈引导参数更新

EN: Show varied tasks and feedback guiding a weight update

**说 / SAY**

中：练习许多任务，把反馈用于调整 weights：模型内部影响判断的可调数值。反复小幅调整，才可能学到更好的操作方式。Reinforcement learning，强化学习，就是利用结果反馈学习行动的一类方法；OpenAI 的 CUA 使用了这条路线。

EN: Practice many tasks and use feedback to adjust weights: internal, adjustable numbers that influence predictions. Repeated small updates can teach better actions. Reinforcement learning is a family of methods that learn actions from outcome feedback. OpenAI used this route for CUA.

**下一次继续 / NEXT CONTINUE**

中：换一张布局不同的截图，定位新的按钮位置。动作完成后自动停下。

EN: Use a different layout and locate the button again. The action stops automatically at the next speaking point.

### 15 / 42 · 使用时换 context，参数保持不变 / New context with the same learned weights

**画面 / VISUAL**

中：按钮位置变了，模型读取新截图，重新定位；v2 的 weights 保持固定。

EN: The button has moved. The model uses the new screenshot to locate it; v2’s weights stay fixed.

**自动动作 / AUTOMATIC ACTION**

中：换一张布局不同的截图，定位新的按钮位置

EN: Use a different layout and locate the button again

**说 / SAY**

中：训练后换一张布局不同的画面。新截图进入 context，模型用学到的能力重新找按钮。这里变化的是这次能看到的信息，weights 保持不变。看新截图、修正动作，通常属于 inference，也就是使用已经训练好的模型。

EN: After training, show a different layout. The screenshot enters context, and the model uses its learned ability to locate the button again. The available information changes; the weights stay fixed. Reading a new screenshot and correcting an action normally happens during inference: using an already trained model.

**转 / TRANSITION**

中：有些流程暂时不需要操作屏幕，只需要先做一个判断。下一章就是 Jev。

EN: Some workflows do not need a screen action yet. They need a decision first. That brings us to Jev.

**下一次继续 / NEXT CONTINUE**

中：进入 J1；读入邮件，提出分流问题，返回 returns。动作完成后自动停下。

EN: Open J1; Read the message, ask the routing question and return returns. The action stops automatically at the next speaking point.

---

## J1 · Sometimes you need a decision.

[直达本页第一个停顿点](/session-2#jev/J1)

### 16 / 42 · 把输入变成流程需要的判断 / Turn the input into a decision the workflow can use

**画面 / VISUAL**

中：邮件进入共享 state，分类问题已经返回 returns。

EN: The message enters the shared state, and the classification question has returned returns.

**自动动作 / AUTOMATIC ACTION**

中：读入邮件，提出分流问题，返回 returns

EN: Read the message, ask the routing question and return returns

**说 / SAY**

中：这封邮件要退货，所以这里选了 returns。Jev 是 TypeSafe AI 的模型，面向答案形状明确的判断任务。画面里的 state，就是这些问题共用的输入材料：这里是一封邮件，实际流程还可以加入相关记录。这些材料构成这次判断的 context。结果是一个流程可以直接使用的分类。

EN: This message asks for a return, so the answer here is returns. Jev is a TypeSafe AI model for decisions with defined answer shapes. State is the input shared by those questions: a message here, with relevant records available in a real workflow. That material supplies context for the decision. The result is a classification the workflow can use.

**转 / TRANSITION**

中：这里先认识一个词：decoding。

EN: First, let’s introduce decoding.

**下一次继续 / NEXT CONTINUE**

中：进入 J2；选入 The，停下来观察新候选。动作完成后自动停下。

EN: Open J2; Select The and pause at the new candidates. The action stops automatically at the next speaking point.

---

## J2 · Choose a token. Change what follows.

[直达本页第一个停顿点](/session-2#jev/J2)

### 17 / 42 · Decoding：选入一个 token，再预测 / Decoding: choose a token, then predict again

**画面 / VISUAL**

中：The 已加入 context，下一组候选变为 returns 与 support。

EN: The has joined context. The next candidates are returns and support.

**自动动作 / AUTOMATIC ACTION**

中：选入 The，停下来观察新候选

EN: Select The and pause at the new candidates

**说 / SAY**

中：Decoding，就是从下一 token 的概率里按规则选一个，加回 context，再预测下一步。Token 可以是一个词、字符或文字片段。刚才选了 The，下一组候选就变成 returns 和 support。前面生成的内容，已经改变了后面的条件。这里的候选和概率都是教学示意。

EN: Decoding selects a token from predicted probabilities according to a rule, appends it to context, then predicts again. A token can be a word, character or piece of text. After choosing The, the next candidates became returns and support. The generated text changed the conditions for what follows. These candidates and probabilities are a teaching illustration.

**下一次继续 / NEXT CONTINUE**

中：改选 We，再自动生成 can help .。动作完成后自动停下。

EN: Choose We, then generate can help .. The action stops automatically at the next speaking point.

### 18 / 42 · 换开头，观察后续怎样改变 / Change the beginning and watch what follows

**画面 / VISUAL**

中：开头换成 We，候选随之改变；We can help . 逐 token 完成。

EN: Choosing We changes the candidates. We can help . completes one token at a time.

**自动动作 / AUTOMATIC ACTION**

中：改选 We，再自动生成 can help .

EN: Choose We, then generate can help .

**说 / SAY**

中：换成 We，后面就适合接 can 或 will，再逐步生成完整句子。每个选入的 token 都会影响下一步。这里自动选最高概率；按概率采样是另一种规则。Decoding 说的就是这一套逐步选取的过程。

EN: Choose We, and can or will becomes a suitable continuation. Repeat until the sentence is complete. Each selected token conditions the next step. This demo takes the highest probability; sampling is another rule. Decoding is this step-by-step selection process.

**转 / TRANSITION**

中：那么，普通 LLM 和 Jev 回答同一个判断题时，有什么不同？

EN: How do an ordinary LLM and Jev approach the same decision?

**下一次继续 / NEXT CONTINUE**

中：进入 J3；逐 token 生成结构化 JSON。动作完成后自动停下。

EN: Open J3; Generate structured JSON token by token. The action stops automatically at the next speaking point.

---

## J3 · Same decision. Different output path.

[直达本页第一个停顿点](/session-2#jev/J3)

### 19 / 42 · 普通 LLM 也能判断 / An ordinary LLM can decide too

**画面 / VISUAL**

中：左边 LLM 的 JSON 已经逐 token 生成完，右边的 Jev 路径尚未运行。

EN: The LLM on the left has finished generating JSON token by token. The Jev path on the right has not run yet.

**自动动作 / AUTOMATIC ACTION**

中：逐 token 生成结构化 JSON

EN: Generate structured JSON token by token

**说 / SAY**

中：普通 LLM 当然也能做判断。可以让它输出一个标签，约束成 JSON，甚至一次回答好几个问题。左边这个答案就是通过 decoding 逐 token 生成出来的。能不能输出结构化数据，不是普通 LLM 和 Jev 的分界。

EN: An ordinary LLM can make decisions too. We can ask for a label, constrain the output to JSON, or ask several questions in one call. The answer on the left was generated token by token through decoding. Structured output alone is not the dividing line between an ordinary LLM and Jev.

**下一次继续 / NEXT CONTINUE**

中：保留 LLM 结果，播放 Jev 路径。动作完成后自动停下。

EN: Keep the LLM result and run the Jev path. The action stops automatically at the next speaking point.

### 20 / 42 · 专门的决策输出 / An output path built for decisions

**画面 / VISUAL**

中：LLM 结果保留在左边，右边同一 state 的三个类型化问题已经返回结果。

EN: The LLM result remains on the left. On the right, three typed questions about the same state have returned results.

**自动动作 / AUTOMATIC ACTION**

中：保留 LLM 结果，播放 Jev 路径

EN: Keep the LLM result and run the Jev path

**说 / SAY**

中：Jev 回答答案类型预先定义的问题，不自由续写文本。多个问题共用 state，独立判断，可以并行处理；结果和概率交给代码选分支。TypeSafe 还把训练目标放在判断和校准概率上。是否比普通 LLM 合适，要比较实际任务；这里演示输出关系，不是内部架构或速度测试。

EN: Jev handles predefined decisions rather than freely continuing text. Questions share state, are evaluated independently and can run in parallel. Code uses the results and probabilities to choose a branch. TypeSafe also targets decisions and calibrated probabilities in training. Whether it fits better than an ordinary LLM needs testing on real tasks. This shows output relationships, not internal architecture or measured speed.

**转 / TRANSITION**

中：它给出的答案，具体有哪些形状？

EN: What answer shapes does it provide?

**下一次继续 / NEXT CONTINUE**

中：进入 J4；放大 Choice 的部门选项与概率。动作完成后自动停下。

EN: Open J4; Focus on Choice team options and their probabilities. The action stops automatically at the next speaking point.

---

## J4 · Choose. Score. Estimate.

[直达本页第一个停顿点](/session-2#jev/J4)

### 21 / 42 · Choice：在明确选项里选 / Choice: select from defined options

**画面 / VISUAL**

中：Choice 的 returns、billing、shipping 同时可见；概率为 0.94、0.04、0.02。

EN: Choice shows returns, billing and shipping with probabilities 0.94, 0.04 and 0.02.

**自动动作 / AUTOMATIC ACTION**

中：放大 Choice 的部门选项与概率

EN: Focus on Choice team options and their probabilities

**说 / SAY**

中：Choice 回答“选哪一个”。我们事先给出退货、账单和物流三个选项，它返回选择和各选项的概率。这里退货最高。软件拿到的是一个定义清楚的答案，后面就能按它分流。

EN: Choice answers “which one?” We define returns, billing and shipping as the available options, and it returns a selection and the option probabilities. Returns leads here. The software receives a defined answer it can use for routing.

**下一次继续 / NEXT CONTINUE**

中：展示五档 rubric、概率分布与期望分数 1.4。动作完成后自动停下。

EN: Show the five-level rubric, its distribution and expected score 1.4. The action stops automatically at the next speaking point.

### 22 / 42 · Score：先说明每一档是什么意思 / Score: define what each level means

**画面 / VISUAL**

中：五档从 0 routine 到 4 critical；概率依次为 0.1、0.5、0.3、0.1、0，期望分数为 1.4。

EN: The five levels run from 0 routine to 4 critical. Their probabilities are 0.1, 0.5, 0.3, 0.1 and 0, with an expected score of 1.4.

**自动动作 / AUTOMATIC ACTION**

中：展示五档 rubric、概率分布与期望分数 1.4

EN: Show the five-level rubric, its distribution and expected score 1.4

**说 / SAY**

中：Score 回答“到什么程度”，但得先给 rubric，也就是评分标准。这里从 0 的常规处理，到 4 的严重紧急，中间每档都有说明。模型给出各档概率，再按分值加权平均，得到 1.4。它是期望分数，不是在随便猜一个看起来精确的数字。

EN: Score answers “to what degree?” It first needs a rubric: a scoring standard. Here the levels run from 0 for routine handling to 4 for critical urgency, with a definition for each level. The model supplies probabilities for the levels. Their weighted average is 1.4, the expected score. The number is tied to a defined scale.

**下一次继续 / NEXT CONTINUE**

中：展示“客户想退货”的陈述与概率 0.96。动作完成后自动停下。

EN: Show the proposition “the customer wants a return” and probability 0.96. The action stops automatically at the next speaking point.

### 23 / 42 · Noul：一个陈述有多大概率为真 / Noul: estimate whether a proposition is true

**画面 / VISUAL**

中：Noul 只聚焦一个陈述：客户想退货；示意概率为 0.96。

EN: Noul focuses on one proposition: the customer wants a return. The illustrative probability is 0.96.

**自动动作 / AUTOMATIC ACTION**

中：展示“客户想退货”的陈述与概率 0.96

EN: Show the proposition “the customer wants a return” and probability 0.96

**说 / SAY**

中：Noul 回答一个陈述为真的概率。比如“客户想退货”，这里给出 0.96。它没有另外再给一个 confidence。Choice 是选项，Score 是有标准的分数，Noul 是陈述概率。画面上这些数值都是教学例子，下一步看怎样训练和检查它们。

EN: Noul estimates the probability that a proposition is true. For “the customer wants a return,” this illustration gives 0.96. It does not add a separate confidence value. Choice handles options, Score uses a defined scale, and Noul estimates a proposition. These numbers are teaching examples. Next, we will look at training and checking such outputs.

**转 / TRANSITION**

中：概率给出来以后，还要学会怎样给得合适。

EN: Once a probability is supplied, it also needs to be appropriate.

**下一次继续 / NEXT CONTINUE**

中：进入 J5；展示重复扣款邮件、v1 的退货判断与账单标注。动作完成后自动停下。

EN: Open J5; Show the duplicate-charge ticket, v1’s returns prediction and the billing label. The action stops automatically at the next speaking point.

---

## J5 · Learn from feedback. Check on new cases.

[直达本页第一个停顿点](/session-2#jev/J5)

### 24 / 42 · 先看清一次具体的判断错误 / Inspect a concrete decision error

**画面 / VISUAL**

中：训练邮件说“Charged twice. I’m keeping the shoes.”；v1 预测 returns，概率 0.95，但已知标注是 billing。

EN: The training ticket says “Charged twice. I’m keeping the shoes.” v1 predicts returns with probability 0.95, but the known label is billing.

**自动动作 / AUTOMATIC ACTION**

中：展示重复扣款邮件、v1 的退货判断与账单标注

EN: Show the duplicate-charge ticket, v1’s returns prediction and the billing label

**说 / SAY**

中：这封邮件说扣了两次钱，鞋子要留着。已知答案是账单问题，模型却选了退货，还给出 0.95。训练先把预测和答案放在一起比较，让错误形成反馈。一次高概率的错误，还不能判断模型整体是否校准。

EN: The customer was charged twice and wants to keep the shoes. The known answer is billing, but the model chose returns with probability 0.95. Comparing its prediction with the answer provides training feedback. One confident mistake cannot establish whether the model is calibrated overall.

**下一次继续 / NEXT CONTINUE**

中：展开多种训练案例，示意反馈与 weights 更新。动作完成后自动停下。

EN: Show varied cases, training feedback and a weight update. The action stops automatically at the next speaking point.

### 25 / 42 · 反馈怎样改变模型 / How feedback changes the model

**画面 / VISUAL**

中：不同工单与已知结果提供训练反馈，weights 格子变化，模型从 v1 变为 v2。

EN: Varied tickets and known outcomes provide feedback. The weight grid changes, taking the model from v1 to v2.

**自动动作 / AUTOMATIC ACTION**

中：展开多种训练案例，示意反馈与 weights 更新

EN: Show varied cases, training feedback and a weight update

**说 / SAY**

中：许多例子的反馈变成训练信号，用来调整 weights，影响以后面对新输入时的判断。TypeSafe 将这条路线称为 RLCD：Reinforcement Learning for Calibrated Decisions，面向判断与校准概率的强化学习。这里展示通用原理；公开说明没有给出具体更新算法。

EN: Feedback from many examples becomes a signal for adjusting weights, affecting judgments on future inputs. TypeSafe calls its approach RLCD: Reinforcement Learning for Calibrated Decisions. It targets decisions and calibrated probabilities. This shows the general principle; the public explanation does not specify the update algorithm.

**下一次继续 / NEXT CONTINUE**

中：一次揭晓整组独立新案例，比较预测概率与实际结果。动作完成后自动停下。

EN: Reveal the separate batch together and compare predictions with outcomes. The action stops automatically at the next speaking point.

### 26 / 42 · 在新案例上检查 calibration / Check calibration on the new cases

**画面 / VISUAL**

中：v2 的 weights 固定；另一批新题报出约 0.8，十个结果同时揭晓，八对两错。

EN: v2’s weights stay fixed. A separate batch has predictions near 0.8; all ten outcomes appear together, eight correct and two wrong.

**自动动作 / AUTOMATIC ACTION**

中：一次揭晓整组独立新案例，比较预测概率与实际结果

EN: Reveal the separate batch together and compare predictions with outcomes

**说 / SAY**

中：换一批没参与训练的新题。Calibration 检查许多相近概率的预测，和实际发生的频率能否对上。这里的 0.8 属于新题，不是把旧答案的 0.95 调低；也不保证每十题恰好八对。十道教学题不能证明训练已经改善模型。

EN: Use cases that did not contribute to training. Calibration asks whether many predictions with similar probabilities match observed frequencies. This 0.8 belongs to new cases; it is not a reduction of the earlier 0.95, nor a guarantee of eight successes in every ten. Ten teaching cases cannot prove that training improved the model.

**转 / TRANSITION**

中：再把这个问题带回刚才那封邮件。

EN: Now bring that question back to our message.

**下一次继续 / NEXT CONTINUE**

中：进入 J6；展开部门分布，停在分歧处。动作完成后自动停下。

EN: Open J6; Show the team distribution and pause at the ambiguity. The action stops automatically at the next speaking point.

---

## J6 · Two numbers, two meanings.

[直达本页第一个停顿点](/session-2#jev/J6)

### 27 / 42 · 选项概率与 confidence / Option probability and confidence

**画面 / VISUAL**

中：Team 分布为 returns 0.61、billing 0.35、shipping 0.04，confidence 为 0.42。

EN: Team probabilities are returns 0.61, billing 0.35 and shipping 0.04; confidence is 0.42.

**自动动作 / AUTOMATIC ACTION**

中：展开部门分布，停在分歧处

EN: Show the team distribution and pause at the ambiguity

**说 / SAY**

中：邮件现在既要退货，又有重复扣款。退货排第一，账单也占了明显一部分。0.61 是某个选项的概率，confidence 则概括整个分布的形状。它们不是两个版本的正确率，分歧会影响接下来的流程。

EN: The message now asks for a return and reports a duplicate charge. Returns leads, but billing also has substantial probability. The 0.61 describes an option; confidence summarizes the distribution’s shape. These are not two versions of accuracy. The ambiguity matters for the next workflow step.

**下一次继续 / NEXT CONTINUE**

中：切到退货原因的分布。动作完成后自动停下。

EN: Switch to the return-reason distribution. The action stops automatically at the next speaking point.

### 28 / 42 · 换个问题可以很清楚 / Another question can be clear

**画面 / VISUAL**

中：问题已切为 Return reason；wrong_size 为 1.00，另一个原因项为 0。

EN: The question is now Return reason. wrong_size is 1.00 and the other reason is 0.

**自动动作 / AUTOMATIC ACTION**

中：切到退货原因的分布

EN: Switch to the return-reason distribution

**说 / SAY**

中：换一个问题：退货原因是什么？尺码不合适写得很明确。同一段 state，对一个问题模糊，对另一个问题可以清楚。这里把输入简化了，借用官方文档里的部门与原因数值来讲区别；不是这封新邮件的实测结果，也不是现场调用。

EN: Ask a different question: what is the return reason? Wrong size is explicit. The same state can be ambiguous for one question and clear for another. This simplified input borrows the team and reason values from the official documentation to illustrate the distinction. They are not measurements on this new message or results from a live call.

**转 / TRANSITION**

中：判断有了分歧，接下来该让流程做什么？

EN: When the decision is mixed, what should the workflow do next?

**下一次继续 / NEXT CONTINUE**

中：进入 J8；沿用刚才的混合请求，把信封交给人澄清。动作完成后自动停下。

EN: Open J8; Continue with the same mixed request and route the envelope to a person. The action stops automatically at the next speaking point.

---

## J8 · A decision becomes a next step.

[直达本页第一个停顿点](/session-2#jev/J8)

### 29 / 42 · 有歧义时先澄清 / Clarify when the evidence is mixed

**画面 / VISUAL**

中：沿用 J6 的邮件与部门判断，信封进入 Person 分支；没有重新添加扣款问题。

EN: The message and team decision continue from J6. The envelope enters the Person branch without adding the charge issue again.

**自动动作 / AUTOMATIC ACTION**

中：沿用刚才的混合请求，把信封交给人澄清

EN: Continue with the same mixed request and route the envelope to a person

**说 / SAY**

中：刚才这封邮件有两个问题，部门判断也有分歧。于是这条教学规则让人先澄清，信封就沿这条路走。概率的作用落到了实际行动上。真实系统怎样分流，还要由自己的政策与风险决定，这里没有通用阈值。

EN: The same message raises two issues, and the team decision is mixed. This teaching policy therefore asks a person to clarify, and the envelope takes that route. The probability now affects an action. A real system must set routing conditions for its own policy and risk; there is no universal threshold here.

**下一次继续 / NEXT CONTINUE**

中：展开 Jev、普通代码、LLM 与人工的完整工作流。动作完成后自动停下。

EN: Expand the workflow across Jev, ordinary code, an LLM and a person. The action stops automatically at the next speaking point.

### 30 / 42 · 各个环节各做一件事 / Give each part of the workflow a defined job

**画面 / VISUAL**

中：完整流程显示：Jev 给出有限判断，普通代码选择分支，LLM 写回复或人来澄清。

EN: The full workflow shows Jev making a bounded decision, ordinary code selecting a branch, then an LLM drafting a reply or a person clarifying.

**自动动作 / AUTOMATIC ACTION**

中：展开 Jev、普通代码、LLM 与人工的完整工作流

EN: Expand the workflow across Jev, ordinary code, an LLM and a person

**说 / SAY**

中：Jev 适合评估的是大量重复、答案范围明确的判断。普通代码负责分支；需要写解释或回复时，生成式 LLM 有它的用途；需要澄清时就交给人。要操作画面，还得有视觉模型和工具，Jev 当前接收文字与 JSON。是否采用它，要在自己的任务上比较准确性、calibration、成本和延迟。

EN: Jev is worth evaluating for many repeated decisions with a defined answer space. Ordinary code handles branching. A generative LLM can write an explanation or reply, while a person can clarify ambiguity. Screen interaction still needs a vision model and tools; Jev currently takes text and JSON. Whether to use it depends on accuracy, calibration, cost and latency on your own tasks.

**转 / TRANSITION**

中：最后，把视角从处理任务，转到改进处理任务的方法。

EN: Finally, move from handling tasks to improving the method used to handle them.

**下一次继续 / NEXT CONTINUE**

中：进入 R1；翻到 RSI 的递归问题。动作完成后自动停下。

EN: Open R1; Introduce the recursive question in RSI. The action stops automatically at the next speaking point.

---

## R1 · Improve the recipe for improving.

[直达本页第一个停顿点](/session-2#rsi/R1)

### 31 / 42 · 改进者本身能否变强 / Can the improver itself become stronger?

**画面 / VISUAL**

中：两张配方纸从 v1 指向 v2，回程箭头带着问号。

EN: Two recipe sheets connect v1 to v2, with a question mark on the return path.

**自动动作 / AUTOMATIC ACTION**

中：翻到 RSI 的递归问题

EN: Introduce the recursive question in RSI

**说 / SAY**

中：RSI 是 Recursive Self-Improvement，递归自我改进。改一次答案，改变的是这次输出；留下更好的算法或工具，改变的是可复用的方法。RSI 再问一层：AI 能否帮助造出更有能力的后继系统，而后继系统又更擅长推动下一轮改进？递归说的是，改进能力能不能继续传下去。图上的问号表示，这个循环还需要研究和验证。

EN: RSI means Recursive Self-Improvement. Revising one answer changes an output. Retaining a better algorithm or tool improves a reusable method. RSI asks a further question: can AI help build a more capable successor that becomes better at driving another improvement cycle? The recursion concerns whether that ability carries forward. The question mark shows a loop that still needs investigation and evidence.

**转 / TRANSITION**

中：为什么大家想把研究过程的一部分交给 AI？

EN: Why use AI for part of the research process?

**下一次继续 / NEXT CONTINUE**

中：进入 R3；从一个想法展开到多个候选与有限实验。动作完成后自动停下。

EN: Open R3; Expand one idea into many candidates and a limited set of experiments. The action stops automatically at the next speaking point.

---

## R3 · Ideas are cheap. Experiments take work.

[直达本页第一个停顿点](/session-2#rsi/R3)

### 32 / 42 · 想法多，能试的少 / Many ideas, limited experiments

**画面 / VISUAL**

中：一个想法展开成多个候选，能进入实验的只有其中一部分。

EN: One idea expands into several candidates, only some of which can enter experiments.

**自动动作 / AUTOMATIC ACTION**

中：从一个想法展开到多个候选与有限实验

EN: Expand one idea into many candidates and a limited set of experiments

**说 / SAY**

中：研究常常不缺想法，缺的是把想法写成可运行的东西，再逐个做实验的时间。候选越来越多，能试的仍然有限。所以大家希望让 AI 帮忙：多提出一些方案，把实现和实验的一部分工作接过去。

EN: Research often has more ideas than time to turn them into working implementations and run experiments. Candidates multiply, while the number that can be tested remains limited. This motivates using AI to propose alternatives and help with parts of implementation and experimentation.

**下一次继续 / NEXT CONTINUE**

中：展开 AI 提案、实现、测试与保留方法的循环。动作完成后自动停下。

EN: Show the loop from AI proposals through implementation, tests and retained methods. The action stops automatically at the next speaking point.

### 33 / 42 · 提出、执行、检查，再保留 / Propose, run, check, then retain

**画面 / VISUAL**

中：候选经过实现和测试，只有经检查的改进进入保留方法的位置。

EN: Candidates pass through implementation and testing. Only checked improvements reach the retained-method stage.

**自动动作 / AUTOMATIC ACTION**

中：展开 AI 提案、实现、测试与保留方法的循环

EN: Show the loop from AI proposals through implementation, tests and retained methods

**说 / SAY**

中：提出候选只是开始。它要能运行，要接受独立检查，通过后才能留下给下一次任务用。下面把循环缩成一个小问题：数字从小到大排好，一个也不能丢。先检查正确性，再比操作量。这次候选程序事先写好了，会在本地真的运行；不是现场让 AI 发明算法。

EN: A proposal is only the start. It must run and face independent checks before an improvement can be retained for another task. We will shrink this loop to a small problem: sort numbers in ascending order without losing any values. Check correctness first, then compare work. These candidates are prewritten programs that really run locally, not algorithms invented live by AI.

**转 / TRANSITION**

中：先用原方法建立基线，再让候选来挑战它。

EN: Establish a baseline with the original method, then test alternatives.

**下一次继续 / NEXT CONTINUE**

中：进入 R4；运行 A，并自动检查完整测试组。动作完成后自动停下。

EN: Open R4; Run A and check the full fixed test suite automatically. The action stops automatically at the next speaking point.

---

## R4 · Which program should we keep?

[直达本页第一个停顿点](/session-2#rsi/R4)

### 34 / 42 · 原方法先建立基线 / Establish the baseline

**画面 / VISUAL**

中：A 已运行完成并通过 6 / 6 检查；方块顺序与操作计数保持可见。

EN: A has finished and passed 6 / 6 checks. The output order and operation count remain visible.

**自动动作 / AUTOMATIC ACTION**

中：运行 A，并自动检查完整测试组

EN: Run A and check the full fixed test suite automatically

**说 / SAY**

中：A 反复比较相邻数字，需要时交换。看见方块移动了吗？计数来自刚才实际发生的比较和写入。右边还会测试其他输入，确认不是只把这一个例子做对。

EN: A repeatedly compares neighbors and swaps when needed. The block movements and counts come from the actual comparisons and array writes. The evaluator also checks other inputs, not just the example on screen.

**下一次继续 / NEXT CONTINUE**

中：运行 B，自动检查并拒绝错误候选。动作完成后自动停下。

EN: Run B, check it and reject the faulty candidate. The action stops automatically at the next speaking point.

### 35 / 42 · 更少操作，却没有做对 / Less work, but the wrong result

**画面 / VISUAL**

中：B 的错误已标红，固定测试没有全部通过，保留者仍是 A。

EN: B’s errors are marked red. It failed part of the fixed suite, and A is still retained.

**自动动作 / AUTOMATIC ACTION**

中：运行 B，自动检查并拒绝错误候选

EN: Run B, check it and reject the faulty candidate

**说 / SAY**

中：B 只走一遍，操作少了，但顺序还不对。自动检查把错误标红，保留者仍然是 A。少做了工作，却没完成任务，就不能算改进。

EN: B makes one pass and uses less work, but the output is still out of order. The check marks the errors red, and A stays retained. Less work without completing the task is not an improvement.

**下一次继续 / NEXT CONTINUE**

中：运行 C，通过检查后保留改进。动作完成后自动停下。

EN: Run C, check it and retain the improvement. The action stops automatically at the next speaking point.

### 36 / 42 · 正确后再比较计算量 / Compare work after correctness

**画面 / VISUAL**

中：C 已通过 6 / 6 检查，整组操作量少于 A，保留者更新为 C。

EN: C passed 6 / 6 checks, used less work than A on the suite, and is now the retained method.

**自动动作 / AUTOMATIC ACTION**

中：运行 C，通过检查后保留改进

EN: Run C, check it and retain the improvement

**说 / SAY**

中：C 把每个新数字插入已经有序的左侧。它通过六项检查，并在同一组测试上做了更少的工作，这次才替换 A。留下的是可复用的程序；六项测试只支持这组结果，既不证明所有输入都正确，也不证明完整 RSI。

EN: C inserts each new item into the sorted left side. It passes all six checks and uses less work on the same suite, so it replaces A. What persists is a reusable program. Six tests support a bounded result, not correctness for every input or proof of full RSI.

**转 / TRANSITION**

中：真实研究里，也有用模型提出候选、再用程序筛选的例子。

EN: Real research also uses models to propose candidates and programs to evaluate them.

**下一次继续 / NEXT CONTINUE**

中：进入 R5；播放 Gemini 提出代码、测试淘汰与保留的研究流程。动作完成后自动停下。

EN: Open R5; Show Gemini proposing code, tests rejecting candidates and retention. The action stops automatically at the next speaking point.

---

## R5 · Propose code. Test it. Keep the gain.

[直达本页第一个停顿点](/session-2#rsi/R5)

### 37 / 42 · AlphaEvolve 也先提出，再检查 / AlphaEvolve also proposes, then checks

**画面 / VISUAL**

中：Gemini 提出代码候选，自动测试淘汰失败方案，通过评估的改进被保留。

EN: Gemini proposes code candidates. Automated tests reject failures, and evaluated improvements are retained.

**自动动作 / AUTOMATIC ACTION**

中：播放 Gemini 提出代码、测试淘汰与保留的研究流程

EN: Show Gemini proposing code, tests rejecting candidates and retention

**说 / SAY**

中：真实研究里的 AlphaEvolve 用 Gemini 提出代码候选，再由自动评估筛选。刚才排序台上的规则还在：候选得真正执行，经得住检查，才值得留下。模型负责寻找方案，评估负责告诉我们有没有改善。

EN: In real research, AlphaEvolve uses Gemini to propose code candidates and automated evaluation to select them. The rule from our sorting bench still applies: a candidate must run and survive checks before it is worth retaining. The model searches for alternatives; evaluation tells us whether they improve the task.

**下一次继续 / NEXT CONTINUE**

中：揭示矩阵乘法 kernel 的 23% 与整体训练时间的约 1%。动作完成后自动停下。

EN: Reveal the 23% matrix-kernel speedup and roughly 1% total training-time reduction. The action stops automatically at the next speaking point.

### 38 / 42 · 组件快了多少，整体省了多少 / A component speedup and its overall effect

**画面 / VISUAL**

中：两个数字分别对应矩阵乘法 kernel 加速 23%，以及 Gemini 整体训练时间减少约 1%。

EN: The two figures refer to a 23% matrix-multiplication kernel speedup and about a 1% reduction in total Gemini training time.

**自动动作 / AUTOMATIC ACTION**

中：揭示矩阵乘法 kernel 的 23% 与整体训练时间的约 1%

EN: Reveal the 23% matrix-kernel speedup and roughly 1% total training-time reduction

**说 / SAY**

中：DeepMind 报告过一个矩阵乘法 kernel 加速 23%。Kernel 可以先理解为训练里反复调用的一小段计算程序。它变快后，Gemini 的整体训练时间减少约 1%。一个数字讲组件，一个数字讲整体。算法改进的证据很具体，但它没有在测模型智力提高多少。

EN: DeepMind reported a 23 percent speedup in a matrix-multiplication kernel. Think of a kernel as a small computation routine used repeatedly during training. That speedup reduced total Gemini training time by about 1 percent. One figure describes the component; the other describes the whole process. This is specific evidence of an algorithmic improvement, not a measurement of increased intelligence.

**转 / TRANSITION**

中：从更好的组件，到更好的改进者，中间还缺什么？

EN: What is missing between a better component and a better improver?

**下一次继续 / NEXT CONTINUE**

中：进入 R6；找出缺少失败案例的问题，补进排查练习。动作完成后自动停下。

EN: Open R6; Find missing failure examples and propose diagnostic exercises. The action stops automatically at the next speaking point.

---

## R6 · Train a successor. Test the improver.

[直达本页第一个停顿点](/session-2#rsi/R6)

### 39 / 42 · A 提出修改训练配方 / A proposes a training-recipe change

**画面 / VISUAL**

中：A 发现训练材料几乎只有成功案例；新配方补进失败实验与原因。

EN: A finds mostly successful training examples. The proposed recipe adds failed experiments and their diagnoses.

**自动动作 / AUTOMATIC ACTION**

中：找出缺少失败案例的问题，补进排查练习

EN: Find missing failure examples and propose diagnostic exercises

**说 / SAY**

中：先看一条假设路径。AI A 发现训练材料几乎只有成功实验，于是提出：补进不同失败原因，以及怎样排查的练习。这里改的是下一代的训练数据配方。补了材料不代表一定更强，还要经过训练和检验。

EN: Consider a hypothetical route. AI A notices that the training material mostly shows successful experiments. It proposes examples of different failures and how to investigate them. That changes a successor’s training-data recipe. Adding examples does not guarantee a stronger model; the proposal still needs training and testing.

**下一次继续 / NEXT CONTINUE**

中：展示做练习、比较 loss、更新 weights 的过程。动作完成后自动停下。

EN: Show practice, loss comparison and weight updates. The action stops automatically at the next speaking point.

### 40 / 42 · 按新配方训练 B / Train B using the new recipe

**画面 / VISUAL**

中：新材料进入 B 的训练；练习与目标比较得到 loss，参数格子随更新变化。

EN: The new examples enter B’s training. Comparing attempts with targets produces loss, and the weight grid changes.

**自动动作 / AUTOMATIC ACTION**

中：展示做练习、比较 loss、更新 weights 的过程

EN: Show practice, loss comparison and weight updates

**说 / SAY**

中：接着按新配方训练 B：做练习，对照目标计算 loss，也就是误差，再调整 weights，如此反复。这里变化的是保存下来的参数；让模型重答一遍，通常只改变这次输出。训练完成，也还不能宣布 B 更强。

EN: Next, train B using the new recipe: attempt examples, compare with targets to calculate loss, an error score, then adjust weights and repeat. Saved parameters change. Asking for another reply usually changes only the current output. Completing training does not yet establish that B is stronger.

**下一次继续 / NEXT CONTINUE**

中：独立比较 A 与 B 的研究能力，再显示通往 C 的条件箭头。动作完成后自动停下。

EN: Compare A and B on separate research tasks, then show the conditional path to C. The action stops automatically at the next speaking point.

### 41 / 42 · 检查能力，再尝试下一轮 / Evaluate the ability before another cycle

**画面 / VISUAL**

中：独立新任务比较 A 与 B；只有研究能力确有改善，才进入 B 帮助改进 C 的尝试。

EN: Separate research tasks compare A and B. Evidence of improved research ability is required before B attempts to help improve C.

**自动动作 / AUTOMATIC ACTION**

中：独立比较 A 与 B 的研究能力，再显示通往 C 的条件箭头

EN: Compare A and B on separate research tasks, then show the conditional path to C

**说 / SAY**

中：拿没用于训练的研究任务，比较 A 和 B：谁能找准失败原因，提出值得做的实验？只有研究能力确实改善，才有理由让 B 尝试下一轮修改。它能否再造出更好的后继，仍需逐轮验证。人继续设定目标、评估、权限与停止条件。

EN: Compare A and B on research tasks not used for training: which can diagnose a failure and propose a useful experiment? Evidence of improved research ability would justify asking B to attempt another change. Whether it can help build a better successor still needs checking each cycle. People continue to set objectives, evaluation, permissions and stopping conditions.

**转 / TRANSITION**

中：最后，把三个词放回同一张地图。

EN: Finally, put the three terms back on one map.

**下一次继续 / NEXT CONTINUE**

中：进入 E1；回到三个术语与它们的成功依据。动作完成后自动停下。

EN: Open E1; Return to the three terms and their evidence of success. The action stops automatically at the next speaking point.

---

## E1 · Three ways to move forward.

[直达本页第一个停顿点](/session-2#closing/E1)

### 42 / 42 · 用三个问题收尾 / Close with three questions

**画面 / VISUAL**

中：三个开场图形再次出现，现在对应三种不同的成功依据。

EN: The three opening pictures return, now paired with three different kinds of evidence of success.

**自动动作 / AUTOMATIC ACTION**

中：回到三个术语与它们的成功依据

EN: Return to the three terms and their evidence of success

**说 / SAY**

中：Computer Use 让 AI 通过界面行动，证据是应用有没有完成目标。Jev 面向定义清楚的判断任务，证据是它在实际工作中判断得是否可靠。RSI 讨论改进能力能否进入下一代并继续循环，这需要更强的证明。以后遇到新的 AI 术语，可以先问：它改变了什么？我们怎么知道？还有什么没有被证明？

EN: Computer Use lets AI act through an interface; the evidence is whether the application reached the goal. Jev targets defined decision tasks; the evidence is how reliably it works in the actual workflow. RSI asks whether improvement ability can carry into a successor and repeat, which needs stronger evidence. When you encounter a new AI term, ask: what changed, how do we know, and what remains unproven?

**转 / TRANSITION**

中：这就是今天的三个新词。

EN: Those are our three terms for today.

**下一次继续 / NEXT CONTINUE**

中：讲解结束，停留在总结页，留出提问时间；结束后用主按钮返回目录。

EN: The talk is complete. Hold the closing page for questions; use the main button to return to the collection when finished.
