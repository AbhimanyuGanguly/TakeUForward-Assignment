"use client";

import { useState } from "react";
import MonthHeader from "@/components/MonthHeader";
import CalendarGrid from "@/components/CalendarGrid";
import NotesSidebar from "@/components/NotesSidebar";
import PageFlipWrapper from "@/components/PageFlipWrapper";
import DarkModeToggle from "@/components/DarkModeToggle";
import { MONTH_IMAGES } from "@/lib/constants";

export default function Home() {
  const now = new Date();
  const [month, setMonth] = useState(now.getMonth());
  const [year, setYear] = useState(now.getFullYear());
  const [rangeStart, setRangeStart] = useState<Date | null>(null);
  const [rangeEnd, setRangeEnd] = useState<Date | null>(null);
  const [flipDir, setFlipDir] = useState<"left" | "right">("right");

  const accent = MONTH_IMAGES[month].accent;

  const goPrev = () => {
    setFlipDir("left");
    setRangeStart(null);
    setRangeEnd(null);
    if (month === 0) {
      setMonth(11);
      setYear((y) => y - 1);
    } else {
      setMonth((m) => m - 1);
    }
  };

  const goNext = () => {
    setFlipDir("right");
    setRangeStart(null);
    setRangeEnd(null);
    if (month === 11) {
      setMonth(0);
      setYear((y) => y + 1);
    } else {
      setMonth((m) => m + 1);
    }
  };

  const handleDayClick = (date: Date) => {
    // console.log("clicked date:", date);
    if (!rangeStart || rangeEnd) {
      setRangeStart(date);
      setRangeEnd(null);
    } else {
      if (date.getTime() < rangeStart.getTime()) {
        setRangeEnd(rangeStart);
        setRangeStart(date);
      } else {
        setRangeEnd(date);
      }
    }
  };

  const flipKey = `${year}-${month}`;

  return (
    <main className="mx-auto flex min-h-screen max-w-7xl flex-col px-4 py-6 sm:px-6 lg:px-8">
      <DarkModeToggle accent={accent} />

      <div className="flex flex-col gap-6 lg:flex-row">
        <div className="flex-1">
          <PageFlipWrapper flipKey={flipKey} direction={flipDir}>
            <div
              className="overflow-hidden rounded-2xl shadow-xl transition-all duration-300"
              style={{
                backgroundColor: "var(--card-bg)",
                boxShadow: `0 8px 40px ${accent}20`,
              }}
            >
              <MonthHeader
                month={month}
                year={year}
                accent={accent}
                onPrev={goPrev}
                onNext={goNext}
              />
              <CalendarGrid
                month={month}
                year={year}
                accent={accent}
                rangeStart={rangeStart}
                rangeEnd={rangeEnd}
                onDayClick={handleDayClick}
              />
            </div>
          </PageFlipWrapper>

          <div className="mt-3 flex justify-center gap-3">
            <span
              className="h-2.5 w-2.5 rounded-full shadow-sm"
              style={{ backgroundColor: accent }}
            />
            <span
              className="h-2.5 w-2.5 rounded-full shadow-sm"
              style={{ backgroundColor: `${accent}66` }}
            />
          </div>
        </div>

        <div className="w-full lg:w-80 xl:w-96">
          <NotesSidebar
            month={month}
            year={year}
            accent={accent}
            rangeStart={rangeStart}
            rangeEnd={rangeEnd}
          />
        </div>
      </div>

      <footer className="mt-auto pt-8 text-center text-xs" style={{ color: "var(--text-muted)" }}>
        Wall Calendar &middot; {year}
      </footer>
    </main>
  );
}
