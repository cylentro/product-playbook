# Module 4: Solution Design & Validation

## **4.1 Entrance Criteria**

Before initiating the Solution Design & Validation phase, the following must be present:

* Prioritized Solution Hypothesis: A winning concept from Module 3 (Ideation) that has passed formal prioritization (RICE, WSJF, or Value vs. Effort).
* Validated Problem Anchor: The confirmed Needs Statement and "Job to be Done" from Discovery.
* Technical Feasibility Green-light: Preliminary confirmation from Engineering that the proposed concept can be built within the existing architecture.
* High-level Resource Allocation: Confirmation that Design and PM resources are allocated for prototyping and testing.

## **4.2 Lead Roles & Squad**

* Primary Driver: Product Designer (UI/UX).
* Support Squad: PM, Tech Lead, UX Writer, QA Lead.

## **4.3 Key Activities**

### **Step 1: Define MVP / Iteration Scope & Backlog Development**

This step bridges the gap between a high-level idea and a technical plan. We use "Vertical Slicing" to ensure every item in the backlog provides a functional piece of value rather than just a technical layer.

* **Continuous Product Iteration Protocol:**
  * Hypothesis Alignment: Every user story must be traceable back to the problem validated in Discovery.
  * Build-Measure-Learn: We use current "Friction Data" (e.g., users dropping off at the insurance payment screen) to define the boundaries of the iteration.
* **Backlog Development (Operational Rigor):**
  * INVEST Stories: Stories must be Independent (can be developed in any order), Negotiable (open to discussion), Valuable (to the user), Estimable (by devs), Small (fits in a sprint), and Testable.
  * Definition of Ready (DoR): The "Safety Gate" for Engineering. A story is only "Ready" if it contains:
    * User Story: "As a [User], I want [Action], so that [Value]."
    * Gherkin AC: Behavior-defined conditions.
    * Visual Proof: Linked Figma designs with specific assets.
    * Technical Specs: Defined API endpoints or data fields.

#### **Gherkin Standards & Examples**

Gherkin provides a shared language for PMs, Designers, and Engineers to agree on behavior before building.

| **Product**      | **User Story**                                                                                                                      | **Acceptance Criteria (Gherkin)**                                                                                                                                                                  |
| ---------------- | ----------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Anteraja Pro** | As a seller, I want a progress bar for my quarterly shipments so that I know exactly how many more I need to hit the 60-order tier. | Scenario: View loyalty dashboard Given logged in and 'Retail' status When views 'Anteraja Pro' section Then show progress bar ($x/60$ orders) And show days remaining in quarter.                  |
| **Insurance**    | As a user, I want auto-calculation based on item value so I can decide whether to add protection before checkout.                   | Scenario: Auto-calculation Given on 'Order Detail' screen When enters 'Item Value' of $Rp1,000,000$ Then show premium as $0.2\% \times Value$ And update 'Total Payment' in real-time.             |
| **Biza (B2B)**   | As a B2B client, I want to bulk upload shipments via CSV so I can save time on manual data entry for multiple orders.               | Scenario: Successful bulk upload validation Given on 'Bulk Upload' page When uploads valid CSV (e.g., 50 entries) Then validate addresses and weights And show 'Success' summary for 50 shipments. |

#### **Verification Logic: AC vs. Test Case Scenarios**

| **Feature**       | **Acceptance Criteria (AC)**         | **Test Case Scenario Planning**            |
| ----------------- | ------------------------------------ | ------------------------------------------ |
| **Primary Owner** | Product Manager (PM)                 | QA / Tester                                |
| **Perspective**   | User-Centric: "What should happen?"  | System-Centric: "How can it fail?"         |
| **Objective**     | Defines boundaries & business rules. | Defines paths for technical verification.  |
| **Format**        | Gherkin (Given/When/Then).           | Detailed steps (Action → Expected Result). |

#### **Example: Shipping Insurance Aggregator**

* PM's Acceptance Criteria: "Given the item value is > $Rp1,000,000$, when the user toggles insurance ON, then the system must calculate a premium of $0.2\%$."
* QA's Test Scenarios: "1. Boundary: Exactly $Rp1,000,000$ entered. 2. Negative: Text entered in value field. 3. Edge: Insurance API timeout handling."

### **Step 2: Define Tactical Implementation Metrics (Micro Success)**

We translate the 6-tier framework into the Tactical (Micro) layer. This measures the efficiency of the design itself.

1. North Star Metric (Local): The core task completion of the feature.
1. Key Metrics (Local Outcome): The conversion success of the feature.
1. Supporting Metrics (The UI Levers): Engagement with design elements.
1. Leading Indicators (The Predictors): Interaction signals predicting Macro results.
1. Trade-off Metrics (The Strategic Balance): Balancing friction vs. speed.
1. Health / Guardrail Metrics (Stability): Technical safety nets.

### **Step 3: Flow Design (The Three-Layer Logic)**

To prevent logic gaps, squads must document three distinct perspectives:

1. User Flow (UX): The visual journey through screens. Includes "Happy Paths" and "Circular Paths" (where users go back or cancel).
1. Business Flow (Logic): The "Brain" of the feature. If/Then rules, status triggers, and calculation logic (e.g., if segment is B2B, then show custom rates).
1. Application/System Flow (Tech): The "Handshake." Mapping API calls between AMA, the Gateway, and external Insurance Vendors.

### **Step 4: Wireframing & Lo-fi Validation**

* Grayscale Design: Focus on hierarchy and Information Architecture (IA) without being distracted by colors or fonts.
* 5-User Rule: Testing with 5 users typically uncovers 80% of usability flaws. If 5 users fail to find the "Checkout" button, the layout is broken.

### **Step 5: High-fidelity Prototyping**

* UX Copywriting: Use real micro-copy. Vague text like "Error" is forbidden; use "Insurance provider is offline, please try again."
* Interactive Logic: Clickable prototypes must simulate system behavior (e.g., a toggle must actually change the price) for accurate validation.

### **Step 6: Hi-fi Validation & Final Iteration**

* Cognitive Walkthrough: A session where the squad (PM, Designer, Dev) walks through the prototype. At each step, ask: "Will the user know what the system just did? Do they know what the next correct action is?"

## **4.4 Rituals & Syncs**

* Design Review Workshop: Weekly sync to catch technical feasibility blockers early.
* UT Debrief: Conducted within 24 hours of testing to prioritize "Design Fixes."
* Backlog Refinement: Grooming stories until they meet the Definition of Ready (DoR).

## **4.5 Tools & Templates**

* Design & Flow: Figma, Miro.
* Documentation: Notion/Confluence (PRD), Google Sheets (Localization table).
* Validation: Maze, Lookback, or internal interview guides.

## **4.6 Deliverables**

* Finalized PRD: Documented User Stories, Gherkin AC, and Business Rules.
* UX Blueprint: Approved User, Business, and System flows.
* Interactive Prototype: The clickable "Source of Truth" for engineering.
* Research Artifacts: Summarized UT reports and IDI insights.

## **4.7 Common Pitfalls (Anti-patterns)**

* Happy Path Bias: Only designing for perfect scenarios, leaving developers to "guess" how to handle errors.
* Designing in a Vacuum: UI that looks great but is technically impossible to build.
* Copy-as-Afterthought: Using "Lorem Ipsum" ruins the validity of usability testing.

## **4.8 Exit Criteria (The Gate)**

* Prototype validated with ≥ 5 users with an 80% task completion rate.
* PRD finalized with Gherkin AC and meets the Definition of Ready (DoR).
* 6-Tier Tactical Metric Framework defined for the feature.
* All 3 Flows (User, Business, System) documented and signed off by the Tech Lead.
