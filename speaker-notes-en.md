# Beyond Bigger Models — Atlas Speaker Notes

> Use Atlas only. Follow LOOK → SAY → DO → CLICK; the demo button advances an internal step, while the bottom-right global arrow changes slides.

## Opening

**LOOK |** The acronym storm settles into **SIX TERMS · THREE SHIFTS**.

**SAY |** AI moves fast, but its vocabulary sometimes seems to move even faster—and the AI naming department never takes a day off. These six terms are not six unrelated trends; they fit into three shifts: bigger to smarter, answers to actions, and shipping to learning. For each one, we will ask what it means, why it appeared, how it works, and where we see it today.

**DO |** Let the acronym storm land, then move down the three shift rails.

**CLICK |** Global next-slide arrow → **MoE**.

---

## MoE

**LEAD-IN |** A model can become much larger without using all of itself every time.

### M1 — Name

**LOOK |** **MoE** expands into **Mixture of Experts**.

**SAY |** MoE stands for **Mixture of Experts**. An expert is not a complete chatbot; it is one compute block inside the model. To see why we keep many of them, start with a conventional dense model.

**DO |** Point to **MoE**, then follow the letters as they expand.

**CLICK |** **Show the dense model**.

### M2 — Dense

**LOOK |** One highlighted token becomes a yellow task slip, and the whole compute block lights up.

**SAY |** A language model keeps predicting the next token. Think of the yellow token as a task slip and the model as a company. In a dense model, the full compute block works on every token—like calling the whole company for every small task.

**DO |** Follow the token to the task slip, then sweep across all the lit windows.

**CLICK |** **Add more capacity**.

### M3 — Cost

**LOOK |** The building grows while the task slip stays the same and the compute bill rises.

**SAY |** We make the company larger because we want more capability. But every new floor joins every tiny task, so the cost of each task grows with the capacity.

**DO |** Hold on the unchanged task slip, then trace the growing building and bill.

**CLICK |** **Switch to MoE**.

### M4 — Route

**LOOK |** The large building stays, but only **8 of 256** windows light up.

**SAY |** MoE does not shrink the company; it adds a dispatcher called the router. For this token, the router selects 8 of 256 available expert blocks. Only that small set of teams receives the task.

**DO |** Hold on the full building outline, then point to the eight red windows and the quiet grey windows.

**CLICK |** **Open the selected experts**.

### M5 — Run

**LOOK |** One selected office shows **task in → compute → note out** while the others stay still.

**SAY |** “Activating eight experts” is less mysterious than it sounds. Those eight teams receive the task and compute, while the others do no work this time. They are helping with this one small step, not answering the whole question independently.

**DO |** Follow the slip into the office and the note coming out; briefly point to the still offices, then wait for one full cycle.

**CLICK |** **Combine their outputs**.

### M6 — Combine

**LOOK |** Eight outputs flow into **8 → 1**, with **8 called in / 248 quiet**.

**SAY |** The eight expert outputs are combined into one result and passed to the next layer. The model keeps the capacity of 256 experts, while this token pays the compute cost of only eight. Now let us see where this is used.

**DO |** Follow the outputs into **8 → 1**, then point back to **8 called in / 248 quiet**.

**CLICK |** **Show real models**.

### M7 — Examples

**LOOK |** DeepSeek-V3, Qwen3 MoE, and Kimi K2 show **total parameters → active parameters per token**.

**SAY |** These are real models built with MoE. DeepSeek-V3 has 671 billion parameters in total but activates about 37 billion for each token; Qwen3 MoE and Kimi K2 use the same broad idea. Do not memorize the numbers—notice the pattern: large total capacity, smaller active compute.

**DO |** Read the DeepSeek-V3 row once, then sweep down the repeated **total → active** pattern.

**TRANSITION |** MoE keeps the large company but calls in only a small team; what if we cannot afford the large company at all?

**CLICK |** Do not click **Replay MoE** unless you want to restart; use the global next-slide arrow → **Distillation**.

---

## Knowledge Distillation

**LEAD-IN |** Keep selected behavior, but deploy a genuinely smaller model.

### D1 — Name

**LOOK |** A **large teacher** makes lessons for a separate **small student** that later runs alone.

**SAY |** Knowledge Distillation does not squeeze one large model into a smaller file. A capable large model becomes the teacher and prepares lessons for a separate smaller student. Like a senior support agent teaching a junior, the student later works alone.

**DO |** Follow **LARGE TEACHER → LESSONS → SMALL STUDENT**, then stop on **runs alone**.

**CLICK |** **Why distill?**

### D2 — Why

**LOOK |** **High capability** meets **high cost / call** and a deployment limit.

**SAY |** Why not use the teacher everywhere? A product also faces limits in cost, devices, privacy, and request volume. Distillation spends the expensive intelligence during training, then deploys the smaller student many times.

**DO |** Move from **HIGH CAPABILITY** to **HIGH COST / CALL**, cross the limit, then sweep across the four targets.

**CLICK |** **Try the student**.

### D3 — Miss

**LOOK |** The student reads “Fantastic” and “Love” as **PRAISE**, even though the ticket is a sarcastic complaint.

**SAY |** The student sees positive words and predicts praise. But “again” and “client demo” reveal a sarcastic complaint. It recognizes the words but misses the intent.

**DO |** Point to **Fantastic · Love**, then **again · client demo**, and finish on **WRONG**.

**NOTE |** This ticket is an invented demonstration example.

**CLICK |** **Ask the teacher**.

### D4 — Lesson

**LOOK |** The teacher turns the contradiction into **INTENT · WHY · ACTION**.

**SAY |** The teacher does more than label the message “complaint.” It creates a worked lesson: what the customer means, why that reading is correct, and what support should do next. The student can learn the clues and the response pattern, not only the final label.

**DO |** Trace the contradiction, then move down **INTENT → WHY → ACTION**.

**CLICK |** **Train on many**.

### D5 — Train

**LOOK |** Many lessons turn one mismatch into repeated **small updates** and a better rule.

**SAY |** One lesson is not enough. Each training step compares the student’s guess with the teacher lesson, and a mismatch makes one small update. Across many varied examples, the student replaces “positive word means praise” with a better habit: read context, contradiction, and intent.

**DO |** Sweep across the lessons, follow **PRAISE ≠ COMPLAINT** to **SMALL UPDATE**, then compare **BEFORE** and **AFTER MANY LESSONS**.

**CLICK |** **Remove the teacher**.

### D6 — Alone

**LOOK |** **TEACHER — OFFLINE**; a new ticket arrives and the **SMALL STUDENT — RUNS ALONE**.

**SAY |** Now remove the teacher. The new ticket uses a different problem and different wording, yet the student recognizes the complaint and responds on its own. If every live request still called the teacher, it would only be a two-model system—not distillation at deployment.

**DO |** Point to **TEACHER — OFFLINE**, then the new message, and finish on **RUNS ALONE** and **CORRECT READ**.

**CLICK |** **Show real models**.

### D7 — Examples

**LOOK |** Apple, Gemma 2, and DeepSeek-R1 show three real uses of distillation.

**SAY |** Apple used distillation while training its roughly three-billion-parameter on-device model. Google used a 27B teacher for Gemma 2’s 2B and 9B models, while DeepSeek used R1 reasoning data to train smaller distilled models. The shared pattern is simple: teach before deployment, then serve without the teacher.

**DO |** Read the Apple row once, then sweep across **on-device · open + edge · reasoning**.

**NOTE |** These are different recipes, not one common compression ratio.

**TRANSITION |** If AI wants to act, how can it think about the result before it moves?

**CLICK |** Do not click **Replay Distill** unless you want to restart; use the global next-slide arrow → **World Model**.

---

## World Model

**LEAD-IN |** Move from recognizing the present to predicting what an action may change.

### W1 — Name

**LOOK |** **NEXT WORD → WHAT IS HERE → WHAT HAPPENS NEXT**.

**SAY |** A World Model is not an acronym. An LLM predicts the next piece of text, and a vision model recognizes what is here. A world model asks what may happen after an action—like a simplified simulator inside the AI.

**DO |** Move across the three columns, then trace **NOW + ACTION → NEXT**.

**CLICK |** **Why predict?**

### W2 — Why

**LOOK |** The scene is recognized correctly, but three possible actions still end in question marks.

**SAY |** Seeing the curb is useful, but an acting robot must also ask what each move may cause. From the same scene, left may be a detour, straight may approach the goal, and right may hit the curb. Recognizing the present and predicting an action’s consequence are different jobs.

**DO |** Point to the three recognized objects, then cross the question mark to the three unanswered actions.

**NOTE |** This distinction does not mean that multimodal models cannot reason.

**CLICK |** **Watch it learn**.

### W3 — Learn

**LOOK |** **01 WATCH → 02 GUESS → 03 CHECK → 04 ADJUST**.

**SAY |** Give the model many recorded experiences: what was visible, what action happened, and what came next. During training, hide the ending, let it guess, then compare that guess with reality and adjust. Repeating this makes it better at predicting change.

**DO |** Follow the four numbered beats, then point to **many real sequences**.

**CLICK |** **Try three actions**.

### W4 — Futures

**LOOK |** The real robot stays at **SAME START** while three imagined futures move.

**SAY |** Once the model can predict, it can attach three actions to the same present and imagine three futures. The real robot has not moved; only the imagined futures move. It can make mistakes in simulation before choosing one action in reality.

**DO |** Stop on **REALITY HAS NOT MOVED**, then sweep across the three outcomes.

**CLICK |** **Plan before moving**.

### W5 — Plan

**LOOK |** Routes **A, B, C** are scored; **B** is selected, but reality executes only one action.

**SAY |** The model can imagine several moves ahead and form possible routes. It compares which route is safer and closer to the goal, then executes only the first move from the best one. It looks again and replans, like GPS updating after each real segment.

**DO |** Compare **A, B, C**, stop on **SELECT B**, then point to **EXECUTE IN REALITY — ONE ACTION**.

**CLICK |** **What does it build?**

### W6 — Form

**LOOK |** **VISIBLE FUTURE** and **HIDDEN FUTURE** answer the same decision question.

**SAY |** Some world models generate a future people can watch as pixels or video. Others keep a hidden predictive state with only the useful facts. If the question is whether a move is safe and closer to the goal, the model needs decision-relevant information—not a beautiful sky.

**DO |** Compare **VISIBLE FUTURE** with **HIDDEN FUTURE**, then return to the shared question below.

**CLICK |** **Show real systems**.

### W7 — Examples

**LOOK |** **Genie 3** shows a visible world; **V-JEPA 2** plans with a hidden predictive state.

**SAY |** Genie 3 makes a predicted environment visible and interactive. V-JEPA 2 does not need to generate video; it compares robot actions in a hidden state. The forms differ, but both help a system simulate, test, and plan before acting in reality.

**DO |** Let the Genie 3 video play, compare **VISIBLE WORLD** with **HIDDEN WORLD**, then sweep across the three uses.

**NOTE |** These are research systems, not complete copies of physics.

**TRANSITION |** World Model asks, “What may happen next?” VLA asks, “What should this body do now?”

**CLICK |** Do not click **Replay World Model** unless you want to restart; use the global next-slide arrow → **VLA**.

---

## VLA

**LEAD-IN |** Prediction becomes physical action.

### V1 — Name

**LOOK |** **VISION → LANGUAGE → ACTION**, joined as **V + L → VLA → A**.

**SAY |** VLA stands for **Vision-Language-Action**. Vision shows what is here, and language supplies the goal. Action chooses what the body should do now.

**DO |** Move across **VISION → LANGUAGE → ACTION**, then trace the formula below.

**CLICK |** **Why is that hard?**

### V2 — Why

**LOOK |** One sentence leaves the body asking **which object, what path, how much force, and when to stop**.

**SAY |** “Put the orange block in the tray” states the goal but not how the arm should complete it. The robot must find the block, avoid the obstacle, choose its grip and force, and know when to release. Language says what we want; the body must decide how.

**DO |** Start on **1 SENTENCE**, move through **WHICH? → HOW? → ENOUGH?**, and finish on **WHAT versus HOW**.

**CLICK |** **Unpack the task**.

### V3 — Steps

**LOOK |** One goal unfolds into **FIND → REACH → ALIGN → GRIP → LIFT → PLACE**.

**SAY |** Give the sentence to a body and it becomes a sequence of coordinated movements. The robot must find the block, reach around the obstacle, align, grip, lift, and place it in the tray.

**DO |** Follow the six numbered moves, then finish on **1 GOAL → 6 COORDINATED MOVES**.

**CLICK |** **How does it learn?**

### V4 — Learn

**LOOK |** A recorded demonstration becomes **WATCH → HIDE → GUESS → CHECK → ADJUST**.

**SAY |** Record people controlling robots to complete tasks. During training, show the scene and goal but hide the expert’s next move; let the model guess, reveal the action, compare, and adjust. Repeating this across many demonstrations improves its next move.

**DO |** Trace the five numbered beats, then point to **many recorded robot demonstrations**.

**CLICK |** **Let reality answer**.

### V5 — Feedback

**LOOK |** The block slips, the next camera frame reveals it, and the arm shifts left to re-grip.

**SAY |** The robot should not commit to one long motion. Here the block slips, so the next camera frame reveals the failure and changes the next action. The rhythm is simple: act a little, look again, correct.

**DO |** Follow **THE BLOCK SLIPPED → REALITY ANSWERS → SHIFT LEFT · RE-GRIP**, then the loop below.

**NOTE |** This scene is our webpage illustration, not official robot footage.

**CLICK |** **Why is this harder than chat?**

### V6 — Hard

**LOOK |** **BAD WORD — UNDO** versus **BAD MOTION — CONTACT ALREADY HAPPENED**.

**SAY |** A bad word can be deleted and rewritten, but a bad motion has already touched the world. A VLA must understand space, timing, and force while learning from slow, costly physical demonstrations. It also has to stay safe.

**DO |** Compare the two failures, then sweep across the three constraints below.

**CLICK |** **See a real system**.

### V7 — Example

**LOOK |** Official **Gemini Robotics 2** footage shows **VISION · LANGUAGE · ACTION** and **PRIVATE PREVIEW**.

**SAY |** This official footage shows vision, language, and body control coming together across robot arms, bi-arm robots, and full humanoids. Gemini Robotics 2’s VLA is currently in private preview for early-access partners. It is not yet a general-purpose home robot.

**DO |** Let the video play, move down **VISION → LANGUAGE → ACTION**, and finish on **AVAILABILITY — PRIVATE PREVIEW**.

**NOTE |** One clip does not prove success in every environment.

**TRANSITION |** Robots enter the physical world; enterprise AI enters a world of data, permissions, workflows, and people.

**CLICK |** Do not click **Replay VLA** unless you want to restart; use the global next-slide arrow → **FDE**.

---

## FDE

**LEAD-IN |** The next term is a role that connects AI to that enterprise world. We will explain it with an invented **46 → blank** workflow.

### F1 — Name

**LOOK |** **AI PRODUCT → FDE → LIVE COMPANY**, labelled **JOB · NOT A MODEL**.

**SAY |** FDE stands for **Forward Deployed Engineer**. It is a job, not an AI model. Think of a smart standard machine entering a factory with different plugs, doors, and working methods: the FDE helps it actually run there.

**DO |** Move from **AI PRODUCT** through **FDE** to **LIVE COMPANY**, then stop on **JOB · NOT A MODEL**.

**CLICK |** **Why does AI need one?**

### F2 — Why

**LOOK |** A good AI answer hits a **REALITY WALL** and never enters the workflow.

**SAY |** In a demo, one clean file goes into AI and a good answer comes out. Inside a company, that answer still needs the right access, approval, workflow, and owner. The model answered correctly, but the company still cannot act on it.

**DO |** Follow **ONE FILE → AI → GOOD ANSWER**, let it hit **REALITY WALL**, then finish on **ANSWER NOT IN THE WORKFLOW**.

**CLICK |** **Enter the real workflow**.

### F3 — Workflow

**LOOK |** **EMAIL 46 → SPREADSHEET 46 → AI 46 ✓ → APPROVAL → LIVE SYSTEM BLANK**.

**SAY |** The email, spreadsheet, AI, and approval all carry 46, but the live system is blank. An “AI failure” is not always a model failure; the value may disappear during a handoff. The FDE tracks it like a parcel to find the stop where 46 was lost.

**DO |** Follow all five stops, then move down to **SOURCE 46 ≠ PRODUCTION BLANK**.

**CLICK |** **Follow one failure**.

### F4 — Evidence

**LOOK |** “The AI got it wrong” becomes **SOURCE 46 + OUTPUT BLANK + EXPERT 46 ✓**.

**SAY |** “The AI got it wrong” is only a complaint; the product team still does not know what to fix. The FDE captures the source, the actual output, and the answer confirmed by an expert. That turns emotion into a case engineers can reproduce and check.

**DO |** Start at **NOT REPRODUCIBLE**, then combine the three facts into **REPRODUCIBLE CASE**.

**CLICK |** **Who owns what?**

### F5 — Roles

**LOOK |** Product Engineer, FDE, and Domain Expert have three different **FINISH LINE** labels.

**SAY |** An FDE is not simply a more senior normal engineer. Product engineers build reusable capability, domain experts define what correct means, and the FDE connects both sides until this workflow works and people adopt it. They are partners, not a ranking.

**DO |** Compare the three finish lines, then trace **DISCOVER → CONNECT → DEPLOY → ADOPT**.

**CLICK |** **Make the lesson reusable**.

### F6 — Reuse

**LOOK |** **46 → BLANK** becomes **CASE → TEST → FIX**, and a later **52 → 52 ✓** succeeds.

**SAY |** If the FDE manually fills in 46 every time, that person becomes a permanent patch. A better outcome is to turn the failure into a case and test, then fix the product. The lesson remains after the FDE leaves, so a similar case can work without another rescue.

**DO |** Follow **46 → BLANK** into **CASE → TEST → FIX**, then continue to **52 → 52 ✓**.

**NOTE |** The value 52 is illustrative.

**CLICK |** **See a real deployment**.

### F7 — Example

**LOOK |** A Tax AI deployment shows **7,000 returns** and **25% → 86%** in six weeks.

**SAY |** OpenAI FDEs and researchers, Thrive engineers, and Crete tax practitioners worked together on Tax AI. At launch, 25% of returns had at least 75% of fields correct; six weeks later, 86% did. The case shows practitioners, field data, evaluation, and engineering forming a continuing loop.

**DO |** Read **7,000** and **25% → 86%**, then sweep across **PRACTITIONERS → FIELD DATA → EVALS → ENGINEERING**.

**NOTE |** This is a team result, not one heroic FDE.

**TRANSITION |** Today people close this learning loop; how much of it could AI eventually close itself?

**CLICK |** Do not click **Replay FDE** unless you want to restart; use the global next-slide arrow → **RSI**.

---

## RSI

**LEAD-IN |** The final term asks whether AI could improve the process that builds its successor.

### R1 — Name · Meet RSI

**LOOK |** **R · S · I** opens beside **AI · N → RECIPE → AI · N+1**, with a question mark on the return loop.

**SAY |** RSI means **Recursive Self-Improvement**. Think of the process for building an AI as a recipe: one AI helps improve the recipe used to build the next AI. “Recursive” means the next AI would then need to do it again.

**DO |** Point to the full name, then trace **AI · N → RECIPE → AI · N+1**.

**CLICK |** **Show what must change**.

### R2 — Difference · Answer ≠ Recipe

**LOOK |** One answer changes from **WRONG** to **FIXED**, but **BUILD RECIPE · STILL v1**.

**SAY |** An AI can correct one answer, but that is not RSI. It is like fixing one dish without changing the recipe. Full self-improvement must leave behind a better way to build the next AI.

**DO |** Point to the fixed answer, the large **≠**, then the unchanged recipe.

**CLICK |** **Run today's loop**.

### R3 — Method · Today’s Loop

**LOOK |** People set **GOAL** and **TEST**; AI tries A, B, and C, then keeps the verified winner.

**SAY |** Today, people set the challenge and the rules. AI tries many versions, an external test checks them, and the winner becomes the next starting point. The fastest version still loses if it is wrong, and then the tryout begins again.

**DO |** Point to **GOAL**, **TEST**, rejected candidate B, winner C, and **REPEAT**.

**CLICK |** **See a real result**.

### R4 — Result · Real Result

**LOOK |** **ONE REPEATED MATH ROUTINE · +23%** reaches **WHOLE GEMINI TRAINING RUN · −1% TIME**.

**SAY |** Google DeepMind reports that AlphaEvolve made one repeated math routine used in Gemini training 23 percent faster. That reduced the overall training time by about 1 percent. It shows that AI can help improve one part of the process used to build AI.

**DO |** Point to **+23%**, then follow the effect to **−1% TIME**.

**NOTE |** This is a bounded AI-for-AI result, not full RSI.

**CLICK |** **Find the human boundary**.

### R5 — Boundary · Human Boundary

**LOOK |** AI explores inside a frame while people hold **DIRECTION · TEST · GO / STOP**.

**SAY |** The AI searches inside the box, but people still choose what to improve. People also decide what counts as better and whether the result may be used. That is why this is still bounded.

**DO |** Point to the three human decisions, then the AI search area inside the frame.

**CLICK |** **Test full RSI**.

### R6 — Full RSI · Full RSI Test

**LOOK |** **AI · N → recipe v2 → AI · N+1**, but the return cable stops before the final connection.

**SAY |** Full RSI would require AI · N to improve the recipe, use it to build AI · N+1, and then have N+1 improve that recipe again. Only then would the loop be truly recursive. If that loop ever closed, it could make AI research faster—but that is a possibility, not a forecast.

**DO |** Trace the hypothetical path, then follow the return cable to **N+1 REPEATS IT · not demonstrated**.

**NOTE |** Full RSI has not been demonstrated and is not inevitable.

**TRANSITION |** These terms differ, but each appeared when AI met a different hard problem.

**CLICK |** Do not click **Replay RSI** unless you want to restart; use the global next-slide arrow → **Closing**.

---

## Closing

**LOOK |** **SIX TERMS · THREE SHIFTS**: bigger to smarter, answers to actions, shipping to learning.

**SAY |** MoE and distillation use capability more efficiently. World models and VLA move AI from answers toward prediction and action, while FDE and RSI explore tighter learning loops. Together, the six terms show that AI is changing in more ways than simply becoming bigger.

**DO |** Move once from left to right across the three columns, then finish on the summary line.

**CLICK |** None.
