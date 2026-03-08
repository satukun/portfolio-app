export default function EmailFAB() {
  return (
    <a
      href="#contact"
      className="fixed bottom-6 right-6 z-50 w-12 h-12 bg-zinc-900 rounded-full flex items-center justify-center shadow-md hover:bg-zinc-700 transition-colors duration-200 cursor-pointer"
      aria-label="お問い合わせへ移動"
    >
      <svg
        className="w-5 h-5 text-white"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
        />
      </svg>
    </a>
  );
}
