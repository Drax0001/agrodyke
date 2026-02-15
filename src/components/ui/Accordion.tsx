"use client";

import { ReactNode, useState } from "react";
import { ChevronDown } from "lucide-react";

interface AccordionItem {
  id: string;
  title: string;
  content: ReactNode;
}

interface AccordionProps {
  items: AccordionItem[];
}

export default function Accordion({ items }: AccordionProps) {
  const [openId, setOpenId] = useState<string | null>(null);

  return (
    <div className="space-y-3">
      {items.map((item) => {
        const isOpen = openId === item.id;

        return (
          <div key={item.id} className="rounded-2xl border border-slate-200 bg-white">
            <button
              type="button"
              className="flex w-full items-center justify-between px-4 py-3 text-left text-sm font-semibold text-slate-900"
              onClick={() => setOpenId(isOpen ? null : item.id)}
              aria-expanded={isOpen}
            >
              {item.title}
              <ChevronDown
                className={`h-4 w-4 transition ${isOpen ? "rotate-180" : ""}`}
              />
            </button>
            <div
              className={`overflow-hidden px-4 text-sm text-slate-600 transition-all ${
                isOpen ? "max-h-96 pb-4" : "max-h-0"
              }`}
            >
              {item.content}
            </div>
          </div>
        );
      })}
    </div>
  );
}
