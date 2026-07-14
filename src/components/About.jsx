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
    <section id="about" className="relative overflow-hidden bg-white py-20 lg:py-28">
      <style>
        {`
          @keyframes marqueeLeft {
            from { transform: translateX(0); }
            to { transform: translateX(-50%); }
          }

          @keyframes marqueeRight {
            from { transform: translateX(-50%); }
            to { transform: translateX(0); }
          }
        `}
      </style>

      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-6 lg:grid-cols-[0.9fr_1.1fr] lg:px-10">
        <div className="relative">
          <div className="overflow-hidden rounded-lg bg-slate-100 shadow-xl shadow-slate-200/70">
            <img
              src="/service-live.jpg"
              alt="Live forex trading floor"
              className="h-[320px] w-full object-cover md:h-[440px] lg:h-[540px]"
              onError={(event) => {
                event.currentTarget.style.display = 'none'
              }}
            />
          </div>

          <div className="absolute bottom-6 left-6 right-6 grid gap-3 rounded-lg border border-white/30 bg-white/92 p-5 shadow-xl backdrop-blur md:grid-cols-2">
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

        <div className="lg:pl-6">
          <div className="inline-flex items-center gap-3 rounded-full bg-teal-50 px-5 py-2.5 text-sm font-bold uppercase tracking-[0.18em] text-teal-800">
            <span className="h-2.5 w-2.5 rounded-full bg-teal-700" />
            <span>Who We Are</span>
          </div>

          <h2 className="mt-7 max-w-4xl text-4xl font-extrabold leading-tight tracking-tight text-[#151515] md:text-5xl lg:text-[58px]">
            Your Trusted Partner in Forex Education & Trading Automation
          </h2>

          <div className="mt-7 max-w-3xl space-y-5 text-lg leading-8 text-slate-600">
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

          <div className="mt-9">
            <h3 className="text-2xl font-extrabold tracking-tight text-[#151515]">
              What We Believe
            </h3>
            <div className="mt-5 grid gap-3">
              {beliefs.map((belief, index) => (
                <div
                  key={belief}
                  className="flex gap-4 rounded-lg border border-slate-200 bg-slate-50 p-4"
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
        <div
          className="flex w-max gap-16 whitespace-nowrap text-[72px] font-extrabold leading-none text-transparent md:text-[96px] lg:text-[112px]"
          style={{
            WebkitTextStroke: '1.2px #111',
            animation: 'marqueeLeft 18s linear infinite',
          }}
        >
          {[...outlineWords, ...outlineWords, ...outlineWords].map(
            (word, index) => (
              <span
                key={`outline-${index}`}
                className={
                  word === 'Master'
                    ? 'bg-blue-600 px-3 text-white'
                    : undefined
                }
                style={word === 'Master' ? { WebkitTextStroke: '1.2px #111' } : undefined}
              >
                {word}
              </span>
            ),
          )}
        </div>

        <div
          className="mt-10 flex w-max gap-20 whitespace-nowrap text-[76px] font-extrabold leading-none text-black md:text-[104px] lg:text-[120px]"
          style={{
            animation: 'marqueeRight 18s linear infinite',
          }}
        >
          {[...solidWords, ...solidWords, ...solidWords].map((word, index) => (
            <span
              key={`solid-${index}`}
              className={word === 'Trade' ? 'bg-blue-600 px-3 text-white' : undefined}
            >
              {word}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}

export default About
