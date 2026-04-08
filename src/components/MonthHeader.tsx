"use client";

import { MONTH_IMAGES, MONTH_NAMES } from "@/lib/constants";

interface MonthHeaderProps {
  month: number;
  year: number;
  accent: string;
  onPrev: () => void;
  onNext: () => void;
}

export default function MonthHeader({
  month,
  year,
  accent,
  onPrev,
  onNext,
}: MonthHeaderProps) {
  const img = MONTH_IMAGES[month];

  return (
    <div className="relative w-full overflow-hidden rounded-t-2xl" style={{ height: "clamp(200px, 30vw, 360px)" }}>
      <img
        src={img.url}
        alt={`${MONTH_NAMES[month]} Cover`}
        className="absolute inset-0 h-full w-full object-cover object-top transition-opacity duration-700"
        loading="eager"
      />
      <div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(to top, ${accent}DD 0%, ${accent}66 40%, transparent 100%)`,
        }}
      />

      <div className="absolute inset-0 flex items-end justify-between px-6 pb-5 sm:px-10 sm:pb-7">
        <button
          onClick={onPrev}
          aria-label="Previous month"
          className="flex h-10 w-10 items-center justify-center rounded-full bg-white/20 text-white backdrop-blur-sm transition hover:bg-white/40 active:scale-95 cursor-pointer"
        >
          <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
            <path d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        <div className="text-center">
          <h1 className="text-3xl font-bold tracking-wide text-white drop-shadow-lg sm:text-4xl md:text-5xl">
            {MONTH_NAMES[month]}
          </h1>
          <p className="mt-1 text-sm font-medium tracking-widest text-white/80 sm:text-base">
            {year}
          </p>
        </div>

        <button
          onClick={onNext}
          aria-label="Next month"
          className="flex h-10 w-10 items-center justify-center rounded-full bg-white/20 text-white backdrop-blur-sm transition hover:bg-white/40 active:scale-95 cursor-pointer"
        >
          <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
            <path d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  );
}
