import React from 'react';
import Hero from './components/Hero.jsx';
import DashboardWidgets from './components/DashboardWidgets.jsx';
import QuickAdd from './components/QuickAdd.jsx';
import MicroMission from './components/MicroMission.jsx';
import { Shield } from 'lucide-react';

function App() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100">
      {/* Top bar */}
      <header className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-emerald-500 text-white shadow-sm">₹</div>
          <span className="text-lg font-semibold">SproutSpend</span>
        </div>
        <div className="hidden items-center gap-2 text-xs text-slate-500 sm:flex">
          <Shield className="h-3.5 w-3.5" /> Privacy‑first • Works offline
        </div>
      </header>

      <main className="mx-auto grid max-w-6xl gap-6 px-6 pb-12">
        <Hero />

        {/* Primary dashboard row */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          <div className="md:col-span-2">
            <DashboardWidgets />
          </div>
          <div className="flex flex-col gap-6">
            <MicroMission />
          </div>
        </div>

        {/* Quick add section */}
        <QuickAdd />

        {/* Footer */}
        <footer className="mt-4 grid gap-2 py-8 text-center text-xs text-slate-500">
          <div>
            Built for students. Minimal friction, maximum clarity.
          </div>
          <div>
            Local‑only by default. Opt‑in sync when you decide.
          </div>
        </footer>
      </main>
    </div>
  );
}

export default App;
