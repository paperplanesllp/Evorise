import { useState } from 'react'
import emailjs from '@emailjs/browser'
import { FaFacebookF, FaInstagram, FaXTwitter, FaYoutube } from 'react-icons/fa6'

const fieldClass =
  'h-12 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 hover:border-slate-300 focus:border-teal-700 focus:ring-4 focus:ring-teal-700/10 disabled:cursor-not-allowed disabled:bg-slate-100 disabled:text-slate-500'

function ContactIcon({ type }) {
  const commonProps = {
    className: 'h-5 w-5',
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.8,
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
    'aria-hidden': true,
  }

  if (type === 'phone') {
    return (
      <svg {...commonProps}>
        <path d="M8.2 3.5 10.3 8l-2.2 1.7a15 15 0 0 0 6.2 6.2l1.7-2.2 4.5 2.1-.8 3.1a2 2 0 0 1-2 1.6C9.9 20.5 3.5 14.1 3.5 6.3a2 2 0 0 1 1.6-2l3.1-.8Z" />
      </svg>
    )
  }

  if (type === 'location') {
    return (
      <svg {...commonProps}>
        <path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z" />
        <circle cx="12" cy="10" r="2.5" />
      </svg>
    )
  }

  return (
    <svg {...commonProps}>
      <path d="M4 6.5h16v11H4z" />
      <path d="m4.5 7 7.5 6 7.5-6" />
    </svg>
  )
}

function CheckIcon() {
  return (
    <svg
      className="h-4 w-4"
      viewBox="0 0 20 20"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      aria-hidden="true"
    >
      <path d="m4 10 4 4 8-8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function ArrowIcon() {
  return (
    <svg
      className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5"
      viewBox="0 0 20 20"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      aria-hidden="true"
    >
      <path d="M4 10h12M11 5l5 5-5 5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState(null)
  const [statusMessage, setStatusMessage] = useState('')

  const contactInfo = [
    {
      type: 'phone',
      title: 'Phone / WhatsApp',
      label: '+91 90370 71916',
      href: 'tel:+919037071916',
    },
    {
      type: 'email',
      title: 'Email',
      label: 'info@evorise.in',
      href: 'mailto:info@evorise.in',
    },
    {
      type: 'location',
      title: 'Location',
      label: 'Kochi, Kerala, India',
    },
  ]

  const socialLinks = [
    { label: 'Instagram', icon: FaInstagram, href: 'https://www.instagram.com/evorise.in/' },
    {
      label: 'Facebook',
      icon: FaFacebookF,
      href: 'https://www.facebook.com/profile.php?id=61591238267194',
    },
    { label: 'YouTube', icon: FaYoutube, href: 'https://www.youtube.com/@evoriseecosystem' },
    { label: 'X', icon: FaXTwitter, href: 'https://x.com/TheEvorise' },
  ]

  const handleSubmit = async (event) => {
    event.preventDefault()
    if (isSubmitting) return

    setIsSubmitting(true)
    setSubmitStatus(null)
    setStatusMessage('')

    const formElement = event.currentTarget
    const formValues = new FormData(formElement)

    const formData = {
      name: String(formValues.get('name') || '').trim(),
      email: String(formValues.get('email') || '').trim(),
      mobile: String(formValues.get('mobile') || '').trim(),
      interest: String(formValues.get('interest') || '').trim(),
      message: String(formValues.get('message') || '').trim(),
    }

    try {
      const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID
      const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID
      const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY

      if (!serviceId || !templateId || !publicKey) {
        throw new Error('EmailJS environment variables are missing.')
      }

      await emailjs.send(
        serviceId,
        templateId,
        {
          name: formData.name,
          email: formData.email,
          mobile: formData.mobile,
          interest: formData.interest,
          message: formData.message,
        },
        { publicKey },
      )

      setSubmitStatus('success')
      setStatusMessage('Thank you! Your enquiry has been submitted successfully.')
      formElement.reset()
    } catch (error) {
      console.error('EmailJS submission failed:', error)
      setSubmitStatus('error')
      setStatusMessage('Unable to send your enquiry right now. Please try again or contact us directly.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section id="contact" className="overflow-hidden bg-slate-50 py-10 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-7 max-w-3xl text-center sm:mb-12">
          <p className="text-xs font-bold uppercase tracking-[0.24em] text-teal-700">
            Contact Evorise
          </p>
          <h2 className="mt-2 text-[30px] font-bold leading-[1.15] tracking-tight text-slate-950 sm:mt-3 sm:text-4xl lg:text-5xl">
            Let&apos;s turn your next idea into a clear plan.
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-pretty text-[15px] leading-6 text-slate-600 sm:mt-4 sm:text-base sm:leading-7">
            Tell us where you are in your trading journey, and we&apos;ll guide you toward the right next step.
          </p>
        </div>

        <div className="grid overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_24px_70px_rgba(15,23,42,0.10)] lg:grid-cols-[0.82fr_1.18fr] lg:rounded-3xl">
          <aside className="relative hidden bg-teal-900 px-5 py-7 text-white sm:px-8 sm:py-9 lg:block lg:px-10 lg:py-11">
            <div className="relative z-10 flex h-full flex-col">
              <div>
                <p className="text-sm font-semibold text-teal-200">Start a conversation</p>
                <h3 className="mt-2 max-w-md text-2xl font-bold leading-tight sm:text-3xl">
                  Friendly guidance. Practical answers. No unnecessary complexity.
                </h3>
                <p className="mt-3 max-w-md text-sm leading-6 text-teal-50/80">
                  Reach out directly or complete the enquiry form. Our team will respond with the most useful next step for you.
                </p>
              </div>

              <div className="mt-7 grid gap-3 sm:grid-cols-3 lg:mt-9 lg:grid-cols-1">
                {contactInfo.map((item) => {
                  const content = (
                    <>
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/10 text-teal-100">
                        <ContactIcon type={item.type} />
                      </span>
                      <span className="min-w-0">
                        <span className="block text-xs font-medium text-white/60">{item.title}</span>
                        <span className="mt-0.5 block break-words text-sm font-semibold text-white">
                          {item.label}
                        </span>
                      </span>
                    </>
                  )

                  if (item.href) {
                    return (
                      <a
                        key={item.type}
                        href={item.href}
                        className="flex min-w-0 items-center gap-3 rounded-2xl border border-white/10 bg-white/5 p-3 transition hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
                      >
                        {content}
                      </a>
                    )
                  }

                  return (
                    <div
                      key={item.type}
                      className="flex min-w-0 items-center gap-3 rounded-2xl border border-white/10 bg-white/5 p-3"
                    >
                      {content}
                    </div>
                  )
                })}
              </div>

              <div className="mt-7 border-t border-white/10 pt-6 lg:mt-auto">
                

                <div className="mt-6 flex flex-wrap gap-2.5">
                  {socialLinks.map((item) => (
                    <a
                      key={item.label}
                      href={item.href}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={`Evorise on ${item.label}`}
                      className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/10 text-white transition hover:bg-white hover:text-teal-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
                    >
                      <item.icon className="h-[18px] w-[18px]" aria-hidden="true" />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </aside>

          <div className="bg-white px-5 py-7 sm:px-8 sm:py-9 lg:px-10 lg:py-11">
            <div className="max-w-2xl">
              <p className="text-sm font-semibold text-teal-700">Tell us about your goals</p>
              <h3 className="mt-1 text-2xl font-bold tracking-tight text-slate-950 sm:text-3xl">
                Send an enquiry
              </h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                Complete the form below and we&apos;ll get back to you as soon as possible.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="mt-6" noValidate>
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="contact-name" className="text-sm font-semibold text-slate-700">
                    Full name <span className="text-red-600">*</span>
                  </label>
                  <input
                    id="contact-name"
                    name="name"
                    type="text"
                    autoComplete="name"
                    placeholder="Your full name"
                    className={`${fieldClass} mt-1.5`}
                    required
                    disabled={isSubmitting}
                  />
                </div>

                <div>
                  <label htmlFor="contact-email" className="text-sm font-semibold text-slate-700">
                    Email address <span className="text-red-600">*</span>
                  </label>
                  <input
                    id="contact-email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    placeholder="you@example.com"
                    className={`${fieldClass} mt-1.5`}
                    required
                    disabled={isSubmitting}
                  />
                </div>

                <div>
                  <label htmlFor="contact-mobile" className="text-sm font-semibold text-slate-700">
                    Phone / WhatsApp <span className="text-red-600">*</span>
                  </label>
                  <input
                    id="contact-mobile"
                    name="mobile"
                    type="tel"
                    inputMode="tel"
                    autoComplete="tel"
                    placeholder="+91 90370 71916"
                    className={`${fieldClass} mt-1.5`}
                    required
                    disabled={isSubmitting}
                  />
                </div>

                <div>
                  <label htmlFor="contact-interest" className="text-sm font-semibold text-slate-700">
                    I&apos;m interested in <span className="text-red-600">*</span>
                  </label>
                  <select
                    id="contact-interest"
                    name="interest"
                    className={`${fieldClass} mt-1.5`}
                    required
                    defaultValue=""
                    disabled={isSubmitting}
                  >
                    <option value="" disabled>
                      Select an option
                    </option>
                    <option value="Academy">Academy</option>
                    <option value="Strategy Lab">Strategy Lab</option>
                    <option value="Not sure yet">Not sure yet</option>
                  </select>
                </div>

                <div className="sm:col-span-2">
                  <label htmlFor="contact-message" className="text-sm font-semibold text-slate-700">
                    Message <span className="text-red-600">*</span>
                  </label>
                  <textarea
                    id="contact-message"
                    name="message"
                    rows={4}
                    placeholder="Tell us about your goals, experience level or questions..."
                    className="mt-1.5 min-h-28 w-full resize-y rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 hover:border-slate-300 focus:border-teal-700 focus:ring-4 focus:ring-teal-700/10 disabled:cursor-not-allowed disabled:bg-slate-100 disabled:text-slate-500"
                    required
                    disabled={isSubmitting}
                  />
                </div>
              </div>

              <div aria-live="polite" className="mt-4">
                {submitStatus === 'success' && (
                  <div
                    role="status"
                    className="flex items-start gap-3 rounded-xl border border-teal-200 bg-teal-50 p-3.5 text-sm text-teal-900"
                  >
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-teal-700 text-white">
                      <CheckIcon />
                    </span>
                    <span>{statusMessage}</span>
                  </div>
                )}

                {submitStatus === 'error' && (
                  <div
                    role="alert"
                    className="rounded-xl border border-red-200 bg-red-50 p-3.5 text-sm leading-6 text-red-900"
                  >
                    {statusMessage}{' '}
                    <a
                      href="mailto:info@evorise.in"
                      className="font-semibold underline underline-offset-2"
                    >
                      info@evorise.in
                    </a>
                  </div>
                )}
              </div>

              <div className="mt-5 flex flex-col gap-4 border-t border-slate-200 pt-5 sm:flex-row sm:items-center sm:justify-between">
                <p className="max-w-sm text-xs leading-5 text-slate-500">
                  By submitting, you agree to be contacted about your enquiry.
                </p>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="group inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-slate-950 px-6 text-sm font-semibold text-white transition hover:bg-teal-800 focus:outline-none focus-visible:ring-4 focus-visible:ring-teal-300 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
                >
                  {isSubmitting ? (
                    <>
                      <svg
                        className="h-4 w-4 animate-spin"
                        viewBox="0 0 24 24"
                        fill="none"
                        aria-hidden="true"
                      >
                        <circle
                          cx="12"
                          cy="12"
                          r="9"
                          stroke="currentColor"
                          strokeWidth="3"
                          opacity="0.25"
                        />
                        <path
                          d="M21 12a9 9 0 0 0-9-9"
                          stroke="currentColor"
                          strokeWidth="3"
                          strokeLinecap="round"
                        />
                      </svg>
                      Sending...
                    </>
                  ) : (
                    <>
                      Send enquiry
                      <ArrowIcon />
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Contact
