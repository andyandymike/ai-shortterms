# Talk 02 speaker notes | From Answers to Actions

Computer Use → Jev → RSI. **20 pages**, with visual numbers matching Presenter.

**Play → automatic hold → speak this paragraph → continue.** Animations and the film wait for play; held visuals have no speaking countdown. Blockquotes identify the picture and are not spoken. Each page ends with a separate transition. [Controls and contents](index.md).

## 01 · O1｜Talk 02 overview

[Open this page](/session-2#opening/O1)

> Visual 1 / 1 · The opening map

Today we’ll follow three ideas: how Computer Use operates software, how Jev makes decisions for a workflow, and how improvement could repeat in RSI. A returns workflow connects the first two chapters. The interactive diagrams are teaching examples, not live model calls; the Blender section uses a local screen recording to distinguish interface control from the API route.

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

## 07 · C6｜How AI works in Blender

[Open this page](/session-2#computer-use/C6)

> Visual 1 / 1 · The tree trunk selected in Blender; the caption identifies the Python / API route

The task in this recording is to create a tree in Blender from a reference image. The request has already been sent on the right. A tree then appears on the left, and the recording shows its materials and different views. This example uses an API route: the model generates Python, and an add-on runs it in Blender. Computer Use, as explained earlier, reads screenshots and requests interface actions through tools. Both routes can change an application, but a Blender video alone does not prove that the AI clicked through every step.

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

RSI means Recursive Self-Improvement. Imagine an AI assistant improving its own tools. The assistant with those new tools then works on the next improvement. Can the improved assistant keep improving itself? Start with one change we can easily check.

**Transition｜** Start with a sorting program we can inspect.

---

## 15 · R4｜Try a change. Check the result.

[Open this page](/session-2#rsi/R4)

> Visual 1 / 3 · A sorts correctly and remains in use

A is our original sorting program, and its result is correct. We want it to do less work. Here work is the number of comparisons plus array writes, not elapsed seconds. The three candidates are prewritten, and the numbers follow their actual execution.

> Visual 2 / 3 · B gives an incorrect result; keep A

The first attempt, B, makes only one pass. It uses less work, but the red numbers are still out of order. A cheaper change must still be correct, so IN USE stays A.

> Visual 3 / 3 · C passes six tests with less work and replaces A

Try C next. It passes the same six tests with less work, so it replaces A. Here we improved a sorting program. Next, watch the assistant doing the work: what happens when it changes its own tools?

**Transition｜** Now the assistant changes its own tool.

---

## 16 · R8｜The improved assistant takes over

[Open this page](/session-2#rsi/R8)

> Visual 1 / 3 · The same Check tile moves into A’s own Edit → Use tool

Look at A’s own tool. It used to go straight from editing to using the result. A adds a check in between: check that the edit can be applied before using it. DGM includes this kind of improvement; this is a simple illustration.

> Visual 2 / 3 · The new tool is tested on other tasks; assistant B appears on the right with that tool

Try the new tool on other coding tasks. After checking it, keep B with the new tool. The tests here are only an illustration; the research evaluates how the whole assistant performs.

> Visual 3 / 3 · B moves from right to left and uses its new tool to begin another change

Notice B moving back to the left. B now uses its new tool to try another change to itself. The result of one round becomes the assistant doing the next round. DGM shows this kind of loop; whether the next change helps still needs checking.

**Transition｜** In the next example, training material carries the process forward.

---

## 17 · R9｜The new model makes the next batch

[Open this page](/session-2#rsi/R9)

> Visual 1 / 3 · A’s solution sheets are checked against known answers; selected sheets remain

STaR starts with supplied questions and known answers. Model A writes solution steps, then the final answers are checked. Keep the sheets whose answers match. The model writes the solutions; the questions and answer key come from outside.

> Visual 2 / 3 · Selected solutions move into training; the new model B appears on the right

The selected solutions move into training as practice material. A training program uses many such examples to train the base model, producing Model B. The few sheets here stand for a much larger batch.

> Visual 3 / 3 · B moves to the left and writes solutions for the next round of selection

Model B moves back to the left and writes the next batch of solutions. It is both the result of the last training round and the maker of material for the next one. That is what comes back into the next round.

**Transition｜** Now an example that shows part of the process: AI makes training faster.

---

## 18 · R5｜AI helps make AI training faster

[Open this page](/session-2#rsi/R5)

> Visual 1 / 2 · Gemini’s proposed change is checked for correctness and speed

Training AI repeats some small computations many times. AlphaEvolve uses Gemini to try improving one, then checks whether it is correct and faster. The improved computation will go back into training.

> Visual 2 / 2 · The same computation enters Gemini training and the reported gains appear

The same computation goes into Gemini training. DeepMind reported an average 23% speedup for that routine and about 1% less total training time. Training became faster; this result does not show the new model returning to make the next improvement.

**Transition｜** Finally, compare which examples show something returning for the next round.

---

## 19 · R6｜Who comes back for the next round?

[Open this page](/session-2#rsi/R6)

> Visual 1 / 2 · DGM: improved helper works on itself again; STaR: new model writes the next training solutions; AlphaEvolve: training is faster, next round not shown

In DGM, the improved assistant works on its own tools again. In STaR, the new model makes material for the next training round. This AlphaEvolve result makes training faster, but does not show the new model taking over. The examples show different parts of the process.

> Visual 2 / 2 · B returns to the left to make another improvement; C on the right still has a question mark

Watch B move. First it appears on the right as this round’s result. Then it returns to the left to make the next improvement. RSI asks whether the improved system can keep improving itself. C still has a question mark because the next improvement must be tested.

**Transition｜** Return to our three questions: can it act, decide and keep improving?

---

## 20 · E1｜Comparing the three concepts

[Open this page](/session-2#closing/E1)

> Visual 1 / 1 · The closing map

Computer Use asks whether the action achieved its goal. Jev asks whether a decision is reliable and worth its cost. RSI asks whether the improved AI can make the next round of research better. All three need evidence, but they need evidence of different things.

**Transition｜** That’s where we’ll leave it today.
