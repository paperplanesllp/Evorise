import { Link } from 'react-router-dom'

function About() {
  const scrollToAbout = (event) => {
    event.preventDefault()
    document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })
  }

  const outlineWords = ['Analyze', 'Succeed', 'Trade', 'Master']
  const solidWords = ['Trade', 'Succeed', 'Analyze', 'Master']

  return (
    <section id="about" className="relative overflow-hidden bg-white py-24 lg:py-32">
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

      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-16 px-6 lg:grid-cols-2 lg:px-10">
        <div className="relative h-[620px] overflow-hidden rounded-[32px] bg-[#7B45C4] shadow-2xl shadow-purple-900/20">
          <img
            src="/about-student.png"
            alt="Forex student"
            className="absolute bottom-0 left-6 h-[94%] w-auto object-contain"
          />

          <div className="absolute left-20 top-24">
            <div className="h-10 w-10 rounded-full bg-yellow-500 shadow-lg" />
            <div className="ml-8 mt-2 h-8 w-8 rounded-full bg-yellow-500 shadow-lg" />
            <div className="ml-3 mt-2 h-7 w-7 rounded-full bg-yellow-500 shadow-lg" />
          </div>

          <div className="absolute left-20 top-16 h-24 w-32 rotate-[-35deg] border-r-4 border-t-4 border-white/20" />
        </div>

        <div>
          <div className="inline-flex items-center gap-3 rounded-full bg-white px-6 py-3 text-base font-bold text-slate-700 shadow-lg">
            <span className="h-3 w-3 rounded-full bg-teal-700" />
            <span>Who We Are?</span>
            <span className="h-3 w-3 rounded-full bg-teal-700" />
          </div>

          <h2 className="mt-8 text-5xl font-extrabold leading-[1.12] tracking-tight text-[#151515] md:text-6xl lg:text-[72px]">
            Your Trusted Partner in Forex Education & Trading
          </h2>

          <p className="mt-8 max-w-2xl text-lg leading-9 text-slate-600 md:text-[24px]">
            At Evorise, we provide expert training in forex trading, market
            analysis, and risk management, helping traders build profitable
            strategies with confidence.
          </p>

          <Link
            to="/#about"
            onClick={scrollToAbout}
            className="mt-12 inline-flex rounded-xl bg-teal-700 px-14 py-6 text-base font-extrabold uppercase tracking-[0.22em] text-white shadow-xl shadow-teal-700/25 transition-all duration-300 hover:-translate-y-1 hover:bg-teal-800"
          >
            ABOUT EVORISE
          </Link>
        </div>
      </div>

      <div className="mt-28 overflow-hidden">
        <div
          className="flex w-max gap-20 whitespace-nowrap text-[90px] font-extrabold leading-none text-transparent md:text-[118px]"
          style={{
            WebkitTextStroke: '1.2px #111',
            animation: 'marqueeLeft 18s linear infinite',
          }}
        >
          {[...outlineWords, ...outlineWords, ...outlineWords].map(
            (word, index) => (
              <span key={`outline-${index}`}>{word}</span>
            ),
          )}
        </div>

        <div
          className="mt-16 flex w-max gap-28 whitespace-nowrap text-[96px] font-extrabold leading-none text-black md:text-[128px]"
          style={{
            animation: 'marqueeRight 18s linear infinite',
          }}
        >
          {[...solidWords, ...solidWords, ...solidWords].map((word, index) => (
            <span key={`solid-${index}`}>{word}</span>
          ))}
        </div>
      </div>
    </section>
  )
}

export default About