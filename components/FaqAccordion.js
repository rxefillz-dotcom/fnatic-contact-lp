"use client";

import { useState } from "react";

export default function FaqAccordion({
  items,
  defaultOpenIndex = 0,
}) {
  const [openIndex, setOpenIndex] = useState(defaultOpenIndex);

  return (
    <div className="mt-3 space-y-2">
      {items.map((item, idx) => {
        const isOpen = openIndex === idx;
        const buttonId = `faq-btn-${idx}`;
        const panelId = `faq-panel-${idx}`;

        return (
          <div key={item.question} className="rounded-xl border border-white/10 bg-white/5">
            <button
              id={buttonId}
              type="button"
              onClick={() => setOpenIndex(isOpen ? -1 : idx)}
              aria-expanded={isOpen}
              aria-controls={panelId}
              className="flex w-full items-center justify-between gap-4 px-4 py-3 text-left text-sm text-zinc-100"
            >
              <span className="font-medium text-zinc-100">{item.question}</span>
              <span className="text-zinc-400" aria-hidden="true">
                {isOpen ? "－" : "＋"}
              </span>
            </button>

            {isOpen ? (
              <div
                id={panelId}
                role="region"
                aria-labelledby={buttonId}
                className="px-4 pb-3 text-sm text-zinc-300"
              >
                {item.answer}
              </div>
            ) : null}
          </div>
        );
      })}
    </div>
  );
}

