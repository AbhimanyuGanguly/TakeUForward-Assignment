"use client";
import { DAY_LABELS } from "@/lib/constants";
import {
  getDaysInMonth,
  getFirstDayOfWeek,
  isSameDay,
  isInRange,
} from "@/lib/dateUtils";

interface CalendarGridProps {
  month: number;
  year: number;
  accent: string;
  rangeStart: Date | null;
  rangeEnd: Date | null;
  onDayClick: (date: Date) => void;
}

export default function CalendarGrid({
  month,
  year,
  accent,
  rangeStart,
  rangeEnd,
  onDayClick,
}: CalendarGridProps) {
  const today = new Date();

  const cells = (() => {
    const total = getDaysInMonth(year, month);
    const firstDay = getFirstDayOfWeek(year, month);
    const result: (Date | null)[] = [];

    for (let i = 0; i < firstDay; i++) result.push(null);
    for (let d = 1; d <= total; d++) result.push(new Date(year, month, d));
    while (result.length % 7 !== 0) result.push(null);

    return result;
  })();

  const isStart = (d: Date) => isSameDay(d, rangeStart);
  const isEnd = (d: Date) => isSameDay(d, rangeEnd);
  const isToday = (d: Date) => isSameDay(d, today);
  const inRange = (d: Date) => isInRange(d, rangeStart, rangeEnd);

  return (
    <div className="px-4 pb-6 pt-4 sm:px-6 lg:px-8">
      <div className="mb-2 grid grid-cols-7 gap-0">
        {DAY_LABELS.map((l) => (
          <div
            key={l}
            className="py-2 text-center text-[11px] font-semibold uppercase tracking-wider"
            style={{ color: "var(--text-muted)" }}
          >
            {l}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-0">
        {cells.map((date, i) => {
          if (!date) {
            return <div key={`blank-${i}`} className="aspect-square" />;
          }

          const start = isStart(date);
          const end = isEnd(date);
          const mid = inRange(date);
          const td = isToday(date);
          const selected = start || end;

          let bridgeStyle: React.CSSProperties = {};
          if (mid) {
            bridgeStyle = { backgroundColor: `${accent}22` };
          }
          if (start && rangeEnd) {
            bridgeStyle = {
              background: `linear-gradient(to right, transparent 50%, ${accent}22 50%)`,
            };
          }
          if (end && rangeStart) {
            bridgeStyle = {
              background: `linear-gradient(to left, transparent 50%, ${accent}22 50%)`,
            };
          }

          return (
            <div
              key={i}
              style={bridgeStyle}
              className="flex aspect-square items-center justify-center"
            >
              <button
                onClick={() => onDayClick(date)}
                className={`
                  relative flex h-9 w-9 items-center justify-center rounded-full text-sm font-medium
                  transition-all duration-200 ease-out cursor-pointer
                  sm:h-10 sm:w-10 sm:text-base
                  ${selected ? "text-white shadow-lg scale-110" : ""}
                  ${!selected && td ? "font-bold" : ""}
                `}
                style={
                  selected
                    ? { backgroundColor: accent, boxShadow: `0 4px 12px ${accent}55`, color: "#fff" }
                    : td && !mid
                      ? { boxShadow: `inset 0 0 0 2px ${accent}`, color: "var(--text-primary)" }
                      : { color: mid ? "var(--text-primary)" : "var(--text-primary)" }
                }
                onMouseEnter={(e) => {
                  if (!selected) (e.currentTarget.style.backgroundColor) = "var(--hover-bg)";
                }}
                onMouseLeave={(e) => {
                  if (!selected) e.currentTarget.style.backgroundColor = "transparent";
                }}
                aria-label={date.toDateString()}
              >
                {date.getDate()}
              </button>
            </div>
          );
        })}
      </div>

      <p className="mt-4 text-center text-xs" style={{ color: "var(--text-muted)" }}>
        {!rangeStart
          ? "Click a day to start selecting a range"
          : !rangeEnd
            ? "Click another day to set the end of the range"
            : "Click any day to start a new selection"}
      </p>
    </div>
  );
}
