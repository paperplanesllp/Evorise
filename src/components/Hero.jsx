import { Link } from 'react-router-dom'

function Hero() {
  const outlineTextStyle = {
    WebkitTextStroke: '1.4px #111',
  }

  const scrollToSection = (id) => {
    const section = document.querySelector(id)
    section?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section
      id="home"
      className="min-h-screen overflow-hidden bg-[radial-gradient(circle_at_top_left,#d9f7e5_0%,transparent_32%),radial-gradient(circle_at_top_right,#f7e1ff_0%,transparent_28%),linear-gradient(135deg,#f8fff9_0%,#fff8ef_45%,#f8f7ff_100%)] px-6 pb-20 pt-28 lg:pt-32"
    >
      <div className="mx-auto w-full max-w-[1800px] text-center">
        <div className="mx-auto flex max-w-[1600px] flex-wrap justify-center gap-8 text-4xl font-bold leading-none tracking-tight md:text-7xl lg:flex-nowrap lg:gap-16 lg:text-[90px]">
          <span
            className="cursor-pointer text-transparent transition-all duration-500 hover:text-black"
            style={outlineTextStyle}
          >
            Learn It.
          </span>

          <span
            className="cursor-pointer text-transparent transition-all duration-500 hover:text-black"
            style={outlineTextStyle}
          >
            Build It.
          </span>

          <span
            className="cursor-pointer text-transparent transition-all duration-500 hover:text-black"
            style={outlineTextStyle}
          >
            Automate It.
          </span>
        </div>

        <div className="mt-16 inline-flex items-center gap-4 rounded-full border border-black/5 bg-white/90 px-8 py-4 text-base font-bold text-slate-700 shadow-lg backdrop-blur-sm">
          <span className="h-3 w-3 rounded-full bg-teal-700" />
          <span>A Forex Trading Ecosystem Built Around You</span>
          <span className="h-3 w-3 rounded-full bg-teal-700" />
        </div>

        <h1 className="mx-auto mt-12 max-w-6xl text-5xl font-bold leading-[1.05] tracking-tight text-[#111111] md:text-7xl lg:text-[85px]">
          Master the Markets with Evorise
        </h1>

        <p className="mx-auto mt-10 max-w-5xl text-left text-lg leading-9 text-slate-600 md:text-justify md:text-[22px] md:[text-align-last:left]">
          Evorise is a forex trading ecosystem based in Kochi — not just another course, and not a promise of overnight success. We're built around two pillars: Evorise Academy, a structured forex trading course for anyone starting out, and Evorise Strategy Lab, where experienced traders get their strategy backtested, refined, or fully automated. Wherever you are in your trading journey, Evorise is built to help you make informed trading decisions — not empty promises.
        </p>

        <div className="mt-14 flex justify-center">
          <Link
            to="/contact"
            onClick={(e) => {
              e.preventDefault()
              scrollToSection('#contact')
            }}
            className="rounded-xl bg-teal-700 px-12 py-4 text-base font-extrabold uppercase tracking-[0.18em] text-white shadow-xl shadow-teal-700/20 transition-all duration-300 hover:-translate-y-1 hover:bg-teal-800"
          >
            Start Here
          </Link>
        </div>
      </div>
    </section>
  )
}

export default Hero
