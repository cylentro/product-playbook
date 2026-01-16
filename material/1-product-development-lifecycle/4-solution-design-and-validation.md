---
title: "Solution Design & Validation"
order: 4
estimatedTime: 15
quiz: true
description: "Prototyping and testing solutions with users before development."
quizQuestions:
  - id: "solution-design-q1"
    question: "What is the primary goal of the Solution Design & Validation phase?"
    options:
      - "Build the final product immediately"
      - "Test and validate solutions with users before development"
      - "Write detailed technical specifications"
      - "Launch to market as quickly as possible"
    correctIndex: 1
    explanation: "Solution Design & Validation focuses on prototyping and testing solutions with real users to validate assumptions before committing to full development."

  - id: "solution-design-q2"
    question: "What is a 'Lo-Fi Prototype'?"
    options:
      - "A fully functional product"
      - "A low-fidelity wireframe or sketch to test concepts quickly"
      - "A high-resolution design mockup"
      - "A production-ready interface"
    correctIndex: 1
    explanation: "Lo-Fi (Low-Fidelity) prototypes are simple wireframes or sketches used to test concepts quickly and cheaply before investing in high-fidelity designs."

  - id: "solution-design-q3"
    question: "What does 'Wizard of Oz' testing mean?"
    options:
      - "Testing with fictional users"
      - "Simulating automated features manually behind the scenes"
      - "Using AI to test prototypes"
      - "Testing in a fantasy environment"
    correctIndex: 1
    explanation: "Wizard of Oz testing simulates automated features manually behind the scenes to test user reactions before building the actual automation."

  - id: "solution-design-q4"
    question: "What is the '5-Second Test' used for?"
    options:
      - "Testing page load speed"
      - "Measuring first impressions and visual hierarchy"
      - "Testing user patience"
      - "Measuring task completion time"
    correctIndex: 1
    explanation: "The 5-Second Test shows users a design for 5 seconds to measure first impressions, visual hierarchy, and whether key messages are immediately clear."

  - id: "solution-design-q5"
    question: "What is 'Desirability Testing'?"
    options:
      - "Testing if users can afford the product"
      - "Testing if users want the solution and find it appealing"
      - "Testing technical feasibility"
      - "Testing market size"
    correctIndex: 1
    explanation: "Desirability Testing validates whether users actually want the solution and find it appealing, beyond just being usable or feasible."

  - id: "solution-design-q6"
    question: "What is an 'A/B Test'?"
    options:
      - "Testing two different user groups"
      - "Comparing two versions of a feature to see which performs better"
      - "Testing alphabetically"
      - "Testing in two different countries"
    correctIndex: 1
    explanation: "A/B Testing compares two versions of a feature (A vs B) with real users to determine which performs better based on defined metrics."

  - id: "solution-design-q7"
    question: "What does 'Usability Testing' measure?"
    options:
      - "How many users want the feature"
      - "How easily users can complete tasks with the design"
      - "How much users are willing to pay"
      - "How fast the system runs"
    correctIndex: 1
    explanation: "Usability Testing measures how easily users can complete specific tasks with the design, identifying friction points and confusion."

  - id: "solution-design-q8"
    question: "What is a 'Concierge MVP'?"
    options:
      - "A luxury version of the product"
      - "Manually delivering the service to validate demand before automation"
      - "A premium pricing tier"
      - "An automated customer service system"
    correctIndex: 1
    explanation: "A Concierge MVP manually delivers the service to validate demand and learn user needs before investing in automation or scaling."

  - id: "solution-design-q9"
    question: "What is the purpose of a 'Clickable Prototype'?"
    options:
      - "To test server performance"
      - "To simulate user flows and interactions without building the backend"
      - "To measure click-through rates"
      - "To test database queries"
    correctIndex: 1
    explanation: "Clickable Prototypes simulate user flows and interactions without building the actual backend, allowing rapid testing of UX concepts."

  - id: "solution-design-q10"
    question: "What is 'Fake Door Testing'?"
    options:
      - "Testing security vulnerabilities"
      - "Measuring interest by showing a feature that doesn't exist yet"
      - "Testing door animations"
      - "Testing navigation menus"
    correctIndex: 1
    explanation: "Fake Door Testing measures interest in a feature by showing it in the UI (the 'door') but not building it yet, tracking how many users click."

  - id: "solution-design-q11"
    question: "When should you move from Lo-Fi to Hi-Fi prototypes?"
    options:
      - "Immediately after ideation"
      - "After validating core concepts and user flows with Lo-Fi"
      - "Never, always use Lo-Fi"
      - "Before any user testing"
    correctIndex: 1
    explanation: "Move to Hi-Fi prototypes only after validating core concepts and user flows with Lo-Fi prototypes to avoid wasting design effort on unvalidated ideas."

  - id: "solution-design-q12"
    question: "What is the main risk of skipping validation?"
    options:
      - "Taking too long to launch"
      - "Building something users don't want or can't use"
      - "Spending too much on research"
      - "Hiring too many designers"
    correctIndex: 1
    explanation: "Skipping validation risks building something users don't want or can't use, wasting development resources on solutions that fail in the market."
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
| **SME** | As a seller, I want a progress bar for my quarterly shipments so that I know exactly how many more I need to hit the 60-order tier. | Scenario: View loyalty dashboard Given logged in and 'Retail' status When views 'VIP' section Then show progress bar (x/60 orders) And show days remaining in quarter.                  |
| **Insurance**    | As a user, I want auto-calculation based on item value so I can decide whether to add protection before checkout.                   | Scenario: Auto-calculation Given on 'Order Detail' screen When enters 'Item Value' of Rp1,000,000 Then show premium as 0.2% * Value And update 'Total Payment' in real-time.             |
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
### Step 1: Marketplace Examples
Walking through the logic of business rules vs. system edge cases.

:::col
- **PM AC**:
  - **GIVEN** spend > **Rp150k**,
  - **WHEN** applied,
  - **THEN** 10% discount (max Rp20k).
:::
:::col
- **QA Test Scenarios**:
  - **?[Boundary](Testing the exact limits of a rule.)**: Exactly **Rp150,000**.
  - **?[Negative](Ensuring the system gracefully handles invalid or problematic inputs.)**: Applying wrong seller's voucher.
  - **?[Edge](Handling rare, complex, or extreme scenarios.)**: Cart total drops below threshold post-application.
:::
> [!NOTE]
> High-quality AC covers the "What", whereas QA covers the "How it breaks".
::::

#### **Example: Marketplace Seller Voucher**

* PM's Acceptance Criteria:
  * **GIVEN** a seller-specific voucher with a minimum spend of **Rp150,000**,
  * **WHEN** the cart total from the specific seller reaches the threshold,
  * **THEN** apply a **10% discount** capped at **Rp20,000**.
* QA's Test Scenarios:
  * **Boundary**: Cart total is exactly **Rp150,000**.
    * Testing if the discount triggers exactly at the threshold.
  * **Negative**: User applies a voucher from "Seller A" to a cart only containing items from "Seller B".
    * Ensuring cross-seller voucher validation works.
  * **Edge**: User modifies cart quantity after voucher application, bringing the total to **Rp149,900**.
    * Handling real-time recalculation and auto-removal of invalid vouchers.

::::present
### Step 2: Implementation Metrics
Measuring the efficiency of the design through the **Tactical (Micro)** layer.

* **North Star Metric**: The core task completion of the feature.
* **Key Metrics**: The conversion success of the feature.
* **Supporting Metrics (The UI Levers)**: Engagement with design elements.
* **Trade-off Metrics (The Strategic Balance)**: Balancing friction vs. speed.
* **Health / Guardrail Metrics (Stability)**: Technical safety nets.
::::

### **Step 2: Define Tactical Implementation Metrics (Micro Success)**

We translate the 5-tier framework into the Tactical (Micro) layer. This measures the efficiency of the design itself.

* **North Star Metric**: The core task completion of the feature.
* **Key Metrics**: The conversion success of the feature.
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
