---
title: "Hyper-Care & Stability"
order: 8
estimatedTime: 8
quiz: true
description: "Monitoring early performance and ensuring technical stability post-launch."
---

# Module 8: Post-Launch Hyper-care & Monitoring

## Entrance Criteria

::::present
### The Post-Launch Gate
Confirmation that the "Bird has left the nest."

* **Feature is LIVE**: Accessible to the target segment (Module 7).
* **Tracking Active**: Mixpanel/CleverTap events are verified.
* **Support Ready**: Escalation paths and guides are in place.
* **Sanity Passed**: Production sanity checks are cleared.

> [!CAUTION]
> **Flying Blind is Fatal.** If your metrics instrumentation isn't reporting on Day 1, treat it as a P0 blocker and resolve immediately.
::::

Before initiating the Post-Launch Hyper-care phase, the following must be present:

* **Successful Production Launch**: The feature is live and accessible to the target segment defined in Module 7.
* **Metrics Instrumentation**: Tracking events (Mixpanel, CleverTap, etc.) are verified and reporting data.
* **Support Readiness**: Customer Support (CS) and Operations are equipped with guides and an escalation path.
* **Closed Environment Success**: Sanity checks in production have been cleared.

## Lead Roles & Squad

::::present
### The Hyper-care Squad
Rapid response and data synthesis.

* **Primary Driver**: **Product Manager (PM)**.
* **Support Squad:**
  * **Engineering**: Rapid hot-fixes and triage.
  * **Data Analyst**: Daily KPI "Health Checks."
  * **CS Lead**: Feedback aggregation & ticket trends.
  * **Designer**: Immediate UX friction fixes.
::::

* **Primary Driver**: Product Manager (PM).
* **Support Squad**: Engineering (for rapid bug fixing), Data Analyst (for KPI monitoring), Customer Support Lead (for feedback aggregation), and Product Designer (for identifying immediate UX friction).

## Key Activities

### Step 1: Technical Hyper-care (Days 0–14)

::::present
### Step 1: Stability First
The first 14 days focus on the "Machine."

* **?[Real-time Error Monitoring](Tracking crash rates, API failures, and 5xx errors via tools like Sentry or Firebase Crashlytics.)**: Spotting crashes before users call.
* **Daily Hyper-care Standup**: Morning triage for live bugs.
* **Operational Hot-fixes**: Resolving blockers that halt the user journey.

> [!TIP]
> **P0 Priority:** If a bug prevents a user from finishing a transaction (e.g., Insurance Checkout), fix it within **4 hours**.
::::

**Focus**: Stability. The immediate focus is on system reliability.

* **Real-time Error Monitoring**: Tracking crash rates, API failures, and latency spikes.
* **Rapid Bug Triage**: Daily morning standups to fix "Live" bugs discovered by real users.
* **Operational Hot-fixes**: Addressing critical roadblocks (e.g., a broken "Submit" button in the Insurance flow).

### Step 2: Product Monitoring & Feedback (Days 0–30)

::::present
### Step 2: Adoption Monitoring
Verifying the "Efficiency" of the design.

:::cols
:::col
#### Quantitative (What)**
* **Funnel Drop-offs**: Where do users stop?
* **?[CSAT / NPS](Customer Satisfaction and Net Promoter Score: Triggering in-app surveys to measure user sentiment.)**: Triggered post-action.
* **Leading Indicators**: Are CTRs moving?
:::col
#### Qualitative (Why)**
* **?[IDI](In-Depth Interviews: 1-on-1 sessions with early adopters to dig into 'Why' they use or skip a feature.)**: 1-on-1 sessions.
* **Support Logs**: Recurring confusion themes.
* **App Reviews**: High-level sentiment.
:::
:::
::::

Focus: Adoption. Using a multi-channel approach to verify if the design is effective.

| **Monitoring Method**         | **Purpose & Application**                                                        |
| ----------------------------- | -------------------------------------------------------------------------------- |
| **Customer Behavioral Data**  | Tracking funnel drop-offs (e.g., where users stop in a certain flow). |
| **Metrics & KPI Analysis**    | Checking if Leading Indicators (CTR) are moving.                                 |
| **CSAT & NPS Surveys**        | Triggering in-app surveys after a task is completed.                             |
| **In-depth Interviews (IDI)** | 1-on-1 sessions with early adopters to understand the "Why."                     |
| **Customer Service Logs**     | Analyzing tickets to identify recurring confusion points.                        |

### Step 3: Outcome Validation (Days 30–90)

::::present
### Step 3: Maturity & Cycles
Extending the watch to match the business reality.

* **?[The 30-Day Mirage](The false assumption that initial success at Day 30 equals long-term success, ignoring retention or quarterly cycles.)**: Initial results can be deceptive.
* **Seasonal Normalization**: Monitoring through peaks (e.g., **?[Harbolnas](Hari Belanja Online Nasional: Indonesia's version of Single's Day/Black Friday, causing massive logistics stress.)**).
* **Retention Logic**: Capturing the *second* and *third* interaction to prove value.

> [!IMPORTANT]
> **Example:** You cannot judge **VIP** at Day 30. You must wait for the **Full Quarter** to see who actually ships 60 items.
::::

**Focus**: Maturity. For VIPducts, we must extend monitoring to match the business cycle.

* **Quarterly Cycle Check (VIP)**: Since the rule is "60 orders in 1 quarter," you cannot validate success at Day 30. You must monitor Month 2 and Month 3 to see if "Leads" actually convert to "Pro Status."
* **B2B Retention**: B2B users may only ship in bulk once a month. Day 30 only captures the first interaction; Day 60-90 captures the Retention Rate.
* **Seasonal Normalization**: Logistics performance varies (e.g., Harbolnas vs. normal days). Monitoring must span at least one peak cycle to ensure the solution holds up under stress.

## Rituals & Syncs

::::present
### Post-Launch Rituals
Maintaining the "Heartbeat" of the new feature.

* **Hyper-care Standup**: Daily 15-min blocker sync (Dev + CS).
* **Weekly Performance Review**: Initial trends with Leadership.
* **?[MBR](Monthly Business Review: A strategic session to present Month 1 findings and decide on roadmap optimizations.)**: Deciding on the "Optimization Backlog."

| Ritual | Who | Frequency |
| :--- | :--- | :--- |
| **Standup** | Squad + CS | Daily (Day 0-14). |
| **MBR** | PM + stakeholders | Monthly. |
::::

* **Daily Hyper-care Standup (Days 0-14)**: 15-minute sync with Dev/CS for bug resolution.
* **Weekly Performance Review (Month 1)**: Reviewing behavioral data and initial trends with leadership.
* **Monthly Business Review (MBR)**: Presenting the "Maturity" data (Day 60/90) to confirm if the business outcome was met.

## Tools & Templates

::::present
### The Hyper-care Stack
Standardizing the monitoring environment.

* **Quantitative**: Mixpanel, Firebase, Looker.
* **Qualitative**: Zendesk, Appbot, Maze.
* **Reporting**: 30/60/90 Day Analysis Decks.

> [!NOTE]
> **The Analysis Deck** is your primary tool for securing the next round of investment or justifying an optimization pivot.
::::

* **Monitoring**: Mixpanel, Firebase Crashlytics, Looker/Tableau.
* **Feedback**: Zendesk, Appbot (Review mining), Maze (for post-launch testing).
* **Standard Templates**: Hyper-care Status Report, Post-Launch Analysis Deck (30/60/90 Day version).

## Deliverables

* **Hyper-care Status Report**: Weekly summary of technical health.
* **Post-Launch Performance Analysis**: Comparison of actual KPIs against Success/Failure Gates at Day 30 AND Day 90.
* **Optimization Backlog**: "Fast-follow" improvements based on early friction.

## Common Pitfalls (Anti-patterns)

::::present
### Common Pitfalls
What kills the long-term impact of a great launch.

* **Launch & Forget**: Reassigning the squad at Day 1.
* **Metric Myopia**: Ignoring Support tickets because "Usage is up."
* **Cycle Ignorance**: Not verifying the retention in B2B/Pro cycles.
* **No "Scale" Plan**: Success happens, but the system can't take 10x load.

> [!CAUTION]
> **Usage ≠ Success.** Usage can be driven by a one-time promo; **Outcome** is driven by recurring behavior.
::::

* **The "30-Day Mirage"**: Assuming a feature is successful at Day 30 when the user hasn't completed their first full business cycle (e.g., Pro Quarter).
* **Launch & Forget**: Reassigning the squad immediately, leaving the feature without a dedicated "fixer" for Month 2.
* **KPI Cherry-picking**: Ignoring a spike in support tickets because "Usage is up."

## Exit Criteria (The Gate)

::::present
### Exit Criteria: The Maturity Gate
Final checklist before moving to Growth & Maturity (Module 9).

* **System Stability Confirmed** (Error rate < Threshold).
* **Feedback Synthesized** into a prioritized backlog.
* **Business Cycle Tracked** (Quarter/Month complete).
* **Recommendation Signed-off**: Scale, Pivot, or Rollback.

> [!IMPORTANT]
> **No Gate, No Growth.** You cannot move to Module 9 until you have the data to prove the feature is stable and valuable.
::::

* **System stability is confirmed** (Error rate < threshold).
* **Multi-channel feedback has been synthesized** into a backlog.
* **For VIP/B2B**: One full business cycle (Quarter/Month) has been monitored.
* **Recommendation (Scale, Pivot, or Rollback) signed off** based on Long-term data.
