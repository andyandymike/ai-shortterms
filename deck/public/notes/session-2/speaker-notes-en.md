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

Jev is TypeSafe’s model in the class it calls System One. It is designed for focused decisions, such as choosing a team for an email or rating a risk. Let’s start with how we ask it a question. Start with a return request.

---

## 09 · J1｜How to ask Jev a question

[Open this page](/session-2#jev/J1)

> Hold this visual: One question, one answer; we chose the three team options

This customer wants a return. We write a question: which team should handle it? We supply returns, billing and shipping as the options. That is a Choice. We provide the question and options; Jev evaluates the input and assigns probabilities. We define what it may choose, while the model determines the result.

> Hold this visual: Two questions, two answers; Choice, Score and Noul are available types

Now add: does the customer want a return? We use Noul, which gives the probability of yes. Two questions produce two answers. Choice, Score and Noul below are three available types, not three required outputs. Score rates something against levels we define. We can change the questions, options and question count in the request without retraining the model. Next, how does an ordinary LLM produce an answer?

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

> Hold this visual: One JSON response contains both answers

Both models get the same two questions. An ordinary LLM can answer them in one request and use JSON Schema to constrain the format. It still decodes the JSON token by token. We display readable chunks here; they are not actual tokenizer boundaries.

> Hold this visual: The API packages the two independent answers as JSON

According to TypeSafe, Jev outputs these probabilities in parallel instead of generating free-form text. Both questions use the same state and are evaluated independently. The API packages the answers as JSON. The delivery format can be the same while the model’s output process differs. These values are illustrative, and the animation is not a timing measurement. How is this decision capability trained?

---

## 12 · J5｜How Jev is trained

[Open this page](/session-2#jev/J5)

> Hold this visual: Prediction: returns at 95%; known answer: billing

We have been using the model; now we illustrate training. The email says the customer was charged twice and is keeping the shoes. The model chooses returns with 95% probability, but the known answer is billing. Mistakes like this provide feedback for learning both better choices and appropriate probabilities.

> Hold this visual: The same email is now assigned to billing

Practice on many examples with known answers, using feedback to adjust the weights: the internal parameters that shape decisions. Revisit the same email; it now favors billing. TypeSafe calls its post-training for decisions and calibrated probabilities RLCD. This change illustrates the principle, not its undisclosed algorithm. New cases are needed to check what was learned.

> Hold this visual: 80% should mean roughly eight in ten over many cases

Try an email not used in training: a payment went through twice. Keep the weights fixed and ask for a prediction. It selects billing with 80% probability. Calibration asks whether predictions near 80% are correct about 80% of the time across many cases. The ten squares illustrate the idea; this one email cannot establish calibration. With output and training in view, why consider using Jev?

---

## 13 · J8｜Why use Jev?

[Open this page](/session-2#jev/J8)

> Hold this visual: Less sequential output work; the input still needs processing

Both routes make one request and read the input. The middle differs: an LLM generates successive tokens, while Jev outputs decision probabilities in parallel without generating the answer as text. Reducing sequential output work can lower latency; its training and design also focus on these tasks. The gain still depends on input length, the comparison model, hardware and network. Animation duration is not a benchmark.

> Hold this visual: The ticket is assigned to returns; an LLM can write the reply

Every incoming ticket needs a routing decision. Frequent, focused judgments make Jev worth testing: let it decide, let code route, and use an LLM when a written reply is needed. If probabilities drive the workflow, check their calibration. For occasional classification or a complete reply in one call, an existing LLM with JSON may suffice. Compare errors and probability quality first, then latency and cost on the same tickets. Finally, can AI help improve the next AI?

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
