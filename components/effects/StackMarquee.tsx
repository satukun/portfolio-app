"use client";

type Props = {
  items: string[];
};

export function StackMarquee({ items }: Props) {
  const duplicated = [...items, ...items, ...items];
  return (
    <div className="relative overflow-hidden border-y border-zinc-900/10 py-6">
      <div className="marquee">
        {duplicated.map((item, i) => (
          <span
            key={`${item}-${i}`}
            className="mono text-[0.7rem] tracking-[0.3em] uppercase text-zinc-500"
          >
            {item}
            <span className="ml-12 text-zinc-300">·</span>
          </span>
        ))}
      </div>
    </div>
  );
}
