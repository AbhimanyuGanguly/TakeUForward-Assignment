# Nature Wall Calendar

A beautiful, interactive wall calendar built with Next.js, React, and Tailwind CSS. Featuring smooth 3D page-flip animations, immersive nature photography, and built-in interactive tools for personal scheduling and note-taking.

## Features

- **Immersive Nature Imagery**: Each month is paired with a stunning nature photograph and a complementary accent color that sets the theme for the calendar grid and components.
- **3D Page Flip Animations**: Enjoy a satisfying and tactile experience with carefully crafted CSS 3D page-folding animations when you navigate between months.
- **Interactive Range Selection**: Click to select a start date and an end date on the calendar. The UI dynamically highlights your selected range with smooth, customized gradient styling.
- **Persistent Notes Side-Panel**: Jot down tasks, reminders, or ideas for a specific month. Notes are automatically saved to your browser's local storage and persist across sessions.
- **Dark Mode Support**: A seamless dark mode toggle that adjusts the interface colors while keeping the beautiful month-specific accent tones intact.

## Tech Stack

- **Framework**: Next.js (App Router) & React
- **Styling**: Tailwind CSS & plain CSS for complex 3D animations
- **State Management**: React Hooks (`useState`, `useEffect`)
- **Data Persistence**: Browser `localStorage`

## Getting Started

1. Clone the repository and navigate to the project directory:
   ```bash
   git clone <your-repo-url>
   cd Calendar
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser to see the calendar in action!

## Video Demonstration
<video src="./public/demo.mp4" controls="controls" width="100%">
</video>
