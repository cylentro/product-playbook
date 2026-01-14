# **PDLC Special Guide | The AI-Augmented PM**

This guide codifies how the Product Team leverages Artificial Intelligence to transition from a "feature factory" to an outcome-driven squad. AI is our Co-pilot, not our replacement; it handles the synthesis so we can focus on decision-making.

## **1. The CASTR Prompting Framework**

To get high-fidelity results from models like Gemini or Claude, PMs must move beyond "simple chatting." We use the CASTR framework to ensure every prompt has the necessary structural integrity for professional product management.

| **Component**   | **Description**                                     | **General Example**                                                                                                  |
| --------------- | --------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------- |
| **C - Context** | The background, constraints, and "Proof of Pain."   | "We are updating a high-volume B2B portal. Currently, users struggle with manual data entry for 100+ daily entries." |
| **A - Act As**  | The specific persona or expert level required.      | "Act as a Senior UX Researcher and B2B SaaS specialist with 10 years of experience."                                 |
| **S - Step**    | The logical sequence for the AI to follow.          | "First, analyze the friction points. Second, propose a solution. Third, write the Gherkin Acceptance Criteria."      |
| **T - Task**    | The core objective or action item.                  | "Generate a comprehensive PRD section for a new 'Bulk Data Upload' feature with automated validation."               |
| **R - Result**  | The desired format, tone, and length of the output. | "Provide the output in a clean Markdown format with a table for Success Metrics and a bulleted list for AC."         |

## **2. Comparative Analysis: Good vs. Bad Prompts**

The difference between a "Bad" and "Good" prompt is the difference between getting a generic template and a usable, high-precision technical specification. A poor prompt often results in "hallucinated" logic that requires heavy manual editing, whereas a high-fidelity prompt provides an immediate operational artifact.

### **Example A: Defining Acceptance Criteria (Third-Party Integration)**

* ❌ Bad Prompt: "Write acceptance criteria for a payment toggle in a logistics app."
  * Consequence: You receive generic "The user can click the button" logic. It fails to account for critical business constraints, regional regulatory warnings, or technical timeout behaviors. This creates a "Logic Gap" where developers might build a feature that is technically functional but commercially non-compliant.
* ✅ Good Prompt (CASTR): "[C] We are building a multi-vendor financial aggregator for a retail application. We have a business rule where transactions over a certain value require a mandatory warning. [A] Act as a Senior QA Lead specializing in fintech. [T] Write Gherkin-style Acceptance Criteria for the opt-in toggle. [S] Include logic for auto-calculating service fees and handling vendor API timeouts. [R] Provide the result in a Markdown table."

### **Example B: User Research Synthesis (Loyalty Program)**

* ❌ Bad Prompt: "Summarize these customer reviews about our new reward tier."
  * Consequence: The result is a shallow list like "Users want more vouchers" or "The app is slow." These are observations, not insights. They do not help a PM decide whether to change the reward depth or the UI layout.
* ✅ Good Prompt (CASTR): "[C] I have 500 reviews from our highest-usage customer segment. The business goal is to increase the conversion rate to our premium tier. [A] Act as a Senior Product Researcher with a background in behavioral economics. [T] Identify the top 3 friction points preventing users from reaching the premium milestone. [S] Categorize feedback into 'Usability,' 'Motivation,' and 'Value Proposition.' [R] Provide a prioritized list with confidence scores."

## **3. Advanced Prompt Engineering Techniques**

### **A. Chain-of-Thought (CoT) Reasoning**

Instead of asking for a final answer, ask the AI to "think step-by-step." This significantly reduces logic errors in complex tasks like financial settlement or multi-layered business logic.

* Implication:* By forcing the AI to show its work, you can audit its logic for edge cases (e.g., rounding errors or permission gaps) before they become bugs.

### **B. Few-Shot Prompting (Examples)**

AI performs better when it sees what "good" looks like. Provide 1-2 examples of previous Gherkin AC or PRD sections within your prompt to maintain the team's standard of quality.

### **C. Using Delimiters**

Use clear separators (like ###, ---, or XML tags like <Context></Context>) to help the AI distinguish between instructions, examples, and the raw data (like CSV logs) it needs to process.

## **4. AI Integration Across the PDLC**

### **Phase 1 & 2: Discovery & Ideation**

* Stakeholder Simulation: Use AI to role-play difficult stakeholder conversations.
  * Action: "I am proposing a change to a core operational process. Act as a skeptical Finance Manager. Challenge my proposal based on audit risks and reconciliation complexity."
* Insight Synthesis: Upload large volumes of qualitative data—such as customer support comments—to identify recurring "Proof of Pain" themes without manual sorting.

### **Phase 3 & 4: Design & Planning**

* Technical Document Simplification: Use AI to summarize dense third-party API documentation or technical whitepapers.
  * Action: "Summarize this technical documentation. Focus specifically on error codes, authentication triggers, and data field requirements for our frontend."
* Gherkin AC Specialist: Translate business logic into robust "Given/When/Then" scenarios to ensure zero ambiguity for the Engineering team.
* UX Critique: Upload UI screenshots for an automated "AI Design Review" to evaluate visual hierarchy and micro-copy clarity before the formal squad review.

### **Phase 5 & 6: Development & GTM**

* Rapid Prototyping: Build small internal tools or mock-up complex logic using AI-generated code to prove feasibility to stakeholders early.
* SQL Query Generation: Act as your own data analyst by using AI to draft SQL queries for internal dashboards.
  * Action: "Write a SQL query to find the average usage frequency for users who opted-out of the new feature vs those who opted-in in the last 30 days."
* New Product Introduction (NPI) Support: Transform technical PRDs into persuasive internal slide decks or training materials for Sales and Operations teams.

### **Phase 7 & 8: Hyper-care & Experimentation**

* A/B Testing Hypothesis Generation: Generate variations for experiment titles, visual cues, and value proposition messaging based on specific friction data.
* Sentiment Monitoring: Upload post-launch feedback or online reviews to identify if a new release has shifted user sentiment or introduced new usability "pains."

## **5. The "Gemini Gem" Library (Standard Prompts)**

All PMs should have these "Gems" pre-configured using the CASTR logic:

| **Gem Name**          | **Strategic Focus**                                                                    |
| --------------------- | -------------------------------------------------------------------------------------- |
| **The PRD Architect** | Strategic Alignment: Pre-loaded with the 9-phase PDLC and organizational pillars.      |
| **Gherkin Master**    | Technical Precision: Tuned to output clean, dev-ready Gherkin blocks for Azure DevOps. |
| **The UX Critic**     | Design Excellence: Evaluates UI based on internal design systems and standard UX laws. |
| **Strategic Coach**   | Outcomes-Driven: Guides PMs through market research, pain extraction, and solutioning. |

## **6. Operational Guardrails**

1. Verification is Mandatory: AI can hallucinate logic. PMs are ultimately accountable for the accuracy of every word in the PRD and every logic gate in the code.
2. Privacy First: NEVER upload PII (Personal Identifiable Information) or sensitive raw financial spreadsheets to public AI models.
3. Outcome Ownership: AI is the ghostwriter; the Product Manager is the Author and owns the business impact.

external source:
https://bychris.me/courses/prompting-101/