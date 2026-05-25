"use client";

import { useEffect, useRef, useState } from "react";

const STAGES = [
  { key: "context", label: "Context", code: "00" },
  { key: "challenge", label: "Challenge", code: "01" },
  { key: "solution", label: "Solution", code: "02" },
  { key: "outcome", label: "Outcome", code: "03" },
] as const;

export function StageProgress() {
  const [active, setActive] = useState<string>("context");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const key = entry.target.getAttribute("data-stage");
            if (key) setActive(key);
          }
        });
      },
      { rootMargin: "-40% 0px -40% 0px" }
    );

    STAGES.forEach((s) => {
      const el = document.querySelector(`[data-stage="${s.key}"]`);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <aside className="hidden lg:block sticky top-32 self-start">
      <p className="mono text-[0.6rem] tracking-[0.3em] uppercase text-zinc-500 mb-6">
        stage
      </p>
      <ul className="space-y-4">
        {STAGES.map((s) => {
          const isActive = active === s.key;
          return (
            <li key={s.key} className="flex items-center gap-3">
              <span
                className={`mono text-[0.65rem] transition-colors ${
                  isActive ? "text-zinc-900" : "text-zinc-300"
                }`}
              >
                /{s.code}
              </span>
              <span
                className={`block h-px transition-all ${
                  isActive ? "w-12 bg-zinc-900" : "w-6 bg-zinc-300"
                }`}
              />
              <span
                className={`mono text-[0.7rem] tracking-[0.2em] uppercase transition-colors ${
                  isActive ? "text-zinc-900" : "text-zinc-400"
                }`}
              >
                {s.label}
              </span>
            </li>
          );
        })}
      </ul>
    </aside>
  );
}
