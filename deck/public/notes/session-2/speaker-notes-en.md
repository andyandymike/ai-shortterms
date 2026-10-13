# Talk 02 speaker notes | From Answers to Actions

Computer Use → Jev → RSI. The script follows **16 pages**, with paragraphs matched to the visuals within each page.

Open **Presenter ↗** in the audience footer. Put the audience view on the projector and keep the presenter window on your screen. Presenter shows the narration for the current visual and what the next click will reveal.

**After a short transition, the visual holds for as long as you need.** Finish the corresponding paragraph, then use the main button for the next visual or, at the end of the page, the next page. The visual never advances by itself. Transition progress is not a limit on speaking time.

A directory entry, chapter link or refresh prepares the page and waits for you to start. The short blockquotes identify the visual to hold; they are not spoken. Each paragraph belongs to that visual. Back and replay also apply to the current visual. The Blender film runs for about thirty seconds, then holds so you can explain its workflow.

## 01 · O1｜From answers to actions.

[Open this page](/session-2#opening/O1)

Today we’ll connect Computer Use, Jev and RSI through three questions. How can AI finish a task inside software? When a workflow needs a decision, why consider a specialized model? And can AI help build the next AI? Each chapter follows a concrete example. The small experiments illustrate the mechanism; they are not live calls to these models. Let’s create a return request for a customer.

---

## 02 · C1｜Two routes into the same app.

[Open this page](/session-2#computer-use/C1)

The customer wants to return order 1048. Instructions about where to click are not enough; the app needs an actual return record. Computer Use lets AI act through a software interface. An API provides a direct interface for programs, so an available API can create the return directly. When work requires the screen, the system observes and operates the interface. A workflow can combine both routes. Let’s follow the interface route to completion.

---

## 03 · C4｜See. Act. Check.

[Open this page](/session-2#computer-use/C4)

> Hold this visual: Locate the field

First, the screenshot joins the context: the goal, screen and action history available for this decision. UI grounding connects “the order-number field” to a position on screen.

> Hold this visual: The completed form

A tool call asks a tool to click or type. Actions change the app, and fresh observations inform the next step.

> Hold this visual: A fresh screenshot confirms the return

Finally, submission produces a receipt, and a new screenshot supplies evidence of completion. The agent connects goals, observations, tools and feedback in this loop. Will the old plan work if the interface changes?

---

## 04 · C5｜Change the screen. What now?

[Open this page](/session-2#computer-use/C5)

> Hold this visual: The stale click fails

Now a popup covers the form, but context still contains the old screenshot. The model requested a click from that old view, and the tool executed it. It hit the overlay, so no return was created. Checking only whether the mouse clicked would give the wrong impression. Pause here: should it click again, or take another look?

> Hold this visual: The fresh screenshot shows the popup and locates Close

The fresh screenshot brings the popup into context. Now the next steps have a basis: dismiss it, submit again and check the receipt.

> Hold this visual: A fresh screenshot confirms success

The plan changes with the observed situation instead of following the old action list blindly. This is a correction during use. We can also ask an earlier question: how did the model learn to read interfaces and choose actions? Let’s see how training develops this capability.

---

## 05 · C7｜Practice changes the model.

[Open this page](/session-2#computer-use/C7)

> Hold this visual: Practice outcomes become feedback

Training gives the model many tasks: finding controls, entering information and completing workflows. Their outcomes provide feedback.

> Hold this visual: Training produces an updated model

The training process uses this feedback to adjust weights, the model’s learned parameters. These changes affect future tasks. OpenAI’s CUA, for example, uses reinforcement learning to learn through attempts and feedback. This illustration condenses many practice rounds.

> Hold this visual: New screenshots, fixed weights

Now move the button. The model reads a fresh screenshot, updates context and locates the target again. Its learned weights stay fixed. Once you’ve learned to drive, a new junction may change your route without requiring another driving course. Training establishes capability; use applies that capability to current information. Recovering from the popup belonged to the latter. Now let’s see a real creative task in Blender.

---

## 06 · C6｜Blender: build, render, inspect.

[Open this page](/session-2#computer-use/C6)

> Hold this visual: Source still and the bpy → render → Computer Use workflow

This approximately thirty-second film is a real Blender render from the published case. Follow the workflow alongside it: bpy, Blender’s Python API, builds an editable scene. Rendering then produces images from the objects, camera and lighting. Computer Use opens Blender to inspect the result. The film shows the creative output, not a recording of mouse actions. Direct programmatic control and visual inspection contribute to the same task. Alongside actions, workflows need decisions.

---

## 07 · J1｜Sometimes you need a decision.

[Open this page](/session-2#jev/J1)

> Hold this visual: Choice returns a predefined option

The message says the shoes are the wrong size and asks for a return. The system needs to choose a team before drafting a reply. Jev is TypeSafe AI’s model for decision tasks like this. State is the input material: a message here, potentially with relevant records. Choice selects from predefined options, such as returns, billing or shipping. Defining the question and answer space makes the result usable by the workflow. First, how does an ordinary LLM generate an answer?

---

## 08 · J2｜Choose a token. Change what follows.

[Open this page](/session-2#jev/J2)

> Hold this visual: We has joined context; the next candidates are visible

Decoding selects the next token and appends it to what is already there. A token can be a word, character or piece of text. The demo chooses We and adds it to context, then predicts what can follow.

> Hold this visual: We can help.

This eventually produces We can help. Each step depends on the content generated so far. This short sentence makes the ordinary LLM’s text-generation process visible. Let’s give both models the same message.

---

## 09 · J3｜Same decision. Different output path.

[Open this page](/session-2#jev/J3)

> Hold this visual: The JSON answer is complete

An ordinary LLM can classify, return JSON and answer several questions in one call. On the left, decoding produces a structured response.

> Hold this visual: Both output paths remain side by side

Jev’s training and interface focus on predefined decisions: questions share state, are evaluated independently and return results and probabilities. Alongside Choice, Score uses a scoring standard, while Noul estimates the probability of a proposition. Repeated, bounded decisions are a reason to evaluate Jev. Suitability still depends on measured accuracy, calibration, cost and latency. The animation is not a speed comparison. A mistaken example will introduce training and calibration.

---

## 10 · J5｜Learn from feedback. Check on new cases.

[Open this page](/session-2#jev/J5)

> Hold this visual: Feedback for a confidently wrong decision

The customer was charged twice and wants to keep the shoes. The known answer is billing, yet the model chooses returns with a high probability.

> Hold this visual: Weights updated to v2; separate cases come next

Training uses differences between predictions and outcomes, bringing feedback from many examples into weight updates. TypeSafe calls its approach RLCD, Reinforcement Learning for Calibrated Decisions, targeting both decisions and calibrated probabilities. This shows the general training relationship; its public explanation does not detail the update algorithm.

> Hold this visual: Separate cases report roughly eighty percent; outcomes remain hidden

After training, use cases that did not contribute to it. Calibration asks whether reported probabilities match observed frequencies over many cases. Across many predictions near eighty percent, are roughly eighty percent correct?

> Hold this visual: Compare probabilities with outcome frequencies

Eight correct answers here illustrate the idea; they do not establish performance or guarantee that every ten will contain eight successes. One confident answer cannot replace this evaluation. How do these probabilities affect the next step?

---

## 11 · J8｜A decision becomes a next step.

[Open this page](/session-2#jev/J8)

> Hold this visual: The distribution is visible; the route is undecided

Now the customer wants a return and reports a duplicate charge. Returns leads, but billing also has substantial probability. The point is the ambiguity, not the decimal values. Taking only the leading option could leave the second issue unattended. Pause at this branch: would you send it straight to returns, or first clarify the two requests?

> Hold this visual: Clarify before proceeding

This teaching workflow asks a person to clarify first. Routing rules come from the actual business; probabilities inform the next action without setting the policy themselves. Jev handles bounded decisions, code selects a branch, a generative LLM can draft explanations and replies, and people clarify ambiguity. Model selection starts with the capability the workflow needs, followed by testing on real tasks. Now, can AI help improve the next AI?

---

## 12 · R1｜Improve the recipe for improving.

[Open this page](/session-2#rsi/R1)

RSI means Recursive Self-Improvement. Research often has more ideas than time for implementation and experiments, motivating AI assistance with proposals, implementation and checks. RSI asks a further question: can AI help build a more capable successor that becomes better at driving another improvement cycle? The issue is whether improvement ability carries forward. Asking the same model to revise one answer does not establish that. A small experiment will show which changes deserve to stay.

---

## 13 · R4｜Which program should we keep?

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

## 14 · R5｜Propose code. Test it. Keep the gain.

[Open this page](/session-2#rsi/R5)

> Hold this visual: Kernel and whole-training gains together

AlphaEvolve uses Gemini to propose code candidates and automated evaluation to select them. DeepMind reported a twenty-three percent speedup in a matrix-multiplication kernel, a small computation routine used repeatedly during training. That local improvement reduced total Gemini training time by about one percent. One figure concerns the component and the other the whole process. They establish a specific efficiency improvement, without measuring research ability growing across successive generations. Recursion also needs evidence about the successor’s capability.

---

## 15 · R6｜Train a successor. Test the improver.

[Open this page](/session-2#rsi/R6)

> Hold this visual: Add failed experiments and diagnoses

Consider a hypothetical route. AI A notices that the training material mostly contains successful experiments, and proposes adding failures and ways to investigate them.

> Hold this visual: B is trained; its research ability is untested

B trains with that recipe; practice and feedback change its saved weights. We now have a new version, but not yet evidence that it is more capable. The added material may or may not help. The question is whether B can propose more useful improvements on new research problems.

> Hold this visual: Compare A and B on research tasks excluded from training

Compare A and B on research tasks excluded from training: which diagnoses failures better and proposes worthwhile experiments?

> Hold this visual: A further cycle depends on improved ability

Evidence of improvement justifies trying B’s help with C. If B helps produce a better successor in turn, that begins to support recursion, with each cycle requiring fresh validation. People still set objectives, evaluation methods, permissions and stopping conditions. This return path is something to establish with evidence. Let’s return to the three opening questions.

---

## 16 · E1｜Three ways to move forward.

[Open this page](/session-2#closing/E1)

Computer Use lets AI act through interfaces; we check whether the application reached the goal. Jev targets defined decisions; we check reliability and suitability in the real workflow. RSI concerns improvement ability passing to a successor and continuing the cycle, which requires independent evidence at each round. For a new AI term, follow the same questions: what does it do, where does its capability come from, and how do we check the result? That’s where we’ll finish today.
