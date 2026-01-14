# Module 7: Launch & GTM

## 7.1 Entrance Criteria

Before initiating the Launch & GTM phase, the following must be present:

* UAT Sign-off: Formal business and user acceptance from Module 6 is secured.
* Production Stability: The build has passed the "Closed Environment" smoke test in the production environment.
* Documentation Readiness: Final versions of the PRD and technical specs are archived.
* Internal Stakeholder Briefing: Initial heads-up provided to Sales, CS, and Ops teams regarding the launch window.

## **7.2 Lead Roles & Squad**

* Primary Driver: Marketing / GTM Lead (for external strategy) & Product Manager (for internal product knowledge).
* Support Squad: Product Designer (for marketing assets), PR/Newsroom Team, Sales Team, Customer Support (CS) Lead, and Finance/Accounting (for settlement-heavy products).

## **7.3 Key Activities**

### **Step 1: GTM Strategy & Launch Plan Development**

For PMs unfamiliar with GTM, this step is about translating the technical build into a marketable solution. This is where we define how we will acquire, retain, and support users.

* **Define GTM Strategy (The "How to Win"):**
  * Target Market Segmentation: Identify exactly who the feature is for (e.g., Anteraja Pro power users vs. new Biza B2B clients).
  * Value Proposition Development: Transitioning from "Features" (what it does) to "Outcomes" (how it helps).
  * Commercial & Financial Mechanism: * Pricing: Finalizing subscription fees or insurance premiums.
    * Settlement Readiness: (Critical for PMs) Ensuring Finance/Accounting have the reports and logic needed for billing, insurance vendor payouts, or tax invoicing.
  * Distribution & Discovery: Defining the touchpoints (In-app banners, Direct Sales, or Email).
* **Define Launch Plan (The "Logistics"):**
  * Material Development (The NPI): The PM leads the New Product Introduction (NPI) plan—the "Source of Truth" deck explaining the problem, solution, and rollout.
  * **Product Guidance & Training:**
    * Internal: Training for CS and Sales (Objection handling, FAQ).
    * External: Help center articles, written guides, and video tutorials.
  * Sales Enablement: Creating a "Demo Environment" or "Sales Script" so the Sales team can actually show the product to B2B clients without using real data.
  * Success & Failure Gates: Defining quantifiable metrics for the first 30 days (e.g., Adoption rate vs. Support ticket spike).

### **Step 2: Product Launch Execution**

The tactical rollout of the code and the activation of the marketing engine.

* Release to Production: Moving code from "Closed Environment" to public (Soft Launch vs. Big Bang).
* Stakeholder Socialization (The Roadshow): PM acts as the technical expert, ensuring Sales and Ops understand the product's logic.
* Field Operations Readiness: If a feature affects couriers (Satria) or Hub operations (e.g., a new Pro reward), ensure Hub Managers are briefed so they aren't surprised by new user behaviors.
* **Integrated Campaign Execution:**
  * Outreach: Activating CleverTap/Braze for Email, Social Media, and Push Notifications.
  * In-App Tools: Triggering promotional banners and feature tooltips.
* PR & Support Activation: Releasing newsroom updates and ensuring Customer Support is live with the new troubleshooting guides.

## **7.4 Rituals & Syncs**

* Launch Readiness Review (LRR): A mandatory "Go/No-Go" meeting 48 hours before launch.
* GTM Alignment Sync: Weekly meeting to ensure the Marketing message aligns with actual product capabilities.
* Launch War Room: High-frequency sync on launch day to monitor stability and initial feedback.

## **7.5 Tools & Templates**

* Marketing & CRM: CleverTap, Braze, Mailchimp.
* Content & Training: CMS for website, Loom/Zoom for video guides, Figma for sales decks.
* Standard Templates: GTM Strategy Template, New Product Introduction (NPI) Deck, Sales Demo Script.

## **7.6 Deliverables**

* Final GTM Document: Comprehensive strategy covering target market, value prop, and pricing.
* NPI Presentation: The finalized "Internal Source of Truth" deck.
* Sales Enablement Kit: Demo accounts, sales scripts, and one-pagers.
* External Guides: Library of written/video tutorials for the end-user.
* Launch Metrics Dashboard: Real-time tracking of success/failure criteria.

## **7.7 Common Pitfalls (Anti-patterns)**

* The Billing Blackhole: Launching a paid feature (like Insurance) before Finance has the reports to reconcile the payments.
* Marketing-Product Disconnect: Promising features that were cut during the MVP stage.
* The "Support Gap": Launching without a CS guide, resulting in overwhelmed agents.
* Vague Metrics: Not defining what "Failure" looks like.

## **7.8 Exit Criteria (The Gate)**

* Feature is live and functional for the target segment.
* NPI deck has been presented and shared with all internal departments.
* Financial settlement and reporting paths are verified as ready.
* Marketing campaigns and support guides are active and consistent.