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

Use one metaphor from beginning to end: **a large company handling one tiny task slip**. The seven steps have a simple shape: introduce the term, tell the five-step company story, then show where it is already shipping. Do not introduce hospitals, roads, libraries, or mathematical notation in the main story. From Step 2 to Step 6, the same yellow task slip stays on screen.

从头到尾只用一个比喻：**一家大公司处理一张很小的任务单**。七个步骤的结构很简单：先认识这个词，再讲五步公司故事，最后看它已经用在哪里。主线不要再加入医院、公路、图书馆或数学公式。从第二步到第六步，同一张黄色任务单始终留在画面中。

### Step 1 — Meet MoE.

**On screen / 画面：** The acronym opens into **Mixture of Experts**, followed by the whole idea in one line: **one large company, a small team for each task**. / 先甩出缩写 **MoE**，再展开成 **Mixture of Experts**；最后落到一句话：**一家大公司，每个任务只叫一支小团队**。

**口述 — 中文：**

“第一个词，直接甩出来：**MoE**。它是 **Mixture of Experts，专家混合**。这个名字听起来很技术，但今天先不要想公式，也不要把它想成几个 chatbot 坐在一起讨论。先记住一个画面就够了：**一家很大的公司，每次只叫一支小团队来处理任务。** 为什么需要这样做？我们先看看没有 MoE 时会发生什么。”

**Say — English:**

“Our first term is **MoE: Mixture of Experts**. It sounds technical, but do not picture several chatbots debating. Keep one image in mind: **one large company, with only a small team called in for each task.** Why would we need that?”

**Point / 指向：** Point once to **MoE**, follow the three letters as they expand, then land on **one large company / a small team**. / 先指一下 **MoE**，跟着三个字母展开，最后落在“**大公司 / 小团队**”上。

**Click / 点击：** Pause after the one-line idea, then click **Why do we need it?** / 让这句核心比喻停一拍，再点 **Why do we need it?**。

### Step 2 — A tiny task. An all-hands meeting.

**On screen / 画面：** The sentence appears first; its highlighted word becomes the yellow task slip, and every office window lights up. / 画面先给出完整句子，其中高亮的一小段成为黄色任务单，随后所有办公室窗口亮起。

**口述 — 中文：**

“先想象，模型是一家公司。上面是一整句话，黄色高亮是它现在正在处理的一小段文字。我们把这小段文字变成一张任务单。普通模型的做法有点夸张：任务再小，也让整家公司一起上班。”

**Say — English:**

“Imagine the model as a company. The yellow highlight is the small piece of the sentence being processed now, so we turn it into a task slip. In a conventional model, even this tiny task makes the whole company work.”

**Point / 指向：** Point to the highlighted word in the sentence, move down to the matching task slip, then sweep across all the lit windows. / 先指句子中高亮的词，再移到同样内容的任务单，最后扫过所有亮起的窗口。

**Click / 点击：** Let the all-hands image land, then click **Make it bigger**. / 让“全员出动”的反差停一拍，再点 **Make it bigger**。

### Step 3 — Bigger company. Bigger bill.

**On screen / 画面：** The building expands. The task slip stays the same size, but every new window also lights up and the compute bill rises. / 大楼继续扩建；任务单没有变大，但新增窗口也全部亮起，计算账单同步上涨。

**口述 — 中文：**

“我们当然希望模型懂得更多，所以不断把公司做大。问题是，公司每扩一层，每张小任务单都要多叫一层人来上班。能力增加了，但每次处理任务的成本也跟着增加。”

**Say — English:**

“We make the company larger because we want more capability. But every new floor joins every tiny task. Capacity grows, and the cost of each task grows with it.”

**Point / 指向：** Keep one hand on the unchanged task slip; with the other, follow the growing building and bill. / 一边指着没有变大的任务单，一边沿大楼和账单的增长方向移动。

**Click / 点击：** After “the cost grows with it,” click **Introduce MoE**. / 说完“成本也跟着增加”后，点 **Introduce MoE**。

### Step 4 — Same company. Smaller team.

**On screen / 画面：** The building stays large. Only eight office windows turn red; the other windows go quiet. / 大楼保持原来的规模；只有八个办公室窗口亮成红色，其余窗口安静下来。

**口述 — 中文：**

“这就是 **MoE，Mixture of Experts，专家混合**。公司不用裁员，也不用变小；它增加一个调度台，根据眼前这张任务单，只叫少数几个小组参与。这里的 Expert 不是一个完整 chatbot，也不一定真的叫‘数学组’或‘代码组’，你可以先把它理解成公司内部不同的计算小组。”

**Say — English:**

“This is **MoE: Mixture of Experts**. The company stays large, but a dispatcher calls in only a few teams for this task. An expert is not a complete chatbot; for now, think of it as one computational team inside the company.”

**Point / 指向：** Hold on the unchanged outline of the whole building, then point to the eight red windows and the quiet grey windows. / 先强调大楼轮廓完全没变，再指八个红色窗口和其余安静的灰色窗口。

**Click / 点击：** Pause on the contrast—**the company stayed big; the meeting became small**—then click **Open one room**. / 在“公司没有变小，开会的人变少了”这里停一拍，再点 **Open one room**。

### Step 5 — Only the called-in teams work.

**On screen / 画面：** One selected office is opened as a simple three-part sequence: task in, work happens, note out. The unselected offices remain still. / 画面打开一个被选中的办公室，用三个动作展示：任务进去、真正工作、短笺出来；没被选中的办公室保持静止。

**口述 — 中文：**

“所以，‘激活八个专家’没有听起来那么神秘。它只是说：这八个小组真的拿到任务、开始计算；其他小组这一次不用工作。它们不是八个人分别回答完整问题，而是在模型处理这一小步时，各自加工同一张任务单。”

**Say — English:**

“So ‘activating eight experts’ is less mysterious than it sounds. Those eight teams actually receive the task and compute; the others do no work this time. They are not answering the whole question independently—they are helping with this one small step.”

**Point / 指向：** Follow the slip into the enlarged office and the note coming out; then briefly point to the motionless offices. / 跟着任务单进入放大的办公室，再跟着短笺出来；最后快速指一下没有动作的办公室。

**Click / 点击：** Once one complete “in → work → out” cycle has finished, click **Combine the notes**. / 等一次完整的“进去—工作—出来”动作结束后，点 **Combine the notes**。

### Step 6 — Big company. Small meeting.

**On screen / 画面：** Eight notes travel to one editing desk and become one result. The full company remains visible beside **256 available / 8 active**, then the DeepSeek-V3 proof appears: **671B total / 37B active per token**. / 八张短笺汇入同一张编辑桌，合成一份结果；完整公司仍留在画面中，旁边显示 **256 available / 8 active**，随后出现 DeepSeek-V3 的真实数字：**671B total / 37B active per token**。

**口述 — 中文：**

“最后，八个小组的工作会合成一份结果，再交给模型继续处理。DeepSeek-V3 是一个真实例子：它总共有 6710 亿参数；处理每一个小单位的文字时，大约激活 370 亿。它有 256 个可选择的路由专家，每次选择八个。MoE 的关键不是把公司变小，而是——**公司保持很大，会议保持很小。**”

**Say — English:**

“The eight teams’ notes are combined into one result, and the model continues. DeepSeek-V3 makes this real: 671 billion parameters in total, about 37 billion active for each token, with eight routed experts selected from 256. MoE does not make the company small—**the company stays big; the meeting stays small.**”

**Point / 指向：** Follow the eight notes into one result. Then point, in order, to the eight lit offices, **256 → 8**, **671B → 37B**, and finally the closing sentence. / 跟着八张短笺汇成一个结果，再依次指八个亮起的办公室、**256 → 8**、**671B → 37B**，最后落在收束句上。

**Click / 点击：** Do not advance immediately. Leave the closing sentence visible for a beat, then click **See where it ships**. / 不要马上翻页，让收束句停留一拍，再点 **See where it ships**。

### Step 7 — MoE is already shipping.

**On screen / 画面：** Three concrete application rows appear: **DeepSeek-V3 — Chat + API**, **Qwen3 MoE — Open Models**, and **Kimi K2 — Agentic Model**. The closing line explains that MoE is the engine underneath, not a feature button. / 出现三条真实应用：**DeepSeek-V3 — 聊天与 API**、**Qwen3 MoE — 开放模型**、**Kimi K2 — Agentic Model**。最后说明：MoE 不是一个功能按钮，而是藏在产品下面的引擎。

**口述 — 中文：**

“MoE 不是论文里才有的概念，它已经在我们会用到的产品下面工作了。**DeepSeek-V3** 用在聊天和 API；**Qwen3 的 MoE 模型**可以开放下载和部署；**Kimi K2**则把这套思路带到 agentic coding，也就是让模型不只补几行代码，而是连续完成更长的编码任务。我们不会看到一个叫‘开启 MoE’的按钮，因为它不是产品功能——它是藏在下面的引擎。三个名字不必都记住，只要记住：**聊天、开放模型、编码 Agent，MoE 已经在真实运行。**”

**Say — English:**

“MoE is no longer just a research idea. **DeepSeek-V3** powers chat and API use, **Qwen3 MoE** offers open models for deployment, and **Kimi K2** brings the architecture to agentic coding. You never click an ‘MoE’ button—it is the engine underneath the product.”

**Point / 指向：** Move left to right across the three cards—**chat + API**, **open models**, **agentic coding**—then land on **the engine under the product**. Do not read every number aloud. / 从左到右扫过三张卡片：**聊天与 API**、**开放模型**、**Agent 编码**；最后落到“**产品下面的引擎**”。不要逐个念完所有数字。

**Click / 点击：** End the section here. Use **Replay MoE** only if you want to revisit the mechanism; otherwise move directly to Distillation. / MoE 主讲到这里结束。只有需要回看机制时才点 **Replay MoE**；正常情况下直接进入蒸馏。

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

### On screen

- A plausible SQL query that silently turns **4 users into 2**
- A teacher-generated worked lesson: **what failed, why, and how to fix it**
- The training loop: **student draft ≠ teacher lesson → loss → update student**
- After many curated lessons, the teacher goes offline and the student solves a **new version of the trap**

### Stage cues / 演示提示

- Start on **THE MISS**. Point only to the requirement and **4 → 2 rows**; let the disappearance create the puzzle. / 先停在 **THE MISS**；只指出需求和 **4 → 2 rows**，让“人怎么不见了”先形成悬念。
- Click **Ask the teacher**. Trace the picture from **LEFT JOIN: 4 rows**, through **WHERE: NULL fails**, to **RESULT: 2 rows**; end on the fix. / 点击 **Ask the teacher**；沿画面从 **LEFT JOIN：4 行**，经过 **WHERE：NULL 被过滤**，走到 **RESULT：2 行**，最后落到修复方法。
- Click **Train on lessons**. One card is only a visible stand-in for many lessons. Point to **COMPARE → LOSS → UPDATE** and then to the changing student weights. / 点击 **Train on lessons**；屏幕上的一张教材只是大量样本的代表；依次指出 **比较 → 损失 → 更新**，再指向发生变化的学生权重。
- Click **Disconnect teacher**. The table and wording are new, but the SQL structure is the same. Point to **TEACHER OFFLINE** before the student answer. / 点击 **Disconnect teacher**；表名和问题已经换了，但 SQL 结构相同；先指出 **TEACHER OFFLINE**，再看学生独立作答。
- Do not call it “21× cheaper.” Total parameter count and per-token compute are not the same comparison. / 不要说成“便宜 21 倍”；总参数量和每 token 的计算量不是同一个比较口径。

### Say — English

**Knowledge Distillation** means using a stronger teacher to train a smaller student **before deployment**. The student does not call the teacher every time. The two models stay separate; what transfers is selected behavior, not the teacher’s architecture or weights.

Here the student receives a very normal requirement: show every user, including people with no order. Its query uses a `LEFT JOIN`, so it looks reasonable. But the later `WHERE order.status = 'paid'` rejects the rows where the order side is `NULL`. The join kept four users; the filter quietly removed two.

The teacher now turns that failure into a worked lesson: the original query, the correct result, an explanation of why the rows vanished, and a repair—move the child-table filter into the `ON` condition. This screen is an illustration of a lesson, not a claim that DeepSeek trained on this exact SQL example.

During training, the student produces its own draft. We compare that draft with the teacher-provided target. The mismatch becomes **loss**, and a gradient nudges only the student’s weights so the desired output becomes more likely next time. One lesson creates only a tiny change; the loop must repeat across many curated examples.

DeepSeek says its released Qwen distill models were fine-tuned with **800,000 samples curated with DeepSeek-R1**. Starting from Qwen2.5-32B, this process produced R1-Distill-Qwen-32B. The teacher is not copied into the student.

Now we disconnect the teacher and change the problem from users and orders to devices and alerts. The student recognizes the same hidden structure and proposes the same kind of fix. That new example is the important test: did it copy an answer, or learn a reusable pattern?

The published number on screen is separate real-world evidence, not the score of this SQL demo: DeepSeek reports **72.6 on AIME 2024** for R1-Distill-Qwen-32B. Distillation is therefore closer to building a curriculum than creating a ZIP file: it can preserve useful behavior in a smaller model, but it does not automatically transfer everything the teacher knows or every safety property it has.

### 口述 — 中文

**Knowledge Distillation，知识蒸馏**，就是在部署之前，用一个更强的教师训练一个更小的学生。学生上线后不需要每次再问教师。两个模型始终分开；转移的是选中的行为，不是把教师的架构或权重完整复制一份。

这里学生收到一个很正常的需求：显示所有用户，包括从来没有订单的人。它用了 `LEFT JOIN`，看起来没毛病。但后面的 `WHERE order.status = 'paid'` 会把订单侧为 `NULL` 的行过滤掉。也就是说，JOIN 本来保住了 4 个人，后面的过滤条件又悄悄删掉了 2 个。

教师接下来把这次失败变成一份“带讲解的教材”：原始问题、正确结果、为什么会少人，以及怎样修——把右表条件移进 `ON`。这里是帮助理解的示意例子，并不是说 DeepSeek 的训练集里真的有这一条 SQL。

训练时，学生先产生自己的答案，再和教师提供的目标比较。差异会变成 **loss，损失**；梯度只去轻微调整学生的权重，让目标答案下一次更容易出现。一条教材只能推动一点点，所以必须在大量经过整理的例子上反复训练。

DeepSeek 公开说明，这批 Qwen 蒸馏模型使用了 **80 万条与 DeepSeek-R1 一起筛选整理的训练样本**进行微调。以 Qwen2.5-32B 为起点，最后得到 R1-Distill-Qwen-32B。教师本身并没有被复制进学生。

现在我们把教师断开，再把问题从“用户和订单”换成“设备和告警”。表名和文字都变了，但隐藏结构相同。学生仍能指出 `WHERE` 会删掉 `NULL` 行，并给出同类修复。这个新例子才是关键：它背下了一道答案，还是学到了一条能迁移的规律？

屏幕最后的公开数字是独立的真实证据，不是这道 SQL 的得分：DeepSeek 报告 R1-Distill-Qwen-32B 在 **AIME 2024 得到 72.6**。所以蒸馏更像“编一套教材”，而不是做一个 ZIP 压缩包：它能把有用行为带进小模型，但不会自动继承教师的全部知识和所有安全能力。

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

## Slide 4 — World Model

### On screen

- A current observation that can be described, but three future frames are still blank
- A current observation, one action ticket, and three simulated futures
- Several plausible futures and a loop that turns one predicted state into the next “now”
- Three common things a world model may predict: **pixels/video**, an **internal state**, or **objects/geometry**
- An official **Genie 3** recording as evidence after the mechanism is clear

### Stage cues / 演示提示

- Begin with the current frame. Point out that “robot on a street” describes a noun-filled snapshot, but does not answer what the arrow key will cause. / 先停在当前画面。指出“街上的机器人”只能描述一张充满名词的快照，却没有回答按下方向键会造成什么结果。
- Click **Predict one step**. Follow the current observation, the action ticket, and the three simulated futures. Point to **↺**: a predicted state can seed another rollout. / 点击 **Predict one step**；顺着当前观察、动作票据和三个模拟未来来看。最后指向 **↺**：预测出的状态可以继续成为下一轮预测的起点。
- Click **Show what gets built**. Read the three rows as three different canvases for the same job—not three separate definitions. / 点击 **Show what gets built**；把三行理解为完成同一任务的三种“画布”，而不是三个互不相关的定义。
- Let the Genie 3 recording run briefly. Then use the deck arrow to move to the VLA slide. / 让 Genie 3 录像播放一会儿，再用页面导航进入下一张 VLA。

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

## Slide 5 — VLA

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

### On screen

- **FDE — Forward Deployed Engineer**
- One persistent map: **Product Core · Last-mile Boundary · Customer Site**
- One illustrative case: clean demo → live miss → trace → eval + reviewed fix → replay on a new customer
- The FDE carries a reproducible evidence packet: **source + production trace + expert sign-off**
- Role boundary: Product Engineer owns reusable capability; Domain Expert owns correctness; **FDE owns the end-to-end crossing**
- Aha: **the next customer gets the fix without needing the same rescue**
- Published case evidence: **7,000 returns; 25% → 86%** reaching ≥75% correct fields in six weeks

### Stage cues / 演示提示

- **0 — Demo / 演示：** point to the dark customer zone: the company is literally outside the demo frame. Click **Enter the field**. / 指向右侧被遮住的客户现场：公司现实真的在 demo 画框之外。点击 **Enter the field**。
- **1 — Field / 现场：** follow the same case into email, sheet, API, and domain note; land on `NULL` and the expert correction. Click **Open the trace**. / 跟着同一个案例进入邮件、表格、API 和领域备注；最后落在 `NULL` 和专家纠正上。点击 **Open the trace**。
- **2 — Trace / 追踪：** read the red chain from right to left: source + sign-off ← output ← product trace ← case file. Point to the yellow evidence packet. Click **Make it testable**. / 从右向左读红色链路：来源与确认 ← 输出 ← 产品 trace ← 案例文件。指向黄色证据包。点击 **Make it testable**。
- **3 — Eval + fix / 评测与修复：** watch the evidence packet travel back to Product Memory; point to expected answer, targeted eval, regression check, and human approval. Click **Replay on a new case**. / 看证据包回到 Product Memory；依次指向期望答案、针对性评测、回归检查和人工审核。点击 **Replay on a new case**。
- **4 — Replay / 重放：** a new 52-day case passes without FDE intervention. Then reveal the published Tax AI numbers and click **Next: RSI**. / 新的 52 天案例无需 FDE 介入就通过。最后再读官方 Tax AI 数据，然后点击 **Next: RSI**。

### Say — English

FDE stands for **Forward Deployed Engineer**.

This one is different: FDE is a job, not a type of model.

Start with the clean demo. One tidy file goes in, every field is mapped, and the answer says PASS. It looks production-ready. But the whole company is still hidden on the right: its systems, permissions, workflow, and professional judgement never entered the test.

Now enter the field. The input is no longer one file. It is an email, a spreadsheet, a read-only API, and a domain note. In our illustrative case, the source says 46 fair-rental days, but the live output is `NULL`. We are no longer debugging only a model; we are debugging a working system.

Open the trace. “It failed” is not enough for a product team to reproduce anything. The FDE packages three things together: the original source, the exact production trace, and a domain expert’s sign-off on the correct answer. That becomes one reproducible case file.

This also shows the role difference without ranking the roles. The Product Engineer owns a capability that must work across customers. The Domain Expert owns what “correct” means. The FDE works across the boundary and owns whether this real workflow succeeds end to end.

Next, make the failure testable. The evidence packet moves back into the product as an eval with an expected answer. A candidate fix must pass that targeted eval, avoid new regression failures, and still receive human review. The customer problem is no longer an anecdote; it has become product memory.

Finally, replay the system on a new illustrative case: 52 days, a different customer, correct on the first run, with no FDE rescue. That is the aha moment. A strong FDE does not become a permanent human patch; one field failure becomes a reusable capability.

OpenAI’s published Tax AI case with Crete gives us the real scale behind the illustration: 7,000 returns processed, with the share reaching at least 75% correct fields rising from 25% to 86% in six weeks. Practitioners, traces, evals, engineering changes, and human review formed the loop—the FDE did not act as a lone hero.

### 口述 — 中文

FDE 是 **Forward Deployed Engineer** 的缩写，通常翻译成“前向部署工程师”。

这个词和前面几个不一样：FDE 是一种职位，不是一种模型。

先看干净的 demo：一份整齐的文件进去，字段全部填好，结果显示 PASS，看起来已经可以上线。但右侧整家公司仍然被遮在画框之外：系统、权限、工作流程和专业判断，根本没有进入这次测试。

现在进入现场。输入不再是一份文件，而是邮件、表格、只读 API 和领域备注。在这个示意案例里，原始资料写着 46 个公平出租日，但线上输出却是 `NULL`。这时我们调试的已经不只是模型，而是一整套工作系统。

接着打开 trace。只说一句“它失败了”，产品团队其实什么也复现不了。FDE 会把三样东西打包在一起：原始资料、当时的生产运行记录，以及领域专家对正确答案的确认。这样，一次抱怨才变成一个可以重现的案例文件。

这个画面也顺便说明了三种角色的区别，但不是给职位排高低。产品工程师负责让通用能力可以服务很多客户；领域专家负责判断什么才是正确；FDE 横跨中间边界，对这条真实流程能不能端到端跑通负责。

下一步是把失败变成测试。黄色证据包回到产品侧，变成一条有明确期望答案的 eval。候选修复不仅要通过针对性评测，还不能引入新的回归问题，并且要经过人工审核。到这里，客户现场的一次问题才真正变成了“产品记忆”。

最后，用一个新的示意案例重放：另一个客户、52 天、第一次就答对，而且不需要 FDE 再来救火。这就是 aha moment：优秀的 FDE 不是长期充当人工补丁，而是把一次现场失败变成下一位客户也能直接使用的产品能力。

OpenAI 与 Crete 的 Tax AI 官方案例，给了这段示意背后的真实规模：共处理 7,000 份税表；六周内，达到“至少 75% 字段正确”的税表比例从 25% 上升到 86%。真正形成闭环的是税务专家、运行记录、评测、工程修改和人工审核，而不是某个 FDE 单枪匹马修好一切。

### Optional depth — English

The role is historically associated with Palantir. Company definitions vary, but the meaningful version owns real production work and outcomes—not only consulting or sales demos. Its renewed popularity suggests that deployment knowledge has become a competitive advantage.

### 可选补充 — 中文

从历史上看，这个职位与 Palantir 关系很深。不同公司的定义会有差别，但真正有意义的 FDE 会负责生产系统和实际结果，而不只是咨询或售前演示。这个职位重新流行，也说明“怎样真正完成部署”本身已经成为一种竞争优势。

### Transition — English

Today, people such as FDEs deliberately close the feedback loop. The final question is how much of the improvement loop AI itself could eventually close.

### 过渡 — 中文

今天，FDE 这样的角色仍然由人来主动闭合反馈回路。最后一个问题是：这条改进 AI 的回路，未来有多少部分能够由 AI 自己闭合？

---

## Slide 7 — RSI

### On screen

- **RSI — Recursive Self-Improvement**
- **Not RSI:** correcting one answer changes the output, not the AI builder
- **Bounded method:** humans lock the goal and evaluator; AI generates candidates
- **Evolutionary loop:** generate → run → verify → score → select → repeat
- **Real effect:** AlphaEvolve improved one Gemini training kernel by **23%**, reducing overall training time by **1%**
- **Full RSI requirement:** Model N improves the builder → builder creates Model N+1 → Model N+1 becomes better at improving the next builder
- Persistent boundary: **Full RSI remains unproven and is not inevitable.**

### Stage cues / 演示提示

- **01 — Not yet / 还不是：** point from the same AI to the corrected answer, then to the unchanged builder. Click **Open the builder**. / 从同一个 AI 指到被修正的答案，再指向完全没变的 AI 工厂；然后点击 **Open the builder**。
- **02 — Bounded builder / 有边界工厂：** point to the two locks first—human goal and evaluator—then follow AI → candidate belt → evaluator → score. Click **Release candidates**. / 先指两个锁：人定义的目标和评测；再按 AI → 候选方案传送带 → 评测器 → 分数来讲。点击 **Release candidates**。
- **03 — Selection / 筛选：** follow Patch B into the correctness gate and reject it despite 69 ms; then follow Patch C through both gates to **NEW BEST**. Click **Install the winner**. / 看 Patch B 虽然只有 69 ms，却在正确性门口被拒绝；再看 Patch C 通过两道门成为 **NEW BEST**。点击 **Install the winner**。
- **04 — Real effect / 真实效果：** show where the winning patch lands—the training kernel—then read the official +23% → −1% numbers and click **Ask what recurses**. / 先指出获胜代码被装进训练 kernel，再读官方 +23% → −1% 数据，然后点击 **Ask what recurses**。
- **05 — What must recurse? / 什么必须递归？：** read AI N → Builder v1→v2 → AI N+1. Then follow the return strip right to left: **AI N+1 proposes the next change → Builder v2**. Land on **LASTING**, **INHERITED**, and **COMPOUNDING**, then finish at **FULL RSI · UNPROVEN**. / 先从 AI N、Builder v1→v2 讲到 AI N+1；再沿回程条从右向左看：**AI N+1 提出下一次改进 → Builder v2**。最后落在 **LASTING**、**INHERITED**、**COMPOUNDING**，并以 **FULL RSI · UNPROVEN** 收尾。

### Say — English

RSI stands for **Recursive Self-Improvement**. This is the most speculative term in the talk, so we should begin by removing a common misunderstanding.

Suppose an AI notices that its answer is wrong and changes “42 days” to “46 days.” The answer improved, but the model and the process that built it did not change. That is self-correction, not RSI.

The “builder” means the wider process used to create AI: data, code, training methods, evaluations, and infrastructure. RSI asks whether AI can improve that process, so that the next AI inherits the improvement.

Today we can already build a smaller, bounded version of this loop. Humans choose the goal: make one piece of training code faster. Humans also define the evaluator: the output must stay correct and the runtime must go down.

Inside that box, AI generates many candidate programs. An automatic evaluator actually runs them, checks the answer, measures the time, and gives each one a score. The best verified candidate becomes the seed for the next round. This is similar to evolution: generate variation, test it, select what works, and repeat.

The evaluator is the crucial part. A candidate that runs in 69 milliseconds looks impressive, but if it gives the wrong answer, it is rejected. The AI does not survive because it claims to be better; it survives because an external test can measure the improvement.

AlphaEvolve is a useful real example of this method. It uses language models to propose programs, automatic evaluators to verify and score them, and an evolutionary process to keep improving promising ideas. Google DeepMind reports that it made one kernel used in Gemini training 23% faster, which reduced overall training time by 1%.

That result is real and valuable—but look at exactly what improved. A training tool became faster. The current model did not suddenly rewrite its own mind or become independently smarter. The benefit was less time and compute for the same training job.

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
- [OpenAI — Building self-improving tax agents with Codex](https://openai.com/index/building-self-improving-tax-agents-with-codex/)
- [Anthropic — When AI builds itself](https://www.anthropic.com/institute/recursive-self-improvement)
- [Google DeepMind — AlphaEvolve](https://deepmind.google/blog/alphaevolve-a-gemini-powered-coding-agent-for-designing-advanced-algorithms/)
