import React, { useState } from 'react';
import { Calendar, Shield } from 'lucide-react';

export default function MicroMission() {
  const [completed, setCompleted] = useState(false);
  const [streak, setStreak] = useState(3);

  function toggleComplete() {
    if (!completed) setStreak((s) => s + 1);
    setCompleted((c) => !c);
  }

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-lg font-semibold">Micro‑Mission</h3>
        <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-1 text-xs text-emerald-600 dark:text-emerald-400">
          <Calendar className="h-3.5 w-3.5" /> This week
        </div>
      </div>

      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <div className="text-base font-medium text-slate-900 dark:text-slate-100">
            No takeout for 2 days — save ₹150
          </div>
          <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
            Honest nudge: cook once, reheat once. Your future‑you will high‑five you.
          </p>
          <div className="mt-2 text-xs text-slate-500">
            Streak: <span className="font-semibold text-emerald-600 dark:text-emerald-400">{streak}</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={toggleComplete}
            className={`rounded-xl px-4 py-2 text-sm font-medium transition ${
              completed
                ? 'bg-emerald-500 text-white shadow-sm hover:brightness-110'
                : 'border border-slate-200 bg-white text-slate-800 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100'
            }`}
          >
            {completed ? 'Completed' : 'Mark done'}
          </button>
          <span className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-slate-50 px-2.5 py-1 text-[11px] text-slate-600 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300">
            <Shield className="h-3.5 w-3.5" /> Privacy: local‑only
          </span>
        </div>
      </div>
    </section>
  );
}
