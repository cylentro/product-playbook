---
title: "The AI-Powered Product Manager"
description: "Codifying how Product Teams leverage AI to transition from feature factories to outcome-driven squads."
present: true
quiz: false
---

# The AI-Powered Product Manager

::::present
AI is our Co-pilot, not our replacement; it handles the synthesis so we can focus on strategic decision-making.
::::

This guide codifies how the Product Team leverages Artificial Intelligence to transition from a feature factory to an outcome-driven squad. AI is our Co-pilot, not our replacement; it handles the synthesis so we can focus on strategic decision-making.

## What is a Prompt?

::::present
### What is a Prompt?
A prompt is your instruction to AI—the bridge between your intent and the AI's output.

**Think of it as:** A brief you'd give to a junior team member, but for an AI assistant.
::::

A **prompt** is the instruction or question you give to an AI model to generate a response. It's the bridge between your intent and the AI's output.

**Think of it as:** A brief you'd give to a junior team member. The clearer and more detailed your brief, the better the output.

In product management, prompts help us:
* Generate PRD sections
* Write acceptance criteria
* Synthesize user research
* Create technical documentation
* Analyze competitive landscapes

The quality of your prompt directly determines the quality of the AI's response.

## How to Prompt: A Practical Example

::::present
### Example: Japan Itinerary
Let's see how different prompts produce different results.

**The Prompt:**

```markdown
Create a 7-day itinerary for Japan.
```
::::

Let's explore prompting through a real example: planning a trip to Japan.

### First Approach

Here's a typical prompt someone might write:

```markdown
Create a 7-day itinerary for Japan.
```

This seems straightforward—you're asking for what you want. Let's see what the AI produces.

::::present
### The Result
A generic itinerary that might not fit your actual needs.

| **Day** | **City** | **Core Activities** |
| :--- | :--- | :--- |
| **1-2** | **Tokyo** | Shibuya Crossing, Hachiko Statue, Senso-ji Temple, Shinjuku nightlife. |
| **3** | **Mt. Fuji** | Day trip to Lake Kawaguchi, viewing Mt. Fuji, return to Tokyo. |
| **4-5** | **Kyoto** | Kinkaku-ji (Golden Pavilion), Fushimi Inari Shrine, Arashiyama Bamboo Grove. |
| **6** | **Osaka** | Osaka Castle, Dotonbori food street, Shinsekai district. |
| **7** | **Tokyo** | Harajuku shopping, TeamLab Borderless, departure preparation. |
::::

### The Result: Basic Prompt

#### 7-Day Japan Itinerary

**Day 1-2: Tokyo**
- Visit Shibuya Crossing and Hachiko Statue
- Explore Senso-ji Temple in Asakusa
- Evening in Shinjuku

**Day 3: Mt. Fuji**
- Day trip to Mt. Fuji and Lake Kawaguchi
- Return to Tokyo

**Day 4-5: Kyoto**
- Kinkaku-ji (Golden Pavilion)
- Fushimi Inari Shrine
- Arashiyama Bamboo Grove

**Day 6: Osaka**
- Osaka Castle
- Dotonbori food street
- Shinsekai district

**Day 7: Tokyo**
- Shopping in Harajuku
- TeamLab Borderless
- Departure preparation

**What's missing?** This itinerary doesn't account for:
* Your travel style (adventure vs. relaxation)
* Budget constraints
* Dietary preferences
* Physical limitations
* Seasonal considerations
* Transportation logistics

::::present
### A Better Approach
Now let's use a structured framework—without changing what we're asking for, just HOW we ask.
::::

::::present
### The Enhanced Prompt
Adding context, constraints, and specifications.

```markdown
I'm planning a 7-day trip to Japan in April with my partner. We're both in our early 30s, enjoy a mix of cultural experiences and modern city life, and have a moderate budget ($150-200/day excluding flights). We're vegetarian and prefer walking/public transport. We want to experience cherry blossom season but avoid overwhelming crowds.

Create a detailed 7-day itinerary that:
1. Balances iconic landmarks with off-the-beaten-path experiences
2. Includes specific vegetarian restaurant recommendations
3. Accounts for cherry blossom viewing spots
4. Provides realistic travel times between locations
5. Suggests morning/afternoon/evening activities

Format the output as a day-by-day breakdown with:
- Time blocks (Morning/Afternoon/Evening)
- Specific locations with brief descriptions
- Estimated costs per day
- Transportation instructions
- Pro tips for each day
```
::::

## A Better Approach: Structured Prompting

Now let's try a different approach. We'll use the same goal (7-day Japan itinerary), but structure our prompt differently.

### Enhanced Prompt

```markdown
I'm planning a 7-day trip to Japan in April with my partner. We're both in our early 30s, enjoy a mix of cultural experiences and modern city life, and have a moderate budget ($150-200/day excluding flights). We're vegetarian and prefer walking/public transport. We want to experience cherry blossom season but avoid overwhelming crowds.

Create a detailed 7-day itinerary that:
1. Balances iconic landmarks with off-the-beaten-path experiences
2. Includes specific vegetarian restaurant recommendations
3. Accounts for cherry blossom viewing spots
4. Provides realistic travel times between locations
5. Suggests morning/afternoon/evening activities

Format the output as a day-by-day breakdown with:
- Time blocks (Morning/Afternoon/Evening)
- Specific locations with brief descriptions
- Estimated costs per day
- Transportation instructions
- Pro tips for each day
```

::::present
### The Enhanced Result (7-Day Overview)
Complete itinerary with costs, restaurants, and cherry blossoms.

| **Day** | **Location** | **Highlights** | **Vegetarian Dining** | **Cost** |
|---------|--------------|----------------|----------------------|----------|
| **1** | **Tokyo East** | Senso-ji Temple, Sumida Park 🌸, Asakusa | Nagi Shokudo (¥1,500) | ~$90 |
| **2** | **Tokyo West** | Meiji Shrine, Yoyogi Park 🌸, TeamLab, Shibuya | Ain Soph Journey (¥1,200), Saido (¥2,000) | ~$110 |
| **3** | **Nikko** | Toshogu Shrine, Kanmangafuchi Abyss trail | Hippari Dako (yuba, ¥1,800) | ~$85 |
| **4** | **Tokyo → Kyoto** | Shinkansen, Philosopher's Path 🌸, Gion | Morpho Cafe (¥2,500) | ~$180 |
| **5** | **Kyoto** | Fushimi Inari, Arashiyama Bamboo, Togetsukyo 🌸 | Veg Out (¥1,400), Mumokuteki (¥1,800) | ~$95 |
| **6** | **Kyoto → Osaka** | Kinkaku-ji, Osaka Castle 🌸, Dotonbori | Paprika Shokudo (¥1,000), Aiyo (¥800) | ~$100 |
| **7** | **Osaka** | Sumiyoshi Shrine, Shinsekai, Kansai Airport | Green Earth buffet (¥1,650) | ~$75 |

🌸 = Cherry blossom viewing spot
::::

::::present
### The Enhanced Result (Budget & Guides)
Everything you need for a successful trip.

:::col
**Budget Breakdown**

| **Category** | **Cost** |
|--------------|----------|
| Accommodation (6 nights) | $360 |
| Transportation | $185 |
| Food | $90 |
| Activities | $60 |
| **Total (7 days)** | **~$695** |
| **Per Day Average** | **~$99** |
:::

:::col
**Vegetarian Restaurants by City**
- **Tokyo:** Nagi Shokudo, Ain Soph Journey, Saido
- **Kyoto:** Morpho Cafe, Mumokuteki Cafe, Veg Out
- **Osaka:** Paprika Shokudo, Green Earth, Aiyo

**Cherry Blossom Pro Tips**
- **Peak:** Early April (Tokyo/Osaka), mid-April (Kyoto)
- **Timing:** Visit 7-8 AM or after 5 PM to avoid crowds
- **Hidden Gems:** Sumida Park, Philosopher's Path, Osaka Castle West Garden
:::
::::

### The Enhanced Result

#### 7-Day Japan Itinerary: Cherry Blossom Season (April)
**Budget:** $150-200/day | **Style:** Cultural + Modern | **Diet:** Vegetarian

---

**Day 1: Tokyo - Arrival & East Side**

**Morning (10:00 AM)**
- Arrive at Narita Airport
- Take Narita Express to Tokyo Station (¥3,070, ~60 min)
- Check into hotel in Asakusa area (Budget: ¥8,000/night)

**Afternoon (2:00 PM)**
- Senso-ji Temple & Nakamise Shopping Street
- Asakusa Culture Center rooftop (free observation deck)
- *Cherry Blossom Spot:* Sumida Park (5-min walk from Senso-ji)

**Evening (6:00 PM)**
- Dinner at Nagi Shokudo (vegetarian Buddhist cuisine, ¥1,500)
- Evening stroll along Sumida River for illuminated cherry blossoms

**Transportation:** Walking + Subway Day Pass (¥600)  
**Estimated Daily Cost:** ¥8,000 accommodation + ¥3,000 food + ¥1,000 misc = ~$90  
**Pro Tip:** Arrive early at Senso-ji (7 AM) to avoid crowds while still seeing cherry blossoms.

---

**Day 2: Tokyo - West Side & Modern Culture**

**Morning (9:00 AM)**
- Meiji Shrine & Yoyogi Park (*Peak cherry blossom spot*)
- Walk through Harajuku's quiet backstreets

**Afternoon (1:00 PM)**
- Lunch at Ain Soph Journey (vegan burgers, ¥1,200)
- Omotesando architecture walk
- TeamLab Borderless in Odaiba (¥3,200, pre-book online)

**Evening (6:30 PM)**
- Shibuya Crossing & Hachiko Statue
- Dinner at Saido (vegetarian izakaya, ¥2,000)
- Shibuya Sky observation deck (¥2,000) for night views

**Transportation:** Subway (¥600)  
**Estimated Daily Cost:** ~$110  
**Pro Tip:** Visit Yoyogi Park at 8 AM for peaceful hanami (cherry blossom viewing) with locals.

---

**Day 3: Nikko Day Trip - Nature & Temples**

**Morning (7:30 AM)**
- Take Tobu Railway from Asakusa to Nikko (¥2,800 round trip, 2 hours)
- Breakfast bento from 7-Eleven (¥500)

**Afternoon (10:30 AM)**
- Toshogu Shrine (UNESCO site, ¥1,300)
- Taiyuin Temple (quieter alternative, ¥550)
- Lunch at Hippari Dako (vegetarian yuba dishes, ¥1,800)
- Kanmangafuchi Abyss walking trail (free, 70 Jizo statues)

**Evening (5:00 PM)**
- Return to Tokyo
- Casual dinner near hotel (convenience store or local spot, ¥800)

**Estimated Daily Cost:** ~$85  
**Pro Tip:** Nikko is cooler than Tokyo; bring a light jacket. Cherry blossoms bloom 1-2 weeks later here.

---

**Day 4: Tokyo → Kyoto - Travel Day + Evening Exploration**

**Morning (9:00 AM)**
- Check out from Tokyo hotel
- Take Shinkansen to Kyoto (¥13,320, 2h 15min) - *Book in advance*
- Ekiben (train bento) for lunch (¥1,200)

**Afternoon (1:00 PM)**
- Check into Kyoto hotel (Gion or Higashiyama area)
- Philosopher's Path walk (*Cherry blossom tunnel*, 2km)
- Nanzen-ji Temple (¥500)

**Evening (6:00 PM)**
- Dinner at Morpho Cafe (organic vegetarian, ¥2,500)
- Gion district evening walk (geisha spotting)

**Transportation:** Shinkansen + local bus (¥500)  
**Estimated Daily Cost:** ~$180 (includes Shinkansen)  
**Pro Tip:** Walk Philosopher's Path north to south in late afternoon for best light.

---

**Day 5: Kyoto - Temples & Bamboo**

**Morning (7:00 AM)**
- Fushimi Inari Shrine (arrive early to avoid crowds, free)
- Hike to mid-level viewpoint (45 min)

**Afternoon (11:00 AM)**
- Lunch at Veg Out (vegan comfort food, ¥1,400)
- Arashiyama Bamboo Grove
- Tenryu-ji Temple garden (¥500)
- Togetsukyo Bridge (*Cherry blossom spot*)

**Evening (5:30 PM)**
- Return to central Kyoto
- Dinner at Mumokuteki Cafe (organic vegetarian, ¥1,800)
- Yasaka Shrine evening illumination

**Transportation:** Bus/train day pass (¥900)  
**Estimated Daily Cost:** ~$95  
**Pro Tip:** Rent a bicycle in Arashiyama (¥1,000/day) to cover more ground and escape crowds.

---

**Day 6: Kyoto → Osaka - Modern Energy**

**Morning (9:00 AM)**
- Kinkaku-ji (Golden Pavilion, ¥500)
- Ryoan-ji rock garden (¥500)

**Afternoon (12:30 PM)**
- Train to Osaka (¥560, 30 min)
- Check into Osaka hotel (Namba area)
- Lunch at Paprika Shokudo (vegetarian curry, ¥1,000)
- Osaka Castle & park (*Cherry blossoms*, ¥600)

**Evening (6:00 PM)**
- Dotonbori district (neon lights & street food)
- Vegetarian takoyaki at Aiyo (¥800)
- Hozenji Yokocho alley (hidden temple)

**Transportation:** Train + subway (¥800)  
**Estimated Daily Cost:** ~$100  
**Pro Tip:** Osaka Castle Park's west side (Nishinomaru Garden) has 600 cherry trees - worth the ¥350 extra entry.

---

**Day 7: Osaka - Departure**

**Morning (9:00 AM)**
- Sumiyoshi Taisha Shrine (unique architecture, free)
- Shinsekai district & Tsutenkaku Tower (¥900)

**Afternoon (12:00 PM)**
- Lunch at Green Earth (vegetarian buffet, ¥1,650)
- Last-minute shopping at Shinsaibashi
- Kuromon Market (vegetarian snacks for flight)

**Evening (4:00 PM)**
- Take Nankai Express to Kansai Airport (¥1,450, 45 min)
- Departure

**Estimated Daily Cost:** ~$75  
**Pro Tip:** Check luggage storage at Namba Station (¥600) to explore hands-free before airport.

---

**Budget Summary**
- **Accommodation:** ¥8,000/night × 6 nights = ¥48,000 ($360)
- **Transportation:** ~¥25,000 ($185) including Shinkansen
- **Food:** ~¥12,000 ($90)
- **Activities:** ~¥8,000 ($60)
- **Total:** ~$695 for 7 days (~$99/day excluding flights)

**Vegetarian Restaurant Guide**
- **Tokyo:** Nagi Shokudo, Ain Soph Journey, Saido
- **Kyoto:** Morpho Cafe, Mumokuteki Cafe, Veg Out
- **Osaka:** Paprika Shokudo, Green Earth, Aiyo

**Cherry Blossom Pro Tips**
1. **Peak Season:** Early April in Tokyo/Osaka, mid-April in Kyoto
2. **Avoid Crowds:** Visit popular spots at 7-8 AM or after 5 PM
3. **Hidden Gems:** Sumida Park, Philosopher's Path, Osaka Castle West Garden
4. **Hanami Etiquette:** Don't pick flowers, take your trash, respect quiet zones

::::present
### Key Improvements
Compare what the enhanced prompt delivered:

| **Aspect** | **Included** |
|------------|-------------|
| ✅ **Vegetarian Options** | Specific restaurants with prices (Nagi Shokudo, Ain Soph Journey, Saido) |
| ✅ **Cherry Blossoms** | Peak viewing spots & timing (Sumida Park, Yoyogi Park, Philosopher's Path) |
| ✅ **Time Blocks** | Morning/Afternoon/Evening with realistic durations |
| ✅ **Transportation** | Specific routes, costs, and travel times |
| ✅ **Budget Breakdown** | Daily costs: accommodation, food, transport, activities |
| ✅ **Pro Tips** | Crowd avoidance, best times to visit, local insights |
| ✅ **Total Budget** | ~$695 for 7 days (~$99/day excluding flights) |
::::

## Comparing the Two Approaches

::::present
### Side-by-Side Comparison

:::col
**First Prompt**
"Create a 7-day itinerary for Japan."

**Output:**
* Generic tourist spots
* No personalization
* Missing logistics
* No budget info
* Requires heavy editing
:::

:::col
**Enhanced Prompt**
Included: traveler profile, preferences, constraints, specific requirements, desired format

**Output:**
* Personalized to needs
* Vegetarian options
* Detailed logistics
* Budget breakdown
* Ready to use
:::
::::

Let's compare what we got from each approach:

| **Aspect** | **First Prompt** | **Enhanced Prompt** |
|------------|------------------|---------------------|
| **Personalization** | Generic for any traveler | Tailored to vegetarian couple in 30s |
| **Budget** | No cost information | Detailed daily costs & total breakdown |
| **Logistics** | Just location names | Specific transport routes, times, costs |
| **Dietary Needs** | Ignored | Specific vegetarian restaurant recommendations |
| **Seasonal Context** | No mention of cherry blossoms | Cherry blossom spots, timing, pro tips |
| **Usability** | Requires heavy research & editing | Ready to execute with minor adjustments |
| **Time Investment** | High (need to fill in all gaps) | Low (just personalize final details) |
| **Value as PM Artifact** | Brainstorming only | Operational document |

**The difference?** The enhanced prompt gave the AI:
* **Context** about who's traveling and when
* **Constraints** like budget and dietary needs
* **Specifications** for what to include
* **Format** requirements for the output

This is the foundation of **structured prompting**.

::::present
### Introducing: The CASTR Framework
The enhanced prompt followed a proven structure.

* **C - Context:** Travelers, season, preferences  
* **A - Act As:** (Implied: travel expert)  
* **S - Specifications:** 5 specific requirements  
* **T - Task:** Create detailed itinerary  
* **R - Result:** Day-by-day format with time blocks, costs, tips
::::

## Introducing: The CASTR Framework

The enhanced prompt wasn't random—it followed a proven structure called **CASTR**. This framework ensures every prompt has the structural integrity needed for professional-grade outputs.

### The CASTR Components

| **Component** | **Description** | **Japan Example** | **PM Example** |
| --- | --- | --- | --- |
| **C - Context** | Background, audience, constraints, and Proof of Pain | "7-day trip to Japan in April, couple in early 30s, vegetarian, moderate budget, cherry blossoms, avoid crowds" | "High-volume B2B portal. Users struggle with manual data entry for 100+ daily entries." |
| **A - Act As** | Specific persona or expert level required | (Implied: Experienced Japan travel planner specializing in vegetarian/seasonal tourism) | "Act as a Senior UX Researcher and B2B SaaS specialist with 10 years of experience." |
| **S - Specifications** | Roadmap, rules, and strict constraints | "1) Balance landmarks with hidden gems, 2) Vegetarian restaurants, 3) Cherry blossom spots, 4) Realistic travel times, 5) Time-blocked activities" | "Step 1: Analyze friction points. Step 2: Propose automation logic. Constraint: No technical jargon; under 200 words." |
| **T - Task** | The core objective or action item | "Create a detailed 7-day itinerary" | "Generate a comprehensive PRD section for a 'Bulk Data Upload' feature with automated validation." |
| **R - Result** | Desired format, tone, and length | "Day-by-day breakdown with time blocks, locations, costs, transportation, pro tips" | "Markdown format with a table for Success Metrics and bulleted Acceptance Criteria." |

### CASTR Impact on PM Work

| **PM Use Case** | **Without CASTR** | **With CASTR** |
|-----------------|-------------------|----------------|
| **Writing PRDs** | Generic template with placeholders | Contextual PRD with specific constraints, stakeholders, and success metrics |
| **Acceptance Criteria** | Basic happy-path scenarios | Gherkin-formatted AC covering edge cases, API timeouts, regulatory requirements |
| **User Research Synthesis** | Surface-level themes | Deep insight mining mapped to Proof of Pain framework |
| **SQL Queries** | Syntax-correct but logically flawed | Verified joins with business logic explained |

::::present
### CASTR for Product Management
Applying the framework to PM work.

* **C - Context**: Background, audience, Proof of Pain
* **A - Act As**: Specific persona or expert level
* **S - Specifications**: Roadmap, rules, constraints
* **T - Task**: Core objective or action item
* **R - Result**: Desired format, tone, length
::::

## PM Example: Applying CASTR

### PM Example: Acceptance Criteria for Payment Toggle

::::present
### PM Example: Payment Toggle AC

**Basic Prompt:**

:::col
"Write acceptance criteria for a payment toggle."

**Result:** Generic logic, missing edge cases, no business context.
:::
:::col
**CASTR Prompt:**
* **C:** Multi-vendor financial aggregator for retail app
* **A:** Senior QA Lead specializing in fintech
* **S:** Include auto-calculating service fees; account for API timeouts and regulatory warnings for transactions >1000
* **T:** Write Gherkin-style Acceptance Criteria for opt-in toggle
* **R:** Markdown table format
**Result:** Gherkin AC with fee logic, regulatory warnings, and timeout handling.
:::
::::

**Without CASTR:**
```markdown
Write acceptance criteria for a payment toggle in a logistics app.
```

**Result:** Generic logic that fails to account for business constraints or regional regulatory warnings.

**With CASTR:**
* **C - Context**: We are building a multi-vendor financial aggregator for a retail app.
* **A - Act As**: Act as a Senior QA Lead specializing in fintech.
* **S - Specifications**: Include logic for auto-calculating service fees. Constraint: Must account for vendor API timeouts and mandatory regulatory warnings for transactions >1000.
* **T - Task**: Write Gherkin-style Acceptance Criteria for the opt-in toggle.
* **R - Result**: Provide the result in a Markdown table.

The CASTR version produces dev-ready, context-aware acceptance criteria that account for real business constraints.

## Advanced Prompt Engineering Techniques

::::present
### Advanced Techniques
Move beyond basics with these senior-level techniques.

:::col
**Chain-of-Thought (CoT)**
Ask the AI to "think step-by-step." Reduces errors in complex financial or business logic.
:::
:::col
**Few-Shot Prompting**
Provide 1-2 examples of your "Gold Standard" documents within the prompt to set the bar.
:::
::::

* **Chain-of-Thought (CoT) Reasoning**: Ask the AI to think step-by-step. This reduces errors in complex tasks like financial settlement or multi-layered business logic.
* **Few-Shot Prompting (Examples)**: Provide 1-2 examples of your existing Gold Standard documents (e.g., a perfect Gherkin AC) within the prompt to set the expected quality level.
* **Using Delimiters**: Use clear separators (e.g., ###, ---, or <Context></Context>) to help the AI distinguish between instructions, examples, and raw data.

## The AI Agent Squad

::::present
### The AI Agent Squad
We use pre-tuned "Gems" or custom instructions for repeatable excellence.

* **The PRD Architect**: Pre-loaded with our 8-phase PDLC.
* **Gherkin Master**: Tuned for dev-ready Azure DevOps blocks.
* **The UX Critic**: Evaluates UI based on UX laws.
* **Strategic Coach**: Guides through market research.
::::

| **Gem Name** | **Strategic Focus** |
| --- | --- |
| **The PRD Architect** | Strategic Alignment: Pre-loaded with the 8-phase PDLC and organizational pillars. |
| **Gherkin Master** | Technical Precision: Tuned to output clean, dev-ready Gherkin blocks for Azure DevOps. |
| **The UX Critic** | Design Excellence: Evaluates UI based on internal design systems and UX laws. |
| **Strategic Coach** | Outcomes-Driven: Guides PMs through market research and pain extraction. |

## AI Integration Across the PDLC

::::present
### AI Across the PDLC (1/2)
From initial spark to technical blueprint.

#### 1-2: Discovery & Ideation
* **Stakeholder Simulation**: "Act as a skeptical Finance Manager."
* **Insight Synthesis**: Automatically themes support logs.

#### 3-4: Design & Planning
* **Technical Simplification**: Summarize complex API docs for the team.
* **UX Critique**: Automated design reviews for micro-copy.
::::

### Phase 1-2: Discovery & Ideation

* **Stakeholder Simulation**: I am proposing a change to a core process. Act as a skeptical Finance Manager. Challenge my proposal based on audit risks.
* **Insight Synthesis**: Upload customer support logs to identify recurring Proof of Pain themes without manual sorting.

### Phase 3-4: Design & Planning

* **Technical Simplification**: Summarize this API documentation. Focus specifically on error codes and authentication triggers for our frontend team.
* **UX Critique**: Upload UI screenshots for an automated AI Design Review to evaluate visual hierarchy and micro-copy clarity.

::::present
### AI Across the PDLC (2/2)
Scale through execution and optimization.

#### 5-6: Development & GTM
* **SQL Generation**: Query frequency for feature opt-outs.
* **NPI Support**: Technical PRD → Internal Sales Training.

#### 7-8: Hyper-care & Growth
* **A/B Testing**: Generate head-to-head value prop variations.
* **Sentiment Monitoring**: Identify post-launch usability pains.
::::

### Phase 5-6: Development & GTM

* **SQL Query Generation**: Write a SQL query to find the average usage frequency for users who opted-out of the new feature in the last 30 days.
* **NPI Support**: Transform technical PRDs into persuasive internal training materials for Sales and Operations teams.

### Phase 7-8: Hyper-care & Experimentation

* **A/B Test Hypotheses**: Generate variations for experiment titles and value propositions based on specific drop-off data.
* **Sentiment Monitoring**: Upload post-launch reviews to identify if a release introduced new usability pains.

## Operational Guardrails

::::present
### Operational Guardrails
AI is a Co-pilot, but the PM is the Pilot in Command.

* **Verification is Mandatory**: Audit every logic gate. You are ultimately accountable.
* **Privacy First**: NEVER upload PII or sensitive financial data to public models.
* **Outcome Ownership**: AI is the ghostwriter; the PM is the Author who owns the impact.
::::

* **Verification is Mandatory**: PMs are ultimately accountable for every word in the PRD and every logic gate in the code. AI can hallucinate; you must audit.
* **Privacy First**: NEVER upload PII (Personal Identifiable Information) or sensitive financial spreadsheets to public AI models.
* **Outcome Ownership**: AI is the ghostwriter; the Product Manager is the Author and owns the business impact.

## New: Advanced Data & Research Capabilities

::::present
### Advanced Capabilities
Bridging the gap between raw data and product insights.

#### The SQL Bridge
Bridge "Business Questions" to "Database Answers."
* **Use Case**: Correlate Attach Rate and User Tenure using table schemas.

#### Competitive Benchmarking
Market Intelligence at scale.
* **Use Case**: Identify 'Feature Gaps' and 'Value Levers' vs. competitor programs.
::::

### A. The SQL Bridge (Data Interpretation)

PMs can use AI to bridge the gap between "Business Questions" and "Database Answers."

* **Use Case**: Upload your table schema (without data) and ask the AI to write a complex join to track the correlation between Insurance Attach Rate and User Tenure.
* **Constraint**: Always ask for the logic to be explained so you can verify the JOIN conditions.

### B. Competitive Benchmarking (Market Intelligence)

* **Use Case**: Paste competitor release notes or product descriptions.
* **Prompt Logic**: "Compare our current VIP tier logic with this competitor's loyalty program. Identify 3 'Feature Gaps' and 2 'Value Levers' where we can differentiate."

### C. Insight Mining (Research Synthesis)

* **Use Case**: Instead of reading 100 interview transcripts, use AI to find the "Aha! Moments."
* **Prompt Logic**: "Analyze these transcripts. Identify where users hesitated or expressed frustration. Map these back to our Proof of Pain categories."

## The Master Prompt Template

::::present
### The Master Prompt Template
Copy. Paste. Master.

```markdown
* **Context**: [Describe the product, persona, and business goal]
* **Act As**: [Senior PM / Tech Lead / UX Designer]
* **Specifications**: [Rules: e.g. 'Must work on mobile', 'Keep it under 3 steps']
* **Task**: [e.g. Write a User Story for a B2B bulk upload]
* **Result**: [e.g. Markdown Table with Gherkin AC]
```
::::

[MASTER_PROMPT_TEMPLATE]