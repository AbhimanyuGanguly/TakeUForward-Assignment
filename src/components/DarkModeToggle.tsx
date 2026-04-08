"use client";

import { useState, useEffect } from "react";

interface DarkModeToggleProps {
  accent: string;
}

export default function DarkModeToggle({ accent }: DarkModeToggleProps) {
  const [dark, setDark] = useState(false);
  const [pop, setPop] = useState(false);

  // Initialize from localStorage/system preference
  useEffect(() => {
    const saved = localStorage.getItem("wall-calendar-theme");
    if (saved === "dark") {
      setDark(true);
      document.documentElement.classList.add("dark");
    } else if (saved === "light") {
      setDark(false);
      document.documentElement.classList.remove("dark");
    } else if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      setDark(true);
      document.documentElement.classList.add("dark");
    }
  }, []);

  const toggle = () => {
    const next = !dark;
    setDark(next);
    setPop(true);
    setTimeout(() => setPop(false), 250);
    if (next) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("wall-calendar-theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("wall-calendar-theme", "light");
    }
  };

  return (
    <button
      onClick={toggle}
      aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
      className={`
        fixed top-4 right-4 z-50 flex h-11 w-11 items-center justify-center rounded-full
        shadow-lg backdrop-blur-md transition-all duration-300
        hover:scale-110 active:scale-95 cursor-pointer
        ${pop ? "toggle-pop" : ""}
      `}
      style={{
        backgroundColor: dark ? "#1e293b" : "#ffffff",
        border: `2px solid ${accent}88`,
        boxShadow: `0 4px 20px ${accent}30`,
      }}
    >
      {dark ? (
        /* Sun icon */
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fbbf24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="5" />
          <line x1="12" y1="1" x2="12" y2="3" />
          <line x1="12" y1="21" x2="12" y2="23" />
          <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
          <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
          <line x1="1" y1="12" x2="3" y2="12" />
          <line x1="21" y1="12" x2="23" y2="12" />
          <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
          <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
        </svg>
      ) : (
        /* Moon icon */
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#475569" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
        </svg>
      )}
    </button>
  );
}
