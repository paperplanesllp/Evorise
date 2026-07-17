import { useState } from 'react'

function ContactIcon({ type }) {
  const common = 'h-6 w-6'

  if (type === 'phone') {
    return (
      <svg className={common} viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path
          d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.8-.4 1.2-.3 1.3.4 2.6.6 4 .6.7 0 1.2.5 1.2 1.2v3.5c0 .7-.5 1.2-1.2 1.2C10.6 21.4 2.6 13.4 2.6 3.4c0-.7.5-1.2 1.2-1.2h3.5c.7 0 1.2.5 1.2 1.2 0 1.4.2 2.7.6 4 .1.4 0 .9-.3 1.2l-2.2 2.2Z"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    )
  }

  if (type === 'location') {
    return (
      <svg className={common} viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path
          d="M12 21s7-5.4 7-11a7 7 0 1 0-14 0c0 5.6 7 11 7 11Z"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M12 12.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z"
          stroke="currentColor"
          strokeWidth="1.8"
        />
      </svg>
    )
  }

  return (
    <svg className={common} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M4 6.5h16v11H4v-11Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="m4 7 8 6 8-6"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState(null) // 'success' or 'error'
  const [statusMessage, setStatusMessage] = useState('')

  const handleSubmit = async (event) => {
    event.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus(null)
    setStatusMessage('')

    const formElement = event.currentTarget
    const formData = new FormData(formElement)

    const payload = {
      name: formData.get('name'),
      email: formData.get('email'),
      phone: formData.get('mobile'),
      interest: formData.get('interest'),
      message: formData.get('message'),
    }

    try {
      const endpoint = import.meta.env.VITE_CONTACT_FORM_ENDPOINT

      if (!endpoint) {
        throw new Error(
          'Form submission is not configured. Please try again later or contact us directly at info@evorise.com'
        )
      }

      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      })

      if (!response.ok) {
        throw new Error(`Server responded with status ${response.status}`)
      }

      setSubmitStatus('success')
      setStatusMessage('Thank you! Your message has been sent. We'll contact you soon.')
      formElement.reset()

      // Auto-clear success message after 5 seconds
      setTimeout(() => {
        setSubmitStatus(null)
        setStatusMessage('')
      }, 5000)
    } catch (error) {
      setSubmitStatus('error')
      setStatusMessage(
        error.message || 'Something went wrong. Please try again or contact us directly.'
      )
    } finally {
      setIsSubmitting(false)
    }
  }

  const contactInfo = [
    { type: 'phone', label: ' +91 90370 71916 ' },
    { type: 'location', label: 'Kochi, Kerala, India' },
    { type: 'email', label: 'info@evorise.com' },
  ]

  const socialLinks = [
    { label: 'IG', href: 'https://www.instagram.com/evorise.in/' },
    { label: 'IN', href: '' },
    { label: 'YT', href: 'https://www.youtube.com/@theevoriseecosystem' },
    { label: 'X', href: '' },
  ]

  return (
    <section id="contact" className="bg-white py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="relative lg:py-10">
          <div className="relative z-20 flex min-h-[650px] w-full flex-col justify-between bg-[#0f6f78] px-8 py-12 text-white shadow-2xl shadow-teal-900/20 sm:px-12 lg:absolute lg:left-0 lg:top-0 lg:h-[650px] lg:w-[430px] lg:rounded-bl-none lg:rounded-r-none lg:rounded-tl-[24px] lg:px-[60px] lg:py-[60px]">
            <div>
              <h2 className="text-4xl font-bold tracking-tight">
                Contact Directly
              </h2>

              <div className="mt-16 space-y-10">
                {contactInfo.map((item) => (
                  <div key={item.type} className="flex items-center gap-5">
                    <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-white/10 text-white">
                      <ContactIcon type={item.type} />
                    </span>
                    <span className="text-lg font-semibold leading-7">
                      {item.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-16 flex flex-wrap gap-4">
              {socialLinks.map((item) => (
                <a
                  key={item.label}
                  href={item.href || '#contact'}
                  target={item.href ? '_blank' : undefined}
                  rel={item.href ? 'noreferrer' : undefined}
                  className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-sm font-extrabold text-[#0f6f78] shadow-lg"
                >
                  {item.label}
                </a>
              ))}
            </div>
          </div>

          <div className="relative mt-8 border border-teal-700 bg-white px-6 py-10 shadow-xl sm:px-10 lg:mt-0 lg:min-h-[690px] lg:pl-[520px] lg:pr-16 lg:pt-16">
            <div className="absolute left-1/2 top-1/2 z-30 hidden h-14 w-14 -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-full shadow-md lg:left-[430px] lg:flex">
              <span className="flex h-full w-1/2 items-center justify-end bg-white pr-0.5 text-base font-extrabold text-black">
                O
              </span>
              <span className="flex h-full w-1/2 items-center justify-start bg-black pl-0.5 text-base font-extrabold text-white">
                R
              </span>
            </div>

            <div className="mx-auto mb-8 flex h-14 w-14 overflow-hidden rounded-full shadow-md lg:hidden">
              <span className="flex h-full w-1/2 items-center justify-end bg-white pr-0.5 text-sm font-extrabold text-black">
                O
              </span>
              <span className="flex h-full w-1/2 items-center justify-start bg-black pl-0.5 text-sm font-extrabold text-white">
                R
              </span>
            </div>

            <form onSubmit={handleSubmit} className="grid gap-5">
              <h2 className="text-4xl font-bold tracking-tight text-[#151515] md:text-5xl">
                Let's Talk
              </h2>

              <p className="mb-4 text-base leading-7 text-slate-600">
                Whether you're just starting a forex trading course or ready to automate a working strategy, tell us where you are — we'll take it from there.
              </p>

              {submitStatus === 'success' && (
                <div className="rounded-lg bg-green-50 p-4 text-green-800">
                  {statusMessage}
                </div>
              )}

              {submitStatus === 'error' && (
                <div className="rounded-lg bg-red-50 p-4 text-red-800">
                  {statusMessage}
                </div>
              )}

              <input
                name="name"
                type="text"
                placeholder="Name"
                className="rounded-lg bg-[#f5f5f5] px-6 py-5 text-base text-[#151515] outline-none transition focus:ring-2 focus:ring-teal-700/30"
                required
                disabled={isSubmitting}
              />
              <input
                name="mobile"
                type="tel"
                placeholder="Mobile"
                className="rounded-lg bg-[#f5f5f5] px-6 py-5 text-base text-[#151515] outline-none transition focus:ring-2 focus:ring-teal-700/30"
                required
                disabled={isSubmitting}
              />
              <input
                name="email"
                type="email"
                placeholder="Email"
                className="rounded-lg bg-[#f5f5f5] px-6 py-5 text-base text-[#151515] outline-none transition focus:ring-2 focus:ring-teal-700/30"
                required
                disabled={isSubmitting}
              />
              <select
                name="interest"
                className="rounded-lg bg-[#f5f5f5] px-6 py-5 text-base text-[#151515] outline-none transition focus:ring-2 focus:ring-teal-700/30"
                required
                defaultValue=""
                disabled={isSubmitting}
              >
                <option value="" disabled>
                  I'm interested in
                </option>
                <option value="Academy">Academy</option>
                <option value="Strategy Lab">Strategy Lab</option>
                <option value="Not sure yet">Not sure yet</option>
              </select>
              <textarea
                name="message"
                placeholder="Message"
                className="h-[180px] resize-none rounded-lg bg-[#f5f5f5] px-6 py-5 text-base text-[#151515] outline-none transition focus:ring-2 focus:ring-teal-700/30"
                required
                disabled={isSubmitting}
              />

              <button
                type="submit"
                disabled={isSubmitting}
                className="mt-4 w-fit rounded-xl bg-teal-800 px-10 py-6 text-base font-extrabold uppercase tracking-[0.18em] text-white transition-all duration-300 hover:-translate-y-1 hover:bg-teal-900 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Sending...' : 'LET\'S TALK'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Contact
