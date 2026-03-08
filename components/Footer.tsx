export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="py-5 px-8 border-t border-zinc-200">
      <div className="max-w-5xl mx-auto flex items-center justify-between">
        <p className="text-xs text-zinc-400">
          ©{year} PORTFOLIO
          <span className="mx-2 text-zinc-300" aria-hidden="true">•</span>
          <a
            href="#"
            className="hover:text-zinc-700 transition-colors duration-200 cursor-pointer"
          >
            PRIVACY POLICY
          </a>
        </p>
      </div>
    </footer>
  );
}
