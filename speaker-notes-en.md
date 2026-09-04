# Beyond Bigger Models — Atlas English Speaker Notes

> Use Atlas only. Follow LOOK → SAY → DO → TRANSITION → CLICK. Say the transition before clicking to the next step. The internal button moves the demo forward; the bottom-right arrow changes the slide.

Read SAY and TRANSITION as the main talk. Add EXTRA (OPTIONAL) after SAY if time allows; skipping it does not break the story. LOOK, DO, CLICK, NOTE, and sources are presenter cues, not spoken lines. The Chinese and English versions follow the same points in the same order. Keep terms such as context and parameters; explain them in short, everyday sentences.

## O · Opening

**LOOK |** **Four terms. Two shifts.**

**SAY |** AI changes fast, but sometimes its list of new terms changes even faster than the technology itself. It’s almost as if AI’s “naming team” never takes a day off. Today, we won’t chase every hot topic. We’ll use four terms to see two shifts: how to use model capabilities more wisely, and how AI moves from answering questions to prediction and action.

**DO |** Wait for the animation of short names to settle, then move down the two tracks.

**CLICK |** No internal button needed. When ready, use the bottom-right next-slide arrow → **MoE**.

---

## MoE

**LEAD-IN |** Let’s start with an idea that may sound surprising: a model can be very large without using all its capabilities every time.

### M1 · Name

**LOOK |** **MoE → Mixture of Experts**

**SAY |** Our first term is **MoE**, short for **Mixture of Experts**. Here, an **expert** is not a whole chatbot. It’s a block inside the model that does some of the computation.

**DO |** Point to **MoE**, then follow the three letters as the full name appears.

**NOTE |** Experts are not separate personalities, each answering the whole question.

**TRANSITION |** Why do we need so many experts? Let’s first look at a dense model.

**CLICK |** **Show the dense model**

### M2 · Dense

**LOOK |** The yellow work ticket enters the building, and all the windows light up.

**SAY |** A language model keeps predicting the next **token**, a small piece of text. The full sentence at the top is the **context**. The yellow word **because** is the current token being processed. Here, we show it as a work ticket and the model as a company. In a **dense model**, the same full compute block works on every ticket, so all the windows light up. It’s like calling in the whole company, even for a tiny task.

**DO |** Point from the highlighted token to the work ticket, then across all the lit windows.

**TRANSITION |** What happens to the cost as this company gets bigger?

**CLICK |** **Add more capacity**

### M3 · Cost

**LOOK |** The ticket stays the same size, while more offices appear on the right: **CAPACITY ↑ / WORK / TOKEN ↑**.

**SAY |** To give the model more capacity, we add offices to the company. Look at the two arrows on the right: one shows total capacity, and the other shows computation per token. The ticket hasn’t grown. But in a dense model, the added computation takes part every time, so both go up. The company gets bigger, and each small ticket takes more computation.

**DO |** Point to the unchanged ticket, then the new offices on the right, and finally the two upward arrows.

**TRANSITION |** Can we keep the big company’s skills without calling everyone in each time?

**CLICK |** **Switch to MoE**

### M4 · Route

**LOOK |** Only **8** of the **256** offices turn red.

**SAY |** MoE doesn’t shrink the company. It adds a **router**, like a person who assigns the work. In this example, the router uses information about the current token to choose 8 of the 256 available experts. The company stays large, but this ticket goes only to those few selected teams.

**DO |** Point to the whole building, then compare the eight red windows with the grey ones.

**TRANSITION |** We’ve picked eight experts. Let’s see what they actually do.

**CLICK |** **Open the selected experts**

### M5 · Run

**LOOK |** **TASK IN → WORK → NOTE OUT**

**SAY |** “Activating eight experts” means those eight teams get the task and start computing. The other experts don’t work this time. They aren’t each answering the whole question. They each process the same ticket during this small step inside the model. Here, we zoom into one office: the task goes in, computation happens, and a result comes out.

**DO |** Follow the ticket into the office, then follow the output note as it comes out.

**TRANSITION |** Each expert now has an output. How do we combine them into one result?

**CLICK |** After one full cycle, click **Combine their outputs**

### M6 · Combine

**LOOK |** **8 → 1; 8 CALLED IN / 248 QUIET**

**SAY |** Finally, the eight expert outputs combine into one result, which goes to the next layer. This layer keeps the total capacity of 256 available experts, but this token runs only eight of them. That’s the main benefit: large capacity, with a limited amount of expert computation each time.

**DO |** Follow the eight outputs into **8 → 1**, then point to the eight working experts and the 248 quiet ones.

**TRANSITION |** Real models already use this idea. Let’s look at a few.

**CLICK |** **Show real models**

### M7 · Examples

**LOOK |** **DeepSeek-V3: 671B total → 37B active / token**

**SAY |** These are real models that use the MoE architecture. DeepSeek-V3 has 671 billion **parameters**, but about 37 billion are active for each token. Qwen3 MoE and Kimi K2 use a similar idea. You don’t need to remember the numbers. Just notice the pattern: a large total capacity, with only part of it running each time.

**DO |** Read the first row, then move down the three matching **total → active** patterns.

**TRANSITION |** MoE keeps the big company but calls in only a small team each time. If the big company itself is still too costly to deploy, we need a truly small model to learn the key skills.

**CLICK |** Use the **bottom-right next-slide arrow** → **Distillation**. Click **Replay MoE** only to replay this concept.

---

## Distillation

**LEAD-IN |** That’s knowledge distillation: use the costly capabilities during training, then let a smaller model work on its own.

### D1 · Name

**LOOK |** **LARGE TEACHER → LESSONS → SMALL STUDENT**

**SAY |** Our second term is **Knowledge Distillation**. A strong, large model acts as the **teacher model**. It prepares lessons to train a separate, smaller **student model**. Think of a senior support worker teaching a new colleague. The new colleague is the one who later handles the calls.

**DO |** Follow **TEACHER → LESSONS → STUDENT**, then stop at **runs alone**.

**NOTE |** Distillation does not just squeeze the same large model into a smaller file.

**TRANSITION |** Why add this training step instead of just using the teacher?

**CLICK |** **Why distill?**

### D2 · Why

**LOOK |** **HIGH CAPABILITY / HIGH COST** stand in front of the deployment targets.

**SAY |** Why not let the teacher answer everywhere? A product needs more than good answers. It also has to consider cost, devices, privacy, and request volume. Distillation keeps the costly teacher in the training stage. We then deploy the easier-to-run student on phones, offline devices, local systems, or services with many requests.

**DO |** Move from capability and cost to the deployment limits in the middle, then across the four targets.

**TRANSITION |** Let’s see how the student reads a support ticket before it learns this skill.

**CLICK |** **Try the student**

### D3 · Miss

**LOOK |** **Fantastic / Love → PRAISE → WRONG**

**SAY |** First, look at this demo ticket. The customer says, “Fantastic. The VPN disconnected again during the client demo. Love this update.” The connection failed again, so the positive words are actually sarcasm. But the student only notices **Fantastic** and **Love**, labels it as praise, and replies, “Glad to hear it!” It knows the words but misses the **context** and the real **intent**.

**DO |** Point to the full ticket and the repeated VPN failure, then the positive words, and finally the student’s wrong reply and **WRONG**.

**NOTE |** This ticket is a demo example, not a real training sample from a public dataset.

**TRANSITION |** Now we need the teacher to explain what the student missed.

**CLICK |** **Ask the teacher**

### D4 · Lesson

**LOOK |** **INTENT → WHY → ACTION**

**SAY |** The teacher turns this ticket into a lesson with three parts. First, the **intent**: the customer is complaining, not giving praise. Second, the reason: positive words describe a repeated failure. That contradiction points to sarcasm. Third, the action: apologize, send the VPN issue to the right team, and ask for the session ID to help check the problem. The student needs to learn how to judge the message and respond, not just the label “complaint.”

**DO |** Point from the conflicting clues to **SARCASM**, then move down the three parts of the lesson.

**TRANSITION |** We have a lesson, but one isn’t enough. Now we need to train on many.

**CLICK |** **Train on many**

### D5 · Train

**LOOK |** **BEFORE: positive word → praise; AFTER: context → contradiction → intent**

**SAY |** In each training step, we compare the student’s guess with the teacher’s lesson. If they differ, we make a small change to the student’s **parameters**. After many different examples, look at the change on the right. Before, positive words meant praise. Now, it checks the **context**, finds the **contradiction** between positive words and a failure, and works out the real **intent**. Those are the three steps on screen: context, contradiction, intent.

**DO |** Move across the lessons, then compare **BEFORE** with **AFTER MANY LESSONS**.

**TRANSITION |** To see what the student has learned, let’s take the teacher away.

**CLICK |** **Remove the teacher**

### D6 · Alone

**LOOK |** **TEACHER OFFLINE / SMALL STUDENT RUNS ALONE**

**SAY |** Now the teacher is offline, and the student gets a new ticket: “Wonderful—my reset link arrived after it had already expired.” This time, the problem isn’t the VPN. The student still recognizes the complaint and replies that it will send a new link and check the delay. It hasn’t just memorized the previous ticket. The learned behavior stays in its own **parameters**, so it can work alone after deployment.

**DO |** Move from the offline teacher to the new message, then end at the student running alone and its correct answer.

**NOTE |** If every live request still calls the teacher, the two models are working in a chain. That is not the deployment setup shown here.

**TRANSITION |** Real models use this approach too: learn from the teacher during training, then run alone after deployment.

**CLICK |** **Show real models**

### D7 · Examples

**LOOK |** **Apple Foundation Model → ~3B on-device**

**SAY |** In practice, Apple used knowledge distillation to train its on-device foundation model with about three billion parameters. Google used a 27B teacher to train the 2B and 9B Gemma 2 models. DeepSeek used **reasoning data** generated by R1 to train smaller models. The methods aren’t exactly the same, but they share one idea: the teacher teaches before deployment, and the student serves users on its own afterward.

**DO |** Read the Apple row, then move across the three goals: **on-device, open + edge, reasoning**.

**NOTE |** The three arrows do not show the same kind of compression ratio.

**TRANSITION |** The first two terms ask how we can make AI more affordable. Next, can AI imagine the result before it acts?

**CLICK |** Use the **bottom-right next-slide arrow** → **World Model**. Click **Replay Distill** only to replay this concept.

---

## World Model

**LEAD-IN |** If AI is going to work in the real world, it can’t just recognize what’s in front of it. It also needs to predict what happens after an action.

### W1 · Name

**LOOK |** **NEXT WORD → WHAT IS HERE → WHAT HAPPENS NEXT**

**SAY |** Our third term is **World Model**. First, a quick guide to the picture: the red diamond is the robot, the blue area is the goal, and the red-and-white strip is the curb. On the left, an **LLM, or large language model**, predicts the next piece of text. In the middle, a vision model identifies what is there. On the right, a world model predicts how the scene changes after an action. Think of it as a simple simulator inside the AI.

**DO |** Move across the three columns from left to right, then follow **NOW + ACTION → NEXT**.

**TRANSITION |** Why isn’t seeing the scene enough? Let’s get the robot ready to move.

**CLICK |** **Why predict?**

### W2 · Why

**LOOK |** **ROBOT · ROAD · CURB → ? AFTER A MOVE**

**SAY |** On the left, we’ve identified the robot, road, and curb. But look at the right: what happens after turning left, going straight, or turning right? Each one is still a question mark. Knowing what is there doesn’t directly tell us what an action will cause. This page asks: can we predict the result before we act?

**DO |** Point to the objects identified on the left, then move past the question mark to the three actions.

**NOTE |** This does not mean **multimodal models** cannot reason.

**TRANSITION |** To predict these results, the model first needs to learn how things change.

**CLICK |** **Watch it learn**

### W3 · Learn

**LOOK |** **WATCH → GUESS → CHECK → ADJUST**

**SAY |** Here’s one way to train it. The model first sees many real experiences: what it saw, what action was taken, and what happened next. During training, we hide the ending and let the model predict it. Then we reveal the real result, compare the difference, and make a small update. After many rounds, it gets better at predicting how things change.

**EXTRA (OPTIONAL) |** There’s more than one way to train a world model, and the data doesn’t have to come from robots. Some models first learn how objects and scenes change by watching lots of videos. Others train on actions paired with later observations. For example, **V-JEPA 2** learns from video first, then adds robot interaction data to predict the results of specific actions.

**DO |** Follow the four numbered steps once, then stop at **many real sequences**.

**NOTE |** This is a simplified training flow. V-JEPA 2 uses video pre-training and later action-conditioned training as two stages. Don’t suggest that ordinary video already includes robot control commands.

**[Sources] |** Meta AI, [V-JEPA 2: video pre-training and action-conditioned training](https://ai.meta.com/blog/v-jepa-2-world-model-benchmarks/), 2025-06-11.

**TRANSITION |** Once it learns, we can try different actions from the same starting point.

**CLICK |** **Try three actions**

### W4 · Futures

**LOOK |** **SAME START → THREE POSSIBLE FUTURES · t+1; NO ROUTE CHOSEN**.

**SAY |** On the left, we have the same starting point. The real robot hasn’t moved. The three **futures** on the right are not three steps in a row. They are three possible results at the same next moment: turn left and stay safe, but move away from the goal; go straight and stay safe while getting closer to the blue goal; turn right and hit the curb. This is **prediction**: what might happen after each **action**. We haven’t chosen a route yet.

**DO |** Pause at **REALITY HAS NOT MOVED**. Point to each action, its result, and the same **t+1** label. End at **NO ROUTE CHOSEN**.

**NOTE |** This page uses one-step predictions to show action results, but prediction can also cover multiple steps. W4 predicts results; W5 uses predictions and a goal to choose actions.

**TRANSITION |** Knowing what each action might do is not the same as choosing a route. Next, we connect the predictions and use the goal to choose a route.

**CLICK |** **Plan before moving**

### W5 · Plan

**LOOK |** **t+1 → t+2 → t+3; SELECT B → ONE ACTION → LOOK AGAIN · REPLAN**.

**SAY |** Now we use each predicted result as the starting point for the next step. We look ahead to see where a series of actions might take us. The labels t+1, t+2, and t+3 mark the next few steps. A is safe but takes a longer route. B is safe and more direct. C hits the curb, so we rule it out. Based on safety and progress toward the goal, the **planner** chooses B. But look at **ONE ACTION**: in reality, we take only the highlighted first step, then look again, predict again, and replan. The dashed route ahead can still change. **Planning** means using predictions to choose what to do.

**DO |** Follow **t+1 → t+2 → t+3** along B to show predictions across steps. Compare A, B, and C and point to **SELECT**. End at the first segment, **ONE ACTION**, and **LOOK AGAIN · REPLAN**.

**NOTE |** Three routes and three time steps are a simple illustration, not fixed limits of the algorithm. Executing only the first action and replanning is a common model-predictive-control approach, not a rule for every planning method.

**[Sources] |** Meta AI, [V-JEPA 2: prediction, goal-based planning, and replanning after each action](https://ai.meta.com/blog/v-jepa-2-world-model-benchmarks/), 2025-06-11.

**TRANSITION |** Does “imagining” the future have to mean making a video?

**CLICK |** **What does it build?**

### W6 · Form

**LOOK |** **VISIBLE FUTURE / HIDDEN FUTURE · PREDICTIVE STATE**

**SAY |** A world model doesn’t have to generate video. Some create future scenes that people can watch. Others keep an internal **predictive state**, with information such as position, distance, and progress toward the goal. If that information is enough to judge whether an action is safe and gets closer to the goal, it does the same job.

**DO |** Compare the visible future with the hidden state, then bring both sides down to the shared question at the bottom.

**TRANSITION |** We can find both forms in real research.

**CLICK |** **Show real systems**

### W7 · Examples

**LOOK |** **GENIE 3 / V-JEPA 2**

**SAY |** On the left, **Genie 3** turns a predicted environment into a world people can see and interact with. On the right, **V-JEPA 2** compares robot actions in a hidden **predictive state**. Here, **NO VIDEO NEEDED** doesn’t mean no video training or no cameras. It means the model doesn’t need to generate a future video for us to watch. The forms are different, but both can help a system test possible results before acting. Uses include training agents, running “what if” tests, and planning robot actions.

**EXTRA (OPTIONAL) |** Robots are one typical use, not the only one. Think about physics too. If AI could simulate changes under **physical laws** accurately enough, physicists could test many ideas in a virtual lab first. That could save some costly real experiments. But it wouldn’t mean we no longer need experiments. Key findings would still need checks against real observations or experiments.

**DO |** Let the Genie 3 video play, then move from the visible world to the hidden world and the three uses below.

**NOTE |** These are still research systems, not complete copies of the physical world. The physics example looks ahead to the broader field of learned physical modeling. It does not mean Genie 3 or V-JEPA 2 can already replace physics experiments.

**[Sources] |** Physics modeling: Sanchez-Gonzalez et al., [Learning to Simulate Complex Physics with Graph Networks](https://arxiv.org/abs/2002.09405), ICML 2020. Simulation followed by real-world validation: Google DeepMind, [Accelerating fusion science through learned plasma control](https://deepmind.google/blog/accelerating-fusion-science-through-learned-plasma-control/), 2022-02-16.

**TRANSITION |** World Model asks, “What may happen next?” The next term, VLA, asks, “What should this body do now?”

**CLICK |** Use the **bottom-right next-slide arrow** → **VLA**. Click **Replay World Model** only to replay this concept.

---

## VLA

**LEAD-IN |** Now for another question: how can a robot turn the scene it sees and a goal given in language into physical actions?

### V1 · Name

**LOOK |** **V + L → VLA → A**

**SAY |** VLA means **Vision-Language-Action**. **Vision** answers, “What’s in front of me?” **Language** tells the robot, “This is what I want.” **Action** answers, “What should this body do now?” It turns the scene and the goal into real actions, not just descriptions or answers.

**DO |** Point to **VISION → LANGUAGE → ACTION** in order, then follow the formula at the bottom.

**TRANSITION |** But does a clear goal mean the body knows how to do it?

**CLICK |** **Why is that hard?**

### V2 · Why

**LOOK |** **1 SENTENCE ≠ WHICH? · HOW? · ENOUGH?**

**SAY |** “Put the orange block in the tray” makes the goal clear. But it doesn’t tell the robot arm exactly how to do it. The arm must find the right block, avoid obstacles, choose where to grip and how much force to use, and know when to let go. Language says what we want. The body still has to work out how.

**DO |** Move from the instruction to the three questions, then stop at **WHAT / HOW**.

**TRANSITION |** Let’s break down that sentence to see the actions the body needs to take.

**CLICK |** **Unpack the task**

### V3 · Steps

**LOOK |** **FIND → REACH → ALIGN → GRIP → LIFT → PLACE**

**SAY |** Give that sentence to a body, and it becomes a series of actions. Find the block, reach around the obstacle, line up, grip, lift, and place it in the tray. We can state the goal in one sentence, but the robot needs several actions to work together to finish it.

**DO |** Follow the six actions in order, then stop at **1 GOAL → 6 COORDINATED MOVES**.

**TRANSITION |** The model doesn’t get these actions out of nowhere. It learns from demonstrations.

**CLICK |** **How does it learn?**

### V4 · Learn

**LOOK |** **WATCH → HIDE → GUESS → CHECK → ADJUST**

**SAY |** Here’s one way to learn from demonstrations. First, we record a person controlling the robot. During training, the model sees the scene and the goal, but we hide the person’s next action. Look at the two middle panels: the model guesses “reach right,” but the recorded action is “reach up-right.” Here, **expert** means the person giving the demonstration, not an expert block in MoE. Training uses this difference to adjust the model’s **parameters**. Repeating this with many demonstrations helps it get better at choosing the next action.

**EXTRA (OPTIONAL) |** VLA training can mix several kinds of data, such as videos, real robot demonstrations, and simulated data. Videos help it learn about scenes and tasks. When people control a real robot in a lab, cameras and **sensors** can record images, joint positions, and gripper states together. We also record the action commands. We then match these records with the language goal, so the model can connect understanding the scene with choosing an action.

**DO |** Follow the five numbered steps. Compare **REACH RIGHT / REACH UP-RIGHT**, then point to **ADJUST** and the many demonstrations.

**NOTE |** Different VLA models use different data mixes and sensor setups. More sensors are not automatically better, and ordinary video is not the same as real robot data with action records. These are possible training sources; not every model needs all of them.

**[Sources] |** NVIDIA, [GR00T N1: human video, real robot data, and simulated data](https://research.nvidia.com/publication/2025-03_nvidia-isaac-gr00t-n1-open-foundation-model-humanoid-robots), 2025-03-17. DROID, [Dataset schema: images, joint and gripper states, language instructions, and actions](https://droid-dataset.github.io/droid/the-droid-dataset.html).

**TRANSITION |** But learning from demonstrations doesn’t mean everything will go as planned.

**CLICK |** **Let reality answer**

### V5 · Feedback

**LOOK |** **BLOCK SLIPPED → SHIFT LEFT · RE-GRIP**

**SAY |** Even after learning the actions, the robot can’t just carry on without checking. Here, the arm tries to grip the block, but it slips. The next camera frame shows the failure, so the system changes its next action. It adjusts its position and grips again. The VLA pattern is: act a little, look again, and correct.

**DO |** Follow the slipped block to **REALITY ANSWERS**, then end at the new grip and the loop.

**NOTE |** This is a web illustration, not official robot footage.

**TRANSITION |** Why keep correcting? Because a wrong action has real consequences.

**CLICK |** **Why is this harder than chat?**

### V6 · Hard

**LOOK |** **BAD WORD: UNDO / BAD MOTION: CONTACT ALREADY HAPPENED**

**SAY |** This is why VLA is harder than chat. We can delete a typo and rewrite it. But when a robot arm hits something, the contact has already happened. It also needs to understand **3D space** and control timing and force. And it relies on real robot data that is slow and costly to collect, with safety requirements too.

**DO |** Compare the typo with the wrong action, then move across the three real-world limits below.

**TRANSITION |** With these limits in mind, let’s watch a real demo from Unitree.

**CLICK |** **See a real system**

### V7 · Example

**LOOK |** **UNITREE WVLA 2.0 / THREE SHORT EXCERPTS**

**SAY |** This is an official demo of Unitree’s **WVLA 2.0**. The full video is over three minutes long. Unitree describes it as a one-take demo with multiple tasks, fully autonomous operation, and strong outside interference. We’ve kept three short clips: the robot picks up an item on the table, keeps working after a person pushes it, and then handles a different type of item. The point isn’t speed. It’s that one system can turn the scene into a series of physical actions.

**DO |** Let the 23-second clip play once. Watch the tabletop action, then the push, and finish at **VISION → LANGUAGE → ACTION** and the official description on the right.

**NOTE |** These are edited clips of a successful official demo, not an independent test. They do not prove the system is reliable in every environment. The public video does not clearly show the actual language command used.

**[Sources] |** Unitree Robotics, [Conference Room Mess Cleanup Test: Unitree WVLA 2.0 Model](https://www.youtube.com/watch?v=zqqIpVsMYkE), 2026-05-25.

**TRANSITION |** These four ideas now form one clear story: use model capabilities more efficiently, then move AI from understanding to prediction and action.

**CLICK |** Use the **bottom-right next-slide arrow** → **Closing**. Click **Replay VLA** only to replay this concept.

---

<details>
<summary><strong>Hidden backup third part: FDE · RSI</strong></summary>

> This part is not in the current 30-minute route, but the notes and demos are kept in full.

## FDE

**LEAD-IN |** The next term is not a model. It’s a job that helps AI work inside a real company. We’ll explain it with a made-up **46 → blank** workflow.

### F1 · Name

**LOOK |** **AI PRODUCT → FDE → LIVE COMPANY**

**SAY |** FDE means **Forward Deployed Engineer**. Think of a standard AI product as a smart machine. But every company has different plugs, access controls, and ways of working. The FDE understands both the product and the work on site, and helps the machine connect and actually run.

**DO |** Move from the AI product through FDE to the real company, then stop at **JOB · NOT A MODEL**.

**NOTE |** FDE is a job, not an AI model.

**TRANSITION |** Why does a good model still need this role when it enters a company?

**CLICK |** **Why does AI need one?**

### F2 · Why

**LOOK |** **GOOD ANSWER → REALITY WALL**

**SAY |** In a demo, we give AI a clean file and quickly get a good answer. But in a real company, it must access the right system, get approval, and write the result back into the workflow. Someone also needs to own the result. The model has answered correctly, but the company still can’t use it. This is the reality wall the FDE helps break through.

**DO |** Follow the answer as it hits the wall of access, approval, workflow, and ownership.

**TRANSITION |** Let’s follow one number and see where it gets stuck.

**CLICK |** **Enter the real workflow**

### F3 · Workflow

**LOOK |** **SOURCE 46 ≠ PRODUCTION BLANK**

**SAY |** The email says 46 days. The spreadsheet says 46. The AI correctly reads 46, and approval goes through. But the final system is blank. So an “AI project failure” isn’t always a model failure. The value may have been lost during the final write-back. Like tracking a parcel, the FDE checks each stop to find where 46 went missing.

**DO |** Follow the five steps, then compare the source with the live result.

**TRANSITION |** Once we find the break, we need clear evidence so others can reproduce the problem.

**CLICK |** **Follow one failure**

### F4 · Evidence

**LOOK |** **SOURCE 46 + OUTPUT BLANK + EXPERT 46 ✓**

**SAY |** “The AI got it wrong” is just a complaint. The product team still doesn’t know what to fix. The FDE gathers the source, the actual output, and the correct answer confirmed by a **domain expert**. Now the complaint becomes a case that any engineer can reproduce and check.

**DO |** Start at **NOT REPRODUCIBLE**, then combine the three facts into a case others can reproduce.

**TRANSITION |** Now we have the evidence. Who takes care of each part?

**CLICK |** **Who owns what?**

### F5 · Roles

**LOOK |** **PRODUCT ENGINEER / FDE / DOMAIN EXPERT**

**SAY |** These three roles work on the same problem, but have different finish lines. The **product engineer** builds capabilities that serve many customers. The **domain expert** defines what counts as correct. The **FDE** connects both sides until this company’s real workflow runs properly and people use it. They’re partners, not a ranking.

**DO |** Compare the three **FINISH LINE** goals, then follow **DISCOVER → CONNECT → DEPLOY → ADOPT**.

**TRANSITION |** Once the roles are clear, we need to make sure the lesson lasts.

**CLICK |** **Make the lesson reusable**

### F6 · Reuse

**LOOK |** **46 → BLANK → CASE → TEST → FIX → 52 ✓**

**SAY |** If the FDE fills in 46 by hand every time, they become a permanent human patch. A better result is to turn this failure into a case and a test, then fix it in the product. When a similar case uses 52, the system writes it correctly on its own. The lesson doesn’t disappear when the FDE leaves.

**DO |** Bring the 46 failure into **CASE → TEST → FIX**, then move to the result for 52.

**NOTE |** The number 52 on screen is an illustration to help explain the idea.

**TRANSITION |** This isn’t just an illustration. Let’s look at a real deployment.

**CLICK |** **See a real deployment**

### F7 · Example

**LOOK |** **7,000 RETURNS; 25% → 86%**

**SAY |** Finally, here’s a real deployment: Tax AI. OpenAI FDEs and researchers, Thrive engineers, and Crete tax experts worked together to improve the system. The pilot processed 7,000 tax returns. At launch, only 25% had at least 75% of their fields correct. Six weeks later, that share reached 86%. This shows why real data, people doing the work, evaluations, and engineering need to form an ongoing loop. That’s how a pilot leads to progress we can measure.

**DO |** Read **7,000** and **25% → 86%**, then move across the team loop at the bottom.

**NOTE |** This was not the work of one “hero FDE” acting alone.

**TRANSITION |** FDE shows how people still bring real-world failures back into the product today. The last question is: how much of this improvement loop could AI handle itself in the future?

**CLICK |** Use the **bottom-right next-slide arrow** → **RSI**. Click **Replay FDE** only to replay this concept.

---

## RSI

**LEAD-IN |** We’ve just seen people help AI learn from real work. RSI asks whether AI could go further and help build its own next generation.

### R1 · Name — Meet RSI

**LOOK |** **R · S · I → Recursive Self-Improvement**

**SAY |** RSI means **Recursive Self-Improvement**. Think of the process for building AI as a recipe. This generation of AI helps improve the recipe, and we use it to build the next generation. “Recursive” means the next generation must be able to improve that recipe again.

**DO |** Start at the full name, then follow **AI · N → RECIPE → AI · N+1** to the question mark.

**TRANSITION |** First, fixing one answer is not the same as improving how we build AI.

**CLICK |** **Show what must change**

### R2 · Difference — Answer ≠ Recipe

**LOOK |** **ANSWER FIXED ≠ BUILD RECIPE STILL v1**

**SAY |** Fixing one AI answer is useful, but it isn’t RSI. It’s like fixing one dish while leaving the recipe unchanged. Real self-improvement must leave us with a better method for building the next AI.

**DO |** Point to the fixed answer, then move past **≠** to the unchanged recipe.

**TRANSITION |** Let’s set full RSI aside and look at the improvement loop we can run today.

**CLICK |** **Run today's loop**

### R3 · Method — Today's Loop

**LOOK |** **GOAL + TEST → A / B / C → KEEP C → REPEAT**

**SAY |** Here’s what we can already do today. People set the task and the scoring rules. AI tries many versions, and external tests check them. The winner becomes the starting point for the next round. Even if B is the fastest, it still gets rejected if its result is wrong.

**DO |** Move from **GOAL** and **TEST** to the X on B, then stop at winner C and **REPEAT**.

**TRANSITION |** What real improvements has this kind of loop already made?

**CLICK |** **See a real result**

### R4 · Result — Real Result

**LOOK |** **ONE ROUTINE +23% → WHOLE TRAINING −1% TIME**

**SAY |** AlphaEvolve is a limited example of AI helping improve AI. Google DeepMind reported that it sped up a **matrix multiplication** routine used repeatedly in Gemini training by 23%. That cut the time for the whole training run by about 1%. It shows that AI can already help improve one part of the process for building AI.

**DO |** Point to the local **+23%** gain, then follow it to **−1%** for the whole training run.

**NOTE |** This is one capability that full RSI would need, not proof of full RSI.

**TRANSITION |** But improving one part doesn’t mean AI is in charge of the whole loop.

**CLICK |** **Find the human boundary**

### R5 · Boundary — Human Boundary

**LOOK |** **DIRECTION / TEST / GO · STOP**

**SAY |** Today’s AI still searches inside a box built by people. People decide what to improve, what counts as better, and whether the result can be used. So this is AI-assisted improvement with clear limits, not fully autonomous self-improvement.

**DO |** Point to the three human decisions, then to the AI search area inside the box.

**TRANSITION |** What step is still missing before we can call this full RSI?

**CLICK |** **Test full RSI**

### R6 · Full RSI — Full RSI Test

**LOOK |** **AI · N → RECIPE v2 → AI · N+1 → ?**

**SAY |** Here’s the test for full RSI. AI · N improves the recipe. The new recipe builds AI · N+1, and N+1 can improve the recipe again. Only then is the loop truly recursive. If that loop closes in the future, it could make AI research faster. But that’s a possibility, not a prediction.

**DO |** Follow the full path, then stop at the return link that is still not connected.

**NOTE |** The final link has not been demonstrated, and it is not guaranteed to happen.

**TRANSITION |** These six terms look very different, but each appeared when AI ran into a new problem.

**CLICK |** Use the **bottom-right next-slide arrow** → **Closing**. Click **Replay RSI** only to replay this concept.

---

</details>

## C · Closing

**LOOK |** **Four terms. Two shifts.**

**SAY |** Let’s bring the four terms back into one picture. MoE and distillation ask how to use model capabilities more efficiently. World Model and VLA ask how to move from understanding to prediction and action. Together, they show that AI isn’t just about bigger models. It’s also about using those capabilities more wisely and bringing AI closer to the real world.

**DO |** Move across the two columns from left to right, then stop at **BIGGER → SMARTER** and **ANSWERS → ACTIONS**.

**CLICK |** No click needed.
