# Talk 02 speaker notes | From Answers to Actions

Computer Use → Jev → RSI. The script follows **19 pages**, with paragraphs matched to the visuals within each page.

Open **Presenter ↗** in the audience footer. Put the audience view on the projector and keep the presenter window on your screen. Presenter shows the narration for the current visual and what the next click will reveal.

**Animations wait for you to press play.** The main button first enters the next visual or page; press the same button, now labeled “Play animation,” to start. After the short transition, the visual holds for as long as you need. Finish speaking before continuing. The source film also waits for play. Transition progress is not a limit on speaking time.

Each chapter holds on a dedicated term opening; continue to the example when you finish speaking. A direct link or refresh on an animated page prepares its visual and waits for you to start. The short blockquotes identify the visual to hold; they are not spoken. Each paragraph belongs to that visual. Back and replay also apply to the current visual. The Blender film runs for about thirty seconds, then holds so you can explain its workflow.

## 01 · O1｜Talk 02 overview

[Open this page](/session-2#opening/O1)

Today we’ll connect Computer Use, Jev and RSI through three questions. How can AI finish a task inside software? When a workflow needs a decision, why consider a specialized model? And can AI help build the next AI? Each chapter follows a concrete example. The small experiments illustrate the mechanism; they are not live calls to these models. Let’s start with Computer Use.

---

## 02 · C0｜Computer Use

[Open this page](/session-2#computer-use/C0)

Computer Use lets AI act through a software interface. The AI observes the screen and decides what to do; tools carry out clicks or typing. Let’s see how it completes a customer return.

---

## 03 · C1｜Why Computer Use?

[Open this page](/session-2#computer-use/C1)

The customer wants to return order 1048. Instructions about where to click are not enough; the app needs an actual return record. An API provides a direct interface for programs, so an available API can create the return directly. When work requires the screen, the system observes and operates the interface. A workflow can combine both routes. Let’s follow the interface route to completion.

---

## 04 · C4｜How Computer Use works

[Open this page](/session-2#computer-use/C4)

> Hold this visual: Locate the field

First, the screenshot joins the context: the goal, screen and action history available for this decision. UI grounding connects “the order-number field” to a position on screen.

> Hold this visual: The completed form

A tool call asks a tool to click or type. Actions change the app, and fresh observations inform the next step.

> Hold this visual: A fresh screenshot confirms the return

Finally, submission produces a receipt, and a new screenshot supplies evidence of completion. The agent connects goals, observations, tools and feedback in this loop. Will the old plan work if the interface changes?

---

## 05 · C5｜How Computer Use recovers

[Open this page](/session-2#computer-use/C5)

> Hold this visual: The stale click fails

Now a popup covers the form, but context still contains the old screenshot. The model requested a click from that old view, and the tool executed it. It hit the overlay, so no return was created. Checking only whether the mouse clicked would give the wrong impression. Pause here: should it click again, or take another look?

> Hold this visual: The fresh screenshot shows the popup and locates Close

The fresh screenshot brings the popup into context. Now the next steps have a basis: dismiss it, submit again and check the receipt.

> Hold this visual: A fresh screenshot confirms success

The plan changes with the observed situation instead of following the old action list blindly. This is a correction during use. We can also ask an earlier question: how did the model learn to read interfaces and choose actions? Let’s see how training develops this capability.

---

## 06 · C7｜How Computer Use is trained

[Open this page](/session-2#computer-use/C7)

> Hold this visual: Practice outcomes become feedback

Training gives the model many tasks: finding controls, entering information and completing workflows. Their outcomes provide feedback.

> Hold this visual: Training produces an updated model

The training process uses this feedback to adjust weights, the model’s learned parameters. These changes affect future tasks. OpenAI’s CUA, for example, uses reinforcement learning to learn through attempts and feedback. This illustration condenses many practice rounds.

> Hold this visual: New screenshots, fixed weights

Now move the button. The model reads a fresh screenshot, updates context and locates the target again. Its learned weights stay fixed. Once you’ve learned to drive, a new junction may change your route without requiring another driving course. Training establishes capability; use applies that capability to current information. Recovering from the popup belonged to the latter. Now let’s see a real creative task in Blender.

---

## 07 · C6｜Computer Use in Blender

[Open this page](/session-2#computer-use/C6)

> Hold this visual: Source still and the bpy → render → Computer Use workflow

This approximately thirty-second film is a real Blender render from the published case. Follow the workflow alongside it: bpy, Blender’s Python API, builds an editable scene. Rendering then produces images from the objects, camera and lighting. Computer Use opens Blender to inspect the result. The film shows the creative output, not a recording of mouse actions. Direct programmatic control and visual inspection contribute to the same task. Alongside actions, workflows need decisions.

---

## 08 · J0｜Jev

[Open this page](/session-2#jev/J0)

Jev is TypeSafe AI’s System One model for bounded decision tasks, such as classification and scoring. This chapter follows a decision into the next step of a workflow. Start by choosing a team for a customer message.

---

## 09 · J1｜What Jev does

[Open this page](/session-2#jev/J1)

> Hold this visual: Choice returns a predefined option

The message says the shoes are the wrong size and asks for a return. The system needs to choose a team before drafting a reply. State is the input material: a message here, potentially with relevant records. Choice selects from predefined options, such as returns, billing or shipping. Defining the question and answer space makes the result usable by the workflow. First, how does an ordinary LLM generate an answer?

---

## 10 · J2｜How decoding works

[Open this page](/session-2#jev/J2)

> Hold this visual: We has joined context; the next candidates are visible

Decoding selects the next token and appends it to what is already there. A token can be a word, character or piece of text. The demo chooses We and adds it to context, then predicts what can follow.

> Hold this visual: We can help.

This eventually produces We can help. Each step depends on the content generated so far. This short sentence makes the ordinary LLM’s text-generation process visible. Let’s give both models the same message.

---

## 11 · J3｜How Jev differs from an LLM

[Open this page](/session-2#jev/J3)

> Hold this visual: The JSON answer is complete

On the left, an ordinary LLM uses JSON Schema to specify fields, types and allowed values. It can return valid JSON and answer several questions in one call. Constrained decoding limits which tokens may appear, while the response is still generated sequentially. These are readable display fragments, not an actual tokenizer trace.

> Hold this visual: Both output paths remain side by side

Jev narrows its output capability: it answers predefined questions instead of continuing free-form text. Questions share state, are evaluated independently and can run in parallel. Choice classifies, Score uses a scoring standard, and Noul returns a proposition’s probability. Both routes give results to code; their training and output design differ. This animation is not a speed comparison. A mistaken example will introduce training and calibration.

---

## 12 · J5｜How Jev is trained

[Open this page](/session-2#jev/J5)

> Hold this visual: Prediction: returns at 0.95; known answer: billing

Start with one email: the customer was charged twice but is keeping the shoes. The model picks returns with probability 0.95; the known answer on the right is billing. During training, this mismatch can provide feedback on both the decision and its probability. One mistake provides feedback for this example; it does not establish the model’s overall calibration.

> Hold this visual: The same email now receives billing instead of returns

Now many labeled examples provide feedback for repeated updates to weights, the internal parameters that shape predictions. Revisit the same email: the bars move from returns toward billing, making the illustrated change visible. TypeSafe calls its post-training for decisions and calibrated probabilities RLCD. The versions and numbers are illustrative, not a guaranteed change after seeing one email; the detailed update algorithm is not disclosed here. Doing better on an old case is not enough, so test new ones next.

> Hold this visual: The new email receives billing at 0.80; its answer is hidden

This time, payment for order 2062 went through twice. This differently worded email did not contribute to training. Keep the weights fixed and ask for a prediction: billing at about 0.80. Hiding the answer distinguishes revisiting a training example from making a decision on new material.

> Hold this visual: This email is correct; ten illustrative outcomes explain calibration

The correct answer is billing, but one correct prediction is not enough. Calibration requires many cases: among predictions near eighty percent, are roughly eighty percent correct over time? Eight successes out of ten below illustrate the idea. They are not measured Jev results, and every group of ten need not contain exactly eight successes. A training objective is one thing; checking that it holds on your tasks is another. Could an ordinary LLM simply return the same JSON?

---

## 13 · J8｜Why use Jev instead of LLM JSON?

[Open this page](/session-2#jev/J8)

> Hold this visual: Identical valid JSON; examine training and probability quality

Yes. Both sides deliberately show identical JSON, including the numbers. These are teaching values, with no live model calls. JSON Schema can constrain an LLM’s fields and format, but writing 0.61 does not establish calibration. Jev’s distinction is specialized training and outputs for bounded decisions and probabilities. Ordinary LLMs can also receive additional training or calibration, and Jev still requires evaluation. Returning JSON alone is not a reason to choose it.

> Hold this visual: Three tickets are routed; compare whether changing models is worthwhile

Scale this to routing tickets repeatedly every day. The question stays the same: which team? Code needs a choice and usable probabilities. Under our illustrative rule, a top probability of at least 0.80 routes directly; the mixed request goes to human review. An ordinary LLM can do this too. Jev is worth considering because this job does not need free-form generation, and its training and outputs focus on decisions: test whether that reduces latency or cost at the same required quality. For occasional classification, or a workflow already needing a complete written reply, LLM JSON may suffice. Compare errors, calibration, latency and cost on the same new tickets; this demonstration does not declare a winner. Now, can AI help improve the next AI?

---

## 14 · R0｜RSI

[Open this page](/session-2#rsi/R0)

RSI means Recursive Self-Improvement. Can AI help build a more capable successor that becomes better at driving another improvement cycle? The key is whether improvement ability can carry forward.

---

## 15 · R1｜What recursive improvement means

[Open this page](/session-2#rsi/R1)

Research often has more ideas than time for implementation and experiments, motivating AI assistance with proposals, implementation and checks. Here A helps improve B, but the arrow from B into another cycle still has a question mark. Whether B is better at research, and whether that ability carries forward, must be tested. Asking the same model to revise one answer does not establish that. A small experiment will show which changes deserve to stay.

---

## 16 · R4｜How to test an improvement

[Open this page](/session-2#rsi/R4)

> Hold this visual: Keep verified A

The task is simple: put the numbers in ascending order without losing any. These prewritten programs run locally; the movements and counts come from their actual operations. A has sorted the numbers and passed the checks. Below is the work it used.

> Hold this visual: B has finished; correctness is unchecked

Now B uses noticeably less work. Before replacing A, remember that B’s result has not been checked. Would the lower operation count alone persuade you to keep B?

> Hold this visual: B fails the correctness check

The check reveals that B’s output is still out of order. It did less work without completing the task, so it is rejected.

> Hold this visual: Keep C after it passes with less work

C then passes all six checks and uses less work than A on the same suite, earning its place as the retained program. That program can be reused on later tasks. Six tests support these results, not correctness for every possible input. A proposal needs an independent check. AlphaEvolve uses this approach in real research.

---

## 17 · R5｜How AI improves AI training

[Open this page](/session-2#rsi/R5)

> Hold this visual: The improved kernel enters Gemini training

Follow where this code comes from and where it goes. AlphaEvolve uses Gemini to propose code changes, then checks correctness and speed. A kernel is a small compute routine called repeatedly during training. The validated improvement enters Gemini’s training process. DeepMind reported a 23% speedup for this matrix kernel, reducing total training time by about 1%. The figures describe the component and the whole process; the central point is that AI can help improve the tools used to train AI. Follow that saving next: what else would be needed to make improvement recursive?

---

## 18 · R6｜How improvement becomes recursive

[Open this page](/session-2#rsi/R6)

> Hold this visual: Successor B exists in this scenario; its improvement ability is still unknown

The reported result stays at the top: the improved kernel makes training more efficient. What follows is hypothetical. Call the current AI research assistant A. Reinvesting saved compute in more training or experiments might help produce successor B. More efficient training does not automatically make B more capable, especially at research, so its ability remains a question.

> Hold this visual: The same tasks and budget test whether B is better at improving

How would we test that? Keep the type of work the same: use new kernels excluded from the earlier development, and give A and B the same tasks and experiment budget. Compare their ability to find correct changes with useful speedups. This tests whether B can contribute more to the next improvement, beyond the time saved in its own training.

> Hold this visual: If B’s improvement helps develop C, that successor is tested again

If B is better at this work, it can take the role A held, propose the next kernel improvement, and help develop C. C must be evaluated again. Recursive describes this feedback: the more capable AI produced by one round contributes to the next round of improvement. The latter part of this diagram is a path to test; Google’s reported kernel result alone does not establish the cycle. Let’s return to the three opening questions.

---

## 19 · E1｜Comparing the three concepts

[Open this page](/session-2#closing/E1)

Computer Use lets AI act through interfaces; we check whether the application reached the goal. Jev targets defined decisions; we check reliability and suitability in the real workflow. RSI concerns improvement ability passing to a successor and continuing the cycle, which requires independent evidence at each round. For a new AI term, follow the same questions: what does it do, where does its capability come from, and how do we check the result? That’s where we’ll finish today.
