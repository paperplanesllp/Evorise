import { useContactModal } from '../hooks/useContactModal'

function Hero() {
  const { openModal } = useContactModal()
  const outlineTextStyle = {
    WebkitTextStroke: '1.4px #111',
  }

  return (
    <section
      id="home"
      className="overflow-hidden bg-[#f4fbf9] px-5 pb-12 pt-24 sm:min-h-screen sm:px-8 sm:pb-20 sm:pt-32 lg:px-12"
    >
      <div className="mx-auto w-full max-w-[1800px] text-center">
        <div className="mobile-hero-words mx-auto flex max-w-[1600px] flex-col items-center justify-center gap-1 text-[clamp(2.5rem,12vw,3.5rem)] font-bold leading-[1.08] tracking-[-0.03em] sm:flex-row sm:flex-wrap sm:gap-8 sm:text-4xl md:text-7xl lg:flex-nowrap lg:gap-16 lg:text-[90px]">
          <span
            className="mobile-hero-word cursor-pointer whitespace-nowrap text-transparent transition-all duration-500 hover:text-black"
            style={outlineTextStyle}
          >
            <span className="sm:hidden">Learn.</span>
            <span className="hidden sm:inline">Learn </span>
          </span>

          <span
            className="mobile-hero-word cursor-pointer whitespace-nowrap text-transparent transition-all duration-500 hover:text-black"
            style={outlineTextStyle}
          >
            <span className="sm:hidden">Build.</span>
            <span className="hidden sm:inline">Build </span>
          </span>

          <span
            className="mobile-hero-word cursor-pointer whitespace-nowrap text-transparent transition-all duration-500 hover:text-black"
            style={outlineTextStyle}
          >
            <span className="sm:hidden">Automate.</span>
            <span className="hidden sm:inline">Automate .</span>
          </span>
        </div>

        <div className="mt-8 flex w-full max-w-full items-center justify-between gap-2.5 rounded-full border border-black/5 bg-white/90 px-4 py-3 text-sm font-bold leading-5 text-slate-700 shadow-lg backdrop-blur-sm sm:mx-auto sm:mt-16 sm:w-fit sm:gap-4 sm:px-8 sm:py-4 sm:text-base">
          <span className="h-2.5 w-2.5 shrink-0 rounded-full bg-teal-700 sm:h-3 sm:w-3" />
          <span className="min-w-0 text-center">A Forex Trading Ecosystem Built Around You</span>
          <span className="h-2.5 w-2.5 shrink-0 rounded-full bg-teal-700 sm:h-3 sm:w-3" />
        </div>

        <h1 className="mx-auto mt-8 max-w-6xl break-words text-[clamp(2.35rem,11vw,3rem)] font-bold leading-[1.02] tracking-tight text-[#111111] sm:mt-12 sm:text-5xl md:text-7xl lg:text-[85px]">
          Master the Markets with Evorise
        </h1>

        <p className="mx-auto mt-6 max-w-5xl break-words text-left text-base leading-8 text-slate-600 sm:mt-10 sm:text-lg sm:leading-9 md:text-justify md:text-[22px] md:[text-align-last:left]">
          Evorise is a forex trading ecosystem based in Kochi — not just another course, and not a promise of overnight success. We're built around two pillars: Evorise Academy, a structured forex trading course for anyone starting out, and Evorise Strategy Lab, where experienced traders get their strategy backtested, refined, or fully automated. Wherever you are in your trading journey, Evorise is built to help you make informed trading decisions — not empty promises.
        </p>

        <div className="mt-8 flex justify-center sm:mt-14">
          <button
            type="button"
            onClick={openModal}
            className="w-full max-w-xs rounded-xl bg-teal-700 px-8 py-4 text-sm font-extrabold uppercase tracking-[0.18em] text-white shadow-xl shadow-teal-700/20 transition-all duration-300 hover:-translate-y-1 hover:bg-teal-800 sm:w-auto sm:max-w-none sm:px-12 sm:text-base"
          >
            Start Here
          </button>
        </div>
      </div>
    </section>
  )
}

export default Hero
