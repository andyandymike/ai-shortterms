# Talk 02 speaker notes | From Answers to Actions

Computer Use → Jev → RSI. **18 pages**, with visual numbers matching Presenter.

**Play → automatic hold → speak this paragraph → continue.** Animations and the film wait for play; held visuals have no speaking countdown. Blockquotes identify the picture and are not spoken. Each page ends with a separate transition. [Controls and contents](index.md).

## 01 · O1｜Talk 02 overview

[Open this page](/session-2#opening/O1)

> Visual 1 / 1 · The opening map

Today we’ll follow three ideas: how Computer Use operates software, how Jev makes decisions for a workflow, and how improvement could repeat in RSI. A returns workflow connects the first two chapters. The interactive diagrams are teaching examples, not live model calls; the Blender section includes a real published render.

**Transition｜** Start with Computer Use.

---

## 02 · C0｜Computer Use

[Open this page](/session-2#computer-use/C0)

> Visual 1 / 1 · Computer Use and its plain-language meaning fill a dedicated page.

Computer Use lets AI act through a software interface: observe the screen, choose the next action, and use tools to click or type.

**Transition｜** Why work through the interface?

---

## 03 · C1｜Why Computer Use?

[Open this page](/session-2#computer-use/C1)

> Visual 1 / 1 · Two routes to the same goal

The goal is to create a return for order 1048. The upper route uses an API, an interface programs can call directly. The lower route handles work without a suitable API by filling and submitting the form through the interface. Computer Use supplies that route, and a task can combine both.

**Transition｜** Follow the interface route through the task.

---

## 04 · C4｜How Computer Use works

[Open this page](/session-2#computer-use/C4)

> Visual 1 / 3 · Locate the field

The context on the right contains the goal, screenshot and action history available to the model. The order-number field is now marked on the left. Connecting what we want to a position on screen is called UI grounding.

> Visual 2 / 3 · The completed form

The form is now filled. Through tool calls, the model asks tools to enter the order number and choose a reason. A fresh screenshot returns to context. This confirms the fields, but the return has not been created yet.

> Visual 3 / 3 · A fresh screenshot confirms the return

After submission, the app produced receipt R-204, and a fresh screenshot brought it back. Now the goal is confirmed. The agent connects observation, decisions, actions and checks into a loop.

**Transition｜** What if the screen changes after the screenshot?

---

## 05 · C5｜How Computer Use recovers

[Open this page](/session-2#computer-use/C5)

> Visual 1 / 3 · The stale click fails

This time a popup covers the form, while context still holds the old screenshot. The tool clicked the old position, but no return was created. Executing a click and completing the task are different outcomes.

> Visual 2 / 3 · The fresh screenshot shows the popup and locates Close

The fresh screenshot has brought the popup into context, and its Close button is located. The model can now choose an action based on the actual obstruction.

> Visual 3 / 3 · A fresh screenshot confirms success

The agent dismissed the popup, checked the form, submitted again and verified the receipt. Recovery came from fresh observations and revised actions, without retraining the model during the task.

**Transition｜** Where did the ability to act come from? Look at training.

---

## 06 · C7｜How Computer Use is trained

[Open this page](/session-2#computer-use/C7)

> Visual 1 / 3 · The click failed to create a return; the outcome becomes training feedback

Start with one practice attempt: the click ran, but no return was created. Training feedback must reflect the task outcome, rather than a click alone.

> Visual 2 / 3 · Training produces an updated model

Across many practice tasks, feedback guides updates to the weights: the model’s learned parameters. OpenAI’s computer-using agent uses reinforcement learning. This diagram condenses many rounds of practice and updates.

> Visual 3 / 3 · New screenshots, fixed weights

Now we are in inference: using the trained model. The button moved, so the new screenshot changes context. The weights in the middle stay fixed while the model locates the button again. Recovering from the popup belongs to this stage too.

**Transition｜** Now see how it fits into a Blender workflow.

---

## 07 · C6｜Computer Use in Blender

[Open this page](/session-2#computer-use/C6)

> Visual 1 / 1 · Source still and the bpy → render → Computer Use workflow

This is Thomas Ricouard’s published Blender render: the finished result, not a mouse-action recording. On the right, bpy is Blender’s Python API for building an editable scene. Rendering turns the scene into images, and Computer Use opens Blender to inspect it. Programmatic access and interface actions work together.

**Transition｜** A workflow also needs decisions: which team should receive an email?

---

## 08 · J0｜Jev

[Open this page](/session-2#jev/J0)

> Visual 1 / 1 · Jev: a model for focused decisions

Jev is TypeSafe’s System One model for decisions with a defined answer space. For example, which team should receive an email? Let’s see how to ask it.

**Transition｜** Start with a return email.

---

## 09 · J1｜How to ask Jev a question

[Open this page](/session-2#jev/J1)

> Visual 1 / 2 · One question, one answer; we chose the three team options

The return email is the input, called state here. We define the question, “Which team?”, and supply returns, billing and shipping as options. This question type is Choice. Jev assigns probabilities; we define the options, and the model makes the judgment.

> Visual 2 / 2 · Two questions, two answers; Choice, Score and Noul are available types

Add “Does the customer want a return?” Noul gives the probability of yes, so two questions now have two answers. Choice, Score and Noul are question types, not three mandatory outputs; Score uses a rating scale we define. Questions and their number can change with each request without retraining for each new question.

**Transition｜** An ordinary LLM can answer too. First, see how it generates text.

---

## 10 · J2｜How decoding works

[Open this page](/session-2#jev/J2)

> Visual 1 / 1 · We has joined context; the next candidates are visible

When an ordinary LLM writes text, it selects the next token step by step: decoding. A token can be a word, character or text fragment. We has been added to the context on the left; the next candidates are can and will. Each new token informs the next prediction, and repeating the process produces text.

**Transition｜** Now compare the LLM and Jev on the same two questions.

---

## 11 · J3｜How Jev differs from an LLM

[Open this page](/session-2#jev/J3)

> Visual 1 / 2 · One JSON response contains both answers

Return to the same email and two questions. The LLM can answer both in one request, with JSON Schema constraining fields and types. It still decodes the JSON sequentially. We use larger readable chunks for the display.

> Visual 2 / 2 · The API packages the two independent answers as JSON

According to TypeSafe, Jev produces each question’s probabilities in parallel from the same state; the API packages them as JSON. Avoiding sequential text output can reduce latency, but the actual gain needs measurement. Both deliver JSON through different output processes.

**Transition｜** The output process differs; the decisions still need training.

---

## 12 · J5｜How Jev is trained

[Open this page](/session-2#jev/J5)

> Visual 1 / 3 · Prediction: returns at 95%; known answer: billing

Now the email reports a duplicate charge and says the customer is keeping the shoes. The known answer is billing, but our illustrative model assigns 95% to returns. Training must address both the wrong choice and the misplaced confidence.

> Visual 2 / 3 · The same email is now assigned to billing

As in the previous chapter, feedback from many examples adjusts the weights. TypeSafe calls this further training RLCD, aiming for better decisions and better-calibrated probabilities. The same email now favors billing; new cases are still needed to test learning.

> Visual 3 / 3 · 80% should mean roughly eight in ten over many cases

The new email above was not used in training. With weights fixed, the model gives billing 80%. Calibration checks many such predictions: are those near 80% correct about 80% of the time? The ten squares illustrate that idea; one email cannot establish calibration.

**Transition｜** Now put the decision back into a workflow.

---

## 13 · J8｜When to use Jev

[Open this page](/session-2#jev/J8)

> Visual 1 / 1 · The ticket is assigned to returns; an LLM can write the reply

Back to the original return email: Jev makes the decision, code routes the ticket, and an LLM can write a reply. Frequent, focused decisions are a useful workload for comparing the two options: errors first, then latency and cost. For occasional classification or a complete reply in one call, the existing LLM with JSON may already suffice.

**Transition｜** Now turn to development: can AI help improve the next AI?

---

## 14 · R0｜RSI

[Open this page](/session-2#rsi/R0)

> Visual 1 / 1 · RSI, Recursive Self-Improvement and the successor question fill a dedicated page.

RSI means Recursive Self-Improvement: AI helps develop a new AI that is better at research, and that new AI drives another round of improvement. Start with one small improvement loop.

**Transition｜** Use a sorting program to see which changes deserve to stay.

---

## 15 · R4｜How an improvement loop works

[Open this page](/session-2#rsi/R4)

> Visual 1 / 3 · A works; keep it for now

A is the original sorting program, and it works. We count comparisons and array writes, adding them to measure work in this example. We want the same correct result with less work. A, B and C are prewritten programs, and the animation follows their execution.

> Visual 2 / 3 · B leaves the output out of order; keep using A

First, try B with just one pass. It uses less work, but the red numbers are still out of order. Reject B; IN USE on the right remains A.

> Visual 3 / 3 · C passes the same suite with less work and replaces A

After B fails, try C. It passes the same six checks with less total work, so it replaces A. This loop improved a sorting program, not the AI doing the research. By itself, it is not RSI.

**Transition｜** Google applies a similar loop to code used in AI training.

---

## 16 · R5｜How AlphaEvolve improves AI training

[Open this page](/session-2#rsi/R5)

> Visual 1 / 2 · The proposed kernel change passes the checks

Replace the sorting program with a kernel used in AI training: a small repeated computation, such as matrix multiplication. AlphaEvolve uses Gemini to propose changes, then evaluators check correctness and speed. K has now passed those checks.

> Visual 2 / 2 · The improved K enters Gemini training; the reported savings appear

The same K has entered Gemini training. DeepMind reported a 23% kernel speedup and about 1% less total training time. The link to RSI is that a tool improved with AI is used to train AI. This establishes a training-efficiency gain, not a better AI researcher.

**Transition｜** The missing step is for the new AI to take over the next improvement round.

---

## 17 · R6｜How improvement becomes recursive

[Open this page](/session-2#rsi/R6)

> Visual 1 / 3 · v2 appears; better research ability remains unproven

The rest is hypothetical. Suppose saved compute funds more training and helps develop v2 on the right. That does not establish that v2 is better at research than v1, so it still has a question mark.

> Visual 2 / 3 · v1 and v2: new tasks, the same budget

Give v1 and v2 new kernel-optimization tasks with the same experiment budget. Compare their ability to find correct, useful improvements. This tests their ability to improve the next round; no winner is shown here.

> Visual 3 / 3 · v2 replaces v1 and proposes the next improvement; v3? appears on the right

If evaluation shows that v2 is better at this work, it takes v1’s place on the left and helps develop v3. v3 must be evaluated again. The AI produced by one round becomes the improver in the next: that is the recursive step.

**Transition｜** Return to the three concepts.

---

## 18 · E1｜Comparing the three concepts

[Open this page](/session-2#closing/E1)

> Visual 1 / 1 · The closing map

Computer Use asks whether the action achieved its goal. Jev asks whether a decision is reliable and worth its cost. RSI asks whether the improved AI can make the next round of research better. All three need evidence, but they need evidence of different things.

**Transition｜** That’s where we’ll leave it today.
