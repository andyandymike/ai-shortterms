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

## Slide 1 — Six Terms, Three Shifts

### On screen

- **AI KEEPS INVENTING NEW TERMS.**
- A brief storm of real AI acronyms
- **Six terms. Three shifts.**
- **From bigger to smarter:** MoE · Distillation
- **From answers to actions:** World Model · VLA
- **From shipping to learning:** FDE · RSI

### Stage cues / 演示提示

- No clicks / 无需点击：let the acronym storm land before speaking past the joke; press **R** if you want to replay it. / 先让“缩写风暴”把笑点落下来；需要重播时按 **R**。
- Once it settles / 动画归位后：move from top to bottom across the three shift rails; do not read every acronym. / 从上到下讲三条变化轨道，不要逐个念缩写。

### Say — English

AI moves fast. Its vocabulary sometimes seems to move even faster—and the AI naming department never appears to take a day off.

If you stop following AI for a month, you do not just miss a new model. You come back to a bowl of alphabet soup: MoE, VLA, FDE, RSI—and everyone talks as if these words have always existed.

But these six terms are not six unrelated trends. They fit into three larger shifts.

First, from bigger to smarter: how do we get more useful capability without paying for the whole model every time? That gives us MoE and distillation.

Second, from answers to actions: how does AI predict what happens next and then act in the world? That gives us world models and VLA.

Third, from shipping to learning: how does an AI system improve after it meets real users, real workflows, and eventually its own building process? That gives us FDE and RSI.

For each term, we will keep the questions simple: what does it stand for, why did it appear, what problem does it solve, how does it work, and where can we see it today?

### 口述 — 中文

AI 世界日新月异，但有时候，它的词汇更新得比技术本身还快——而且 AI 的“命名部门”似乎从来不休息。

一个月没关注 AI，你错过的可能不只是新模型。等你回来，面前已经是一碗“字母汤”：MoE、VLA、FDE、RSI。更神奇的是，大家说起这些词，好像它们一直都存在。

不过，今天这六个词并不是六条互不相关的热点。它们可以归到三次更大的变化里。

第一，从“更大”走向“更聪明地使用能力”：怎样不必每次都为整个模型买单？这就是 MoE 和知识蒸馏。

第二，从“回答问题”走向“预测和行动”：AI 怎样判断接下来会发生什么，又怎样真的动起来？这就是 World Model 和 VLA。

第三，从“把产品交付出去”走向“让系统持续学习”：AI 遇到真实用户、真实流程，甚至自己的制造过程之后，怎样继续改进？这就是 FDE 和 RSI。

每个词我们只问几个简单问题：缩写是什么，为什么会出现，解决什么问题，机制怎样工作，以及今天在哪里已经能看到它。

### Transition — English

Let us start with a strange idea: a model can become much larger without using all of itself every time.

### 过渡 — 中文

我们先从一个有点反直觉的想法开始：一个模型可以变得非常大，却不必每次都动用它的全部能力。

---

## Slide 2 — MoE

### Story rule / 讲述规则

Use one metaphor from beginning to end: **a large company handling one small task slip**. The screen supplies the objects and numbers; the speaker supplies the analogy. Each step has one conclusion only. From Step 2 to Step 6, the same yellow task slip stays on screen.

从头到尾只用一个比喻：**一家大公司处理一张小任务单**。屏幕负责呈现对象、数字和变化，讲者负责讲比喻；每一步只讲一个结论。从第二步到第六步，同一张黄色任务单始终留在画面中。

### Step 1 — Name

**On screen / 画面：** **MoE** expands into **Mixture of Experts**. / **MoE** 展开为 **Mixture of Experts**。

**口述 — 中文：**

“第一个词是 **MoE**，全称 **Mixture of Experts，专家混合**。这里的 Expert 不是一个完整 chatbot，而是模型里面的一块计算能力。为什么要把很多 Expert 混在一起？先看看普通的稠密模型怎么工作。”

**Say — English:**

“Our first term is **MoE: Mixture of Experts**. An expert is not a complete chatbot; it is one compute block inside the model. Why keep many of them? First, let us look at a conventional dense model.”

**Point / 指向：** Point to **MoE**, then follow the three letters as they expand. / 先指 **MoE**，再跟着三个字母展开。

**Click / 点击：** **Show the dense model**.

### Step 2 — Dense

**On screen / 画面：** One highlighted token becomes a yellow task slip; the whole compute block lights up. / 一个高亮 token 变成黄色任务单，完整计算模块全部亮起。

**口述 — 中文：**

“语言模型不断预测下一个 token。你可以把黄色 token 想成一张任务单，把模型想成一家公司。稠密模型的规则是：每来一张任务单，同一整块计算都要参与，就像任务再小，也让全公司一起上班。”

**Say — English:**

“A language model keeps predicting the next token. Think of the yellow token as a task slip and the model as a company. In a dense model, the same full compute block works on every token—like calling the whole company for every small task.”

**Point / 指向：** Follow the highlighted token to the task slip, then sweep across all lit windows. / 从高亮 token 指到任务单，再扫过全部亮起的窗口。

**Click / 点击：** **Add more capacity**.

### Step 3 — Cost

**On screen / 画面：** The building expands. The task slip stays the same size, but every new window also lights up and the compute bill rises. / 大楼继续扩建；任务单没有变大，但新增窗口也全部亮起，计算账单同步上涨。

**口述 — 中文：**

“我们当然希望模型懂得更多，所以不断把公司做大。问题是，公司每扩一层，每张小任务单都要多叫一层人来上班。能力增加了，但每次处理任务的成本也跟着增加。”

**Say — English:**

“We make the company larger because we want more capability. But every new floor joins every tiny task. Capacity grows, and the cost of each task grows with it.”

**Point / 指向：** Keep one hand on the unchanged task slip; with the other, follow the growing building and bill. / 一边指着没有变大的任务单，一边沿大楼和账单的增长方向移动。

**Click / 点击：** **Switch to MoE**.

### Step 4 — Route

**On screen / 画面：** The building stays large. Only eight office windows turn red; the other windows go quiet. / 大楼保持原来的规模；只有八个办公室窗口亮成红色，其余窗口安静下来。

**口述 — 中文：**

“MoE 不把公司缩小，而是加了一个调度员，也就是 Router。它看一眼当前 token，从 256 个可用 Expert 里挑 8 个。你可以把 Expert 理解成公司里的计算小组：这次只把任务发给最合适的少数小组。”

**Say — English:**

“MoE does not shrink the company. It adds a dispatcher—the router. For this token, the router selects 8 of 256 available expert blocks. In the company analogy, only a small set of teams receives this task.”

**Point / 指向：** Hold on the unchanged outline of the whole building, then point to the eight red windows and the quiet grey windows. / 先强调大楼轮廓完全没变，再指八个红色窗口和其余安静的灰色窗口。

**Click / 点击：** **Open the selected experts**.

### Step 5 — Run

**On screen / 画面：** One selected office is opened as a simple three-part sequence: task in, work happens, note out. The unselected offices remain still. / 画面打开一个被选中的办公室，用三个动作展示：任务进去、真正工作、短笺出来；没被选中的办公室保持静止。

**口述 — 中文：**

“所以，‘激活八个专家’没有听起来那么神秘。它只是说：这八个小组真的拿到任务、开始计算；其他小组这一次不用工作。它们不是八个人分别回答完整问题，而是在模型处理这一小步时，各自加工同一张任务单。”

**Say — English:**

“So ‘activating eight experts’ is less mysterious than it sounds. Those eight teams actually receive the task and compute; the others do no work this time. They are not answering the whole question independently—they are helping with this one small step.”

**Point / 指向：** Follow the slip into the enlarged office and the note coming out; then briefly point to the motionless offices. / 跟着任务单进入放大的办公室，再跟着短笺出来；最后快速指一下没有动作的办公室。

**Click / 点击：** After one complete “in → compute → out” cycle, click **Combine their outputs**. / 等一次完整的“进入—计算—输出”动作结束后，点 **Combine their outputs**。

### Step 6 — Combine

**On screen / 画面：** Eight outputs travel into one result; the full expert pool remains visible. / 八份输出汇成一份结果，完整 Expert 池仍留在画面中。

**口述 — 中文：**

“最后，这 8 个 Expert 的输出会合成一个结果，再交给下一层。模型仍然拥有 256 个 Expert 的总容量，但这个 token 只支付 8 个 Expert 的计算成本。现在我们看看现实里哪些模型这样做。”

**Say — English:**

“The 8 expert outputs are combined into one result and passed to the next layer. The model keeps the capacity of 256 experts, while this token pays the compute cost of only 8. Now let us see where this is used.”

**Point / 指向：** Follow the eight outputs into **8 → 1**, then point back to **8 called in / 248 quiet**. / 跟着八份输出汇入 **8 → 1**，再指回 **8 called in / 248 quiet**。

**Click / 点击：** **Show real models**.

### Step 7 — Examples

**On screen / 画面：** Three model names with **total parameters → active parameters per token**. / 三个模型，以及各自的**总参数 → 每个 token 激活参数**。

**口述 — 中文：**

“这些不是概念模型，而是采用 MoE 架构的真实模型。以 DeepSeek-V3 为例，它总共有 6710 亿参数，但每个 token 大约激活 370 亿。Qwen3 MoE 和 Kimi K2 也采用类似思路。这里不用记数字，只看同一个模式：总容量很大，每次只运行其中一部分。”

**Say — English:**

“These are real models built with MoE. DeepSeek-V3 has 671 billion parameters in total, but activates about 37 billion for each token. Qwen3 MoE and Kimi K2 use the same broad idea. Do not memorize the numbers; notice the pattern: large total capacity, smaller active compute.”

**Point / 指向：** Read the first row only, then sweep down the matching **total → active** pattern. / 只读第一行，再向下扫过三组一致的 **total → active** 关系。

**Click / 点击：** **Replay MoE** restarts this MoE story and never changes the deck slide. To continue to Distillation, use the global bottom-right slide arrow. / **Replay MoE** 只会重播 MoE，不会翻到下一张；要进入 Distillation，请使用页面右下角的全局翻页箭头。

### Optional backup — English

- In implementation terms, the “teams” are usually alternative feed-forward networks inside Transformer layers.
- The “dispatcher” is a learned router. It scores the experts and keeps a small Top-K for each token.
- “Working” means the token representation actually passes through the selected experts’ learned weights.
- The selected outputs are combined using routing weights. The on-screen paths are illustrative, not a real routing trace for the displayed sentence.
- DeepSeek-V3 also has a shared expert. Sparse activation saves per-token computation; it does not remove the need to store the full model. Practical challenges include load balancing and communication between devices.
- The application rows use published model configurations: DeepSeek-V3 has 671B total and 37B active parameters per token; Qwen3-235B-A22B has 235B total and 22B active; Kimi K2 has 1T total and 32B active. These numbers are useful backup, not the main spoken story.

### 可选补充 — 中文

- 技术上，“小组”通常是 Transformer 层内部可选择的前馈网络，也就是 FFN。
- “调度台”是训练出来的 Router。它会给专家打分，再为每个 token 保留排名最高的少数几个，也就是 Top-K。
- “小组开始工作”意味着 token 的表示真的通过被选中专家的权重进行计算。
- 被选中的输出会按照路由权重合并。屏幕上的路径只是解释用示意，并不是这句话真实的路由日志。
- DeepSeek-V3 还有共享专家。稀疏激活减少的是每个 token 的计算量，不代表完整模型不需要存储。真正的工程难点还包括负载均衡和设备之间的通信。
- 应用卡片使用公开模型配置：DeepSeek-V3 是 671B 总参数、每 token 激活 37B；Qwen3-235B-A22B 是 235B 总参数、激活 22B；Kimi K2 是 1T 总参数、激活 32B。这些数字只作为被追问时的补充，不是主讲内容。

### Transition — English

MoE is already shipping inside real products: keep the large company, but call in only a small team. But what if we cannot afford the large company at all? That leads to Distillation: keep selected behavior, but deploy a genuinely smaller model.

### 过渡 — 中文

所以，MoE 已经藏在真实产品下面：保留一家大公司，但每次只叫一支小团队。可如果我们连这家大公司都部署不起呢？这就到了下一种思路——知识蒸馏：保留想要的能力，但真正部署一个更小的模型。

---

## Slide 3 — Knowledge Distillation

### Story rule / 讲述规则

Use one support-team story from beginning to end: a senior teacher prepares lessons for a junior student, then leaves before the student goes on duty. The screen shows what changes at each step; the speaker keeps returning to one boundary: **the teacher helps during training, while the student runs alone after deployment**.

从头到尾只讲一个客服团队的故事：资深教师先为新人学生准备教材，学生学会以后，教师离场，学生独立值班。每一步只解释屏幕上刚发生的变化，并始终守住一个边界：**教师参与训练，部署后由学生独立运行**。

### Step 1 — Name

**On screen / 画面：** A **large teacher** makes lessons for a separate **small student**; the student is labelled “trained separately · runs alone.” / 一个**大教师**为另一个独立的**小学生**制作教材；学生旁边明确写着“独立训练、独立运行”。

**口述 — 中文：**

“第二个词是 **Knowledge Distillation，知识蒸馏**。它不是把同一个大模型压成一个小文件，而是让能力强的大模型做教师，准备教材，再训练另一个更小的学生模型。就像资深客服先教新人；真正上线值班的是新人，不是两个人一直同时接电话。”

**Say — English:**

“Our second term is **Knowledge Distillation**. It does not squeeze one large model into a smaller file. A capable large model acts as the teacher, creates lessons, and trains a separate smaller student. Think of a senior support agent teaching a junior colleague: after training, the junior takes the desk alone.”

**Point / 指向：** Follow **LARGE TEACHER → LESSONS → SMALL STUDENT**, then stop on **runs alone**. / 沿着 **大教师 → 教材 → 小学生** 指过去，最后停在 **runs alone**。

**Click / 点击：** **Why distill?**

### Step 2 — Why

**On screen / 画面：** The teacher keeps **high capability**, but **high cost / call** blocks it from four deployment targets: private phone, offline laptop, controlled on-premise system, and one million requests. / 教师仍然能力很强，但**单次调用成本高**，因此难以覆盖四种部署目标：隐私手机、离线笔记本、受控本地环境和一百万次请求。

**口述 — 中文：**

“为什么不让教师到处直接回答？因为产品不只追求最强答案，还要考虑成本、设备、隐私和请求量。蒸馏把昂贵能力放在训练阶段使用：教师先准备教材，再把更容易部署的小学生送到很多地方。”

**Say — English:**

“Why not use the teacher everywhere? Because a product needs more than the strongest answer. It also faces cost, device, privacy, and volume limits. Distillation spends the expensive intelligence during training, then deploys the smaller student many times.”

**Point / 指向：** Point from **HIGH CAPABILITY** to **HIGH COST / CALL**, cross the **DEPLOYMENT LIMIT**, then sweep across the four targets. / 从 **HIGH CAPABILITY** 指到 **HIGH COST / CALL**，跨过 **DEPLOYMENT LIMIT**，再扫过四个部署目标。

**Click / 点击：** **Try the student**.

### Step 3 — Miss

**On screen / 画面：** A VPN ticket contains positive words—“Fantastic” and “Love”—but describes another failure during a client demo. The student follows the surface words and answers **PRAISE — “Glad to hear it!”** / 一张 VPN 工单用了“Fantastic”和“Love”这样的正面词，却描述了客户演示时再次断线。学生只跟着表面词语走，判断成**表扬**并回复“很高兴听到这个消息”。

**口述 — 中文：**

“先让学生自己试一次。它看见 ‘Fantastic’ 和 ‘Love’，就以为客户在表扬；但 ‘again’ 和 ‘client demo’ 告诉我们，这其实是一句带讽刺的投诉。学生认识单词，却漏掉了整句话的意图。这个工单是为演示编写的，不是任何真实模型公开的训练样本。”

**Say — English:**

“First, let the student try. It sees ‘Fantastic’ and ‘Love’ and predicts praise. But ‘again’ and ‘client demo’ reveal a sarcastic complaint. The student recognizes the words but misses the intent. This ticket is invented for the demonstration; it is not a disclosed training sample from any of the models shown later.”

**Point / 指向：** Point first to **Fantastic · Love**, then to **again · client demo**, and finish on the red **WRONG** answer. / 先指 **Fantastic · Love**，再指 **again · client demo**，最后停在红色的 **WRONG** 答案上。

**Click / 点击：** **Ask the teacher**.

### Step 4 — Lesson

**On screen / 画面：** The teacher marks the contradiction between positive words and repeated failure, then writes a worked lesson with **INTENT**, **WHY**, and **ACTION**. / 教师标出正面词语与重复故障之间的矛盾，再写出包含 **意图、原因、行动** 的完整教材。

**口述 — 中文：**

“教师不只给一个‘投诉’标签，而是把答案变成可学习的教材：客户的意图是什么，为什么这样判断，客服下一步该怎么做。学生因此看到的不只是结论，还有线索和处理方式。”

**Say — English:**

“The teacher does more than label the message ‘complaint.’ It turns the answer into a worked lesson: what the customer means, why that reading is correct, and what support should do next. The student can learn the clues and the response pattern, not only the final label.”

**Point / 指向：** Trace **positive words + repeated failure → CONTRADICTION = SARCASM**, then move down **INTENT → WHY → ACTION**. / 沿着 **正面词 + 重复故障 → CONTRADICTION = SARCASM** 指过去，再依次指 **INTENT → WHY → ACTION**。

**Click / 点击：** **Train on many**.

### Step 5 — Train

**On screen / 画面：** Three varied lessons pass through training. One **PRAISE ≠ COMPLAINT** comparison creates a **small update**; after many lessons, the student's rule changes from “positive word → praise” to “context → contradiction → intent.” / 三份不同说法的教材进入训练。一次 **表扬 ≠ 投诉** 的比较只产生一次**小调整**；经过大量教材后，学生的规则从“正面词 → 表扬”变成“上下文 → 矛盾 → 意图”。

**口述 — 中文：**

“一份教材不会让学生立刻学会。每次训练都把学生的猜测和教师教材比较，不一致就让学生的内部参数做一点小调整。再用很多不同说法重复这个过程，学生才会逐渐丢掉‘正面词等于表扬’的坏捷径，学会结合上下文判断意图。”

**Say — English:**

“One lesson is not enough. Each training step compares the student's guess with the teacher lesson, and a mismatch makes one small update to the student. Repeating this across many varied examples gradually replaces the bad shortcut—positive word means praise—with a better habit: read context, contradiction, and intent.”

**Point / 指向：** Sweep across the lesson cards, follow **PRAISE ≠ COMPLAINT** down to **SMALL UPDATE**, then compare the **BEFORE** and **AFTER MANY LESSONS** rows. / 扫过教材卡片，沿 **PRAISE ≠ COMPLAINT** 指到 **SMALL UPDATE**，再对比 **BEFORE** 与 **AFTER MANY LESSONS**。

**Click / 点击：** **Remove the teacher**.

### Step 6 — Alone

**On screen / 画面：** The **large teacher is offline**. A new ticket about an expired reset link appears, and the **small student runs alone**, recognizes the complaint, and gives a useful response. / **大教师已经离线**。一张关于重置链接过期的新工单出现，**小学生独立运行**，识别出投诉并给出合适回应。

**口述 — 中文：**

“现在把教师拿走。新工单换了问题，也换了措辞，但学生仍能独立识别出客户在抱怨，并给出处理建议。这才是蒸馏的关键边界：如果每个线上请求仍要去问教师，那只是两个模型串在一起；蒸馏后的学生把学到的行为留在自己的参数里，部署后自己工作。”

**Say — English:**

“Now remove the teacher. The new ticket uses a different problem and different wording, yet the student recognizes the complaint and responds on its own. This is the key boundary: if every live request still calls the teacher, we only have a two-model system. A distilled student carries the learned behavior in its own weights and works by itself after deployment.”

**Point / 指向：** Point to **TEACHER — OFFLINE**, move to **NEW MESSAGE · NEVER SEEN**, then finish on **SMALL STUDENT — RUNS ALONE** and **CORRECT READ**. / 先指 **TEACHER — OFFLINE**，再移到 **NEW MESSAGE · NEVER SEEN**，最后停在 **SMALL STUDENT — RUNS ALONE** 和 **CORRECT READ**。

**Click / 点击：** **Show real models**.

### Step 7 — Examples

**On screen / 画面：** Three real examples show different uses of distillation: Apple Foundation Model **→ ~3B on-device**, Gemma 2 **27B teacher → 2B / 9B**, and DeepSeek-R1 lessons **→ 1.5B–70B distilled models**. / 三个真实案例展示蒸馏的不同用途：Apple Foundation Model **→ 约 3B 端侧模型**，Gemma 2 **27B 教师 → 2B / 9B**，以及 DeepSeek-R1 教材 **→ 1.5B–70B 蒸馏模型**。

**口述 — 中文：**

“这不只是一个课堂比喻。Apple 在约 30 亿参数的端侧基础模型训练中使用了知识蒸馏；Google 用 27B 教师训练 Gemma 2 的 2B 和 9B 模型；DeepSeek 用 R1 生成的推理数据训练出一组更小的蒸馏模型。它们不是同一种配方，也不能把箭头都理解成同一种压缩比例。共同点是：部署前由教师来教，部署后由学生独立服务。”

**Say — English:**

“This is not only a classroom metaphor. Apple used knowledge distillation while training its roughly three-billion-parameter on-device foundation model. Google used a 27B teacher for Gemma 2's 2B and 9B models. DeepSeek used reasoning data from R1 to train a family of smaller distilled models. These are different recipes, so the arrows do not mean one identical compression ratio. The shared pattern is simple: teach before deployment; serve without the teacher.”

**Point / 指向：** Read the Apple row once, then sweep across the three different goals: **on-device**, **open + edge**, and **reasoning**. / 先读一遍 Apple 这一行，再扫过三个不同目标：**on-device、open + edge、reasoning**。

**Click / 点击：** **Replay Distill** resets only the Distillation story and never changes the deck slide. To continue to World Model, use the global bottom-right slide arrow. / **Replay Distill** 只会重置并重播 Distillation，不会翻到下一张；要进入 World Model，请使用页面右下角的全局翻页箭头。

### Transition — English

The first two ideas ask how we can afford to use AI. The next question is different: if AI wants to act, how can it think about the result before it moves?

### 过渡 — 中文

前两个词都在回答“怎样让我们用得起 AI”。下一个问题不同：如果 AI 想采取行动，它怎样才能在动手之前，先想一想可能的结果？

---

## Slide 4 — World Model

### Story rule / 讲述规则

Keep one street robot on screen from beginning to end. First show the difference between **reading the present** and **predicting a change**; then let the audience watch the model learn, imagine several futures, and use them before the real robot moves. The robot is a visual analogy, not a claim that every world model looks like this.

从头到尾只跟随同一台街道机器人。先说明**看懂现在**和**预测变化**的区别，再让观众看到模型怎样学习、想象几种未来，并在真实机器人行动前利用这些预测。这台机器人只是帮助理解的视觉比喻，并不是说所有世界模型都长这样。

### Step 1 — Name

**On screen / 画面：** Three columns make one comparison: a language model predicts the **next word**, a vision model recognizes **what is here**, and a world model predicts **what happens next after an action**. / 三栏完成一次对比：语言模型预测**下一个词**，视觉模型识别**眼前有什么**，世界模型预测**采取动作后会发生什么**。

**口述 — 中文：**

“第三个词不是缩写，叫 **World Model，世界模型**。LLM 最典型的动作是预测下一段文字；视觉模型可以认出眼前的机器人、道路和路缘。世界模型再往前问一步：如果机器人现在向前走，局面会怎样变化？可以把它理解成 AI 脑中的一个简化模拟器。”

**Say — English:**

“Our third term is not an acronym: **World Model**. An LLM typically predicts the next piece of text. A vision model can recognize the robot, road, and curb in front of it. A world model asks one step further: if the robot moves now, how might the situation change? Think of it as a simplified simulator inside the AI.”

**Point / 指向：** Move across **NEXT WORD → WHAT IS HERE → WHAT HAPPENS NEXT**, then follow **NOW + ACTION → NEXT**. / 依次指向 **NEXT WORD → WHAT IS HERE → WHAT HAPPENS NEXT**，最后顺着 **现在 + 动作 → 下一刻** 指过去。

**Click / 点击：** **Why predict?**

### Step 2 — Why

**On screen / 画面：** The left side correctly finds **robot, road, curb**. The right side asks what will follow from turning left, going straight, or turning right—and recognition alone leaves all three as question marks. / 左边正确找到**机器人、道路、路缘**；右边追问左转、直行或右转以后会怎样，而单靠识别，这三个结果仍然都是问号。

**口述 — 中文：**

“看见路缘当然有用，但机器人真正要行动时，还得知道‘如果我这样走，会发生什么’。同一张画面里，左转可能绕远，直走可能接近目标，右转可能撞上路缘。这里不是说多模态模型完全不会推理，而是强调：**识别现在**和**预测动作的后果**是两个不同任务。”

**Say — English:**

“Seeing the curb is useful, but an acting robot also needs to ask, ‘What may happen if I move this way?’ From the same scene, left may be a detour, straight may approach the goal, and right may hit the curb. This does not mean multimodal models cannot reason. It highlights that **recognizing the present** and **predicting an action's consequence** are different jobs.”

**Point / 指向：** First point to the three objects on the left, then move across the question mark to the three unanswered actions. / 先指左边识别出的三个物体，再越过中间的问号，指向右边三个尚未回答的动作。

**Click / 点击：** **Watch it learn**.

### Step 3 — Learn

**On screen / 画面：** One experience becomes four beats: **WATCH** the current scene and action, **GUESS** the next scene, **CHECK** it against reality, then **ADJUST**. / 一段经历被拆成四拍：**看**当前场景和动作，**猜**下一刻，拿预测与现实**核对**，然后**调整**。

**口述 — 中文：**

“它怎么学？先给它看很多真实经历：当时看到了什么、做了什么、后来发生了什么。训练时先把结局遮住，让模型自己猜；再揭开真实结果，比较哪里不一样，做一次小调整。大量重复以后，它会越来越会预测变化。屏幕上的节奏就是：**看、猜、核对、调整**。”

**Say — English:**

“How does it learn? Give it many recorded experiences: what was visible, what action happened, and what came next. During training, hide the ending and let the model guess. Then reveal reality, compare the two, and make a small adjustment. Repeated many times, it becomes better at predicting change. The rhythm on screen is **watch, guess, check, adjust**.”

**Point / 指向：** Follow the numbered path **01 WATCH → 02 GUESS → 03 CHECK → 04 ADJUST**, then point to **many real sequences**. / 沿编号指过 **01 看 → 02 猜 → 03 核对 → 04 调整**，最后指向 **many real sequences**。

**Click / 点击：** **Try three actions**.

### Step 4 — Futures

**On screen / 画面：** The real robot remains at **SAME START** while the model imagines three branches: left is safe but off goal, straight is safe and toward the goal, and right touches the curb. / 真实机器人仍停在**同一个起点**，模型在想象中分出三条路：左转安全但偏离目标，直行安全且接近目标，右转会碰到路缘。

**口述 — 中文：**

“学会预测以后，就可以做有趣的事：让同一个现在接上三个不同动作，看看会出现哪三个未来。注意，现实中的机器人一次也没有动；移动的只是模型里的想象。它可以先在脑中试错，再决定现实里要走哪一步。”

**Say — English:**

“Once it can predict, something useful becomes possible: attach three different actions to the same present and imagine three different futures. Notice that the real robot has not moved at all. Only the model's imagined futures move. It can make mistakes in simulation before choosing one action in reality.”

**Point / 指向：** Stop on **REALITY HAS NOT MOVED**, then sweep across the three futures and their different outcomes. / 先停在 **REALITY HAS NOT MOVED**，再扫过三个未来以及各自不同的结果。

**Click / 点击：** **Plan before moving**.

### Step 5 — Plan

**On screen / 画面：** Three imagined routes are compared with the blue goal. Route B is selected, but reality executes only **one upward action** before looking again. / 三条想象路线根据蓝色目标进行比较。系统选择路线 B，但现实中只执行**向上的一步**，随后重新观察。

**口述 — 中文：**

“一个动作的预测还不够，它可以继续往后想几步，组成几条可能路线。系统比较哪条更安全、哪条更接近目标，然后只执行最佳路线的第一步。走完再看一次现实，再重新规划。就像 GPS 会规划整条路，但车每开一段，都要根据真实位置更新。”

**Say — English:**

“One predicted move is not enough, so it can imagine several moves ahead and form possible routes. The system compares which route is safer and closer to the goal, then executes only the first move from the best one. It looks again and replans—like GPS planning the journey but updating after each real segment.”

**Point / 指向：** Compare routes **A, B, C**, stop on **SELECT B**, then point to **EXECUTE IN REALITY — ONE ACTION**. / 对比路线 **A、B、C**，停在 **SELECT B**，最后指向 **EXECUTE IN REALITY — ONE ACTION**。

**Click / 点击：** **What does it build?**

### Step 6 — Form

**On screen / 画面：** The same job appears in two forms: a **visible future** made of pixels or video, and a **hidden predictive state** that records only useful facts such as position, curb distance, and goal progress. / 同一个任务出现两种形式：由像素或视频组成的**可见未来**，以及只记录位置、路缘距离、目标进度等有用信息的**隐藏预测状态**。

**口述 — 中文：**

“世界模型到底搭出什么？有些会生成一段我们能看的未来视频；另一些不会画画，只在内部保留一组预测状态。两种形式都可以有用。如果问题只是‘这一步是否安全、是否更接近目标’，模型不必画出漂亮的天空，只要保留做决定需要的信息。”

**Say — English:**

“What does a world model actually build? Some generate a future that people can watch as pixels or video. Others do not draw a picture; they keep a hidden predictive state. Both can be useful. If the question is simply, ‘Is this move safe and closer to the goal?’ the model does not need a beautiful sky. It needs the information required for the decision.”

**Point / 指向：** Compare **VISIBLE FUTURE** with **HIDDEN FUTURE**, then bring both back to the shared question at the bottom. / 对比 **VISIBLE FUTURE** 和 **HIDDEN FUTURE**，再把两边都带回底部那个共同问题。

**Click / 点击：** **Show real systems**.

### Step 7 — Examples

**On screen / 画面：** Two research examples mirror the previous comparison: **Genie 3** makes an interactive generated environment visible, while **V-JEPA 2** supports robot planning through a hidden predictive state. Three uses appear below: safer agent training, “what if” tests, and robot planning. / 两个研究案例对应上一页的两种形式：**Genie 3** 把可交互的生成环境变得可见，**V-JEPA 2** 则通过隐藏的预测状态支持机器人规划。下方列出三种用途：更安全地训练智能体、测试“如果……会怎样”、规划机器人动作。

**口述 — 中文：**

“真实研究也走在这两条路上。**Genie 3** 把预测出来的环境做成可以观看和交互的世界；**V-JEPA 2** 不需要生成视频，而是在内部状态里比较机器人动作。它们的形式不同，但用途很接近：先模拟、先测试、先规划，再让系统进入现实。这些仍是研究系统，不是已经复制出完整物理世界。”

**Say — English:**

“Real research follows both paths. **Genie 3** makes a predicted environment visible and interactive. **V-JEPA 2** does not need to generate video; it compares robot actions in a hidden state. The forms differ, but the purpose is similar: simulate, test, and plan before a system acts in reality. These are still research systems, not complete copies of physics.”

**Point / 指向：** Let the Genie 3 video play, compare **VISIBLE WORLD** with **HIDDEN WORLD**, then sweep across the three uses below. / 让 Genie 3 视频播放，比较 **VISIBLE WORLD** 与 **HIDDEN WORLD**，最后扫过下方的三种用途。

**口述收束 / Closing line：** “World Model asks, ‘What may happen next?’ The next term, VLA, asks, ‘What should this body do now?’” / “World Model 问‘接下来可能怎样’，下一个词 VLA 问‘这副身体现在该怎么动’。”

**Click / 点击：** **Replay World Model** resets only this seven-step story and remains on the World Model slide. To continue to VLA, use the global bottom-right slide arrow. / **Replay World Model** 只会重置并重播这七步，仍然停在 World Model 页；要进入 VLA，请使用页面右下角的全局翻页箭头。

---

## Slide 5 — VLA

### Atlas mode — seven-step story / Atlas 模式——七步故事

Use one instruction from beginning to end: **“Put the orange block in the tray.”** First unpack the hidden physical work, then show how demonstrations and feedback teach the model to act. / 从头到尾只使用一句指令：**“Put the orange block in the tray.”** 先拆开一句话背后隐藏的身体工作，再说明示范和现实反馈怎样教会模型行动。

#### Step 1 — Name

**On screen / 画面：** **Vision** sees the block, tray, and obstacle; **Language** supplies the goal; **Action** starts moving the robot arm. The formula below joins them as **V + L → VLA → A**. / **视觉**看到方块、托盘和障碍；**语言**给出目标；**动作**开始驱动机械臂。下方公式把它们连成 **V + L → VLA → A**。

**口述 — 中文：**

“VLA 是 **Vision-Language-Action，视觉—语言—动作**。视觉回答‘眼前有什么’，语言告诉机器人‘我要什么’，最后的 Action 则回答‘这副身体现在该怎么动’。所以它不只是看懂或回答，而是把场景和目标变成真实动作。”

**Say — English:**

“VLA stands for **Vision-Language-Action**. Vision answers, ‘What is here?’ Language tells the robot what we want. Action answers, ‘What should this body do now?’ A VLA therefore turns a scene and a goal into physical movement, rather than only describing them.”

**Point / 指向：** Move across **VISION → LANGUAGE → ACTION**, then trace the formula **V + L → VLA → A**. / 依次指向 **VISION → LANGUAGE → ACTION**，再沿下方公式 **V + L → VLA → A** 指过去。

**Click / 点击：** **Why is that hard?**

#### Step 2 — Why

**On screen / 画面：** The instruction **“Put the orange block in the tray”** is only one sentence, but the body still asks: which object, what path, how much force, and when to stop? / 指令 **“Put the orange block in the tray”** 只有一句话，但身体仍要回答：抓哪个、走哪条路、用多大力、什么时候停？

**口述 — 中文：**

“这句话已经把目标说得很清楚，但没有告诉机械臂具体怎么完成。它得找到正确方块，绕开障碍，选择抓取位置和力度，还得知道什么时候松手。语言只说了**要什么**；身体必须自己解决**怎么做**。”

**Say — English:**

“The sentence states the goal clearly, but it does not tell the arm how to complete it. The robot must find the correct block, avoid the obstacle, choose a grip and force, and know when to release. Language says **what** we want; the body must still decide **how**.”

**Point / 指向：** Start on **1 SENTENCE**, then point through **WHICH? → HOW? → ENOUGH?**, ending on **WHAT versus HOW**. / 从 **1 SENTENCE** 开始，再依次指向 **WHICH? → HOW? → ENOUGH?**，最后停在 **WHAT 与 HOW** 的对比上。

**Click / 点击：** **Unpack the task**.

#### Step 3 — Steps

**On screen / 画面：** The same instruction unfolds into six coordinated moves: **FIND, REACH, ALIGN, GRIP, LIFT, PLACE**. / 同一句指令展开为六个相互配合的动作：**找到、伸手、对准、抓住、抬起、放下**。

**口述 — 中文：**

“把这句话真正交给身体，就会展开成一串动作：先找到橙色方块，绕过障碍伸手，对准手和方块，用合适的力度抓住，保持抓取抬起来，最后放进托盘。人类一句话说完的目标，机器人要靠六个连续动作完成。”

**Say — English:**

“Give the sentence to a body and it unfolds into a sequence: find the orange block, reach around the obstacle, align the hand, grip with enough force, lift while holding it, and place it in the tray. One spoken goal becomes six coordinated movements.”

**Point / 指向：** Follow the numbered chain **FIND → REACH → ALIGN → GRIP → LIFT → PLACE**, then finish on **1 GOAL → 6 COORDINATED MOVES**. / 沿编号指过 **FIND → REACH → ALIGN → GRIP → LIFT → PLACE**，最后停在 **1 GOAL → 6 COORDINATED MOVES**。

**Click / 点击：** **How does it learn?**

#### Step 4 — Learn

**On screen / 画面：** A recorded robot demonstration becomes a five-part lesson: **WATCH** the scene and goal, **HIDE** the expert's next move, **GUESS**, **CHECK** against the expert, and **ADJUST**. / 一段录制好的机器人示范变成五步教材：**看**场景和目标、**藏住**专家下一步、让模型**猜**、与专家动作**核对**、再做**调整**。

**口述 — 中文：**

“它怎么学会这一串动作？先录下人类操控机器人完成任务的示范。训练时让模型看场景和目标，但藏住专家下一步，让它自己猜；再揭开专家动作，比较两者差异，做一次小调整。用很多真实示范重复‘看、藏、猜、对、改’，模型就会越来越会选下一步。”

**Say — English:**

“How does it learn the sequence? Record people controlling robots to complete tasks. During training, show the model the scene and goal but hide the expert's next move. Let it guess, reveal the expert action, compare the two, and adjust. Repeating **watch, hide, guess, check, adjust** across many demonstrations improves its next move.”

**Point / 指向：** Trace **01 WATCH → 02 HIDE → 03 GUESS → 04 CHECK → 05 ADJUST**, then point to **many recorded robot demonstrations**. / 沿着 **01 看 → 02 藏 → 03 猜 → 04 核对 → 05 调整** 指过去，最后指向 **many recorded robot demonstrations**。

**Click / 点击：** **Let reality answer**.

#### Step 5 — Feedback

**On screen / 画面：** The robot acts, but the block slips. The next camera frame shows the failure, so the next action shifts left and re-grips. / 机器人先采取动作，但方块滑落。下一帧画面暴露了失败，因此下一个动作改为向左调整并重新抓取。

**口述 — 中文：**

“学会动作以后，也不能一口气做到底。这里机械臂抓了一下，但方块滑了；下一帧画面把失败告诉系统，于是它改变下一步，调整位置再抓。VLA 的工作节奏是：**先动一点，再看一眼，再纠正**。这里是网页示意，不是官方机器人录像。”

**Say — English:**

“Even after training, the robot should not commit to one long motion. Here it acts, but the block slips. The next camera frame reveals the failure, so the next action shifts and re-grips. The rhythm is **act a little, look again, correct**. This scene is our webpage illustration, not official robot footage.”

**Point / 指向：** Start on **THE BLOCK SLIPPED**, follow **REALITY ANSWERS**, then finish on **SHIFT LEFT · RE-GRIP** and the loop **ACT → LOOK → CORRECT**. / 从 **THE BLOCK SLIPPED** 开始，沿 **REALITY ANSWERS** 指过去，最后停在 **SHIFT LEFT · RE-GRIP** 和 **ACT → LOOK → CORRECT** 循环上。

**Click / 点击：** **Why is this harder than chat?**

#### Step 6 — Hard

**On screen / 画面：** A **bad word** can be corrected with undo; a **bad motion** has already touched the obstacle. Below are three practical difficulties: space, timing and force, and costly real-world data plus safety. / 一个**错字**可以撤销修改；一个**错误动作**却已经碰到障碍。下方列出三个现实难题：空间、时机与力度，以及昂贵的真实数据和安全要求。

**口述 — 中文：**

“这就是 VLA 比聊天更难的地方。错字可以删掉重写，但机械臂撞到东西时，接触已经发生。它必须理解物体在哪里，控制什么时候动、用多大力，还要依赖采集缓慢而昂贵的真实机器人示范，同时保证安全。”

**Say — English:**

“This is why VLA is harder than chat. A bad word can be deleted and rewritten; when an arm hits an obstacle, the contact has already happened. The model must understand where things are, control timing and force, and learn from slow, costly physical demonstrations while remaining safe.”

**Point / 指向：** Compare **BAD WORD — UNDO** with **BAD MOTION — CONTACT ALREADY HAPPENED**, then sweep across the three constraints below. / 对比 **BAD WORD — UNDO** 与 **BAD MOTION — CONTACT ALREADY HAPPENED**，再扫过下方三个限制。

**Click / 点击：** **See a real system**.

#### Step 7 — Example

**On screen / 画面：** Official **Gemini Robotics 2** footage plays beside three roles—see the scene, follow the goal, control the body—and its current availability: **private preview for early-access partners**. / **Gemini Robotics 2** 官方视频播放；旁边对应三项能力——看场景、跟随目标、控制身体——并明确写出当前状态：**private preview，仅向 early-access partners 开放**。

**口述 — 中文：**

“最后看一个真实例子：这是 **Gemini Robotics 2** 的官方画面，展示视觉、语言和身体控制怎样结合，也展示 VLA 已经能控制机械臂、双臂机器人和完整人形机器人。目前 VLA 仍是 private preview，只向 early-access partners 开放；这不代表它已经是能完成所有家务的通用机器人，也不能从这一小段视频推断它在任何环境都能成功。”

**Say — English:**

“Finally, this is official **Gemini Robotics 2** footage. It shows vision, language, and body control coming together across robot arms, bi-arm robots, and full humanoids. The VLA is currently in private preview for early-access partners. It is not yet a general-purpose home robot, and one clip does not prove success in every environment.”

**Point / 指向：** Let the video play, then move down **VISION → LANGUAGE → ACTION** and stop on **AVAILABILITY — PRIVATE PREVIEW**. / 让视频先播放，再依次指向 **VISION → LANGUAGE → ACTION**，最后停在 **AVAILABILITY — PRIVATE PREVIEW**。

**口述收束 / Closing line：** “Robots enter the physical world. Enterprise AI enters another messy world made of data, permissions, workflows, and people. The role that helps connect AI to that world is our next term: **FDE**.” / “机器人进入物理世界；企业 AI 则进入由数据、权限、流程和人组成的另一个复杂世界。帮助 AI 接入这个世界的角色，就是下一个词：**FDE**。”

**Click / 点击：** **Replay VLA** resets only this seven-step story and remains on the VLA slide. To continue to FDE, use the global bottom-right slide arrow. / **Replay VLA** 只会重置并重播这七步，仍然停在 VLA 页；要进入 FDE，请使用页面右下角的全局翻页箭头。

### Exhibit mode — existing three-step notes / Exhibit 模式——原三步讲稿

### On screen

- The same instruction answered by an LLM in words and faced by a robot in a physical workcell
- Four questions a sentence cannot answer: **where, clear path, how hard, when to stop**
- A visible control loop: **observe → act → check → correct**
- A failed check: **block slipped → re-grip 4 cm left → try again**
- An official **Gemini Robotics 2** recording and a final “harder than chat” checklist

### Stage cues / 演示提示

- Start with the unequal sign. The sentence on the left is sensible, but it has not moved anything. / 从中间的不等号开始。左边这句话没有错，但它还没有让任何东西移动。
- Point across the four questions around the workcell; do not explain each one at length. / 顺着工作台周围四个问题扫过去即可，不必逐个展开很久。
- Click **Ground the instruction**. Follow only four large objects: live camera, language goal, VLA, and action chunks. / 点击 **Ground the instruction**；只顺着四个大对象看：实时摄像头、语言目标、VLA、动作片段。
- On the failed check, read only three things: **BLOCK SLIPPED**, both answers are **NO**, and **RE-GRIP 4 CM LEFT**. / 失败检查出现后只读三处：**BLOCK SLIPPED**、两个 **NO**，以及 **RE-GRIP 4 CM LEFT**。
- Click **Watch a real run**. Finish on **OBSERVE → ACT → CHECK → CORRECT** and **THE HARD PART IS REALITY**. / 点击 **Watch a real run**；最后落在 **OBSERVE → ACT → CHECK → CORRECT**，以及 **THE HARD PART IS REALITY**。

### Say — English

VLA stands for **Vision-Language-Action**.

The left side shows why we need the final word. An LLM can answer, “Reach, grip, and lift.” That is a reasonable sentence. But the robot still has to find the object in 3D, avoid the obstacle, use the right force at the right time, and do all of that with the body it actually has.

So vision here is more than naming objects. The model must ground the instruction: which orange block, where is it relative to this arm, and what is in the way?

Language provides the goal. The VLA then produces actions—often a short chunk such as reach, align the wrist, close the gripper, and lift. These are body commands, not another paragraph.

And it cannot simply send the action and stop. Here the block slips. The check says the target was not reached and the grasp is not stable. That failed result becomes the next observation, so the system shifts the grip four centimetres left and tries again. This observe, act, check, and correct loop is one of the biggest differences from ordinary chat.

This is an official Gemini Robotics 2 recording. It shows the physical result, after the diagram has already explained the mechanism.

Why is VLA harder than an LLM? It must ground words in space, control many timed actions, keep reacting to feedback, and accept that an error can touch or damage the real world. Physical training data is also much slower and more expensive to collect than text.

A world model and a VLA can work together. The simulator asks, “What may happen next?” The driver asks, “What should this body do now?”

### 口述 — 中文

VLA 是 **Vision-Language-Action** 的缩写，也就是“视觉—语言—动作”。

左边解释了为什么最后那个 Action 非常重要。LLM 可以回答：“伸手、抓住、再抬起来。”这句话完全合理。但机器人仍然要知道物体在三维空间的什么位置，怎样避开障碍，用多大力度、什么时机抓，以及怎样用自己这副身体完成动作。

所以这里的视觉不只是“说出画面里有什么”。模型必须把指令落到真实场景：到底是哪一个橙色方块？它相对机械臂在哪里？中间有什么东西挡着？

语言给出目标。VLA 再输出动作，通常是一小段连续的身体指令，比如伸手、调整手腕、合上夹爪、抬起。这些是身体控制，不是另一段解释文字。

而且它不能把动作发出去就结束。这里方块滑掉了；检查结果显示“目标没有到达、抓取也不稳定”。这个失败结果会变成下一次观察，于是系统把抓取位置向左调整 4 厘米，再试一次。观察、行动、检查、纠正，这条闭环是它和普通聊天很大的区别。

现在看到的是 Gemini Robotics 2 的官方录像。我们先用图解释机制，再用真实模型运行结果证明这不只是网页动画。

为什么 VLA 比 LLM 更难？它要把语言落到三维空间，要连续控制很多有时序的动作，要不断根据反馈纠正，而且错误真的可能碰坏现实中的东西。实体机器人的训练数据也比文字更慢、更贵。

世界模型和 VLA 可以配合。模拟器问：“接下来可能发生什么？”驾驶员问：“这副身体现在应该做什么？”

### Transition — English

Robots work in the physical world. Business AI works in another messy world: companies, data, permissions, workflows, and people. That brings us to a term that is not a model at all.

### 过渡 — 中文

机器人要进入物理世界；企业 AI 则要进入另一种同样复杂的世界——公司、数据、权限、流程和人。接下来这个词，完全不是一种模型。

---

## Slide 6 — FDE

### Atlas mode — seven-step story / Atlas 模式——七步故事

Follow one illustrative company failure from beginning to end: **SOURCE 46 → SYSTEM BLANK**. The number itself is not important. It simply lets the audience see how an FDE carries a real workflow problem back into reusable product work. / 从头到尾只跟随一个公司现场故障：**来源是 46，系统结果却是空白**。数字本身不重要，它只是让观众看清 FDE 怎样把真实工作流的问题带回产品，并留下可复用的改进。

#### Step 1 — Name

**On screen / 画面：** An **AI product** built for many customers sits on the left; one **live company** with its own data, permissions, and people sits on the right. The **FDE** works between both, labelled **JOB · NOT A MODEL**. / 左边是为很多客户打造的 **AI 产品**，右边是一家拥有自己数据、权限和人员的**真实公司**；中间的 **FDE** 同时和两边工作，并明确标注 **这是一种职位，不是模型**。

**Chinese / 中文口述：** “FDE 是 **Forward Deployed Engineer，前向部署工程师**。它是一种职位，不是一种 AI 模型。可以想象公司买来一台很聪明的标准机器，但自己的厂房有不同的插头、门禁和工作方法。FDE 就是走进现场、同时懂产品和公司的人，负责让这台机器真的接得上、跑得起来。”

**English / English script:** “FDE stands for **Forward Deployed Engineer**. It is a job, not an AI model. Imagine a company receives a very smart standard machine, but its factory has different plugs, doors, and ways of working. The FDE goes into that environment, works with both the product and the company, and helps make the machine actually run there.”

**Point / 指向：** Move from **AI PRODUCT** through **FDE** to **LIVE COMPANY**, then stop on **JOB · NOT A MODEL**. / 从 **AI PRODUCT** 沿着 **FDE** 指向 **LIVE COMPANY**，最后停在 **JOB · NOT A MODEL**。

**Click / 点击：** **Why does AI need one?**

#### Step 2 — Why

**On screen / 画面：** A clean demo produces a **good answer**, but it hits a company **reality wall** made of access, approval, workflow, and ownership. The answer never enters the live process. / 一个干净的 Demo 得到**正确答案**，却撞上由权限、审批、工作流和负责人组成的公司**现实墙**，答案始终没有进入真实流程。

**Chinese / 中文口述：** “Demo 里，一份干净文件交给 AI，很快得到漂亮答案。但公司真正使用时，还要读到正确系统、经过审批、写回业务流程，并且有人负责结果。模型已经答对，公司却仍然用不上。FDE 要解决的不是再做一个更漂亮的 Demo，而是打通这堵现实墙。”

**English / English script:** “In a demo, one clean file goes into AI and a good answer comes out. Inside a company, that answer still needs the right access, approval, workflow, and owner before anyone can use it. The model answered correctly, but the company still cannot act on it. The FDE's job is to cross that reality wall.”

**Point / 指向：** Follow **ONE FILE → AI → GOOD ANSWER**, let the answer hit **REALITY WALL**, then finish on **ANSWER NOT IN THE WORKFLOW**. / 顺着 **ONE FILE → AI → GOOD ANSWER** 指过去，让答案撞上 **REALITY WALL**，最后停在 **ANSWER NOT IN THE WORKFLOW**。

**Click / 点击：** **Enter the real workflow**.

#### Step 3 — Workflow

**On screen / 画面：** One value travels through **EMAIL “PAY IN 46 DAYS” → SPREADSHEET 46 → AI 46 ✓ → APPROVAL APPROVED → LIVE SYSTEM BLANK**. The FDE follows the route end to end until **SOURCE 46 ≠ PRODUCTION BLANK** becomes visible. / 一个付款期限依次经过 **邮件“46 天内付款” → 表格 46 → AI 识别为 46 → 审批通过 → 线上系统空白**。FDE 沿整条路线追踪，直到 **来源 46 ≠ 生产系统空白** 清楚出现。

**Chinese / 中文口述：** “现在进入真实工作流。邮件写着 46 天内付款，表格里是 46，AI 也正确读出 46，审批也通过了，但最终系统却是空白。所以‘AI 项目失败’不一定是模型不会，有可能是最后写回时把值丢了。FDE 像追快递一样，一站一站检查，找出 46 到底消失在哪里。”

**English / English script:** “Now enter the real workflow. The email says ‘pay in 46 days,’ the spreadsheet contains 46, the AI reads 46 correctly, and approval passes—but the live system is blank. An ‘AI failure’ is not always a model failure; the value may disappear during the handoff. The FDE tracks it like a parcel, checking every stop to find where 46 was lost.”

**Point / 指向：** Follow all five numbered stops, then move down to **SOURCE 46 ≠ PRODUCTION BLANK**. / 沿着五个编号节点逐一指过去，再移到下方的 **SOURCE 46 ≠ PRODUCTION BLANK**。

**Click / 点击：** **Follow one failure**.

#### Step 4 — Evidence

**On screen / 画面：** The vague complaint **“The AI got it wrong”** becomes three concrete facts: **SOURCE 46**, **OUTPUT BLANK**, and **EXPERT 46 ✓**. Together they form one reproducible rule: if the source is 46, the output must include 46. / 模糊抱怨 **“AI 搞错了”** 被拆成三项具体事实：**来源 46、系统输出为空、专家确认 46 正确**。三者合在一起，形成一条可重现规则：来源是 46，输出就必须包含 46。

**Chinese / 中文口述：** “‘AI 错了’只是一句抱怨，产品团队不知道该修什么。FDE 把现场信息整理成证据：原始资料是什么、系统实际输出什么、业务专家认为什么才正确。这样，问题就从一句情绪变成一条任何工程师都能重现和检查的案例。”

**English / English script:** “‘The AI got it wrong’ is only a complaint; the product team still does not know what to fix. The FDE turns the field report into evidence: the original source, the actual system output, and the answer confirmed by an expert. The complaint becomes a case that engineers can reproduce and check.”

**Point / 指向：** Start with **NOT REPRODUCIBLE**, then combine **SOURCE 46 + OUTPUT BLANK + EXPERT 46 ✓** into the **REPRODUCIBLE CASE**. / 从 **NOT REPRODUCIBLE** 开始，再把 **SOURCE 46 + OUTPUT BLANK + EXPERT 46 ✓** 合到 **REPRODUCIBLE CASE**。

**Click / 点击：** **Who owns what?**

#### Step 5 — Roles

**On screen / 画面：** Three partners surround the same problem: the **Product Engineer** builds reusable capability, the **FDE** makes this workflow work and reach adoption, and the **Domain Expert** defines what correct means. / 三种合作角色围绕同一个问题：**产品工程师**打造可供很多客户复用的能力，**FDE** 让这条具体工作流跑通并被采用，**领域专家**定义什么才算正确。

**Chinese / 中文口述：** “FDE 不是‘更高级的普通工程师’，这三种角色的终点不同。产品工程师关心功能能不能服务很多客户；业务专家负责判断 46 到底对不对；FDE 则负责把两边接起来，直到这家公司的真实流程确实能用。大家是搭档，不是排名。”

**English / English script:** “An FDE is not simply a ‘more senior normal engineer.’ The three roles have different finish lines. Product engineers build capability for many customers. Domain experts decide whether 46 is actually correct. The FDE connects both sides until this company's real workflow works and people adopt it. They are partners, not a ranking.”

**Point / 指向：** Compare the three **FINISH LINE** labels, then trace **DISCOVER → CONNECT → DEPLOY → ADOPT** and stop on **FDE OWNS THE CROSSING**. / 对比三个角色的 **FINISH LINE**，再沿 **DISCOVER → CONNECT → DEPLOY → ADOPT** 指过去，最后停在 **FDE OWNS THE CROSSING**。

**Click / 点击：** **Make the lesson reusable**.

#### Step 6 — Reuse

**On screen / 画面：** The field failure **46 → BLANK** goes back into the product as **CASE → TEST → FIX**. A later similar case **52 → 52 ✓** works without another rescue. / 现场故障 **46 → 空白** 被带回产品，变成 **案例 → 测试 → 修复**；之后一个相似案例 **52 → 52 ✓** 无需再次人工救火便能成功。

**Chinese / 中文口述：** “如果 FDE 每次都亲手把空白补成 46，他就成了永久人工补丁。更好的做法是把这次失败变成案例和测试，修进产品里。这样下次遇到相似的 52，系统自己就能保留下来。画面的 52 是帮助理解的示意；重点是 FDE 离开后，经验仍然留在系统里。”

**English / English script:** “If the FDE manually fills in 46 every time, the person becomes a permanent patch. A better outcome is to turn the failure into a case and test, then fix the product. When a similar value such as 52 appears later, the system can handle it without another rescue. The 52 example is illustrative; the point is that the lesson remains after the FDE leaves.”

**Point / 指向：** Follow **46 → BLANK** into **CASE → TEST → FIX**, then continue to the illustrative **52 → 52 ✓** result. / 把 **46 → BLANK** 带入 **CASE → TEST → FIX**，再继续指向示意性的 **52 → 52 ✓**。

**Click / 点击：** **See a real deployment**.

#### Step 7 — Example

**On screen / 画面：** A Tax AI case published on **May 27, 2026** shows **7,000 tax returns**. At launch, **25%** of returns had at least **75% of fields correct**; within six weeks, **86%** did. Below, practitioners, field data, evaluations, and engineering form one team loop. / 一个于 **2026 年 5 月 27 日**发布的 Tax AI 案例显示：共处理 **7,000 份税表**。上线时，只有 **25%** 的税表达到“至少 **75% 字段正确**”；六周内，这一比例达到 **86%**。下方由从业者、现场数据、评估与工程共同组成团队闭环。

**Chinese / 中文口述：** “最后看一个真实部署案例。OpenAI 的 FDE 和研究人员、Thrive 的工程师以及 Crete 的税务从业者共同改进 Tax AI。试点处理了 7,000 份税表；上线时，只有 25% 的税表能做到至少 75% 字段正确，六周后这一比例达到 86%。这里不能把提升归功于某一个英雄 FDE。它说明的是：真实从业者、现场数据、评估和工程持续闭环，才能把试点变成可衡量的改进。”

**English / English script:** “Finally, consider a real deployment. OpenAI FDEs and researchers, Thrive engineers, and Crete tax practitioners worked together on Tax AI. The pilot processed 7,000 returns. At launch, only 25% of returns had at least 75% of fields correct; six weeks later, 86% did. We should not credit one heroic FDE for the improvement. The lesson is that practitioners, field data, evaluation, and engineering form a continuing loop.”

**Point / 指向：** Read the labels around **7,000** and **25% → 86%**, then sweep across **PRACTITIONERS → FIELD DATA → EVALS → ENGINEERING**. / 读清 **7,000** 和 **25% → 86%** 周围的标签，再扫过 **PRACTITIONERS → FIELD DATA → EVALS → ENGINEERING**。

**Click / 点击：** **Replay FDE** resets only this seven-step story and remains on the FDE slide. To continue to RSI, use the global bottom-right slide arrow. / **Replay FDE** 只会重置并重播这七步，仍然停在 FDE 页；要进入 RSI，请使用页面右下角的全局翻页箭头。

### Optional depth — English

The role is historically associated with Palantir, but definitions vary by company. OpenAI&apos;s current FDE description spans discovery, technical scoping, system design, build, rollout, adoption, and measurable workflow impact. Do not reduce the role to deployment support, consulting, or prompt writing.

### 可选补充 — 中文

从历史上看，这个职位与 Palantir 关系很深，但不同公司的定义会有差别。OpenAI 现在的 FDE 职责覆盖问题发现、技术范围、系统设计、开发、生产上线、用户采用和实际工作流效果。不要把它简化成部署支持、咨询顾问或 Prompt Engineer。

### Transition — English

Today, people such as FDEs deliberately close this learning loop around AI. The final question is how much of that loop AI itself could eventually close.

### 过渡 — 中文

今天，FDE 这样的角色仍然由人来主动闭合 AI 周围的学习回路。最后一个问题是：这条回路未来有多少部分能够由 AI 自己闭合？

---

## Slide 7 — RSI

### Presenter setup

- **Atlas has six steps; Exhibit has five. Use one mode only.** The Atlas script below is the recommended talk track.
- Keep the recipe metaphor simple: an answer is one result; the recipe is the process used to build the next AI.
- AlphaEvolve is a **bounded AI-for-AI example**. It shows one capability full RSI would need, but it is not proof of full RSI.

### Atlas — On screen

- **01 · NAME:** RSI = Recursive Self-Improvement; AI · N → recipe → AI · N+1
- **02 · DIFFERENCE:** one answer changes; the build recipe stays the same
- **03 · METHOD:** people set the goal and test; AI tries, tests, keeps, and repeats
- **04 · RESULT:** one repeated math routine in Gemini training **+23% faster** → whole training time **−1%**
- **05 · BOUNDARY:** people still choose the direction, test, and go/stop decision
- **06 · FULL RSI:** can AI · N+1 improve the recipe again?

### Atlas — Six-step talk track · English

**01 · NAME — MEET RSI**

- **Visual change:** the letters **R · S · I** open beside **AI · N → RECIPE → AI · N+1**; the return loop ends with a question mark.
- **Point at:** **Recursive Self-Improvement**, then trace **AI · N → RECIPE → AI · N+1**.
- **Say:** “RSI means **Recursive Self-Improvement**. Think of the process for building an AI as a recipe. The idea is that one AI helps improve the recipe used to build the next AI. ‘Recursive’ means the next AI would then need to do it again.”
- **Click:** **Show what must change**.

**02 · DIFFERENCE — ANSWER ≠ RECIPE**

- **Visual change:** one answer changes from **WRONG** to **FIXED**, but the build recipe remains **v1 · UNCHANGED**.
- **Point at:** the fixed answer, the large **≠**, then **BUILD RECIPE · STILL v1**.
- **Say:** “An AI can correct one answer. That is useful, but it is not RSI. It is like fixing one dish without changing the recipe. Full self-improvement must leave behind a better way to build the next AI.”
- **Click:** **Run today&apos;s loop**.

**03 · METHOD — TODAY&apos;S LOOP**

- **Visual change:** people set **GOAL** and **TEST**; AI tries A, B, and C; the external test rejects fast-but-wrong B and keeps C; the arrow loops back.
- **Point at:** **GOAL**, **TEST**, candidate B at **69 ms · ×**, then winner C and **REPEAT**.
- **Say:** “What can we do today? People set the challenge and the rules. AI tries many versions, an external test checks them, and the winner becomes the next starting point. Notice that the fastest version still loses if it is wrong. Then the tryout begins again.”
- **Click:** **See a real result**.

**04 · RESULT — REAL RESULT**

- **Visual change:** one highlighted, repeated math routine becomes **23% faster**; the effect reaches the full Gemini training run as **1% less time**.
- **Point at:** **ONE REPEATED MATH ROUTINE · +23%**, then **WHOLE GEMINI TRAINING RUN · −1% TIME**.
- **Say:** “AlphaEvolve is a bounded AI-for-AI example. Google DeepMind reports that it made one repeated math routine used in Gemini training 23 percent faster—engineers call this a matrix-multiplication kernel. That reduced overall training time by about 1 percent. It shows one capability full RSI would need: AI can help improve part of the process used to build AI.”
- **Click:** **Find the human boundary**.

**05 · BOUNDARY — HUMAN BOUNDARY**

- **Visual change:** the AI explores inside a frame, while people hold three decisions: **DIRECTION**, **TEST**, and **GO / STOP**.
- **Point at:** the three human decisions, then the AI search area inside the frame.
- **Say:** “This is still not full RSI. It is a bounded AI-for-AI example that shows one capability full RSI would need. AI searches inside the box, but people still choose what to improve, what counts as better, and whether the result may be used.”
- **Click:** **Test full RSI**.

**06 · FULL RSI — FULL RSI TEST**

- **Visual change:** in the hypothetical full loop, **AI · N** would change recipe v1 to v2; v2 would build **AI · N+1**; the return cable stops before the final connection.
- **Point at:** trace the hypothetical path **AI · N → v1 to v2 → AI · N+1**, then follow the return cable to **N+1 REPEATS IT · not demonstrated** and the faster-AI-R&amp;D caption.
- **Say:** “Here is the test for full RSI. AI · N would improve the recipe, the new recipe would build AI · N+1, and N+1 would improve that recipe again. Only then would the loop be truly recursive. If this loop ever closed, it could make AI research and development faster—but that is a possibility, not a forecast. The final connection has not been demonstrated, and it is not inevitable.”
- **Click:** **Replay RSI** resets this six-step story. Use the global slide arrow to continue.

### Atlas — 六步口述 · 中文

**01 · 名词 — MEET RSI**

- **画面变化：** **R · S · I** 三个字母展开，旁边出现 **AI · N → RECIPE → AI · N+1**；回程线停在问号处。
- **指向：** 先指 **Recursive Self-Improvement**，再沿 **AI · N → RECIPE → AI · N+1** 移动。
- **口述：** “RSI 是 **Recursive Self-Improvement**，中文常说‘递归自我改进’。我们可以把制造 AI 的过程想成一份菜谱：这一代 AI 帮忙改进菜谱，用它做出下一代 AI。‘递归’的意思是，下一代还要能继续改这份菜谱。”
- **点击：** **Show what must change**。

**02 · 区别 — ANSWER ≠ RECIPE**

- **画面变化：** 一条回答从 **WRONG** 变成 **FIXED**，但制造 AI 的菜谱仍然是 **v1 · UNCHANGED**。
- **指向：** 先指修好的答案，再指大大的 **≠**，最后指 **BUILD RECIPE · STILL v1**。
- **口述：** “AI 改对了一条答案，当然很有用，但这还不是 RSI。它就像把一道菜补救好了，菜谱却完全没变。真正的自我改进，要留下一个更好的方法，去制造下一代 AI。”
- **点击：** **Run today&apos;s loop**。

**03 · 方法 — TODAY&apos;S LOOP**

- **画面变化：** 人先设定 **GOAL** 和 **TEST**；AI 尝试 A、B、C；外部测试淘汰又快又错的 B，留下 C；箭头再回到起点。
- **指向：** 依次指 **GOAL**、**TEST**、候选 B 的 **69 ms · ×**，再指赢家 C 和 **REPEAT**。
- **口述：** “今天已经能做到的是：人先出题，也定好判分规则；AI 尝试很多版本，外部测试负责检查，赢家变成下一轮的起点。注意，最快的版本如果答错了，还是会被淘汰。然后这场选拔再来一轮。”
- **点击：** **See a real result**。

**04 · 结果 — REAL RESULT**

- **画面变化：** 一个被突出显示、会反复运行的数学计算过程变成 **快 23%**；效果传到整次 Gemini 训练，显示 **用时减少 1%**。
- **指向：** 先指 **ONE REPEATED MATH ROUTINE · +23%**，再指 **WHOLE GEMINI TRAINING RUN · −1% TIME**。
- **口述：** “AlphaEvolve 是一个有边界的‘AI 改进 AI’案例。Google DeepMind 公布的结果是：它让 Gemini 训练中一个会反复运行的数学计算过程加速了 23%；工程师把这种计算程序叫作矩阵乘法 kernel。整次训练用时因此减少约 1%。它展示了完整 RSI 所需要的一种能力：AI 可以帮助改进制造 AI 的一部分流程。”
- **点击：** **Find the human boundary**。

**05 · 边界 — HUMAN BOUNDARY**

- **画面变化：** AI 在框内探索，框外的人掌握三个决定：**DIRECTION**、**TEST** 和 **GO / STOP**。
- **指向：** 先指人的三个决定，再指框内的 AI 搜索区域。
- **口述：** “这仍然不是完整 RSI。它是一个有边界的‘AI 改进 AI’案例，展示了完整 RSI 所需要的一种能力。AI 可以在框里搜索，但改进什么、怎样才算更好、结果能不能使用，仍然由人决定。”
- **点击：** **Test full RSI**。

**06 · 完整 RSI — FULL RSI TEST**

- **画面变化：** 在假设的完整循环里，**AI · N** 会把菜谱 v1 改成 v2；v2 会做出 **AI · N+1**；回程线停在最后一个尚未接上的接口前。
- **指向：** 沿这条假设路径 **AI · N → v1 to v2 → AI · N+1** 移动，再沿回程线指向 **N+1 REPEATS IT · not demonstrated** 和“AI 研发可能加速”的说明。
- **口述：** “完整 RSI 的测试应该是：AI · N 会改进菜谱，新菜谱会制造出 AI · N+1，而 N+1 又会继续改这份菜谱。做到这一步，循环才真的叫‘递归’。如果这条循环将来能够闭合，它可能让 AI 研发更快，但这只是可能性，不是预测。最后这个连接目前还没有被证明，而且它也不是必然会发生的。”
- **点击：** **Replay RSI** 只会重置这六步；继续请使用全局翻页箭头。

### Exhibit — On screen

- **RSI — Recursive Self-Improvement**
- **Not RSI:** correcting one answer changes the output, not the AI builder
- **Bounded method:** humans lock the goal and evaluator; AI generates candidates
- **Evolutionary loop:** generate → run → verify → score → select → repeat
- **Real effect:** AlphaEvolve improved one Gemini training kernel by **23%**, reducing overall training time by **1%**
- **Successor-loop test:** Model N improves the builder → the builder creates Model N+1 → Model N+1 can run the next improvement cycle
- Persistent boundary: **Full RSI remains unproven and is not inevitable.**

### Exhibit — Stage cues / 演示提示

- **01 — Not yet / 还不是：** point from the corrected answer to the unchanged builder. Click **Open the builder**. / 从被修正的答案指向完全没变的 AI 工厂；点击 **Open the builder**。
- **02 — Bounded builder / 有边界工厂：** point to the human goal and evaluator locks, then follow AI → candidates → evaluator. Click **Release candidates**. / 先指人定义的目标和评测，再按 AI → 候选方案 → 评测器来讲；点击 **Release candidates**。
- **03 — Selection / 筛选：** reject Patch B despite 69 ms; follow correct Patch C to **NEW BEST**. Click **Install the winner**. / Patch B 虽然只有 69 ms，却因答案错误被拒绝；再看 Patch C 成为 **NEW BEST**；点击 **Install the winner**。
- **04 — Real effect / 真实效果：** point to the training kernel and read **+23% → −1%**. Click **Ask what recurses**. / 指向训练 kernel，再读 **+23% → −1%**；点击 **Ask what recurses**。
- **05 — Successor test / 继任者测试：** trace AI · N → Builder v2 → AI · N+1 → the return path. Treat compounding as a possible outcome, not the definition. Finish on **FULL RSI · UNPROVEN**. / 沿 AI · N → Builder v2 → AI · N+1 → 回程线来讲；“复利”只是可能结果，不是定义；最后落在 **FULL RSI · UNPROVEN**。

### Exhibit — Say · English

RSI means **Recursive Self-Improvement**. A corrected answer is useful self-correction, but the process that builds the next model is unchanged, so this is not RSI.

Today&apos;s demonstrated systems are smaller and bounded: people choose the goal and evaluator; AI proposes candidate code; an external test runs, verifies, times, and selects it. That is why a 69-millisecond wrong answer loses to a slower correct one.

AlphaEvolve is a real example of this bounded method. Google DeepMind reports a 23-percent speedup for one Gemini training kernel and about a 1-percent reduction in the whole training run. It improved one tool in the AI-building stack; it did not demonstrate full RSI.

Full RSI asks whether a changed builder could produce AI · N+1, and whether N+1 could then run the next builder-improvement cycle. The loop might compound, but compounding is not the definition. This successor loop has not yet been demonstrated and is not inevitable.

### Exhibit — 口述 · 中文

RSI 是 **Recursive Self-Improvement**，也就是“递归自我改进”。一条答案被改对，是有用的自我纠错；但制造下一代模型的流程没有改变，所以还不是 RSI。

今天已经实现的是更小、更有边界的系统：人定义目标和评测，AI 提出候选代码，外部测试负责运行、验证、计时和选择。因此，一个 69 毫秒但答案错误的方案，仍会输给稍慢却正确的方案。

AlphaEvolve 是这种有边界方法的真实例子。Google DeepMind 公布的结果是：一个 Gemini 训练 kernel 加速 23%，整次训练用时减少约 1%。它改进了 AI 工厂中的一个工具，并没有证明完整 RSI 已经实现。

完整 RSI 追问的是：改过的工厂能否制造 AI · N+1，而 N+1 又能否继续运行下一轮工厂改进。循环以后可能形成复利，但“复利”不是定义。这条继任者闭环目前还没有被证明，也并非必然发生。

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

## Slide 8 — Six Terms, Three Shifts

### On screen

- **Six terms. Three shifts.**
- **From bigger to smarter:** MoE · Distillation
- **From answers to actions:** World Model · VLA
- **From shipping to learning:** FDE · RSI
- **More efficient systems. More capable actions. Tighter feedback loops.**

### Stage cues / 演示提示

- No clicks / 无需点击：move once from left to right across the three columns. / 从左到右扫过三列即可。
- Do not read every sentence / 不要逐字念：name each pair, summarize the shift, and finish on the line above the cards. / 说出每组两个词，总结它们代表的变化，最后落在卡片上方那句总括。

### Say — English

Let us put the six terms back into one picture. They describe three connected shifts.

First, compute efficiency: **MoE** routes the work, and **distillation** compresses useful behavior into something smaller.

Second, contact with the world: **world models** predict consequences, and **VLA** turns perception and language into action.

Third, learning loops: **FDE** brings failures from real deployments back into product work, while **RSI** asks whether AI could eventually improve the process that builds its successors.

So the direction is consistent: use capability more efficiently, move from answers to actions, and tighten the feedback loop between AI and the world.

The terms are different, but together they show that AI is changing in more ways than simply becoming bigger.

### 口述 — 中文

最后，我们把六个词重新放回一张图里。它们对应三次彼此相连的变化。

第一，算力效率：**MoE** 负责把任务分流，**知识蒸馏**则把有用的行为压缩到更小的模型里。

第二，接触真实世界：**世界模型**预测行动的后果，**VLA**把感知和语言变成动作。

第三，学习闭环：**FDE**把真实部署中的失败带回产品改进；**RSI**则追问，AI 将来能不能改进制造下一代 AI 的过程。

所以整体方向是一致的：更高效地使用能力，从回答走向行动，再把 AI 和真实世界之间的反馈闭环收得更紧。

这些词各不相同，但放在一起，它们说明 AI 的变化远远不只是“模型越来越大”。

---

## Primary sources

- [DeepSeek-V3 Technical Report](https://arxiv.org/abs/2412.19437)
- [Distilling the Knowledge in a Neural Network](https://research.google/pubs/distilling-the-knowledge-in-a-neural-network/)
- [DeepSeek-R1 paper](https://arxiv.org/abs/2501.12948)
- [Google DeepMind — Genie 3](https://deepmind.google/blog/genie-3-a-new-frontier-for-world-models/)
- [Google DeepMind — Gemini Robotics 2](https://deepmind.google/blog/gemini-robotics-2-brings-whole-body-intelligence-to-robots/)
- [OpenAI — Forward Deployed Engineer](https://openai.com/careers/forward-deployed-engineer-%28fde%29-sf-san-francisco/)
- [OpenAI — OpenAI Deployment Company (May 2026)](https://openai.com/index/openai-launches-the-deployment-company/)
- [OpenAI — Building self-improving tax agents with Codex](https://openai.com/index/building-self-improving-tax-agents-with-codex/)
- [Palantir Architecture Center — FDE as “human equivalent of backpropagation”](https://www.palantir.com/docs/foundry/architecture-center/overview)
- [Anthropic — When AI builds itself](https://www.anthropic.com/institute/recursive-self-improvement)
- [Google DeepMind — AlphaEvolve](https://deepmind.google/blog/alphaevolve-a-gemini-powered-coding-agent-for-designing-advanced-algorithms/)
