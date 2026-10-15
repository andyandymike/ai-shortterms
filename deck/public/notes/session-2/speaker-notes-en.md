# Talk 02 speaker notes | From Answers to Actions

Computer Use → Jev → RSI. **20 pages**, with visual numbers matching Presenter.

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

> Visual 1 / 3 · Cancel closes the form; no return is created, so the task feedback is failure

The model clicked Cancel, closing the form without creating a return. The middle panel records the outcome as a failure. Training feedback must reflect task completion, rather than a click alone.

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

> Visual 1 / 1 · The sentence is complete; four steps show how context grew

Decoding selects the next token from the current context, one step at a time. We is selected first and added to the context; then come can, help and the period. The finished sentence is on the left, and the history on the right shows how the context grew. A token can be a word, character or text fragment; the divisions here are illustrative.

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

> Visual 1 / 3 · returns 0.94; code assigns the ticket to the returns queue

Every incoming ticket needs a department. For this return request, Jev gives returns a probability of 0.94. Our example rule routes a ticket when the highest probability is at least 0.90. Jev supplies the judgment; code moves the ticket. We chose 0.90 for this illustration.

> Visual 2 / 3 · A return and a billing issue send the ticket to human review

This customer has two issues: a return and a duplicate charge. The example gives returns 0.61 and billing 0.35. Routing only by the highest label could overlook the other issue. The same rule now sends the ticket to a person. Probabilities can help decide when to automate and when to check, provided their reliability has been tested on real tickets.

> Visual 3 / 3 · Benchmark Jev for repeated decisions; an LLM may suffice for occasional labels or replies

Jev is worth testing when a small decision repeats, its answer space is defined, and latency or per-call cost matters. Ticket classification and priority scoring are examples. For occasional labels or complete replies, an existing LLM producing JSON or text may suffice. They can also work together: Jev decides, code routes, and an LLM writes. Compare errors and calibration first, then latency and cost, using the same new test tickets.

**Transition｜** Now turn to development: can AI help improve the next AI?

---

## 14 · R0｜RSI

[Open this page](/session-2#rsi/R0)

> Visual 1 / 1 · RSI and its full name fill the opening page

Developing AI involves proposing ideas, running experiments and checking results. People have limited time for those trials, so we want AI to help. Recursive Self-Improvement asks a further question: can the improved AI system participate in the next improvement round? First see how we judge one change, then compare three approaches.

**Transition｜** Start with a sorting program we can inspect.

---

## 15 · R4｜How an improvement loop works

[Open this page](/session-2#rsi/R4)

> Visual 1 / 3 · A sorts correctly and remains in use

A is our original sorting program, and its result is correct. We want it to do less work. Here work is the number of comparisons plus array writes, not elapsed seconds. The three candidates are prewritten, and the numbers follow their actual execution.

> Visual 2 / 3 · B gives an incorrect result; keep A

The first attempt, B, makes only one pass. It uses less work, but the red numbers are still out of order. A cheaper change must still be correct, so IN USE stays A.

> Visual 3 / 3 · C passes six tests with less work and replaces A

Try C next. It passes the same six tests with less work, so it replaces A. That is propose, test and retain. So far, a sorting program has improved. Now apply that idea to an AI system’s own tools, parameters or training code.

**Transition｜** First: keep the model, change how the agent works.

---

## 16 · R8｜How an agent improves its workflow

[Open this page](/session-2#rsi/R8)

> Visual 1 / 2 · Validate the patch is inserted; a failed patch is revised and applied

The first route changes agent code. Think of an agent as a model plus its tools and workflow. The LLM weights on the left stay fixed. The middle gains a patch check: if an edit cannot apply, return the error and retry. DGM, the Darwin Gödel Machine, reported this kind of tool improvement. This is a simplified illustration.

> Visual 2 / 2 · Evaluate variants on other coding tasks; v2 from the archive helps make later variants

One successful patch is not enough: evaluate the whole agent on other coding tasks. DGM keeps an archive and explores from different variants; this diagram shows one branch. A modified agent also participates in later self-modification. The system can improve even though its base model was not retrained.

**Transition｜** The second route changes the model’s weights.

---

## 17 · R9｜How a model learns from its own solutions

[Open this page](/session-2#rsi/R9)

> Visual 1 / 2 · Matching answers are selected; the wrong 7 is retried with a hint and becomes 10

The second route resembles collecting useful practice solutions. STaR starts with existing questions and known answers, and asks the model for solution steps. Keep the first correct answer. For the second, wrong answer of 7, give the answer 10 as a hint and try again. The model generates the solution steps; the questions and answer key come from outside.

> Visual 2 / 2 · Fine-tuning changes weights; the resulting model generates another batch of solutions

Collect many such examples, then fine-tune: train on the selected questions and solutions to change the weights. The resulting model generates the next batch for another round of selection and training. This goes beyond adding a hint to one conversation’s context. A matching answer does not guarantee sound reasoning, so evaluate learning on new questions.

**Transition｜** The third route improves the computation used for training.

---

## 18 · R5｜How AlphaEvolve improves AI training

[Open this page](/session-2#rsi/R5)

> Visual 1 / 2 · Gemini’s proposed kernel change passes correctness and speed checks

Training repeatedly runs small compute routines called kernels. A large computation can be divided into smaller pieces; how those pieces fit the hardware affects efficiency. AlphaEvolve uses Gemini to propose changes, then runs checks for correctness and speed. As with sorting, a claim of improvement is not enough.

> Visual 2 / 2 · The same K enters Gemini training and the reported efficiency gains appear

The improved K now goes into Gemini training. DeepMind reported an average 23% kernel speedup and about 1% less total training time. Repeated computation makes those savings useful. This establishes more efficient training; better AI research ability needs separate evidence.

**Transition｜** The three approaches change different things. Now locate the recursive step.

---

## 19 · R6｜When does improvement become recursive?

[Open this page](/session-2#rsi/R6)

> Visual 1 / 2 · Three columns compare agent code, model weights and training tools

Side by side: DGM changes tools and workflows, STaR trains weights, and AlphaEvolve improves training code. These are useful examples, not an exhaustive taxonomy of RSI. The shared question is whether an improvement feeds back and helps the system make later improvements.

> Visual 2 / 2 · Conditional loop: v2 takes over on the left; v3 appears with a question mark

The return arrow is the recursive step: the improved system participates in the next improvement round. A system can include both a model and its tools and workflow. Compare on new tasks with the same budget to test whether improvement ability grew. DGM demonstrates a bounded coding-agent feedback loop; these examples do not establish unlimited self-improvement.

**Transition｜** Return to our three questions: can it act, decide and keep improving?

---

## 20 · E1｜Comparing the three concepts

[Open this page](/session-2#closing/E1)

> Visual 1 / 1 · The closing map

Computer Use asks whether the action achieved its goal. Jev asks whether a decision is reliable and worth its cost. RSI asks whether the improved AI can make the next round of research better. All three need evidence, but they need evidence of different things.

**Transition｜** That’s where we’ll leave it today.
