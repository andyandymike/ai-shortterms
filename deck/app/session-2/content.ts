export type Beat = { id: string; label: string; title: string; subtitle: string; takeaway: string; next: string; term?: { name: string; fullName?: string } };
export type Chapter = { id: string; name: string; term: string; color: string; beats: Beat[]; sources: { label: string; url: string }[] };

export const demonstrationNotes: Record<string, string[]> = {
  'computer-use': [
    'C7 illustrates a generic reinforcement-learning principle: practice across tasks, inspect outcomes, and use feedback for parameter updates. OpenAI described CUA as using reinforcement learning. The diagram is not a disclosed CUA training algorithm or a live training run. At inference, new screenshots change context while the illustrated model weights remain fixed.',
    'The return desk stages model requests, tool actions, and screenshot feedback. It does not control an external application. Context includes the goal, the latest observation, and relevant history; it can become stale when the application changes.',
    'The 30-second film is Thomas Ricouard’s finished render, published by OpenAI on 4 September 2026. The real case combines Python and Computer Use. If video playback fails, the source still is shown.',
  ],
  jev: [
    'No live model is called. Token splits, conditional probabilities, clear-request distributions, Score values, Noul values, and calibration outcomes are constructed for teaching. The simplified mixed-ticket text is adapted; its Team and Return reason distributions are borrowed from a different, more detailed TypeSafe example, not measured on the simplified input.',
    'The LLM/Jev comparison illustrates output design, not measured latency or an architecture trace. The paths run independently. Jev’s complete architecture is not public; the fan-out drawing does not imply a single forward pass. Ordinary LLMs can also produce constrained JSON and answer multiple questions in one call.',
    'Confidence is shown only when a value is supplied for the selected example. Probability and confidence do not guarantee a correct answer. RLCD is TypeSafe’s stated training approach. The wrong v1 prediction at 0.95 illustrates training feedback; the v2 predictions at 0.8 belong to separate held-out cases. This is not a fixed probability adjustment, the internal RLCD algorithm, or a measured training run. Calibration must be evaluated on many held-out cases; ten illustrated outcomes do not establish calibration or prove an improvement.',
    'The routing rule is a teaching policy, not a universal production threshold. Evaluate accuracy, calibration, latency, and cost on your actual workload before choosing a model.',
  ],
  rsi: [
    'R6 is a hypothetical training-data change: add failed experiments and diagnoses, train a successor using target comparisons and loss, then independently test research ability. It is one possible route, not the definition of all RSI methods, a live training run, or an established improvement. The next cycle remains conditional on evidence.',
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
  { label: 'PyTorch · Training, loss and parameter updates', url: 'https://docs.pytorch.org/tutorials/beginner/basics/optimization_tutorial.html' },
  { label: 'Google DeepMind · AlphaEvolve: measured algorithm improvements', url: 'https://deepmind.google/blog/alphaevolve-a-gemini-powered-coding-agent-for-designing-advanced-algorithms/' },
  { label: 'Anthropic Institute · When AI builds itself: the RSI question', url: 'https://www.anthropic.com/institute/recursive-self-improvement' },
];

export const chapters: Chapter[] = [
  { id:'opening', name:'Opening', term:'THE NEXT MOVES', color:'blue', sources:[], beats:[
    { id:'O1', label:'The map', title:'From answers to actions.', subtitle:'Three ideas about what AI does next.', takeaway:'Act on a screen. Make a bounded decision. Improve the method.', next:'Start with Computer Use' },
  ] },
  { id:'computer-use', name:'Computer Use', term:'COMPUTER USE', color:'blue', sources:computerSources, beats:[
    { id:'C1', label:'The task and why', title:'Two routes into the same app.', subtitle:'Computer Use lets an AI work through an application’s interface.', takeaway:'The goal is a changed application state that can be verified.', next:'Follow one screen-to-action loop', term:{ name:'Computer Use' } },
    { id:'C4', label:'The loop', title:'See. Act. Check.', subtitle:'Follow the cursor, the application, and the screenshot returning to context.', takeaway:'The agent repeats this loop until it can verify the goal.', next:'What if the screen changes?' },
    { id:'C5', label:'Recovery', title:'Change the screen. What now?', subtitle:'Insert a pop-up. Watch whether the old plan still works.', takeaway:'Check the result before deciding that the task is done.', next:'How does it learn to act?' },
    { id:'C7', label:'Training and use', title:'Practice changes the model.', subtitle:'Training updates weights. Inference uses the learned model with new context.', takeaway:'Feedback from many practice tasks can shape later actions. A new screenshot alone does not retrain the model.', next:'Open the Blender case' },
    { id:'C6', label:'Blender', title:'Blender: build, render, inspect.', subtitle:'Watch the published render and the workflow that produced it.', takeaway:'Python builds the scene; rendered previews and Computer Use help inspect it.', next:'From actions to decisions' },
  ] },
  { id:'jev', name:'Jev', term:'JEV / SYSTEM ONE MODEL', color:'red', sources:jevSources, beats:[
    { id:'J1', label:'The task', title:'Sometimes you need a decision.', subtitle:'Jev is TypeSafe AI’s model for questions with a defined answer shape.', takeaway:'A useful building block for repeated classification and scoring.', next:'First, what is decoding?', term:{ name:'Jev', fullName:'System One model' } },
    { id:'J2', label:'Decoding', title:'Choose a token. Change what follows.', subtitle:'Decoding selects the next token from probabilities conditioned on the current context.', takeaway:'Select a token → append it to the context → repeat.', next:'Compare the two routes' },
    { id:'J3', label:'LLM vs Jev', title:'Same decision. Different output path.', subtitle:'LLMs generate a sequence; Jev evaluates predefined questions in parallel over a shared state.', takeaway:'Jev gives up free string generation. Its independent answers return probabilities for code to use.', next:'How is this trained?' },
    { id:'J5', label:'Training and evaluation', title:'Learn from feedback. Check on new cases.', subtitle:'RLCD: Reinforcement Learning for Calibrated Decisions.', takeaway:'Training changes the model. Held-out evaluation checks whether its probabilities match observed frequencies.', next:'Use uncertainty to choose a route' },
    { id:'J8', label:'Workflow and fit', title:'A decision becomes a next step.', subtitle:'Continue with the same mixed ticket: code uses the decision to choose a route.', takeaway:'Use Jev for bounded text decisions and an LLM for generated replies. Compare accuracy, calibration, latency, and cost on your workload.', next:'Can the method improve too?' },
  ] },
  { id:'rsi', name:'RSI', term:'RSI / RECURSIVE SELF-IMPROVEMENT', color:'green', sources:rsiSources, beats:[
    { id:'R1', label:'The idea', title:'Improve the recipe for improving.', subtitle:'RSI asks whether better AI can help build the next, better AI.', takeaway:'A corrected answer changes one result; a better method persists. Recursion requires improvement ability to carry into another cycle.', next:'Test a candidate before keeping it', term:{ name:'RSI', fullName:'Recursive Self-Improvement' } },
    { id:'R4', label:'Experiment', title:'Which program should we keep?', subtitle:'Run the candidates. Inspect the actual output. Then decide.', takeaway:'A candidate must pass the correctness check before its work count matters.', next:'A real, bounded example' },
    { id:'R5', label:'AlphaEvolve', title:'Propose code. Test it. Keep the gain.', subtitle:'AlphaEvolve used Gemini models and automated evaluation to improve algorithms.', takeaway:'A matrix-multiplication kernel is a small compute routine used repeatedly in training. Improving it can reduce total training time.', next:'Where is the missing step?' },
    { id:'R6', label:'The recursive step', title:'Train a successor. Test the improver.', subtitle:'A hypothetical path from a changed recipe to the next research cycle.', takeaway:'A recipe change must improve research ability before the successor can use it to attempt the next cycle.', next:'Bring the three questions together' },
  ] },
  { id:'closing', name:'Closing', term:'THREE DIFFERENT QUESTIONS', color:'blue', sources:[...computerSources,...jevSources,...rsiSources], beats:[
    { id:'E1', label:'Take it with you', title:'Three ways to move forward.', subtitle:'Different tools. Different evidence of success.', takeaway:'Always ask: what changed, how do we know, and what is still unproven?', next:'Back to the collection' },
  ] },
];
