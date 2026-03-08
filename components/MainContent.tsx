"use client";

import { useState } from "react";
import WorksPage from "./WorksPage";
import ProfilePage from "./ProfilePage";
import Contact from "./Contact";
import Footer from "./Footer";
import BottomNav from "./BottomNav";
import EmailFAB from "./EmailFAB";

export type Tab = "works" | "profile";

export default function MainContent() {
  const [activeTab, setActiveTab] = useState<Tab>("works");

  return (
    <>
      <main className="min-h-screen bg-canvas">
        <div key={activeTab} className="page-enter">
          {activeTab === "works" ? <WorksPage /> : <ProfilePage />}
        </div>
        <Contact />
        <Footer />
      </main>
      <BottomNav activeTab={activeTab} onChange={setActiveTab} />
      <EmailFAB />
    </>
  );
}
