# Module 6: Product Development & Testing

## 6.1 Entrance Criteria

Before initiating the Product Development phase, the following must be present:

* Sprint Commitment: The squad has formally committed to a weighted backlog and a clear Sprint Goal in Module 5.
* Technical Readiness: System flows, API contracts, and database schemas are finalized.
* Environment Setup: Development and Staging environments are provisioned and accessible.
* Definition of Ready (DoR): Every story in the sprint meets the DoR standards (Gherkin AC, Designs, etc.).

## **6.2 Lead Roles & Squad**

* Primary Driver: Engineering Lead / Tech Lead.
* Support Squad: Frontend/Mobile Developers, Backend Developers, QA Engineers, Product Manager (for logic clarification), and UI/UX Designer (for design QA).

## **6.3 Key Activities**

### **Step 1: Product Development (Execution)**

This is the phase where the blueprints from the Solution Design and Planning phases are transformed into functional code.

* Clean Coding: Developers implement features according to the Gherkin Acceptance Criteria.
* Daily Synchronization: Brief alignment on progress and immediate blockers.
* Continuous Problem Solving: Ongoing discussions between PM, Design, and Dev to resolve technical hurdles or logic edge cases discovered during the coding process.

### **Step 2: Internal Testing & Quality Assurance**

Validation performed within the technical squad to ensure the build is stable and meets technical specifications. This process is divided into focused feature validation and holistic system verification.

* Developer Testing (Unit/Integration): Verification of individual code modules by the engineering team.
* Per-Feature Testing (Functional QA): Testing the specific logic, UI, and Gherkin Acceptance Criteria of individual user stories as they are completed. This ensures each feature works in isolation according to the PRD.
* Full-cycle Testing (End-to-End): Conducted at the end of the project or release cycle. A comprehensive deep-dive into the entire business process. It verifies that new changes haven't introduced bugs anywhere else in the system (Regression), covering all edge cases and integration points defined in the System Flows.

### **Step 3: User Acceptance Testing (UAT)**

Formal validation from a business and end-user perspective to ensure the solution aligns with the "Proof of Pain."

* End-User Testing: Representative users validate the feature in a staging environment.
* Video Testing/Recording: Capturing sessions to identify "hidden" friction points or UI misunderstandings that weren't caught during prototypes.
* Azure DevOps Synchronization: Updating story status, attaching test evidence (videos/screenshots), and closing items once accepted.

### **Step 4: Production Testing (Sanity Check)**

Final verification after the code has been deployed to the live environment.

* Closed Environment Testing: Testing in production using "test accounts" or behind a feature flag.
* Smoke Testing (Sanity Check): A rapid verification of core paths (e.g., Login, Checkout, Upload) to ensure the environment is stable. If the "Smoke" fails, the release is rolled back immediately.

#### **Technical Deep-Dive: Smoke vs. Full-Cycle Testing**

| **Feature**   | **Smoke Testing**                           | **Full-Cycle Testing**                         |
| ------------- | ------------------------------------------- | ---------------------------------------------- |
| **Objective** | Verify critical function stability.         | Comprehensive end-to-end verification.         |
| **Scope**     | Narrow/Shallow (Happy Path).                | Broad/Deep (Edge cases & Integrations).        |
| **When?**     | Right after deployment/before deep testing. | At the end of the project; the final QA phase. |
| **Duration**  | Very fast (Minutes).                        | Time-consuming (Hours/Days).                   |
| **Result**    | Immediate build rejection if failed.        | Defects logged for systematic fixing.          |

## **6.4 Rituals & Syncs**

* Daily Standup: 15-minute daily sync (Yesterday, Today, Blockers).
* Bug Triage: Prioritizing defects (P0/P1/P2) between PM, Dev, and QA.
* UAT Sign-off: Formal stakeholder review and decision to "Go/No-Go."

## **6.5 Tools & Templates**

* Task & Bug Tracking: Azure DevOps, Jira.
* Testing Tools: Postman (API), Selenium, TestRail.
* UAT: Loom/Zoom for video recordings, UAT Feedback Log.

## **6.6 Deliverables**

* QA Test Report: Documented pass/fail results for Per-feature, Full-cycle, and Smoke tests.
* UAT Sign-off Document: Formal business acceptance.
* Updated Azure DevOps: All stories/tasks moved to "Done" with attached evidence.

## **6.7 Common Pitfalls (Anti-patterns)**

* Developing in Silos: Coding without squad communication, leading to logic drift.
* Happy Path Bias: QA failing to test negative scenarios and edge cases.
* "Works on my Machine": Relying on local environments instead of standardized staging.

## **6.8 Exit Criteria (The Gate)**

* [ ] All Gherkin Acceptance Criteria passed by QA (Per-feature and Full-cycle).
* [ ] UAT completed and signed off with attached video evidence.
* [ ] Zero P0 or P1 bugs remaining in the release candidate.
* [ ] Successful Production Smoke Test in a closed environment.
