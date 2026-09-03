# Beyond Bigger Models — Atlas 中英双语现场稿 / Bilingual Speaker Notes

> 中文：现场只用 Atlas。每一步按“看 → 说 → 做 → 点”走；内部按钮推进演示，右下角全局箭头才翻页。
>
> English: Use Atlas only. Follow LOOK → SAY → DO → CLICK. The main demo button moves one step. The arrow at the bottom right moves to the next slide.

## O · Opening

### 中文

**看｜** **Four terms. Two shifts.**

**说｜** AI 世界日新月异，但有时候，它的词汇更新得比技术本身还快——AI 的“命名部门”似乎从来不休息。今天不逐个追热点，而是用四个概念看清两次变化：怎样更聪明地使用模型能力，以及怎样让 AI 从回答问题走向预测和行动。

**做｜** 等缩写动画归位，再从上到下扫过两条变化轨道。

**点｜** 无需点击；准备好后用右下角全局下一页进入 MoE。

### English

**LOOK |** The many short AI names settle into **FOUR TERMS · TWO SHIFTS**.

**SAY |** AI changes fast. Its list of new terms can feel even faster. It is almost as if the team that names AI never takes a day off. Today, we will not chase every new word. We will use four terms to see two big changes. First, models are getting smarter about how they use their power. Second, AI is moving from giving answers to making plans and taking action.

**DO |** Wait for the short names to stop, then move down the two lines.

**CLICK |** Global next-slide arrow → **MoE**.

---

## MoE

#### 中文导入

**导入｜** 我们先从一个反直觉的想法开始：模型可以非常大，却不必每次都动用全部能力。

#### English lead-in

**LEAD-IN |** A model can be very large, but it does not need to use every part every time.

### M1 · Name

#### 中文

**看｜** **MoE → Mixture of Experts**

**说｜** 第一个词是 **MoE**，全称 **Mixture of Experts，专家混合**。这里的 Expert 不是一个完整 chatbot，而是模型内部的一块计算能力。要理解为什么需要很多 Expert，我们先看看普通的稠密模型怎么工作。

**做｜** 指向 **MoE**，跟着三个字母展开。

**点｜** **Show the dense model**

**注意｜** Expert 不是各自回答完整问题的独立人格。

#### English

**LOOK |** **MoE** opens into **Mixture of Experts**.

**SAY |** MoE means **Mixture of Experts**. Here, an expert is not a whole chatbot. It is one part inside the model that does some of the work. First, let us see how a regular dense model works.

**DO |** Point to **MoE**, then follow the letters as the full name appears.

**CLICK |** **Show the dense model**.

### M2 · Dense

#### 中文

**看｜** 黄色任务单进入大楼，所有窗口一起亮起。

**说｜** 语言模型不断预测下一个 token，可以把这个黄色 token 想成一张任务单，把模型想成一家公司。稠密模型处理每张任务单时，同一整块计算都要参与。就像任务再小，也让全公司一起上班。

**做｜** 从高亮 token 指到任务单，再扫过全部亮起的窗口。

**点｜** **Add more capacity**

#### English

**LOOK |** One yellow token becomes a work ticket, and the whole model lights up.

**SAY |** A language model keeps guessing the next small piece of text, called a token. Think of the yellow token as a work ticket, and the model as a company. In a dense model, every part joins every task. It is like asking the whole company to handle one small ticket.

**DO |** Follow the token to the work ticket, then point across all the lit windows.

**CLICK |** **Add more capacity**.

### M3 · Cost

#### 中文

**看｜** 任务单大小不变，大楼和账单同时变大。

**说｜** 为了让模型懂得更多，我们不断把公司做大。问题是，公司每扩一层，每张小任务单都要多叫一层人来上班。能力增加了，但每次处理任务的成本也一起增加。

**做｜** 一边停在不变的任务单，一边沿大楼和账单的增长方向移动。

**点｜** **Switch to MoE**

#### English

**LOOK |** The building grows. The work ticket stays the same, but the bill goes up.

**SAY |** We make the company bigger so it can do more. But now every small ticket uses every new floor. The model can do more, but each task also costs more.

**DO |** Point to the work ticket, then follow the growing building and bill.

**CLICK |** **Switch to MoE**.

### M4 · Route

#### 中文

**看｜** **256** 个办公室中，只有 **8** 个变红。

**说｜** MoE 不把公司缩小，而是加了一个调度员，也就是 Router。它看当前 token，从 256 个可用 Expert 里挑出 8 个。公司仍然很大，但这张任务只发给最合适的少数计算小组。

**做｜** 先圈出完整大楼，再对比 8 个红色窗口和其余灰色窗口。

**点｜** **Open the selected experts**

#### English

**LOOK |** The large building stays, but only **8 of 256** windows light up.

**SAY |** MoE keeps the big company. It adds a router, like a person who sends work to the right team. For this token, the router chooses 8 out of 256 expert parts. Only those eight teams work on this task.

**DO |** Point to the whole building, then the eight red windows and the grey windows.

**CLICK |** **Open the selected experts**.

### M5 · Run

#### 中文

**看｜** **TASK IN → WORK → NOTE OUT**

**说｜** “激活八个专家”其实就是这八个小组拿到任务并开始计算，其他小组这次不工作。它们不是分别回答完整问题，而是在模型处理这一小步时，各自加工同一张任务单。画面放大一个办公室，让我们看到任务进去、计算发生、结果出来。

**做｜** 跟随任务单进入办公室，再跟着输出短笺出来。

**点｜** 等一次完整循环结束后，点 **Combine their outputs**

#### English

**LOOK |** One chosen office shows **task in → compute → note out**. The other offices wait.

**SAY |** When we say the model “turns on eight experts,” this is what we mean. These eight parts get the task and do the math. The other parts wait. Each expert helps with one small step. It does not answer the whole question by itself.

**DO |** Follow the ticket into the office and the note coming out. Point to the waiting offices, then watch one full round.

**CLICK |** **Combine their outputs**.

### M6 · Combine

#### 中文

**看｜** **8 → 1；8 CALLED IN / 248 QUIET**

**说｜** 最后，8 个 Expert 的输出合成一个结果，再交给下一层。模型保留 256 个 Expert 的总容量，但这个 token 只支付 8 个 Expert 的计算成本。它的核心好处就是：容量可以很大，每次实际计算仍然有限。

**做｜** 跟着八份输出汇入 **8 → 1**，再指回 8 个工作和 248 个安静的 Expert。

**点｜** **Show real models**

#### English

**LOOK |** Eight small results flow into **8 → 1**, with **8 called in / 248 quiet**.

**SAY |** The model joins the eight small results into one result. Then it sends that result to the next part of the model. The model still has 256 experts in total, but this token only uses eight of them. That is the main idea: a big model, with less work each time.

**DO |** Follow the small results into **8 → 1**, then point to **8 called in / 248 quiet**.

**CLICK |** **Show real models**.

### M7 · Examples

#### 中文

**看｜** **DeepSeek-V3：671B total → 37B active / token**

**说｜** 这些是真实采用 MoE 架构的模型。以 DeepSeek-V3 为例，它共有 6710 亿参数，但每个 token 大约激活 370 亿；Qwen3 MoE 和 Kimi K2 也采用类似思路。数字不用记，只看共同模式：总容量很大，每次只运行一部分。

**做｜** 读第一行，再向下扫过三组一致的 **total → active**。

**点｜** **右下角全局下一页** → Distillation。需要重播本概念时才点 **Replay MoE**。

**转｜** MoE 保留一家大公司，每次只叫一支小团队；如果连大公司本身都部署不起，就要让一个真正的小模型学会重要能力。

#### English

**LOOK |** DeepSeek-V3, Qwen3 MoE, and Kimi K2 show **total → used for each token**.

**SAY |** These are real MoE models. DeepSeek-V3 has 671 billion parameters—the numbers inside a model—but it uses about 37 billion for each token. Qwen3 MoE and Kimi K2 use the same idea. You do not need to remember the numbers. Just remember this: the model is very large, but it only uses part of itself each time.

**DO |** Read the DeepSeek-V3 row once, then point down the repeated **total → active** pattern.

**TRANSITION |** MoE keeps the big company and calls only a small team. But what if the big company is still too expensive?

**CLICK |** Use **Replay MoE** only to start again. Otherwise, use the bottom-right arrow → **Distillation**.

---

## Distillation

#### 中文导入

**导入｜** 这就是知识蒸馏：把昂贵能力用在训练阶段，再让更小的模型独立工作。

#### English lead-in

**LEAD-IN |** Use a big model to teach a much smaller model.

### D1 · Name

#### 中文

**看｜** **LARGE TEACHER → LESSONS → SMALL STUDENT**

**说｜** 第二个词是 **Knowledge Distillation，知识蒸馏**。能力强的大模型做教师、准备教材，再训练另一个更小的学生模型。就像资深客服先教新人，真正上线值班的是新人。

**做｜** 沿 **教师 → 教材 → 学生** 指过去，停在 **runs alone**。

**点｜** **Why distill?**

**注意｜** 蒸馏不是把同一个大模型压成一个小文件。

#### English

**LOOK |** A **large teacher** makes lessons for a separate **small student**. Later, the student works alone.

**SAY |** Knowledge Distillation does not turn one big model file into a smaller file. A strong big model becomes the teacher. It makes lessons for a separate small model. Think of a senior support worker teaching a new worker. After training, the small model works by itself.

**DO |** Follow **LARGE TEACHER → LESSONS → SMALL STUDENT**, then stop at **runs alone**.

**CLICK |** **Why distill?**

### D2 · Why

#### 中文

**看｜** **HIGH CAPABILITY / HIGH COST** 挡在部署目标之前。

**说｜** 为什么不让教师到处直接回答？因为产品除了答案质量，还要考虑成本、设备、隐私和请求量。蒸馏把昂贵的教师留在训练阶段，再把更容易部署的学生送到手机、离线设备、本地环境或大规模服务中。

**做｜** 从能力和成本移到中间的部署限制，再扫过四个目标。

**点｜** **Try the student**

#### English

**LOOK |** **High capability** also brings **high cost / call**, so the teacher cannot go everywhere.

**SAY |** Why not use the teacher every time? A real product must think about cost, small devices, keeping data private, and lots of users. With distillation, we use the costly teacher during training. Then we use the smaller student in the real product.

**DO |** Move from **HIGH CAPABILITY** to **HIGH COST / CALL**, then point to the four places on the right.

**CLICK |** **Try the student**.

### D3 · Miss

#### 中文

**看｜** **Fantastic / Love → PRAISE → WRONG**

**说｜** 先让学生自己试一次。它看到 “Fantastic” 和 “Love” 就以为客户在表扬，但 “again” 和 “client demo” 暗示这其实是一句讽刺投诉。学生认识单词，却漏掉了整句话的意图。

**做｜** 先指正面词，再指失败线索，最后停在红色 **WRONG**。

**点｜** **Ask the teacher**

**注意｜** 这张工单是演示案例，不是公开的真实训练样本。

#### English

**LOOK |** The student reads “Fantastic” and “Love” as **PRAISE**, but the customer means the opposite.

**SAY |** The student sees the happy words “Fantastic” and “Love,” so it thinks this is praise. But “again” and “client demo” tell us the customer means the opposite. The student knows the words, but it misses the real meaning.

**DO |** Point to **Fantastic · Love**, then **again · client demo**, and end at **WRONG**.

**NOTE |** We made up this ticket for the demo.

**CLICK |** **Ask the teacher**.

### D4 · Lesson

#### 中文

**看｜** **INTENT → WHY → ACTION**

**说｜** 教师不只给出“投诉”这个标签，而是把答案变成可学习的教材。它说明客户真正的意图、为什么这样判断，以及客服下一步应该做什么。学生学到的不只是结论，还有线索和处理方式。

**做｜** 从矛盾线索指到 **SARCASM**，再向下走过三段教材。

**点｜** **Train on many**

#### English

**LOOK |** The teacher turns the mixed message into **INTENT · WHY · ACTION**.

**SAY |** The teacher does not only say, “This is a complaint.” It explains the real meaning. It points to the words that give us the clue. It also says what the support team should do next. The student learns how to read the message, not just the final answer.

**DO |** Follow the mixed clues, then move down **INTENT → WHY → ACTION**.

**CLICK |** **Train on many**.

### D5 · Train

#### 中文

**看｜** **BEFORE：positive word → praise；AFTER：context → contradiction → intent**

**说｜** 一份教材不会让学生立刻学会。每次训练都比较学生的猜测和教师教材，不一致就让学生内部参数做一点小调整。很多不同说法重复以后，它才会丢掉“正面词等于表扬”的坏捷径，改为结合上下文判断意图。

**做｜** 扫过多份教材，再对比 **BEFORE** 与 **AFTER MANY LESSONS**。

**点｜** **Remove the teacher**

#### English

**LOOK |** Many lessons turn each wrong guess into a **small update** and a better rule.

**SAY |** One lesson is not enough. The student makes a guess. It checks that guess against the teacher’s lesson. When they are different, the student changes a little. After many different examples, it learns a better rule: do not look at one happy word; read the whole message.

**DO |** Point across the lessons, follow **PRAISE ≠ COMPLAINT** to **SMALL UPDATE**, then compare **BEFORE** and **AFTER MANY LESSONS**.

**CLICK |** **Remove the teacher**.

### D6 · Alone

#### 中文

**看｜** **TEACHER OFFLINE / SMALL STUDENT RUNS ALONE**

**说｜** 现在把教师拿走，再给学生一张措辞和问题都不同的新工单。学生仍能独立识别投诉，并给出合适的处理建议。蒸馏的关键就在这里：学生把学到的行为留在自己的参数里，部署后自己工作。

**做｜** 从离线教师移到新消息，最后停在独立运行的学生和正确判断。

**点｜** **Show real models**

**注意｜** 如果每个线上请求仍要调用教师，那只是两个模型串联，不是这里展示的部署方式。

#### English

**LOOK |** **TEACHER — OFFLINE**; a new ticket arrives and the **SMALL STUDENT — RUNS ALONE**.

**SAY |** Now the teacher leaves. The new ticket has new words and a new problem. The student still sees that it is a complaint. It answers by itself. If the product asked the teacher every time, two models would still be working together. The small model would not work alone.

**DO |** Point to **TEACHER — OFFLINE**, then the new message, and end at **RUNS ALONE** and **CORRECT READ**.

**CLICK |** **Show real models**.

### D7 · Examples

#### 中文

**看｜** **Apple Foundation Model → ~3B on-device**

**说｜** 现实中，Apple 在约 30 亿参数的端侧基础模型训练中使用了知识蒸馏；Google 用 27B 教师训练 Gemma 2 的 2B 和 9B；DeepSeek 则用 R1 生成的推理数据训练更小的模型。方法并不完全相同，但共同点是：部署前由教师来教，部署后由学生独立服务。

**做｜** 读 Apple 一行，再扫过 **on-device、open + edge、reasoning** 三个目标。

**点｜** **右下角全局下一页** → World Model。需要重播本概念时才点 **Replay Distill**。

**注意｜** 三组箭头不代表同一种压缩比例。

**转｜** 前两个词都在解决“怎样让我们用得起 AI”；接下来要看的是，AI 动手前能不能先想象结果。

#### English

**LOOK |** Apple, Gemma 2, and DeepSeek-R1 show three real examples.

**SAY |** Here are three real examples. Apple used distillation to train a small model that runs on a device. Google used a 27B teacher to train Gemma 2 models with 2B and 9B parameters. DeepSeek used thinking examples from R1 to train smaller models. The shared idea is simple: the teacher helps during training, then the student works alone.

**DO |** Read the Apple row once, then point across **on-device · open + edge · reasoning**.

**NOTE |** The three teams use different methods. Do not compare them as one simple size rule.

**TRANSITION |** Now AI wants to act. How can it think about the result before it moves?

**CLICK |** Use **Replay Distill** only to start again. Otherwise, use the bottom-right arrow → **World Model**.

---

## World Model

#### 中文导入

**导入｜** 如果 AI 要进入真实世界，它不能只认出眼前有什么，还要预测采取动作后会怎样。

#### English lead-in

**LEAD-IN |** Now we move from seeing what is here to guessing what an action may do.

### W1 · Name

#### 中文

**看｜** **NEXT WORD → WHAT IS HERE → WHAT HAPPENS NEXT**

**说｜** 第三个词不是缩写，叫 **World Model，世界模型**。LLM 最典型的动作是预测下一段文字，视觉模型可以认出机器人、道路和路缘。世界模型再往前问一步：如果机器人现在行动，局面会怎样变化——可以把它理解成 AI 脑中的简化模拟器。

**做｜** 从左到右走过三栏，再跟随 **NOW + ACTION → NEXT**。

**点｜** **Why predict?**

#### English

**LOOK |** **NEXT WORD → WHAT IS HERE → WHAT HAPPENS NEXT**.

**SAY |** World Model is not a short name. A language model guesses the next piece of text. A vision model sees what is in front of it. A world model asks a simple question: “If I do this, what may happen next?” Think of it as a small practice world inside the AI.

**DO |** Move across the three columns, then trace **NOW + ACTION → NEXT**.

**CLICK |** **Why predict?**

### W2 · Why

#### 中文

**看｜** **ROBOT · ROAD · CURB → ? AFTER A MOVE**

**说｜** 看见路缘当然有用，但机器人真正要行动时，还要知道“如果我这样走，会发生什么”。同一张画面里，左转可能绕远，直走可能接近目标，右转可能撞上路缘。也就是说，识别现在和预测动作后果是两个不同任务。

**做｜** 先指左边识别出的物体，再越过问号指向三个动作。

**点｜** **Watch it learn**

**注意｜** 这里不是说多模态模型完全不会推理。

#### English

**LOOK |** The model sees the scene, but the three possible moves still end in question marks.

**SAY |** Seeing the curb is useful. But a robot that moves must also ask what each move may do. Going left may take a longer way around. Going straight may get closer to the goal. Going right may hit the curb. Seeing the scene and guessing the result of an action are two different jobs.

**DO |** Point to the three objects, then move past the question mark to the three possible moves.

**NOTE |** This does not mean models that use text, pictures, and sound cannot think.

**CLICK |** **Watch it learn**.

### W3 · Learn

#### 中文

**看｜** **WATCH → GUESS → CHECK → ADJUST**

**说｜** 它先看很多真实经历：当时看到了什么、做了什么、后来发生了什么。训练时把结局遮住，让模型先猜，再揭开真实结果比较差异，并做一次小调整。大量重复以后，它会越来越会预测变化。

**做｜** 沿四个编号指一次，最后停在 **many real sequences**。

**点｜** **Try three actions**

#### English

**LOOK |** **01 WATCH → 02 GUESS → 03 CHECK → 04 ADJUST**.

**SAY |** We show the model many recordings. Each one shows the scene, the action, and what happened next. During training, we hide the ending and ask the model to guess. Then we show what really happened and let it learn from the difference. After many rounds, it gets better at guessing change.

**DO |** Follow the four numbered steps, then point to **many real sequences**.

**CLICK |** **Try three actions**.

### W4 · Futures

#### 中文

**看｜** **SAME START → THREE FUTURES**

**说｜** 学会预测后，可以把三个不同动作接到同一个现在，想象三个不同未来。真实机器人一次也没有动，移动的只是模型里的想象。它可以先在模拟中试错，再决定现实里走哪一步。

**做｜** 先停在 **REALITY HAS NOT MOVED**，再扫过三条未来和不同结果。

**点｜** **Plan before moving**

#### English

**LOOK |** The real robot stays at **SAME START** while three possible futures move.

**SAY |** Now the model can start from one scene, try three actions in its head, and picture three results. The real robot has not moved. Only the possible futures move. The model can make some mistakes in its practice world before it chooses a move in the real world.

**DO |** Stop at **REALITY HAS NOT MOVED**, then point across the three results.

**CLICK |** **Plan before moving**.

### W5 · Plan

#### 中文

**看｜** **SELECT B → EXECUTE IN REALITY：ONE ACTION**

**说｜** 一个动作的预测还不够，所以系统会继续向前想几步，形成几条路线。它比较哪条更安全、哪条更接近目标，但现实中只执行最佳路线的第一步。走完再看现实、重新规划，就像 GPS 会随真实位置不断更新。

**做｜** 比较 A、B、C，停在 **SELECT B**，最后指向只执行一步。

**点｜** **What does it build?**

#### English

**LOOK |** The model checks routes **A, B, C** and picks **B**. The real robot makes only one move.

**SAY |** The model can think a few moves ahead and make several routes. It checks which route is safer and closer to the goal. Then it does only the first move from the best route. After that, it looks again and makes a new plan—like GPS after each turn.

**DO |** Compare **A, B, C**, stop at **SELECT B**, then point to **EXECUTE IN REALITY — ONE ACTION**.

**CLICK |** **What does it build?**

### W6 · Form

#### 中文

**看｜** **VISIBLE FUTURE / HIDDEN PREDICTIVE STATE**

**说｜** 世界模型不一定都生成视频。有些会产生人能观看的未来画面，另一些只在内部保留位置、距离和目标进度等预测状态。只要这些信息足以判断动作是否安全、是否更接近目标，它就完成了同一种工作。

**做｜** 对比可见未来和隐藏状态，再把两边带到底部的共同问题。

**点｜** **Show real systems**

#### English

**LOOK |** **VISIBLE FUTURE** and **HIDDEN FUTURE** help answer the same question.

**SAY |** Some world models make a future we can see as pictures or video. Others keep the future hidden and save only the facts they need. If the robot needs to know which move is safe, it does not need a pretty sky. It only needs the right facts to choose.

**DO |** Compare **VISIBLE FUTURE** with **HIDDEN FUTURE**, then point to the question below.

**CLICK |** **Show real systems**.

### W7 · Examples

#### 中文

**看｜** **GENIE 3 / V-JEPA 2**

**说｜** 真实研究也沿着这两条路发展：**Genie 3** 把预测环境做成可以观看和交互的世界，**V-JEPA 2** 则在隐藏状态里比较机器人动作。形式不同，但用途很接近：先模拟、测试和规划，再让系统进入现实。它们可以用于训练智能体、做“如果……会怎样”的测试，以及规划机器人动作。

**做｜** 让 Genie 3 视频播放，再从可见世界移到隐藏世界和下方三种用途。

**点｜** **右下角全局下一页** → VLA。需要重播本概念时才点 **Replay World Model**。

**注意｜** 这些仍是研究系统，不是完整物理世界的复制品。

**转｜** World Model 问“接下来可能怎样”；下一个词 VLA 问“这副身体现在该怎么动”。

#### English

**LOOK |** **Genie 3** shows a future world. **V-JEPA 2** keeps its future guess hidden.

**SAY |** Genie 3 shows a future world that people can see and use. V-JEPA 2 does not make a video. It keeps its guess hidden and uses it to compare robot actions. They look different, but both help a system try, check, and plan before it moves for real.

**DO |** Let the Genie 3 video play, compare **VISIBLE WORLD** with **HIDDEN WORLD**, then point to the three uses.

**NOTE |** These are research systems. They do not copy every rule of the real world.

**TRANSITION |** World Model asks, “What may happen next?” VLA asks, “What should this body do now?”

**CLICK |** Use **Replay World Model** only to start again. Otherwise, use the bottom-right arrow → **VLA**.

---

## VLA

#### 中文导入

**导入｜** 有了对未来的判断，机器人还需要把看到的场景和人说的目标，真正翻译成身体动作。

#### English lead-in

**LEAD-IN |** Now AI turns a guess about the future into a real move.

### V1 · Name

#### 中文

**看｜** **V + L → VLA → A**

**说｜** VLA 是 **Vision-Language-Action，视觉—语言—动作**。视觉回答“眼前有什么”，语言告诉机器人“我要什么”，Action 回答“这副身体现在该怎么动”。它把场景和目标变成真实动作，而不只是描述或回答。

**做｜** 依次指向 **VISION → LANGUAGE → ACTION**，再走一遍底部公式。

**点｜** **Why is that hard?**

#### English

**LOOK |** **VISION → LANGUAGE → ACTION**, joined as **V + L → VLA → A**.

**SAY |** VLA means **Vision-Language-Action**. Vision tells the robot what is there. Language tells it what we want. Action is the move the body should make now.

**DO |** Move across **VISION → LANGUAGE → ACTION**, then trace the formula below.

**CLICK |** **Why is that hard?**

### V2 · Why

#### 中文

**看｜** **1 SENTENCE ≠ WHICH? · HOW? · ENOUGH?**

**说｜** “把橙色方块放进托盘”已经说清了目标，却没有告诉机械臂具体怎么完成。它要找到正确方块、绕开障碍、选择抓取位置和力度，还要知道什么时候松手。语言只说了要什么，身体必须自己解决怎么做。

**做｜** 从一句指令移到三个问题，最后停在 **WHAT / HOW**。

**点｜** **Unpack the task**

#### English

**LOOK |** One sentence leaves the body asking **which object, what path, how much force, and when to stop**.

**SAY |** The goal is clear: “Put the orange block in the tray.” But the sentence does not tell the arm how to do it. The robot must find the right block and move around the object blocking the way. It must hold the block with the right force and know when to let go. Language says what we want. The body still has to work out how.

**DO |** Start at **1 SENTENCE**, move through **WHICH? → HOW? → ENOUGH?**, and end at **WHAT versus HOW**.

**CLICK |** **Unpack the task**.

### V3 · Steps

#### 中文

**看｜** **FIND → REACH → ALIGN → GRIP → LIFT → PLACE**

**说｜** 一句话交给身体，就会展开成一串连续动作：找到方块、绕过障碍伸手、对准、抓住、抬起，最后放进托盘。人类一句话说完的目标，机器人要靠多个动作配合完成。

**做｜** 沿六个动作依次指过去，停在 **1 GOAL → 6 COORDINATED MOVES**。

**点｜** **How does it learn?**

#### English

**LOOK |** One goal becomes **FIND → REACH → ALIGN → GRIP → LIFT → PLACE**.

**SAY |** When a body follows that sentence, one goal becomes many small moves. The robot finds the block and reaches around the object. It lines up its hand, grips the block, lifts it, and puts it in the tray.

**DO |** Follow the six numbered moves, then end at **1 GOAL → 6 COORDINATED MOVES**.

**CLICK |** **How does it learn?**

### V4 · Learn

#### 中文

**看｜** **WATCH → HIDE → GUESS → CHECK → ADJUST**

**说｜** 先录下人类操控机器人完成任务的示范。训练时让模型看场景和目标，但藏住专家下一步，让它先猜，再揭开专家动作比较差异并调整。用很多示范重复这个过程，模型会越来越会选择下一步。

**做｜** 沿五个编号指过去，最后停在大量录制示范。

**点｜** **Let reality answer**

#### English

**LOOK |** A video of a person moving the robot becomes **WATCH → HIDE → GUESS → CHECK → ADJUST**.

**SAY |** First, people control robots while we record them doing tasks. During training, we show the scene and the goal, but hide the person’s next move. The model guesses. Then we show the real move, check the difference, and let it learn. Many examples help it choose a better next move.

**DO |** Follow the five numbered steps, then point to **many recorded robot demonstrations**.

**CLICK |** **Let reality answer**.

### V5 · Feedback

#### 中文

**看｜** **BLOCK SLIPPED → SHIFT LEFT · RE-GRIP**

**说｜** 学会动作后，也不能一口气做到底。这里机械臂先抓了一下，但方块滑落；下一帧画面把失败告诉系统，于是它改变下一步，调整位置再抓。VLA 的节奏是：先动一点，再看一眼，再纠正。

**做｜** 从滑落的方块跟到 **REALITY ANSWERS**，再落在重新抓取和循环上。

**点｜** **Why is this harder than chat?**

**注意｜** 这是网页示意，不是官方机器人录像。

#### English

**LOOK |** The block slips. The next camera picture shows it, and the arm moves left to grip again.

**SAY |** The robot should not decide on one long move and never look again. Here, the block slips. The next camera picture shows the problem, so the arm changes its next move. The pattern is simple: move a little, look again, and fix.

**DO |** Follow **THE BLOCK SLIPPED → REALITY ANSWERS → SHIFT LEFT · RE-GRIP**, then point to the loop below.

**NOTE |** We made this scene for the web demo. It is not real robot video.

**CLICK |** **Why is this harder than chat?**

### V6 · Hard

#### 中文

**看｜** **BAD WORD：UNDO / BAD MOTION：CONTACT ALREADY HAPPENED**

**说｜** 这就是 VLA 比聊天更难的地方。错字可以删掉重写，但机械臂撞上东西时，接触已经发生。它还要理解三维空间，控制时机和力度，并依赖采集缓慢、昂贵且有安全要求的真实机器人数据。

**做｜** 先对比错字和错误动作，再扫过下方三个现实限制。

**点｜** **See a real system**

#### English

**LOOK |** **BAD WORD — UNDO** versus **BAD MOTION — CONTACT ALREADY HAPPENED**.

**SAY |** If a chatbot writes a bad word, we can delete it and try again. If a robot makes a bad move, it has already touched the real world. A VLA must understand where things are, when to move, and how much force to use. Real robot training is also slow and expensive. And the robot must stay safe.

**DO |** Compare the two failures, then point to the three hard parts below.

**CLICK |** **See a real system**.

### V7 · Example

#### 中文

**看｜** **UNITREE WVLA 2.0 / THREE SHORT EXCERPTS**

**说｜** 这是宇树 **WVLA 2.0** 的官方演示。原片超过三分钟，宇树把它描述为一镜到底、多任务、全自主运行，并且有外部强干扰。这里保留三个短片段：机器人拿取桌面物品；有人推碰它之后，它继续执行；最后它整理另一类物品。重点不是速度，而是同一个系统能够把现场变成一连串身体动作。

**做｜** 让 23 秒视频播放一次，先看桌面动作，再看人为干扰，最后扫过 **VISION → LANGUAGE → ACTION** 和右侧官方描述。

**点｜** **右下角全局下一页** → Closing。需要重播本概念时才点 **Replay VLA**。

**注意｜** 这是官方成功演示的剪辑节选，不是独立评测，也不能证明它在任何环境都可靠。公开视频没有清楚展示实际使用的语言指令。

**[Sources]｜** Unitree Robotics, [Conference Room Mess Cleanup Test: Unitree WVLA 2.0 Model](https://www.youtube.com/watch?v=zqqIpVsMYkE), 2026-05-25.

**转｜** 到这里，四个概念刚好连成一条路：先更高效地使用能力，再让 AI 从理解走向预测和行动。

#### English

**LOOK |** Official **Unitree WVLA 2.0** video, shown as three short excerpts.

**SAY |** This is an official Unitree WVLA 2.0 demo. The full video is over three minutes. Unitree says the full demo was filmed in one take. The robot does many tasks, works on its own, and faces strong outside interference. We kept three short parts. It picks up an item, keeps working after a person pushes it, and then handles a different item. The point is not speed. The point is that one system turns the scene into a series of robot moves.

**DO |** Let the 23-second clip play once. Watch the table task, then the push, and finish at **VISION → LANGUAGE → ACTION** and the official description.

**NOTE |** This is an edited official demo, not an independent test. It does not prove the system works everywhere. The public video does not clearly show the language command.

**[Sources] |** Unitree Robotics, [Conference Room Mess Cleanup Test: Unitree WVLA 2.0 Model](https://www.youtube.com/watch?v=zqqIpVsMYkE), 2026-05-25.

**TRANSITION |** These four ideas make one clear story. First, use model power with less waste. Then, move from seeing to planning and action.

**CLICK |** Use **Replay VLA** only to start again. Otherwise, use the bottom-right arrow → **Closing**.

---

<details>
<summary><strong>隐藏备选第三部分 / Hidden backup third part: FDE · RSI</strong></summary>

> 中文：这部分不在当前 30 分钟路线中，但讲稿与演示仍完整保留。
>
> English: This part is not in the current 30-minute talk. The script and demos are still here.

## FDE

#### 中文导入

**导入｜** 接下来这个词不是一种模型，而是一种负责让 AI 真正在企业现场跑起来的工作。我们会用一个虚构的 **46 → 空白** 流程，把这份工作讲清楚。

#### English lead-in

**LEAD-IN |** The next term is not a model. It is a job that helps AI work inside a real company. We will use a made-up **46 → blank** story.

### F1 · Name

#### 中文

**看｜** **AI PRODUCT → FDE → LIVE COMPANY**

**说｜** FDE 是 **Forward Deployed Engineer，前向部署工程师**。可以把标准 AI 产品想成一台聪明机器，但每家公司的插头、门禁和工作方法都不同。FDE 同时理解产品和现场，负责让这台机器真正接得上、跑得起来。

**做｜** 从 AI 产品经过 FDE 指到真实公司，停在 **JOB · NOT A MODEL**。

**点｜** **Why does AI need one?**

**注意｜** FDE 是职位，不是 AI 模型。

#### English

**LOOK |** **AI PRODUCT → FDE → LIVE COMPANY**, with **JOB · NOT A MODEL**.

**SAY |** FDE means **Forward Deployed Engineer**. It is a job, not an AI model. Think of a smart machine arriving at a factory. Every factory has different plugs, doors, and ways of working. The FDE helps the machine fit in and actually work.

**DO |** Move from **AI PRODUCT** through **FDE** to **LIVE COMPANY**, then stop at **JOB · NOT A MODEL**.

**CLICK |** **Why does AI need one?**

### F2 · Why

#### 中文

**看｜** **GOOD ANSWER → REALITY WALL**

**说｜** Demo 里，一份干净文件交给 AI，很快就能得到漂亮答案。但公司真正使用时，还要读到正确系统、经过审批、写回业务流程，并且有人负责结果。模型已经答对，公司却仍然用不上，FDE 要打通的就是这堵现实墙。

**做｜** 跟随答案撞上由权限、审批、流程和负责人组成的墙。

**点｜** **Enter the real workflow**

#### English

**LOOK |** A good AI answer hits a **REALITY WALL** and never enters the real work process.

**SAY |** In a demo, we give AI one clean file and get a good answer. In a real company, the AI needs access to the right system. The answer may also need a manager’s OK. It must follow the right work steps and reach a person in charge. The model got the answer right, but the company still cannot use it.

**DO |** Follow **ONE FILE → AI → GOOD ANSWER**, let it hit **REALITY WALL**, then end at **ANSWER NOT IN THE WORKFLOW**.

**CLICK |** **Enter the real workflow**.

### F3 · Workflow

#### 中文

**看｜** **SOURCE 46 ≠ PRODUCTION BLANK**

**说｜** 邮件写着 46 天，表格里是 46，AI 也正确读出 46，审批也通过了，但最终系统却是空白。所以“AI 项目失败”不一定是模型不会，也可能是最后写回时把值丢了。FDE 像追快递一样逐站检查，找出 46 到底消失在哪里。

**做｜** 沿五个节点走一遍，再落到来源和线上结果的对比。

**点｜** **Follow one failure**

#### English

**LOOK |** **EMAIL 46 → SPREADSHEET 46 → AI 46 ✓ → APPROVAL → LIVE SYSTEM BLANK**.

**SAY |** The email says 46. The spreadsheet says 46. The AI says 46. A person approves it. But the final system is blank. So an “AI failure” may not be the model’s fault. The value may get lost while moving from one system to another. The FDE follows 46 from step to step to find where it went missing.

**DO |** Follow all five stops, then move down to **SOURCE 46 ≠ PRODUCTION BLANK**.

**CLICK |** **Follow one failure**.

### F4 · Evidence

#### 中文

**看｜** **SOURCE 46 + OUTPUT BLANK + EXPERT 46 ✓**

**说｜** “AI 搞错了”只是一句抱怨，产品团队还不知道该修什么。FDE 把现场信息整理成原始资料、实际输出和业务专家确认的正确答案。这样，一句情绪就变成任何工程师都能重现和检查的案例。

**做｜** 从 **NOT REPRODUCIBLE** 开始，把三项事实合成可重现案例。

**点｜** **Who owns what?**

#### English

**LOOK |** “The AI got it wrong” becomes **SOURCE 46 + OUTPUT BLANK + EXPERT 46 ✓**.

**SAY |** “The AI got it wrong” does not tell the product team what to fix. The FDE saves the source and the output we got. A person who knows the job gives the right answer. Now the team has a clear case it can run again and check.

**DO |** Start with the complaint, then join the three facts into **REPRODUCIBLE CASE**.

**CLICK |** **Who owns what?**

### F5 · Roles

#### 中文

**看｜** **PRODUCT ENGINEER / FDE / DOMAIN EXPERT**

**说｜** 三种角色围绕同一个问题，但终点不同。产品工程师建设能服务很多客户的能力，业务专家定义什么才算正确，FDE 则把两边接起来，直到这家公司的真实流程能够使用并被采用。大家是搭档，不是排名。

**做｜** 对比三个 **FINISH LINE**，再沿 **DISCOVER → CONNECT → DEPLOY → ADOPT** 指过去。

**点｜** **Make the lesson reusable**

#### English

**LOOK |** Product Engineer, FDE, and Domain Expert have three different **FINISH LINE** goals.

**SAY |** An FDE is not just a product engineer with a bigger title. Product engineers build things many customers can use. People who know the business say what a correct result looks like. The FDE connects both sides until the real work process runs well and people use it. They are a team, not a ranking.

**DO |** Compare the three goals, then follow **DISCOVER → CONNECT → DEPLOY → ADOPT**.

**CLICK |** **Make the lesson reusable**.

### F6 · Reuse

#### 中文

**看｜** **46 → BLANK → CASE → TEST → FIX → 52 ✓**

**说｜** 如果 FDE 每次都亲手把空白补成 46，他就成了永久人工补丁。更好的结果是把这次失败变成案例和测试，再修进产品里。这样遇到相似的 52 时，系统自己就能正确写入，经验不会随着 FDE 离开而消失。

**做｜** 把 46 的故障带入 **CASE → TEST → FIX**，再移到 52 的结果。

**点｜** **See a real deployment**

**注意｜** 画面中的 52 是帮助理解的示意。

#### English

**LOOK |** **46 → BLANK** becomes **CASE → TEST → FIX**, and a later **52 → 52 ✓** succeeds.

**SAY |** If the FDE types 46 into the empty box every time, that person becomes a human patch. A better fix is to save the failure as a test and fix the product. Then, when a similar case uses 52, the system can handle it by itself. The lesson stays after the FDE leaves.

**DO |** Follow **46 → BLANK** into **CASE → TEST → FIX**, then move to **52 → 52 ✓**.

**NOTE |** The number 52 is only an example.

**CLICK |** **See a real deployment**.

### F7 · Example

#### 中文

**看｜** **7,000 RETURNS；25% → 86%**

**说｜** 最后看 Tax AI 的真实部署案例：OpenAI 的 FDE 和研究人员、Thrive 工程师、Crete 税务从业者一起改进系统。试点处理了 7,000 份税表；上线时只有 25% 达到“至少 75% 字段正确”，六周后这一比例达到 86%。它说明现场数据、真实从业者、评估和工程持续闭环，才能把试点变成可衡量的改进。

**做｜** 读 **7,000** 和 **25% → 86%**，再扫过底部团队闭环。

**点｜** **右下角全局下一页** → RSI。需要重播本概念时才点 **Replay FDE**。

**注意｜** 这不是某一个“英雄 FDE”独自带来的结果。

**转｜** FDE 说明今天仍由人把现场失败带回产品；最后一个问题是，这条改进闭环未来能有多少由 AI 自己完成。

#### English

**LOOK |** A Tax AI test shows **7,000 returns** and **25% → 86%** in six weeks.

**SAY |** OpenAI FDEs and researchers, Thrive engineers, and Crete tax experts worked together on Tax AI. The test handled 7,000 tax returns. At first, 25% of returns had at least 75% of their fields right. Six weeks later, that number was 86%. The point is that tax experts, real data, tests, and engineering all worked together.

**DO |** Read **7,000** and **25% → 86%**, then point across **PRACTITIONERS → FIELD DATA → EVALS → ENGINEERING**.

**NOTE |** This is a team result. One FDE did not do it alone.

**TRANSITION |** Today, people close this learning loop. In the future, how much of it could AI close by itself?

**CLICK |** Use **Replay FDE** only to start again. Otherwise, use the bottom-right arrow → **RSI**.

---

## RSI

#### 中文导入

**导入｜** 前面是人帮助 AI 从现场学习；RSI 追问的是，AI 能不能进一步帮助制造自己的下一代。

#### English lead-in

**LEAD-IN |** The last term asks a bigger question: can AI help build a better next AI?

### R1 · Name — Meet RSI

#### 中文

**看｜** **R · S · I → Recursive Self-Improvement**

**说｜** RSI 是 **Recursive Self-Improvement，递归自我改进**。可以把制造 AI 的过程想成一份菜谱：这一代 AI 帮忙改进菜谱，用它制造下一代 AI。“递归”意味着下一代还要能继续改这份菜谱。

**做｜** 从全称沿 **AI · N → RECIPE → AI · N+1** 走到问号。

**点｜** **Show what must change**

#### English

**LOOK |** **R · S · I** opens beside **AI · N → RECIPE → AI · N+1**. A question mark sits on the way back.

**SAY |** RSI means **Recursive Self-Improvement**. The full name sounds hard, so think of a recipe for making AI. One AI helps improve that recipe. We use the new recipe to build the next AI. “Recursive” means the next AI can improve the recipe again.

**DO |** Point to the full name, then trace **AI · N → RECIPE → AI · N+1**.

**CLICK |** **Show what must change**.

### R2 · Difference — Answer ≠ Recipe

#### 中文

**看｜** **ANSWER FIXED ≠ BUILD RECIPE STILL v1**

**说｜** AI 改对一条答案当然有用，但这还不是 RSI。它就像补救好一道菜，菜谱却完全没变。真正的自我改进要留下一个更好的方法，去制造下一代 AI。

**做｜** 先指修好的答案，再越过 **≠** 指向没有变化的菜谱。

**点｜** **Run today's loop**

#### English

**LOOK |** One answer changes from **WRONG** to **FIXED**, but **BUILD RECIPE · STILL v1**.

**SAY |** AI can fix one wrong answer, but that is not RSI. It is like fixing one meal but leaving the recipe unchanged. Full self-improvement must improve the way we build the next AI.

**DO |** Point to the fixed answer, the large **≠**, and then the unchanged recipe.

**CLICK |** **Run today's loop**.

### R3 · Method — Today's Loop

#### 中文

**看｜** **GOAL + TEST → A / B / C → KEEP C → REPEAT**

**说｜** 今天已经能做到的是：人先出题，也定好判分规则。AI 尝试很多版本，外部测试负责检查，赢家成为下一轮的起点。即使 B 最快，只要结果错误，仍然会被淘汰。

**做｜** 从 **GOAL、TEST** 移到 B 的叉，再停在赢家 C 和 **REPEAT**。

**点｜** **See a real result**

#### English

**LOOK |** People set **GOAL** and **TEST**. AI tries A, B, and C, then keeps the winner that passes the test.

**SAY |** Today, people set the goal and the test. AI tries versions A, B, and C. The test checks each one, and the best correct version starts the next round. A fast answer still loses if it is wrong. Then the process starts again.

**DO |** Point to **GOAL**, **TEST**, the X on B, winner C, and **REPEAT**.

**CLICK |** **See a real result**.

### R4 · Result — Real Result

#### 中文

**看｜** **ONE ROUTINE +23% → WHOLE TRAINING −1% TIME**

**说｜** AlphaEvolve 是一个有边界的“AI 改进 AI”案例。Google DeepMind 公布，它让 Gemini 训练中一个反复运行的矩阵乘法程序加速 23%，使整次训练用时减少约 1%。这说明 AI 已经能帮助改进制造 AI 流程中的一个部分。

**做｜** 先指局部的 **+23%**，再跟到整次训练的 **−1%**。

**点｜** **Find the human boundary**

**注意｜** 这是完整 RSI 所需的一种能力，不是完整 RSI 的证明。

#### English

**LOOK |** **ONE REPEATED MATH ROUTINE · +23%** reaches **WHOLE GEMINI TRAINING RUN · −1% TIME**.

**SAY |** Google DeepMind says AlphaEvolve made one math step used many times in Gemini training 23 percent faster. This cut the full training time by about 1 percent. So AI can already help improve one small part of how we build AI.

**DO |** Point to **+23%**, then follow it to **−1% TIME**.

**NOTE |** This is a small, limited AI-for-AI result. It is not full RSI.

**CLICK |** **Find the human boundary**.

### R5 · Boundary — Human Boundary

#### 中文

**看｜** **DIRECTION / TEST / GO · STOP**

**说｜** 今天的 AI 仍然是在一个由人搭好的盒子里搜索。改进什么、怎样才算更好、结果能不能使用，仍由人决定。所以这是一种有边界的 AI 辅助改进，而不是完全自主的自我进化。

**做｜** 先指人的三个决定，再指框内的 AI 搜索区域。

**点｜** **Test full RSI**

#### English

**LOOK |** AI tries ideas inside a box. People still hold **DIRECTION · TEST · GO / STOP**.

**SAY |** The AI can search inside the box, but people still make three big choices. They choose what to improve, what counts as better, and whether to use the result. So today’s process still has clear human limits.

**DO |** Point to the three human choices, then the AI search area inside the box.

**CLICK |** **Test full RSI**.

### R6 · Full RSI — Full RSI Test

#### 中文

**看｜** **AI · N → RECIPE v2 → AI · N+1 → ?**

**说｜** 完整 RSI 的测试是：AI · N 改进菜谱，新菜谱制造出 AI · N+1，而 N+1 又能继续改进菜谱。做到这里，循环才真正叫递归。如果它将来闭合，可能让 AI 研发更快，但这只是可能性，不是预测。

**做｜** 沿完整路径走一遍，最后停在尚未接上的回程接口。

**点｜** **右下角全局下一页** → Closing。需要重播本概念时才点 **Replay RSI**。

**注意｜** 最后连接尚未被证明，也并非必然发生。

**转｜** 六个词看起来差别很大，但它们都出现于 AI 撞上一种新的难题之后。

#### English

**LOOK |** **AI · N → recipe v2 → AI · N+1**, but the line back is not complete.

**SAY |** For full RSI, AI · N would improve the recipe. That recipe would build AI · N+1. Then N+1 would have to improve the recipe again. Only then would the loop truly repeat by itself. If that ever happens, AI research could speed up. But we do not know if it will happen.

**DO |** Follow the possible path, then follow the line back to **N+1 REPEATS IT · not demonstrated**.

**NOTE |** Full RSI has not been shown. It may never happen.

**TRANSITION |** These terms look different, but each one tries to solve a new problem for AI.

**CLICK |** Use **Replay RSI** only to start again. Otherwise, use the bottom-right arrow → **Closing**.

</details>

---

## C · Closing

### 中文

**看｜** **Four terms. Two shifts.**

**说｜** 最后把四个概念放回一张图。MoE 和蒸馏回答的是怎样更高效地使用能力；World Model 和 VLA 回答的是怎样从理解走向预测和行动。它们合在一起说明，AI 的变化不只是模型越来越大，而是能力被更聪明地使用，也开始更接近真实世界。

**做｜** 从左到右扫过两栏，最后停在 **BIGGER → SMARTER** 和 **ANSWERS → ACTIONS**。

**点｜** 无需点击。

### English

**LOOK |** **FOUR TERMS · TWO SHIFTS**: bigger to smarter, answers to actions.

**SAY |** MoE and distillation show how models can do more with less work. World models and VLA move AI from seeing what is there to making plans and taking action. Together, these four ideas show that AI is not only getting bigger. It is also learning to use its power better and do more in the real world.

**DO |** Move from left to right across the two columns, then end at **BIGGER → SMARTER** and **ANSWERS → ACTIONS**.

**CLICK |** None.
