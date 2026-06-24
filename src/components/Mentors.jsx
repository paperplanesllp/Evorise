const mentors = [
  {
    name: 'Muhammed Shifan',
    image: '/mentor-1.jpg',
    description:
      'With 4 years of experience in cryptocurrency and 2 years in Forex markets, specializes in Gold, Currency Pairs, and Bitcoin trading. Combining technical expertise with strategic insights, equips traders with data-driven approaches to navigate volatile markets.',
  },
  {
    name: 'Ananya',
    image: '/mentor-2.jpg',
    description:
      'With 2 years of experience in Forex and the Indian market, brings a strong foundation in both technical and fundamental analysis. Specializes in developing advanced trading systems tailored to diverse market needs.',
  },
  {
    name: 'Mohammed Iyas',
    image: '/mentor-3.jpg',
    description:
      'A professional forex trader with over 5 years of hands-on market experience, specializing in pure price action trading. Primary focus is Gold (XAU/USD), traded with discipline, clarity, and data-driven strategies.',
  },
  {
    name: 'Rahul ',
    image: '/mentor-4.jpg',
    description:
      'A dedicated trading educator focused on helping beginners understand market structure, risk planning, trade psychology, and practical execution with confidence.',
  },
  {
    name: 'Zaira',
    image: '/mentor-5.jpg',
    description:
      'An experienced market coach guiding students through live chart analysis, strategy refinement, and disciplined trading habits for long-term consistency.',
  },
]

function MentorCard({ mentor }) {
  return (
    <article className="group overflow-hidden rounded-xl">
      <div className="h-[520px] overflow-hidden rounded-t-xl bg-gradient-to-br from-[#090909] via-[#2b2b2b] to-[#050505]">
        <img
          src={mentor.image}
          alt={mentor.name}
          className="h-full w-full object-cover grayscale transition-transform duration-500 group-hover:scale-105"
          onError={(event) => {
            event.currentTarget.style.display = 'none'
          }}
        />
      </div>

      <div className="rounded-b-xl bg-[#1f1f1f] px-7 py-8 text-center text-white">
        <h3 className="text-3xl font-extrabold tracking-tight">{mentor.name}</h3>
        <p className="mt-6 text-base font-medium leading-8 text-white">
          {mentor.description}
        </p>
      </div>
    </article>
  )
}

function Mentors() {
  const firstRow = mentors.slice(0, 3)
  const secondRow = mentors.slice(3)

  return (
    <section
      id="mentors"
      className="bg-[radial-gradient(circle_at_left,#ffe2eb_0%,transparent_28%),radial-gradient(circle_at_center,#d9f7ff_0%,transparent_35%),radial-gradient(circle_at_right,#fff3b8_0%,transparent_30%),linear-gradient(135deg,#fff7fa_0%,#eef8ff_45%,#f8fff1_100%)] py-24 lg:py-32"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="mx-auto flex w-fit items-center gap-4 rounded-full bg-white/85 px-7 py-4 text-lg font-extrabold text-slate-700 shadow-xl shadow-black/10">
          <span className="h-4 w-4 rounded-full bg-teal-700" />
          <span>Our Mentors</span>
          <span className="h-4 w-4 rounded-full bg-teal-700" />
        </div>

        <h2 className="mt-10 text-center text-5xl font-extrabold leading-tight tracking-tight text-[#151515] md:text-7xl">
          Meet Our Expert Mentors
        </h2>

        <div className="mt-20 grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-3">
          {firstRow.map((mentor) => (
            <MentorCard key={mentor.name} mentor={mentor} />
          ))}
        </div>

        <div className="mt-10 grid grid-cols-1 gap-10 md:grid-cols-2 lg:mx-auto lg:max-w-[840px]">
          {secondRow.map((mentor) => (
            <MentorCard key={mentor.name} mentor={mentor} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default Mentors
