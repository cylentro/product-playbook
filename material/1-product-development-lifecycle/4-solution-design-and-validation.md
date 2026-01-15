---
title: "Solution Design & Validation"
order: 4
estimatedTime: 15
quiz: true
description: "Prototyping and testing solutions with users before development."
---

# Solution Design & Validation Phase

## Entrance Criteria

Before initiating the Solution Design & Validation phase, the following must be present:

* **Prioritized Solution Hypothesis**: A winning concept from Module 3 (Ideation) that has passed formal prioritization (RICE, WSJF, or Value vs. Effort).
* **Validated Problem Anchor**: The confirmed Needs Statement and "Job to be Done" from Discovery.
* **Technical Feasibility Green-light**: Preliminary confirmation from Engineering that the proposed concept can be built within the existing architecture.
* **High-level Resource Allocation**: Confirmation that Design and PM resources are allocated for prototyping and testing.

## Lead Roles & Squad

* **Primary Driver**: Product Designer (UI/UX).
* **Support Squad**: PM, Tech Lead, UX Writer, QA Lead.

## Key Activities

### **Step 1: Define MVP / Iteration Scope & Backlog Development**

::::present
### Step 1: Strategic Slicing & Hypothesis
We use **Vertical Slicing** to ensure every item in the backlog provides a functional piece of value.

* **Product Iteration Protocol:**
  * **Hypothesis Alignment**: Every user story must be traceable back to the validated problem.
  * **Build-Measure-Learn**: Use current "Friction Data" to define iteration boundaries.

> [!TIP]
> Don't build layers; build slices. A slice is a full user journey, however small.
::::

Define the smallest version of the product that delivers value (MVP) or the scope of the next iteration, and decompose it into actionable development units.

* **MVP Boundary (The Walking Skeleton)**: Identify the minimum path a user must take to achieve the core value.
* **Continuous Product Iteration Protocol:**
  * **Hypothesis Alignment**: Every user story must be traceable back to the problem validated in Discovery.
  * **Build-Measure-Learn**: Use current "Friction Data" (e.g., users dropping off at the insurance payment screen) to define the boundaries of the iteration.

::::present
### Step 1: Backlog Operational Rigor
Managing the "Safety Gate" between Product and Engineering.

- **INVEST Stories**: Independent, Negotiable, Valuable, Estimable, Small, Testable.
- **Definition of Ready (DoR)**: A story is only "Ready" if it contains:
  - **User Story**: Persona-Action-Value format.
  - **Visual Proof**: Linked Figma designs.
  - **Technical Specs**: API endpoints & data fields.
  - **Acceptance Criteria**: Gherkin format.
::::

* **Backlog Development (Operational Rigor):**
  * **INVEST Stories**: Stories must be Independent (can be developed in any order), Negotiable (open to discussion), Valuable (to the user), Estimable (by devs), Small (fits in a sprint), and Testable.
  * **Vertical Slicing**: Break features into functional slices (e.g., "User can toggle insurance") rather than technical layers (e.g., "Frontend work").
  * **Definition of Ready (DoR)**: The "Safety Gate" for Engineering. A story is only "Ready" if it contains:
    * **User Story**: "As a [User], I want [Action], so that [Value]."
    * **Gherkin AC**: Behavior-defined conditions.
    * **Visual Proof**: Linked Figma designs with specific assets.
    * **Technical Specs**: Defined API endpoints or data fields.

::::present
### Step 1: Requirements to AC Mapping
Bridging the gap between user needs, functional logic, and behavior.

| User Story | Detailed Requirement | Acceptance Criteria (Gherkin) |
| :--- | :--- | :--- |
| **Premium Protection**<br>As a seller, I want items >Rp1M to be auto-insured. | System must check 'Seller Segment'. If 'PLATINUM', auto-enable toggle and apply **0.15%** rate (instead of standard **0.2%**). | **Scenario: Happy Path**<br>Given: User is 'Platinum' and enters Rp10M value.<br>When: Field loses focus.<br>Then: Toggle is **ON** and Premium shows **Rp15,000**. |
| **Safety Gate**<br>As a seller, I want to be blocked if insurance is unavailable. | If 'Insurance API' heartbeat is down, block checkout for items >Rp1M. | **Scenario: Negative Case**<br>Given: Insurance API returns **503 Server Error**.<br>When: Enters value > Rp1M.<br>Then: Disable **'Create Shipment'** and show error message. |

> [!TIP]
> **ACs are your 'Contract' with Engineering.** If a behavior isn't captured in a Gherkin scenario, do not expect it to be built. Always include **"Negative Case(s)"** for every "Happy Path" to ensure system resilience.
::::

#### **Gherkin Standards & Examples**

Gherkin provides a shared language for PMs, Designers, and Engineers to agree on behavior before building.

| **Product**      | **User Story**                                                                                                                      | **Acceptance Criteria (Gherkin)**                                                                                                                                                                  |
| ---------------- | ----------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **SME** | As a seller, I want a progress bar for my quarterly shipments so that I know exactly how many more I need to hit the 60-order tier. | Scenario: View loyalty dashboard Given logged in and 'Retail' status When views 'VIP' section Then show progress bar ($x/60$ orders) And show days remaining in quarter.                  |
| **Insurance**    | As a user, I want auto-calculation based on item value so I can decide whether to add protection before checkout.                   | Scenario: Auto-calculation Given on 'Order Detail' screen When enters 'Item Value' of $Rp1,000,000$ Then show premium as $0.2\% \times Value$ And update 'Total Payment' in real-time.             |
| **Business Portal**   | As a B2B client, I want to bulk upload shipments via CSV so I can save time on manual data entry for multiple orders.               | Scenario: Successful bulk upload validation Given on 'Bulk Upload' page When uploads valid CSV (e.g., 50 entries) Then validate addresses and weights And show 'Success' summary for 50 shipments. |

::::present
### Step 1: Verification Logic
Differentiating the business rules (PM) from the technical paths (QA).

:::cols
:::col
#### **Acceptance Criteria (PM)**
- **Perspective**: User-Centric.
- **Objective**: Range & Rules.
- **Format**: Gherkin.
:::col
#### **Test Case Scenario (QA)**
- **Perspective**: System-Centric.
- **Objective**: How can it fail?
- **Format**: Action → Result.
:::
:::
::::

#### **Verification Logic: AC vs. Test Case Scenarios**

| **Feature**       | **Acceptance Criteria (AC)**         | **Test Case Scenario Planning**            |
| ----------------- | ------------------------------------ | ------------------------------------------ |
| **Primary Owner** | Product Manager (PM)                 | QA / Tester                                |
| **Perspective**   | User-Centric: "What should happen?"  | System-Centric: "How can it fail?"         |
| **Objective**     | Defines boundaries & business rules. | Defines paths for technical verification.  |
| **Format**        | Gherkin (Given/When/Then).           | Detailed steps (Action → Expected Result). |

::::present
### Step 1: Insurance Aggregator Example
Walking through the logic of a live shipping insurance feature.

:::cols
:::col
- **PM AC**: 
  - **GIVEN** value > **Rp1M**, 
  - **WHEN** toggle ON, 
  - **THEN** calculate **0.2%** premium.
:::col
- **QA Test Scenarios**:
  - **?[Boundary](Testing the exact limits of a rule—e.g., checking if Rp1,000,000 behaves differently than Rp1,000,001.)**: Exactly **Rp1,000,000**.
  - **?[Negative](Ensuring the system gracefully handles invalid or problematic inputs.)**: Non-numeric input.
  - **?[Edge](Handling rare, complex, or extreme 'break-it' scenarios like network timeouts.)**: API timeout handling.
:::
:::
> [!NOTE]
> High-quality AC covers the "What", whereas QA covers the "How it breaks".
::::

#### **Example: Shipping Insurance Aggregator**

* PM's Acceptance Criteria: 
  * **GIVEN** the item value is > **Rp1,000,000**, 
  * **WHEN** the user toggles insurance ON
  * **THEN** the system must calculate a premium of **0.2\%**.
* QA's Test Scenarios: "
  * **Boundary**: Exactly **Rp1,000,000** entered.
    * Testing the exact limits of a rule
  * **Negative**: Text entered in value field.
    * Ensuring the system gracefully handles invalid or problematic inputs.
  * **Edge**: Insurance API timeout handling.
    * Handling rare, complex, or extreme 'break-it' scenarios like network timeouts.

::::present
### Step 2: Implementation Metrics
Measuring the efficiency of the design through the **Tactical (Micro)** layer.

* **North Star Metric (Local)**: The core task completion of the feature.
* **Key Metrics (Local Outcome)**: The conversion success of the feature.
* **Supporting Metrics (The UI Levers)**: Engagement with design elements.
* **Trade-off Metrics (The Strategic Balance)**: Balancing friction vs. speed.
* **Health / Guardrail Metrics (Stability)**: Technical safety nets.
::::

### **Step 2: Define Tactical Implementation Metrics (Micro Success)**

We translate the 5-tier framework into the Tactical (Micro) layer. This measures the efficiency of the design itself.

* **North Star Metric (Local)**: The core task completion of the feature.
* **Key Metrics (Local Outcome)**: The conversion success of the feature.
* **Supporting Metrics (The UI Levers)**: Engagement with design elements.
* **Trade-off Metrics (The Strategic Balance)**: Balancing friction vs. speed.
* **Health / Guardrail Metrics (Stability)**: Technical safety nets.

Type of metrics:
* **Lagging Indicators (The Results)**: Actual Macro results.
* **Leading Indicators (The Predictors)**: Interaction signals predicting Macro results.

::::present
### Step 3: Flow Design (The 3-Layer Logic)
Mapping the visual journey, business logic, and technical handshake.

* **User Flow (UX)**: Visual journey (Happy vs. Circular paths).
* **Business Flow (Logic)**: If/Then rules and triggers.
* **System Flow (Tech)**: API mappings between Gateway & Vendors.
::::

### **Step 3: Flow Design (The Three-Layer Logic)**

To prevent logic gaps, squads must document three distinct perspectives:

* **User Flow (UX)**: The visual journey through screens. Includes "Happy Paths" and "Circular Paths" (where users go back or cancel).
* **Business Flow (Logic)**: The "Brain" of the feature. If/Then rules, status triggers, and calculation logic (e.g., if segment is B2B, then show custom rates).
* **Application/System Flow (Tech)**: The "Handshake." Mapping API calls between customer app, the Gateway, and external Insurance Vendors.

::::present
### Step 4: Wireframing & Validation
Using grayscale to validate hierarchy and accessibility.

- **Grayscale Focus**: IA and hierarchy over aesthetics.
- **The 5-User Rule**: Testing with 5 users uncovers 80% of usability flaws.

> [!IMPORTANT]
> If 5 users can't find the "Checkout" button, your layout is fundamentally broken.
::::

### **Step 4: Wireframing & Lo-fi Validation**

* **Grayscale Design**: Focus on hierarchy and Information Architecture (IA) without being distracted by colors or fonts.
* **5-User Rule**: Testing with 5 users typically uncovers 80% of usability flaws. If 5 users fail to find the "Checkout" button, the layout is broken.

::::present
### Step 5: High-fidelity Prototyping
Moving from "Lorem Ipsum" to production-ready micro-copy.

- **UX Copywriting**: Real copy is mandatory. NO placeholders.
- **Interactive Logic**: Clickable prototypes must simulate real system behavior.
::::

### **Step 5: High-fidelity Prototyping**

* **UX Copywriting**: Use real micro-copy. Vague text like "Error" is forbidden; use "Insurance provider is offline, please try again."
* **Interactive Logic**: Clickable prototypes must simulate system behavior (e.g., a toggle must actually change the price) for accurate validation.

::::present
### Step 6: Final Validation
The "Cognitive Walkthrough" session with PM, Design, and Dev.

#### **The Big Questions**:
* Will the user know what the system just did?
* Do they know what the next correct action is?
::::

### **Step 6: Hi-fi Validation & Final Iteration**

* **Cognitive Walkthrough**: A session where the squad (PM, Designer, Dev) walks through the prototype. At each step, ask: "Will the user know what the system just did? Do they know what the next correct action is?"

## Rituals & Syncs

* **Design Review Workshop**: Weekly sync to catch technical feasibility blockers early.
* **UT Debrief**: Conducted within 24 hours of testing to prioritize "Design Fixes."
* **Backlog Refinement**: Grooming stories until they meet the Definition of Ready (DoR).

## Tools & Templates

* **Design & Flow**: Figma, Miro.
* **Documentation**: Notion/Confluence (PRD), Google Sheets (Localization table).
* **Validation**: Maze, Lookback, or internal interview guides.

## Deliverables

* **Finalized PRD**: Documented User Stories, Gherkin AC, and Business Rules.
* **UX Blueprint**: Approved User, Business, and System flows.
* **Interactive Prototype**: The clickable "Source of Truth" for engineering.
* **Research Artifacts**: Summarized UT reports and IDI insights.

## Common Pitfalls (Anti-patterns)

* **Happy Path Bias**: Only designing for perfect scenarios, leaving developers to "guess" how to handle errors.
* **Designing in a Vacuum**: UI that looks great but is technically impossible to build.
* **Copy-as-Afterthought**: Using "Lorem Ipsum" ruins the validity of usability testing.

## Exit Criteria (The Gate)

* **Prototype validated** with ≥ 5 users with an 80% task completion rate.
* **PRD finalized** with Gherkin AC and meets the Definition of Ready (DoR).
* **5-Tier Tactical Metric Framework** defined for the feature.
* **All 3 Flows** (User, Business, System) documented and signed off by the Tech Lead.
