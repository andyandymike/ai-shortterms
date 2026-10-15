from pathlib import Path
import hashlib
import json
import re

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / 'output' / 'rsi-plain-motion-copy-2026-10-15'
OUT.mkdir(exist_ok=True)

def read(path):
    return path.read_bytes().decode('utf-8')

def write(path, text):
    path.write_bytes(text.encode('utf-8'))

def digest(text):
    return hashlib.sha256(text.encode('utf-8')).hexdigest()

cue_path = ROOT / 'deck/app/session-2/cue-plan.json'
source_text = read(cue_path)
source_data = json.loads(source_text)
source_rsi = [item for item in source_data if item['beat'].startswith('R')]
write(OUT / 'source-cues.json', json.dumps(source_rsi, ensure_ascii=False, indent=2) + '\n')

claims = [
    ('recursive_step', 'An improved system participates in later self-improvement; continuation and improvement are not guaranteed.', 'RSI', 'asks whether', 'the improved system can continue improving itself', ['No unlimited improvement claim']),
    ('sorting_scope', 'R4 changes an external sorting program, with six fixed tests and work counts, not the AI doing the work.', 'R4', 'tests', 'prewritten sorting programs', ['Work counts comparisons plus writes, not time', 'A correct baseline, B rejected, C retained after six tests with less work']),
    ('dgm_self', 'DGM changes its own agent code while foundation-model weights remain frozen.', 'DGM', 'changes', 'its own tools and workflow', ['Foundation model stays frozen']),
    ('dgm_evaluation', 'DGM evaluates coding variants and explores a branching archive; a retained variant can do later self-modification.', 'DGM', 'reuses', 'evaluated variants for later self-modification', ['Branching archive, not always latest or best only', 'Bounded coding evidence']),
    ('dgm_teaching', 'The pictured patch check, tasks, and A/B sequence are teaching examples, not measured DGM output.', 'R8', 'illustrates', 'one possible branch', ['No fake measurements', 'C or next change remains conditional']),
    ('star_source', 'STaR receives existing questions, known answers, and a few reasoning demonstrations, then generates solution steps.', 'STaR', 'generates', 'solutions for externally supplied questions', ['Questions and answer key come from outside']),
    ('star_filter', 'STaR filters by final-answer correctness; failed cases may retry with the correct answer as a hint.', 'STaR', 'selects', 'solutions with matching answers', ['A correct final answer does not guarantee sound reasoning']),
    ('star_training', 'Selected solutions train a model which generates the next solution batch; each original-paper round starts from the original pretrained checkpoint.', 'STaR', 'uses', 'newly trained models to generate later training data', ['Do not imply continued fine-tuning of the previous checkpoint', 'Animation does not train or measure a model']),
    ('alpha_scope', 'AlphaEvolve uses Gemini to improve a kernel-tiling heuristic for Gemini training, checked for correctness and speed.', 'AlphaEvolve', 'improves', 'a repeated computation used in Gemini training', ['Not a model-weight change or whole training objective']),
    ('alpha_numbers', 'DeepMind reported average 23% kernel speedup over an expert-designed heuristic and about 1% less total training time.', 'DeepMind', 'reports', '23% routine speedup and approximately 1% total training time reduction', ['Different denominators', 'Reported, not measured by this deck']),
    ('alpha_limit', 'This AlphaEvolve result does not show the newly trained model returning to conduct a better next improvement round.', 'AlphaEvolve result', 'does not establish', 'better AI research ability or a completed recursive cycle', ['Training efficiency only']),
    ('human_limits', 'Humans still set objectives, tasks, evaluation and compute budgets; successive improvement needs further evidence.', 'People', 'define', 'research and evaluation boundaries', ['Animation is not an evaluation winner or general successor model']),
]
axes = [
    ('diction.concrete_action', 'diction', 'Name the actor, its own tool or solution sheets, and the visible movement.', ['Assistant A/B', 'own tool', 'moves back', 'takes over'], ['Abstract route taxonomy', 'Unexplained weights, kernel, fine-tuning in main narration']),
    ('discourse.one_held_result', 'discourse', 'One causal point per held picture, with only the detail needed for that point.', ['Narration refers to the object that just moved', 'Next actor explicitly named'], ['Several definitions inside one cue']),
    ('stance.evidence_boundaries', 'stance', 'Keep teaching illustration and measured research distinct.', ['conditional next change', 'reported 23% and about 1%', 'compact caveats in reference'], ['Guaranteed C', 'Claiming three complete RSI routes']),
]
contract = {
    'schema_version': '1.0',
    'task_context': {'mode':'adapt', 'source_locale':'zh-CN', 'output_locale':'en-US', 'source_base_language':'zh', 'output_base_language':'en', 'channel':'Bilingual presentation narration and English audience metadata', 'audience':'Viewers without AI background', 'speaker_role':'Presenter explaining visible steps', 'risk':'normal', 'content_mode':'bounded', 'generation_profile':'standard'},
    'style_profiles': [],
    'style_contract': {'request_text':'Use simple movement and plain speech to explain why the RSI examples are relevant to self-improvement.', 'strength':2, 'presets':[], 'axes':[
        {'axis_family':family, 'axis_id':aid, 'target':target, 'intensity':2, 'required':True, 'confidence':'high', 'sources':[{'kind':'user_explicit','id':'current_request','constraint_role':'target','evidence':'Simple movement, fewer complex terms, understandable to a nontechnical audience.','priority':300}], 'resolved_from':['current_request'], 'resolution_reason':'Tie the explanation to the pictured actor and its next action.', 'inherits_global_strength':True, 'observable_signals':positive, 'must':positive, 'may':[], 'forbid':negative}
        for aid,family,target,positive,negative in axes], 'conflicts':[], 'assumptions':['English projection; Chinese and English presenter notes share one causal sequence. Technical qualifications remain in reference and demonstration notes.']},
    'references': {'samples':[], 'holdout_ids':[], 'forbidden_content_transfer':[]},
    'content_locks': {'claim_policy':'source_only', 'allowed_new_claim_classes':[], 'lock_ledger':[
        {'lock_id':name,'category':kind,'source_span':value,'canonical_value':value,'match_mode':'byte_exact','required':True,'allowed_localizations':[]}
        for name,kind,value in [('rsi_term','term','Recursive Self-Improvement'),('dgm_name','entity','DGM'),('star_name','entity','STaR'),('alpha_name','entity','AlphaEvolve'),('gemini_name','entity','Gemini'),('routine_gain','number','23%'),('training_gain','number','1%')]],
        'claim_ledger':[{'claim_id':cid,'source_span':span,'subject':subject,'predicate':predicate,'object':obj,'polarity':'negative' if cid=='alpha_limit' else 'positive','modality':None,'conditions':[],'qualifiers':quals,'exceptions':[],'attribution':'Existing source/reference and parent-verified research','materiality':'material','required':True,'allowed_transform':'translate'} for cid,span,subject,predicate,obj,quals in claims]},
    'locale_realization': {'adapter':'en','locale':'en-US','signals':['Plain English clauses; Chinese authored from the same claims with natural spoken order.'],'forbidden_transfers':['Literal translations of English abstractions into Chinese.']},
    'evaluation': {'claim_ledger_coverage_required':True,'claim_ledger_coverage_artifact_ref':'coverage.json','claim_alignment_required':True,'semantic_audit':'independent','hard_gates':['content','required_axes','negative_constraints','reference_overlap','semantic_audit'],'style_checks':['One causal point per picture','Full RSI name only at opening'],'fluency_checks':['Read aloud in both languages'],'overlap_checks':['No external style samples supplied; required names and source facts are retained.']},
}
write(OUT/'style-contract.json', json.dumps(contract,ensure_ascii=False,indent=2)+'\n')
write(OUT/'coverage.json', json.dumps({'source':'source-cues.json plus existing RSI reference section and assigned verified facts','source_sha256':digest(json.dumps(source_rsi,ensure_ascii=False)),'claim_ids':[x[0] for x in claims],'coverage':'All material facts are represented; technical detail may move to reference but may not disappear.'},ensure_ascii=False,indent=2)+'\n')

def segment(start,end,label,look,say,delay=1050,hold=850):
    return {'kind':'research','from':start,'to':end,'delay':delay,'hold':hold,'label':label,'end':look,'say':say}

def update_sequence(cue,label,action,transition,segments):
    cue['label'],cue['labelEn']=label
    cue['action'],cue['actionEn']=action
    cue['look']=segments[-1]['end']
    cue['say']=[' '.join(s['say'][i] for s in segments) for i in range(2)]
    cue['transition']=transition
    cue['scene']={'kind':'sequence','segments':segments}

updated = {item['id']:item for item in source_rsi}
c=updated['R0-term']
c['label'],c['labelEn']=['改好的助手再接棒','The improved assistant takes over']
c['say']=[
    'RSI 是 Recursive Self-Improvement，递归自我改进。设想一个 AI 助手先改好自己的工具，再让带着新工具的助手做下一次改进。我们要看的是：改好的那个，能不能接着改自己？先从一次容易看懂的改进开始。',
    'RSI means Recursive Self-Improvement. Imagine an AI assistant improving its own tools. The assistant with those new tools then works on the next improvement. Can the improved assistant keep improving itself? Start with one change we can easily check.'
]
c['scene']['label']=['改好的助手能否继续改自己','Can the improved assistant improve itself again?']
c['scene']['say']=c['say']

c=updated['R4-keep']
c['scene']['segments'][1]['say']=[
    '再试 C。它通过同一组六项测试，工作量也更少，才替换 A。这次变好的是排序程序。下一页，把注意力转向做事的助手：如果它改的是自己的工具，又会怎样？',
    'Try C next. It passes the same six tests with less work, so it replaces A. Here we improved a sorting program. Next, watch the assistant doing the work: what happens when it changes its own tools?'
]
c['say']=[' '.join(s['say'][i] for s in c['scene']['segments']) for i in range(2)]
c['transition']=['接下来，助手开始改自己的工具。','Now the assistant changes its own tool.']

update_sequence(updated['R8-agent'],
    ['改自己的工具，再接棒','Change its own tool, then take over'],
    ['分三次播放：改自己的工具、检查、B 接棒','Play three pictures: own tool changes, testing, then B takes over'],
    ['另一个例子里，传到下一轮的是训练材料。','In the next example, training material carries the process forward.'],
    [
        segment(0,3,['A 改自己的工具','A changes its own tool'],['同一块 Check 移进 A 自己的 Edit → Use 工具','The same Check tile moves into A’s own Edit → Use tool'],[
            '看 A 自己的工具。原来改完就用，现在 A 在中间加了一步检查：先看看改动能不能用，再使用。DGM 研究中有这类改进；这里把它画成一个简单例子。',
            'Look at A’s own tool. It used to go straight from editing to using the result. A adds a check in between: check that the edit can be applied before using it. DGM includes this kind of improvement; this is a simple illustration.'
        ]),
        segment(3,5,['试过之后，留下 B','Test it, then keep B'],['新工具在其他任务上接受检查，带着它的助手 B 出现在右边','The new tool is tested on other tasks; assistant B appears on the right with that tool'],[
            '这套新工具还要放到其他编程任务里试一试。检查之后，留下带着新工具的 B。这里的测试只是示意；真实研究要评估整个助手做事的结果。',
            'Try the new tool on other coding tasks. After checking it, keep B with the new tool. The tests here are only an illustration; the research evaluates how the whole assistant performs.'
        ]),
        segment(5,8,['B 回来，继续改自己','B returns to work on itself'],['B 从右边移到左边，带着新工具开始尝试下一次修改','B moves from right to left and uses its new tool to begin another change'],[
            '注意 B 回到了左边。现在由 B 带着新工具，继续尝试改自己的工具。上一轮的成果，成了下一轮动手改进的助手。DGM 展示了这样的回路；下一次能否再改好，还要继续检查。',
            'Notice B moving back to the left. B now uses its new tool to try another change to itself. The result of one round becomes the assistant doing the next round. DGM shows this kind of loop; whether the next change helps still needs checking.'
        ]),
    ])

update_sequence(updated['R9-training'],
    ['新模型来做下一批材料','The new model makes the next batch'],
    ['分三次播放：筛选解题过程、训练、B 生成下一批','Play three pictures: select solutions, train, then B makes the next batch'],
    ['再看一个只展示了部分过程的例子：AI 让训练更快。','Now an example that shows part of the process: AI makes training faster.'],
    [
        segment(0,2,['留下答对的解题过程','Keep solutions with matching answers'],['A 写出的解题过程经过答案核对，选出的纸张留下','A’s solution sheets are checked against known answers; selected sheets remain'],[
            'STaR 从已有题目和标准答案开始。A 写出解题过程，再核对最后的答案，留下答对的那几份。纸上是它写出的解题过程，题目和标准答案由外部提供。',
            'STaR starts with supplied questions and known answers. A writes solution steps, then the final answers are checked. Keep the sheets whose answers match. The model writes the solutions; the questions and answer key come from outside.'
        ]),
        segment(2,4,['材料进入训练，得到 B','Train on those sheets to produce B'],['选中的解题过程移入训练，右边出现新模型 B','Selected solutions move into training; the new model B appears on the right'],[
            '这些被选中的解题过程移进训练，成为练习材料。积累很多这样的材料，再用它们训练模型，得到 B。图里的几张纸代表一大批例子。',
            'The selected solutions move into training as practice material. Collect many such examples and use them to train a model, producing B. The few sheets here stand for a much larger batch.'
        ]),
        segment(4,6,['B 来写下一批解题过程','B writes the next batch of solutions'],['B 移到左边，写出下一轮要筛选的解题过程','B moves to the left and writes solutions for the next round of selection'],[
            'B 回到了左边，开始写下一批解题过程。它既是上一轮训练的结果，又在制作下一轮的训练材料。这就是这个例子里回来的那一步。',
            'B moves back to the left and writes the next batch of solutions. It is both the result of the last training round and the maker of material for the next one. That is what comes back into the next round.'
        ]),
    ])

update_sequence(updated['R5-example'],
    ['让训练中的小计算更快','Speed up a small training computation'],
    ['检查改动，再把同一块计算放回训练','Check the change, then move the same computation into training'],
    ['最后并排看清：哪些例子真的接上了下一轮？','Finally, compare which examples show something returning for the next round.'],
    [
        segment(0,2,['改快一个反复运行的小计算','Speed up a repeated small computation'],['Gemini 提出的改动接受正确性与速度检查','Gemini’s proposed change is checked for correctness and speed'],[
            '训练 AI 时，有些小计算会反复运行。AlphaEvolve 让 Gemini 试着改快其中一个，再检查结果有没有算对、是否真的更快。接下来，这块改好的计算会放回训练里。',
            'Training AI repeats some small computations many times. AlphaEvolve uses Gemini to try improving one, then checks whether it is correct and faster. The improved computation will go back into training.'
        ],1050,850),
        segment(2,3,['放回训练，节省时间','Put it into training to save time'],['同一块计算移入 Gemini 训练，显示已报告的效率收益','The same computation enters Gemini training and the reported gains appear'],[
            '同一块计算回到了 Gemini 的训练中。DeepMind 报告，这段计算平均加速 23%，让整体训练时间约少 1%。这说明训练更快了；这个结果没有展示新模型回来做下一轮改进。',
            'The same computation goes into Gemini training. DeepMind reported an average 23% speedup for that routine and about 1% less total training time. Training became faster; this result does not show the new model returning to make the next improvement.'
        ],1050,850),
    ])

update_sequence(updated['R6-next'],
    ['谁接过了下一轮','Who takes over the next round'],
    ['先对照已有结果，再播放 B 回到左边接棒','Compare the evidence, then play B returning to take over'],
    ['回到今天的三个问题：能否操作、能否判断、能否继续改进。','Return to our three questions: can it act, decide and keep improving?'],
    [
        segment(0,0,['三个例子走到了不同的地方','The examples show different parts of the process'],['DGM：新助手继续改自己；STaR：新模型做下一批材料；AlphaEvolve：训练更快，下一轮未展示','DGM: improved helper works on itself again; STaR: new model makes the next practice set; AlphaEvolve: training is faster, next round not shown'],[
            'DGM 中，改好的助手继续改自己的工具。STaR 中，新模型制作下一轮的训练材料。AlphaEvolve 这个成果让训练更快，但没有展示新模型接棒。这三个例子走到了不同的地方。',
            'In DGM, the improved assistant works on its own tools again. In STaR, the new model makes material for the next training round. This AlphaEvolve result makes training faster, but does not show the new model taking over. The examples show different parts of the process.'
        ],0,0),
        segment(1,7,['上一轮的成果，接过下一轮','The result of one round takes over the next'],['B 回到左边成为改进者，右边的 C 仍带问号','B returns to the left to make another improvement; C on the right still has a question mark'],[
            '看 B 的移动：它先出现在右边，是这轮的结果；接着回到左边，成为下一轮动手改进的助手。RSI 要看的，就是改好的自己能不能继续改自己。C 还带着问号，因为下一次是否进步，仍要测试。',
            'Watch B move. First it appears on the right as this round’s result. Then it returns to the left to make the next improvement. RSI asks whether the improved system can keep improving itself. C still has a question mark because the next improvement must be tested.'
        ],1000,850),
    ])

# Parse top-level object spans, then replace only the RSI objects in the latest file.
latest = read(cue_path)
decoder = json.JSONDecoder()
position = latest.index('[') + 1
spans = []
while True:
    while latest[position].isspace() or latest[position] == ',':
        position += 1
    if latest[position] == ']':
        break
    obj,end = decoder.raw_decode(latest, position)
    if obj.get('id') in updated:
        spans.append((position,end,obj['id']))
    position = end
before_nonrsi = [item for item in json.loads(latest) if not item['beat'].startswith('R')]
for start,end,cid in reversed(spans):
    value = json.dumps(updated[cid], ensure_ascii=False, indent=2)
    value = value.replace('\n','\n  ')
    latest = latest[:start] + value + latest[end:]
assert [item for item in json.loads(latest) if not item['beat'].startswith('R')] == before_nonrsi
write(cue_path,latest)

content_path=ROOT/'deck/app/session-2/content.ts'
content=read(content_path)
notes='''  rsi: [
    'R4 improves an external sorting program. R8 then makes the self-improvement relationship visible: assistant A changes its own tool, the changed assistant B is tested, and B returns to do another change. R9 shows a different return: a trained model makes the next batch of training solutions. R5 shows faster training without demonstrating that the new model returns as a better researcher. These examples have different evidence, not three equally complete RSI routes.',
    'R8 illustrates a patch check, one type of tool improvement reported by DGM. The moving Check tile, tasks and A/B sequence are authored teaching examples, not a replay of a measured run. DGM changes agent code while foundation-model weights stay frozen. It evaluates coding variants and explores a branching archive; the diagram shows one possible branch, not a rule to keep only the latest or highest-scoring agent. B can attempt another change, whose success is not guaranteed. The evidence concerns bounded coding-agent improvement.',
    'R9 uses solution sheets to illustrate STaR. Existing questions, known answers and a few reasoning demonstrations come from outside. Generated solutions are filtered by final-answer correctness; wrong cases can be retried with an answer hint. Selected solutions support fine-tuning, and the resulting model generates later batches. In the original algorithm each fine-tuning round restarts from the original pretrained checkpoint, rather than continuing to train the previous round’s model. A matching answer does not guarantee sound reasoning. The diagram performs no model training and shows no measured capability gain.',
    'R5 illustrates a reported AlphaEvolve result. Gemini proposes a kernel-tiling heuristic for a computation repeated during training. Evaluators check correctness and speed, and the improvement enters Gemini training. DeepMind reports an average 23% kernel speedup over its expert-designed heuristic and about 1% less total training time. Those are different measures. This result does not establish better AI research ability or show the trained successor returning to make another improvement.',
    'R6 first distinguishes those results, then uses a generic conditional handoff: A makes a change, B is checked, and B returns to do the next round. C remains a question. Our animation demonstrates no evaluation winner, general successor model or unlimited recursive improvement. Humans still set objectives, evaluation and compute budgets; further improvement needs evidence on new tasks at comparable budgets.',
    'The handwritten sorting programs execute locally. Work counts comparisons plus array writes with equal weight; these counts are not milliseconds. The retained program must pass the same six fixed tests and use less work than the currently retained method.',
    'The six tests cover two tangled groups, a different ordering, reverse order, duplicates with a negative value, an empty input, and one item. Passing them supports a bounded claim about this suite, not a proof for every input.',
    'The shared question is whether an improvement changes the system that does subsequent improvement work. Repeating a fixed workflow, improving one answer, and optimizing an unrelated program do not by themselves establish that feedback loop. The scope and evaluation of each published method remain distinct.',
  ],'''
start=content.index('  rsi: [')
end=content.index('\n  ],',start)+len('\n  ],')
content=content[:start]+notes+content[end:]
chapter='''  { id:'rsi', name:'RSI', term:'RSI', color:'green', sources:rsiSources, beats:[
    { id:'R0', label:'Chapter opening', title:'RSI', subtitle:'Can the improved assistant improve itself again?', takeaway:'The assistant improves itself, then takes over the next round.', next:'Start with one change we can check', term:{ name:'RSI', fullName:'Recursive Self-Improvement' } },
    { id:'R4', label:'One improvement', title:'Try a change. Check the result.', subtitle:'Keep A when B fails. Keep C when it passes with less work.', takeaway:'Here the sorting program improves. Next, the assistant changes its own tool.', next:'Watch the assistant change its own tool' },
    { id:'R8', label:'DGM · Own tools', title:'The improved assistant takes over', subtitle:'A changes its own tool. Test B. Let B try the next change.', takeaway:'B is the result of one round and the assistant doing the next.', next:'Now watch training material return' },
    { id:'R9', label:'STaR · Practice material', title:'The new model makes the next batch', subtitle:'Write solutions. Keep selected ones. Train B. Let B write more.', takeaway:'The result of training helps make material for the next training round.', next:'What if AI makes training faster?' },
    { id:'R5', label:'AlphaEvolve · Faster training', title:'AI helps make AI training faster', subtitle:'Improve a repeated computation, then put it back into training.', takeaway:'Training is faster. This result does not show the new model taking over.', next:'Compare what the examples show' },
    { id:'R6', label:'Taking over', title:'Who comes back for the next round?', subtitle:'Follow B from the result on the right to the assistant on the left.', takeaway:'The improved system becomes the one doing the next improvement.', next:'Bring the three questions together' },
  ] },'''
start=content.index("  { id:'rsi',")
end=content.index('\n  ] },',start)+len('\n  ] },')
content=content[:start]+chapter+content[end:]
write(content_path,content)

reference_path=ROOT/'deck/public/notes/session-2/reference.md'
reference=read(reference_path)
start=reference.index('## RSI ·')
end=reference.index('\n## 时间不足时',start)
original_section=reference[start:end]
source_links=original_section[original_section.index('- [Sakana AI'):].rstrip()
section='''## RSI · R0、R4、R8、R9、R5、R6

本章共六页、十四个停留画面。主线只抓一件事：上一轮改好的那个，是否回到左边，成为下一轮动手改进的那个。R0 保留 RSI 全称；后面用“助手、自己的工具、训练材料、接棒”跟随移动讲解。R8 的三幅依次是 A 改自己的工具、检查后留下 B、B 回来继续改自己。R9 的三幅依次是筛选解题过程、材料进入训练得到 B、B 回来写下一批。R5 保留两幅，展示改好的小计算回到训练；R6 先区分三个例子的证据，再用 B 回到左边的移动解释接棒。

三个例子不是三条已经同等成立的 RSI 路线。DGM 展示有限范围内的自改回路；STaR 展示新模型制作下一轮训练材料；此处 AlphaEvolve 成果展示训练效率改善，没有展示新模型回来做下一轮改进。技术名词和限定放在本参考稿，主讲不再按“改代码、改 weights、改基础设施”分类。

### R4：先看一次改进

A、B、C 是预先编写的排序程序，不是 AI 的三个版本。先运行原有 A，再试只有一遍相邻交换的 B，检查失败后继续用 A；最后试插入排序 C，通过同一套测试且工作更少才替换 A。数字运动来自实际执行。工作量为比较次数加数组写入次数，两者等权，不等于运行时间。

六项固定测试检查升序以及输入值完整保留，覆盖两个局部乱序区、另一种排列、逆序、重复值与负数、空输入、单元素。通过此测试集是有限证据，不是对所有输入的正确性证明。该页改好的是外部排序程序，尚未改进执行研究的 AI；结尾明确将注意力转到“助手开始改自己的工具”。

### R8：DGM，改自己的工具后继续改自己

这里的助手对应 Agent，即基础模型、工具和流程组成的系统。DGM 让编程 Agent 修改自己的代码，基础模型 weights 保持冻结，再用编程任务评估变体。第一幅让同一块 Check 从提议位置移入 A 自己的 Edit → Use 工具，形成 Edit → Check → Use。检查补丁能否应用是一种已报告的工具改进；画面没有把它说成重训了基础模型。

第二幅将新工具用于其他编程任务，检查后在右边留下带着它的 B。第三幅让同一个 B 从右边经过下方回到左边，开始尝试下一次修改。B 带着上一轮的改动成为下一轮的改进者，是本页要让观众看到的关系。下一次改动仍有待检查，不用一个画出的 C 冒充已经证实的继续提升。

DGM 官方报告包括 patch validation、文件查看、编辑工具和历史记录等改进。画面的工具、任务、检查结果和 A/B 顺序都是作者的教学示意，不是原研究录像、真实日志或复现实验，不含实测分数。真实 DGM 维护有分支的版本库，可从不同旧版本探索；图中只画一条可能分支，不表示永远保留最新或最高分版本。编程 benchmark 和对照实验支持有限范围内的改进，不能外推为无限、自主的通用能力增长。人仍设定任务、评估和实验边界。

### R9：STaR，新模型制作下一轮材料

STaR = Self-Taught Reasoner。已有问题、标准答案和少量带推理过程的示例由外部提供，模型写出解题过程，再按最终答案是否匹配进行筛选。原方法也会对答错的题给出正确答案提示，让模型重试解释；主画面省略这段细节，保留“写解题过程 → 核对答案 → 选中材料”的关系。模型生成的是解题过程，不是自行创造题目和评判标准。

第二幅让选中的纸张移入训练，得到右边的新模型 B。第三幅让同一个 B 回到左边，生成下一批待筛选的解题过程。它既是上一轮训练的结果，又是下一轮材料的生产者。画面的几张纸代表一大批训练例子，没有网页内的真实训练或实测性能提升。

原论文每轮 fine-tuning 从最初的预训练 checkpoint 重启，不能把示意理解成永远在上一轮 weights 上接着训练。答案匹配不保证推理过程正确，仍需用独立新题评估学习效果。此例展示迭代自训练，不证明模型自主改进了训练方法。这与一次聊天的 context 中增加提示也不是同一操作。

### R5：AlphaEvolve，改好的小计算回到训练

主讲只称“训练中反复运行的小计算”。技术上，此例优化矩阵乘法 kernel 的 tiling heuristic，即如何选择分块方式；它不是模型 weights 或整套训练目标。Gemini 提出改动，评估器检查正确性和性能，改进再进入 Gemini 训练。两幅之间移动同一块计算，明确 AI 提出的成果被用于 AI 训练。

DeepMind 技术报告第 15–16 页给出相对于专家设计启发式的平均 23% kernel 加速，以及整体训练时间约 1% 减少。前者是局部计算，后者是整体训练，两者不能混为同一个百分比。这说明 AI 帮助改善 AI 训练效率；该成果没有展示训练出的新模型回来推动下一轮改进，也不证明它更会研发。动画是教学示意，没有现场调用或优化真实 kernel。

### R6：先分清证据，再看 B 接棒

第一幅用三行说明证据差别：DGM 的改好助手继续改自己；STaR 的新模型做下一批训练材料；AlphaEvolve 的训练更快，但下一轮未展示。第二幅是通用、条件性的接棒示意：A 尝试改进自己，B 接受检查后出现在右边，再沿下方回到左边，成为下一轮的改进者。右侧 C 仍带问号。这个移动说明“上一轮的成果成为下一轮的改进者”，不承诺每次都进步。

System 可以包含模型和工具，不必把每次系统更新都说成从头训练一个新 LLM。要判断后续改进能力是否提高，需要新任务、相同预算等可比检查。图中没有虚构测评分数或赢家，也没有证明通用后继模型或无界递归自我改进已经实现；目标、评估和计算预算仍由人设定。

2026-10-15 核对以下原始资料。DGM 参数冻结与版本库来自论文第 1、3 节；STaR 的答案筛选、提示重试和初始 checkpoint 重启来自论文第 3、5 节；AlphaEvolve 数字来自技术报告的 kernel 优化部分。

'''+source_links+'\n'
reference=reference[:start]+section+reference[end:]
reference=reference.replace('R8 改工具、R9 改 weights、R5 改训练计算，R6 再说明接棒。','R8 看 B 带着新工具回来、R9 看 B 制作下一批材料、R5 看改好的计算回到训练，R6 再说明谁接棒。')
write(reference_path,reference)

readme_path=ROOT/'README.md'
readme=read(readme_path)
readme=readme.replace('RSI starts with program A, rejects B and retains C, then moves a kernel improvement into AI training. Only the final page introduces the hypothetical successor taking over the next research cycle.', 'RSI starts with a checked sorting improvement, then follows one assistant changing its own tool and the updated assistant moving back to take over. STaR follows selected solution sheets into training and the new model back to produce the next batch. AlphaEvolve shows a faster computation returning to training; the closing comparison makes clear that this result does not show a successor taking over.')
write(readme_path,readme)

selected = [updated[item['id']] for item in source_rsi]
write(OUT/'selected-cues.json',json.dumps(selected,ensure_ascii=False,indent=2)+'\n')
write(OUT/'candidate-trace.json',json.dumps({
    'generation_profile':'standard','rounds':1,'candidate_count':3,
    'candidates':[
        {'id':'motion-first','editorial_decision':'Make the same B travel from outcome to actor position; narrate each held result.','sample_zh':'B 先出现在右边，是这轮的结果；接着回到左边，成为下一轮动手改进的助手。','sample_en':'B appears on the right as this round’s result, then returns to the left to make the next improvement.','selected':True},
        {'id':'question-first','editorial_decision':'Organize around what changed and who does the next round.','sample_zh':'这次谁变了？B 带着新工具。下一次谁来改？还是这个 B。','sample_en':'Who changed? B has the new tool. Who makes the next change? That same B.','selected':False,'reason':'Questions compete with the visible movement and repeat the same point.'},
        {'id':'workshop-metaphor','editorial_decision':'Explain as a workshop passing better equipment to its next worker.','sample_zh':'先把工具改好，再让带着新工具的助手接着干。','sample_en':'Improve the tool, then let the assistant with that tool carry on.','selected':False,'reason':'An additional workshop analogy could obscure that the assistant changes its own system.'}],
    'assumptions':['English audience labels and bilingual narrator; known technical details remain in the reference.'],
    'required_style_review':'Motion-first uses concrete actors and short causal clauses. Full RSI name occurs only at opening in audience content.',
    'negative_constraints_review':'No three-route taxonomy, main narration does not define weights/kernel/fine-tuning, no claimed measured animation gain.',
    'overlap_review':{'status':'pass','basis':'No external style samples were supplied; overlap consists of retained required names, claims and ordinary functional wording.'},
    'selected_sha256':digest(json.dumps(selected,ensure_ascii=False,indent=2)+'\n'),
    'semantic_audit':'Pending independent content-only review.'
},ensure_ascii=False,indent=2)+'\n')
print(json.dumps({'updated_cues':[c['id'] for c in selected], 'rsi_pictures':sum(len(c['scene'].get('segments',[])) or 1 for c in selected),'non_rsi_cues_preserved':True,'audit_directory':str(OUT)},ensure_ascii=False))
