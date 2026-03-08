"use client";

import { useState, useEffect } from "react";

const NAV_LINKS = [
  { label: "スキル", href: "#skills" },
  { label: "実績", href: "#portfolio" },
  { label: "お問い合わせ", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[calc(100%-2rem)] max-w-5xl transition-all duration-300 rounded-2xl ${
        scrolled
          ? "bg-white/90 backdrop-blur-md shadow-sm border border-zinc-200"
          : "bg-white/70 backdrop-blur-sm border border-zinc-200/60"
      }`}
    >
      <div className="flex items-center justify-between px-6 py-3.5">
        <a
          href="#"
          className="font-heading font-semibold text-zinc-900 text-base tracking-tight hover:text-zinc-600 transition-colors duration-200 cursor-pointer"
        >
          Your Name
        </a>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-7">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-zinc-500 hover:text-zinc-900 transition-colors duration-200 cursor-pointer"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#contact"
            className="text-sm font-medium px-5 py-2 bg-zinc-900 text-white rounded-xl hover:bg-zinc-700 transition-colors duration-200 cursor-pointer"
          >
            相談する
          </a>
        </nav>

        {/* Mobile hamburger */}
        <button
          className="md:hidden p-2 rounded-lg text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100 transition-colors duration-200 cursor-pointer"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? "メニューを閉じる" : "メニューを開く"}
          aria-expanded={menuOpen}
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            {menuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile nav dropdown */}
      {menuOpen && (
        <div className="md:hidden px-6 pb-5 pt-3 flex flex-col gap-3 border-t border-zinc-100">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-zinc-600 hover:text-zinc-900 transition-colors duration-200 cursor-pointer py-1"
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </a>
          ))}
          <a
            href="#contact"
            className="text-sm font-medium px-5 py-2.5 bg-zinc-900 text-white rounded-xl hover:bg-zinc-700 transition-colors duration-200 cursor-pointer text-center mt-1"
            onClick={() => setMenuOpen(false)}
          >
            相談する
          </a>
        </div>
      )}
    </header>
  );
}
