import type { Tab } from "./MainContent";

interface BottomNavProps {
  activeTab: Tab;
  onChange: (tab: Tab) => void;
}

export default function BottomNav({ activeTab, onChange }: BottomNavProps) {
  return (
    <nav
      className="fixed top-5 right-5 z-50 flex items-center gap-1 bg-white/90 backdrop-blur-md rounded-full shadow-md border border-zinc-200/80 p-1"
      aria-label="ページ切り替え"
    >
      <button
        onClick={() => onChange("works")}
        className={`px-5 py-2 text-xs font-medium tracking-widest uppercase rounded-full transition-all duration-250 cursor-pointer ${
          activeTab === "works"
            ? "bg-zinc-900 text-white shadow-sm"
            : "text-zinc-400 hover:text-zinc-800"
        }`}
        aria-pressed={activeTab === "works"}
      >
        Works
      </button>
      <button
        onClick={() => onChange("profile")}
        className={`px-5 py-2 text-xs font-medium tracking-widest uppercase rounded-full transition-all duration-250 cursor-pointer ${
          activeTab === "profile"
            ? "bg-zinc-900 text-white shadow-sm"
            : "text-zinc-400 hover:text-zinc-800"
        }`}
        aria-pressed={activeTab === "profile"}
      >
        Profile
      </button>
    </nav>
  );
}
