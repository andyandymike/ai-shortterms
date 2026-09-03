# Beyond Bigger Models — Atlas Simple English Talk Track

> Use Atlas only. Follow LOOK → SAY → DO → CLICK. The main demo button moves one step. The arrow at the bottom right moves to the next slide.

## Opening

**LOOK |** The many short AI names settle into **FOUR TERMS · TWO SHIFTS**.

**SAY |** AI changes fast. Its list of new terms can feel even faster. It is almost as if the team that names AI never takes a day off. Today, we will not chase every new word. We will use four terms to see two big changes. First, models are getting smarter about how they use their power. Second, AI is moving from giving answers to making plans and taking action.

**DO |** Wait for the short names to stop, then move down the two lines.

**CLICK |** Global next-slide arrow → **MoE**.

---

## MoE

**LEAD-IN |** A model can be very large, but it does not need to use every part every time.

### M1 — Name

**LOOK |** **MoE** opens into **Mixture of Experts**.

**SAY |** MoE means **Mixture of Experts**. Here, an expert is not a whole chatbot. It is one part inside the model that does some of the work. First, let us see how a regular dense model works.

**DO |** Point to **MoE**, then follow the letters as the full name appears.

**CLICK |** **Show the dense model**.

### M2 — Dense

**LOOK |** One yellow token becomes a work ticket, and the whole model lights up.

**SAY |** A language model keeps guessing the next small piece of text, called a token. Think of the yellow token as a work ticket, and the model as a company. In a dense model, every part joins every task. It is like asking the whole company to handle one small ticket.

**DO |** Follow the token to the work ticket, then point across all the lit windows.

**CLICK |** **Add more capacity**.

### M3 — Cost

**LOOK |** The building grows. The work ticket stays the same, but the bill goes up.

**SAY |** We make the company bigger so it can do more. But now every small ticket uses every new floor. The model can do more, but each task also costs more.

**DO |** Point to the work ticket, then follow the growing building and bill.

**CLICK |** **Switch to MoE**.

### M4 — Route

**LOOK |** The large building stays, but only **8 of 256** windows light up.

**SAY |** MoE keeps the big company. It adds a router, like a person who sends work to the right team. For this token, the router chooses 8 out of 256 expert parts. Only those eight teams work on this task.

**DO |** Point to the whole building, then the eight red windows and the grey windows.

**CLICK |** **Open the selected experts**.

### M5 — Run

**LOOK |** One chosen office shows **task in → compute → note out**. The other offices wait.

**SAY |** When we say the model “turns on eight experts,” this is what we mean. These eight parts get the task and do the math. The other parts wait. Each expert helps with one small step. It does not answer the whole question by itself.

**DO |** Follow the ticket into the office and the note coming out. Point to the waiting offices, then watch one full round.

**CLICK |** **Combine their outputs**.

### M6 — Combine

**LOOK |** Eight small results flow into **8 → 1**, with **8 called in / 248 quiet**.

**SAY |** The model joins the eight small results into one result. Then it sends that result to the next part of the model. The model still has 256 experts in total, but this token only uses eight of them. That is the main idea: a big model, with less work each time.

**DO |** Follow the small results into **8 → 1**, then point to **8 called in / 248 quiet**.

**CLICK |** **Show real models**.

### M7 — Examples

**LOOK |** DeepSeek-V3, Qwen3 MoE, and Kimi K2 show **total → used for each token**.

**SAY |** These are real MoE models. DeepSeek-V3 has 671 billion parameters—the numbers inside a model—but it uses about 37 billion for each token. Qwen3 MoE and Kimi K2 use the same idea. You do not need to remember the numbers. Just remember this: the model is very large, but it only uses part of itself each time.

**DO |** Read the DeepSeek-V3 row once, then point down the repeated **total → active** pattern.

**TRANSITION |** MoE keeps the big company and calls only a small team. But what if the big company is still too expensive?

**CLICK |** Use **Replay MoE** only to start again. Otherwise, use the bottom-right arrow → **Distillation**.

---

## Knowledge Distillation

**LEAD-IN |** Use a big model to teach a much smaller model.

### D1 — Name

**LOOK |** A **large teacher** makes lessons for a separate **small student**. Later, the student works alone.

**SAY |** Knowledge Distillation does not turn one big model file into a smaller file. A strong big model becomes the teacher. It makes lessons for a separate small model. Think of a senior support worker teaching a new worker. After training, the small model works by itself.

**DO |** Follow **LARGE TEACHER → LESSONS → SMALL STUDENT**, then stop at **runs alone**.

**CLICK |** **Why distill?**

### D2 — Why

**LOOK |** **High capability** also brings **high cost / call**, so the teacher cannot go everywhere.

**SAY |** Why not use the teacher every time? A real product must think about cost, small devices, keeping data private, and lots of users. With distillation, we use the costly teacher during training. Then we use the smaller student in the real product.

**DO |** Move from **HIGH CAPABILITY** to **HIGH COST / CALL**, then point to the four places on the right.

**CLICK |** **Try the student**.

### D3 — Miss

**LOOK |** The student reads “Fantastic” and “Love” as **PRAISE**, but the customer means the opposite.

**SAY |** The student sees the happy words “Fantastic” and “Love,” so it thinks this is praise. But “again” and “client demo” tell us the customer means the opposite. The student knows the words, but it misses the real meaning.

**DO |** Point to **Fantastic · Love**, then **again · client demo**, and end at **WRONG**.

**NOTE |** We made up this ticket for the demo.

**CLICK |** **Ask the teacher**.

### D4 — Lesson

**LOOK |** The teacher turns the mixed message into **INTENT · WHY · ACTION**.

**SAY |** The teacher does not only say, “This is a complaint.” It explains the real meaning. It points to the words that give us the clue. It also says what the support team should do next. The student learns how to read the message, not just the final answer.

**DO |** Follow the mixed clues, then move down **INTENT → WHY → ACTION**.

**CLICK |** **Train on many**.

### D5 — Train

**LOOK |** Many lessons turn each wrong guess into a **small update** and a better rule.

**SAY |** One lesson is not enough. The student makes a guess. It checks that guess against the teacher’s lesson. When they are different, the student changes a little. After many different examples, it learns a better rule: do not look at one happy word; read the whole message.

**DO |** Point across the lessons, follow **PRAISE ≠ COMPLAINT** to **SMALL UPDATE**, then compare **BEFORE** and **AFTER MANY LESSONS**.

**CLICK |** **Remove the teacher**.

### D6 — Alone

**LOOK |** **TEACHER — OFFLINE**; a new ticket arrives and the **SMALL STUDENT — RUNS ALONE**.

**SAY |** Now the teacher leaves. The new ticket has new words and a new problem. The student still sees that it is a complaint. It answers by itself. If the product asked the teacher every time, two models would still be working together. The small model would not work alone.

**DO |** Point to **TEACHER — OFFLINE**, then the new message, and end at **RUNS ALONE** and **CORRECT READ**.

**CLICK |** **Show real models**.

### D7 — Examples

**LOOK |** Apple, Gemma 2, and DeepSeek-R1 show three real examples.

**SAY |** Here are three real examples. Apple used distillation to train a small model that runs on a device. Google used a 27B teacher to train Gemma 2 models with 2B and 9B parameters. DeepSeek used thinking examples from R1 to train smaller models. The shared idea is simple: the teacher helps during training, then the student works alone.

**DO |** Read the Apple row once, then point across **on-device · open + edge · reasoning**.

**NOTE |** The three teams use different methods. Do not compare them as one simple size rule.

**TRANSITION |** Now AI wants to act. How can it think about the result before it moves?

**CLICK |** Use **Replay Distill** only to start again. Otherwise, use the bottom-right arrow → **World Model**.

---

## World Model

**LEAD-IN |** Now we move from seeing what is here to guessing what an action may do.

### W1 — Name

**LOOK |** **NEXT WORD → WHAT IS HERE → WHAT HAPPENS NEXT**.

**SAY |** World Model is not a short name. A language model guesses the next piece of text. A vision model sees what is in front of it. A world model asks a simple question: “If I do this, what may happen next?” Think of it as a small practice world inside the AI.

**DO |** Move across the three columns, then trace **NOW + ACTION → NEXT**.

**CLICK |** **Why predict?**

### W2 — Why

**LOOK |** The model sees the scene, but the three possible moves still end in question marks.

**SAY |** Seeing the curb is useful. But a robot that moves must also ask what each move may do. Going left may take a longer way around. Going straight may get closer to the goal. Going right may hit the curb. Seeing the scene and guessing the result of an action are two different jobs.

**DO |** Point to the three objects, then move past the question mark to the three possible moves.

**NOTE |** This does not mean models that use text, pictures, and sound cannot think.

**CLICK |** **Watch it learn**.

### W3 — Learn

**LOOK |** **01 WATCH → 02 GUESS → 03 CHECK → 04 ADJUST**.

**SAY |** We show the model many recordings. Each one shows the scene, the action, and what happened next. During training, we hide the ending and ask the model to guess. Then we show what really happened and let it learn from the difference. After many rounds, it gets better at guessing change.

**DO |** Follow the four numbered steps, then point to **many real sequences**.

**CLICK |** **Try three actions**.

### W4 — Futures

**LOOK |** The real robot stays at **SAME START** while three possible futures move.

**SAY |** Now the model can start from one scene, try three actions in its head, and picture three results. The real robot has not moved. Only the possible futures move. The model can make some mistakes in its practice world before it chooses a move in the real world.

**DO |** Stop at **REALITY HAS NOT MOVED**, then point across the three results.

**CLICK |** **Plan before moving**.

### W5 — Plan

**LOOK |** The model checks routes **A, B, C** and picks **B**. The real robot makes only one move.

**SAY |** The model can think a few moves ahead and make several routes. It checks which route is safer and closer to the goal. Then it does only the first move from the best route. After that, it looks again and makes a new plan—like GPS after each turn.

**DO |** Compare **A, B, C**, stop at **SELECT B**, then point to **EXECUTE IN REALITY — ONE ACTION**.

**CLICK |** **What does it build?**

### W6 — Form

**LOOK |** **VISIBLE FUTURE** and **HIDDEN FUTURE** help answer the same question.

**SAY |** Some world models make a future we can see as pictures or video. Others keep the future hidden and save only the facts they need. If the robot needs to know which move is safe, it does not need a pretty sky. It only needs the right facts to choose.

**DO |** Compare **VISIBLE FUTURE** with **HIDDEN FUTURE**, then point to the question below.

**CLICK |** **Show real systems**.

### W7 — Examples

**LOOK |** **Genie 3** shows a future world. **V-JEPA 2** keeps its future guess hidden.

**SAY |** Genie 3 shows a future world that people can see and use. V-JEPA 2 does not make a video. It keeps its guess hidden and uses it to compare robot actions. They look different, but both help a system try, check, and plan before it moves for real.

**DO |** Let the Genie 3 video play, compare **VISIBLE WORLD** with **HIDDEN WORLD**, then point to the three uses.

**NOTE |** These are research systems. They do not copy every rule of the real world.

**TRANSITION |** World Model asks, “What may happen next?” VLA asks, “What should this body do now?”

**CLICK |** Use **Replay World Model** only to start again. Otherwise, use the bottom-right arrow → **VLA**.

---

## VLA

**LEAD-IN |** Now AI turns a guess about the future into a real move.

### V1 — Name

**LOOK |** **VISION → LANGUAGE → ACTION**, joined as **V + L → VLA → A**.

**SAY |** VLA means **Vision-Language-Action**. Vision tells the robot what is there. Language tells it what we want. Action is the move the body should make now.

**DO |** Move across **VISION → LANGUAGE → ACTION**, then trace the formula below.

**CLICK |** **Why is that hard?**

### V2 — Why

**LOOK |** One sentence leaves the body asking **which object, what path, how much force, and when to stop**.

**SAY |** The goal is clear: “Put the orange block in the tray.” But the sentence does not tell the arm how to do it. The robot must find the right block and move around the object blocking the way. It must hold the block with the right force and know when to let go. Language says what we want. The body still has to work out how.

**DO |** Start at **1 SENTENCE**, move through **WHICH? → HOW? → ENOUGH?**, and end at **WHAT versus HOW**.

**CLICK |** **Unpack the task**.

### V3 — Steps

**LOOK |** One goal becomes **FIND → REACH → ALIGN → GRIP → LIFT → PLACE**.

**SAY |** When a body follows that sentence, one goal becomes many small moves. The robot finds the block and reaches around the object. It lines up its hand, grips the block, lifts it, and puts it in the tray.

**DO |** Follow the six numbered moves, then end at **1 GOAL → 6 COORDINATED MOVES**.

**CLICK |** **How does it learn?**

### V4 — Learn

**LOOK |** A video of a person moving the robot becomes **WATCH → HIDE → GUESS → CHECK → ADJUST**.

**SAY |** First, people control robots while we record them doing tasks. During training, we show the scene and the goal, but hide the person’s next move. The model guesses. Then we show the real move, check the difference, and let it learn. Many examples help it choose a better next move.

**DO |** Follow the five numbered steps, then point to **many recorded robot demonstrations**.

**CLICK |** **Let reality answer**.

### V5 — Feedback

**LOOK |** The block slips. The next camera picture shows it, and the arm moves left to grip again.

**SAY |** The robot should not decide on one long move and never look again. Here, the block slips. The next camera picture shows the problem, so the arm changes its next move. The pattern is simple: move a little, look again, and fix.

**DO |** Follow **THE BLOCK SLIPPED → REALITY ANSWERS → SHIFT LEFT · RE-GRIP**, then point to the loop below.

**NOTE |** We made this scene for the web demo. It is not real robot video.

**CLICK |** **Why is this harder than chat?**

### V6 — Hard

**LOOK |** **BAD WORD — UNDO** versus **BAD MOTION — CONTACT ALREADY HAPPENED**.

**SAY |** If a chatbot writes a bad word, we can delete it and try again. If a robot makes a bad move, it has already touched the real world. A VLA must understand where things are, when to move, and how much force to use. Real robot training is also slow and expensive. And the robot must stay safe.

**DO |** Compare the two failures, then point to the three hard parts below.

**CLICK |** **See a real system**.

### V7 — Example

**LOOK |** Official **Unitree WVLA 2.0** video, shown as three short excerpts.

**SAY |** This is an official Unitree WVLA 2.0 demo. The full video is over three minutes. Unitree says the full demo was filmed in one take. The robot does many tasks, works on its own, and faces strong outside interference. We kept three short parts. It picks up an item, keeps working after a person pushes it, and then handles a different item. The point is not speed. The point is that one system turns the scene into a series of robot moves.

**DO |** Let the 23-second clip play once. Watch the table task, then the push, and finish at **VISION → LANGUAGE → ACTION** and the official description.

**NOTE |** This is an edited official demo, not an independent test. It does not prove the system works everywhere. The public video does not clearly show the language command.

**[Sources] |** Unitree Robotics, [Conference Room Mess Cleanup Test: Unitree WVLA 2.0 Model](https://www.youtube.com/watch?v=zqqIpVsMYkE), 2026-05-25.

**TRANSITION |** These four ideas make one clear story. First, use model power with less waste. Then, move from seeing to planning and action.

**CLICK |** Use **Replay VLA** only to start again. Otherwise, use the bottom-right arrow → **Closing**.

---

<details>
<summary><strong>Hidden backup third part: FDE · RSI</strong></summary>

> This part is not in the current 30-minute talk. The script and demos are still here.

## FDE

**LEAD-IN |** The next term is not a model. It is a job that helps AI work inside a real company. We will use a made-up **46 → blank** story.

### F1 — Name

**LOOK |** **AI PRODUCT → FDE → LIVE COMPANY**, with **JOB · NOT A MODEL**.

**SAY |** FDE means **Forward Deployed Engineer**. It is a job, not an AI model. Think of a smart machine arriving at a factory. Every factory has different plugs, doors, and ways of working. The FDE helps the machine fit in and actually work.

**DO |** Move from **AI PRODUCT** through **FDE** to **LIVE COMPANY**, then stop at **JOB · NOT A MODEL**.

**CLICK |** **Why does AI need one?**

### F2 — Why

**LOOK |** A good AI answer hits a **REALITY WALL** and never enters the real work process.

**SAY |** In a demo, we give AI one clean file and get a good answer. In a real company, the AI needs access to the right system. The answer may also need a manager’s OK. It must follow the right work steps and reach a person in charge. The model got the answer right, but the company still cannot use it.

**DO |** Follow **ONE FILE → AI → GOOD ANSWER**, let it hit **REALITY WALL**, then end at **ANSWER NOT IN THE WORKFLOW**.

**CLICK |** **Enter the real workflow**.

### F3 — Workflow

**LOOK |** **EMAIL 46 → SPREADSHEET 46 → AI 46 ✓ → APPROVAL → LIVE SYSTEM BLANK**.

**SAY |** The email says 46. The spreadsheet says 46. The AI says 46. A person approves it. But the final system is blank. So an “AI failure” may not be the model’s fault. The value may get lost while moving from one system to another. The FDE follows 46 from step to step to find where it went missing.

**DO |** Follow all five stops, then move down to **SOURCE 46 ≠ PRODUCTION BLANK**.

**CLICK |** **Follow one failure**.

### F4 — Evidence

**LOOK |** “The AI got it wrong” becomes **SOURCE 46 + OUTPUT BLANK + EXPERT 46 ✓**.

**SAY |** “The AI got it wrong” does not tell the product team what to fix. The FDE saves the source and the output we got. A person who knows the job gives the right answer. Now the team has a clear case it can run again and check.

**DO |** Start with the complaint, then join the three facts into **REPRODUCIBLE CASE**.

**CLICK |** **Who owns what?**

### F5 — Roles

**LOOK |** Product Engineer, FDE, and Domain Expert have three different **FINISH LINE** goals.

**SAY |** An FDE is not just a product engineer with a bigger title. Product engineers build things many customers can use. People who know the business say what a correct result looks like. The FDE connects both sides until the real work process runs well and people use it. They are a team, not a ranking.

**DO |** Compare the three goals, then follow **DISCOVER → CONNECT → DEPLOY → ADOPT**.

**CLICK |** **Make the lesson reusable**.

### F6 — Reuse

**LOOK |** **46 → BLANK** becomes **CASE → TEST → FIX**, and a later **52 → 52 ✓** succeeds.

**SAY |** If the FDE types 46 into the empty box every time, that person becomes a human patch. A better fix is to save the failure as a test and fix the product. Then, when a similar case uses 52, the system can handle it by itself. The lesson stays after the FDE leaves.

**DO |** Follow **46 → BLANK** into **CASE → TEST → FIX**, then move to **52 → 52 ✓**.

**NOTE |** The number 52 is only an example.

**CLICK |** **See a real deployment**.

### F7 — Example

**LOOK |** A Tax AI test shows **7,000 returns** and **25% → 86%** in six weeks.

**SAY |** OpenAI FDEs and researchers, Thrive engineers, and Crete tax experts worked together on Tax AI. The test handled 7,000 tax returns. At first, 25% of returns had at least 75% of their fields right. Six weeks later, that number was 86%. The point is that tax experts, real data, tests, and engineering all worked together.

**DO |** Read **7,000** and **25% → 86%**, then point across **PRACTITIONERS → FIELD DATA → EVALS → ENGINEERING**.

**NOTE |** This is a team result. One FDE did not do it alone.

**TRANSITION |** Today, people close this learning loop. In the future, how much of it could AI close by itself?

**CLICK |** Use **Replay FDE** only to start again. Otherwise, use the bottom-right arrow → **RSI**.

---

## RSI

**LEAD-IN |** The last term asks a bigger question: can AI help build a better next AI?

### R1 — Name · Meet RSI

**LOOK |** **R · S · I** opens beside **AI · N → RECIPE → AI · N+1**. A question mark sits on the way back.

**SAY |** RSI means **Recursive Self-Improvement**. The full name sounds hard, so think of a recipe for making AI. One AI helps improve that recipe. We use the new recipe to build the next AI. “Recursive” means the next AI can improve the recipe again.

**DO |** Point to the full name, then trace **AI · N → RECIPE → AI · N+1**.

**CLICK |** **Show what must change**.

### R2 — Difference · Answer ≠ Recipe

**LOOK |** One answer changes from **WRONG** to **FIXED**, but **BUILD RECIPE · STILL v1**.

**SAY |** AI can fix one wrong answer, but that is not RSI. It is like fixing one meal but leaving the recipe unchanged. Full self-improvement must improve the way we build the next AI.

**DO |** Point to the fixed answer, the large **≠**, and then the unchanged recipe.

**CLICK |** **Run today's loop**.

### R3 — Method · Today’s Loop

**LOOK |** People set **GOAL** and **TEST**. AI tries A, B, and C, then keeps the winner that passes the test.

**SAY |** Today, people set the goal and the test. AI tries versions A, B, and C. The test checks each one, and the best correct version starts the next round. A fast answer still loses if it is wrong. Then the process starts again.

**DO |** Point to **GOAL**, **TEST**, the X on B, winner C, and **REPEAT**.

**CLICK |** **See a real result**.

### R4 — Result · Real Result

**LOOK |** **ONE REPEATED MATH ROUTINE · +23%** reaches **WHOLE GEMINI TRAINING RUN · −1% TIME**.

**SAY |** Google DeepMind says AlphaEvolve made one math step used many times in Gemini training 23 percent faster. This cut the full training time by about 1 percent. So AI can already help improve one small part of how we build AI.

**DO |** Point to **+23%**, then follow it to **−1% TIME**.

**NOTE |** This is a small, limited AI-for-AI result. It is not full RSI.

**CLICK |** **Find the human boundary**.

### R5 — Boundary · Human Boundary

**LOOK |** AI tries ideas inside a box. People still hold **DIRECTION · TEST · GO / STOP**.

**SAY |** The AI can search inside the box, but people still make three big choices. They choose what to improve, what counts as better, and whether to use the result. So today’s process still has clear human limits.

**DO |** Point to the three human choices, then the AI search area inside the box.

**CLICK |** **Test full RSI**.

### R6 — Full RSI · Full RSI Test

**LOOK |** **AI · N → recipe v2 → AI · N+1**, but the line back is not complete.

**SAY |** For full RSI, AI · N would improve the recipe. That recipe would build AI · N+1. Then N+1 would have to improve the recipe again. Only then would the loop truly repeat by itself. If that ever happens, AI research could speed up. But we do not know if it will happen.

**DO |** Follow the possible path, then follow the line back to **N+1 REPEATS IT · not demonstrated**.

**NOTE |** Full RSI has not been shown. It may never happen.

**TRANSITION |** These terms look different, but each one tries to solve a new problem for AI.

**CLICK |** Use **Replay RSI** only to start again. Otherwise, use the bottom-right arrow → **Closing**.

---

</details>

## Closing

**LOOK |** **FOUR TERMS · TWO SHIFTS**: bigger to smarter, answers to actions.

**SAY |** MoE and distillation show how models can do more with less work. World models and VLA move AI from seeing what is there to making plans and taking action. Together, these four ideas show that AI is not only getting bigger. It is also learning to use its power better and do more in the real world.

**DO |** Move from left to right across the two columns, then end at **BIGGER → SMARTER** and **ANSWERS → ACTIONS**.

**CLICK |** None.
