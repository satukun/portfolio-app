"use client";

import { useEffect } from "react";

export function ConsoleEgg() {
  useEffect(() => {
    if (typeof window === "undefined") return;
    if ((window as unknown as { __yotec_egg?: boolean }).__yotec_egg) return;
    (window as unknown as { __yotec_egg?: boolean }).__yotec_egg = true;

    const banner = `
   ╭─────────────────────────────────────────╮
   │                                         │
   │   Y O . T E C   /   P O R T F O L I O   │
   │                                         │
   │   the craft behind the system.          │
   │                                         │
   ╰─────────────────────────────────────────╯
`;

    const style1 = "color:#111;font-weight:600;font-family:monospace;";
    const style2 = "color:#71717a;font-family:monospace;font-size:11px;";
    const style3 =
      "color:#111;font-family:monospace;text-decoration:underline;font-size:12px;";

    // eslint-disable-next-line no-console
    console.log(`%c${banner}`, style1);
    // eslint-disable-next-line no-console
    console.log("%cYou opened DevTools. Welcome, fellow engineer.", style2);
    // eslint-disable-next-line no-console
    console.log("%c→ Want to work together? hello@yo-tec.com", style3);
    // eslint-disable-next-line no-console
    console.log(
      "%cThis site was built with Next.js, framer-motion, and a lot of espresso.",
      style2
    );
  }, []);

  return null;
}
