---
title: "Product Development & Testing"
order: 6
estimatedTime: 12
quiz: true
description: "The execution phase: building and testing the solution."
---

# Product Development & Testing Phase

## Entrance Criteria

::::present
### The Development Gate
Prerequisites for the "First Line of Code."

* **Sprint Commitment**: The weighted backlog is locked (Module 5).
* **Tech Readiness**: API contracts and Schemas are signed off.
* **Environment Setup**: Staging/Dev environments are live.
* **DoR Check**: Every story has its "Visual Proof" and "Gherkin AC."

> [!WARNING]
> **Coding without an API contract** leads to massive integration rework. Never skip the Technical Handshake.
::::

Before initiating the Product Development phase, the following must be present:

* **Sprint Commitment**: The squad has formally committed to a weighted backlog and a clear Sprint Goal in Module 5.
* **Technical Readiness**: System flows, API contracts, and database schemas are finalized.
* **Environment Setup**: Development and Staging environments are provisioned and accessible.
* **Definition of Ready (DoR)**: Every story in the sprint meets the DoR standards (Gherkin AC, Designs, etc.).

## Lead Roles & Squad

::::present
### The Build Squad
Engineering takes the wheel; the PM ensures the compass is set.

* **Primary Driver**: **Engineering Lead / Tech Lead**.
* **Support Squad:**
  * **Dev Squad**: Frontend, Backend, & Mobile.
  * **QA Lead**: Guards the "Definition of Done."
  * **Product Manager**: Clarifies logic and edge cases.
  * **Product Designer**: Conducts Design QA.
::::

* **Primary Driver**: Engineering Lead / Tech Lead.
* **Support Squad**: Frontend/Mobile Developers, Backend Developers, QA Engineers, Product Manager (for logic clarification), and UI/UX Designer (for design QA).

## Key Activities

### Step 1: Product Development (Execution)

::::present
### Step 1: Execution Protocols
Maintaining alignment during the "Black Box" of coding.

* **Clean Coding**: Implementation driven by **Gherkin ACs**.
* **Daily Sync**: Surface blockers, not just status.
* **Continuous Logic Check**: PM/Design/Dev huddles as edge cases appear.

> [!TIP]
> **The 1-Hour Rule:** If a developer is stuck on a logic gap for more than 1 hour, call an immediate 15-minute sync with the PM.
::::

This is the phase where the blueprints from the Solution Design and Planning phases are transformed into functional code.

* **Clean Coding**: Developers implement features according to the Gherkin Acceptance Criteria.
* **Daily Synchronization**: Brief alignment on progress and immediate blockers.
* **Continuous Problem Solving**: Ongoing discussions between PM, Design, and Dev to resolve technical hurdles or logic edge cases discovered during the coding process.

### Step 2: Internal Testing & Quality Assurance

::::present
### Step 2: The Testing Layers
From individual modules to holistic journeys.

* **Developer Testing**: Unit & Integration checks.
* **?[Functional QA](Testing individual features in isolation to ensure they meet their specific Acceptance Criteria.)**: Per-feature validation.
* **?[Regression Testing](The practice of re-testing the entire system to ensure new changes haven't broken existing features.)**: Ensuring no side effects.

> [!IMPORTANT]
> **QA is the Guardian of Quality.** A feature isn't "Done" when the code is written; it's "Done" when it passes the ACs on Staging.
::::

Validation performed within the technical squad to ensure the build is stable and meets technical specifications. This process is divided into focused feature validation and holistic system verification.

* **Developer Testing (Unit/Integration)**: Verification of individual code modules by the engineering team.
* **Per-Feature Testing (Functional QA)**: Testing the specific logic, UI, and Gherkin Acceptance Criteria of individual user stories as they are completed. This ensures each feature works in isolation according to the PRD.
* **Full-cycle Testing (End-to-End)**: Conducted at the end of the project or release cycle. A comprehensive deep-dive into the entire business process. It verifies that new changes haven't introduced bugs anywhere else in the system (Regression), covering all edge cases and integration points defined in the System Flows.

### Step 3: User Acceptance Testing (UAT)

Formal validation from a business and end-user perspective to ensure the solution aligns with the "Proof of Pain."

* **End-User Testing**: Representative users validate the feature in a staging environment.
* **Video Testing/Recording**: Capturing sessions to identify "hidden" friction points or UI misunderstandings that weren't caught during prototypes.
* **Azure DevOps Synchronization**: Updating story status, attaching test evidence (videos/screenshots), and closing items once accepted.

### Step 4: Production Testing (Sanity Check)

Final verification after the code has been deployed to the live environment.

* **Closed Environment Testing**: Testing in production using "test accounts" or behind a feature flag.
* **Smoke Testing (Sanity Check)**: A rapid verification of core paths (e.g., Login, Checkout, Upload) to ensure the environment is stable. If the "Smoke" fails, the release is rolled back immediately.

#### Technical Deep-Dive: Smoke vs. Full-Cycle Testing

| **Feature**   | **Smoke Testing**                           | **Full-Cycle Testing**                         |
| ------------- | ------------------------------------------- | ---------------------------------------------- |
| **Objective** | Verify critical function stability.         | Comprehensive end-to-end verification.         |
| **Scope**     | Narrow/Shallow (Happy Path).                | Broad/Deep (Edge cases & Integrations).        |
| **When?**     | Right after deployment/before deep testing. | At the end of the project; the final QA phase. |
| **Duration**  | Very fast (Minutes).                        | Time-consuming (Hours/Days).                   |
| **Result**    | Immediate build rejection if failed.        | Defects logged for systematic fixing.          |

### Step 3: User Acceptance Testing (UAT)

::::present
### Step 3: Stakeholder Validation
The final business handshake.

* **End-User Testing**: Real users (or proxies) validate on Staging.
* **Video Evidence**: Capture sessions with tools like Loom.
* **Sync to Dev**: Updates status and evidence in Azure DevOps.

> [!TIP]
> **Video is Truth.** If a stakeholder finds a bug during UAT, a 30-second screen recording is worth 1,000 words.
::::

Formal validation from a business and end-user perspective to ensure the solution aligns with the "Proof of Pain."

* **End-User Testing**: Representative users validate the feature in a staging environment.
* **Video Testing/Recording**: Capturing sessions to identify "hidden" friction points or UI misunderstandings that weren't caught during prototypes.
* **Azure DevOps Synchronization**: Updating story status, attaching test evidence (videos/screenshots), and closing items once accepted.

### Step 4: Production Testing (Sanity Check)

::::present
### Step 4: Live Environment Sanity
Verifying in the "Real World" without impacting the masses.

:::col
#### Closed Testing**
* Use "Test Accounts."
* Verify behind a feature flag.
* Internal-only rollout.
:::
:::col
#### Smoke Check**
* Rapid core path test.
* Success = **Launch.**
* Failure = **Rollback.**
:::

> [!CAUTION]
> Never "Launch and Leave." The first 30 minutes after a production release are the most critical.
::::

Final verification after the code has been deployed to the live environment.

* **Closed Environment Testing**: Testing in production using "test accounts" or behind a feature flag.
* **Smoke Testing (Sanity Check)**: A rapid verification of core paths (e.g., Login, Checkout, Upload) to ensure the environment is stable. If the "Smoke" fails, the release is rolled back immediately.

## Rituals & Syncs

::::present
### Delivery Rituals
The routine that prevents "Invisible Failure."

* **Daily Standup**: Yesterday, Today, & **Blockers**.
* **Bug Triage**: Ranking defects (P0/P1) with the PM.
* **UAT Sign-off**: The final "Go/No-Go" decision.

| Importance | Bug Level | Resolution |
| :--- | :--- | :--- |
| **Critical** | **P0 / P1** | **Blocker.** Must fix before Go-live. |
| **Medium** | **P2** | Fix during Hyper-care. |
::::

* **Daily Standup**: 15-minute daily sync (Yesterday, Today, Blockers).
* **Bug Triage**: Prioritizing defects (P0/P1/P2) between PM, Dev, and QA.
* **UAT Sign-off**: Formal stakeholder review and decision to "Go/No-Go."

## Tools & Templates

::::present
### The QA Tech Stack
Standardizing the verification environment.

* **Management**: Jira / Azure DevOps.
* **API Testing**: Postman.
* **Automation**: Selenium / Playwright.
* **Evidence**: Loom / Zoom / Sentry.

> [!NOTE]
> **Evidence is Mandatory.** Every "Done" story should have a screen recording or screenshot attached as proof of validation.
::::

* **Task & Bug Tracking**: Azure DevOps, Jira.
* **Testing Tools**: Postman (API), Selenium, TestRail.
* **UAT**: Loom/Zoom for video recordings, UAT Feedback Log.

## Deliverables

* **QA Test Report**: Documented pass/fail results for Per-feature, Full-cycle, and Smoke tests.
* **UAT Sign-off Document**: Formal business acceptance.
* **Updated Azure DevOps**: All stories/tasks moved to "Done" with attached evidence.

## Common Pitfalls (Anti-patterns)

::::present
### Common Pitfalls
What slows down or breaks the delivery engine.

* **Siloed Coding**: PM doesn't see progress until it's "Done."
* **Happy Path Bias**: QA only testing what works, not what breaks.
* **Staging Drift**: Staging data doesn't match Production reality.
* **Vague Bugs**: "It doesn't work" without steps or records.

> [!WARNING]
> **Silos are the enemy of Speed.** Keep the feedback loop tight between PM and Dev.
::::

* **Developing in Silos**: Coding without squad communication, leading to logic drift.
* **Happy Path Bias**: QA failing to test negative scenarios and edge cases.
* **"Works on my Machine"**: Relying on local environments instead of standardized staging.

## Exit Criteria (The Gate)

::::present
### Exit Criteria: The Build Gate
Final checklist before Moving to Launch (Module 7).

* **All Gherkin ACs Passed** (isolation & E2E).
* **UAT Signed-off** with stakeholders.
* **Zero P0 or P1 Bugs** remaining.
* **Successful Production Smoke** in closed env.

> [!IMPORTANT]
> **Quality is Not Negotiable.** If a P0 bug exists, the project stays in product development and testing phase. No shortcuts.
::::

* **All Gherkin Acceptance Criteria** passed by QA (Per-feature and Full-cycle).
* **UAT completed and signed off** with attached video evidence.
* **Zero P0 or P1 bugs** remaining in the release candidate.
* **Successful Production Smoke Test** in a closed environment.
