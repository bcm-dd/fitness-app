# Fitness App - Mobile Workout Tracker

A comprehensive mobile fitness workout logging application with exceptional UX, built with Next.js, TypeScript, Tailwind CSS, and Framer Motion.

## Features

### Core Screens
1. **Home Screen** - Daily workout overview, streak tracking, and quick stats
2. **Workout Logging** - Immersive exercise tracking with set completion and live controls
3. **Rest Timer** - Circular countdown timer with haptic feedback
4. **Workout Completion** - Celebration screen with stats, achievements, and insights
5. **Progress Dashboard** - Visual data storytelling with charts and heatmaps
6. **Exercise Detail** - Comprehensive form guides, instructions, and history
7. **Settings/Profile** - User preferences and account management
8. **History Calendar** - GitHub-style workout heatmap and activity log
9. **Onboarding** - 3-step personalized setup (goals, experience, equipment)

### Design Highlights
- **Dark Mode First** - True black (#000000) background optimized for OLED
- **Gradient Accents** - Purple to blue gradient throughout
- **Micro-interactions** - Smooth 60fps animations with haptic feedback
- **Loading States** - Skeleton screens and shimmer effects
- **Accessibility** - WCAG AAA compliance, 44px+ touch targets
- **Responsive** - Mobile-first with landscape support

### Tech Stack
- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Charts**: Recharts
- **Icons**: Lucide React
- **Date Utils**: date-fns

## Getting Started

### Prerequisites
- Node.js 18+ and npm

### Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

## Project Structure

```
fitness-app/
├── app/                      # Next.js App Router
│   ├── completion/           # Workout completion screen
│   ├── exercise/[id]/        # Exercise detail pages
│   ├── history/              # Calendar history view
│   ├── home/                 # Home feed
│   ├── onboarding/           # 3-step onboarding
│   ├── progress/             # Progress dashboard
│   ├── settings/             # Settings & profile
│   ├── workout/              # Workout logging screen
│   ├── layout.tsx            # Root layout
│   ├── page.tsx              # Landing page
│   └── globals.css           # Global styles
├── components/
│   ├── ui/                   # Reusable UI components
│   │   ├── BottomNavigation.tsx
│   │   ├── Confetti.tsx
│   │   └── SkeletonLoader.tsx
│   └── workout/
│       └── RestTimerModal.tsx
├── lib/
│   ├── data.ts              # Sample data
│   └── utils.ts             # Utility functions
├── types/
│   └── index.ts             # TypeScript types
└── public/
    └── animations/          # Exercise form animations
```

## Key Features Detail

### Workout Logging
- Large circular set indicators (60px diameter)
- Tap to complete with gradient fill animation
- Live weight/rep adjustment with stepper controls
- Swipe between exercises
- Auto-progression to next exercise

### Rest Timer
- Frosted glass modal overlay
- Circular progress ring countdown
- Quick time adjustments (1:00, 1:30, 2:00, etc.)
- Haptic feedback at intervals
- Skip or wait for completion

### Progress Dashboard
- Interactive line charts with gradient fills
- Exercise-specific progression tracking
- GitHub-style activity heatmap
- Personal records leaderboard
- Monthly stats cards with sparklines

### History Calendar
- Month view with workout indicators
- Color-coded by workout type (Push/Pull/Legs)
- Tap to view workout details
- List view alternative
- Current streak display

## Customization

### Theme Colors
Edit `tailwind.config.ts` to customize the gradient:

```ts
colors: {
  purple: { 500: '#8B5CF6' },
  blue: { 500: '#3B82F6' },
}
```

### Sample Data
Modify `lib/data.ts` to change exercises, workouts, and achievements.

## Performance
- Lazy loading for images and charts
- Skeleton screens prevent layout shift
- Optimistic UI updates
- Client-side navigation with prefetching

## Future Enhancements
- [ ] Apple Health / Google Fit integration
- [ ] Custom workout creation
- [ ] Video form guides
- [ ] Social features & challenges
- [ ] Body measurement tracking
- [ ] Nutrition logging
- [ ] AI training assistant

## License
MIT

## Credits
Built with ❤️ for fitness enthusiasts
