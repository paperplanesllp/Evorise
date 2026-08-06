import { useCallback, useEffect, useRef, useState } from 'react'
import emailjs from '@emailjs/browser'
import { useContactModal } from '../hooks/useContactModal'

const initialFormData = {
  name: '',
  email: '',
  mobile: '',
  company: '',
  interest: '',
  message: '',
  budget: '',
  honeypot: '',
}

const focusableSelector = [
  'a[href]',
  'button:not([disabled])',
  'input:not([disabled]):not([type="hidden"])',
  'select:not([disabled])',
  'textarea:not([disabled])',
  '[tabindex]:not([tabindex="-1"])',
].join(',')

const baseFieldClass =
  'mt-1.5 h-11 w-full rounded-xl border bg-white px-3.5 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 disabled:cursor-not-allowed disabled:bg-slate-100 disabled:text-slate-500'

const normalFieldClass =
  'border-slate-200 hover:border-slate-300 focus:border-teal-700 focus:ring-4 focus:ring-teal-700/10'

const errorFieldClass =
  'border-red-400 focus:border-red-500 focus:ring-4 focus:ring-red-500/10'

function getFieldClass(hasError) {
  return `${baseFieldClass} ${hasError ? errorFieldClass : normalFieldClass}`
}

function FieldError({ id, children }) {
  if (!children) return null

  return (
    <p id={id} role="alert" className="mt-1.5 flex items-start gap-1.5 text-xs font-medium text-red-700">
      <svg
        aria-hidden="true"
        viewBox="0 0 20 20"
        fill="currentColor"
        className="mt-0.5 h-3.5 w-3.5 shrink-0"
      >
        <path
          fillRule="evenodd"
          d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16Zm0-11.25a.75.75 0 0 1 .75.75v3a.75.75 0 0 1-1.5 0v-3a.75.75 0 0 1 .75-.75Zm0 6a1 1 0 1 0 0 2 1 1 0 0 0 0-2Z"
          clipRule="evenodd"
        />
      </svg>
      <span>{children}</span>
    </p>
  )
}

function ContactIcon({ type }) {
  const commonProps = {
    'aria-hidden': true,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.8,
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
    className: 'h-5 w-5',
  }

  if (type === 'mail') {
    return (
      <svg {...commonProps}>
        <path d="M4 6.5h16v11H4z" />
        <path d="m4.5 7 7.5 6 7.5-6" />
      </svg>
    )
  }

  if (type === 'phone') {
    return (
      <svg {...commonProps}>
        <path d="M8.2 3.5 10.3 8l-2.2 1.7a15 15 0 0 0 6.2 6.2l1.7-2.2 4.5 2.1-.8 3.1a2 2 0 0 1-2 1.6C9.9 20.5 3.5 14.1 3.5 6.3a2 2 0 0 1 1.6-2l3.1-.8Z" />
      </svg>
    )
  }

  return (
    <svg {...commonProps}>
      <path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z" />
      <circle cx="12" cy="10" r="2.5" />
    </svg>
  )
}

export function ContactFormModal() {
  const { isOpen, closeModal } = useContactModal()
  const [formData, setFormData] = useState(initialFormData)
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState(null)

  const backdropRef = useRef(null)
  const dialogRef = useRef(null)
  const titleRef = useRef(null)
  const successTimeoutRef = useRef(null)
  const previouslyFocusedRef = useRef(null)
  const isMountedRef = useRef(true)

  const clearSuccessTimeout = useCallback(() => {
    if (successTimeoutRef.current) {
      window.clearTimeout(successTimeoutRef.current)
      successTimeoutRef.current = null
    }
  }, [])

  const handleClose = useCallback(() => {
    clearSuccessTimeout()
    setSubmitStatus(null)
    closeModal()
  }, [clearSuccessTimeout, closeModal])

  useEffect(() => {
    isMountedRef.current = true

    return () => {
      isMountedRef.current = false
      clearSuccessTimeout()
    }
  }, [clearSuccessTimeout])

  useEffect(() => {
    if (!isOpen) return undefined

    previouslyFocusedRef.current = document.activeElement
    const previousBodyOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const focusTimer = window.setTimeout(() => {
      titleRef.current?.focus()
    }, 0)

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        event.preventDefault()
        handleClose()
        return
      }

      if (event.key !== 'Tab' || !dialogRef.current) return

      const focusableElements = Array.from(
        dialogRef.current.querySelectorAll(focusableSelector),
      ).filter((element) => element.offsetParent !== null)

      if (focusableElements.length === 0) {
        event.preventDefault()
        titleRef.current?.focus()
        return
      }

      const firstElement = focusableElements[0]
      const lastElement = focusableElements[focusableElements.length - 1]

      if (event.shiftKey && document.activeElement === firstElement) {
        event.preventDefault()
        lastElement.focus()
      } else if (!event.shiftKey && document.activeElement === lastElement) {
        event.preventDefault()
        firstElement.focus()
      }
    }

    document.addEventListener('keydown', handleKeyDown)

    return () => {
      window.clearTimeout(focusTimer)
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = previousBodyOverflow

      window.setTimeout(() => {
        previouslyFocusedRef.current?.focus?.()
      }, 0)
    }
  }, [handleClose, isOpen])

  useEffect(() => {
    if (!isOpen) {
      clearSuccessTimeout()
    }
  }, [clearSuccessTimeout, isOpen])

  const handleBackdropClick = (event) => {
    if (event.target === backdropRef.current) {
      handleClose()
    }
  }

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)

  const validatePhone = (phone) => phone.replace(/\D/g, '').length >= 10

  const validateForm = () => {
    const newErrors = {}

    if (formData.honeypot) {
      return { isValid: false, isSpam: true, errors: {} }
    }

    if (!formData.name.trim()) {
      newErrors.name = 'Full name is required.'
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email address is required.'
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Enter a valid email address.'
    }

    if (!formData.mobile.trim()) {
      newErrors.mobile = 'Phone or WhatsApp number is required.'
    } else if (!validatePhone(formData.mobile)) {
      newErrors.mobile = 'Enter a valid phone number with at least 10 digits.'
    }

    if (!formData.interest.trim()) {
      newErrors.interest = 'Please enter the service you need.'
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Please add a few details about your project.'
    }

    return {
      isValid: Object.keys(newErrors).length === 0,
      isSpam: false,
      errors: newErrors,
    }
  }

  const focusFirstInvalidField = (validationErrors) => {
    const fieldOrder = ['name', 'email', 'mobile', 'interest', 'message']
    const firstInvalidField = fieldOrder.find((field) => validationErrors[field])

    if (!firstInvalidField) return

    window.requestAnimationFrame(() => {
      document.getElementById(firstInvalidField)?.focus()
    })
  }

  const handleChange = (event) => {
    const { name, value } = event.target

    setFormData((previousData) => ({
      ...previousData,
      [name]: value,
    }))

    if (errors[name]) {
      setErrors((previousErrors) => ({
        ...previousErrors,
        [name]: '',
      }))
    }

    if (submitStatus === 'error') {
      setSubmitStatus(null)
    }
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    if (isSubmitting) return

    setSubmitStatus(null)

    const validation = validateForm()

    if (!validation.isValid) {
      if (validation.isSpam) return

      setErrors(validation.errors)
      focusFirstInvalidField(validation.errors)
      return
    }

    setErrors({})
    setIsSubmitting(true)

    try {
      const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID
      const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID
      const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY

      if (!serviceId || !templateId || !publicKey) {
        if (isMountedRef.current) setSubmitStatus('error')
        return
      }

      await emailjs.send(
        serviceId,
        templateId,
        {
          name: formData.name.trim(),
          email: formData.email.trim(),
          mobile: formData.mobile.trim(),
          company: formData.company.trim(),
          interest: formData.interest,
          budget: formData.budget,
          message: formData.message.trim(),
        },
        { publicKey },
      )

      if (!isMountedRef.current) return

      setSubmitStatus('success')
      setFormData(initialFormData)
      setErrors({})
      clearSuccessTimeout()

      successTimeoutRef.current = window.setTimeout(() => {
        if (!isMountedRef.current) return
        handleClose()
      }, 3000)
    } catch {
      if (isMountedRef.current) setSubmitStatus('error')
    } finally {
      if (isMountedRef.current) setIsSubmitting(false)
    }
  }

  if (!isOpen) return null

  return (
    <div
      ref={backdropRef}
      onMouseDown={handleBackdropClick}
      className="fixed inset-0 z-[999] flex items-center justify-center overflow-y-auto bg-slate-950/70 p-3 backdrop-blur-sm sm:p-5"
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="contact-modal-title"
        aria-describedby="contact-modal-description"
        onMouseDown={(event) => event.stopPropagation()}
        className="relative max-h-[92dvh] w-full max-w-6xl overflow-hidden rounded-3xl bg-white shadow-[0_30px_80px_rgba(15,23,42,0.3)]"
      >
        <button
          type="button"
          onClick={handleClose}
          aria-label="Close contact form"
          className="fixed right-4 top-4 z-[1000] flex h-11 w-11 items-center justify-center rounded-full border border-white/40 bg-white text-slate-700 shadow-sm transition hover:bg-slate-100 focus:outline-none focus-visible:ring-4 focus-visible:ring-teal-300 lg:absolute lg:right-4 lg:top-4 lg:z-30"
        >
          <svg
            aria-hidden="true"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className="h-5 w-5"
          >
            <path d="m6 6 12 12M18 6 6 18" strokeLinecap="round" />
          </svg>
        </button>

        <div className="max-h-[92dvh] min-h-0 overflow-y-auto lg:grid lg:grid-cols-[0.82fr_1.18fr] lg:overflow-hidden">
        <aside className="relative overflow-hidden bg-teal-900 px-5 py-6 text-white sm:px-8 sm:py-8 lg:px-10 lg:py-12">
          <div className="relative z-10 flex h-full flex-col">
            <div>
              <p className="text-xs font-bold tracking-[0.24em] text-teal-200">EVORISE</p>
              
            </div>

            <div className="mt-6 max-w-md lg:mt-12">
              <p className="text-sm font-semibold text-teal-200">Start a conversation</p>
              <h2 className="mt-2 text-2xl font-bold leading-tight sm:text-3xl lg:text-4xl">
                Let&apos;s build something meaningful.
              </h2>
              <p className="mt-3 max-w-sm text-sm leading-6 text-teal-50/80 sm:text-base">
                Share your goals with us and get a clear, practical discussion about the right next step for your business.
              </p>
            </div>

            <div className="mt-6 grid gap-3 sm:grid-cols-3 lg:mt-10 lg:grid-cols-1">
              <a
                href="mailto:info@evorise.in"
                className="group flex min-w-0 items-center gap-3 rounded-2xl border border-white/10 bg-white/5 p-3 transition hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/10 text-teal-100">
                  <ContactIcon type="mail" />
                </span>
                <span className="min-w-0">
                  <span className="block text-xs font-medium text-white/55">Email</span>
                  <span className="block truncate text-sm font-semibold text-white">info@evorise.in</span>
                </span>
              </a>

              <a
                href="tel:+919037071916"
                className="group flex min-w-0 items-center gap-3 rounded-2xl border border-white/10 bg-white/5 p-3 transition hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/10 text-teal-100">
                  <ContactIcon type="phone" />
                </span>
                <span className="min-w-0">
                  <span className="block text-xs font-medium text-white/55">Phone / WhatsApp</span>
                  <span className="block whitespace-nowrap text-sm font-semibold text-white">+91 90370 71916</span>
                </span>
              </a>

              <div className="flex min-w-0 items-center gap-3 rounded-2xl border border-white/10 bg-white/5 p-3">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/10 text-teal-100">
                  <ContactIcon type="location" />
                </span>
                <span className="min-w-0">
                  <span className="block text-xs font-medium text-white/55">Location</span>
                  <span className="block text-sm font-semibold text-white">Kochi, Kerala, India</span>
                </span>
              </div>
            </div>

          </div>
        </aside>

        <section className="min-h-0 bg-slate-50 px-5 py-6 sm:px-8 sm:py-8 lg:overflow-y-auto lg:px-10 lg:py-10">
          {submitStatus === 'success' ? (
            <div
              role="status"
              aria-live="polite"
              className="flex min-h-[440px] flex-col items-center justify-center rounded-2xl border border-teal-100 bg-white px-6 py-10 text-center shadow-sm"
            >
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-teal-50 text-teal-700">
                <svg
                  aria-hidden="true"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  className="h-8 w-8"
                >
                  <path d="m5 12 4 4L19 6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>

              <h3 id="contact-modal-title" className="mt-5 text-2xl font-bold text-slate-950">Thank you!</h3>
              <p id="contact-modal-description" className="mt-2 max-w-md text-sm leading-6 text-slate-600 sm:text-base">
                Your enquiry has been submitted successfully. The Evorise team will contact you soon.
              </p>
              <p className="mt-3 text-xs font-medium text-slate-500">This window will close automatically.</p>

              <button
                type="button"
                onClick={handleClose}
                className="mt-6 inline-flex h-11 items-center justify-center rounded-xl bg-teal-800 px-6 text-sm font-semibold text-white transition hover:bg-teal-900 focus:outline-none focus-visible:ring-4 focus-visible:ring-teal-300"
              >
                Close
              </button>
            </div>
          ) : (
            <>
              <header className="pr-12">
                <p className="text-sm font-semibold text-teal-700">Tell us about your project</p>
                <h1
                  id="contact-modal-title"
                  ref={titleRef}
                  tabIndex={-1}
                  className="mt-1 text-2xl font-bold tracking-tight text-slate-950 outline-none sm:text-3xl"
                >
                  Get Started Today
                </h1>
                <p id="contact-modal-description" className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">
                  Complete the form below. Required fields are marked with an asterisk.
                </p>
              </header>

              <form onSubmit={handleSubmit} noValidate className="mt-6">
                <input
                  type="text"
                  name="honeypot"
                  value={formData.honeypot}
                  onChange={handleChange}
                  className="pointer-events-none absolute -left-[9999px] h-px w-px opacity-0"
                  tabIndex={-1}
                  autoComplete="off"
                  aria-hidden="true"
                />

                <div className="grid gap-x-4 gap-y-4 sm:grid-cols-2">
                  <div>
                    <label htmlFor="name" className="text-sm font-semibold text-slate-700">
                      Full Name <span className="text-red-600">*</span>
                    </label>
                    <input
                      id="name"
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="John Doe"
                      autoComplete="name"
                      aria-invalid={Boolean(errors.name)}
                      aria-describedby={errors.name ? 'name-error' : undefined}
                      className={getFieldClass(Boolean(errors.name))}
                    />
                    <FieldError id="name-error">{errors.name}</FieldError>
                  </div>

                  <div>
                    <label htmlFor="email" className="text-sm font-semibold text-slate-700">
                      Email Address <span className="text-red-600">*</span>
                    </label>
                    <input
                      id="email"
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="john@example.com"
                      autoComplete="email"
                      aria-invalid={Boolean(errors.email)}
                      aria-describedby={errors.email ? 'email-error' : undefined}
                      className={getFieldClass(Boolean(errors.email))}
                    />
                    <FieldError id="email-error">{errors.email}</FieldError>
                  </div>

                  <div>
                    <label htmlFor="mobile" className="text-sm font-semibold text-slate-700">
                      Phone / WhatsApp <span className="text-red-600">*</span>
                    </label>
                    <input
                      id="mobile"
                      type="tel"
                      inputMode="tel"
                      name="mobile"
                      value={formData.mobile}
                      onChange={handleChange}
                      placeholder="+91 90370 71916"
                      autoComplete="tel"
                      aria-invalid={Boolean(errors.mobile)}
                      aria-describedby={errors.mobile ? 'mobile-error' : undefined}
                      className={getFieldClass(Boolean(errors.mobile))}
                    />
                    <FieldError id="mobile-error">{errors.mobile}</FieldError>
                  </div>

                  <div>
                    <label htmlFor="company" className="text-sm font-semibold text-slate-700">
                      Company / Business Name
                    </label>
                    <input
                      id="company"
                      type="text"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      placeholder="Your company name"
                      autoComplete="organization"
                      className={getFieldClass(false)}
                    />
                  </div>

                  <div>
                    <label htmlFor="interest" className="text-sm font-semibold text-slate-700">
                      Service Required <span className="text-red-600">*</span>
                    </label>
                    <input
                      id="interest"
                      type="text"
                      name="interest"
                      value={formData.interest}
                      onChange={handleChange}
                      placeholder="Enter the service you need"
                      aria-invalid={Boolean(errors.interest)}
                      aria-describedby={errors.interest ? 'interest-error' : undefined}
                      className={getFieldClass(Boolean(errors.interest))}
                    />
                    <FieldError id="interest-error">{errors.interest}</FieldError>
                  </div>

                  <div>
                    <label htmlFor="budget" className="text-sm font-semibold text-slate-700">
                      Estimated Budget
                    </label>
                    <input
                      id="budget"
                      type="text"
                      name="budget"
                      value={formData.budget}
                      onChange={handleChange}
                      placeholder="Enter your estimated budget"
                      className={getFieldClass(false)}
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label htmlFor="message" className="text-sm font-semibold text-slate-700">
                      Project Details <span className="text-red-600">*</span>
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Tell us about your goals, requirements and expected timeline..."
                      rows={3}
                      aria-invalid={Boolean(errors.message)}
                      aria-describedby={errors.message ? 'message-error' : undefined}
                      className={`mt-1.5 min-h-24 w-full resize-y rounded-xl border bg-white px-3.5 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 ${
                        errors.message ? errorFieldClass : normalFieldClass
                      }`}
                    />
                    <FieldError id="message-error">{errors.message}</FieldError>
                  </div>
                </div>

                {submitStatus === 'error' && (
                  <div
                    role="alert"
                    aria-live="assertive"
                    className="mt-4 flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 p-3.5 text-red-900"
                  >
                    <svg
                      aria-hidden="true"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      className="mt-0.5 h-5 w-5 shrink-0 text-red-600"
                    >
                      <path
                        fillRule="evenodd"
                        d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l6.516 11.59A2 2 0 0 1 16.516 17H3.484a2 2 0 0 1-1.743-2.31L8.257 3.1ZM10 7a.75.75 0 0 1 .75.75v3a.75.75 0 0 1-1.5 0v-3A.75.75 0 0 1 10 7Zm0 6a1 1 0 1 0 0 2 1 1 0 0 0 0-2Z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <div>
                      <p className="text-sm font-bold">Unable to send your message</p>
                      <p className="mt-0.5 text-sm leading-5 text-red-800">
                        Please try again, or email us directly at{' '}
                        <a href="mailto:info@evorise.in" className="font-semibold underline underline-offset-2">
                          info@evorise.in
                        </a>
                        .
                      </p>
                    </div>
                  </div>
                )}

                <div className="mt-5 flex flex-col-reverse gap-3 border-t border-slate-200 pt-5 sm:flex-row sm:items-center sm:justify-between">
                  <p className="text-xs leading-5 text-slate-500">
                    By submitting, you agree to be contacted about your enquiry.
                  </p>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    aria-live="polite"
                    className="inline-flex h-11 w-full shrink-0 items-center justify-center gap-2 rounded-xl bg-teal-800 px-6 text-sm font-semibold text-white transition hover:bg-teal-900 focus:outline-none focus-visible:ring-4 focus-visible:ring-teal-300 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
                  >
                    {isSubmitting && (
                      <svg
                        aria-hidden="true"
                        viewBox="0 0 24 24"
                        fill="none"
                        className="h-4 w-4 animate-spin"
                      >
                        <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="3" opacity="0.25" />
                        <path
                          d="M21 12a9 9 0 0 0-9-9"
                          stroke="currentColor"
                          strokeWidth="3"
                          strokeLinecap="round"
                        />
                      </svg>
                    )}
                    {isSubmitting ? 'Sending…' : 'Send Enquiry'}
                  </button>
                </div>
              </form>
            </>
          )}
        </section>
        </div>
      </div>
    </div>
  )
}
