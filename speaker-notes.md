# Beyond Bigger Models — Bilingual Speaker Notes

These notes are written to be spoken, not read like an article.

这是一份方便现场讲述的口语稿，不是一篇需要逐字朗读的文章。投影页继续保持英文；每段英文后都有对应的中文版本，现场选择一种语言讲即可，不需要两种都念。

- **On screen** is the memory anchor. Keep it visible and short.
- **Say / 口述** gives the simple explanation, the reason the term appeared, and one real example.
- **Optional depth / 可选补充** holds details that can be skipped without breaking the story.
- **Transition / 过渡** connects the term to the next bottleneck.

The source drawer in the HTML deck holds the references. There is no need to read citations aloud.

Presenter controls / 演示控制：

- **Space / →** advances a staged idea or moves to the next slide. / 推进分步内容，或进入下一页。
- **←** moves back one step. / 后退一步。
- **Mouse / trackpad** operates the live concept scenes; World Model and VLA share one continuous scene. / 用鼠标或触控板操作这些概念场景；World Model 与 VLA 共用同一个连续场景。
- **R** resets the current live lab or staged demonstration. / 重置当前实时实验或分步演示。
- **S** opens the source drawer. / 打开来源抽屉。

---

## Slide 1 — The AI Vocabulary Factory

### On screen

- **AI moves fast. Its vocabulary moves faster.**
- A visible factory turns **a new bottleneck** into **a new term**.
- Running joke: **Days since last new term: 00**
- Six outputs: **MoE · Distill · World · VLA · FDE · RSI**

### Stage cues / 演示提示

- No clicks / 无需点击：wait for one bottleneck to be stamped into a term, then point to the six finished labels below. / 等一个“新瓶颈”被盖章变成新术语，再指向下方已经出厂的六个词。
- Start with the counter / 从计数器开玩笑：pause briefly on **00 days** before the first sentence. / 先在“00 天”处停一下，再说第一句话。

### Say — English

AI moves fast. Its vocabulary sometimes seems to move even faster.

According to this highly scientific counter, it has been exactly zero days since AI invented another term.

If you stop following AI for a month, you do not just miss a new model. You come back to a bowl of alphabet soup: MoE, VLA, FDE, RSI—and everyone talks as if these words have always existed.

But the terms do not appear from nowhere. AI hits a new bottleneck: too much compute, a model that is too large, a robot that cannot act reliably, or a demo that breaks inside a real company. Someone finds a new approach—and then the naming department gets to work.

Today is not an AI dictionary. We will put six labels back through the machine and ask four simple things: what the name means, what bottleneck created it, how the mechanism works, and what evidence and limitations we have today.

If we can explain the idea without hiding behind the acronym, then we actually understand it.

### 口述 — 中文

AI 世界日新月异，但有时候，它的词汇更新得比技术本身还快。

根据右上角这个非常“科学”的计数器，距离 AI 上一次发明新词，已经过去了整整零天。

一个月没关注 AI，你错过的可能不只是新模型。等你回来，面前已经是一碗“字母汤”：MoE、VLA、FDE、RSI。更神奇的是，大家说起这些词，好像它们一直都存在。

但这些词并不是凭空出现的。通常是 AI 先撞上了一个新瓶颈：算力太贵、模型太大、机器人不会可靠行动，或者一个漂亮的演示进入真实公司就坏掉。有人找到一种新做法，然后“命名部门”就开始工作了。

所以今天不是来念 AI 词典。我们会把六个标签重新放回这台机器，只问四个简单的问题：这个名字代表什么，是什么瓶颈催生了它，它到底怎样工作，以及今天有哪些证据和边界。

如果不用缩写，我们仍然能把它解释清楚，那才算真的理解了它。

### Transition — English

Let us start with a strange idea: a model can become much larger without using all of itself every time.

### 过渡 — 中文

我们先从一个有点反直觉的想法开始：一个模型可以变得非常大，却不必每次都动用它的全部能力。

---

## Slide 2 — MoE

### On screen

- One persistent token and one fixed **Transformer FFN slot**
- **Dense:** every weight in the same feed-forward block participates
- **MoE:** router scores → Top-K = 8 → one expert opens in X-ray → weighted mix
- Final reveal: **671B total → 37B active per token** and **8 / 256 routed experts + shared expert**
- Published counts are real; the scores and selected expert IDs are explanatory

### Stage cues / 演示提示

- Click **Run this token**. Point out that the whole dense FFN participates in this forward pass. / 点击 **Run this token**；指出这次前向计算会用到整块稠密 FFN。
- Click **Swap in MoE**. The Transformer slot, input, and output stay fixed; only the machinery inside the slot changes. / 点击 **Swap in MoE**；Transformer 槽位、输入和输出都不变，变化的是槽位内部的机器。
- Click **Open the top eight**. Read the router scores first, then pause on the bright X-ray: “activate” means executing this FFN’s learned weights. / 点击 **Open the top eight**；先看 router 排名，再停在明亮的 X-ray 上：“激活”就是让 token 真正通过这块 FFN 权重进行计算。
- Click **Combine their work**. Follow the selected expert outputs into the weighted sum; only now point to 671B total versus 37B active. / 点击 **Combine their work**；跟着专家输出进入加权合并，到这里再指出 671B 总参数与 37B 激活参数。
- If useful, click **Try another token** once to show that another token may wake a different subset. / 如果需要，再点一次 **Try another token**，说明另一个 token 可能唤醒不同组合。

### Say — English

Let us begin with an ordinary **dense model**. Inside a Transformer, every token goes through the same feed-forward block. The numbers inside react differently, but the route and the block are fixed. If we make that block larger, every token must run the larger computation.

Now keep the same Transformer slot and change what is inside it. **MoE means Mixture of Experts.** It replaces one feed-forward block with many alternative feed-forward blocks, called experts, and adds a router.

The router is also a learned neural network. For this token it produces a score for every expert and keeps the top few. A different token can receive a different ranking.

Now the important word: **activate**. It does not mean that an expert merely lights up or gives an opinion. It means the token vector actually passes through that expert’s learned weights and produces an output. The experts that were not selected perform no forward pass for this token.

Finally, the router scores are also used as weights. The selected expert outputs are blended into one result, and that result continues to the next Transformer layer.

DeepSeek-V3 makes the difference concrete. It has **671 billion parameters in total**, but about **37 billion are active for each token**. In an MoE layer, its published configuration lists 256 routed experts, selects eight for a token, and includes one shared expert.

Think of a hospital only after seeing the mechanism: the building can contain many departments, while one patient visits only a few. But the experts are learned subnetworks, not tidy human departments named “math” or “coding.” The displayed scores and IDs are illustrative—we do not have the real router trace for this sentence.

So the benefit is not “free computation.” It is **more total capacity without making every token use all of that capacity**. The price is a harder routing and systems problem.

### 口述 — 中文

我们先看普通的**稠密模型**。在 Transformer 里面，每个 token 都会经过同一块前馈网络。里面的数值会因输入不同而变化，但路线和模块是固定的。这块网络做得越大，每个 token 都必须跑完更多计算。

现在保留同一个 Transformer 槽位，只改变里面的结构。**MoE 是 Mixture of Experts，专家混合。** 它把原来一块前馈网络换成许多块可选择的前馈网络，也就是“专家”，并增加一个路由器。

路由器本身也是训练出来的小神经网络。它会针对当前 token 给每个专家打分，再保留分数最高的少数几个。换一个 token，排名可能就不同。

这里最重要的是“**激活**”到底是什么意思。它不是专家亮了一下，也不是专家说了一句意见，而是 token 向量真的进入这块专家 FFN，与里面的权重做一次前向计算，产生一个输出。没有被选中的专家，这一次不参与计算。

最后，路由器的分数还会作为权重，把八个专家输出合成一个结果，再送入下一层 Transformer。

DeepSeek-V3 把这个差异变成了具体数字：它一共有 **6710 亿参数**，但处理每个 token 时，大约只有 **370 亿参数被激活**。在一个 MoE 层里，公开配置中有 256 个路由专家；每个 token 选择八个，同时还有一个共享专家。

看懂机制后，再把它类比成医院：医院里可以有很多科室，但一个病人只会去少数几个。不过，这些“专家”是训练出来的子网络，不一定能整齐地命名为“数学专家”或“代码专家”。屏幕上的分数和专家编号也是解释用示意，我们没有这句话真正的路由日志。

所以 MoE 的好处不是“计算免费”，而是：**模型可以拥有很大的总容量，却不要求每个 token 使用全部容量。** 代价是路由、负载均衡和跨设备通信都更难。

### Optional depth — English

The experts usually sit inside the feed-forward parts of a Transformer. The hard engineering problems include routing quality, balancing work across experts, and moving data efficiently between devices.

### 可选补充 — 中文

这些专家通常位于 Transformer 的前馈网络部分。真正困难的工程问题包括：怎样选对专家、怎样避免少数专家过忙，以及怎样在不同设备之间高效传输数据。

### Transition — English

MoE keeps a large model and activates less of it. Distillation takes the opposite route: keep selected behavior, but deploy a genuinely smaller model.

### 过渡 — 中文

MoE 的思路是保留一个很大的模型，但每次只激活其中一小部分。蒸馏则走了另一条路：保留选中的能力，同时真正部署一个更小的模型。

---

## Slide 3 — Knowledge Distillation

### On screen

- The exact same prompt goes to a separate teacher and student
- Teacher target and student attempt are compared token by token
- Mismatch → training loss → one small gradient update to the student’s weights
- One example expands into **800K samples curated with DeepSeek-R1**
- Training visibly changes **Qwen2.5-32B → R1-Distill-Qwen-32B**
- The teacher goes offline; a new question and official AIME scores appear only in the closed-book act

### Stage cues / 演示提示

- Click **Ask both models**. Read the teacher’s 80 and the student’s 90 as two separate outputs from the same prompt. / 点击 **Ask both models**；同一道题分别得到教师的 80 和学生的 90，这是两个独立模型的输出。
- Click **Measure the difference**. In the bright X-ray, compare the target token 80 with the student token 90 and point to the training loss. / 点击 **Measure the difference**；在明亮的 X-ray 中比较目标 token 80 与学生 token 90，并指出 training loss。
- Click **Update the student**. Watch only the student weights pulse; the illustrative probability moves from 22% to 23%, not from wrong to perfect. / 点击 **Update the student**；只有学生权重发生变化；示意概率从 22% 变成 23%，不是一次就从错误跳到完美。
- Click **Repeat at scale**. Watch the single example multiply into 800K curated samples and many small updates. / 点击 **Repeat at scale**；看单个例子扩展成 80 万条筛选样本和许多次小更新。
- Click **Close the textbook**. The teacher is marked offline before the new question appears. / 点击 **Close the textbook**；先看到教师离线，再出现一道新题。
- End on the AIME report card. The benchmark is evidence after the mechanism—not the definition of distillation. / 最后落在 AIME 成绩条；成绩是机制之后的证据，不是蒸馏的定义。
- Do not call it “21× cheaper.” Total parameter count and per-token compute are not the same comparison. / 不要说成“便宜 21 倍”；总参数量和每 token 的计算量不是同一个比较口径。

### Say — English

**Knowledge Distillation** means using a stronger teacher model to help train a smaller student model. The two models stay separate. What transfers is useful behavior—not a copy of the teacher’s architecture or weights.

Start with one prompt. The teacher generates a worked target: the method and the answer, 80. The smaller student sees the same prompt but currently predicts 90. During training, the system knows what target sequence it wants the student to produce.

Language models produce probabilities for the next token. Training compares the student’s probabilities with the target tokens. The mismatch becomes a number called **loss**. A gradient then tells us how to nudge the student’s weights so the target becomes slightly more likely next time.

One example creates one small nudge. The student does not memorize the teacher in one conversation, and it does not improve itself merely by asking a question. Training repeats this process over many examples. DeepSeek says the released Qwen distill models were fine-tuned with **800,000 samples curated with DeepSeek-R1**—answers and reasoning produced by the teacher, then selected as a curriculum.

We start with Qwen2.5-32B and update only the **student’s own weights**, producing R1-Distill-Qwen-32B. The 671B teacher is not copied into it. When training is over, the teacher can go offline; the student does not call it every time it answers.

Then both models take the same exams. On AIME 2024, the teacher scored 79.8 and the 32B student scored 72.6—about 91 percent of the teacher’s score. On MATH-500, the scores were 97.3 and 94.3; on other tests the gap is larger.

So distillation is a teaching process, not a ZIP compressor. A smaller student learns selected behavior from examples, but it does not automatically inherit everything the teacher knows or every safety property it has.

### 口述 — 中文

**Knowledge Distillation，知识蒸馏**，就是让一个更强的教师模型帮助训练一个更小的学生模型。两个模型始终是分开的。转移的是有用的行为，不是把教师的架构或权重完整复制一份。

先看一道题。教师生成一个带过程的目标答案，最后得到 80；较小的学生看到同一道题，但它现在预测的是 90。训练时，系统知道希望学生产生的是哪一串目标 token。

语言模型每一步其实是在给下一个 token 分配概率。训练会把学生的概率与目标 token 比较，差异变成一个叫做 **loss，损失**的数字。随后通过梯度，稍微调整学生的权重，让正确目标下一次出现的概率高一点。

一个例子只产生一次很小的推动。学生不会问一次问题就把教师记住，也不是靠聊天自动变聪明。训练需要在大量例子上重复这个过程。DeepSeek 公开说明，这批 Qwen 蒸馏模型使用了 **80 万条由 DeepSeek-R1 生成、再经过筛选整理的样本**进行微调，相当于教师先编教材。

我们从 Qwen2.5-32B 开始，只更新**学生自己的权重**，最后得到 R1-Distill-Qwen-32B。6710 亿参数的教师没有被复制进去。训练完成后，教师可以离线；学生每次回答时不需要再调用它。

最后，让教师和学生参加同一场考试。AIME 2024 上，教师是 79.8，320 亿参数学生是 72.6，大约保留了教师成绩的 91%。MATH-500 上是 97.3 对 94.3；其他考试的差距会更大。

所以蒸馏是一种教学过程，不是 ZIP 压缩。小模型通过样本学到教师的一部分行为，但不会自动继承教师的全部知识和所有安全表现。

### Optional depth — English

DeepSeek released six distilled checkpoints from 1.5B to 70B. Classic distillation may use probability distributions; modern language-model distillation may also use answers, datasets, or reasoning traces generated by the teacher.

### 可选补充 — 中文

DeepSeek 发布了六个蒸馏模型，规模从 15 亿到 700 亿参数。经典蒸馏可能学习教师给出的概率分布；现代语言模型蒸馏也可能使用教师生成的答案、数据集或推理轨迹。

### Optional pair synthesis — English

MoE and distillation solve the same business pressure in opposite ways. MoE keeps the giant library, but opens only a few shelves for each request. Distillation writes a smaller travel guide that carries the lessons we care about. One saves work inside a large model; the other creates a smaller model to use later. This is a useful pause if the two ideas are starting to blur together.

### 可选成组总结 — 中文

MoE 和蒸馏都在解决“模型太贵”这个压力，但方向相反。MoE 保留整座大图书馆，只让每个问题打开少数几排书架；蒸馏则把重要经验整理成一本更轻的旅行手册。前者是在大模型内部少算一点，后者是另外训练出一个更小的模型。如果两个概念开始混在一起，可以在这里稍停一下。

### Transition — English

The first two ideas ask how we can afford to use AI. The next question is different: if AI wants to act, how can it think about the result before it moves?

### 过渡 — 中文

前两个词都在回答“怎样让我们用得起 AI”。下一个问题不同：如果 AI 想采取行动，它怎样才能在动手之前，先想一想可能的结果？

---

## Slide 4, Acts 1–3 — World Model

### On screen

- A current observation that can be described, but three future frames are still blank
- A visible rule: **state now + action now → predicted state next**
- Several plausible futures and a loop that turns one predicted state into the next “now”
- Three common things a world model may predict: **pixels/video**, a **latent state**, or **objects/geometry**
- An official **Genie 3** recording as evidence after the mechanism is clear

### Stage cues / 演示提示

- Begin with the current frame. Point out that “robot on a street” describes a noun-filled snapshot, but does not answer what the arrow key will cause. / 先停在当前画面。指出“街上的机器人”只能描述一张充满名词的快照，却没有回答按下方向键会造成什么结果。
- Click **Predict one step**. Follow the formula, the three possible futures, and then the return loop. / 点击 **Predict one step**；顺着公式、三个可能未来，再看返回循环。
- Click **Show what gets built**. Read the three rows as three different canvases for the same job—not three separate definitions. / 点击 **Show what gets built**；把三行理解为完成同一任务的三种“画布”，而不是三个互不相关的定义。
- Let the Genie 3 recording run briefly. Then click **Give it a body**. / 让 Genie 3 录像播放一会儿，再点击 **Give it a body**。

### Say — English

A normal vision model can describe this frame: “There is a robot on a street.” But an agent needs a verb. If it moves forward, what changes next?

That is the basic job of a **world model**: learn a rough rulebook for how a situation changes after an action.

During training, you can show the model a scene and an action, ask it to predict the next moment, compare that prediction with what actually happened, and adjust it. Repeat this across many sequences, and the model starts learning patterns such as movement, persistence, and cause and effect.

Click once and we can see the planning idea. From the same current state, the model can imagine several possible futures. A planner can inspect those futures before choosing what to do. The selected prediction then becomes the next “now,” and the loop continues.

What exactly are people trying to build? There is no single format. Some systems predict visible pixels or video. Some predict a compressed internal state that only the AI reads. Others explicitly track objects, geometry, or motion. They look different, but they answer the same question: **if we do this, what is likely to happen next?**

The recording is Genie 3, an interactively generated world. It makes the idea visible, but the boundary matters: a world model is a useful rehearsal room, not guaranteed physics and not a perfect copy of reality.

### 口述 — 中文

普通视觉模型可以描述这张图：“街上有一个机器人。”但真正要行动的 AI 还缺一个“动词”：如果它向前走，接下来会发生什么？

这就是 **World Model，世界模型** 最核心的任务：学习一套粗略的规律，知道“在这个情况下做这个动作，场景接下来大概会怎样变化”。

训练时，可以把当前场景和一个动作交给模型，让它预测下一刻；再把预测和真实发生的下一刻比较，预测错了就调整。大量重复之后，模型会逐渐学到移动、物体持续存在，以及简单的因果关系。

点击之后，我们看到的是规划的思路：从同一个当前状态出发，先想象几个可能的未来。规划器可以在真正行动之前先看看这些后果。选中的预测又会成为新的“现在”，然后继续往下预测。

那大家到底在搭什么？答案并不只有一种。有的模型预测看得见的像素或视频；有的预测只有 AI 自己能读的压缩状态；还有的明确追踪物体、空间和运动。形式不同，但都在回答同一个问题：**如果这样做，接下来可能发生什么？**

右边是 Genie 3 的交互生成世界。它让“世界模型”变得很直观，但边界也很重要：它是 AI 的排练室，不是保证正确的物理规律，也不是现实世界的完美复制品。

### Optional depth — English

Genie 3 is a visible video-world example. Many planning-oriented world models never render a photorealistic movie; they only maintain the compact predictive state needed to choose an action.

### 可选补充 — 中文

Genie 3 属于可以直接看到的“视频世界”。很多用于规划的世界模型并不会渲染逼真的电影，只维护一套足够帮助 AI 选择动作的内部预测状态。

### Transition — English

The world model is the simulator. Now we need a driver.

### 过渡 — 中文

世界模型像模拟器。接下来，我们还需要一个真正控制身体的驾驶员。

---

## Slide 4, Acts 4–6 — VLA

### On screen

- The same instruction answered by an LLM in words and faced by a robot in a physical workcell
- Five extra burdens: **3D location, collision, force, timing, and body limits**
- A visible closed loop: **camera + language goal → VLA → action chunk → body → new camera frame**
- An official **Gemini Robotics 2** recording and a final “harder than chat” checklist

### Stage cues / 演示提示

- Start with the unequal sign. The sentence on the left is sensible, but it has not moved anything. / 从中间的不等号开始。左边这句话没有错，但它还没有让任何东西移动。
- Point across the five labels under the workcell; do not explain each one at length. / 顺着工作台下方五个标签扫过去即可，不必逐个展开很久。
- Click **Ground the instruction**. Follow only four large objects: live camera, language goal, VLA, and action chunks. / 点击 **Ground the instruction**；只顺着四个大对象看：实时摄像头、语言目标、VLA、动作片段。
- Point to the bottom feedback line: every movement creates a new observation and may require a correction. / 指一下底部反馈线：每个动作都会制造新的观察结果，也可能要求模型纠正。
- Click **Watch a real run**. End on the four reasons physical action is harder than chat. / 点击 **Watch a real run**；最后落在“为什么实体动作比聊天更难”的四个原因上。

### Say — English

VLA stands for **Vision-Language-Action**.

The left side shows why we need the final word. An LLM can answer, “Reach, grip, and lift.” That is a reasonable sentence. But the robot still has to find the object in 3D, avoid the obstacle, use the right force at the right time, and do all of that with the body it actually has.

So vision here is more than naming objects. The model must ground the instruction: which orange block, where is it relative to this arm, and what is in the way?

Language provides the goal. The VLA then produces actions—often a short chunk such as reach, align the wrist, close the gripper, and lift. These are body commands, not another paragraph.

And it cannot simply send the action and stop. Movement changes the camera image and the robot’s joint state. The model sees the result, notices if reality disagrees with the plan, and chooses the next action. That closed loop is one of the biggest differences from ordinary chat.

This is an official Gemini Robotics 2 recording. It shows the physical result, after the diagram has already explained the mechanism.

Why is VLA harder than an LLM? It must ground words in space, control many timed actions, keep reacting to feedback, and accept that an error can touch or damage the real world. Physical training data is also much slower and more expensive to collect than text.

A world model and a VLA can work together. The simulator asks, “What may happen next?” The driver asks, “What should this body do now?”

### 口述 — 中文

VLA 是 **Vision-Language-Action** 的缩写，也就是“视觉—语言—动作”。

左边解释了为什么最后那个 Action 非常重要。LLM 可以回答：“伸手、抓住、再抬起来。”这句话完全合理。但机器人仍然要知道物体在三维空间的什么位置，怎样避开障碍，用多大力度、什么时机抓，以及怎样用自己这副身体完成动作。

所以这里的视觉不只是“说出画面里有什么”。模型必须把指令落到真实场景：到底是哪一个橙色方块？它相对机械臂在哪里？中间有什么东西挡着？

语言给出目标。VLA 再输出动作，通常是一小段连续的身体指令，比如伸手、调整手腕、合上夹爪、抬起。这些是身体控制，不是另一段解释文字。

而且它不能把动作发出去就结束。机器人一动，摄像头画面和关节状态都会变化。模型要重新观察，发现现实是否和计划一致，再决定下一步动作。这种闭环反馈，是它和普通聊天很大的区别。

现在看到的是 Gemini Robotics 2 的官方录像。我们先用图解释机制，再用真实模型运行结果证明这不只是网页动画。

为什么 VLA 比 LLM 更难？它要把语言落到三维空间，要连续控制很多有时序的动作，要不断根据反馈纠正，而且错误真的可能碰坏现实中的东西。实体机器人的训练数据也比文字更慢、更贵。

世界模型和 VLA 可以配合。模拟器问：“接下来可能发生什么？”驾驶员问：“这副身体现在应该做什么？”

### Transition — English

Robots work in the physical world. Business AI works in another messy world: companies, data, permissions, workflows, and people. That brings us to a term that is not a model at all.

### 过渡 — 中文

机器人要进入物理世界；企业 AI 则要进入另一种同样复杂的世界——公司、数据、权限、流程和人。接下来这个词，完全不是一种模型。

---

## Slide 5 — FDE

### On screen

- **FDE — Forward Deployed Engineer**
- **Clean demo:** the model works because systems, permissions, workflow, and domain judgement are outside the frame
- **Monday collision:** real inputs expose a missing “fair-rental-day” field
- **Fault line:** Product Core ↔ **FDE** ↔ Customer Reality
- **Role difference:** same engineering toolbox; different position, scope, and success metric
- **Field loop:** correction → production trace → repeated pattern → targeted eval → reviewed fix
- Case evidence: **7,000 returns; returns reaching ≥75% correct fields rose from 25% to 86% in six weeks**
- Persistent boundaries: **FDE is a job, not a model; this is a team loop, not a lone hero.**

### Stage cues / 演示提示

- **0 — Demo / 演示：** point to the four crossed-out pieces of company reality, then click **Add the company**. / 指一下被排除在 demo 外的四类公司现实，然后点击 **Add the company**。
- **1 — Collision / 碰撞：** let the messy inputs land; point to the missing field and the practitioner correction, then click **Find the gap**. / 等杂乱输入落下；指向遗漏字段和税务人员的纠正，然后点击 **Find the gap**。
- **2 — Fault line / 断层：** read left → right: reusable product, last mile, real customer workflow. Point to the FDE bridge, then click **Compare the roles**. / 从左到右讲：通用产品、最后一公里、真实客户流程；指向中间的 FDE 桥梁，然后点击 **Compare the roles**。
- **3 — Roles / 角色：** compare success measures—not seniority. Product Engineer: broad reliability; FDE: adoption and workflow impact; Domain Expert: trusted correctness. Then click **Close the loop**. / 比较成功标准，而不是比较谁更高级：产品工程师看通用可靠性；FDE 看采用和业务流程效果；领域专家判断结果是否可信正确。然后点击 **Close the loop**。
- **4 — Payoff / 收益：** follow the correction through trace → pattern → eval → reviewed fix; only then read the published Tax AI numbers and click **Next: RSI**. / 顺着纠正一路讲到记录、模式、评测和审核后的修复；最后再读官方 Tax AI 数据，然后点击 **Next: RSI**。

### Say — English

FDE stands for **Forward Deployed Engineer**.

This one is different: FDE is a job, not a type of model.

Start with the clean demo on screen. One tidy document goes in, the model maps every field, and the result says PASS. It looks production-ready.

But notice what the demo removed: company systems, permissions, workflow, and professional judgement. The model may work perfectly while the company around it is still missing.

Now Monday arrives. The clean file becomes emails, spreadsheets, an old API, and a handwritten note. A field such as “fair rental days” is missed, and a tax practitioner corrects it. This is the important change: we are no longer testing only a model. We are testing a whole working system—model, data, access, workflow, and people.

That creates the fault line shown in the next scene. Product engineers usually build reusable capabilities that should work reliably for many customers. Customer experts understand their own rules and know what a correct result looks like. The difficult last mile sits between those two worlds.

An FDE works across that boundary. They learn the real workflow, write and integrate production code, help roll it out, watch how people use it, and carry field evidence back to the product team.

This does not mean an FDE is a “better” or more senior version of a product engineer. They often use the same engineering toolbox. The difference is their operating position and success measure. A product engineer is usually optimizing a reusable platform for broad reliability. An FDE owns a specific deployment end to end, so success means adoption and measurable workflow impact. The domain expert still owns the meaning of “correct.”

The benefit is not merely faster installation. A good field loop turns one production failure into reusable learning. The team keeps the production trace, checks whether the problem repeats, creates a targeted evaluation, proposes a fix, and reviews it before rollout. The original customer workflow improves, and the repeated pattern can also improve the product for others.

OpenAI’s Tax AI work with Crete accounting firms is a useful example. The published case mentions production failures involving fields such as “fair rental days.” The team used practitioner feedback, product traces, targeted evaluations, and engineering iteration as one loop.

The published case says Tax AI processed 7,000 returns. In six weeks, the share of returns reaching at least 75% correct field completion rose from 25% to 86%. The point is not that an FDE fixed everything alone. It is that practitioners, field engineers, product traces, evals, and engineering review formed one working loop.

So the short version is: models made the demo easier; FDEs help make the deployment real—and make its failures useful.

### 口述 — 中文

FDE 是 **Forward Deployed Engineer** 的缩写，通常翻译成“前向部署工程师”。

这个词和前面几个不一样：FDE 是一种职位，不是一种模型。

先看屏幕上的干净 demo：一份整齐的文件进去，模型把字段全部填好，结果显示 PASS，看起来已经可以上线了。

但请注意，这个 demo 悄悄拿掉了什么：公司的系统、权限、工作流程，还有专业人员的判断。模型可以表现得非常好，但模型周围的“公司现实”还完全没有进来。

接着星期一来了。干净文件变成邮件、表格、老旧 API 和手写备注。“公平出租天数”这样的字段被漏掉，税务人员把它纠正过来。这里最重要的变化是：我们测试的不再只是一个模型，而是一整套系统——模型、数据、权限、流程和人。

于是就出现了屏幕上的“断层”。产品工程师通常负责做可复用的能力，希望它能稳定服务许多客户；客户侧的领域专家最懂自己的规则，也知道什么结果才算正确。真正困难的最后一公里，就夹在这两个世界中间。

FDE 的工作位置横跨这条边界。他要理解客户的真实流程，写代码和做集成，帮助系统上线，观察大家到底怎么使用，再把现场证据带回产品团队。

这并不是说 FDE 比普通产品工程师“更高级”或“更厉害”。两者经常使用同一套工程能力。不同的是工作位置、负责范围和成功标准。产品工程师更关注通用平台能否大范围稳定工作；FDE 对某个真实部署负责到底，所以成功要看用户是否真的采用，以及业务流程有没有可衡量的改善。至于“什么才算正确”，仍然需要领域专家来判断。

它带来的好处也不只是更快安装。一条好的现场闭环，会把一次生产问题变成可复用的学习：团队保留当时的运行记录，确认问题是否反复出现，把它写成有明确答案的评测，再提出修复并经过审核。这样不但当前客户的流程会改善，反复出现的问题还可能变成平台能力，帮助其他客户。

OpenAI 与 Crete 旗下会计师事务所合作的 Tax AI，是一个很好理解的例子。官方文章提到过“fair rental days，也就是公平出租天数”这类生产问题。团队把税务人员反馈、产品运行记录、针对性评测和工程迭代连成了一条闭环。

官方案例称，Tax AI 共处理了 7,000 份税表。六周内，达到“至少 75% 字段正确”的税表比例，从 25% 上升到 86%。这里不是说一个 FDE 单枪匹马修好了一切，而是税务专家、现场工程师、产品记录、评测和工程审核真正形成了一条闭环。

所以最短的总结是：模型让 demo 变容易；FDE 让部署变真实，也让部署中的失败变得有用。

### Optional depth — English

The role is historically associated with Palantir. Company definitions vary, but the meaningful version owns real production work and outcomes—not only consulting or sales demos. Its renewed popularity suggests that deployment knowledge has become a competitive advantage.

### 可选补充 — 中文

从历史上看，这个职位与 Palantir 关系很深。不同公司的定义会有差别，但真正有意义的 FDE 会负责生产系统和实际结果，而不只是咨询或售前演示。这个职位重新流行，也说明“怎样真正完成部署”本身已经成为一种竞争优势。

### Transition — English

Today, people such as FDEs deliberately close the feedback loop. The final question is how much of the improvement loop AI itself could eventually close.

### 过渡 — 中文

今天，FDE 这样的角色仍然由人来主动闭合反馈回路。最后一个问题是：这条改进 AI 的回路，未来有多少部分能够由 AI 自己闭合？

---

## Slide 6 — RSI

### On screen

- **RSI — Recursive Self-Improvement**
- **Not RSI:** correcting one answer changes the output, not the AI builder
- **Bounded method:** humans lock the goal and evaluator; AI generates candidates
- **Evolutionary loop:** generate → run → verify → score → select → repeat
- **Real effect:** AlphaEvolve improved one Gemini training kernel by **23%**, reducing overall training time by **1%**
- **AI R&D ladder:** code and infrastructure → specified experiments → research direction
- **Full RSI requirement:** Model N improves the builder → builder creates Model N+1 → Model N+1 becomes better at improving the next builder
- Persistent boundary: **Full RSI remains unproven and is not inevitable.**

### Stage cues / 演示提示

- **0 — Not yet / 还不是：** point from the same AI to the corrected answer, then to the unchanged builder. Click **Open the builder**. / 从同一个 AI 指到被修正的答案，再指向完全没变的 AI 工厂；然后点击 **Open the builder**。
- **1 — Bounded builder / 有边界工厂：** point to the two locks first—human goal and evaluator—then follow AI → candidate belt → evaluator → score. Click **Release candidates**. / 先指两个锁：人定义的目标和评测；再按 AI → 候选方案传送带 → 评测器 → 分数来讲。点击 **Release candidates**。
- **2 — Selection / 筛选：** follow Patch B into the correctness gate and reject it despite 69 ms; then follow Patch C through both gates to **NEW BEST**. Click **Install the winner**. / 看 Patch B 虽然只有 69 ms，却在正确性门口被拒绝；再看 Patch C 通过两道门成为 **NEW BEST**。点击 **Install the winner**。
- **3 — Real effect / 真实效果：** show where the winning patch lands—the training kernel—then read the official +23% → −1% numbers. Walk down the AI R&D ladder and click **Ask what recurses**. / 先指出获胜代码被装进训练 kernel，再读官方 +23% → −1% 数据；随后从上到下讲 AI 研发阶梯，点击 **Ask what recurses**。
- **4 — Full RSI? / 完整 RSI？：** read left to right: Model N → AI builder → Model N+1. Trace the return arrow and land on lasting, inherited, and compounding. End at **UNPROVEN**. / 从左到右讲 Model N → AI 工厂 → Model N+1；再沿回程箭头说明“长期改变、下一代继承、继续放大”，最后落在 **UNPROVEN**。

### Say — English

RSI stands for **Recursive Self-Improvement**. This is the most speculative term in the talk, so we should begin by removing a common misunderstanding.

Suppose an AI notices that its answer is wrong and changes “42 days” to “46 days.” The answer improved, but the model and the process that built it did not change. That is self-correction, not RSI.

The “builder” means the wider process used to create AI: data, code, training methods, evaluations, and infrastructure. RSI asks whether AI can improve that process, so that the next AI inherits the improvement.

Today we can already build a smaller, bounded version of this loop. Humans choose the goal: make one piece of training code faster. Humans also define the evaluator: the output must stay correct and the runtime must go down.

Inside that box, AI generates many candidate programs. An automatic evaluator actually runs them, checks the answer, measures the time, and gives each one a score. The best verified candidate becomes the seed for the next round. This is similar to evolution: generate variation, test it, select what works, and repeat.

The evaluator is the crucial part. A candidate that runs in 69 milliseconds looks impressive, but if it gives the wrong answer, it is rejected. The AI does not survive because it claims to be better; it survives because an external test can measure the improvement.

AlphaEvolve is a useful real example of this method. It uses language models to propose programs, automatic evaluators to verify and score them, and an evolutionary process to keep improving promising ideas. Google DeepMind reports that it made one kernel used in Gemini training 23% faster, which reduced overall training time by 1%.

That result is real and valuable—but look at exactly what improved. A training tool became faster. The current model did not suddenly rewrite its own mind or become independently smarter. The benefit was less time and compute for the same training job.

The ladder on screen shows the wider direction. AI can already write code and operate infrastructure. It is increasingly good at running an experiment when people specify the question and success measure. The harder step is research judgement: choosing which problem matters, which result to trust, and what should be tried next. Humans still play a major role there.

Now we can define **full RSI** precisely. Model N would improve the AI builder. That improved builder would create Model N+1. Model N+1 would have to inherit the benefit and become better at improving the builder for Model N+2. The improvement must be lasting, inherited, and compounding.

We have not demonstrated that self-sustaining successor loop, and it is not inevitable. If it did work, it could accelerate AI research—but mistakes, bad goals, and weak evaluation could compound too. So the useful question is not simply “Did the AI improve something?” It is: “Did it change the builder, did the next generation inherit the change, and can the loop continue?”

### 口述 — 中文

RSI 是 **Recursive Self-Improvement** 的缩写，也就是“递归自我改进”。

这是整场分享里最偏未来的一个词，所以先排除一个常见误解。

假设 AI 发现自己的答案错了，把“42 天”改成“46 天”。答案确实变好了，但是模型本身，以及制造这个模型的方法都没有改变。这叫自我纠错，还不是 RSI。

这里说的“制造者”或者“AI 工厂”，指的是创造 AI 的整套流程：数据、代码、训练方法、评测和基础设施。RSI 问的是：AI 能不能改进这套流程，让下一代 AI 继承这个改进。

今天，我们已经可以做出一条更小、更有边界的改进闭环。人先规定目标：让某段训练代码跑得更快。人也规定评测标准：输出必须保持正确，而且运行时间要下降。

在这个框里，AI 会生成许多候选程序。自动评测器会真的把它们跑起来，检查结果，测量时间，再给每个方案打分。经过验证的最佳方案，会成为下一轮的起点。这很像进化：先产生变化，再测试，选择有效的，继续重复。

这里最关键的是评测器。一个 69 毫秒的方案看起来很厉害，但如果答案错了，照样会被拒绝。方案不是因为 AI 自己说“我更好了”就留下来，而是因为外部测试真的测出了改进。

AlphaEvolve 是这种方法的一个真实例子。它让语言模型提出程序，用自动评测器验证和打分，再通过类似进化的过程继续改进有希望的方案。Google DeepMind 表示，它让 Gemini 训练中使用的一个计算内核加速了 23%，从而让整体训练时间减少 1%。

这个效果是真实而且有价值的，但我们要看清楚，到底是什么变好了：一个训练工具变快了。当前模型并没有突然重写自己的大脑，也没有自动变成更聪明的自己。它带来的直接好处，是同样的训练工作消耗更少时间和算力。

屏幕右下角的阶梯展示了更大的方向。AI 已经能够写代码、操作基础设施；当人给出明确问题和成功标准时，它也越来越擅长执行实验。更难的一步是科研判断：应该研究什么，什么结果值得相信，下一步尝试什么。今天，这部分仍然高度依赖人。

现在就可以准确解释 **完整 RSI** 了：Model N 改进 AI 工厂；改进后的工厂制造出 Model N+1；Model N+1 不但要继承这次改进，还必须更擅长改进制造 Model N+2 的工厂。也就是说，改进必须是长期的、能够被下一代继承，而且能够继续放大。

我们还没有证明这样一条能自行持续的“下一代闭环”，它也不是必然会出现。如果它真的成立，AI 研发速度可能大幅加快；但错误的目标、糟糕的评测和系统缺陷也可能一起被放大。所以更有用的问题不是“AI 有没有改进某个东西”，而是：“它有没有改动制造者，下一代有没有继承，而且循环还能不能继续？”

### Optional depth — English

RSI describes a possible mechanism. An “intelligence explosion” is one possible result if that loop speeds up dramatically. A “singularity” is a broader idea about major technological and social change. The three terms are related, but not interchangeable.

### 可选补充 — 中文

RSI 描述的是一种可能的机制；如果这个循环突然高速增强，“智能爆炸”是可能出现的一种结果；“技术奇点”则是一个更宽泛的概念，指向巨大的技术和社会变化。三者有关，但不能混为一谈。

### Optional pair synthesis — English

FDE and RSI are both loop stories, but the owner of the loop is different. In FDE, people carry failures from the field back into product work. In today’s bounded AI-improvement systems, people still choose the goal and the evaluator while AI searches inside that box. Full RSI asks whether AI could eventually improve the builder itself and close a much wider loop. The useful question is not “Is it self-improving?” but “Who chose the goal, the test, and the boundary?”

### 可选成组总结 — 中文

FDE 和 RSI 讲的都是闭环，但闭环的主人不同。FDE 中，是人把现场失败带回产品；今天这些有边界的 AI 改进系统里，也仍然由人定义目标和评测，AI 只在框内搜索。完整 RSI 追问的是：AI 将来能否改进“制造者本身”，并闭合更大的循环。所以更有用的问题不是“它会不会自我改进”，而是“目标、测试和边界到底是谁定的”。

### Transition — English

These six terms are very different, but they share one story: each appeared when AI ran into a different kind of hard problem.

### 过渡 — 中文

这六个词其实非常不同，但它们讲的是同一件事：每当 AI 撞上一种新的难题，往往就会出现一个新词。

---

## Slide 7 — The Bottleneck Keeps Moving

### On screen

- Three bottleneck shifts: **scale better → touch the world → close the loop**
- A moving AI term passes through three gates: **Problem → Proof → Boundary**
- If you can answer all three, you can explain the idea without hiding behind its acronym.
- **The acronym is the label. The bottleneck is the story.**

### Stage cues / 演示提示

- No clicks / 无需点击：let one or two terms travel through the scanner, then point from left to right across the three gates. / 让一两个词自动经过扫描器，再从左到右指过三道扫描门。
- Do not read every label / 不要逐字念：use the top rail only to reconnect the six concepts, then spend the final beat on the reusable three-question method. / 上方三段只用来串回六个概念，最后把重点留给可复用的三个问题。

### Say — English

Let us put the six terms back into one picture. They are really three shifts in where the bottleneck sits.

First, compute efficiency: **MoE** routes the work, and **distillation** compresses useful behavior into something smaller.

Second, contact with the world: **world models** predict consequences, and **VLA** turns perception and language into action.

Third, real-world loops: **FDE** closes the gap between a demo and a working system, while **RSI** asks whether improvement itself could become a compounding loop.

The bottleneck moved each time—and a new label appeared around it.

So when the next impressive acronym arrives, do not start with the letters. Put it through this little scanner.

First: **Problem**. What bottleneck created this term?

Second: **Proof**. What actually works today—not just in the promise?

Third: **Boundary**. What is still missing, fragile, expensive, or controlled by humans?

If you can answer all three, you understand the concept well enough to explain it without hiding behind the acronym. There is no need to panic—or immediately add it to your LinkedIn profile.

The acronym is only the label. The interesting story is the bottleneck hiding behind it.

### 口述 — 中文

最后，我们把六个词重新放回一张图里。它们其实对应了三次“瓶颈位置”的迁移。

第一，算力效率：**MoE** 负责把任务分流，**知识蒸馏**则把有用的行为压缩到更小的模型里。

第二，接触真实世界：**世界模型**预测行动的后果，**VLA**把感知和语言变成动作。

第三，真实世界的闭环：**FDE**弥合演示和真正可用系统之间的差距；**RSI**则追问，“改进”本身能不能变成一个持续增强的循环。

每一次，都是瓶颈先移动，然后新的标签才出现。

所以下次再冒出一个听起来很厉害的新缩写，不要先研究那几个字母，先把它放进这个小小的扫描器。

第一道：**Problem，问题**。是什么瓶颈催生了这个词？

第二道：**Proof，证据**。今天真正已经能做到什么，而不只是宣传里承诺什么？

第三道：**Boundary，边界**。还有什么做不到、不稳定、太昂贵，或者仍然必须由人控制？

如果这三个问题都能回答，你就已经理解了这个概念，而且不需要躲在缩写后面。当然，也不用一看到新词就立刻把它加进 LinkedIn 简介。

缩写只是标签。真正有意思的，是藏在它后面的那个瓶颈。

---

## Primary sources

- [DeepSeek-V3 Technical Report](https://arxiv.org/abs/2412.19437)
- [Distilling the Knowledge in a Neural Network](https://research.google/pubs/distilling-the-knowledge-in-a-neural-network/)
- [DeepSeek-R1 paper](https://arxiv.org/abs/2501.12948)
- [Google DeepMind — Genie 3](https://deepmind.google/blog/genie-3-a-new-frontier-for-world-models/)
- [Google DeepMind — Gemini Robotics 2](https://deepmind.google/blog/gemini-robotics-2-brings-whole-body-intelligence-to-robots/)
- [OpenAI — Forward Deployed Engineer](https://openai.com/careers/forward-deployed-engineer-%28fde%29-sf-san-francisco/)
- [OpenAI — Building self-improving tax agents with Codex](https://openai.com/index/building-self-improving-tax-agents-with-codex/)
- [Anthropic — When AI builds itself](https://www.anthropic.com/institute/recursive-self-improvement)
- [Google DeepMind — AlphaEvolve](https://deepmind.google/blog/alphaevolve-a-gemini-powered-coding-agent-for-designing-advanced-algorithms/)
