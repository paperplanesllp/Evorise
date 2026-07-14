const services = [
  {
    title: 'Evorise Academy',
    description:
      'A forex trading academy in Kochi for anyone who wants to learn forex trading online or in person — from the fundamentals to the discipline it takes to attempt a funded trading challenge.',
    cta: 'Explore Academy',
    image: '/service-online.jpg',
    size: 'side',
    gradient: 'from-[#f7f7f7] via-[#e8f6f3] to-[#d9d3ea]',
  },
  {
    title: 'Evorise Strategy Lab',
    description:
      "For traders who already have a strategy that works. Bring it in for backtesting, get it reviewed through a strategy consultation, or have it fully built into an automated trading system — so your edge doesn't depend on you being at the screen.",
    cta: 'Explore Strategy Lab',
    image: '/service-live.jpg',
    size: 'center',
    gradient: 'from-[#f8fbfa] via-[#d4f2ec] to-[#beb6dd]',
  },
]

const academyCourses = [
  {
    title: 'Online Forex Trading Course',
    description:
      'Learn forex trading online at your own pace, through structured, practical modules covering market fundamentals — built for beginners who want a real foundation, not shortcuts.',
  },
  {
    title: 'Offline Forex Trading Course',
    description:
      'In-person, mentor-led forex trading classes in Kochi for traders who learn best with direct guidance and real-time feedback.',
  },
  {
    title: 'Live Forex Trading Floor',
    description:
      'Learn in a live trading environment alongside mentors and fellow traders — built for those working toward funded account challenges and who want real exposure to market pressure, not just theory.',
  },
]

const strategyLabServices = [
  {
    title: 'Trading Strategy Backtesting',
    description:
      "Not sure if your strategy holds up? Bring it in and we'll run a strategy backtesting pass against historical data before you risk live capital on it.",
  },
  {
    title: 'Strategy Consultation',
    description:
      "Get an expert read on your current approach — where it's strong, where it's exposed, and what it would take to run it systematically. This isn't portfolio management or trading on your behalf — it's a second, expert set of eyes on a strategy that's already yours.",
  },
  {
    title: 'Full Algorithm Development',
    description:
      "Have a strategy that works but can't be at the screen every hour it needs? We handle the algorithmic trading automation — building your own strategy into a system that runs on your terms, not your availability.",
  },
]

function Services() {
  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({
      behavior: 'smooth',
    })
  }

  return (
    <section id="services" className="bg-[#f7f7f7] py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <h2 className="text-center text-4xl font-bold uppercase tracking-tight md:text-6xl">
          <span className="text-[#8d879d]">OUR </span>
          <span className="text-[#0f9f8f]">SERVICES</span>
        </h2>

        <p className="mt-6 text-center text-lg font-extrabold uppercase tracking-[0.22em] text-[#31256f]">
          Two Pillars
        </p>

        <div className="mt-16 flex flex-col items-center justify-center gap-10 lg:flex-row lg:items-end">
          {services.map((service) => {
            const isCenter = service.size === 'center'

            return (
              <article
                key={service.title}
                className={`w-full border border-black/10 bg-white p-4 shadow-sm sm:max-w-[330px] ${
                  isCenter
                    ? 'lg:w-[470px] lg:max-w-[470px] lg:p-5'
                    : 'lg:mb-10 lg:w-[320px] lg:max-w-[320px]'
                }`}
              >
                <div
                  className={`overflow-hidden bg-gradient-to-br ${service.gradient} ${
                    isCenter ? 'h-[390px] md:h-[450px]' : 'h-[270px] md:h-[320px]'
                  }`}
                >
                  <img
                    src={service.image}
                    alt={service.title}
                    className="h-full w-full object-cover"
                    onError={(event) => {
                      event.currentTarget.style.display = 'none'
                    }}
                  />
                </div>

                <div className={isCenter ? 'px-8 pb-10' : 'px-6 pb-8'}>
                  <h3
                    className={`mx-auto mt-8 max-w-[22rem] text-center font-extrabold uppercase leading-tight tracking-tight text-[#31256f] ${
                      isCenter
                        ? 'text-3xl md:text-[38px]'
                        : 'text-2xl md:text-[28px]'
                    }`}
                  >
                    {service.title}
                  </h3>

                  <p className="mt-5 text-center text-base leading-7 text-slate-600">
                    {service.description}
                  </p>

                  <button
                    type="button"
                    onClick={scrollToContact}
                    className="mx-auto mt-8 flex items-center justify-center gap-3 text-sm font-medium text-black/35 transition-colors duration-300 hover:text-[#0f9f8f] md:text-base"
                  >
                    <span>{service.cta}</span>
                    <span aria-hidden="true">→</span>
                  </button>
                </div>
              </article>
            )
          })}
        </div>

        <div className="mt-20 grid gap-10 lg:grid-cols-2">
          <div className="bg-white p-8 shadow-sm">
            <h3 className="text-3xl font-extrabold leading-tight tracking-tight text-[#31256f]">
              Evorise Academy — Forex Trading Course in Kochi
            </h3>

            <div className="mt-8 space-y-7">
              {academyCourses.map((course) => (
                <div key={course.title}>
                  <h4 className="text-xl font-extrabold text-[#151515]">
                    {course.title}
                  </h4>
                  <p className="mt-2 text-base leading-7 text-slate-600">
                    {course.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white p-8 shadow-sm">
            <h3 className="text-3xl font-extrabold leading-tight tracking-tight text-[#31256f]">
              Evorise Strategy Lab — Trading Automation & Backtesting
            </h3>

            <div className="mt-8 space-y-7">
              {strategyLabServices.map((service) => (
                <div key={service.title}>
                  <h4 className="text-xl font-extrabold text-[#151515]">
                    {service.title}
                  </h4>
                  <p className="mt-2 text-base leading-7 text-slate-600">
                    {service.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Services
