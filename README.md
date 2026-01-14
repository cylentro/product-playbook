# 🚀 The Modern PM Playbook

An interactive platform designed for Product Managers to master the **Product Development Lifecycle (PDLC)**. This project transforms standard product documentation into a high-vibe, immersive learning experience.

![PDLC Overview](public/manifest.json) <!-- Replacement note: User can add a screenshot later -->

## ✨ Features

### 📽️ Immersive Presentation Mode
Turn any module into a professional slide deck with one click.
- **60fps Transitions**: Powered by Framer Motion for buttery smooth navigation.
- **Smart Formatting**: Automatic slide generation from Markdown using the `:::present` syntax.
- **Interactive Diagrams**: Large-scale, legible Mermaid.js flowcharts and SVG diagrams.

### 🗺️ PDLC Interactive Map
A central, circular visualization of the entire product lifecycle—from Discovery to Sunset.
- **Micro-interactions**: Subtle hover effects and tooltips.
- **Dynamic Context**: See exactly where you are in the lifecycle at a glance.

### 📝 Learning & Quiz Engines
- **Learning Mode**: Deep-dive documentation with GitHub-style alerts and premium typography.
- **Quiz Engine**: Validate your knowledge at the end of every module with interactive assessments.

### 🛠️ Developer-First Content
All course material is stored in clean, manageable Markdown files in the `/app/material` directory, allowing for rapid content updates.

---

## 🏗️ Technology Stack

- **Framework**: [Next.js 15 (App Router)](https://nextjs.org/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **UI & Styling**: [Tailwind CSS](https://tailwindcss.com/) + [Shadcn UI](https://ui.shadcn.com/)
- **Motion**: [Framer Motion](https://www.framer.com/motion/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Diagrams**: [Mermaid.js](https://mermaid.js.org/)

---

## 🚦 Getting Started

### Prerequisites
- Node.js 18+ 
- npm / yarn / pnpm

### Installation

1. **Clone the repo**
   ```bash
   git clone https://github.com/cylentro/product-playbook.git
   cd product-playbook
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   ```

Open [http://localhost:3000](http://localhost:3000) with your browser to explore the playbook.

---

## 📂 Project Structure

- `app/material/`: The core curriculum stored as Markdown files.
- `src/components/modules/`: The engines (Presentation, Learning, Quiz).
- `src/components/ui/`: Reusable primitive components (Shadcn).
- `src/store/`: State management with Zustand.

---

## 🎨 Design Philosophy
This project follows **"The Vibe Architect"** standards:
1. **The 60fps Rule**: Every transition must be fluid.
2. **Premium Depth**: Use of glassmorphism, subtle blurs, and Z-axis depth.
3. **Mobile-First**: A PWA-ready experience that feels native on any device.

---

Built with ❤️ for the Product Management community.
