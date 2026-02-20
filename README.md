# SmartCV — AI Resume Builder

## Getting Started

### Prerequisites
- Node.js **18+** (required)
- npm or yarn

### Install & Run

```bash
# Install dependencies
npm install

# Start dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Stack
- **Next.js 14** App Router + TypeScript
- **TailwindCSS** for styling
- **Framer Motion** for animations
- **Zustand** for UI state (active step)

## Project Structure

```
smartcv/
├── app/
│   ├── layout.tsx          # Root layout
│   ├── page.tsx            # Homepage
│   ├── globals.css         # Global styles
│   ├── cv/page.tsx         # CV builder (stub)
│   └── auth/signin/page.tsx # Sign in (stub)
├── components/home/
│   ├── HomeNav.tsx         # Top navigation
│   ├── Hero.tsx            # Hero section with CTAs
│   ├── AiHeroIllustration.tsx  # Animated AI illustration
│   ├── StepsShowcase.tsx   # Interactive 4-step section
│   ├── StepPreviewPanel.tsx # Animated preview panel
│   ├── FinalCTA.tsx        # Bottom CTA strip
│   └── Footer.tsx          # Footer
├── store/
│   └── homeUiStore.ts      # Zustand store for activeStep
├── tailwind.config.ts
└── package.json
```

## Routing
- `/`           → Homepage
- `/cv`         → CV builder (wire up onboarding here)
- `/cv?mode=upload` → Upload flow
- `/auth/signin` → Auth page (wire up NextAuth/Clerk here)

## Next Steps
- Wire up `/cv` with the onboarding flow
- Add NextAuth or Clerk for `/auth/signin`
- Connect AI backend to the CV tailoring step
- Add templates page
