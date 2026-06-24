const services = [
  {
    title: 'Online Forex Market Training',
    image: '/service-online.jpg',
    size: 'side',
    gradient: 'from-[#f7f7f7] via-[#e8f6f3] to-[#d9d3ea]',
  },
  {
    title: 'Offline Forex Market Training',
    image: '/service-offline.jpg',
    size: 'center',
    gradient: 'from-[#f8fbfa] via-[#d4f2ec] to-[#beb6dd]',
  },
  {
    title: 'Live Forex Market Trading Floor',
    image: '/service-live.jpg',
    size: 'side',
    gradient: 'from-[#f7f7f7] via-[#ece9f5] to-[#caeee7]',
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

                  <button
                    type="button"
                    onClick={scrollToContact}
                    className="mx-auto mt-8 flex items-center justify-center gap-3 text-sm font-medium text-black/35 transition-colors duration-300 hover:text-[#0f9f8f] md:text-base"
                  >
                    <span>Click Here</span>
                    <span aria-hidden="true">→</span>
                  </button>
                </div>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default Services
