import React from 'react';
import Spline from '@splinetool/react-spline';
import { Shield, Settings, Rocket } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative min-h-[60vh] w-full overflow-hidden rounded-2xl bg-gradient-to-b from-slate-900 via-slate-900 to-slate-800 text-white">
      <div className="absolute inset-0">
        <Spline
          scene="https://prod.spline.design/41MGRk-UDPKO-l6W/scene.splinecode"
          style={{ width: '100%', height: '100%' }}
        />
      </div>

      {/* Soft overlay for readability - does not block interaction */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-slate-900/70 via-slate-900/40 to-slate-900/70" />

      <div className="relative z-10 mx-auto flex max-w-6xl flex-col gap-6 px-6 py-16 sm:py-20">
        <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-3 py-1 text-xs backdrop-blur">
          <Shield className="h-3.5 w-3.5" />
          <span>Privacy-first • Local-only mode</span>
        </div>
        <h1 className="text-3xl font-semibold leading-tight sm:text-5xl">
          Spend smarter with micro‑missions, not guilt.
        </h1>
        <p className="max-w-2xl text-sm text-slate-200 sm:text-base">
          Built for students: lightning-fast entry, honest nudges, and your data stays yours. Works offline and syncs only when you say so.
        </p>
        <div className="flex flex-wrap items-center gap-3">
          <a
            href="#quick-add"
            className="inline-flex items-center gap-2 rounded-xl bg-emerald-400 px-4 py-2 text-slate-900 shadow-lg shadow-emerald-400/20 transition hover:brightness-110"
          >
            <Rocket className="h-4 w-4" />
            Try Quick‑Add
          </a>
          <a
            href="#dashboard"
            className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/5 px-4 py-2 text-white backdrop-blur transition hover:bg-white/10"
          >
            <Settings className="h-4 w-4" />
            Explore Dashboard
          </a>
        </div>
      </div>
    </section>
  );
}
