export default function Loading() {
  return (
    <div className="pt-16 pb-16">
      <div className="max-w-5xl mx-auto px-8">

        {/* Hero heading */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4 mb-10">
          <div>
            <div className="skeleton rounded h-[clamp(60px,10vw,120px)] w-72 mb-2" />
            <div className="skeleton rounded h-[clamp(40px,7vw,88px)] w-52" />
          </div>
          <div className="skeleton rounded h-16 w-56" />
        </div>

        {/* Hero images */}
        <div
          className="grid gap-3 mb-8"
          style={{ gridTemplateColumns: "5fr 7fr", height: "340px" }}
        >
          <div className="skeleton" />
          <div className="skeleton" />
        </div>

        {/* Marquee strip */}
        <div className="skeleton h-10 mb-14" />

        {/* Device preview */}
        <div className="skeleton h-80 mb-20 rounded" />

        {/* Section label */}
        <div className="flex items-center gap-3 mb-8">
          <div className="skeleton h-4 w-32 rounded" />
          <div className="flex-1 h-px bg-zinc-200" />
        </div>

        {/* Project grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-5 gap-y-10">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i}>
              <div className="skeleton aspect-[4/3] mb-3" />
              <div className="skeleton h-3 w-3/4 rounded mb-1.5" />
              <div className="skeleton h-3 w-1/4 rounded" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
