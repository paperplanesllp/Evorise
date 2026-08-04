import { useContactModal } from '../hooks/useContactModal'
import academyImage from '../assets/acadamy.jpg'
import strategyImage from '../assets/stratergy.jpg'
import academyDetailImage from '../assets/innaca.jpg'
import strategyDetailImage from '../assets/lab.jpg'

const services = [
  {
    title: 'Evorise Academy',
    description:
      'A forex trading academy in Kochi for anyone who wants to learn forex trading online or in person — from the fundamentals to the discipline it takes to attempt a funded trading challenge.',
    cta: 'Explore Academy',
    image: academyImage,
  },
  {
    title: 'Evorise Strategy Lab',
    description:
      "For traders who already have a strategy that works. Bring it in for backtesting, get it reviewed through a strategy consultation, or have it fully built into an automated trading system — so your edge doesn't depend on you being at the screen.",
    cta: 'Explore Strategy Lab',
    image: strategyImage,
  },
]

const academyCourses = [
  {
    title: 'Online Forex Trading Course',
    icon: 'online',
    description:
      'Learn forex trading online at your own pace, through structured, practical modules covering market fundamentals — built for beginners who want a real foundation, not shortcuts.',
  },
  {
    title: 'Offline Forex Trading Course',
    icon: 'classroom',
    description:
      'In-person, mentor-led forex trading classes in Kochi for traders who learn best with direct guidance and real-time feedback.',
  },
  {
    title: 'Live Forex Trading Floor',
    icon: 'chart',
    description:
      'Learn in a live trading environment alongside mentors and fellow traders — built for those working toward funded account challenges and who want real exposure to market pressure, not just theory.',
  },
]

const strategyLabServices = [
  {
    title: 'Trading Strategy Backtesting',
    icon: 'backtest',
    description:
      "Not sure if your strategy holds up? Bring it in and we'll run a strategy backtesting pass against historical data before you risk live capital on it.",
  },
  {
    title: 'Strategy Consultation',
    icon: 'consultation',
    description:
      "Get an expert read on your current approach — where it's strong, where it's exposed, and what it would take to run it systematically. This isn't portfolio management or trading on your behalf — it's a second, expert set of eyes on a strategy that's already yours.",
  },
  {
    title: 'Full Algorithm Development',
    icon: 'automation',
    description:
      "Have a strategy that works but can't be at the screen every hour it needs? We handle the algorithmic trading automation — building your own strategy into a system that runs on your terms, not your availability.",
  },
]

function DetailIcon({ type }) {
  const paths = {
    online: (
      <>
        <rect x="3" y="4" width="18" height="13" rx="2" />
        <path d="M8 21h8M12 17v4M8 11l2.5-2.5 2 2L16 7" />
      </>
    ),
    classroom: (
      <>
        <circle cx="9" cy="8" r="3" />
        <circle cx="17" cy="9" r="2.5" />
        <path d="M3 20c.5-4 2.5-6 6-6s5.5 2 6 6M15 15c3.5-.5 5.5 1.2 6 4.5" />
      </>
    ),
    chart: (
      <>
        <path d="M4 20V5M4 20h17" />
        <path d="m7 15 4-4 3 2 6-7" />
        <path d="M17 6h3v3" />
      </>
    ),
    backtest: (
      <>
        <path d="M4 7h16v12H4z" />
        <path d="M8 4v6M16 4v6M4 11h16M8 15h3M14 15h2" />
      </>
    ),
    consultation: (
      <>
        <path d="M4 5h16v11H9l-5 4V5Z" />
        <path d="M8 9h8M8 12h5" />
      </>
    ),
    automation: (
      <>
        <path d="m8 7-4 5 4 5M16 7l4 5-4 5M14 4l-4 16" />
      </>
    ),
  }

  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-6 w-6"
      aria-hidden="true"
    >
      {paths[type]}
    </svg>
  )
}

function Services() {
  const { openModal } = useContactModal()

  return (
    <section id="services" className="bg-[#f7f7f7] py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <h2 className="text-center text-4xl font-bold uppercase tracking-tight md:text-6xl">
          <span className="text-[#151515]">OUR </span>
          <span className="text-teal-700">SERVICES</span>
        </h2>

        <p className="mt-6 text-center text-lg font-extrabold uppercase tracking-[0.22em] text-[#151515]">
          Two Pillars
        </p>

        <div className="mx-auto mt-16 grid max-w-6xl gap-8 md:grid-cols-2 lg:gap-10">
          {services.map((service, index) => (
            <article
              key={service.title}
              className="service-animate group flex h-full flex-col overflow-hidden rounded-3xl border border-black/10 bg-white p-3 shadow-sm transition-all duration-500 ease-out hover:-translate-y-2 hover:border-[#0f9f8f]/35 hover:shadow-xl sm:p-4"
              style={{ animationDelay: `${index * 120}ms` }}
            >
              <div className="h-[300px] overflow-hidden rounded-2xl bg-slate-100 sm:h-[340px] lg:h-[380px]">
                <img
                  src={service.image}
                  alt={service.title}
                  className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  onError={(event) => {
                    event.currentTarget.style.display = 'none'
                  }}
                />
              </div>

              <div className="flex flex-1 flex-col px-4 pb-8 sm:px-6 lg:px-8 lg:pb-10">
                <h3 className="mx-auto mt-8 min-h-[5.5rem] max-w-[24rem] text-center text-3xl font-extrabold uppercase leading-tight tracking-tight text-[#151515] md:text-[34px]">
                  {service.title}
                </h3>

                <p className="mt-5 flex-1 text-center text-base leading-7 text-slate-600">
                  {service.description}
                </p>

                <button
                  type="button"
                  onClick={openModal}
                  className="mx-auto mt-8 flex items-center justify-center gap-3 text-sm font-medium text-black/35 transition-colors duration-300 hover:text-[#0f9f8f] md:text-base"
                >
                  <span>{service.cta}</span>
                  <span
                    aria-hidden="true"
                    className="transition-transform duration-300 ease-out group-hover:translate-x-1"
                  >
                    →
                  </span>
                </button>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-20 border-t border-black/10 pt-16 sm:mt-24 sm:pt-20">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-sm font-bold uppercase tracking-[0.24em] text-teal-700">Course Details</p>
            <h3 className="mt-4 text-3xl font-extrabold leading-tight tracking-tight text-[#151515] sm:text-4xl lg:text-5xl">
              Choose the support that fits your trading journey
            </h3>
            <p className="mt-5 text-base leading-7 text-slate-600 sm:text-lg">
              Build your foundation through guided education or strengthen an existing
              strategy with structured testing and automation.
            </p>
          </div>

          <div className="mt-12 grid items-start gap-8 lg:grid-cols-2 lg:gap-10">
            {[
              {
                eyebrow: 'For new and developing traders',
                title: 'Evorise Academy',
                description: 'Practical learning formats designed around clarity, guidance, and real market exposure.',
                image: academyDetailImage,
                items: academyCourses,
              },
              {
                eyebrow: 'For traders with an existing edge',
                title: 'Evorise Strategy Lab',
                description: 'Technical services that help validate, refine, and systematically execute your strategy.',
                image: strategyDetailImage,
                items: strategyLabServices,
              },
            ].map((pillar) => (
              <article
                key={pillar.title}
                className="service-animate overflow-hidden rounded-3xl border border-black/10 bg-white shadow-sm"
              >
                <div className="relative h-52 overflow-hidden bg-slate-100 sm:h-60">
                  <img
                    src={pillar.image}
                    alt=""
                    className="h-full w-full object-cover"
                    onError={(event) => {
                      event.currentTarget.style.display = 'none'
                    }}
                  />
                  <div className="absolute inset-x-0 bottom-0 bg-[#151515]/90 px-6 py-5 text-white sm:px-8">
                    <p className="text-xs font-bold uppercase tracking-[0.2em] text-teal-300">
                      {pillar.eyebrow}
                    </p>
                    <h4 className="mt-2 text-2xl font-extrabold sm:text-3xl">{pillar.title}</h4>
                  </div>
                </div>

                <div className="p-5 sm:p-8">
                  <p className="text-base leading-7 text-slate-600">{pillar.description}</p>

                  <div className="mt-7 grid gap-4">
                    {pillar.items.map((item, index) => (
                      <div
                        key={item.title}
                        className="group flex gap-4 rounded-2xl border border-slate-200 bg-slate-50 p-4 transition-colors duration-300 hover:border-teal-700/30 hover:bg-teal-50 sm:p-5"
                      >
                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-teal-700 text-white">
                          <DetailIcon type={item.icon} />
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="flex items-start gap-3">
                            <h5 className="flex-1 text-lg font-bold leading-6 text-[#151515]">
                              {item.title}
                            </h5>
                            <span className="text-xs font-bold text-teal-700">0{index + 1}</span>
                          </div>
                          <p className="mt-2 text-sm leading-6 text-slate-600 sm:text-base sm:leading-7">
                            {item.description}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <button
                    type="button"
                    onClick={openModal}
                    className="mt-7 w-full rounded-xl bg-[#151515] px-6 py-4 text-sm font-bold uppercase tracking-[0.14em] text-white transition-colors duration-300 hover:bg-teal-700"
                  >
                    Talk to the Evorise team
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Services
