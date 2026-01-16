# 🚀 ProductOS: The Modern PM Playbook

An interactive platform designed for Product Managers to master the **Product Development Lifecycle (PDLC)**. This project transforms standard product documentation into a high-vibe, immersive learning experience.

## ✨ Features

### 📽️ Immersive Presentation Mode
Turn any module into a professional slide deck with one click.
- **60fps Transitions**: Powered by Framer Motion for buttery smooth navigation.
- **Smart Formatting**: Automatic slide generation from Markdown using the `::::present` syntax.
- **Interactive Diagrams**: Large-scale, legible Mermaid.js flowcharts and SVG diagrams.

### 📱 fully Responsive & Mobile-First
A seamless experience across all devices.
- **Adaptive Typography**: Text scales intelligently from desktop to mobile.
- **Native-Like Scrolling**: Snap scrolling on desktop, natural fluid scrolling on mobile.
- **Touch-Optimized**: All interactive elements are designed for touch targets.

### 🪄 High-Fidelity Visuals
Powered by **ReactBits** and **Framer Motion**.
- **Decrypted Text**: Cyberpunk-style text reveal animations.
- **Particle Systems**: Interactive background elements that respond to cursor movement.
- **Pixel Blast**: Dynamic background ambience.

### 🗺️ PDLC Interactive Map
A central, circular visualization of the entire product lifecycle—from Discovery to Sunset.
- **Micro-interactions**: Subtle hover effects and tooltips.
- **Dynamic Context**: See exactly where you are in the lifecycle at a glance.

### 📚 Expert Guides & Resources
Curated deep-dives into specialized PM skills.
- **Standalone Lessons**: Advanced topics like "The AI-Powered PM".
- **Reference Materials**: Toolkits and stack guides.

### 📝 Learning & Quiz Engines
- **Learning Mode**: Deep-dive documentation with GitHub-style alerts and premium typography. Now supports **Arrow Key Navigation** (← / →) for seamless transitions between lessons.
- **Quiz Engine**: Validate your knowledge with interactive assessments. Features **Adaptive Randomization**:
  - Dynamically selects 5 random questions from a larger pool for each attempt.
  - Shuffles answer order for every question to ensure true knowledge retention.
  - Interactive feedback with detailed explanations for every answer.

### ⌨️ Power User Navigation
Comprehensive keyboard shortcuts and mouse controls for efficient navigation.
- **Command Palette** (`⌘K` / `Ctrl+K`): Quick access to any module or lesson across the entire playbook.
- **Module Page Navigation**: Use arrow keys or Vim-style `j`/`k` to navigate chapters, `Enter` to open, `Esc` to return home.
- **Mode Switching**: Instantly switch between Learning, Presentation, and Quiz modes with keyboard shortcuts.
- **Learning Mode Navigation**: Use **Arrow Left/Right** (← / →) to move between lessons without lifting your hands.
- **Navigation Guide** (`?`): Interactive drawer with OS-aware shortcuts (Mac/Windows) organized by context, featuring both keyboard and mouse controls (including side-click navigation in Learning Mode).

### 🛠️ Developer-First Content
All course material is stored in clean, manageable Markdown files in the `/app/material` directory, allowing for rapid content updates.

---

## 🏗️ Technology Stack

- **Framework**: [Next.js 15 (App Router)](https://nextjs.org/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **UI & Styling**: [Tailwind CSS](https://tailwindcss.com/) + [Shadcn UI](https://ui.shadcn.com/)
- **Motion**: [Framer Motion](https://www.framer.com/motion/)
- **Visual Effects**: [ReactBits](https://reactbits.dev/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Diagrams**: [Mermaid.js](https://mermaid.js.org/)

---

## 🚦 Getting Started

### Prerequisites
- Node.js 18+
- npm / yarn / pnpm

### Installation

1.  **Clone the repo**
    ```bash
    git clone https://github.com/cylentro/product-playbook.git
    cd product-playbook
    ```

2.  **Install dependencies**
    ```bash
    npm install
    ```

3.  **Run the development server**
    ```bash
    npm run dev
    ```
    Open [http://localhost:3000](http://localhost:3000) with your browser to explore the playbook.

### Production Build & PWA

1.  **Build the application**
    ```bash
    npm run build
    ```

2.  **Start the production server**
    ```bash
    npm run start
    ```
    The application will be available at [http://localhost:3000](http://localhost:3000).

3.  **Install as PWA**
    On supported browsers (e.g., Chrome, Edge on desktop; Chrome on Android), you can install the application as a Progressive Web App (PWA) directly from the browser's address bar or menu. This will add an icon to your home screen/desktop and allow it to run in a standalone window.

---

## 📂 Project Structure

- `app/material/`: The core curriculum stored as Markdown files.
- `src/components/modules/`: The engines (Presentation, Learning, Quiz).
- `src/components/ui/`: Reusable primitive components (Shadcn + ReactBits).
- `src/store/`: State management with Zustand.

---

## 🎨 Design Philosophy
This project follows **"The Vibe Architect"** standards:
1. **The 60fps Rule**: Every transition must be fluid. No jank allowed.
2. **Premium Depth**: Use of glassmorphism, subtle blurs, and Z-axis depth.
3. **Mobile-First PWA**: A website that feels like a native app on iOS/Android.
