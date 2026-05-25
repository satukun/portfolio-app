"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const SEQUENCE = [
  "$ cd /portfolio",
  "$ ls -la /requested-path",
  "ls: /requested-path: No such file or directory",
  "$ status → 404",
  "$ suggest: cd ~",
];

export default function NotFound() {
  const [lines, setLines] = useState<string[]>([]);

  useEffect(() => {
    let i = 0;
    const tick = () => {
      if (i >= SEQUENCE.length) return;
      setLines((p) => [...p, SEQUENCE[i]]);
      i += 1;
      setTimeout(tick, 380);
    };
    const t = setTimeout(tick, 300);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="min-h-screen px-6 lg:px-10 pt-32 pb-24 flex flex-col">
      <div className="mono text-[0.7rem] leading-[2] text-zinc-700 max-w-2xl">
        {lines.map((l, i) => (
          <div key={i}>
            <span className="text-zinc-300 mr-3">{String(i + 1).padStart(2, "0")}</span>
            {l}
          </div>
        ))}
        <span className="inline-block">
          <span className="text-zinc-300 mr-3">{String(lines.length + 1).padStart(2, "0")}</span>
          <span className="blink">▌</span>
        </span>
      </div>

      <div className="mt-auto pt-24 grid grid-cols-1 md:grid-cols-12 gap-8 items-end">
        <div className="md:col-span-7">
          <span className="eyebrow">error · 404</span>
          <h1 className="mt-6 display-xl">
            page not <br />
            <span className="serif-accent text-zinc-500">found.</span>
          </h1>
        </div>
        <div className="md:col-span-5 space-y-3">
          <Link
            href="/"
            data-cursor="link"
            className="block view-more"
          >
            cd ~ (home)
          </Link>
          <Link
            href="/works"
            data-cursor="link"
            className="block view-more"
          >
            cd ./works
          </Link>
          <Link
            href="/contact"
            data-cursor="link"
            className="block view-more"
          >
            cd ./contact
          </Link>
        </div>
      </div>
    </div>
  );
}
