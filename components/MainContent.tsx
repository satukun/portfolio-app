"use client";

import { useState, useRef } from "react";
import WorksPage from "./WorksPage";
import ProfilePage from "./ProfilePage";
import Contact from "./Contact";
import Footer from "./Footer";
import BottomNav from "./BottomNav";
import EmailFAB from "./EmailFAB";
import GeometricBackground from "./GeometricBackground";

export type Tab = "works" | "profile";

type Direction = "left" | "right";
type AnimationPhase = "idle" | "out" | "in";

export default function MainContent() {
  const [activeTab, setActiveTab] = useState<Tab>("works");
  const [displayedTab, setDisplayedTab] = useState<Tab>("works");
  const [direction, setDirection] = useState<Direction>("left");
  const [phase, setPhase] = useState<AnimationPhase>("idle");
  const isAnimating = phase !== "idle";
  const pendingTab = useRef<Tab | null>(null);

  const handleTabChange = (newTab: Tab) => {
    if (newTab === activeTab || isAnimating) return;

    const dir: Direction = newTab === "profile" ? "left" : "right";
    setDirection(dir);
    setActiveTab(newTab);
    pendingTab.current = newTab;
    setPhase("out");
  };

  const handleOutAnimationEnd = () => {
    if (phase !== "out") return;
    const next = pendingTab.current;
    if (next !== null) {
      setDisplayedTab(next);
      pendingTab.current = null;
    }
    setPhase("in");
  };

  const handleInAnimationEnd = () => {
    if (phase !== "in") return;
    setPhase("idle");
  };

  // アウトフェーズ: direction="left" → slide-out-left（Works→Profile）
  //               direction="right" → slide-out-right（Profile→Works）
  // インフェーズ:  direction="left" → slide-in-right（右から入ってくる）
  //               direction="right" → slide-in-left（左から入ってくる）
  const getAnimationClass = (): string => {
    if (phase === "out") {
      return direction === "left" ? "tab-slide-out-left" : "tab-slide-out-right";
    }
    if (phase === "in") {
      return direction === "left" ? "tab-slide-in-right" : "tab-slide-in-left";
    }
    return "page-enter";
  };

  const animationClass = getAnimationClass();
  const onAnimationEnd = phase === "out"
    ? handleOutAnimationEnd
    : phase === "in"
    ? handleInAnimationEnd
    : undefined;

  return (
    <>
      <main className="min-h-screen bg-canvas">
        <GeometricBackground />
        <div
          key={`${displayedTab}-${phase}`}
          className={`${animationClass} relative z-10`}
          onAnimationEnd={onAnimationEnd}
        >
          {displayedTab === "works" ? <WorksPage /> : <ProfilePage />}
        </div>
        <div className="relative z-10">
          <Contact />
        </div>
        <div className="relative z-10">
          <Footer />
        </div>
      </main>
      <BottomNav activeTab={activeTab} onChange={handleTabChange} />
      <EmailFAB />
    </>
  );
}
