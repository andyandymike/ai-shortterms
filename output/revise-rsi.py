import json
from pathlib import Path

root=Path('D:/Code/ai-shortterms/deck')
path=root/'app/session-2/cue-plan.json'
plan=json.loads(path.read_text(encoding='utf-8'))

def segment(kind, label, end, say, **kwargs):
    return dict(kind=kind, **kwargs, label=label, end=end, say=say)

def cue(id, beat, label, action, segments, transition):
    return dict(id=id, beat=beat, label=label[0], labelEn=label[1], action=action[0], actionEn=action[1],
                look=segments[-1]['end'], say=[' '.join(s['say'][i] for s in segments) for i in range(2)], transition=transition,
                scene=segments[0] if len(segments)==1 else dict(kind='sequence', segments=segments))

new=[]
new.append(cue('R0-term','R0',['RSI 想解决什么','What RSI is trying to do'],['停留在章节开场','Hold the chapter opening'],[
    segment('static',['从改进到递归','From improvement to recursion'],['RSI 与英文全称独占开场页','RSI and its full name fill the opening page'],[
        '研发 AI 要反复想方案、写实验、检查结果。人能做的尝试有限，所以希望 AI 也能承担这些工作。RSI，Recursive Self-Improvement，递归自我改进，进一步问：改进后的 AI 系统，能不能继续参与下一轮改进？先看怎样判断一次改动有没有用，再看三种不同做法。',
        'Developing AI involves proposing ideas, running experiments and checking results. People have limited time for those trials, so we want AI to help. Recursive Self-Improvement asks a further question: can the improved AI system participate in the next improvement round? First see how we judge one change, then compare three approaches.'
    ])],['先从一个容易看懂的排序程序开始。','Start with a sorting program we can inspect.']))

new.append(cue('R4-challenge','R4',['从原程序 A 开始','Start with program A'],['播放 A，停在检查结果','Run A and hold its checked result'],[
    segment('sort',['原来的程序','The original program'],['A 排对了，右侧仍使用 A','A sorts correctly and remains in use'],[
        'A 是原来使用的排序程序，结果正确。现在想让它少做些工作。这里把比较和写入次数加起来当作工作量，不是运行秒数。三个候选是预先写好的，数字移动来自实际执行。',
        'A is our original sorting program, and its result is correct. We want it to do less work. Here work is the number of comparisons plus array writes, not elapsed seconds. The three candidates are prewritten, and the numbers follow their actual execution.'
    ],candidate='A',run=True,checked=True,delay=55,hold=650)],['','']))

new.append(cue('R4-keep','R4',['两次尝试','Two attempts'],['分别播放 B、C，每次检查后自动停住','Run B and C separately; hold after each check'],[
    segment('sort',['第一次尝试失败','The first attempt fails'],['B 的结果有误，继续使用 A','B gives an incorrect result; keep A'],[
        '第一次尝试 B，只走一遍，工作确实少了，但红色数字还没排对。改得快没有用，先得正确，所以右边 IN USE 仍然是 A。',
        'The first attempt, B, makes only one pass. It uses less work, but the red numbers are still out of order. A cheaper change must still be correct, so IN USE stays A.'
    ],candidate='B',run=True,checked=True,delay=100,hold=700),
    segment('sort',['第二次尝试被采用','The second attempt is adopted'],['C 通过六项测试，以更少工作替换 A','C passes six tests with less work and replaces A'],[
        '再试 C。它通过同一组六项测试，工作量也更少，才替换 A。这就是提出改法、测试、保留结果。眼下变好的是排序程序；如果改的是 AI 自己的工具、参数，或者训练程序，才开始接近我们今天要讲的几条路线。',
        'Try C next. It passes the same six tests with less work, so it replaces A. That is propose, test and retain. So far, a sorting program has improved. Now apply that idea to an AI system’s own tools, parameters or training code.'
    ],candidate='C',run=True,checked=True,delay=110,hold=700)],['第一种做法：模型不变，改它做事的方法。','First: keep the model, change how the agent works.']))

new.append(cue('R8-agent','R8',['改 Agent 的工作方法','Improve the agent’s workflow'],['播放新增检查，再播放评估与复用','Play the added check, then evaluation and reuse'],[
    segment('research',['加一个会复用的检查步骤','Add a reusable check'],['工作流新增 Validate the patch，失败补丁修正后成功应用','Validate the patch is inserted; a failed patch is revised and applied'],[
        '第一条路线改 Agent 的代码。Agent 可以理解成模型加上工具和做事流程。左边 LLM 的 weights 没变，变的是中间：编辑代码后先检查补丁能不能应用，有错就返回重试。DGM，也就是 Darwin Gödel Machine，报告过这类自改工具的做法；这里把过程画成一个简单例子。',
        'The first route changes agent code. Think of an agent as a model plus its tools and workflow. The LLM weights on the left stay fixed. The middle gains a patch check: if an edit cannot apply, return the error and retry. DGM, the Darwin Gödel Machine, reported this kind of tool improvement. This is a simplified illustration.'
    ],**{'from':0,'to':3,'delay':750,'hold':700}),
    segment('research',['改好的 Agent 参与下一轮','Reuse the modified agent'],['在别的编程任务上评估版本，版本库中的 v2 参与后续修改','Evaluate variants on other coding tasks; v2 from the archive helps make later variants'],[
        '一个补丁成功还不够，要用别的编程任务评估整个 Agent。DGM 会保留一个版本库，从不同版本继续探索；图里只画了一条分支。关键是，改好的 Agent 也会参与后面的自我修改。底层模型没重训，系统的做事能力仍然可能改善。',
        'One successful patch is not enough: evaluate the whole agent on other coding tasks. DGM keeps an archive and explores from different variants; this diagram shows one branch. A modified agent also participates in later self-modification. The system can improve even though its base model was not retrained.'
    ],**{'from':3,'to':6,'delay':700,'hold':700})],['第二条路线直接改变模型的 weights。','The second route changes the model’s weights.']))

new.append(cue('R9-training','R9',['从自己生成的解题过程学习','Learn from generated solutions'],['先筛选解题过程，再播放训练与下一批任务','Filter solutions, then play training and the next batch'],[
    segment('research',['做题、核对、重试','Solve, check and retry'],['正确答案被筛出；错误的 7 根据答案提示重试为 10','Matching answers are selected; the wrong 7 is retried with a hint and becomes 10'],[
        '第二条路线像做题后整理练习材料。STaR 从已有题目和标准答案开始，让模型写解题过程。第一题答对，留下；第二题答成 7，给它答案 10，再试着写出能得到 10 的过程。它生成的是解题过程，题目和判断答案的依据仍由外部提供。',
        'The second route resembles collecting useful practice solutions. STaR starts with existing questions and known answers, and asks the model for solution steps. Keep the first correct answer. For the second, wrong answer of 7, give the answer 10 as a hint and try again. The model generates the solution steps; the questions and answer key come from outside.'
    ],**{'from':0,'to':3,'delay':800,'hold':750}),
    segment('research',['用筛选结果训练模型','Train on the selected solutions'],['训练改变 weights，得到的模型继续生成下一批解题过程','Fine-tuning changes weights; the resulting model generates another batch of solutions'],[
        '积累很多这样的例子，再做 fine-tuning，微调：用选出的题目和解题过程训练模型，改变 weights。训练后的模型再生成下一批，继续筛选和训练。这比在一次聊天的 context 里记住一句提示多了一步。也要注意，答案碰巧正确不保证过程正确，模型有没有学好还得用新题检查。',
        'Collect many such examples, then fine-tune: train on the selected questions and solutions to change the weights. The resulting model generates the next batch for another round of selection and training. This goes beyond adding a hint to one conversation’s context. A matching answer does not guarantee sound reasoning, so evaluate learning on new questions.'
    ],**{'from':3,'to':6,'delay':750,'hold':750})],['第三条路线不改做题方式，而是改训练所用的计算程序。','The third route improves the computation used for training.']))

new.append(cue('R5-example','R5',['改训练工具','Improve training tools'],['检查 kernel 改动，再把它放进训练','Check the kernel change, then put it into training'],[
    segment('research',['改训练中反复执行的计算','Improve a repeated training computation'],['Gemini 提议的 kernel 改动通过正确性与速度检查','Gemini’s proposed kernel change passes correctness and speed checks'],[
        '训练 AI 时，有些小段计算会反复运行，这叫 kernel。可以把一次大计算分成小块，怎样分才更适合硬件，会影响效率。AlphaEvolve 用 Gemini 提出改法，再实际运行，检查答案是否正确、速度是否改善。和排序页一样，不能只听 AI 说它更好。',
        'Training repeatedly runs small compute routines called kernels. A large computation can be divided into smaller pieces; how those pieces fit the hardware affects efficiency. AlphaEvolve uses Gemini to propose changes, then runs checks for correctness and speed. As with sorting, a claim of improvement is not enough.'
    ],**{'from':0,'to':2,'delay':850,'hold':700}),
    segment('research',['把改进用回 AI 训练','Use the improvement in AI training'],['同一块 K 移入 Gemini 训练，显示已报告的效率收益','The same K enters Gemini training and the reported efficiency gains appear'],[
        '现在改好的 K 回到 Gemini 的训练里。DeepMind 报告，这类 kernel 平均加速 23%，整体训练时间约减少 1%。因为它反复运行，局部节省也有价值。但这里证明的是训练更省；是否因此得到更会研发的 AI，还要另外检验。',
        'The improved K now goes into Gemini training. DeepMind reported an average 23% kernel speedup and about 1% less total training time. Repeated computation makes those savings useful. This establishes more efficient training; better AI research ability needs separate evidence.'
    ],**{'from':2,'to':3,'delay':700,'hold':800})],['三种做法改的地方不同，最后看递归发生在哪里。','The three approaches change different things. Now locate the recursive step.']))

new.append(cue('R6-next','R6',['三条路线与递归','Three routes and the recursive step'],['对照改动位置，再播放条件性的接棒','Compare what changes, then play the conditional handoff'],[
    segment('research',['先分清改了哪里','Identify what changed'],['三列分别是 Agent 代码、模型 weights、训练工具','Three columns compare agent code, model weights and training tools'],[
        '把三种做法并排看：DGM 改工具和流程，STaR 通过训练改 weights，AlphaEvolve 改训练用的程序。这是帮助理解的分法，不是 RSI 只有这三种。它们的共同问题是：改进会不会反馈到下一轮，帮助系统做出后续改进？',
        'Side by side: DGM changes tools and workflows, STaR trains weights, and AlphaEvolve improves training code. These are useful examples, not an exhaustive taxonomy of RSI. The shared question is whether an improvement feeds back and helps the system make later improvements.'
    ],**{'from':0,'to':0,'delay':0,'hold':0}),
    segment('research',['改进后的系统接着做改进','The improved system takes over'],['条件性回路：v2 回到左侧做改进，右侧出现 v3 问号','Conditional loop: v2 takes over on the left; v3 appears with a question mark'],[
        '递归发生在这条回来的箭头：上一轮改好的系统，参与下一轮改进。这里的系统既可以是模型，也可以包含工具和流程。要检验它是否真的更会改进，得用新任务和相同预算比较。DGM 展示了有限编程 Agent 的反馈回路；这些例子都不能直接推出 AI 已经能无限自我升级。',
        'The return arrow is the recursive step: the improved system participates in the next improvement round. A system can include both a model and its tools and workflow. Compare on new tasks with the same budget to test whether improvement ability grew. DGM demonstrates a bounded coding-agent feedback loop; these examples do not establish unlimited self-improvement.'
    ],**{'from':1,'to':5,'delay':800,'hold':800})],['回到今天的三个问题：能否操作、能否判断、能否继续改进。','Return to our three questions: can it act, decide and keep improving?']))

start=next(i for i,x in enumerate(plan) if x['beat']=='R0')
end=next(i for i,x in enumerate(plan) if x['beat']=='E1')
plan[start:end]=new
path.write_text(json.dumps(plan,ensure_ascii=False,indent=2)+'\n',encoding='utf-8')

p=root/'app/session-2/rsi-story.tsx'
text=p.read_text(encoding='utf-8')
text=text[:text.index('\nexport function RecursiveImprovementStory()')].rstrip()+'\n'
p.write_text(text,encoding='utf-8')

p=root/'public/notes/session-2/reference.md'
text=p.read_text(encoding='utf-8')
start=text.index('## RSI ·')
end=text.index('## 时间不足时',start)
replacement='''## RSI · R0、R4、R8、R9、R5、R6

本章共六页、十二个停留画面。顺序是：为什么关注 RSI → 一个改进循环 → 改 Agent 代码 → 用生成的解题过程训练模型 → 改训练工具 → 递归发生在哪里。保留章节独立开场，将原来三段的 kernel 后继假设换为两段比较与接棒。三个方法是教学组织方式，不是统一的学术分类，也不表示它们各自证明了完整 RSI。提示词、记忆和经验复用也能改变 Agent 的工作方式；self-play 等训练路线可归入改变 weights 的方向，主讲不再另开名词页。

### R4：先看一次改进

A、B、C 是预先编写的排序程序，不是 AI 的三个版本。先运行原有 A，再试只有一遍相邻交换的 B，检查失败后继续用 A；最后试插入排序 C，通过同一套测试且工作更少才替换 A。数字运动来自实际执行。工作量为比较次数加数组写入次数，两者等权，不等于运行时间。

六项固定测试检查升序以及输入值完整保留，覆盖两个局部乱序区、另一种排列、逆序、重复值与负数、空输入、单元素。通过此测试集是有限证据，不是对所有输入的正确性证明。该页说明提出、执行、评估、保留，尚未改进执行研究的 AI。

### R8：DGM 改 Agent 代码

Agent 包含基础模型、工具和流程。DGM 研究让编程 Agent 修改自己的代码，基础模型 weights 保持冻结，并在编程任务上评估变体。画面用新增补丁检查说明这类改动：补丁无法应用时返回错误，再修订。DGM 官方报告包括 patch validation、文件查看、编辑工具和历史记录等改进；画面的补丁、任务和 v1/v2 序列是作者的教学例子，不是原研究录像、真实运行日志或复现实验。

第二幅展示版本评估和复用。真实 DGM 维护有分支的版本库，可从不同旧版本探索，不是永远只保留当前最高分或最新版本；图中只画一条分支。新的 Agent 参与后续自我修改，是系统层面反馈回路的例子。编程 benchmark 的结果和对照实验支持有限范围内的改进，不能外推为无限、自主的通用能力增长。人设计任务、评估和实验边界。

### R9：STaR 用生成的解题过程做训练

STaR = Self-Taught Reasoner，是一条清楚易讲的既有研究路线，不宣称是最新或所有自训练方法的代表。它以已有问题、标准答案和少量带推理过程的示例为起点，生成解题过程；最终答案不对的例子可给出正确答案提示，让模型重试解释，再收集得到正确答案的过程用于 fine-tuning。训练结果用于生成下一轮数据。原论文每轮微调从最初的预训练 checkpoint 重启，不能把示意理解成永远在上一轮 weights 上接着训练。

画面的两道苹果题是教学例子。第二题先显示 5 + 2 = 7，再根据已知答案 10 重试，筛选后用于训练；网络连线变化仅表示 weights 会更新，没有网页内的训练或实测性能数据。题目和答案依据来自外部，不是模型无条件给自己打分。筛选看答案，因此匹配答案也可能保留有问题的解释；需要独立新题评价学习效果。这种反复训练与在一次聊天的 context 中增加提示是不同的操作。

### R5：AlphaEvolve 改训练工具

Kernel 是训练中反复执行的小段计算。此例优化矩阵乘法 kernel 的 tiling heuristic，即如何选择分块方式；它不是模型 weights 或整套训练目标。Gemini 提出改动，评估器检查正确性和性能，改进再进入 Gemini 训练。DeepMind 技术报告第 15–16 页给出相对于专家设计启发式的平均 23% kernel 加速，以及整体训练时间约 1% 减少。这说明 AI 帮助改善 AI 训练的效率，并不证明新模型更会研发。K 移动是教学示意，没有现场调用或优化真实 kernel。

### R6：比较后再解释递归

第一幅对照三处改动：Agent code、Model weights、Training tools。第二幅展示条件性回路：改进后的 system v2 回到执行改进的位置，参与下一轮，右侧 v3 仍带问号。System 可以包含模型和工具；不必把每次系统更新都说成从头训练了一个新 LLM。新任务、同预算的检查用来解释需要什么证据，图中没有虚构测评分数或赢家。DGM 的有限反馈回路、STaR 的迭代训练、AlphaEvolve 的训练效率结果，各有不同证据范围；不能据此宣布完整、无界的递归自我改进已经实现。

2026-10-15 核对以下原始资料。DGM 参数冻结与版本库来自论文第 1、3 节；STaR 的答案筛选、提示重试和初始 checkpoint 重启来自论文第 3、5 节；AlphaEvolve 数字来自技术报告的 kernel 优化部分。

- [Sakana AI / UBC：Darwin Gödel Machine](https://sakana.ai/dgm/)
- [DGM 论文](https://arxiv.org/html/2505.22954v2)
- [STaR 论文摘要](https://arxiv.org/abs/2203.14465)
- [STaR 论文全文](https://arxiv.org/html/2203.14465v2)
- [Google DeepMind：AlphaEvolve](https://deepmind.google/blog/alphaevolve-a-gemini-powered-coding-agent-for-designing-advanced-algorithms/)
- [AlphaEvolve 技术报告](https://storage.googleapis.com/deepmind-media/DeepMind.com/Blog/alphaevolve-a-gemini-powered-coding-agent-for-designing-advanced-algorithms/AlphaEvolve.pdf)
- [Anthropic Institute：When AI builds itself](https://www.anthropic.com/institute/recursive-self-improvement)

'''
text=text[:start]+replacement+text[end:]
text=text.replace('R4 检查后才替换程序，R5–R6 区分训练提效与递归接棒','R4 检查后才替换程序，R8 改工具、R9 改 weights、R5 改训练计算，R6 再说明接棒')
p.write_text(text,encoding='utf-8')
print('Revised RSI: 6 pages, 12 held visuals, 8 cue groups.')
