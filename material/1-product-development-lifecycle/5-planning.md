---
title: "Planning & Alignment"
order: 5
estimatedTime: 10
quiz: true
description: "Aligning on scope, technical feasibility, and resource allocation."
quizQuestions:
  - id: "planning-q1"
    question: "What is the primary goal of the Planning & Alignment phase?"
    options:
      - "Start coding immediately"
      - "Bridge the gap between 'what we want to build' and 'what we commit to build'"
      - "Design the user interface"
      - "Launch the product"
    correctIndex: 1
    explanation: "Planning & Alignment bridges the gap between the desired solution and the committed scope within a specific timeframe, ensuring feasibility and resource alignment."

  - id: "planning-q2"
    question: "What is 'Relative Estimation'?"
    options:
      - "Estimating exact hours for each task"
      - "Comparing tasks against each other rather than estimating exact time"
      - "Estimating based on calendar days"
      - "Guessing randomly"
    correctIndex: 1
    explanation: "Relative Estimation compares tasks against each other (e.g., 'Task A is twice as complex as Task B') rather than estimating exact hours, accounting for complexity and uncertainty."

  - id: "planning-q3"
    question: "What does the Fibonacci sequence (1, 2, 3, 5, 8, 13) represent in story weighting?"
    options:
      - "Number of days to complete"
      - "Increasing uncertainty in larger tasks"
      - "Number of developers needed"
      - "Priority ranking"
    correctIndex: 1
    explanation: "The Fibonacci sequence reflects increasing uncertainty in larger tasks—the gaps widen as complexity grows, acknowledging that big tasks are harder to estimate accurately."

  - id: "planning-q4"
    question: "What is a 'Sprint Goal'?"
    options:
      - "A list of all features to build"
      - "A one-sentence summary of what the sprint aims to achieve"
      - "The number of story points to complete"
      - "The deadline for the project"
    correctIndex: 1
    explanation: "A Sprint Goal is a one-sentence mission statement that defines the purpose of the sprint (e.g., 'Enable real-time insurance premium calculation')."

  - id: "planning-q5"
    question: "What is the 'Definition of Ready' (DoR)?"
    options:
      - "When the product is ready to launch"
      - "Criteria that a story must meet before being pulled into a sprint"
      - "When developers are ready to start work"
      - "When testing is complete"
    correctIndex: 1
    explanation: "Definition of Ready (DoR) is the checklist of criteria a user story must meet before it can be pulled into a sprint (e.g., clear ACs, designs finalized, dependencies resolved)."

  - id: "planning-q6"
    question: "Why should you never fill 100% of sprint capacity?"
    options:
      - "Developers need breaks"
      - "To reserve 10-20% buffer for bugs and unknowns"
      - "Management requires it"
      - "It's a waste of time"
    correctIndex: 1
    explanation: "Never fill 100% of capacity. Reserve 10-20% for bugs, unexpected issues, and burndown buffer to maintain sustainable pace and quality."

  - id: "planning-q7"
    question: "What is 'Grooming' (Backlog Refinement)?"
    options:
      - "Cleaning up code"
      - "Refining the backlog into 'Ready' units of work"
      - "Organizing team meetings"
      - "Reviewing completed work"
    correctIndex: 1
    explanation: "Grooming (Backlog Refinement) is the continuous ritual of refining stories, adding details, and ensuring the backlog has 2 sprints worth of 'Ready' items."

  - id: "planning-q8"
    question: "What three factors should story weighting consider?"
    options:
      - "Time, Money, Resources"
      - "Complexity, Effort, Uncertainty"
      - "Priority, Value, Risk"
      - "Speed, Quality, Cost"
    correctIndex: 1
    explanation: "Story weighting should consider: Complexity (Is it hard?), Effort (Does it take long?), and Uncertainty (Is it unknown?)."

  - id: "planning-q9"
    question: "What is a 'Shadow Backlog'?"
    options:
      - "A backup copy of the backlog"
      - "Working on undocumented tasks not in the sprint"
      - "A dark-themed project board"
      - "Hidden technical debt"
    correctIndex: 1
    explanation: "A Shadow Backlog is when developers work on technical tasks that aren't documented as stories in the sprint, creating visibility gaps and planning issues."

  - id: "planning-q10"
    question: "Who makes the final commitment on sprint scope?"
    options:
      - "The Product Manager alone"
      - "The Engineering squad based on their capacity"
      - "The CEO"
      - "The stakeholders"
    correctIndex: 1
    explanation: "Commitment is a squad decision. The PM proposes scope, but the Engineering squad commits to what is achievable based on their verified capacity."

  - id: "planning-q11"
    question: "What is 'Planning Poker'?"
    options:
      - "A gambling game"
      - "A collaborative estimation technique using cards"
      - "A card-based project management tool"
      - "A risk assessment method"
    correctIndex: 1
    explanation: "Planning Poker is a collaborative estimation technique where team members use cards (Fibonacci numbers) to vote on story complexity, promoting discussion and consensus."

  - id: "planning-q12"
    question: "What is the main risk of 'Over-commitment'?"
    options:
      - "Finishing too early"
      - "Pulling in more story points than the squad's velocity allows, leading to burnout and missed deadlines"
      - "Having too much free time"
      - "Completing too many features"
    correctIndex: 1
    explanation: "Over-commitment happens when pulling in more story points than historical velocity allows, leading to burnout, technical debt, and missed sprint goals."
---

# Planning & Alignment Phase

## Entrance Criteria

::::present
### The Planning "Safety Gate"
Mandatory prerequisites before the squad starts commits.

* **Validated Blueprint**: Interactive prototype signed off.
* **Finalized PRD**: All Gherkin ACs and Business rules documented.
* **Tech Handshake**: System flows approved by Tech Lead.
* **Metrics Defined**: 6-tier tactical metrics are documented.

> [!WARNING]
> **Garbage In, Garbage Out.** Planning with a vague PRD or unvalidated prototype will result in technical debt and missed deadlines.
::::

Before initiating the Planning & Alignment phase, the following must be present:

* **Validated Solution Blueprint**: The interactive high-fidelity prototype from Module 4 has been signed off.
* **Finalized PRD**: Documentation includes all Gherkin Acceptance Criteria and Business Rules.
* **Technical Handshake**: User, Business, and System flows have been reviewed and approved by the Tech Lead.
* **Tactical Metric Definition**: The 6-tier tactical metrics (Leading, Supporting, etc.) are documented.

## Lead Roles & Squad

::::present
### The Planning Squad
The PM drives the "What," Engineering defines the "How."

* **Primary Driver**: **Product Manager (PM)**.
* **Support Squad:**
  * **Tech Lead / Architect**: Validates system feasibility.
  * **Engineering Squad**: Deconstructs and weights tasks.
  * **QA Lead**: Validates testability of ACs.
  * **Product Designer**: Clarifies visual/interaction intent.
::::

* **Primary Driver**: **Product Manager (PM)**.
* **Support Squad**: Tech Lead / System Architect, Engineering Squad (Frontend, Backend, Mobile), QA Lead, and Product Designer (for design clarification).

## Key Activities

The goal of this phase is to bridge the gap between **"what we want to build"** and **"what we are committing to build"** within a specific timeframe.

### Step 1: Brainstorming (The Technical Discovery)

::::present
### Step 1: Technical Deconstruction
Bridging the gap between the Design and the Database.

* **Background Context**: PM explains the "Why" and the "What."
* **Solution Brainstorming**: Engineering deconstructs the logic.
* **Architecture Check**: Ensuring the System Flow matches reality.

> [!TIP]
> This is a collaborative session. The best technical solutions often come when developers see the full business context.
::::

This is a collaborative session between the PM, Designer, and the Engineering squad to deconstruct the solution.

* **Background Contextualization**: The PM explains the "Why" (The business objective from Module 3) and the "What" (The validated prototype from Module 4).
* **Solution Brainstorming**: The development team discusses the technical implementation details.
  * **System Impact**: Identifying which services or databases need modification.
  * **Edge Case Identification**: Developers identify technical scenarios the design might have missed (e.g., "What happens if the Insurance API returns a partial success?").
* **Architecture Validation**: The Tech Lead confirms the finalized System Flow aligns with the actual codebase.

::::present
### Step 1: System Impact & Edge Cases
Exposing the "Invisible" work before it hits the sprint.

:::cols
:::col
#### System Impact
* Which microservices change?
* New database fields needed?
* Third-party API payload?
:::col
#### Edge Case ID
* Partner timeouts?
* Partial success states?
* Race conditions?
:::
:::

> [!IMPORTANT]
> **Example:** "What happens if the Insurance API returns a partial success during a bulk upload?"
::::

### Step 2: Sprint Grooming / Pre-grooming

::::present
### Step 2: The Grooming Ritual
Refining the backlog into "Ready" units of work.

* **Project Re-context**: Syncing squad members who missed Discovery.
* **Prioritization**: PM ranks stories by value (RICE/WSJF).
* **Story Weighting**: Relative estimation (Planning Poker).

> [!NOTE]
> Grooming is continuous. A healthy backlog has **2 sprints** worth of "Ready" items at any time.
::::

The ritual where the backlog is refined into "Ready" units of work.

* **Project Contextualization**: Re-explaining the project background for any squad members who were not involved in earlier discovery.
* **User Story Prioritization**: The PM ranks stories based on user value and business impact (RICE/WSJF logic).
* **Story Weighting (The "How Big" Check)**: * The squad uses a relative estimation technique (e.g., Planning Poker, Fibonacci, or T-shirt sizing).
  * **Focus**: Estimate based on Complexity, Effort, and Uncertainty.
  * **Example**: A Business Portal bulk upload feature (CSV validation + multi-vendor routing) might be weighted as a "13" (Large) due to its integration complexity.

::::present
### Step 2: Story Weighting
Measuring complexity, not just calendar days.

* **?[Relative Estimation](The practice of comparing tasks against each other rather than estimating exact hours.)**: Comparing task 'A' to task 'B'.
* **?[Fibonacci Scale](The 1, 2, 3, 5, 8, 13 sequence used to reflect increasing uncertainty in larger tasks.)**: 1, 2, 3, 5, 8, 13.
* **Weight Factors**: 
  * Complexity (Is it hard?)
  * Effort (Does it take long?)
  * Uncertainty (Is it unknown?)

| **Example Task** | **Weight** | **Logic** |
| :--- | :--- | :--- |
| **Business Portal CSV Upload** | **13** | Multi-vendor logic + high complexity. |
| **Claim Button UI** | **2** | Simple CSS + known endpoint. |
::::

### Step 3: Sprint Planning

::::present
### Step 3: Sprint Commitment
The final alignment on the "Sprint Backlog."

* **Sprint Goal**: The "One Sentence" purpose of the cycle.
* **DoR Check**: Final verification that stories are "Ready."
* **Capacity Check**: Do we have the bandwidth for this scope?

> [!IMPORTANT]
> **Commitment is a Squad decision.** The PM proposes scope, but the Engineering squad commits to what is achievable.
::::

The final alignment where the squad commits to the "Sprint Backlog."

* **Sprint Goal Definition**: A one-sentence summary of what the squad aims to achieve (e.g., "Enable real-time insurance premium calculation for Customer orders").
* **Finalizing Stories**: Ensuring every story pulled into the sprint meets the Definition of Ready (DoR).
* **Capacity-Based Prioritization:**
  * The squad reviews their available capacity (account for holidays, meetings, etc.).
  * Stories are selected from the prioritized backlog until the capacity limit is reached.
* **Technical Breakdown**: Developers break down stories into specific technical tasks (e.g., "Create API endpoint for Insurance Aggregator").

::::present
### Step 3: Capacity & Goals
Defining the "Why" behind the sprint scope.

:::cols
:::col
#### The Sprint Goal
* One-sentence mission.
* *Example:* "Enable real-time premium calculation for ."
:::col
#### Capacity Check
* Account for holidays/meetings.
* Historical velocity limit.
* Avoid 100% allocation.
:::
:::

> [!TIP]
> **Plan for the unknown.** Never fill 100% of capacity. Reserve 10-20% for "Bugs & Burndown" buffer.
::::

## Rituals & Syncs

::::present
### Planning Rituals
The routine that maintains operational health.

* **Grooming Session**: Bi-weekly sync to keep the backlog "Ready."
* **Sprint Planning**: Start-of-cycle commitment meeting.
* **Estimation Ritual**: Planning Poker or relative sizing workshop.

| Ritual | Who | Goal |
| :--- | :--- | :--- |
| **Grooming** | PM + Squad | Refine & Weight. |
| **Planning** | PM + Squad | Commit & Task. |
::::

* **Grooming Session**: Bi-weekly (or once per iteration) to ensure the backlog is always "Ready."
* **Sprint Planning Meeting**: Conducted at the start of every sprint.
* **Estimation Ritual**: Collaborative session using tools like Jora or physical Planning Poker cards.

## Tools & Templates

::::present
### Tools of the Trade
Standardizing the planning environment.

* **Backlog Mgmt**: Jira, Azure DevOps, or Trello.
* **Documentation**: Notion/Confluence (Technical Specs).
* **Estimation**: Planning Poker Apps or Sizing Matrices.

> [!NOTE]
> **Tool Consistency:** Every squad member must use the same "Source of Truth" to prevent "Shadow Backlogs."
::::

* **Backlog Management**: Jira, Azure DevOps, or Trello.
* **Documentation**: Notion/Confluence (for technical specs).
* **Estimation**: Planning Poker apps or relative sizing matrices.

## Deliverables

* **Committed Sprint Backlog**: A finalized list of stories for the current iteration.
* **Sprint Goal**: Documented and shared with stakeholders.
* **Weighted Backlog**: All stories in the project scope have been assigned a complexity weight.
* **Technical Task List**: Sub-tasks created for each user story.

## Common Pitfalls (Anti-patterns)

::::present
### Common Pitfalls
What to avoid for a high-performing planning cycle.

* **Over-commitment**: Ignoring velocity limits.
* **Grooming without Context**: Estimating without the "Why."
* **The "Shadow" Backlog**: Working on un-documented tasks.
* **Vague Weights**: Using time (hours) instead of complexity.

> [!WARNING]
> **Time-based estimation is a trap.** It ignores the variables of experience and technical complexity. Always use **Relative Sizing**.
::::

* **Over-commitment**: Pulling in more story points than the squad's historical velocity allows.
* **Grooming Without Context**: Engineering squad estimating stories without understanding the business "Why."
* **The "Shadow" Backlog**: Working on technical tasks that aren't documented as stories in the sprint.
* **Vague Weights**: Using time-based estimates (hours/days) instead of complexity-based relative weights.

## Exit Criteria (The Gate)

::::present
### Exit Criteria: The Planning Gate
Final checklist before moving to Development (Module 6).

* **Sprint Goal** is clearly defined and understood.
* **Stories meet DoR** standards (ready to build).
* **Squad has Committed** based on verified capacity.
* **Large items decomposed** into manageable tasks.

> [!IMPORTANT]
> **No Commitment = No Sprint.** Never start development until the squad has formally accepted the scope.
::::

* **Sprint Goal** is clearly defined and understood by the entire squad.
* **All user stories** in the sprint meet the Definition of Ready (DoR).
* The squad has formally committed to the sprint backlog based on their verified capacity.
* All high-complexity stories have been decomposed into manageable tasks.
