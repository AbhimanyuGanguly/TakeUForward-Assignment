"use client";

import { useState, useEffect, useCallback } from "react";
import { NOTES_STORAGE_KEY } from "@/lib/constants";
import { formatDateRange, monthKey } from "@/lib/dateUtils";

export interface Note {
  id: string;
  text: string;
  rangeLabel: string;
  rangeStartISO: string;
  rangeEndISO: string | null;
  monthKey: string;
  createdAt: number;
}

interface NotesSidebarProps {
  month: number;
  year: number;
  accent: string;
  rangeStart: Date | null;
  rangeEnd: Date | null;
}

function loadNotes(): Note[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(NOTES_STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveNotes(notes: Note[]) {
  localStorage.setItem(NOTES_STORAGE_KEY, JSON.stringify(notes));
}

export default function NotesSidebar({
  month,
  year,
  accent,
  rangeStart,
  rangeEnd,
}: NotesSidebarProps) {
  const [notes, setNotes] = useState<Note[]>([]);
  const [draft, setDraft] = useState("");
  const mk = monthKey(year, month);

  useEffect(() => {
    setNotes(loadNotes());
  }, []);

  const monthNotes = notes
    .filter((n) => n.monthKey === mk)
    .sort((a, b) => b.createdAt - a.createdAt);

  const handleSave = useCallback(() => {
    if (!draft.trim() || !rangeStart) return;
    const newNote: Note = {
      id: crypto.randomUUID(),
      text: draft.trim(),
      rangeLabel: formatDateRange(rangeStart, rangeEnd),
      rangeStartISO: rangeStart.toISOString(),
      rangeEndISO: rangeEnd ? rangeEnd.toISOString() : null,
      monthKey: mk,
      createdAt: Date.now(),
    };
    const updated = [newNote, ...notes];
    setNotes(updated);
    saveNotes(updated);
    setDraft("");
  }, [draft, rangeStart, rangeEnd, mk, notes]);

  const handleDelete = useCallback(
    (id: string) => {
      const updated = notes.filter((n) => n.id !== id);
      setNotes(updated);
      saveNotes(updated);
    },
    [notes]
  );

  return (
    <aside
      className="flex flex-col rounded-2xl shadow-sm lg:min-h-[480px] transition-colors duration-300"
      style={{
        backgroundColor: "var(--card-bg)",
        borderColor: "var(--card-border)",
        borderWidth: "1px",
        borderStyle: "solid",
      }}
    >
      <div
        className="rounded-t-2xl px-5 py-4"
        style={{ backgroundColor: `${accent}15` }}
      >
        <h2 className="text-lg font-semibold" style={{ color: "var(--text-primary)" }}>
          📝 Monthly Notes
        </h2>
        <p className="mt-0.5 text-xs" style={{ color: "var(--text-secondary)" }}>
          {rangeStart
            ? `For: ${formatDateRange(rangeStart, rangeEnd)}`
            : "Select a date range to add notes"}
        </p>
      </div>

      <div className="px-5 py-4" style={{ borderBottom: "1px solid var(--card-border)" }}>
        <textarea
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          placeholder={
            rangeStart
              ? "Write a note for this date range…"
              : "Select dates first, then add a note"
          }
          disabled={!rangeStart}
          rows={3}
          className="w-full resize-none rounded-lg px-3 py-2 text-sm placeholder:opacity-50 focus:outline-none focus:ring-2 disabled:cursor-not-allowed disabled:opacity-50 transition-colors duration-300"
          style={{
            backgroundColor: "var(--input-bg)",
            borderColor: "var(--input-border)",
            borderWidth: "1px",
            borderStyle: "solid",
            color: "var(--text-primary)",
          }}
        />
        <button
          onClick={handleSave}
          disabled={!draft.trim() || !rangeStart}
          className="mt-2 w-full rounded-lg px-4 py-2 text-sm font-semibold text-white shadow transition-all hover:shadow-md active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-40 cursor-pointer"
          style={{ backgroundColor: accent }}
        >
          Save Note
        </button>
      </div>

      <div className="flex-1 overflow-y-auto px-5 py-4">
        {monthNotes.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-10" style={{ color: "var(--text-muted)" }}>
            <svg width="40" height="40" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" className="mb-2 opacity-40">
              <path d="M9 12h6m-3-3v6m-7 4h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            <p className="text-sm">No notes this month</p>
          </div>
        ) : (
          <ul className="space-y-3">
            {monthNotes.map((note) => (
              <li
                key={note.id}
                className="group rounded-lg px-4 py-3 transition-colors duration-200"
                style={{
                  backgroundColor: "var(--note-bg)",
                  border: "1px solid var(--note-border)",
                }}
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1">
                    <span
                      className="inline-block rounded-full px-2 py-0.5 text-[10px] font-semibold text-white"
                      style={{ backgroundColor: accent }}
                    >
                      {note.rangeLabel}
                    </span>
                    <p className="mt-1.5 text-sm leading-relaxed" style={{ color: "var(--text-primary)" }}>
                      {note.text}
                    </p>
                  </div>
                  <button
                    onClick={() => handleDelete(note.id)}
                    className="mt-0.5 flex-shrink-0 rounded p-1 opacity-0 transition hover:bg-red-500/10 hover:text-red-500 group-hover:opacity-100 cursor-pointer"
                    style={{ color: "var(--text-muted)" }}
                    aria-label="Delete note"
                  >
                    <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </aside>
  );
}
