---
title: "Launch & Go-To-Market"
order: 7
estimatedTime: 10
quiz: true
description: "Readying the organization and the market for the new release."
quizQuestions:
  - id: "launch-q1"
    question: "Why should you never launch on a Friday?"
    options:
      - "It's bad luck"
      - "To ensure the squad is available for at least 48 hours of post-launch monitoring"
      - "Users don't use products on weekends"
      - "Marketing campaigns don't work on Fridays"
    correctIndex: 1
    explanation: "Never launch on a Friday to ensure the squad is available for at least 48 hours of post-launch stability monitoring and quick issue resolution."

  - id: "launch-q2"
    question: "What is an NPI (New Product Introduction)?"
    options:
      - "A new pricing index"
      - "The internal 'Source of Truth' deck explaining the problem, solution, and rollout"
      - "A new product inventory system"
      - "A marketing campaign"
    correctIndex: 1
    explanation: "NPI is the definitive internal deck that explains the problem, solution, roadmap, and success metrics to the entire company—the 'Source of Truth.'"

  - id: "launch-q3"
    question: "What is the difference between a Soft Launch and a Big Bang launch?"
    options:
      - "Soft Launch is quieter, Big Bang is louder"
      - "Soft Launch targets a limited segment first; Big Bang releases to everyone at once"
      - "Soft Launch is for mobile, Big Bang is for web"
      - "They are the same thing"
    correctIndex: 1
    explanation: "Soft Launch releases to a limited segment first for validation and monitoring. Big Bang releases to everyone at once, which is riskier for complex features."

  - id: "launch-q4"
    question: "What is 'Settlement Readiness'?"
    options:
      - "Preparing the office for launch party"
      - "Ensuring Finance can bill users and reconcile payments"
      - "Settling disputes with competitors"
      - "Finalizing legal agreements"
    correctIndex: 1
    explanation: "Settlement Readiness ensures Finance/Accounting have the reports and logic needed for billing, payouts, or tax invoicing. If users can pay but Finance can't reconcile, the product is a liability."

  - id: "launch-q5"
    question: "What is an LRR (Launch Readiness Review)?"
    options:
      - "A post-launch retrospective"
      - "A mandatory 'Go/No-Go' meeting held 48 hours before launch"
      - "A legal review"
      - "A revenue report"
    correctIndex: 1
    explanation: "LRR is a mandatory 'Go/No-Go' meeting held 48 hours before launch with all key stakeholders to verify readiness and make the final decision."

  - id: "launch-q6"
    question: "What is the 'Support Gap'?"
    options:
      - "A gap in customer support hours"
      - "Launching without CS guides, resulting in agents learning about features from users"
      - "Missing support tickets"
      - "A technical bug"
    correctIndex: 1
    explanation: "The Support Gap occurs when CS agents aren't trained on new features before launch, learning about them from confused users—fatal for trust."

  - id: "launch-q7"
    question: "What is 'Sales Enablement'?"
    options:
      - "Hiring more salespeople"
      - "Creating demo environments, scripts, and training so Sales can effectively sell the product"
      - "Enabling online sales"
      - "Sales automation tools"
    correctIndex: 1
    explanation: "Sales Enablement provides the Sales team with demo environments, scripts, training, and materials so they can effectively demonstrate and sell the product."

  - id: "launch-q8"
    question: "What is a 'Value Proposition'?"
    options:
      - "The price of the product"
      - "Translating 'Features' (what it does) into 'Outcomes' (how it helps users)"
      - "A business proposal"
      - "A marketing slogan"
    correctIndex: 1
    explanation: "Value Proposition translates technical features into user outcomes—not 'We built a CSV uploader' but 'Save 10 hours per week on manual data entry.'"

  - id: "launch-q9"
    question: "What is a 'Launch War Room'?"
    options:
      - "A physical room for launch parties"
      - "High-frequency sync on launch day to monitor stability and initial feedback"
      - "A conflict resolution meeting"
      - "A competitive analysis session"
    correctIndex: 1
    explanation: "Launch War Room is a high-frequency sync on launch day where the team monitors stability, user feedback, and quickly addresses any issues in real-time."

  - id: "launch-q10"
    question: "What is the 'Billing Blackhole' pitfall?"
    options:
      - "Users not paying their bills"
      - "Launching a paid feature before Finance can reconcile payments"
      - "Missing billing addresses"
      - "Incorrect pricing"
    correctIndex: 1
    explanation: "The Billing Blackhole happens when Marketing launches a paid feature (like Insurance) before Finance has the reports and systems to reconcile the payments."

  - id: "launch-q11"
    question: "Why is 'Demo with Realism' important for Sales?"
    options:
      - "It looks more professional"
      - "Never give Sales a broken staging account—ensure the demo reflects the true user experience"
      - "It's required by law"
      - "It saves time"
    correctIndex: 1
    explanation: "Demo environments must be clean and reflect the true user experience. A broken staging account undermines Sales credibility and confuses prospects."

  - id: "launch-q12"
    question: "What should be defined as 'Success and Failure Gates' for launch?"
    options:
      - "Revenue targets only"
      - "Quantifiable metrics for the first 30 days (e.g., adoption rate vs. support ticket spike)"
      - "Number of users"
      - "Marketing impressions"
    correctIndex: 1
    explanation: "Define quantifiable success/failure metrics for the first 30 days (e.g., 'Success = 20% adoption, Failure = 50+ P1 support tickets') to objectively measure launch performance."
---

# Launch & Go-to Market Phase

## Entrance Criteria

::::present
### The Launch Gate
Mandatory prerequisites before the "Big Bang."

* **UAT Sign-off**: Stakeholders have approved the build (Module 6).
* **Production Stability**: Smoke tests passed in the live environment.
* **Documentation Locked**: PRDs and Tech Specs are archived.
* **Internal Briefing**: Initial heads-up given to Sales and Ops.

> [!WARNING]
> **Never launch on a Friday.** Ensure the squad is available for at least 48 hours of post-launch stability monitoring.
::::

Before initiating the Launch & GTM phase, the following must be present:

* **UAT Sign-off**: Formal business and user acceptance from Module 6 is secured.
* **Production Stability**: The build has passed the "Closed Environment" smoke test in the production environment.
* **Documentation Readiness**: Final versions of the PRD and technical specs are archived.
* **Internal Stakeholder Briefing**: Initial heads-up provided to Sales, CS, and Ops teams regarding the launch window.

## Lead Roles & Squad

::::present
### The GTM Squad
Marketing drives the "Volume," PM drives the "Truth."

* **Primary Drivers**: **Marketing / GTM Lead** & **Product Manager**.
* **Support Squad:**
  * **Product Designer**: Marketing assets & UI Polish.
  * **Sales Team**: B2B Lead generation & Demos.
  * **CS Lead**: Support guides & FAQ.
  * **Finance**: Settlement & Payout logic.
::::

* **Primary Driver**: Marketing / GTM Lead (for external strategy) & Product Manager (for internal product knowledge).
* **Support Squad**: Product Designer (for marketing assets), PR/Newsroom Team, Sales Team, Customer Support (CS) Lead, and Finance/Accounting (for settlement-heavy products).

## Key Activities

### Step 1: GTM Strategy & Launch Plan Development

::::present
### Step 1: GTM Strategy
The "How to Win" in the market.

* **Segmentation**: Who is this for? (Pro users vs. B2B).
* **Value Prop**: Translating "Features" into "Outcomes."
* **?[Commercial Mechanisms](The specific financial structures like pricing models, subscription fees, or insurance premium logic.)**: Finalizing pricing & fees.
* **Settlement Readiness**: Ensuring Finance can actually bill & payout.

> [!IMPORTANT]
> **Settlement is Critical.** If the user can pay but Finance can't reconcile the money, the product is a liability, not an asset.
::::

For PMs unfamiliar with GTM, this step is about translating the technical build into a marketable solution. This is where we define how we will acquire, retain, and support users.

* **Define GTM Strategy (The "How to Win"):**
  * **Target Market Segmentation**: Identify exactly who the feature is for
  * **Value Proposition Development**: Transitioning from "Features" (what it does) to "Outcomes" (how it helps).
  * **Commercial & Financial Mechanism**: 
    * **Pricing**: Finalizing subscription fees or insurance premiums.
    * **Settlement Readiness**: (Critical for PMs) Ensuring Finance/Accounting have the reports and logic needed for billing, insurance vendor payouts, or tax invoicing.
  * **Distribution & Discovery**: Defining the touchpoints (In-app banners, Direct Sales, or Email).

::::present
### Step 1: Launch Logistics
Preparing the organization's "Internal Source of Truth."

:::col
**?[NPI Protocol](New Product Introduction: The definitive internal deck that explains the problem, solution, and roadmap to the entire company.)**
* Problem/Solution summary.
* Roadmap visual.
* Success metrics.
:::
:::col
**Enablement**
* **Sales**: Demo accounts & Scripts.
* **CS**: Troubleshooting & FAQs.
* **Ops**: Hub Manager briefings.
:::

> [!TIP]
> **Demo with Realism.** Never give Sales a broken staging account. Ensure the demo environment is clean and reflects the true user experience.
::::

* **Define Launch Plan (The "Logistics"):**
  * **Material Development (The NPI)**: The PM leads the New Product Introduction (NPI) plan—the "Source of Truth" deck explaining the problem, solution, and rollout.
  * **Product Guidance & Training:**
    * **Internal**: Training for CS and Sales (Objection handling, FAQ).
    * **External**: Help center articles, written guides, and video tutorials.
  * **Sales Enablement**: Creating a "Demo Environment" or "Sales Script" so the Sales team can actually show the product to B2B clients without using real data.
  * **Success & Failure Gates**: Defining quantifiable metrics for the first 30 days (e.g., Adoption rate vs. Support ticket spike).

### Step 2: Product Launch Execution

::::present
### Step 2: Launch Execution
Turning on the engine and monitoring the results.

* **Release Strategy**: Soft Launch vs. Big Bang.
* **The Roadshow**: PM socializes the product logic to Sales/Ops.
* **Campaign Activation**: CleverTap/Braze push notifications.
* **PR & Support**: CMS updates and Troubleshooting live.

> [!NOTE]
> A **Soft Launch** (limited segment) is often safer for complex features like Bulk Uploads or Insurance.
::::

The tactical rollout of the code and the activation of the marketing engine.

* **Release to Production**: Moving code from "Closed Environment" to public (Soft Launch vs. Big Bang).
* **Stakeholder Socialization (The Roadshow)**: PM acts as the technical expert, ensuring Sales and Ops understand the product's logic.
* **Field Operations Readiness**: If a feature affects couriers (Satria) or Hub operations (e.g., a new Pro reward), ensure Hub Managers are briefed so they aren't surprised by new user behaviors.
* **Integrated Campaign Execution:**
  * **Outreach**: Activating CleverTap/Braze for Email, Social Media, and Push Notifications.
  * **In-App Tools**: Triggering promotional banners and feature tooltips.
* **PR & Support Activation**: Releasing newsroom updates and ensuring Customer Support is live with the new troubleshooting guides.

## Rituals & Syncs

::::present
### GTM Rituals
Maintaining synchronization during the pressure of launch.

* **?[LRR](Launch Readiness Review: A mandatory 'Go/No-Go' meeting held 48 hours before launch with all key stakeholders.)**: Mandatory 48h check.
* **GTM Alignment**: Weekly marketing/product sync.
* **Launch War Room**: Real-time status on Launch Day.

| Ritual | When | Goal |
| :--- | :--- | :--- |
| **LRR** | T-48h | Final Go/No-Go. |
| **War Room** | Launch Day | Stability & Fast Fix. |
::::

* **Launch Readiness Review (LRR)**: A mandatory "Go/No-Go" meeting 48 hours before launch.
* **GTM Alignment Sync**: Weekly meeting to ensure the Marketing message aligns with actual product capabilities.
* **Launch War Room**: High-frequency sync on launch day to monitor stability and initial feedback.

## Tools & Templates

::::present
### The GTM Stack
Standardizing the launch and communication environment.

* **CRM & Outreach**: CleverTap, Braze, Mailchimp.
* **Demonstration**: Loom (Video), Figma (Sales Decks).
* **Frameworks**: GTM Strategy & NPI Templates.

> [!NOTE]
> **The NPI is your Shield.** If Marketing promises a feature that doesn't exist, use the NPI as the source of truth to correct the narrative.
::::

* **Marketing & CRM**: CleverTap, Braze, Mailchimp.
* **Content & Training**: CMS for website, Loom/Zoom for video guides, Figma for sales decks.
* **Standard Templates**: GTM Strategy Template, New Product Introduction (NPI) Deck, Sales Demo Script.

## Deliverables

* **Final GTM Document**: Comprehensive strategy covering target market, value prop, and pricing.
* **NPI Presentation**: The finalized "Internal Source of Truth" deck.
* **Sales Enablement Kit**: Demo accounts, sales scripts, and one-pagers.
* **External Guides**: Library of written/video tutorials for the end-user.
* **Launch Metrics Dashboard**: Real-time tracking of success/failure criteria.

## Common Pitfalls (Anti-patterns)

::::present
### Common Pitfalls
Red flags that lead to "Internal Chaos" or "Market Rejection."

* **Billing Blackhole**: Marketing launches before Finance can bill.
* **Message Mismatch**: Promising features that were cut in MVP.
* **Support Gap**: CS agents learning about the feature from users.
* **Vague Success**: "Let's see what happens" (No Gates).

> [!CAUTION]
> **The Support Gap is fatal for Trust.** If a user calls CS and the agent is confused, you have already lost the customer.
::::

* **The Billing Blackhole**: Launching a paid feature (like Insurance) before Finance has the reports to reconcile the payments.
* **Marketing-Product Disconnect**: Promising features that were cut during the MVP stage.
* **The "Support Gap"**: Launching without a CS guide, resulting in overwhelmed agents.
* **Vague Metrics**: Not defining what "Failure" looks like.

## Exit Criteria (The Gate)

::::present
### Exit Criteria: The GTM Gate
Final checklist before moving to Post-Launch (Module 8).

* **Feature is LIVE** and functional for the segment.
* **NPI Shared** with all internal departments.
* **Financial Path Verified** (Settlement & Billing).
* **Help Content Active** (Guide/FAQ).

> [!IMPORTANT]
> **Launch is only the beginning.** The next 14 days of "Hyper-care" determine the long-term success of the feature.
::::

* **Feature is live and functional** for the target segment.
* **NPI deck has been presented** and shared with all internal departments.
* **Financial settlement and reporting paths are verified** as ready.
* **Marketing campaigns and support guides are active** and consistent.