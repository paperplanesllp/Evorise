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
    <article className="-mx-6 mt-14 grid overflow-hidden border-y border-black/10 bg-[#151515] shadow-xl shadow-black/10 sm:mx-0 sm:mt-16 sm:rounded-3xl sm:border lg:grid-cols-2">
      <div className="h-[300px] overflow-hidden bg-[#151515] sm:h-[420px] lg:h-auto lg:min-h-[600px]">
        <img
          src={mentor.image}
          alt={mentor.name}
          className="h-full w-full object-cover grayscale transition-transform duration-500 hover:scale-105"
          onError={(event) => {
            event.currentTarget.style.display = 'none'
          }}
        />
      </div>

      <div className="flex flex-col justify-center bg-[#1f1f1f] px-5 py-7 text-white sm:px-10 sm:py-10 lg:px-14 lg:py-16">
        <span className="text-xs font-extrabold uppercase tracking-[0.24em] text-teal-300 sm:text-sm sm:tracking-[0.28em]">
          Mentor
        </span>
        <h3 className="mt-3 text-[32px] font-extrabold leading-tight tracking-tight sm:mt-5 sm:text-4xl md:text-5xl">
          {mentor.name}
        </h3>
        <p className="mt-5 text-[15px] font-medium leading-6 text-white/90 sm:mt-7 sm:text-lg sm:leading-9">
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
      className="bg-[#f4fbf9] py-20 lg:py-28"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="mx-auto flex w-fit items-center gap-4 rounded-full bg-white/85 px-7 py-4 text-lg font-extrabold text-slate-700 shadow-xl shadow-black/10">
          <span className="h-4 w-4 rounded-full bg-teal-700" />
          <span>Evorise Guide</span>
          <span className="h-4 w-4 rounded-full bg-teal-700" />
        </div>

        <h2 className="mt-7 text-center text-4xl font-extrabold leading-tight tracking-tight text-[#151515] sm:text-5xl md:text-7xl">
          Meet Your Mentor
        </h2>

        {mentor && <MentorSpotlight mentor={mentor} />}
      </div>
    </section>
  )
}

export default Mentors
