export default function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-6 pt-28 pb-20">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-blue-50 rounded-full blur-3xl opacity-50" />
      </div>

      <div className="relative max-w-3xl mx-auto text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 border border-blue-100 mb-8 opacity-0 animate-fade-in [animation-delay:0.1s] [animation-fill-mode:forwards]">
          <span className="w-1.5 h-1.5 rounded-full bg-blue-500" aria-hidden="true" />
          <span className="text-xs font-medium text-blue-700 tracking-wider uppercase">
            Frontend Engineer · Freelance
          </span>
        </div>

        {/* Heading */}
        <h1 className="font-heading font-extrabold text-5xl md:text-6xl lg:text-7xl text-zinc-900 leading-[1.08] tracking-tight mb-6 opacity-0 animate-fade-up [animation-delay:0.2s] [animation-fill-mode:forwards]">
          美しいUIを、
          <br />
          <span className="text-blue-600">確かな技術</span>で。
        </h1>

        {/* Description */}
        <p className="text-base md:text-lg text-zinc-500 max-w-lg mx-auto mb-10 leading-relaxed opacity-0 animate-fade-up [animation-delay:0.38s] [animation-fill-mode:forwards]">
          React・Next.js を中心に、ユーザー体験にこだわった
          フロントエンド開発を提供します。
          <br />
          スタートアップから中規模サービスまで対応。
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center opacity-0 animate-fade-up [animation-delay:0.55s] [animation-fill-mode:forwards]">
          <a
            href="#contact"
            className="px-8 py-3.5 bg-zinc-900 text-white font-medium rounded-2xl hover:bg-zinc-700 transition-colors duration-200 cursor-pointer text-sm"
          >
            お問い合わせ
          </a>
          <a
            href="#portfolio"
            className="px-8 py-3.5 bg-white text-zinc-700 font-medium rounded-2xl border border-zinc-200 hover:border-zinc-300 hover:bg-zinc-50 transition-colors duration-200 cursor-pointer text-sm"
          >
            実績を見る
          </a>
        </div>

        {/* Stats */}
        <div className="mt-16 flex flex-wrap justify-center gap-10 opacity-0 animate-fade-up [animation-delay:0.72s] [animation-fill-mode:forwards]">
          {[
            { value: "3+", label: "年の経験" },
            { value: "20+", label: "制作実績" },
            { value: "100%", label: "納期遵守率" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="font-heading font-bold text-3xl text-zinc-900">{stat.value}</p>
              <p className="text-sm text-zinc-400 mt-1">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 opacity-0 animate-fade-in [animation-delay:1s] [animation-fill-mode:forwards]">
        <div className="flex flex-col items-center gap-1.5 text-zinc-400">
          <span className="text-xs tracking-widest uppercase">Scroll</span>
          <svg
            className="w-4 h-4 animate-bounce"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>
    </section>
  );
}
