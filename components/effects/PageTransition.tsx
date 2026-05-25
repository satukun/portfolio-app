"use client";

import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

function labelFor(path: string): string {
  if (path === "/") return "/index";
  return path.toLowerCase();
}

export function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [overlay, setOverlay] = useState<{ visible: boolean; path: string }>({
    visible: false,
    path: pathname ?? "/",
  });

  // Trigger overlay on path change
  useEffect(() => {
    if (!pathname) return;
    setOverlay({ visible: true, path: pathname });
    const t = setTimeout(
      () => setOverlay((p) => ({ ...p, visible: false })),
      720
    );
    return () => clearTimeout(t);
  }, [pathname]);

  return (
    <>
      <AnimatePresence mode="wait">
        <motion.div
          key={pathname}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          transition={{
            duration: 0.55,
            delay: 0.22,
            ease: [0.16, 1, 0.3, 1],
          }}
        >
          {children}
        </motion.div>
      </AnimatePresence>

      {/* Wipe overlay */}
      <AnimatePresence>
        {overlay.visible && (
          <>
            {/* Black sliding panel — bottom up */}
            <motion.div
              key={`wipe-${overlay.path}`}
              initial={{ y: "100%" }}
              animate={{ y: ["100%", "0%", "0%", "-100%"] }}
              exit={{ opacity: 0 }}
              transition={{
                duration: 0.72,
                times: [0, 0.35, 0.55, 1],
                ease: [0.85, 0, 0.15, 1],
              }}
              className="fixed inset-0 z-[95] bg-zinc-950 pointer-events-none"
            >
              <div className="relative w-full h-full overflow-hidden">
                {/* grid lines */}
                <div
                  className="absolute inset-0 opacity-[0.08]"
                  style={{
                    backgroundImage:
                      "linear-gradient(to right, rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.5) 1px, transparent 1px)",
                    backgroundSize: "80px 80px",
                  }}
                />
                {/* terminal text center */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: [0, 1, 1, 0] }}
                  transition={{
                    duration: 0.72,
                    times: [0, 0.3, 0.6, 1],
                  }}
                  className="absolute inset-0 flex items-center justify-center px-6"
                >
                  <div className="mono text-white/85 text-xs tracking-[0.2em] flex items-center gap-3">
                    <span className="opacity-60">$</span>
                    <span>cd {labelFor(overlay.path)}</span>
                    <span className="inline-block w-2 h-3 bg-white/80 blink" />
                  </div>
                </motion.div>

                {/* corner marks */}
                {[
                  "top-6 left-6 border-l border-t",
                  "top-6 right-6 border-r border-t",
                  "bottom-6 left-6 border-l border-b",
                  "bottom-6 right-6 border-r border-b",
                ].map((p) => (
                  <span
                    key={p}
                    className={`absolute w-4 h-4 ${p} border-white/40`}
                  />
                ))}
              </div>
            </motion.div>

            {/* Trailing line slide — adds a "scan" feel */}
            <motion.div
              key={`scan-${overlay.path}`}
              initial={{ scaleX: 0 }}
              animate={{ scaleX: [0, 1, 1, 0] }}
              transition={{
                duration: 0.72,
                times: [0, 0.4, 0.55, 1],
                ease: "linear",
              }}
              style={{ transformOrigin: "left" }}
              className="fixed top-0 left-0 right-0 z-[96] h-px bg-white/90 pointer-events-none"
            />
          </>
        )}
      </AnimatePresence>
    </>
  );
}
