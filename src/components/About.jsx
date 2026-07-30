function About() {
  const divisions = [
    {
      title: 'Evorise Academy',
      description:
        'Structured forex education for beginners who need a clear process instead of noise and hype.',
    },
    {
      title: 'Evorise Strategy Lab',
      description:
        'Strategy backtesting, consultation, and automation for traders who already have an edge.',
    },
  ]

  const beliefs = [
    'Trading is a skill, not a shortcut - we teach the process, not promises.',
    'A strategy is only as good as the discipline behind it - automation should support that discipline, not replace it.',
    'Transparency first - no guaranteed returns, no inflated claims. Just forex education and tools that hold up to scrutiny.',
  ]
  const outlineWords = ['Analyze', 'Succeed', 'Trade', 'Master']
  const solidWords = ['Trade', 'Succeed', 'Analyze', 'Master']

  return (
    <section id="about" className="relative overflow-hidden bg-white py-16 sm:py-20 lg:py-28">
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-stretch gap-10 px-6 sm:gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16 lg:px-10">
        <div className="relative order-2 min-h-[360px] lg:order-1 lg:min-h-0">
          <div className="h-full overflow-hidden rounded-xl bg-slate-100 shadow-xl shadow-slate-200/70">
            <img
              src="/service-live.jpg"
              alt="Live forex trading floor"
              className="h-[360px] w-full object-cover md:h-[460px] lg:h-full lg:min-h-[680px]"
              onError={(event) => {
                event.currentTarget.style.display = 'none'
              }}
            />
          </div>

          <div className="absolute bottom-4 left-4 right-4 grid gap-4 rounded-2xl border border-slate-200/70 bg-white/95 p-5 shadow-xl sm:bottom-6 sm:left-6 sm:right-6 md:grid-cols-2 lg:p-6">
            {divisions.map((division) => (
              <div key={division.title}>
                <h3 className="text-base font-extrabold text-slate-950">
                  {division.title}
                </h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  {division.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="order-1 flex flex-col justify-center lg:order-2 lg:py-6">
          <div className="inline-flex items-center gap-3 rounded-full bg-teal-50 px-5 py-2.5 text-sm font-bold uppercase tracking-[0.18em] text-teal-800">
            <span className="h-2.5 w-2.5 rounded-full bg-teal-700" />
            <span>Who We Are</span>
          </div>

          <h2 className="mt-6 max-w-4xl text-[38px] font-extrabold leading-[1.12] tracking-tight text-[#151515] sm:mt-7 sm:text-4xl md:text-5xl lg:text-[58px]">
            Your Trusted Partner in Forex Education & Trading Automation
          </h2>

          <div className="mt-6 max-w-3xl space-y-4 text-base leading-7 text-slate-600 sm:mt-7 sm:space-y-5 sm:text-lg sm:leading-8">
            <p>
              Evorise was built on a simple idea: trading rewards structure, not guesswork.
              We work with two kinds of traders - those just starting out, who need an
              honest forex trading course instead of noise and hype, and those already
              trading, who've built a strategy that works but need it to run without being
              chained to a screen.
            </p>
            <p>
              That's why Evorise operates as two connected divisions under one roof:
              Evorise Academy for forex education, and Evorise Strategy Lab for trading
              strategy automation. Same standards, same team, two different stages of the
              same trading journey.
            </p>
          </div>

          <div className="mt-8 sm:mt-9">
            <h3 className="text-2xl font-extrabold tracking-tight text-[#151515]">
              What We Believe
            </h3>
            <div className="mt-5 grid gap-3">
              {beliefs.map((belief, index) => (
                <div
                  key={belief}
                  className="flex gap-4 rounded-2xl border border-slate-200 bg-slate-50 p-4 sm:p-5"
                >
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-teal-700 text-sm font-extrabold text-white">
                    {index + 1}
                  </span>
                  <p className="text-base leading-7 text-slate-700">{belief}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="mt-20 overflow-hidden lg:mt-24">
        <div className="marquee-track marquee-left whitespace-nowrap text-[72px] font-extrabold leading-none text-transparent md:text-[96px] lg:text-[112px]">
          {[0, 1].map((group) => (
            <div
              key={`outline-group-${group}`}
              className="marquee-group gap-16 pr-16"
              aria-hidden={group === 1}
            >
              {outlineWords.map((word) => (
                <span
                  key={`${group}-${word}`}
                  className={word === 'Master' ? 'bg-teal-700 px-3 text-white' : undefined}
                  style={{ WebkitTextStroke: '1.2px #111' }}
                >
                  {word}
                </span>
              ))}
            </div>
          ))}
        </div>

        <div className="marquee-track marquee-right mt-10 whitespace-nowrap text-[76px] font-extrabold leading-none text-black md:text-[104px] lg:text-[120px]">
          {[0, 1].map((group) => (
            <div
              key={`solid-group-${group}`}
              className="marquee-group gap-20 pr-20"
              aria-hidden={group === 1}
            >
              {solidWords.map((word) => (
                <span
                  key={`${group}-${word}`}
                  className={word === 'Trade' ? 'bg-teal-700 px-3 text-white' : undefined}
                >
                  {word}
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default About
