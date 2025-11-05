import React from 'react';
import { Wallet, PieChart } from 'lucide-react';

export default function DashboardWidgets() {
  return (
    <section id="dashboard" className="grid grid-cols-1 gap-4 sm:grid-cols-3">
      <Card>
        <div className="flex items-center justify-between">
          <div className="text-sm text-slate-500">Current Balance</div>
          <Wallet className="h-4 w-4 text-slate-400" />
        </div>
        <div className="mt-2 text-2xl font-semibold">₹3,420</div>
        <div className="mt-1 text-xs text-emerald-600">Safety balance: ₹1,200</div>
      </Card>

      <Card>
        <div className="flex items-center justify-between">
          <div className="text-sm text-slate-500">Weekly Snapshot</div>
          <PieChart className="h-4 w-4 text-slate-400" />
        </div>
        <div className="mt-3 flex items-end gap-2">
          {[30, 55, 40, 65, 35, 45, 20].map((h, i) => (
            <div key={i} className="flex w-full flex-col items-center">
              <div
                className="w-6 rounded-t bg-emerald-500"
                style={{ height: `${h}px` }}
              />
              <div className="mt-1 text-[10px] text-slate-500">
                {['M', 'T', 'W', 'T', 'F', 'S', 'S'][i]}
              </div>
            </div>
          ))}
        </div>
      </Card>

      <Card>
        <div className="text-sm text-slate-500">Action Items</div>
        <ul className="mt-2 list-inside list-disc text-sm text-slate-700 dark:text-slate-200">
          <li>Cut food spend by ₹300 this week</li>
          <li>Move ₹500 to emergency fund</li>
          <li>Review subscriptions (2 flagged)</li>
        </ul>
      </Card>
    </section>
  );
}

function Card({ children }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
      {children}
    </div>
  );
}
