export type Beat = { id: string; label: string; title: string; subtitle: string; takeaway: string; next: string; term?: { name: string; fullName?: string } };
export type Chapter = { id: string; name: string; term: string; color: string; beats: Beat[]; sources: { label: string; url: string }[] };

export const demonstrationNotes: Record<string, string[]> = {
  'computer-use': [
    'C7 illustrates a generic reinforcement-learning principle: practice across tasks, inspect outcomes, and use feedback for parameter updates. OpenAI described CUA as using reinforcement learning. The diagram is not a disclosed CUA training algorithm or a live training run. At inference, new screenshots change context while the illustrated model weights remain fixed.',
    'The return desk stages model requests, tool actions, and screenshot feedback. It does not control an external application. Context includes the goal, the latest observation, and relevant history; it can become stale when the application changes.',
    'The 30-second film is Thomas Ricouard’s finished render, published by OpenAI on 4 September 2026. The real case combines Python and Computer Use. If video playback fails, the source still is shown.',
  ],
  jev: [
    'No live model is called. Token splits, probabilities, Score values, Noul values, training versions and evaluation outcomes are constructed for teaching. J8 deliberately gives both models the same illustrative distribution in a common JSON display format; these are not measured outputs or exact API response bodies.',
    'The LLM/Jev comparison illustrates output design, not measured latency or an architecture trace. Jev’s complete architecture is not public; the fan-out drawing does not imply a single forward pass. Ordinary LLMs can also use JSON Schema, classify, answer multiple questions and provide probability estimates in one call. A valid numeric field does not by itself establish calibration; LLMs can also be trained or calibrated for a task.',
    'TypeSafe describes RLCD as post-training for decisions and calibrated probabilities, but does not disclose its specific update algorithm here. J5 keeps one labeled billing case visible before and after an illustrative model update from many examples. The changed probabilities are not a fixed adjustment rule or evidence of measured improvement. A new held-out case uses fixed weights; ten illustrated outcomes explain calibration without establishing it or guaranteeing eight correct in every ten.',
    'J8’s routing policy can be driven by either model. Its threshold and tickets are illustrative. Jev’s specialized training and bounded probabilistic outputs motivate evaluating it on repeated classification or scoring; they do not prove a universal accuracy, speed or cost advantage. Compare decision errors, calibration, latency and cost on the same held-out workload. LLM JSON may suffice for occasional decisions or workflows that also need generated replies.',
  ],
  rsi: [
    'R5 illustrates the reported relationship between Gemini, AlphaEvolve’s kernel optimization, and Gemini training. The moving K is a diagram, not executable optimization or a model trace. DeepMind reports a 23% kernel speedup and about 1% less total training time; neither figure measures a gain in intelligence or recursive capability. R6 continues the same story as an explicitly hypothetical reinvestment of compute savings in successor B. New kernel-optimization tasks compare A and B under the same task and experiment budget before any conditional handoff to B and C. No successor, benchmark result, or recursive improvement is demonstrated here; this is one possible path, not a claim that every RSI approach requires kernel optimization or parameter training.',
    'The handwritten sorting programs execute locally. Work counts comparisons plus array writes with equal weight; these counts are not milliseconds. The retained program must pass the same six fixed tests and use less work than the currently retained method.',
    'The six tests cover two tangled groups, a different ordering, reverse order, duplicates with a negative value, an empty input, and one item. Passing them supports a bounded claim about this suite, not a proof for every input.',
    'This illustrates proposal, execution, evaluation, and retention. It is not live AI research or evidence of full recursive self-improvement. A stronger successor would need to carry improved research ability into further cycles.',
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
  { label: 'Google DeepMind · AlphaEvolve: measured algorithm improvements', url: 'https://deepmind.google/blog/alphaevolve-a-gemini-powered-coding-agent-for-designing-advanced-algorithms/' },
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
    { id:'J1', label:'The task', title:'What Jev does', subtitle:'Jev is TypeSafe AI’s model for questions with a defined answer shape.', takeaway:'A useful building block for repeated classification and scoring.', next:'First, what is decoding?' },
    { id:'J2', label:'Decoding', title:'How decoding works', subtitle:'Decoding selects the next token from probabilities conditioned on the current context.', takeaway:'Select a token → append it to the context → repeat.', next:'Compare the two routes' },
    { id:'J3', label:'LLM vs Jev', title:'How Jev differs from an LLM', subtitle:'LLMs generate a sequence; Jev evaluates predefined questions in parallel over a shared state.', takeaway:'Jev gives up free string generation. Its independent answers return probabilities for code to use.', next:'How is this trained?' },
    { id:'J5', label:'Training and evaluation', title:'How Jev is trained', subtitle:'RLCD: Reinforcement Learning for Calibrated Decisions.', takeaway:'Learn from labeled examples; check decisions and probabilities on new cases.', next:'Could an LLM just return JSON?'  },
    { id:'J8', label:'Workflow and fit', title:'Why use Jev instead of LLM JSON?', subtitle:'Compare the same task, the same JSON format, and the training behind the result.', takeaway:'Jev is a candidate for repeated, bounded decisions. Compare errors, calibration, latency and cost; LLM JSON may already be enough.', next:'Can the method improve too?' },
  ] },
  { id:'rsi', name:'RSI', term:'RSI / RECURSIVE SELF-IMPROVEMENT', color:'green', sources:rsiSources, beats:[
    { id:'R0', label:'Chapter opening', title:'RSI', subtitle:'Can AI help build the next, better AI?', takeaway:'Recursive Self-Improvement asks whether improvement ability can carry into further cycles.', next:'Follow the improvement across generations', term:{ name:'RSI', fullName:'Recursive Self-Improvement' } },
    { id:'R1', label:'The idea', title:'What recursive improvement means', subtitle:'RSI asks whether better AI can help build the next, better AI.', takeaway:'A corrected answer changes one result; a better method persists. Recursion requires improvement ability to carry into another cycle.', next:'Test a candidate before keeping it' },
    { id:'R4', label:'Experiment', title:'How to test an improvement', subtitle:'Run the candidates. Inspect the actual output. Then decide.', takeaway:'A candidate must pass the correctness check before its work count matters.', next:'A real, bounded example' },
    { id:'R5', label:'AlphaEvolve', title:'How AI improves AI training', subtitle:'Gemini helps improve a kernel that is then used in Gemini training.', takeaway:'AI can help improve the tools used to train AI. The reported benefit is training efficiency.', next:'How could this feed another round of improvement?' },
    { id:'R6', label:'The recursive step', title:'How improvement becomes recursive', subtitle:'Follow the kernel example into a hypothetical successor and another research cycle.', takeaway:'A better successor could take on the next improvement. Each generation needs independent evidence.', next:'Bring the three questions together' },
  ] },
  { id:'closing', name:'Closing', term:'THREE DIFFERENT QUESTIONS', color:'blue', sources:[...computerSources,...jevSources,...rsiSources], beats:[
    { id:'E1', label:'Take it with you', title:'Comparing the three concepts', subtitle:'Different tools. Different evidence of success.', takeaway:'Always ask: what changed, how do we know, and what is still unproven?', next:'Back to the collection' },
  ] },
];
