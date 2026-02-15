"use client";

import { ReactNode, useState } from "react";

interface TabItem {
  id: string;
  label: string;
  content: ReactNode;
}

interface TabsProps {
  items: TabItem[];
}

export default function Tabs({ items }: TabsProps) {
  const [activeId, setActiveId] = useState(items[0]?.id ?? "");

  return (
    <div>
      <div className="flex flex-wrap gap-2">
        {items.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => setActiveId(item.id)}
            className={`rounded-full border px-4 py-2 text-xs font-semibold transition ${
              activeId === item.id
                ? "border-green-700 bg-green-700 text-white"
                : "border-slate-200 bg-white text-slate-700 hover:border-green-200"
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>
      <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-6">
        {items.find((item) => item.id === activeId)?.content}
      </div>
    </div>
  );
}
