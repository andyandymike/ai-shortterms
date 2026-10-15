export type Beat = { id: string; label: string; title: string; subtitle: string; takeaway: string; next: string; term?: { name: string; fullName?: string } };
export type Chapter = { id: string; name: string; term: string; color: string; beats: Beat[]; sources: { label: string; url: string }[] };

export const demonstrationNotes: Record<string, string[]> = {
  'computer-use': [
    'C7 illustrates a generic reinforcement-learning principle: practice across tasks, inspect outcomes, and use feedback for parameter updates. OpenAI described CUA as using reinforcement learning. The diagram is not a disclosed CUA training algorithm or a live training run. At inference, new screenshots change context while the illustrated model weights remain fixed.',
    'The return desk stages model requests, tool actions, and screenshot feedback. It does not control an external application. Context includes the goal, the latest observation, and relevant history; it can become stale when the application changes.',
    'The 30-second film is Thomas Ricouard’s finished render, published by OpenAI on 4 September 2026. The real case combines Python and Computer Use. If video playback fails, the source still is shown.',
  ],
  jev: [
    'No live model is called. Probabilities, token chunks, training versions and evaluation outcomes are teaching illustrations. J3 uses equal values to compare output processes; its JSON is a simplified display, not an exact API response. The timing of every animation is chosen for presentation, not a latency measurement.',
    'The caller defines questions, IDs, types and criteria in each request. Choice, Score and Noul are three available answer types, not a fixed number of questions or output values. Each question receives an answer; a Choice includes probabilities over the caller’s options. The same model can handle new question definitions without per-question retraining. TypeSafe currently describes shared weights across accounts and customization through state, instructions and criteria.',
    'TypeSafe describes Jev as producing independent probability outputs in parallel rather than autoregressively generating text. The API delivers typed answers as JSON. J3 illustrates that output-work distinction, not a disclosed internal architecture or a single forward pass. A conventional autoregressive LLM can answer both questions in one call and use JSON Schema to constrain its output; it still generates a sequence. Jev’s narrower output capability and parallel sampling can reduce sequential output work, but real latency depends on input, model, serving hardware and network. TypeSafe’s published speed comparisons are vendor evaluations; some use reasoning-enabled LLMs or wrappers that output full probabilities. They do not establish a universal speed multiplier.',
    'RLCD means Reinforcement Learning for Calibrated Decisions. TypeSafe describes post-training for decisions and calibrated probabilities, but does not disclose its detailed update algorithm here. J5 uses generic feedback and weights updates to explain the goal. Its illustrative change follows many examples, not a fixed numerical update from one email. Calibration is assessed across many independent cases; one correct case or eight correct squares out of ten cannot establish it. JSON Schema alone does not establish semantic correctness or probability calibration; LLMs can also be trained or calibrated for a task.',
    'J8 shows clear and ambiguous tickets, followed by a workload comparison. Its 0.90 cutoff is an author-chosen example using the highest option probability, not the separate distribution confidence or an official recommended threshold. The rule requires task-specific validation. Jev supplies judgments, code routes tickets, and an LLM can write replies. An ordinary LLM can also drive the entire workflow. Test errors, calibration, latency and cost on the same workload before choosing. Occasional classification or a workflow already needing a written answer may be adequately served by LLM JSON. Official documentation was checked on 14 October 2026.',
  ],
  rsi: [
    'R4 follows original sorting program A, failed attempt B, then accepted attempt C. R8, R9 and R5 compare three places to make improvements: agent code (DGM), model weights through selected generated solutions (STaR), and training infrastructure (AlphaEvolve). This is a teaching organization, not a universal taxonomy or a claim that all three establish full RSI. Prompt and memory changes can also alter an agent; self-play and other training methods can update weights.',
    'R8 illustrates patch validation, one type of improvement reported by DGM. The patch, tasks and version sequence are authored examples, not a replay of a measured DGM run. The published system changes agent code while its foundation-model weights stay frozen. It evaluates variants and explores a branching archive; the compact diagram shows one possible branch, not a rule to keep only the latest or highest-scoring agent. Coding evaluations are evidence of bounded coding-agent improvement, not unlimited general research ability.',
    'R9 illustrates STaR with two authored arithmetic examples. It starts from existing questions, known answers and a few reasoning demonstrations. Generated solutions are filtered by final-answer correctness; wrong cases can be retried with an answer hint. The selected solutions support fine-tuning, and the resulting model generates later solution batches. In the original algorithm each fine-tuning round restarts from the original pretrained checkpoint. Matching an answer does not establish that the rationale is sound. No model training or measured capability gain occurs in this slide.',
    'R5 illustrates a reported AlphaEvolve result: Gemini proposes a kernel-tiling heuristic, evaluators test it, and the improvement enters Gemini training. DeepMind reports an average 23% kernel speedup over its expert-designed heuristic and about 1% less total training time. These results do not establish better AI research ability. R6 compares what changed, then illustrates the conditional recursive step: an improved system participates in the next improvement round. No evaluation winner, general successor model or unlimited recursive improvement is demonstrated by our animation. Humans still define objectives, evaluation and compute budgets.',
    'The handwritten sorting programs execute locally. Work counts comparisons plus array writes with equal weight; these counts are not milliseconds. The retained program must pass the same six fixed tests and use less work than the currently retained method.',
    'The six tests cover two tangled groups, a different ordering, reverse order, duplicates with a negative value, an empty input, and one item. Passing them supports a bounded claim about this suite, not a proof for every input.',
    'The shared question is whether an improvement changes the system that does subsequent improvement work. Repeating a fixed workflow, improving one answer, and optimizing an unrelated program do not by themselves establish that feedback loop. The scope and evaluation of each published method remain distinct.',
  ],
};

const computerSources = [
  { label: 'OpenAI · CUA: vision and reinforcement learning', url: 'https://openai.com/index/computer-using-agent/' },
  { label: 'OpenAI · Computer use: the screenshot / action loop', url: 'https://developers.openai.com/api/docs/guides/tools-computer-use' },
  { label: 'Thomas Ricouard / OpenAI · Architectural visualization with Astra · 4 Sep 2026', url: 'https://developers.openai.com/blog/architectural-visualization-with-astra' },
  { label: 'Blender · Python API', url: 'https://docs.blender.org/api/current/' },
];
const jevSources = [
  { label: 'TypeSafe AI · Introducing System One models and Jev', url: 'https://typesafe.ai/blog/introducing-system-one-models-and-jev' },
  { label: 'TypeSafe AI · Models and supported inputs', url: 'https://docs.typesafe.ai/models' },
  { label: 'TypeSafe AI · Independent questions over a shared state', url: 'https://docs.typesafe.ai/primitives' },
  { label: 'TypeSafe AI · Choice: support-ticket example', url: 'https://docs.typesafe.ai/primitives/choice' },
  { label: 'TypeSafe AI · Score', url: 'https://docs.typesafe.ai/primitives/score' },
  { label: 'TypeSafe AI · Noul', url: 'https://docs.typesafe.ai/primitives/noul' },
  { label: 'TypeSafe AI · Probability and confidence', url: 'https://docs.typesafe.ai/confidence' },
  { label: 'TypeSafe AI · RLCD and training objectives', url: 'https://docs.typesafe.ai/introduction/machine-learning-primer' },
  { label: 'Hugging Face · Decoding and generation strategies', url: 'https://huggingface.co/docs/transformers/main/en/generation_strategies' },
  { label: 'Anthropic · Ordinary LLMs can also use structured outputs', url: 'https://platform.claude.com/docs/en/build-with-claude/structured-outputs' },
];
const rsiSources = [
  { label: 'Sakana AI / UBC · Darwin Gödel Machine: changing agent code', url: 'https://sakana.ai/dgm/' },
  { label: 'DGM paper · Frozen foundation models and a branching agent archive', url: 'https://arxiv.org/html/2505.22954v2' },
  { label: 'STaR · Bootstrapping Reasoning With Reasoning', url: 'https://arxiv.org/abs/2203.14465' },
  { label: 'STaR paper · Answer filtering, rationalization and repeated fine-tuning', url: 'https://arxiv.org/html/2203.14465v2' },
  { label: 'Google DeepMind · AlphaEvolve: measured algorithm improvements', url: 'https://deepmind.google/blog/alphaevolve-a-gemini-powered-coding-agent-for-designing-advanced-algorithms/' },
  { label: 'AlphaEvolve technical report · Kernel tiling and training efficiency', url: 'https://storage.googleapis.com/deepmind-media/DeepMind.com/Blog/alphaevolve-a-gemini-powered-coding-agent-for-designing-advanced-algorithms/AlphaEvolve.pdf' },
  { label: 'Anthropic Institute · When AI builds itself: the RSI question', url: 'https://www.anthropic.com/institute/recursive-self-improvement' },
];

export const chapters: Chapter[] = [
  { id:'opening', name:'Opening', term:'THE NEXT MOVES', color:'blue', sources:[], beats:[
    { id:'O1', label:'The map', title:'Talk 02 overview', subtitle:'Three ideas about what AI does next.', takeaway:'Act on a screen. Make a bounded decision. Improve the method.', next:'Start with Computer Use' },
  ] },
  { id:'computer-use', name:'Computer Use', term:'COMPUTER USE', color:'blue', sources:computerSources, beats:[
    { id:'C0', label:'Chapter opening', title:'Computer Use', subtitle:'AI that works through a software interface.', takeaway:'The AI observes the screen and requests actions through tools.', next:'Create a return request', term:{ name:'Computer Use' } },
    { id:'C1', label:'The task and why', title:'Why Computer Use?', subtitle:'Computer Use lets an AI work through an application’s interface.', takeaway:'The goal is a changed application state that can be verified.', next:'Follow one screen-to-action loop' },
    { id:'C4', label:'The loop', title:'How Computer Use works', subtitle:'Follow the cursor, the application, and the screenshot returning to context.', takeaway:'The agent repeats this loop until it can verify the goal.', next:'What if the screen changes?' },
    { id:'C5', label:'Recovery', title:'How Computer Use recovers', subtitle:'Insert a pop-up. Watch whether the old plan still works.', takeaway:'Check the result before deciding that the task is done.', next:'How does it learn to act?' },
    { id:'C7', label:'Training and use', title:'How Computer Use is trained', subtitle:'Training updates weights. Inference uses the learned model with new context.', takeaway:'Feedback from many practice tasks can shape later actions. A new screenshot alone does not retrain the model.', next:'Open the Blender case' },
    { id:'C6', label:'Blender', title:'Computer Use in Blender', subtitle:'Watch the published render and the workflow that produced it.', takeaway:'Python builds the scene; rendered previews and Computer Use help inspect it.', next:'From actions to decisions' },
  ] },
  { id:'jev', name:'Jev', term:'JEV / SYSTEM ONE MODEL', color:'red', sources:jevSources, beats:[
    { id:'J0', label:'Chapter opening', title:'Jev', subtitle:'A model for bounded decisions.', takeaway:'TypeSafe AI’s Jev answers questions with a defined answer shape.', next:'Choose a team for a customer message', term:{ name:'Jev', fullName:'System One model' } },
    { id:'J1', label:'Questions and answers', title:'How to ask Jev a question', subtitle:'You supply the questions, answer types and criteria in the request.', takeaway:'Three available answer types. One or several questions. One answer per question.', next:'First, what is decoding?' },
    { id:'J2', label:'Decoding', title:'How decoding works', subtitle:'Decoding selects the next token from probabilities conditioned on the current context.', takeaway:'Select a token → append it to the context → repeat.', next:'Compare the two routes' },
    { id:'J3', label:'LLM vs Jev', title:'How Jev differs from an LLM', subtitle:'Sequential text generation and parallel probability outputs can both be delivered as JSON.', takeaway:'Less sequential output work can reduce latency. Measure the gain on the same task.', next:'How is this trained?' },
    { id:'J5', label:'Training and evaluation', title:'How Jev is trained', subtitle:'RLCD: Reinforcement Learning for Calibrated Decisions.', takeaway:'Practice, use feedback to adjust weights, then check decisions and probabilities on new cases.', next:'Why might this be useful?' },
    { id:'J8', label:'Workflow fit', title:'When to use Jev', subtitle:'Follow a clear ticket and an ambiguous one, then choose the model for the workload.', takeaway:'Repeated defined decisions make Jev worth testing; occasional labels or full replies may be served by an LLM.', next:'Can the method improve too?' },
  ] },
  { id:'rsi', name:'RSI', term:'RSI / RECURSIVE SELF-IMPROVEMENT', color:'green', sources:rsiSources, beats:[
    { id:'R0', label:'Chapter opening', title:'RSI', subtitle:'Can AI improve the way it improves?', takeaway:'Let AI help with research, then ask whether the improved system can help again.', next:'Start with one program improvement', term:{ name:'RSI', fullName:'Recursive Self-Improvement' } },
    { id:'R4', label:'Experiment', title:'How an improvement loop works', subtitle:'Start with A. Try B, reject it. Try C, then replace A.', takeaway:'The program improves from A to C. Now ask which part of an AI system could change.', next:'First, change the agent’s workflow' },
    { id:'R8', label:'Agent code · DGM', title:'How an agent improves its workflow', subtitle:'DGM changes tools and agent code while the base model stays fixed.', takeaway:'An improved agent can use its new tools when building further variants.', next:'What if we change the model’s weights?' },
    { id:'R9', label:'Model weights · STaR', title:'How a model learns from its own solutions', subtitle:'STaR generates solution steps, filters by known answers, and fine-tunes.', takeaway:'Selected model-generated solutions become training data for another round.', next:'Third, improve the tools used for training' },
    { id:'R5', label:'Training tools · AlphaEvolve', title:'How AlphaEvolve improves AI training', subtitle:'The same loop now improves code used to train AI.', takeaway:'A faster training kernel saves compute; it does not by itself demonstrate a better AI researcher.', next:'Compare the three routes and the recursive step' },
    { id:'R6', label:'The recursive step', title:'When does improvement become recursive?', subtitle:'Compare what changes, then follow the improved system into the next round.', takeaway:'The improved system participates in further improvement. Its ability still needs to be tested.', next:'Bring the three questions together' },
  ] },
  { id:'closing', name:'Closing', term:'THREE DIFFERENT QUESTIONS', color:'blue', sources:[...computerSources,...jevSources,...rsiSources], beats:[
    { id:'E1', label:'Take it with you', title:'Comparing the three concepts', subtitle:'Different tools. Different evidence of success.', takeaway:'Always ask: what changed, how do we know, and what is still unproven?', next:'Back to the collection' },
  ] },
];
