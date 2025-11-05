import React, { useMemo, useState } from 'react';
import { Plus, Camera, Mic } from 'lucide-react';

// Simple heuristic parser for quick-entry like: "Lunch ₹120 @Cafe K"
function parseQuickEntry(text) {
  const result = {
    title: '',
    amount: '',
    merchant: '',
    category: '',
    date: new Date().toISOString().slice(0, 10),
  };

  if (!text) return result;

  result.title = text.split('@')[0].trim();

  // Amount: look for ₹ or numbers
  const amountMatch = text.match(/(?:₹|rs\.?|inr\s*)?\s*([+-]?\d+(?:[.,]\d{1,2})?)/i);
  if (amountMatch) {
    result.amount = amountMatch[1].replace(',', '.');
  }

  // Merchant after @
  const atIdx = text.indexOf('@');
  if (atIdx !== -1) {
    result.merchant = text.slice(atIdx + 1).trim();
  }

  // Naive category hints
  const lowered = text.toLowerCase();
  if (/\b(food|lunch|dinner|cafe|coffee|pizza|burger)\b/.test(lowered)) result.category = 'Food';
  else if (/\b(uber|bus|train|metro|ride|cab|fuel)\b/.test(lowered)) result.category = 'Transport';
  else if (/\b(book|course|tuition|class|exam|notebook)\b/.test(lowered)) result.category = 'Education';

  return result;
}

export default function QuickAdd() {
  const [text, setText] = useState('Lunch ₹120 @Cafe Nero');
  const [parsed, setParsed] = useState(parseQuickEntry('Lunch ₹120 @Cafe Nero'));
  const [showUndo, setShowUndo] = useState(false);
  const [undoTimer, setUndoTimer] = useState(null);

  const categorySuggestions = useMemo(() => {
    if (!parsed.merchant) return [];
    const m = parsed.merchant.toLowerCase();
    const suggestions = [];
    if (/(cafe|coffee|nero|starbucks|brew)/.test(m)) suggestions.push('Food');
    if (/(uber|ola|metro|bus)/.test(m)) suggestions.push('Transport');
    if (/(amazon|flipkart)/.test(m)) suggestions.push('Shopping');
    return Array.from(new Set([parsed.category, ...suggestions].filter(Boolean))).slice(0, 3);
  }, [parsed]);

  function handleChange(v) {
    setText(v);
    setParsed(parseQuickEntry(v));
  }

  function handleAdd() {
    // Simulate local-only add; show undo toast for 6s
    if (undoTimer) clearTimeout(undoTimer);
    setShowUndo(true);
    const t = setTimeout(() => setShowUndo(false), 6000);
    setUndoTimer(t);
  }

  function handleUndo() {
    if (undoTimer) clearTimeout(undoTimer);
    setShowUndo(false);
  }

  return (
    <section id="quick-add" className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <div className="mb-3 flex items-center justify-between">
        <h3 className="text-lg font-semibold">Quick‑Add</h3>
        <div className="text-xs text-slate-500">Type naturally. One tap to save.</div>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row">
        <div className="relative flex-1">
          <input
            value={text}
            onChange={(e) => handleChange(e.target.value)}
            placeholder="e.g. Lunch ₹120 @Cafe K"
            className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none ring-emerald-400 focus:ring dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
          />
          {/* Inline category suggestions */}
          {categorySuggestions.length > 0 && (
            <div className="mt-2 flex flex-wrap gap-2">
              {categorySuggestions.map((c) => (
                <button
                  key={c}
                  onClick={() => setParsed((p) => ({ ...p, category: c }))}
                  className={`rounded-full px-3 py-1 text-xs ${
                    parsed.category === c
                      ? 'bg-emerald-500 text-white'
                      : 'bg-slate-100 text-slate-700 dark:bg-slate-700 dark:text-slate-200'
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleAdd}
            className="inline-flex items-center gap-2 rounded-xl bg-emerald-500 px-4 py-3 font-medium text-white shadow-sm transition hover:brightness-110"
          >
            <Plus className="h-4 w-4" />
            Save
          </button>
          <button
            className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-700 transition hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200"
            title="Scan receipt"
          >
            <Camera className="h-4 w-4" />
          </button>
          <button
            className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-700 transition hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200"
            title="Voice input"
          >
            <Mic className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Parsed preview */}
      <div className="mt-4 grid grid-cols-2 gap-3 text-sm sm:grid-cols-5">
        <Field label="Title" value={parsed.title || '—'} />
        <Field label="Amount" value={parsed.amount || '—'} />
        <Field label="Merchant" value={parsed.merchant || '—'} />
        <Field label="Category" value={parsed.category || '—'} />
        <Field label="Date" value={parsed.date} />
      </div>

      {/* Smart undo toast */}
      {showUndo && (
        <div className="fixed bottom-4 left-1/2 z-50 w-[90%] max-w-md -translate-x-1/2">
          <div className="flex items-center justify-between gap-3 rounded-xl border border-emerald-600 bg-emerald-500 px-4 py-3 text-white shadow-lg">
            <span className="text-sm">Transaction added. Undo?</span>
            <button
              onClick={handleUndo}
              className="rounded-lg bg-white/20 px-3 py-1 text-sm font-medium hover:bg-white/30"
            >
              Undo
            </button>
          </div>
        </div>
      )}
    </section>
  );
}

function Field({ label, value }) {
  return (
    <div>
      <div className="text-[11px] uppercase tracking-wide text-slate-500">{label}</div>
      <div className="mt-1 font-medium text-slate-900 dark:text-slate-100">{value}</div>
    </div>
  );
}
