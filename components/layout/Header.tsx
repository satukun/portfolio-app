"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";

const NAV = [
  { href: "/", label: "Index", code: "/00" },
  { href: "/works", label: "Works", code: "/01" },
  { href: "/about", label: "About", code: "/02" },
  { href: "/approach", label: "Approach", code: "/03" },
  { href: "/contact", label: "Contact", code: "/04" },
];

export function Header() {
  const pathname = usePathname();

  return (
    <motion.header
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4, duration: 0.8 }}
      className="fixed top-0 left-0 right-0 z-50 px-6 lg:px-10 py-6 mix-blend-difference"
    >
      <div className="flex items-center justify-between text-[#fafaf9]">
        <Link href="/" className="group inline-flex items-baseline gap-3">
          <span className="mono text-[0.7rem] tracking-[0.3em] uppercase">
            YO.TEC
          </span>
          <span className="text-[0.6rem] tracking-[0.25em] uppercase opacity-50 hidden sm:inline">
            / Yosuke Sato
          </span>
        </Link>

        <nav>
          <ul className="flex items-center gap-6 lg:gap-10">
            {NAV.map((item) => {
              const active =
                item.href === "/"
                  ? pathname === "/"
                  : pathname?.startsWith(item.href);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    data-cursor="link"
                    className="group inline-flex items-center gap-2"
                  >
                    <span className="mono text-[0.55rem] opacity-50 hidden md:inline">
                      {item.code}
                    </span>
                    <span
                      className={`mono text-[0.7rem] tracking-[0.25em] uppercase transition-opacity ${
                        active ? "opacity-100" : "opacity-60 group-hover:opacity-100"
                      }`}
                    >
                      {item.label}
                    </span>
                    {active && (
                      <motion.span
                        layoutId="nav-dot"
                        className="w-1 h-1 rounded-full bg-current"
                      />
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </motion.header>
  );
}
