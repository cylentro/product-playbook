# Module 5: Planning & Alignment

## **5.1 Entrance Criteria**

Before initiating the Planning & Alignment phase, the following must be present:

* Validated Solution Blueprint: The interactive high-fidelity prototype from Module 4 has been signed off.
* Finalized PRD: Documentation includes all Gherkin Acceptance Criteria and Business Rules.
* Technical Handshake: User, Business, and System flows have been reviewed and approved by the Tech Lead.
* Tactical Metric Definition: The 6-tier tactical metrics (Leading, Supporting, etc.) are documented.

## **5.2 Lead Roles & Squad**

* Primary Driver: Product Manager (PM).
* Support Squad: Tech Lead / System Architect, Engineering Squad (Frontend, Backend, Mobile), QA Lead, and Product Designer (for design clarification).

## **5.3 Key Activities**

The goal of this phase is to bridge the gap between "what we want to build" and "what we are committing to build" within a specific timeframe.

### **Step 1: Brainstorming (The Technical Discovery)**

This is a collaborative session between the PM, Designer, and the Engineering squad to deconstruct the solution.

* Background Contextualization: The PM explains the "Why" (The business objective from Module 3) and the "What" (The validated prototype from Module 4).
* Solution Brainstorming: The development team discusses the technical implementation details.
  * System Impact: Identifying which services or databases need modification.
  * Edge Case Identification: Developers identify technical scenarios the design might have missed (e.g., "What happens if the Insurance API returns a partial success?").
* Architecture Validation: The Tech Lead confirms the finalized System Flow aligns with the actual codebase.

### **Step 2: Sprint Grooming / Pre-grooming**

The ritual where the backlog is refined into "Ready" units of work.

* Project Contextualization: Re-explaining the project background for any squad members who were not involved in earlier discovery.
* User Story Prioritization: The PM ranks stories based on user value and business impact (RICE/WSJF logic).
* Story Weighting (The "How Big" Check): * The squad uses a relative estimation technique (e.g., Planning Poker, Fibonacci, or T-shirt sizing).
  * Focus: Estimate based on Complexity, Effort, and Uncertainty.
  * Example: A Biza bulk upload feature (CSV validation + multi-vendor routing) might be weighted as a "13" (Large) due to its integration complexity.

### **Step 3: Sprint Planning**

The final alignment where the squad commits to the "Sprint Backlog."

* Sprint Goal Definition: A one-sentence summary of what the squad aims to achieve (e.g., "Enable real-time insurance premium calculation for AMA Retail orders").
* Finalizing Stories: Ensuring every story pulled into the sprint meets the Definition of Ready (DoR).
* **Capacity-Based Prioritization:**
  * The squad reviews their available capacity (account for holidays, meetings, etc.).
  * Stories are selected from the prioritized backlog until the capacity limit is reached.
* Technical Breakdown: Developers break down stories into specific technical tasks (e.g., "Create API endpoint for Insurance Aggregator").

## **5.4 Rituals & Syncs**

* Grooming Session: Bi-weekly (or once per iteration) to ensure the backlog is always "Ready."
* Sprint Planning Meeting: Conducted at the start of every sprint.
* Estimation Ritual: Collaborative session using tools like Jora or physical Planning Poker cards.

## **5.5 Tools & Templates**

* Backlog Management: Jira, Azure DevOps, or Trello.
* Documentation: Notion/Confluence (for technical specs).
* Estimation: Planning Poker apps or relative sizing matrices.

## **5.6 Deliverables**

* Committed Sprint Backlog: A finalized list of stories for the current iteration.
* Sprint Goal: Documented and shared with stakeholders.
* Weighted Backlog: All stories in the project scope have been assigned a complexity weight.
* Technical Task List: Sub-tasks created for each user story.

## **5.7 Common Pitfalls (Anti-patterns)**

* Over-commitment: Pulling in more story points than the squad's historical velocity allows.
* Grooming Without Context: Engineering squad estimating stories without understanding the business "Why."
* The "Shadow" Backlog: Working on technical tasks that aren't documented as stories in the sprint.
* Vague Weights: Using time-based estimates (hours/days) instead of complexity-based relative weights.

## **5.8 Exit Criteria (The Gate)**

* [ ] Sprint Goal is clearly defined and understood by the entire squad.
* [ ] All user stories in the sprint meet the Definition of Ready (DoR).
* [ ] The squad has formally committed to the sprint backlog based on their verified capacity.
* [ ] All high-complexity stories have been decomposed into manageable tasks.
