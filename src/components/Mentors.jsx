import gokulImage from '../assets/Gokul.jpeg'

const mentors = [
  {
    name: 'Gokul V.S',
    image: gokulImage,
    description:
      'Guided by mentor Gokul V S, a Financial Educator with strong expertise in research & development, investments, and market analysis, Evorise Academy delivers structured learning for every stage of the trading journey — from complete beginners to advanced traders. Our approach combines quality educational content, live market insights, and continuous learner support, helping traders build the discipline and market understanding to make informed decisions around risk, strategy, and long-term growth. Known for a practical, research-backed teaching style, Gokul helps learners build sound trading habits, avoid common mistakes, and approach the markets with clarity and confidence.',
  },

]

function MentorSpotlight({ mentor }) {
  return (
    <article className="mt-20 grid lg:grid-cols-2">
      <div className="min-h-[420px] overflow-hidden bg-gradient-to-br from-[#090909] via-[#2b2b2b] to-[#050505] lg:min-h-[560px]">
        <img
          src={mentor.image}
          alt={mentor.name}
          className="h-full w-full object-cover grayscale transition-transform duration-500 hover:scale-105"
          onError={(event) => {
            event.currentTarget.style.display = 'none'
          }}
        />
      </div>

      <div className="flex flex-col justify-center bg-[#1f1f1f] px-7 py-10 text-white sm:px-10 lg:px-14 lg:py-16">
        <span className="text-sm font-extrabold uppercase tracking-[0.28em] text-teal-300">
          Mentor
        </span>
        <h3 className="mt-5 text-4xl font-extrabold leading-tight tracking-tight md:text-5xl">
          {mentor.name}
        </h3>
        <p className="mt-7 text-lg font-medium leading-9 text-white/90">
          {mentor.description}
        </p>
      </div>
    </article>
  )
}

function Mentors() {
  const mentor = mentors[0]

  return (
    <section
      id="mentors"
      className="bg-[radial-gradient(circle_at_left,#ffe2eb_0%,transparent_28%),radial-gradient(circle_at_center,#d9f7ff_0%,transparent_35%),radial-gradient(circle_at_right,#fff3b8_0%,transparent_30%),linear-gradient(135deg,#fff7fa_0%,#eef8ff_45%,#f8fff1_100%)] py-24 lg:py-32"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="mx-auto flex w-fit items-center gap-4 rounded-full bg-white/85 px-7 py-4 text-lg font-extrabold text-slate-700 shadow-xl shadow-black/10">
          <span className="h-4 w-4 rounded-full bg-teal-700" />
          <span>Evorise Guide</span>
          <span className="h-4 w-4 rounded-full bg-teal-700" />
        </div>

        <h2 className="mt-10 text-center text-5xl font-extrabold leading-tight tracking-tight text-[#151515] md:text-7xl">
          Meet Your Mentor
        </h2>

        {mentor && <MentorSpotlight mentor={mentor} />}
      </div>
    </section>
  )
}

export default Mentors
