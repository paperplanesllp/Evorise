const snaps = [
  {
    image: '/snap-1.jpg',
    alt: 'Evorise training moment one',
    gradient: 'from-[#f8fbff] via-[#d9f7ff] to-[#ffe2eb]',
  },
  {
    image: '/snap-2.jpg',
    alt: 'Evorise training moment two',
    gradient: 'from-[#fff8da] via-[#eef8ff] to-[#d9f7ff]',
  },
  {
    image: '/snap-3.jpg',
    alt: 'Evorise training moment three',
    gradient: 'from-[#fff7fa] via-[#e8f6f3] to-[#f8fff1]',
  },
  {
    image: '/snap-4.jpg',
    alt: 'Evorise training moment four',
    gradient: 'from-[#eef8ff] via-[#f7f7f7] to-[#fff3b8]',
  },
  {
    image: '/snap-5.jpg',
    alt: 'Evorise training moment five',
    gradient: 'from-[#ffe2eb] via-[#f8fbff] to-[#d9f7ff]',
  },
  {
    image: '/snap-6.jpg',
    alt: 'Evorise training moment six',
    gradient: 'from-[#f8fff1] via-[#eef8ff] to-[#fff7fa]',
  },
]

function Snaps() {
  return (
    <section id="snaps" className="bg-white py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="mx-auto flex w-fit items-center gap-4 rounded-full bg-white px-7 py-4 text-lg font-extrabold text-slate-700 shadow-xl shadow-black/10">
          <span className="h-4 w-4 rounded-full bg-teal-700" />
          <span>Our Snaps</span>
          <span className="h-4 w-4 rounded-full bg-teal-700" />
        </div>

        <h2 className="mt-10 text-center text-5xl font-bold leading-tight tracking-tight text-[#151515] md:text-7xl">
          Evorise Stories
        </h2>

        <div className="mt-14 grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-10">
          {snaps.map((snap) => (
            <article
              key={snap.image}
              className={`h-[320px] overflow-hidden rounded-[24px] bg-gradient-to-br ${snap.gradient} shadow-sm transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl md:h-[380px]`}
            >
              <img
                src={snap.image}
                alt={snap.alt}
                className="h-full w-full object-cover"
                onError={(event) => {
                  event.currentTarget.style.display = 'none'
                }}
              />
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Snaps
