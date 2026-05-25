type Props = {
  inverted?: boolean;
  size?: number;
};

export function CornerMarks({ inverted = false, size = 16 }: Props) {
  const cls = inverted ? "border-white/40" : "border-zinc-900/40";
  return (
    <div className="pointer-events-none absolute inset-0" aria-hidden>
      {[
        "top-6 left-6 border-l border-t",
        "top-6 right-6 border-r border-t",
        "bottom-6 left-6 border-l border-b",
        "bottom-6 right-6 border-r border-b",
      ].map((p) => (
        <span
          key={p}
          className={`absolute ${p} ${cls}`}
          style={{ width: size, height: size }}
        />
      ))}
    </div>
  );
}
