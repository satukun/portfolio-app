"use client";

import { useEffect, useRef } from "react";

const SKILLS = [
  {
    name: "React",
    level: "Advanced",
    icon: (
      <svg viewBox="0 0 24 24" className="w-7 h-7" aria-hidden="true">
        <circle cx="12" cy="12" r="2.05" fill="#61DAFB" />
        <ellipse cx="12" cy="12" rx="9" ry="3.5" fill="none" stroke="#61DAFB" strokeWidth="1" />
        <ellipse cx="12" cy="12" rx="9" ry="3.5" fill="none" stroke="#61DAFB" strokeWidth="1" transform="rotate(60 12 12)" />
        <ellipse cx="12" cy="12" rx="9" ry="3.5" fill="none" stroke="#61DAFB" strokeWidth="1" transform="rotate(120 12 12)" />
      </svg>
    ),
  },
  {
    name: "Next.js",
    level: "Advanced",
    icon: (
      <svg viewBox="0 0 24 24" className="w-7 h-7" fill="currentColor" aria-hidden="true">
        <path d="M11.572 0c-.176 0-.31.001-.358.007a19.76 19.76 0 0 1-.364.033C7.443.346 4.25 2.185 2.228 5.012a11.875 11.875 0 0 0-2.119 5.243c-.096.659-.108.854-.108 1.747s.012 1.089.108 1.748c.652 4.506 3.86 8.292 8.209 9.695.779.25 1.6.422 2.534.525.363.04 1.935.04 2.299 0 1.611-.178 2.977-.577 4.323-1.264.207-.106.247-.134.219-.158-.02-.013-.9-1.193-1.955-2.62l-1.919-2.592-2.404-3.558a338.739 338.739 0 0 0-2.422-3.556c-.009-.002-.018 1.579-.023 3.51-.007 3.38-.01 3.515-.052 3.595a.426.426 0 0 1-.206.214c-.075.037-.14.044-.495.044H7.81l-.108-.068a.438.438 0 0 1-.157-.171l-.05-.106.006-4.703.007-4.705.072-.092a.645.645 0 0 1 .174-.143c.096-.047.134-.051.54-.051.478 0 .558.018.682.154.035.038 1.337 1.999 2.895 4.361a10760.433 10760.433 0 0 0 4.735 7.17l1.9 2.879.096-.063a12.317 12.317 0 0 0 2.466-2.163 11.944 11.944 0 0 0 2.824-6.134c.096-.66.108-.854.108-1.748 0-.893-.012-1.088-.108-1.747C23.573 4.163 20.366.367 16.018.034c-.22-.017-.433-.027-.648-.034z" />
      </svg>
    ),
  },
  {
    name: "TypeScript",
    level: "Advanced",
    icon: (
      <svg viewBox="0 0 24 24" className="w-7 h-7" aria-hidden="true">
        <rect width="24" height="24" rx="3" fill="#3178C6" />
        <path fill="white" d="M13.5 12H11v7H9v-7H6.5v-2H13.5v2zm.5 6.5v-2.3c.7.5 1.5.8 2.3.8.85 0 1.2-.3 1.2-.7 0-.45-.35-.65-1.3-.95-1.45-.45-2.2-1.05-2.2-2.2 0-1.3 1.05-2.1 2.7-2.1.8 0 1.55.15 2.1.4v2.15c-.6-.4-1.3-.65-2-.65-.75 0-1.1.25-1.1.65 0 .4.3.6 1.2.9 1.5.5 2.3 1.1 2.3 2.3 0 1.35-1.05 2.15-2.9 2.15-.85 0-1.7-.2-2.3-.45z" />
      </svg>
    ),
  },
  {
    name: "Tailwind CSS",
    level: "Advanced",
    icon: (
      <svg viewBox="0 0 24 24" className="w-7 h-7" fill="#06B6D4" aria-hidden="true">
        <path d="M12.001 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C13.666 10.618 15.027 12 18.001 12c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C16.337 6.182 14.976 4.8 12.001 4.8zm-6 7.2c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624 1.177 1.194 2.538 2.576 5.512 2.576 3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C10.337 13.382 8.976 12 6.001 12z" />
      </svg>
    ),
  },
  {
    name: "JavaScript",
    level: "Advanced",
    icon: (
      <svg viewBox="0 0 24 24" className="w-7 h-7" aria-hidden="true">
        <rect width="24" height="24" rx="3" fill="#F7DF1E" />
        <path fill="#000" d="M6 18.5l1.7-1c.3.6.6.9 1.2.9.5 0 .8-.2.8-.9V11h2v7.5c0 2-1.2 2.9-2.9 2.9-1.5 0-2.4-.8-2.8-1.9zm6.5-.3l1.7-1c.4.7 1 1.2 2 1.2.8 0 1.4-.4 1.4-1 0-.7-.5-.9-1.5-1.3l-.5-.2c-1.5-.65-2.5-1.45-2.5-3.15 0-1.6 1.2-2.8 3-2.8 1.3 0 2.2.45 2.9 1.6l-1.6 1c-.35-.65-.7-.9-1.3-.9-.6 0-1 .35-1 .9 0 .65.4.9 1.3 1.3l.5.2c1.8.75 2.8 1.55 2.8 3.25 0 1.85-1.45 2.95-3.4 2.95-1.9 0-3.1-.9-3.8-2.1z" />
      </svg>
    ),
  },
  {
    name: "Node.js",
    level: "Intermediate",
    icon: (
      <svg viewBox="0 0 24 24" className="w-7 h-7" fill="#339933" aria-hidden="true">
        <path d="M11.998 24a2.85 2.85 0 0 1-1.413-.375L7.97 22.06c-.432-.24-.221-.325-.079-.374.57-.199.686-.244 1.294-.588.064-.036.148-.023.213.015l1.974 1.17c.076.041.183.041.252 0l7.699-4.444a.26.26 0 0 0 .126-.22V6.393a.262.262 0 0 0-.13-.225l-7.694-4.438a.255.255 0 0 0-.25 0L3.68 6.168a.263.263 0 0 0-.13.225v8.887c0 .09.048.173.126.217l2.11 1.218c1.148.574 1.848-.102 1.848-.783V7.29c0-.125.1-.222.224-.222h.977c.121 0 .222.097.222.222V15.93c0 1.534-.835 2.413-2.287 2.413-.447 0-.799 0-1.782-.484l-2.024-1.164a2.857 2.857 0 0 1-1.413-2.476V6.393c0-1.02.542-1.97 1.413-2.478l7.698-4.445a2.95 2.95 0 0 1 2.83 0l7.699 4.445a2.858 2.858 0 0 1 1.413 2.478v8.887c0 1.02-.543 1.97-1.413 2.476l-7.699 4.444a2.86 2.86 0 0 1-1.414.376z" />
      </svg>
    ),
  },
  {
    name: "Git",
    level: "Advanced",
    icon: (
      <svg viewBox="0 0 24 24" className="w-7 h-7" fill="#F05032" aria-hidden="true">
        <path d="M23.546 10.93L13.067.452a1.55 1.55 0 0 0-2.188 0L8.708 2.627l2.76 2.76a1.838 1.838 0 0 1 2.327 2.341l2.658 2.66a1.838 1.838 0 0 1 1.9 3.039 1.837 1.837 0 0 1-2.637-2.556L13.09 8.207v6.62a1.838 1.838 0 0 1 .483 3.595 1.838 1.838 0 0 1-2.292-1.774 1.838 1.838 0 0 1 1.01-1.642V8.01a1.838 1.838 0 0 1-.997-2.419L8.589 2.861 1.074 10.376a1.549 1.549 0 0 0 0 2.189l10.479 10.478a1.55 1.55 0 0 0 2.188 0l9.805-9.804a1.549 1.549 0 0 0 0-2.309" />
      </svg>
    ),
  },
  {
    name: "Figma",
    level: "Intermediate",
    icon: (
      <svg viewBox="0 0 24 24" className="w-7 h-7" aria-hidden="true">
        <path fill="#F24E1E" d="M8 24c2.208 0 4-1.792 4-4v-4H8c-2.208 0-4 1.792-4 4s1.792 4 4 4z" />
        <path fill="#FF7262" d="M4 12c0-2.208 1.792-4 4-4h4v8H8c-2.208 0-4-1.792-4-4z" />
        <path fill="#A259FF" d="M4 4c0-2.208 1.792-4 4-4h4v8H8C5.792 8 4 6.208 4 4z" />
        <path fill="#1ABCFE" d="M12 0h4c2.208 0 4 1.792 4 4s-1.792 4-4 4h-4V0z" />
        <path fill="#0ACF83" d="M20 12c0 2.208-1.792 4-4 4s-4-1.792-4-4 1.792-4 4-4 4 1.792 4 4z" />
      </svg>
    ),
  },
];

const LEVEL_COLORS: Record<string, string> = {
  Advanced: "bg-blue-50 text-blue-700 border-blue-100",
  Intermediate: "bg-zinc-100 text-zinc-600 border-zinc-200",
};

export default function Skills() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("visible");
        });
      },
      { threshold: 0.1 }
    );

    el.querySelectorAll(".reveal").forEach((elem) => observer.observe(elem));
    return () => observer.disconnect();
  }, []);

  return (
    <section id="skills" ref={sectionRef} className="py-24 px-6 bg-white">
      <div className="max-w-5xl mx-auto">
        <div className="mb-16">
          <p className="reveal text-xs font-semibold text-blue-600 tracking-widest uppercase mb-3">
            Skills
          </p>
          <h2 className="reveal reveal-delay-1 font-heading font-bold text-4xl md:text-5xl text-zinc-900 tracking-tight">
            技術スタック
          </h2>
          <p className="reveal reveal-delay-2 text-zinc-500 mt-4 max-w-lg leading-relaxed">
            フロントエンドを中心に、デザインからデプロイまで幅広く対応できます。
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {SKILLS.map((skill, i) => (
            <div
              key={skill.name}
              className={`reveal reveal-delay-${Math.min(i + 1, 5)} group flex flex-col items-start gap-3 p-5 rounded-2xl border border-zinc-100 bg-white hover:border-zinc-200 hover:shadow-md transition-all duration-300 cursor-default`}
            >
              <div className="p-2.5 rounded-xl bg-zinc-50 group-hover:bg-zinc-100 transition-colors duration-200">
                {skill.icon}
              </div>
              <div>
                <p className="font-medium text-zinc-900 text-sm">{skill.name}</p>
                <span
                  className={`inline-block mt-1.5 text-xs font-medium px-2 py-0.5 rounded-full border ${LEVEL_COLORS[skill.level]}`}
                >
                  {skill.level}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
