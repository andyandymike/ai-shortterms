# Beyond Bigger Models — Atlas 中英双语现场稿 / Bilingual Speaker Notes

> 中文：现场只用 Atlas。每一步按“看 → 说 → 做 → 转 → 点”走；先说转场句，再点击进入下一步。内部按钮推进演示，右下角全局箭头才翻页。
>
> English: Use Atlas only. Follow LOOK → SAY → DO → TRANSITION → CLICK. Say the transition before clicking to the next step. The internal button moves the demo forward; the bottom-right arrow changes the slide.

“说”和“转”是主线口播；“补充（可选）”可在时间允许时接在“说”后面，不读也不影响主线。“看、做、点、注意”和来源是提示，不用念。中英文按信息和顺序对应；英文保留 context、parameters 等术语，解释尽量用短句和常用词。

Read SAY and TRANSITION as the main talk. Add EXTRA (OPTIONAL) after SAY if time allows; skipping it does not break the story. LOOK, DO, CLICK, NOTE, and sources are presenter cues, not spoken lines. The Chinese and English versions follow the same points in the same order. Keep terms such as context and parameters; explain them in short, everyday sentences.

## O · Opening

### 中文

**看｜** **Four terms. Two shifts.**

**说｜** AI 世界日新月异，但有时候，它的词汇更新得比技术本身还快——AI 的“命名部门”似乎从来不休息。今天不逐个追热点，而是用四个概念看清两次变化：怎样更聪明地使用模型能力，以及怎样让 AI 从回答问题走向预测和行动。

**做｜** 等缩写动画归位，再从上到下扫过两条变化轨道。

**点｜** 无需操作内部按钮；准备好后用右下角全局下一页进入 MoE。

### English

**LOOK |** **Four terms. Two shifts.**

**SAY |** AI changes fast, but sometimes its list of new terms changes even faster than the technology itself. It’s almost as if AI’s “naming team” never takes a day off. Today, we won’t chase every hot topic. We’ll use four terms to see two shifts: how to use model capabilities more wisely, and how AI moves from answering questions to prediction and action.

**DO |** Wait for the animation of short names to settle, then move down the two tracks.

**CLICK |** No internal button needed. When ready, use the bottom-right next-slide arrow → **MoE**.

---

## MoE

#### 中文导入

**导入｜** 我们先从一个反直觉的想法开始：模型可以非常大，却不必每次都动用全部能力。

#### English lead-in

**LEAD-IN |** Let’s start with an idea that may sound surprising: a model can be very large without using all its capabilities every time.

### M1 · Name

#### 中文

**看｜** **MoE → Mixture of Experts**

**说｜** 第一个词是 **MoE**，全称 **Mixture of Experts，专家混合**。这里的 **Expert（专家）**不是一个完整的 chatbot，而是模型内部的一块计算能力。

**做｜** 指向 **MoE**，跟着三个字母展开。

**注意｜** Expert 不是各自回答完整问题的独立人格。

**转｜** 为什么需要这么多专家？先看稠密模型怎么工作。

**点｜** **Show the dense model**

#### English

**LOOK |** **MoE → Mixture of Experts**

**SAY |** Our first term is **MoE**, short for **Mixture of Experts**. Here, an **expert** is not a whole chatbot. It’s a block inside the model that does some of the computation.

**DO |** Point to **MoE**, then follow the three letters as the full name appears.

**NOTE |** Experts are not separate personalities, each answering the whole question.

**TRANSITION |** Why do we need so many experts? Let’s first look at a dense model.

**CLICK |** **Show the dense model**

### M2 · Dense

#### 中文

**看｜** 黄色任务单进入大楼，所有窗口一起亮起。

**说｜** 语言模型不断预测下一个 **token**，也就是一小段文本。上面整句话是**上下文（context）**，黄色的 **because** 是当前处理的 token。这里把它画成一张任务单，把模型画成一家公司。**稠密模型**处理每张任务单时，同一整块计算都要参与，所以所有窗口一起亮起。就像任务再小，也让全公司一起上班。

**做｜** 从高亮 token 指到任务单，再扫过全部亮起的窗口。

**转｜** 如果让这家公司继续变大，成本会怎样？

**点｜** **Add more capacity**

#### English

**LOOK |** The yellow work ticket enters the building, and all the windows light up.

**SAY |** A language model keeps predicting the next **token**, a small piece of text. The full sentence at the top is the **context**. The yellow word **because** is the current token being processed. Here, we show it as a work ticket and the model as a company. In a **dense model**, the same full compute block works on every ticket, so all the windows light up. It’s like calling in the whole company, even for a tiny task.

**DO |** Point from the highlighted token to the work ticket, then across all the lit windows.

**TRANSITION |** What happens to the cost as this company gets bigger?

**CLICK |** **Add more capacity**

### M3 · Cost

#### 中文

**看｜** 任务单大小不变，右侧增加办公室；**CAPACITY ↑ / WORK / TOKEN ↑**。

**说｜** 为了增加模型容量，我们给这家公司增加办公室。看右边，两支上箭头分别表示总容量和每个 token 的计算量。任务单没有变大，但在稠密模型里，新增的计算也要参与每次处理，所以两者一起上升。公司更大了，每次做同一张小任务单也更费计算。

**做｜** 先指不变的任务单，再指右侧新增办公室，最后对比两支上箭头。

**转｜** 能不能保留大公司的能力，却不用每次全员上班？

**点｜** **Switch to MoE**

#### English

**LOOK |** The ticket stays the same size, while more offices appear on the right: **CAPACITY ↑ / WORK / TOKEN ↑**.

**SAY |** To give the model more capacity, we add offices to the company. Look at the two arrows on the right: one shows total capacity, and the other shows computation per token. The ticket hasn’t grown. But in a dense model, the added computation takes part every time, so both go up. The company gets bigger, and each small ticket takes more computation.

**DO |** Point to the unchanged ticket, then the new offices on the right, and finally the two upward arrows.

**TRANSITION |** Can we keep the big company’s skills without calling everyone in each time?

**CLICK |** **Switch to MoE**

### M4 · Route

#### 中文

**看｜** **256** 个办公室中，只有 **8** 个变红。

**说｜** MoE 不把公司缩小，而是加了一个调度员，也就是**路由器（Router）**。在这个例子里，它根据当前 token 的信息，从 256 个可用 Expert 里挑出 8 个。公司仍然很大，但这张任务只发给选中的少数计算小组。

**做｜** 先圈出完整大楼，再对比 8 个红色窗口和其余灰色窗口。

**转｜** 选出了这 8 个专家，接下来看看它们实际做什么。

**点｜** **Open the selected experts**

#### English

**LOOK |** Only **8** of the **256** offices turn red.

**SAY |** MoE doesn’t shrink the company. It adds a **router**, like a person who assigns the work. In this example, the router uses information about the current token to choose 8 of the 256 available experts. The company stays large, but this ticket goes only to those few selected teams.

**DO |** Point to the whole building, then compare the eight red windows with the grey ones.

**TRANSITION |** We’ve picked eight experts. Let’s see what they actually do.

**CLICK |** **Open the selected experts**

### M5 · Run

#### 中文

**看｜** **TASK IN → WORK → NOTE OUT**

**说｜** “激活八个专家”其实就是这八个小组拿到任务并开始计算，其他专家这次不工作。它们不是分别回答完整问题，而是在模型处理这一小步时，各自加工同一张任务单。画面放大一个办公室，让我们看到任务进去、计算发生、结果出来。

**做｜** 跟随任务单进入办公室，再跟着输出短笺出来。

**转｜** 每个专家都有了输出，怎么把它们合成一个结果？

**点｜** 等一次完整循环结束后，点 **Combine their outputs**

#### English

**LOOK |** **TASK IN → WORK → NOTE OUT**

**SAY |** “Activating eight experts” means those eight teams get the task and start computing. The other experts don’t work this time. They aren’t each answering the whole question. They each process the same ticket during this small step inside the model. Here, we zoom into one office: the task goes in, computation happens, and a result comes out.

**DO |** Follow the ticket into the office, then follow the output note as it comes out.

**TRANSITION |** Each expert now has an output. How do we combine them into one result?

**CLICK |** After one full cycle, click **Combine their outputs**

### M6 · Combine

#### 中文

**看｜** **8 → 1；8 CALLED IN / 248 QUIET**

**说｜** 最后，8 个 Expert 的输出合成一个结果，再交给下一层。在这一层，模型保留 256 个可用 Expert 的总容量，但这个 token 只运行其中 8 个 Expert。核心好处就是：容量可以很大，每次实际用到的专家计算仍然有限。

**做｜** 跟着八份输出汇入 **8 → 1**，再指回 8 个工作和 248 个安静的 Expert。

**转｜** 这个思路已经用在真实模型里，我们看几个例子。

**点｜** **Show real models**

#### English

**LOOK |** **8 → 1; 8 CALLED IN / 248 QUIET**

**SAY |** Finally, the eight expert outputs combine into one result, which goes to the next layer. This layer keeps the total capacity of 256 available experts, but this token runs only eight of them. That’s the main benefit: large capacity, with a limited amount of expert computation each time.

**DO |** Follow the eight outputs into **8 → 1**, then point to the eight working experts and the 248 quiet ones.

**TRANSITION |** Real models already use this idea. Let’s look at a few.

**CLICK |** **Show real models**

### M7 · Examples

#### 中文

**看｜** **DeepSeek-V3：671B total → 37B active / token**

**说｜** 这些是真实采用 MoE 架构的模型。以 DeepSeek-V3 为例，它共有 6710 亿参数，但每个 token 大约激活 370 亿；Qwen3 MoE 和 Kimi K2 也采用类似思路。数字不用记，只看共同模式：总容量很大，每次只运行一部分。

**做｜** 读第一行，再向下扫过三组一致的 **total → active**。

**转｜** MoE 保留一家大公司，每次只叫一支小团队；如果连大公司本身都部署不起，就要让一个真正的小模型学会重要能力。

**点｜** **右下角全局下一页** → Distillation。需要重播本概念时才点 **Replay MoE**。

#### English

**LOOK |** **DeepSeek-V3: 671B total → 37B active / token**

**SAY |** These are real models that use the MoE architecture. DeepSeek-V3 has 671 billion **parameters**, but about 37 billion are active for each token. Qwen3 MoE and Kimi K2 use a similar idea. You don’t need to remember the numbers. Just notice the pattern: a large total capacity, with only part of it running each time.

**DO |** Read the first row, then move down the three matching **total → active** patterns.

**TRANSITION |** MoE keeps the big company but calls in only a small team each time. If the big company itself is still too costly to deploy, we need a truly small model to learn the key skills.

**CLICK |** Use the **bottom-right next-slide arrow** → **Distillation**. Click **Replay MoE** only to replay this concept.

---

## Distillation

#### 中文导入

**导入｜** 这就是知识蒸馏：把昂贵能力用在训练阶段，再让更小的模型独立工作。

#### English lead-in

**LEAD-IN |** That’s knowledge distillation: use the costly capabilities during training, then let a smaller model work on its own.

### D1 · Name

#### 中文

**看｜** **LARGE TEACHER → LESSONS → SMALL STUDENT**

**说｜** 第二个词是 **Knowledge Distillation，知识蒸馏**。能力强的大模型做**教师模型**、准备教材，再训练另一个更小的**学生模型**。就像资深客服先教新人，真正上线值班的是新人。

**做｜** 沿 **教师 → 教材 → 学生** 指过去，停在 **runs alone**。

**注意｜** 蒸馏不是把同一个大模型压成一个小文件。

**转｜** 为什么要多做这一步训练，而不直接用教师？

**点｜** **Why distill?**

#### English

**LOOK |** **LARGE TEACHER → LESSONS → SMALL STUDENT**

**SAY |** Our second term is **Knowledge Distillation**. A strong, large model acts as the **teacher model**. It prepares lessons to train a separate, smaller **student model**. Think of a senior support worker teaching a new colleague. The new colleague is the one who later handles the calls.

**DO |** Follow **TEACHER → LESSONS → STUDENT**, then stop at **runs alone**.

**NOTE |** Distillation does not just squeeze the same large model into a smaller file.

**TRANSITION |** Why add this training step instead of just using the teacher?

**CLICK |** **Why distill?**

### D2 · Why

#### 中文

**看｜** **HIGH CAPABILITY / HIGH COST** 挡在部署目标之前。

**说｜** 为什么不让教师到处直接回答？因为产品除了答案质量，还要考虑成本、设备、隐私和请求量。蒸馏把昂贵的教师留在训练阶段，再把更容易部署的学生送到手机、离线设备、本地环境或大规模服务中。

**做｜** 从能力和成本移到中间的部署限制，再扫过四个目标。

**转｜** 我们先看学生还没学会时，会怎么读一张工单。

**点｜** **Try the student**

#### English

**LOOK |** **HIGH CAPABILITY / HIGH COST** stand in front of the deployment targets.

**SAY |** Why not let the teacher answer everywhere? A product needs more than good answers. It also has to consider cost, devices, privacy, and request volume. Distillation keeps the costly teacher in the training stage. We then deploy the easier-to-run student on phones, offline devices, local systems, or services with many requests.

**DO |** Move from capability and cost to the deployment limits in the middle, then across the four targets.

**TRANSITION |** Let’s see how the student reads a support ticket before it learns this skill.

**CLICK |** **Try the student**

### D3 · Miss

#### 中文

**看｜** **Fantastic / Love → PRAISE → WRONG**

**说｜** 先看这张演示工单。客户说：“太棒了，给客户演示时 VPN 又断了，真喜欢这次更新。”事情是网络再次断开，表扬的话其实是在说反话。学生却只看到 **Fantastic** 和 **Love**，判断为表扬，还回复“很高兴听到这个消息”。它认识单词，却漏掉了**上下文**和真正的**意图**。

**做｜** 先指完整工单和 VPN 再次断开的事实，再指正面词，最后停在学生的错误回复和 **WRONG**。

**注意｜** 这张工单是演示案例，不是公开的真实训练样本。

**转｜** 这时就需要教师把它漏掉的意思讲清楚。

**点｜** **Ask the teacher**

#### English

**LOOK |** **Fantastic / Love → PRAISE → WRONG**

**SAY |** First, look at this demo ticket. The customer says, “Fantastic. The VPN disconnected again during the client demo. Love this update.” The connection failed again, so the positive words are actually sarcasm. But the student only notices **Fantastic** and **Love**, labels it as praise, and replies, “Glad to hear it!” It knows the words but misses the **context** and the real **intent**.

**DO |** Point to the full ticket and the repeated VPN failure, then the positive words, and finally the student’s wrong reply and **WRONG**.

**NOTE |** This ticket is a demo example, not a real training sample from a public dataset.

**TRANSITION |** Now we need the teacher to explain what the student missed.

**CLICK |** **Ask the teacher**

### D4 · Lesson

#### 中文

**看｜** **INTENT → WHY → ACTION**

**说｜** 教师把这张工单整理成三部分教材。第一是**意图**：客户在投诉，不是在表扬。第二是原因：说的是好话，发生的却是重复故障，这个矛盾说明它是反话。第三是行动：先道歉，把 VPN 故障转给负责团队，再索取会话编号来查问题。学生要学的是怎样判断、怎样回应，不只是“投诉”这个标签。

**做｜** 从矛盾线索指到 **SARCASM**，再向下走过三段教材。

**转｜** 教材有了，但一份教材还不够，接下来要反复训练。

**点｜** **Train on many**

#### English

**LOOK |** **INTENT → WHY → ACTION**

**SAY |** The teacher turns this ticket into a lesson with three parts. First, the **intent**: the customer is complaining, not giving praise. Second, the reason: positive words describe a repeated failure. That contradiction points to sarcasm. Third, the action: apologize, send the VPN issue to the right team, and ask for the session ID to help check the problem. The student needs to learn how to judge the message and respond, not just the label “complaint.”

**DO |** Point from the conflicting clues to **SARCASM**, then move down the three parts of the lesson.

**TRANSITION |** We have a lesson, but one isn’t enough. Now we need to train on many.

**CLICK |** **Train on many**

### D5 · Train

#### 中文

**看｜** **BEFORE：positive word → praise；AFTER：context → contradiction → intent**

**说｜** 每次训练都比较学生的猜测和教师教材，不一致就让学生内部的**参数**做一点小调整。用很多不同例子重复后，再看右边的变化：以前是“正面词等于表扬”；现在是先看**上下文**，发现“表扬的话”和“失败的事情”之间的**矛盾**，再判断真正的**意图**。画面的三步就是 context、contradiction、intent。

**做｜** 扫过多份教材，再对比 **BEFORE** 与 **AFTER MANY LESSONS**。

**转｜** 学到了什么，得把教师拿走之后才看得出来。

**点｜** **Remove the teacher**

#### English

**LOOK |** **BEFORE: positive word → praise; AFTER: context → contradiction → intent**

**SAY |** In each training step, we compare the student’s guess with the teacher’s lesson. If they differ, we make a small change to the student’s **parameters**. After many different examples, look at the change on the right. Before, positive words meant praise. Now, it checks the **context**, finds the **contradiction** between positive words and a failure, and works out the real **intent**. Those are the three steps on screen: context, contradiction, intent.

**DO |** Move across the lessons, then compare **BEFORE** with **AFTER MANY LESSONS**.

**TRANSITION |** To see what the student has learned, let’s take the teacher away.

**CLICK |** **Remove the teacher**

### D6 · Alone

#### 中文

**看｜** **TEACHER OFFLINE / SMALL STUDENT RUNS ALONE**

**说｜** 现在教师离线了，学生收到一张新工单：“真棒，重置链接发到我这里的时候，已经过期了。”这次不再是 VPN 问题，学生仍能识别投诉，回复说会补发链接并检查延迟原因。它不是背下上一张工单，而是把学到的处理方式留在自己的**参数**里，部署后独立工作。

**做｜** 从离线教师移到新消息，最后停在独立运行的学生和正确判断。

**注意｜** 如果每个线上请求仍要调用教师，那只是两个模型串联，不是这里展示的部署方式。

**转｜** 这个“训练时教、部署后独立”的做法，也用在了真实模型里。

**点｜** **Show real models**

#### English

**LOOK |** **TEACHER OFFLINE / SMALL STUDENT RUNS ALONE**

**SAY |** Now the teacher is offline, and the student gets a new ticket: “Wonderful—my reset link arrived after it had already expired.” This time, the problem isn’t the VPN. The student still recognizes the complaint and replies that it will send a new link and check the delay. It hasn’t just memorized the previous ticket. The learned behavior stays in its own **parameters**, so it can work alone after deployment.

**DO |** Move from the offline teacher to the new message, then end at the student running alone and its correct answer.

**NOTE |** If every live request still calls the teacher, the two models are working in a chain. That is not the deployment setup shown here.

**TRANSITION |** Real models use this approach too: learn from the teacher during training, then run alone after deployment.

**CLICK |** **Show real models**

### D7 · Examples

#### 中文

**看｜** **Apple Foundation Model → ~3B on-device**

**说｜** 现实中，Apple 在约 30 亿参数的端侧基础模型训练中使用了知识蒸馏；Google 用 27B 教师训练 Gemma 2 的 2B 和 9B 模型；DeepSeek 则用 R1 生成的**推理数据**训练更小的模型。方法并不完全相同，但共同点是：部署前由教师来教，部署后由学生独立服务。

**做｜** 读 Apple 一行，再扫过 **on-device、open + edge、reasoning** 三个目标。

**注意｜** 三组箭头不代表同一种压缩比例。

**转｜** 前两个词都在解决“怎样让我们用得起 AI”；接下来要看的是，AI 动手前能不能先想象结果。

**点｜** **右下角全局下一页** → World Model。需要重播本概念时才点 **Replay Distill**。

#### English

**LOOK |** **Apple Foundation Model → ~3B on-device**

**SAY |** In practice, Apple used knowledge distillation to train its on-device foundation model with about three billion parameters. Google used a 27B teacher to train the 2B and 9B Gemma 2 models. DeepSeek used **reasoning data** generated by R1 to train smaller models. The methods aren’t exactly the same, but they share one idea: the teacher teaches before deployment, and the student serves users on its own afterward.

**DO |** Read the Apple row, then move across the three goals: **on-device, open + edge, reasoning**.

**NOTE |** The three arrows do not show the same kind of compression ratio.

**TRANSITION |** The first two terms ask how we can make AI more affordable. Next, can AI imagine the result before it acts?

**CLICK |** Use the **bottom-right next-slide arrow** → **World Model**. Click **Replay Distill** only to replay this concept.

---

## World Model

#### 中文导入

**导入｜** 如果 AI 要进入真实世界，它不能只认出眼前有什么，还要预测采取动作后会怎样。

#### English lead-in

**LEAD-IN |** If AI is going to work in the real world, it can’t just recognize what’s in front of it. It also needs to predict what happens after an action.

### W1 · Name

#### 中文

**看｜** **NEXT WORD → WHAT IS HERE → WHAT HAPPENS NEXT**

**说｜** 第三个词是 **World Model，世界模型**。先认一下图：红色菱形是机器人，蓝色区域是目标，红白条纹是路缘。左边的 **LLM（大语言模型）**预测下一段文字；中间的视觉模型认出眼前有什么；右边的世界模型预测采取动作后会怎样变化。可以把它理解成 AI 脑中的简化模拟器。

**做｜** 从左到右走过三栏，再跟随 **NOW + ACTION → NEXT**。

**转｜** 为什么只看清眼前还不够？我们让机器人准备走一步。

**点｜** **Why predict?**

#### English

**LOOK |** **NEXT WORD → WHAT IS HERE → WHAT HAPPENS NEXT**

**SAY |** Our third term is **World Model**. First, a quick guide to the picture: the red diamond is the robot, the blue area is the goal, and the red-and-white strip is the curb. On the left, an **LLM, or large language model**, predicts the next piece of text. In the middle, a vision model identifies what is there. On the right, a world model predicts how the scene changes after an action. Think of it as a simple simulator inside the AI.

**DO |** Move across the three columns from left to right, then follow **NOW + ACTION → NEXT**.

**TRANSITION |** Why isn’t seeing the scene enough? Let’s get the robot ready to move.

**CLICK |** **Why predict?**

### W2 · Why

#### 中文

**看｜** **ROBOT · ROAD · CURB → ? AFTER A MOVE**

**说｜** 左边已经认出了机器人、道路和路缘。但看右边：左转、直走、右转之后会怎样，仍然都是问号。只知道眼前有什么，还不能直接知道动作会带来什么后果。这页提出的问题是：行动之前，能不能先预测结果？

**做｜** 先指左边识别出的物体，再越过问号指向三个动作。

**注意｜** 这里不是说**多模态模型**完全不会推理。

**转｜** 要预测这些后果，模型得先学会变化是怎么发生的。

**点｜** **Watch it learn**

#### English

**LOOK |** **ROBOT · ROAD · CURB → ? AFTER A MOVE**

**SAY |** On the left, we’ve identified the robot, road, and curb. But look at the right: what happens after turning left, going straight, or turning right? Each one is still a question mark. Knowing what is there doesn’t directly tell us what an action will cause. This page asks: can we predict the result before we act?

**DO |** Point to the objects identified on the left, then move past the question mark to the three actions.

**NOTE |** This does not mean **multimodal models** cannot reason.

**TRANSITION |** To predict these results, the model first needs to learn how things change.

**CLICK |** **Watch it learn**

### W3 · Learn

#### 中文

**看｜** **WATCH → GUESS → CHECK → ADJUST**

**说｜** 这里先用一种训练方式来说明。它先看很多真实经历：当时看到了什么、做了什么、后来发生了什么。训练时把结局遮住，让模型先猜，再揭开真实结果比较差异，并做一次小调整。大量重复以后，它会越来越会预测变化。

**补充（可选）｜** 训练方式并不只有这一种，数据也不只来自机器人。有的世界模型先从大量视频里学习物体和场景怎样变化，有的会结合动作和后续观测来训练。比如 **V-JEPA 2** 先从视频学习，再加入机器人交互数据，让模型能够预测特定动作的后果。

**做｜** 沿四个编号指一次，最后停在 **many real sequences**。

**注意｜** 这里展示的是简化流程。V-JEPA 2 的视频预训练与带动作条件的后续训练是两个阶段，不要讲成普通视频天然包含机器人控制指令。

**[Sources]｜** Meta AI, [V-JEPA 2: video pre-training and action-conditioned training](https://ai.meta.com/blog/v-jepa-2-world-model-benchmarks/), 2025-06-11.

**转｜** 学会以后，我们就能从同一个起点试几种动作。

**点｜** **Try three actions**

#### English

**LOOK |** **WATCH → GUESS → CHECK → ADJUST**

**SAY |** Here’s one way to train it. The model first sees many real experiences: what it saw, what action was taken, and what happened next. During training, we hide the ending and let the model predict it. Then we reveal the real result, compare the difference, and make a small update. After many rounds, it gets better at predicting how things change.

**EXTRA (OPTIONAL) |** There’s more than one way to train a world model, and the data doesn’t have to come from robots. Some models first learn how objects and scenes change by watching lots of videos. Others train on actions paired with later observations. For example, **V-JEPA 2** learns from video first, then adds robot interaction data to predict the results of specific actions.

**DO |** Follow the four numbered steps once, then stop at **many real sequences**.

**NOTE |** This is a simplified training flow. V-JEPA 2 uses video pre-training and later action-conditioned training as two stages. Don’t suggest that ordinary video already includes robot control commands.

**[Sources] |** Meta AI, [V-JEPA 2: video pre-training and action-conditioned training](https://ai.meta.com/blog/v-jepa-2-world-model-benchmarks/), 2025-06-11.

**TRANSITION |** Once it learns, we can try different actions from the same starting point.

**CLICK |** **Try three actions**

### W4 · Futures

#### 中文

**看｜** **SAME START → THREE POSSIBLE FUTURES · t+1；NO ROUTE CHOSEN**。

**说｜** 左边是同一个起点，真实机器人还没有动。右边三个 **future** 不是连续的三步，而是同一个下一刻的三种可能：向左，安全但偏离目标；直走，安全并接近蓝色目标区；向右，会碰到路缘。这页只做**预测**：告诉我们每个**动作**可能带来什么结果，还没有选择路线。

**做｜** 先停在 **REALITY HAS NOT MOVED**；再逐一指三个动作、各自的结果，以及相同的 **t+1**；最后停在 **NO ROUTE CHOSEN**。

**注意｜** 这里用单步预测展示动作后果，但预测本身也可以跨多步。W4 的任务是预测后果，W5 的任务是利用预测和目标来选择行动。

**转｜** 知道每个动作可能带来什么，还不等于知道该怎么走。接下来，我们把预测连起来，用目标选路线。

**点｜** **Plan before moving**

#### English

**LOOK |** **SAME START → THREE POSSIBLE FUTURES · t+1; NO ROUTE CHOSEN**.

**SAY |** On the left, we have the same starting point. The real robot hasn’t moved. The three **futures** on the right are not three steps in a row. They are three possible results at the same next moment: turn left and stay safe, but move away from the goal; go straight and stay safe while getting closer to the blue goal; turn right and hit the curb. This is **prediction**: what might happen after each **action**. We haven’t chosen a route yet.

**DO |** Pause at **REALITY HAS NOT MOVED**. Point to each action, its result, and the same **t+1** label. End at **NO ROUTE CHOSEN**.

**NOTE |** This page uses one-step predictions to show action results, but prediction can also cover multiple steps. W4 predicts results; W5 uses predictions and a goal to choose actions.

**TRANSITION |** Knowing what each action might do is not the same as choosing a route. Next, we connect the predictions and use the goal to choose a route.

**CLICK |** **Plan before moving**

### W5 · Plan

#### 中文

**看｜** **t+1 → t+2 → t+3；SELECT B → ONE ACTION → LOOK AGAIN · REPLAN**。

**说｜** 现在把前一步预测的结果接到下一步，继续向前看，看看一串动作会走到哪里。图上的 t+1、t+2、t+3 就是接下来的几步。A 安全但绕远，B 安全而且更直接，C 会碰到路缘，所以排除。根据安全和接近目标这两个标准，**规划器**选择 B。但注意 **ONE ACTION**：现实里只执行亮起的第一段，然后重新观察、预测和**规划**。后面的虚线路线还可以改。规划就是用预测来决定做什么。

**做｜** 先沿 B 的 **t+1 → t+2 → t+3** 指出连续预测，再比较 A、B、C 和 **SELECT**。最后指向第一段、**ONE ACTION** 以及 **LOOK AGAIN · REPLAN**。

**注意｜** 三条路线和三个时间步是简化示意，不是算法只能比较三条路线或固定预测三步。“只执行第一步后重规划”展示的是模型预测控制的一种常见做法，不是所有规划方法都必须如此。

**[Sources]｜** Meta AI, [V-JEPA 2: prediction, goal-based planning, and replanning after each action](https://ai.meta.com/blog/v-jepa-2-world-model-benchmarks/), 2025-06-11.

**转｜** 这里说的“想象”，一定得生成一段视频吗？

**点｜** **What does it build?**

#### English

**LOOK |** **t+1 → t+2 → t+3; SELECT B → ONE ACTION → LOOK AGAIN · REPLAN**.

**SAY |** Now we use each predicted result as the starting point for the next step. We look ahead to see where a series of actions might take us. The labels t+1, t+2, and t+3 mark the next few steps. A is safe but takes a longer route. B is safe and more direct. C hits the curb, so we rule it out. Based on safety and progress toward the goal, the **planner** chooses B. But look at **ONE ACTION**: in reality, we take only the highlighted first step, then look again, predict again, and replan. The dashed route ahead can still change. **Planning** means using predictions to choose what to do.

**DO |** Follow **t+1 → t+2 → t+3** along B to show predictions across steps. Compare A, B, and C and point to **SELECT**. End at the first segment, **ONE ACTION**, and **LOOK AGAIN · REPLAN**.

**NOTE |** Three routes and three time steps are a simple illustration, not fixed limits of the algorithm. Executing only the first action and replanning is a common model-predictive-control approach, not a rule for every planning method.

**[Sources] |** Meta AI, [V-JEPA 2: prediction, goal-based planning, and replanning after each action](https://ai.meta.com/blog/v-jepa-2-world-model-benchmarks/), 2025-06-11.

**TRANSITION |** Does “imagining” the future have to mean making a video?

**CLICK |** **What does it build?**

### W6 · Form

#### 中文

**看｜** **VISIBLE FUTURE / HIDDEN FUTURE · PREDICTIVE STATE**

**说｜** 世界模型不一定都生成视频。有些会产生人能观看的未来画面，另一些只在内部保留位置、距离和目标进度等**预测状态**。只要这些信息足以判断动作是否安全、是否更接近目标，它就完成了同一种工作。

**做｜** 对比可见未来和隐藏状态，再把两边带到底部的共同问题。

**转｜** 这两种形式，在真实研究里都有例子。

**点｜** **Show real systems**

#### English

**LOOK |** **VISIBLE FUTURE / HIDDEN FUTURE · PREDICTIVE STATE**

**SAY |** A world model doesn’t have to generate video. Some create future scenes that people can watch. Others keep an internal **predictive state**, with information such as position, distance, and progress toward the goal. If that information is enough to judge whether an action is safe and gets closer to the goal, it does the same job.

**DO |** Compare the visible future with the hidden state, then bring both sides down to the shared question at the bottom.

**TRANSITION |** We can find both forms in real research.

**CLICK |** **Show real systems**

### W7 · Examples

#### 中文

**看｜** **GENIE 3 / V-JEPA 2**

**说｜** 左边的 **Genie 3** 把预测环境做成可以观看和交互的世界。右边的 **V-JEPA 2** 则在隐藏的**预测状态**里比较机器人动作。这里的 **NO VIDEO NEEDED** 不是说不用视频训练，也不是不用摄像头，而是预测未来时，不必生成一段给人看的视频。形式不同，都可以帮助系统先测试可能的结果，再采取行动；具体用途包括训练智能体、做“如果……会怎样”的测试，以及规划机器人动作。

**补充（可选）｜** 机器人只是一个典型应用，不是唯一方向。还可以想一想物理学：如果 AI 能足够准确地模拟**物理规律**下的变化，物理学家就可以先在虚拟实验室里试很多方案，减少一部分昂贵的真实实验。但这不等于以后不用做实验了，关键结论仍要通过真实观测或实验来验证。

**做｜** 让 Genie 3 视频播放，再从可见世界移到隐藏世界和下方三种用途。

**注意｜** 这些仍是研究系统，不是完整物理世界的复制品。物理学部分是对更广义的学习式物理建模的展望，不是说 Genie 3 或 V-JEPA 2 已经能够替代物理实验。

**[Sources]｜** Physics modeling: Sanchez-Gonzalez et al., [Learning to Simulate Complex Physics with Graph Networks](https://arxiv.org/abs/2002.09405), ICML 2020. Simulation followed by real-world validation: Google DeepMind, [Accelerating fusion science through learned plasma control](https://deepmind.google/blog/accelerating-fusion-science-through-learned-plasma-control/), 2022-02-16.

**转｜** World Model 问“接下来可能怎样”；下一个词 VLA 问“这副身体现在该怎么动”。

**点｜** **右下角全局下一页** → VLA。需要重播本概念时才点 **Replay World Model**。

#### English

**LOOK |** **GENIE 3 / V-JEPA 2**

**SAY |** On the left, **Genie 3** turns a predicted environment into a world people can see and interact with. On the right, **V-JEPA 2** compares robot actions in a hidden **predictive state**. Here, **NO VIDEO NEEDED** doesn’t mean no video training or no cameras. It means the model doesn’t need to generate a future video for us to watch. The forms are different, but both can help a system test possible results before acting. Uses include training agents, running “what if” tests, and planning robot actions.

**EXTRA (OPTIONAL) |** Robots are one typical use, not the only one. Think about physics too. If AI could simulate changes under **physical laws** accurately enough, physicists could test many ideas in a virtual lab first. That could save some costly real experiments. But it wouldn’t mean we no longer need experiments. Key findings would still need checks against real observations or experiments.

**DO |** Let the Genie 3 video play, then move from the visible world to the hidden world and the three uses below.

**NOTE |** These are still research systems, not complete copies of the physical world. The physics example looks ahead to the broader field of learned physical modeling. It does not mean Genie 3 or V-JEPA 2 can already replace physics experiments.

**[Sources] |** Physics modeling: Sanchez-Gonzalez et al., [Learning to Simulate Complex Physics with Graph Networks](https://arxiv.org/abs/2002.09405), ICML 2020. Simulation followed by real-world validation: Google DeepMind, [Accelerating fusion science through learned plasma control](https://deepmind.google/blog/accelerating-fusion-science-through-learned-plasma-control/), 2022-02-16.

**TRANSITION |** World Model asks, “What may happen next?” The next term, VLA, asks, “What should this body do now?”

**CLICK |** Use the **bottom-right next-slide arrow** → **VLA**. Click **Replay World Model** only to replay this concept.

---

## VLA

#### 中文导入

**导入｜** 接下来是另一个问题：机器人怎样把看到的场景和用语言表达的目标，变成身体动作？

#### English lead-in

**LEAD-IN |** Now for another question: how can a robot turn the scene it sees and a goal given in language into physical actions?

### V1 · Name

#### 中文

**看｜** **V + L → VLA → A**

**说｜** VLA 是 **Vision-Language-Action，视觉—语言—动作**。**Vision** 回答“眼前有什么”，**Language** 告诉机器人“我要什么”，**Action** 回答“这副身体现在该怎么动”。它把场景和目标变成真实动作，而不只是描述或回答。

**做｜** 依次指向 **VISION → LANGUAGE → ACTION**，再走一遍底部公式。

**转｜** 不过，目标说清楚了，身体就知道怎么做了吗？

**点｜** **Why is that hard?**

#### English

**LOOK |** **V + L → VLA → A**

**SAY |** VLA means **Vision-Language-Action**. **Vision** answers, “What’s in front of me?” **Language** tells the robot, “This is what I want.” **Action** answers, “What should this body do now?” It turns the scene and the goal into real actions, not just descriptions or answers.

**DO |** Point to **VISION → LANGUAGE → ACTION** in order, then follow the formula at the bottom.

**TRANSITION |** But does a clear goal mean the body knows how to do it?

**CLICK |** **Why is that hard?**

### V2 · Why

#### 中文

**看｜** **1 SENTENCE ≠ WHICH? · HOW? · ENOUGH?**

**说｜** “把橙色方块放进托盘”已经说清了目标，却没有告诉机械臂具体怎么完成。它要找到正确方块、绕开障碍、选择抓取位置和力度，还要知道什么时候松手。语言只说了要什么，身体必须自己解决怎么做。

**做｜** 从一句指令移到三个问题，最后停在 **WHAT / HOW**。

**转｜** 把这句话拆开，就能看到身体真正要完成的动作。

**点｜** **Unpack the task**

#### English

**LOOK |** **1 SENTENCE ≠ WHICH? · HOW? · ENOUGH?**

**SAY |** “Put the orange block in the tray” makes the goal clear. But it doesn’t tell the robot arm exactly how to do it. The arm must find the right block, avoid obstacles, choose where to grip and how much force to use, and know when to let go. Language says what we want. The body still has to work out how.

**DO |** Move from the instruction to the three questions, then stop at **WHAT / HOW**.

**TRANSITION |** Let’s break down that sentence to see the actions the body needs to take.

**CLICK |** **Unpack the task**

### V3 · Steps

#### 中文

**看｜** **FIND → REACH → ALIGN → GRIP → LIFT → PLACE**

**说｜** 一句话交给身体，就会展开成一串连续动作：找到方块、绕过障碍伸手、对准、抓住、抬起，最后放进托盘。人类一句话说完的目标，机器人要靠多个动作配合完成。

**做｜** 沿六个动作依次指过去，停在 **1 GOAL → 6 COORDINATED MOVES**。

**转｜** 这串动作不是凭空出现的，模型要从示范里学习。

**点｜** **How does it learn?**

#### English

**LOOK |** **FIND → REACH → ALIGN → GRIP → LIFT → PLACE**

**SAY |** Give that sentence to a body, and it becomes a series of actions. Find the block, reach around the obstacle, line up, grip, lift, and place it in the tray. We can state the goal in one sentence, but the robot needs several actions to work together to finish it.

**DO |** Follow the six actions in order, then stop at **1 GOAL → 6 COORDINATED MOVES**.

**TRANSITION |** The model doesn’t get these actions out of nowhere. It learns from demonstrations.

**CLICK |** **How does it learn?**

### V4 · Learn

#### 中文

**看｜** **WATCH → HIDE → GUESS → CHECK → ADJUST**

**说｜** 这里展示从示范学习的一种方式。先录下人类操控机器人的过程；训练时让模型看场景和目标，但藏住示范者的下一步动作。看中间两格：模型猜“向右伸手”，示范动作却是“向右上伸手”。这里的 **expert** 是示范者，不是 MoE 的专家模块。训练利用这个差异调整模型的**参数**，再用很多示范重复，让模型越来越会选择下一步。

**补充（可选）｜** VLA 也可以混合多种数据来训练，比如视频、真机示范和模拟数据。视频帮助它学习场景和任务；在实验室里实际操控机器人时，还能用摄像头和**传感器**同步记录画面、关节位置和夹爪状态，同时记录动作指令。再把这些记录和语言目标对齐，才能把“看懂”连接到“怎么动”。

**做｜** 沿五个编号指过去，重点对比 **REACH RIGHT / REACH UP-RIGHT**，再指 **ADJUST** 和大量示范。

**注意｜** 不同 VLA 的数据配方和传感器配置不同；不是传感器越多越好，也不能把普通视频等同于带动作记录的真机数据。这里列的是可选训练来源，不代表所有模型都必须使用全部来源。

**[Sources]｜** NVIDIA, [GR00T N1: human video, real robot data, and simulated data](https://research.nvidia.com/publication/2025-03_nvidia-isaac-gr00t-n1-open-foundation-model-humanoid-robots), 2025-03-17. DROID, [Dataset schema: images, joint and gripper states, language instructions, and actions](https://droid-dataset.github.io/droid/the-droid-dataset.html).

**转｜** 但学过示范，也不代表现场一定会照着剧本走。

**点｜** **Let reality answer**

#### English

**LOOK |** **WATCH → HIDE → GUESS → CHECK → ADJUST**

**SAY |** Here’s one way to learn from demonstrations. First, we record a person controlling the robot. During training, the model sees the scene and the goal, but we hide the person’s next action. Look at the two middle panels: the model guesses “reach right,” but the recorded action is “reach up-right.” Here, **expert** means the person giving the demonstration, not an expert block in MoE. Training uses this difference to adjust the model’s **parameters**. Repeating this with many demonstrations helps it get better at choosing the next action.

**EXTRA (OPTIONAL) |** VLA training can mix several kinds of data, such as videos, real robot demonstrations, and simulated data. Videos help it learn about scenes and tasks. When people control a real robot in a lab, cameras and **sensors** can record images, joint positions, and gripper states together. We also record the action commands. We then match these records with the language goal, so the model can connect understanding the scene with choosing an action.

**DO |** Follow the five numbered steps. Compare **REACH RIGHT / REACH UP-RIGHT**, then point to **ADJUST** and the many demonstrations.

**NOTE |** Different VLA models use different data mixes and sensor setups. More sensors are not automatically better, and ordinary video is not the same as real robot data with action records. These are possible training sources; not every model needs all of them.

**[Sources] |** NVIDIA, [GR00T N1: human video, real robot data, and simulated data](https://research.nvidia.com/publication/2025-03_nvidia-isaac-gr00t-n1-open-foundation-model-humanoid-robots), 2025-03-17. DROID, [Dataset schema: images, joint and gripper states, language instructions, and actions](https://droid-dataset.github.io/droid/the-droid-dataset.html).

**TRANSITION |** But learning from demonstrations doesn’t mean everything will go as planned.

**CLICK |** **Let reality answer**

### V5 · Feedback

#### 中文

**看｜** **BLOCK SLIPPED → SHIFT LEFT · RE-GRIP**

**说｜** 学会动作后，也不能一口气做到底。这里机械臂先抓了一下，但方块滑落；下一帧画面把失败告诉系统，于是它改变下一步，调整位置再抓。VLA 的节奏是：先动一点，再看一眼，再纠正。

**做｜** 从滑落的方块跟到 **REALITY ANSWERS**，再落在重新抓取和循环上。

**注意｜** 这是网页示意，不是官方机器人录像。

**转｜** 为什么必须不断纠正？因为动作错误会留下真实后果。

**点｜** **Why is this harder than chat?**

#### English

**LOOK |** **BLOCK SLIPPED → SHIFT LEFT · RE-GRIP**

**SAY |** Even after learning the actions, the robot can’t just carry on without checking. Here, the arm tries to grip the block, but it slips. The next camera frame shows the failure, so the system changes its next action. It adjusts its position and grips again. The VLA pattern is: act a little, look again, and correct.

**DO |** Follow the slipped block to **REALITY ANSWERS**, then end at the new grip and the loop.

**NOTE |** This is a web illustration, not official robot footage.

**TRANSITION |** Why keep correcting? Because a wrong action has real consequences.

**CLICK |** **Why is this harder than chat?**

### V6 · Hard

#### 中文

**看｜** **BAD WORD：UNDO / BAD MOTION：CONTACT ALREADY HAPPENED**

**说｜** 这就是 VLA 比聊天更难的地方。错字可以删掉重写，但机械臂撞上东西时，接触已经发生。它还要理解**三维空间**，控制时机和力度，并依赖采集缓慢、昂贵且有安全要求的真实机器人数据。

**做｜** 先对比错字和错误动作，再扫过下方三个现实限制。

**转｜** 带着这些限制，我们看一个宇树的真实演示。

**点｜** **See a real system**

#### English

**LOOK |** **BAD WORD: UNDO / BAD MOTION: CONTACT ALREADY HAPPENED**

**SAY |** This is why VLA is harder than chat. We can delete a typo and rewrite it. But when a robot arm hits something, the contact has already happened. It also needs to understand **3D space** and control timing and force. And it relies on real robot data that is slow and costly to collect, with safety requirements too.

**DO |** Compare the typo with the wrong action, then move across the three real-world limits below.

**TRANSITION |** With these limits in mind, let’s watch a real demo from Unitree.

**CLICK |** **See a real system**

### V7 · Example

#### 中文

**看｜** **UNITREE WVLA 2.0 / THREE SHORT EXCERPTS**

**说｜** 这是宇树 **WVLA 2.0** 的官方演示。原片超过三分钟，宇树把它描述为一镜到底、多任务、全自主运行，并且有外部强干扰。这里保留三个短片段：机器人拿取桌面物品；有人推碰它之后，它继续执行；最后它整理另一类物品。重点不是速度，而是同一个系统能够把现场变成一连串身体动作。

**做｜** 让 23 秒视频播放一次，先看桌面动作，再看人为干扰，最后扫过 **VISION → LANGUAGE → ACTION** 和右侧官方描述。

**注意｜** 这是官方成功演示的剪辑节选，不是独立评测，也不能证明它在任何环境都可靠。公开视频没有清楚展示实际使用的语言指令。

**[Sources]｜** Unitree Robotics, [Conference Room Mess Cleanup Test: Unitree WVLA 2.0 Model](https://www.youtube.com/watch?v=zqqIpVsMYkE), 2026-05-25.

**转｜** 到这里，四个概念刚好连成一条路：先更高效地使用能力，再让 AI 从理解走向预测和行动。

**点｜** **右下角全局下一页** → Closing。需要重播本概念时才点 **Replay VLA**。

#### English

**LOOK |** **UNITREE WVLA 2.0 / THREE SHORT EXCERPTS**

**SAY |** This is an official demo of Unitree’s **WVLA 2.0**. The full video is over three minutes long. Unitree describes it as a one-take demo with multiple tasks, fully autonomous operation, and strong outside interference. We’ve kept three short clips: the robot picks up an item on the table, keeps working after a person pushes it, and then handles a different type of item. The point isn’t speed. It’s that one system can turn the scene into a series of physical actions.

**DO |** Let the 23-second clip play once. Watch the tabletop action, then the push, and finish at **VISION → LANGUAGE → ACTION** and the official description on the right.

**NOTE |** These are edited clips of a successful official demo, not an independent test. They do not prove the system is reliable in every environment. The public video does not clearly show the actual language command used.

**[Sources] |** Unitree Robotics, [Conference Room Mess Cleanup Test: Unitree WVLA 2.0 Model](https://www.youtube.com/watch?v=zqqIpVsMYkE), 2026-05-25.

**TRANSITION |** These four ideas now form one clear story: use model capabilities more efficiently, then move AI from understanding to prediction and action.

**CLICK |** Use the **bottom-right next-slide arrow** → **Closing**. Click **Replay VLA** only to replay this concept.

---

<details>
<summary><strong>隐藏备选第三部分 / Hidden backup third part: FDE · RSI</strong></summary>

> 这部分不在当前 30 分钟路线中，但讲稿与演示仍完整保留。
>
> This part is not in the current 30-minute route, but the notes and demos are kept in full.

## FDE

#### 中文导入

**导入｜** 接下来这个词不是一种模型，而是一种负责让 AI 真正在企业现场跑起来的工作。我们会用一个虚构的 **46 → 空白** 流程，把这份工作讲清楚。

#### English lead-in

**LEAD-IN |** The next term is not a model. It’s a job that helps AI work inside a real company. We’ll explain it with a made-up **46 → blank** workflow.

### F1 · Name

#### 中文

**看｜** **AI PRODUCT → FDE → LIVE COMPANY**

**说｜** FDE 是 **Forward Deployed Engineer，前向部署工程师**。可以把标准 AI 产品想成一台聪明机器，但每家公司的插头、门禁和工作方法都不同。FDE 同时理解产品和现场，负责让这台机器真正接得上、跑得起来。

**做｜** 从 AI 产品经过 FDE 指到真实公司，停在 **JOB · NOT A MODEL**。

**注意｜** FDE 是职位，不是 AI 模型。

**转｜** 为什么一个好模型，到了企业里还需要这份工作？

**点｜** **Why does AI need one?**

#### English

**LOOK |** **AI PRODUCT → FDE → LIVE COMPANY**

**SAY |** FDE means **Forward Deployed Engineer**. Think of a standard AI product as a smart machine. But every company has different plugs, access controls, and ways of working. The FDE understands both the product and the work on site, and helps the machine connect and actually run.

**DO |** Move from the AI product through FDE to the real company, then stop at **JOB · NOT A MODEL**.

**NOTE |** FDE is a job, not an AI model.

**TRANSITION |** Why does a good model still need this role when it enters a company?

**CLICK |** **Why does AI need one?**

### F2 · Why

#### 中文

**看｜** **GOOD ANSWER → REALITY WALL**

**说｜** Demo 里，一份干净文件交给 AI，很快就能得到漂亮答案。但公司真正使用时，还要读到正确系统、经过审批、写回业务流程，并且有人负责结果。模型已经答对，公司却仍然用不上，FDE 要打通的就是这堵现实墙。

**做｜** 跟随答案撞上由权限、审批、流程和负责人组成的墙。

**转｜** 我们跟着一个具体数字，看它在哪里被卡住。

**点｜** **Enter the real workflow**

#### English

**LOOK |** **GOOD ANSWER → REALITY WALL**

**SAY |** In a demo, we give AI a clean file and quickly get a good answer. But in a real company, it must access the right system, get approval, and write the result back into the workflow. Someone also needs to own the result. The model has answered correctly, but the company still can’t use it. This is the reality wall the FDE helps break through.

**DO |** Follow the answer as it hits the wall of access, approval, workflow, and ownership.

**TRANSITION |** Let’s follow one number and see where it gets stuck.

**CLICK |** **Enter the real workflow**

### F3 · Workflow

#### 中文

**看｜** **SOURCE 46 ≠ PRODUCTION BLANK**

**说｜** 邮件写着 46 天，表格里是 46，AI 也正确读出 46，审批也通过了，但最终系统却是空白。所以“AI 项目失败”不一定是模型不会，也可能是最后写回时把值丢了。FDE 像追快递一样逐站检查，找出 46 到底消失在哪里。

**做｜** 沿五个节点走一遍，再落到来源和线上结果的对比。

**转｜** 找到断点后，还要把问题整理成能复现的证据。

**点｜** **Follow one failure**

#### English

**LOOK |** **SOURCE 46 ≠ PRODUCTION BLANK**

**SAY |** The email says 46 days. The spreadsheet says 46. The AI correctly reads 46, and approval goes through. But the final system is blank. So an “AI project failure” isn’t always a model failure. The value may have been lost during the final write-back. Like tracking a parcel, the FDE checks each stop to find where 46 went missing.

**DO |** Follow the five steps, then compare the source with the live result.

**TRANSITION |** Once we find the break, we need clear evidence so others can reproduce the problem.

**CLICK |** **Follow one failure**

### F4 · Evidence

#### 中文

**看｜** **SOURCE 46 + OUTPUT BLANK + EXPERT 46 ✓**

**说｜** “AI 搞错了”只是一句抱怨，产品团队还不知道该修什么。FDE 把现场信息整理成原始资料、实际输出和业务专家确认的正确答案。这样，一句情绪就变成任何工程师都能重现和检查的案例。

**做｜** 从 **NOT REPRODUCIBLE** 开始，把三项事实合成可重现案例。

**转｜** 证据齐了，接下来是谁负责哪一部分？

**点｜** **Who owns what?**

#### English

**LOOK |** **SOURCE 46 + OUTPUT BLANK + EXPERT 46 ✓**

**SAY |** “The AI got it wrong” is just a complaint. The product team still doesn’t know what to fix. The FDE gathers the source, the actual output, and the correct answer confirmed by a **domain expert**. Now the complaint becomes a case that any engineer can reproduce and check.

**DO |** Start at **NOT REPRODUCIBLE**, then combine the three facts into a case others can reproduce.

**TRANSITION |** Now we have the evidence. Who takes care of each part?

**CLICK |** **Who owns what?**

### F5 · Roles

#### 中文

**看｜** **PRODUCT ENGINEER / FDE / DOMAIN EXPERT**

**说｜** 三种角色围绕同一个问题，但终点不同。产品工程师建设能服务很多客户的能力，业务专家定义什么才算正确，FDE 则把两边接起来，直到这家公司的真实流程能够使用并被采用。大家是搭档，不是排名。

**做｜** 对比三个 **FINISH LINE**，再沿 **DISCOVER → CONNECT → DEPLOY → ADOPT** 指过去。

**转｜** 分工清楚后，还得让这次经验留下来。

**点｜** **Make the lesson reusable**

#### English

**LOOK |** **PRODUCT ENGINEER / FDE / DOMAIN EXPERT**

**SAY |** These three roles work on the same problem, but have different finish lines. The **product engineer** builds capabilities that serve many customers. The **domain expert** defines what counts as correct. The **FDE** connects both sides until this company’s real workflow runs properly and people use it. They’re partners, not a ranking.

**DO |** Compare the three **FINISH LINE** goals, then follow **DISCOVER → CONNECT → DEPLOY → ADOPT**.

**TRANSITION |** Once the roles are clear, we need to make sure the lesson lasts.

**CLICK |** **Make the lesson reusable**

### F6 · Reuse

#### 中文

**看｜** **46 → BLANK → CASE → TEST → FIX → 52 ✓**

**说｜** 如果 FDE 每次都亲手把空白补成 46，他就成了永久人工补丁。更好的结果是把这次失败变成案例和测试，再修进产品里。这样遇到相似的 52 时，系统自己就能正确写入，经验不会随着 FDE 离开而消失。

**做｜** 把 46 的故障带入 **CASE → TEST → FIX**，再移到 52 的结果。

**注意｜** 画面中的 52 是帮助理解的示意。

**转｜** 这不只是示意，下面看一个真实部署案例。

**点｜** **See a real deployment**

#### English

**LOOK |** **46 → BLANK → CASE → TEST → FIX → 52 ✓**

**SAY |** If the FDE fills in 46 by hand every time, they become a permanent human patch. A better result is to turn this failure into a case and a test, then fix it in the product. When a similar case uses 52, the system writes it correctly on its own. The lesson doesn’t disappear when the FDE leaves.

**DO |** Bring the 46 failure into **CASE → TEST → FIX**, then move to the result for 52.

**NOTE |** The number 52 on screen is an illustration to help explain the idea.

**TRANSITION |** This isn’t just an illustration. Let’s look at a real deployment.

**CLICK |** **See a real deployment**

### F7 · Example

#### 中文

**看｜** **7,000 RETURNS；25% → 86%**

**说｜** 最后看 Tax AI 的真实部署案例：OpenAI 的 FDE 和研究人员、Thrive 工程师、Crete 税务从业者一起改进系统。试点处理了 7,000 份税表；上线时只有 25% 达到“至少 75% 字段正确”，六周后这一比例达到 86%。它说明现场数据、真实从业者、评估和工程持续闭环，才能把试点变成可衡量的改进。

**做｜** 读 **7,000** 和 **25% → 86%**，再扫过底部团队闭环。

**注意｜** 这不是某一个“英雄 FDE”独自带来的结果。

**转｜** FDE 说明今天仍由人把现场失败带回产品；最后一个问题是，这条改进闭环未来能有多少由 AI 自己完成。

**点｜** **右下角全局下一页** → RSI。需要重播本概念时才点 **Replay FDE**。

#### English

**LOOK |** **7,000 RETURNS; 25% → 86%**

**SAY |** Finally, here’s a real deployment: Tax AI. OpenAI FDEs and researchers, Thrive engineers, and Crete tax experts worked together to improve the system. The pilot processed 7,000 tax returns. At launch, only 25% had at least 75% of their fields correct. Six weeks later, that share reached 86%. This shows why real data, people doing the work, evaluations, and engineering need to form an ongoing loop. That’s how a pilot leads to progress we can measure.

**DO |** Read **7,000** and **25% → 86%**, then move across the team loop at the bottom.

**NOTE |** This was not the work of one “hero FDE” acting alone.

**TRANSITION |** FDE shows how people still bring real-world failures back into the product today. The last question is: how much of this improvement loop could AI handle itself in the future?

**CLICK |** Use the **bottom-right next-slide arrow** → **RSI**. Click **Replay FDE** only to replay this concept.

---

## RSI

#### 中文导入

**导入｜** 前面是人帮助 AI 从现场学习；RSI 追问的是，AI 能不能进一步帮助制造自己的下一代。

#### English lead-in

**LEAD-IN |** We’ve just seen people help AI learn from real work. RSI asks whether AI could go further and help build its own next generation.

### R1 · Name — Meet RSI

#### 中文

**看｜** **R · S · I → Recursive Self-Improvement**

**说｜** RSI 是 **Recursive Self-Improvement，递归自我改进**。可以把制造 AI 的过程想成一份菜谱：这一代 AI 帮忙改进菜谱，用它制造下一代 AI。“递归”意味着下一代还要能继续改这份菜谱。

**做｜** 从全称沿 **AI · N → RECIPE → AI · N+1** 走到问号。

**转｜** 先分清楚：改好一个答案，和改进制造 AI 的方法，不是一回事。

**点｜** **Show what must change**

#### English

**LOOK |** **R · S · I → Recursive Self-Improvement**

**SAY |** RSI means **Recursive Self-Improvement**. Think of the process for building AI as a recipe. This generation of AI helps improve the recipe, and we use it to build the next generation. “Recursive” means the next generation must be able to improve that recipe again.

**DO |** Start at the full name, then follow **AI · N → RECIPE → AI · N+1** to the question mark.

**TRANSITION |** First, fixing one answer is not the same as improving how we build AI.

**CLICK |** **Show what must change**

### R2 · Difference — Answer ≠ Recipe

#### 中文

**看｜** **ANSWER FIXED ≠ BUILD RECIPE STILL v1**

**说｜** AI 改对一条答案当然有用，但这还不是 RSI。它就像补救好一道菜，菜谱却完全没变。真正的自我改进要留下一个更好的方法，去制造下一代 AI。

**做｜** 先指修好的答案，再越过 **≠** 指向没有变化的菜谱。

**转｜** 完整 RSI 先放一边，我们看看今天已经能跑起来的改进循环。

**点｜** **Run today's loop**

#### English

**LOOK |** **ANSWER FIXED ≠ BUILD RECIPE STILL v1**

**SAY |** Fixing one AI answer is useful, but it isn’t RSI. It’s like fixing one dish while leaving the recipe unchanged. Real self-improvement must leave us with a better method for building the next AI.

**DO |** Point to the fixed answer, then move past **≠** to the unchanged recipe.

**TRANSITION |** Let’s set full RSI aside and look at the improvement loop we can run today.

**CLICK |** **Run today's loop**

### R3 · Method — Today's Loop

#### 中文

**看｜** **GOAL + TEST → A / B / C → KEEP C → REPEAT**

**说｜** 今天已经能做到的是：人先出题，也定好判分规则。AI 尝试很多版本，外部测试负责检查，赢家成为下一轮的起点。即使 B 最快，只要结果错误，仍然会被淘汰。

**做｜** 从 **GOAL、TEST** 移到 B 的叉，再停在赢家 C 和 **REPEAT**。

**转｜** 这样的循环，已经带来了哪些具体改进？

**点｜** **See a real result**

#### English

**LOOK |** **GOAL + TEST → A / B / C → KEEP C → REPEAT**

**SAY |** Here’s what we can already do today. People set the task and the scoring rules. AI tries many versions, and external tests check them. The winner becomes the starting point for the next round. Even if B is the fastest, it still gets rejected if its result is wrong.

**DO |** Move from **GOAL** and **TEST** to the X on B, then stop at winner C and **REPEAT**.

**TRANSITION |** What real improvements has this kind of loop already made?

**CLICK |** **See a real result**

### R4 · Result — Real Result

#### 中文

**看｜** **ONE ROUTINE +23% → WHOLE TRAINING −1% TIME**

**说｜** AlphaEvolve 是一个有边界的“AI 改进 AI”案例。Google DeepMind 公布，它让 Gemini 训练中一个反复运行的**矩阵乘法**程序加速 23%，使整次训练用时减少约 1%。这说明 AI 已经能帮助改进制造 AI 流程中的一个部分。

**做｜** 先指局部的 **+23%**，再跟到整次训练的 **−1%**。

**注意｜** 这是完整 RSI 所需的一种能力，不是完整 RSI 的证明。

**转｜** 不过，局部改进已经发生，不代表整个循环都交给了 AI。

**点｜** **Find the human boundary**

#### English

**LOOK |** **ONE ROUTINE +23% → WHOLE TRAINING −1% TIME**

**SAY |** AlphaEvolve is a limited example of AI helping improve AI. Google DeepMind reported that it sped up a **matrix multiplication** routine used repeatedly in Gemini training by 23%. That cut the time for the whole training run by about 1%. It shows that AI can already help improve one part of the process for building AI.

**DO |** Point to the local **+23%** gain, then follow it to **−1%** for the whole training run.

**NOTE |** This is one capability that full RSI would need, not proof of full RSI.

**TRANSITION |** But improving one part doesn’t mean AI is in charge of the whole loop.

**CLICK |** **Find the human boundary**

### R5 · Boundary — Human Boundary

#### 中文

**看｜** **DIRECTION / TEST / GO · STOP**

**说｜** 今天的 AI 仍然是在一个由人搭好的盒子里搜索。改进什么、怎样才算更好、结果能不能使用，仍由人决定。所以这是一种有边界的 AI 辅助改进，而不是完全自主的自我进化。

**做｜** 先指人的三个决定，再指框内的 AI 搜索区域。

**转｜** 如果要称为完整 RSI，还缺哪一步？

**点｜** **Test full RSI**

#### English

**LOOK |** **DIRECTION / TEST / GO · STOP**

**SAY |** Today’s AI still searches inside a box built by people. People decide what to improve, what counts as better, and whether the result can be used. So this is AI-assisted improvement with clear limits, not fully autonomous self-improvement.

**DO |** Point to the three human decisions, then to the AI search area inside the box.

**TRANSITION |** What step is still missing before we can call this full RSI?

**CLICK |** **Test full RSI**

### R6 · Full RSI — Full RSI Test

#### 中文

**看｜** **AI · N → RECIPE v2 → AI · N+1 → ?**

**说｜** 完整 RSI 的测试是：AI · N 改进菜谱，新菜谱制造出 AI · N+1，而 N+1 又能继续改进菜谱。做到这里，循环才真正叫递归。如果它将来闭合，可能让 AI 研发更快，但这只是可能性，不是预测。

**做｜** 沿完整路径走一遍，最后停在尚未接上的回程接口。

**注意｜** 最后连接尚未被证明，也并非必然发生。

**转｜** 六个词看起来差别很大，但它们都出现于 AI 撞上一种新的难题之后。

**点｜** **右下角全局下一页** → Closing。需要重播本概念时才点 **Replay RSI**。

#### English

**LOOK |** **AI · N → RECIPE v2 → AI · N+1 → ?**

**SAY |** Here’s the test for full RSI. AI · N improves the recipe. The new recipe builds AI · N+1, and N+1 can improve the recipe again. Only then is the loop truly recursive. If that loop closes in the future, it could make AI research faster. But that’s a possibility, not a prediction.

**DO |** Follow the full path, then stop at the return link that is still not connected.

**NOTE |** The final link has not been demonstrated, and it is not guaranteed to happen.

**TRANSITION |** These six terms look very different, but each appeared when AI ran into a new problem.

**CLICK |** Use the **bottom-right next-slide arrow** → **Closing**. Click **Replay RSI** only to replay this concept.

---

</details>

## C · Closing

### 中文

**看｜** **Four terms. Two shifts.**

**说｜** 最后把四个概念放回一张图。MoE 和蒸馏回答的是怎样更高效地使用能力；World Model 和 VLA 回答的是怎样从理解走向预测和行动。它们合在一起说明，AI 的变化不只是模型越来越大，而是能力被更聪明地使用，也开始更接近真实世界。

**做｜** 从左到右扫过两栏，最后停在 **BIGGER → SMARTER** 和 **ANSWERS → ACTIONS**。

**点｜** 无需点击。

### English

**LOOK |** **Four terms. Two shifts.**

**SAY |** Let’s bring the four terms back into one picture. MoE and distillation ask how to use model capabilities more efficiently. World Model and VLA ask how to move from understanding to prediction and action. Together, they show that AI isn’t just about bigger models. It’s also about using those capabilities more wisely and bringing AI closer to the real world.

**DO |** Move across the two columns from left to right, then stop at **BIGGER → SMARTER** and **ANSWERS → ACTIONS**.

**CLICK |** No click needed.
