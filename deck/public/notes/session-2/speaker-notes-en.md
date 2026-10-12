# Talk 02 speaker notes | From Answers to Actions

Computer Use → Jev → RSI. A standalone Atlas talk, budget about 25 minutes for rehearsal, including audience observation and the Blender film; adjust for speaking pace and pauses.

Open the presenter window with Presenter in the audience page footer. Put the audience page on the projector and keep the presenter window on your own screen. It shows the current spoken cue, where the visual stops, and what the next click will do.

The talk follows one sequence. Each Continue completes the relevant action automatically and stops at a speaking point. The same click also changes the page when needed. There is no separate Play step and no need to memorize the next page. During an animation the main button pauses it; when paused, the same button resumes it. Only at a speaking point does it advance to the next segment. Wait for the action to finish, then deliver SAY. After TRANSITION, continue. VISUAL, AUTOMATIC ACTION and NEXT CONTINUE are private presenter instructions.

## O1 · From answers to actions.

[Open the first cue of this beat](/session-2#opening/O1)

### 1 / 42 · Three questions for today

**VISUAL** Three pictures: an interface, a decision branch, and successive versions.

**AUTOMATIC ACTION** Show the map of the three chapters

**SAY** Today we will look at Computer Use, Jev, and RSI. They ask three questions. Can AI finish a task inside software? Which model fits a decision in a workflow? And can AI help improve the method used to build the next AI? In each chapter, we will start with a familiar situation, then explain the terms, the mechanism, and a real example. The small experiments on screen illustrate the process; they are not live model calls.

**TRANSITION** Let’s start with a concrete task: create a return request for a customer.

**NEXT CONTINUE** Open C1; Show the return form and task. The action stops automatically at the next speaking point.

---

## C1 · Turn a request into a result.

[Open the first cue of this beat](/session-2#computer-use/C1)

### 2 / 42 · Start with a checkable goal

**VISUAL** The empty form is on the left. The return goal for order 1048 is on the right, with no screenshot yet.

**AUTOMATIC ACTION** Show the return form and task

**SAY** The user wants a return for order 1048. Advice about where to click does not finish the job. We need a return record in the app. Computer Use lets AI work through a software interface. We will follow this same desktop from the request to the result.

**TRANSITION** Before acting, what information does it have?

**NEXT CONTINUE** Open C2; Capture the first screen and pause at context. The action stops automatically at the next speaking point.

---

## C2 · The screen becomes context.

[Open the first cue of this beat](/session-2#computer-use/C2)

### 3 / 42 · A screenshot joins context

**VISUAL** The first screen thumbnail has appeared in context on the right.

**AUTOMATIC ACTION** Capture the first screen and pause at context

**SAY** This screenshot has joined the context: the information available for this decision. What is the goal, what does the screen look like, and what has already been tried? The thumbnail is the most recently observed screen. It may not always match the live application.

**NEXT CONTINUE** Highlight the order-number field. The action stops automatically at the next speaking point.

### 4 / 42 · Find a position from a description

**VISUAL** The cursor is at the order field, marked by a red target outline.

**AUTOMATIC ACTION** Highlight the order-number field

**SAY** Vision reads the screen. UI grounding connects “the order-number field” to this specific position. Here, you can see that connection as a target outline.

**TRANSITION** Why take the route through the interface?

**NEXT CONTINUE** Open C3; Compare an API call with interface actions. The action stops automatically at the next speaking point.

---

## C3 · Two routes into the same app.

[Open the first cue of this beat](/session-2#computer-use/C3)

### 5 / 42 · Two ways to act

**VISUAL** The same return goal branches into an API call or observing and operating the interface. Both routes end with evidence of completion.

**AUTOMATIC ACTION** Compare an API call with interface actions

**SAY** An API is an interface for software. If the order system provides one, a program can request the return directly. If the task requires the visible interface, it needs observation, targeting and actions. Real workflows can combine both routes: API calls where available, and Computer Use for work on screen.

**TRANSITION** Now continue on the same desktop and watch the tools do the work.

**NEXT CONTINUE** Open C4; Fill the form and pause after a new screenshot. The action stops automatically at the next speaking point.

---

## C4 · See. Act. Check.

[Open the first cue of this beat](/session-2#computer-use/C4)

### 6 / 42 · Actions change the application

**VISUAL** The form is filled and a fresh screenshot has returned. There is still no receipt.

**AUTOMATIC ACTION** Fill the form and pause after a new screenshot

**SAY** The model requests a tool call: an operation for a tool to perform. The tool moves the cursor and types. A new screenshot then shows what actually happened. The form is filled, but there is no receipt yet. Is that enough to call the task complete?

**NEXT CONTINUE** Submit, capture a fresh screen and confirm the receipt. The action stops automatically at the next speaking point.

### 7 / 42 · Submit, then verify in a fresh screenshot

**VISUAL** A new screenshot confirms R-204. The application result now matches context.

**AUTOMATIC ACTION** Submit, capture a fresh screen and confirm the receipt

**SAY** The app first shows R-204. A fresh screenshot then brings that receipt into context, giving the model evidence of completion. The agent connects the goal, observations, tools and feedback. Seeing the form or clicking Submit is not enough; check that the application reached the goal.

**TRANSITION** Now change the conditions and see whether the old plan still works.

**NEXT CONTINUE** Open C5; Insert a popup and let the old click fail. The action stops automatically at the next speaking point.

---

## C5 · Change the screen. What now?

[Open the first cue of this beat](/session-2#computer-use/C5)

### 8 / 42 · An old screen can produce the wrong action

**VISUAL** A popup covers the form. The old position has been clicked, but there is no receipt and the right side still holds the old screenshot.

**AUTOMATIC ACTION** Insert a popup and let the old click fail

**SAY** The popup covers the form, but the right side still holds the old screenshot. The click executed, yet it hit the overlay and produced no return receipt. Executing an action and completing the task are different things. Repeating the old click will leave the same problem.

**NEXT CONTINUE** Capture the popup, close it, resubmit and verify. The action stops automatically at the next speaking point.

### 9 / 42 · Observe again and change the action

**VISUAL** The popup is closed, the request is resubmitted, and a new screenshot confirms the receipt.

**AUTOMATIC ACTION** Capture the popup, close it, resubmit and verify

**SAY** The fresh screenshot brings the popup into context. The next action becomes closing it, then resubmitting and checking the receipt. The correction follows new evidence. The model’s weights, its learned internal parameters, are not retrained during this interaction.

**TRANSITION** The same observation and correction can happen in creative software such as Blender.

**NEXT CONTINUE** Open C6; Build the house and produce the first preview. The action stops automatically at the next speaking point.

---

## C6 · Blender: build, render, inspect.

[Open the first cue of this beat](/session-2#computer-use/C6)

### 10 / 42 · From an editable scene to a render

**VISUAL** The teaching animation has built and rendered the house. Its front is still dark.

**AUTOMATIC ACTION** Build the house and produce the first preview

**SAY** Blender creates 3D scenes. We first used code to build editable objects, then rendered them. Rendering produces an image from the scene, camera and lighting. The house is now visible. Is this preview ready to deliver? Look at it first. What would you change?

**NEXT CONTINUE** Inspect the preview, move the light and check the corrected result. The action stops automatically at the next speaking point.

### 11 / 42 · Adjust, then inspect again

**VISUAL** The light has moved, the front is brighter, and the new preview has been checked.

**AUTOMATIC ACTION** Inspect the preview, move the light and check the corrected result

**SAY** The original front was too dark to show the doors and windows clearly. Inspection located the problem. Moving the light made the front clearer. Change the scene, render again, then inspect the result to see whether the adjustment worked. This teaching animation shows how code changes and visual inspection work together.

**NEXT CONTINUE** Play the approximately 30-second published film. The action stops automatically at the next speaking point.

### 12 / 42 · The published result

**VISUAL** After the approximately 30-second published render film, a separate published still remains. The sidebar keeps the Python / bpy → Render → Computer Use workflow visible.

**AUTOMATIC ACTION** Play the approximately 30-second published film

**SAY** That was the real Blender render from the published case; a separate published still remains at the end. The workflow combines bpy, Blender’s Python API, to build the scene and render it, with Computer Use to open Blender and inspect it. The film shows the creative result, not a mouse-action recording. The small loop we saw earlier is part of this richer creative task.

**TRANSITION** How are these abilities learned? Next, separate training from using the model.

**NEXT CONTINUE** Open C7; Try a click and inspect the failed result. The action stops automatically at the next speaking point.

---

## C7 · Practice changes the model.

[Open the first cue of this beat](/session-2#computer-use/C7)

### 13 / 42 · Practice and feedback shape the ability

**VISUAL** The goal is to create a return, but the model clicks Cancel. No receipt appears; failure provides feedback.

**AUTOMATIC ACTION** Try a click and inspect the failed result

**SAY** We have seen the model in use. Now consider training. The goal is a return, but the model clicks Cancel. The action ran; the task failed. Training checks outcomes so successes and failures can provide feedback. This is a simplified exercise, not a live model being trained in the browser.

**NEXT CONTINUE** Show varied tasks and feedback guiding a weight update. The action stops automatically at the next speaking point.

### 14 / 42 · Many practice tasks change weights

**VISUAL** Successes and failures across tasks supply a training signal. The illustrative weight grid changes from v1 to v2.

**AUTOMATIC ACTION** Show varied tasks and feedback guiding a weight update

**SAY** Practice many tasks and use feedback to adjust weights: internal, adjustable numbers that influence predictions. Repeated small updates can teach better actions. Reinforcement learning is a family of methods that learn actions from outcome feedback. OpenAI used this route for CUA.

**NEXT CONTINUE** Use a different layout and locate the button again. The action stops automatically at the next speaking point.

### 15 / 42 · New context with the same learned weights

**VISUAL** The button has moved. The model uses the new screenshot to locate it; v2’s weights stay fixed.

**AUTOMATIC ACTION** Use a different layout and locate the button again

**SAY** After training, show a different layout. The screenshot enters context, and the model uses its learned ability to locate the button again. The available information changes; the weights stay fixed. Reading a new screenshot and correcting an action normally happens during inference: using an already trained model.

**TRANSITION** Some workflows do not need a screen action yet. They need a decision first. That brings us to Jev.

**NEXT CONTINUE** Open J1; Read the message, ask the routing question and return returns. The action stops automatically at the next speaking point.

---

## J1 · Sometimes you need a decision.

[Open the first cue of this beat](/session-2#jev/J1)

### 16 / 42 · Turn the input into a decision the workflow can use

**VISUAL** The message enters the shared state, and the classification question has returned returns.

**AUTOMATIC ACTION** Read the message, ask the routing question and return returns

**SAY** This message asks for a return, so the answer here is returns. Jev is a TypeSafe AI model for decisions with defined answer shapes. State is the input shared by those questions: a message here, with relevant records available in a real workflow. That material supplies context for the decision. The result is a classification the workflow can use.

**TRANSITION** First, let’s introduce decoding.

**NEXT CONTINUE** Open J2; Select The and pause at the new candidates. The action stops automatically at the next speaking point.

---

## J2 · Choose a token. Change what follows.

[Open the first cue of this beat](/session-2#jev/J2)

### 17 / 42 · Decoding: choose a token, then predict again

**VISUAL** The has joined context. The next candidates are returns and support.

**AUTOMATIC ACTION** Select The and pause at the new candidates

**SAY** Decoding selects a token from predicted probabilities according to a rule, appends it to context, then predicts again. A token can be a word, character or piece of text. After choosing The, the next candidates became returns and support. The generated text changed the conditions for what follows. These candidates and probabilities are a teaching illustration.

**NEXT CONTINUE** Choose We, then generate can help .. The action stops automatically at the next speaking point.

### 18 / 42 · Change the beginning and watch what follows

**VISUAL** Choosing We changes the candidates. We can help . completes one token at a time.

**AUTOMATIC ACTION** Choose We, then generate can help .

**SAY** Choose We, and can or will becomes a suitable continuation. Repeat until the sentence is complete. Each selected token conditions the next step. This demo takes the highest probability; sampling is another rule. Decoding is this step-by-step selection process.

**TRANSITION** How do an ordinary LLM and Jev approach the same decision?

**NEXT CONTINUE** Open J3; Generate structured JSON token by token. The action stops automatically at the next speaking point.

---

## J3 · Same decision. Different output path.

[Open the first cue of this beat](/session-2#jev/J3)

### 19 / 42 · An ordinary LLM can decide too

**VISUAL** The LLM on the left has finished generating JSON token by token. The Jev path on the right has not run yet.

**AUTOMATIC ACTION** Generate structured JSON token by token

**SAY** An ordinary LLM can make decisions too. We can ask for a label, constrain the output to JSON, or ask several questions in one call. The answer on the left was generated token by token through decoding. Structured output alone is not the dividing line between an ordinary LLM and Jev.

**NEXT CONTINUE** Keep the LLM result and run the Jev path. The action stops automatically at the next speaking point.

### 20 / 42 · An output path built for decisions

**VISUAL** The LLM result remains on the left. On the right, three typed questions about the same state have returned results.

**AUTOMATIC ACTION** Keep the LLM result and run the Jev path

**SAY** Jev handles predefined decisions rather than freely continuing text. Questions share state, are evaluated independently and can run in parallel. Code uses the results and probabilities to choose a branch. TypeSafe also targets decisions and calibrated probabilities in training. Whether it fits better than an ordinary LLM needs testing on real tasks. This shows output relationships, not internal architecture or measured speed.

**TRANSITION** What answer shapes does it provide?

**NEXT CONTINUE** Open J4; Focus on Choice team options and their probabilities. The action stops automatically at the next speaking point.

---

## J4 · Choose. Score. Estimate.

[Open the first cue of this beat](/session-2#jev/J4)

### 21 / 42 · Choice: select from defined options

**VISUAL** Choice shows returns, billing and shipping with probabilities 0.94, 0.04 and 0.02.

**AUTOMATIC ACTION** Focus on Choice team options and their probabilities

**SAY** Choice answers “which one?” We define returns, billing and shipping as the available options, and it returns a selection and the option probabilities. Returns leads here. The software receives a defined answer it can use for routing.

**NEXT CONTINUE** Show the five-level rubric, its distribution and expected score 1.4. The action stops automatically at the next speaking point.

### 22 / 42 · Score: define what each level means

**VISUAL** The five levels run from 0 routine to 4 critical. Their probabilities are 0.1, 0.5, 0.3, 0.1 and 0, with an expected score of 1.4.

**AUTOMATIC ACTION** Show the five-level rubric, its distribution and expected score 1.4

**SAY** Score answers “to what degree?” It first needs a rubric: a scoring standard. Here the levels run from 0 for routine handling to 4 for critical urgency, with a definition for each level. The model supplies probabilities for the levels. Their weighted average is 1.4, the expected score. The number is tied to a defined scale.

**NEXT CONTINUE** Show the proposition “the customer wants a return” and probability 0.96. The action stops automatically at the next speaking point.

### 23 / 42 · Noul: estimate whether a proposition is true

**VISUAL** Noul focuses on one proposition: the customer wants a return. The illustrative probability is 0.96.

**AUTOMATIC ACTION** Show the proposition “the customer wants a return” and probability 0.96

**SAY** Noul estimates the probability that a proposition is true. For “the customer wants a return,” this illustration gives 0.96. It does not add a separate confidence value. Choice handles options, Score uses a defined scale, and Noul estimates a proposition. These numbers are teaching examples. Next, we will look at training and checking such outputs.

**TRANSITION** Once a probability is supplied, it also needs to be appropriate.

**NEXT CONTINUE** Open J5; Show the duplicate-charge ticket, v1’s returns prediction and the billing label. The action stops automatically at the next speaking point.

---

## J5 · Learn from feedback. Check on new cases.

[Open the first cue of this beat](/session-2#jev/J5)

### 24 / 42 · Inspect a concrete decision error

**VISUAL** The training ticket says “Charged twice. I’m keeping the shoes.” v1 predicts returns with probability 0.95, but the known label is billing.

**AUTOMATIC ACTION** Show the duplicate-charge ticket, v1’s returns prediction and the billing label

**SAY** The customer was charged twice and wants to keep the shoes. The known answer is billing, but the model chose returns with probability 0.95. Comparing its prediction with the answer provides training feedback. One confident mistake cannot establish whether the model is calibrated overall.

**NEXT CONTINUE** Show varied cases, training feedback and a weight update. The action stops automatically at the next speaking point.

### 25 / 42 · How feedback changes the model

**VISUAL** Varied tickets and known outcomes provide feedback. The weight grid changes, taking the model from v1 to v2.

**AUTOMATIC ACTION** Show varied cases, training feedback and a weight update

**SAY** Feedback from many examples becomes a signal for adjusting weights, affecting judgments on future inputs. TypeSafe calls its approach RLCD: Reinforcement Learning for Calibrated Decisions. It targets decisions and calibrated probabilities. This shows the general principle; the public explanation does not specify the update algorithm.

**NEXT CONTINUE** Reveal the separate batch together and compare predictions with outcomes. The action stops automatically at the next speaking point.

### 26 / 42 · Check calibration on the new cases

**VISUAL** v2’s weights stay fixed. A separate batch has predictions near 0.8; all ten outcomes appear together, eight correct and two wrong.

**AUTOMATIC ACTION** Reveal the separate batch together and compare predictions with outcomes

**SAY** Use cases that did not contribute to training. Calibration asks whether many predictions with similar probabilities match observed frequencies. This 0.8 belongs to new cases; it is not a reduction of the earlier 0.95, nor a guarantee of eight successes in every ten. Ten teaching cases cannot prove that training improved the model.

**TRANSITION** Now bring that question back to our message.

**NEXT CONTINUE** Open J6; Show the team distribution and pause at the ambiguity. The action stops automatically at the next speaking point.

---

## J6 · Two numbers, two meanings.

[Open the first cue of this beat](/session-2#jev/J6)

### 27 / 42 · Option probability and confidence

**VISUAL** Team probabilities are returns 0.61, billing 0.35 and shipping 0.04; confidence is 0.42.

**AUTOMATIC ACTION** Show the team distribution and pause at the ambiguity

**SAY** The message now asks for a return and reports a duplicate charge. Returns leads, but billing also has substantial probability. The 0.61 describes an option; confidence summarizes the distribution’s shape. These are not two versions of accuracy. The ambiguity matters for the next workflow step.

**NEXT CONTINUE** Switch to the return-reason distribution. The action stops automatically at the next speaking point.

### 28 / 42 · Another question can be clear

**VISUAL** The question is now Return reason. wrong_size is 1.00 and the other reason is 0.

**AUTOMATIC ACTION** Switch to the return-reason distribution

**SAY** Ask a different question: what is the return reason? Wrong size is explicit. The same state can be ambiguous for one question and clear for another. This simplified input borrows the team and reason values from the official documentation to illustrate the distinction. They are not measurements on this new message or results from a live call.

**TRANSITION** When the decision is mixed, what should the workflow do next?

**NEXT CONTINUE** Open J8; Continue with the same mixed request and route the envelope to a person. The action stops automatically at the next speaking point.

---

## J8 · A decision becomes a next step.

[Open the first cue of this beat](/session-2#jev/J8)

### 29 / 42 · Clarify when the evidence is mixed

**VISUAL** The message and team decision continue from J6. The envelope enters the Person branch without adding the charge issue again.

**AUTOMATIC ACTION** Continue with the same mixed request and route the envelope to a person

**SAY** The same message raises two issues, and the team decision is mixed. This teaching policy therefore asks a person to clarify, and the envelope takes that route. The probability now affects an action. A real system must set routing conditions for its own policy and risk; there is no universal threshold here.

**NEXT CONTINUE** Expand the workflow across Jev, ordinary code, an LLM and a person. The action stops automatically at the next speaking point.

### 30 / 42 · Give each part of the workflow a defined job

**VISUAL** The full workflow shows Jev making a bounded decision, ordinary code selecting a branch, then an LLM drafting a reply or a person clarifying.

**AUTOMATIC ACTION** Expand the workflow across Jev, ordinary code, an LLM and a person

**SAY** Jev is worth evaluating for many repeated decisions with a defined answer space. Ordinary code handles branching. A generative LLM can write an explanation or reply, while a person can clarify ambiguity. Screen interaction still needs a vision model and tools; Jev currently takes text and JSON. Whether to use it depends on accuracy, calibration, cost and latency on your own tasks.

**TRANSITION** Finally, move from handling tasks to improving the method used to handle them.

**NEXT CONTINUE** Open R1; Introduce the recursive question in RSI. The action stops automatically at the next speaking point.

---

## R1 · Improve the recipe for improving.

[Open the first cue of this beat](/session-2#rsi/R1)

### 31 / 42 · Can the improver itself become stronger?

**VISUAL** Two recipe sheets connect v1 to v2, with a question mark on the return path.

**AUTOMATIC ACTION** Introduce the recursive question in RSI

**SAY** RSI means Recursive Self-Improvement. Revising one answer changes an output. Retaining a better algorithm or tool improves a reusable method. RSI asks a further question: can AI help build a more capable successor that becomes better at driving another improvement cycle? The recursion concerns whether that ability carries forward. The question mark shows a loop that still needs investigation and evidence.

**TRANSITION** Why use AI for part of the research process?

**NEXT CONTINUE** Open R3; Expand one idea into many candidates and a limited set of experiments. The action stops automatically at the next speaking point.

---

## R3 · Ideas are cheap. Experiments take work.

[Open the first cue of this beat](/session-2#rsi/R3)

### 32 / 42 · Many ideas, limited experiments

**VISUAL** One idea expands into several candidates, only some of which can enter experiments.

**AUTOMATIC ACTION** Expand one idea into many candidates and a limited set of experiments

**SAY** Research often has more ideas than time to turn them into working implementations and run experiments. Candidates multiply, while the number that can be tested remains limited. This motivates using AI to propose alternatives and help with parts of implementation and experimentation.

**NEXT CONTINUE** Show the loop from AI proposals through implementation, tests and retained methods. The action stops automatically at the next speaking point.

### 33 / 42 · Propose, run, check, then retain

**VISUAL** Candidates pass through implementation and testing. Only checked improvements reach the retained-method stage.

**AUTOMATIC ACTION** Show the loop from AI proposals through implementation, tests and retained methods

**SAY** A proposal is only the start. It must run and face independent checks before an improvement can be retained for another task. We will shrink this loop to a small problem: sort numbers in ascending order without losing any values. Check correctness first, then compare work. These candidates are prewritten programs that really run locally, not algorithms invented live by AI.

**TRANSITION** Establish a baseline with the original method, then test alternatives.

**NEXT CONTINUE** Open R4; Run A and check the full fixed test suite automatically. The action stops automatically at the next speaking point.

---

## R4 · Which program should we keep?

[Open the first cue of this beat](/session-2#rsi/R4)

### 34 / 42 · Establish the baseline

**VISUAL** A has finished and passed 6 / 6 checks. The output order and operation count remain visible.

**AUTOMATIC ACTION** Run A and check the full fixed test suite automatically

**SAY** A repeatedly compares neighbors and swaps when needed. The block movements and counts come from the actual comparisons and array writes. The evaluator also checks other inputs, not just the example on screen.

**NEXT CONTINUE** Run B, check it and reject the faulty candidate. The action stops automatically at the next speaking point.

### 35 / 42 · Less work, but the wrong result

**VISUAL** B’s errors are marked red. It failed part of the fixed suite, and A is still retained.

**AUTOMATIC ACTION** Run B, check it and reject the faulty candidate

**SAY** B makes one pass and uses less work, but the output is still out of order. The check marks the errors red, and A stays retained. Less work without completing the task is not an improvement.

**NEXT CONTINUE** Run C, check it and retain the improvement. The action stops automatically at the next speaking point.

### 36 / 42 · Compare work after correctness

**VISUAL** C passed 6 / 6 checks, used less work than A on the suite, and is now the retained method.

**AUTOMATIC ACTION** Run C, check it and retain the improvement

**SAY** C inserts each new item into the sorted left side. It passes all six checks and uses less work on the same suite, so it replaces A. What persists is a reusable program. Six tests support a bounded result, not correctness for every input or proof of full RSI.

**TRANSITION** Real research also uses models to propose candidates and programs to evaluate them.

**NEXT CONTINUE** Open R5; Show Gemini proposing code, tests rejecting candidates and retention. The action stops automatically at the next speaking point.

---

## R5 · Propose code. Test it. Keep the gain.

[Open the first cue of this beat](/session-2#rsi/R5)

### 37 / 42 · AlphaEvolve also proposes, then checks

**VISUAL** Gemini proposes code candidates. Automated tests reject failures, and evaluated improvements are retained.

**AUTOMATIC ACTION** Show Gemini proposing code, tests rejecting candidates and retention

**SAY** In real research, AlphaEvolve uses Gemini to propose code candidates and automated evaluation to select them. The rule from our sorting bench still applies: a candidate must run and survive checks before it is worth retaining. The model searches for alternatives; evaluation tells us whether they improve the task.

**NEXT CONTINUE** Reveal the 23% matrix-kernel speedup and roughly 1% total training-time reduction. The action stops automatically at the next speaking point.

### 38 / 42 · A component speedup and its overall effect

**VISUAL** The two figures refer to a 23% matrix-multiplication kernel speedup and about a 1% reduction in total Gemini training time.

**AUTOMATIC ACTION** Reveal the 23% matrix-kernel speedup and roughly 1% total training-time reduction

**SAY** DeepMind reported a 23 percent speedup in a matrix-multiplication kernel. Think of a kernel as a small computation routine used repeatedly during training. That speedup reduced total Gemini training time by about 1 percent. One figure describes the component; the other describes the whole process. This is specific evidence of an algorithmic improvement, not a measurement of increased intelligence.

**TRANSITION** What is missing between a better component and a better improver?

**NEXT CONTINUE** Open R6; Find missing failure examples and propose diagnostic exercises. The action stops automatically at the next speaking point.

---

## R6 · Train a successor. Test the improver.

[Open the first cue of this beat](/session-2#rsi/R6)

### 39 / 42 · A proposes a training-recipe change

**VISUAL** A finds mostly successful training examples. The proposed recipe adds failed experiments and their diagnoses.

**AUTOMATIC ACTION** Find missing failure examples and propose diagnostic exercises

**SAY** Consider a hypothetical route. AI A notices that the training material mostly shows successful experiments. It proposes examples of different failures and how to investigate them. That changes a successor’s training-data recipe. Adding examples does not guarantee a stronger model; the proposal still needs training and testing.

**NEXT CONTINUE** Show practice, loss comparison and weight updates. The action stops automatically at the next speaking point.

### 40 / 42 · Train B using the new recipe

**VISUAL** The new examples enter B’s training. Comparing attempts with targets produces loss, and the weight grid changes.

**AUTOMATIC ACTION** Show practice, loss comparison and weight updates

**SAY** Next, train B using the new recipe: attempt examples, compare with targets to calculate loss, an error score, then adjust weights and repeat. Saved parameters change. Asking for another reply usually changes only the current output. Completing training does not yet establish that B is stronger.

**NEXT CONTINUE** Compare A and B on separate research tasks, then show the conditional path to C. The action stops automatically at the next speaking point.

### 41 / 42 · Evaluate the ability before another cycle

**VISUAL** Separate research tasks compare A and B. Evidence of improved research ability is required before B attempts to help improve C.

**AUTOMATIC ACTION** Compare A and B on separate research tasks, then show the conditional path to C

**SAY** Compare A and B on research tasks not used for training: which can diagnose a failure and propose a useful experiment? Evidence of improved research ability would justify asking B to attempt another change. Whether it can help build a better successor still needs checking each cycle. People continue to set objectives, evaluation, permissions and stopping conditions.

**TRANSITION** Finally, put the three terms back on one map.

**NEXT CONTINUE** Open E1; Return to the three terms and their evidence of success. The action stops automatically at the next speaking point.

---

## E1 · Three ways to move forward.

[Open the first cue of this beat](/session-2#closing/E1)

### 42 / 42 · Close with three questions

**VISUAL** The three opening pictures return, now paired with three different kinds of evidence of success.

**AUTOMATIC ACTION** Return to the three terms and their evidence of success

**SAY** Computer Use lets AI act through an interface; the evidence is whether the application reached the goal. Jev targets defined decision tasks; the evidence is how reliably it works in the actual workflow. RSI asks whether improvement ability can carry into a successor and repeat, which needs stronger evidence. When you encounter a new AI term, ask: what changed, how do we know, and what remains unproven?

**TRANSITION** Those are our three terms for today.

**NEXT CONTINUE** The talk is complete. Hold the closing page for questions; use the main button to return to the collection when finished.
