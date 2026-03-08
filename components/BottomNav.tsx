import type { Tab } from "./MainContent";

interface BottomNavProps {
  activeTab: Tab;
  onChange: (tab: Tab) => void;
}

export default function BottomNav({ activeTab, onChange }: BottomNavProps) {
  return (
    <nav
      className="fixed top-6 right-6 z-50 flex items-stretch overflow-hidden border border-zinc-300 shadow-sm bg-canvas"
      aria-label="ページ切り替え"
    >
      <button
        onClick={() => onChange("works")}
        className={`px-6 py-2.5 text-xs font-medium tracking-widest uppercase transition-colors duration-200 cursor-pointer ${
          activeTab === "works"
            ? "bg-white text-zinc-900"
            : "text-zinc-400 hover:text-zinc-700"
        }`}
        aria-pressed={activeTab === "works"}
      >
        Works
      </button>
      <div className="w-px bg-zinc-300" aria-hidden="true" />
      <button
        onClick={() => onChange("profile")}
        className={`px-6 py-2.5 text-xs font-medium tracking-widest uppercase transition-colors duration-200 cursor-pointer ${
          activeTab === "profile"
            ? "bg-white text-zinc-900"
            : "text-zinc-400 hover:text-zinc-700"
        }`}
        aria-pressed={activeTab === "profile"}
      >
        Profile
      </button>
    </nav>
  );
}
