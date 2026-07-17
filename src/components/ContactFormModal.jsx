import { useState, useEffect, useRef } from 'react'
import emailjs from "@emailjs/browser";
import { useContactModal } from '../hooks/useContactModal'

const serviceOptions = [
  'Website Development',
  'E-commerce Development',
  'UI/UX Design',
  'Branding',
  'Digital Marketing',
  'Business Consultation',
  'Other',
]

const budgetOptions = [
  'Below $5,000',
  '$5,000 - $10,000',
  '$10,000 - $25,000',
  '$25,000 - $50,000',
  'Above $50,000',
]

export function ContactFormModal() {
  const { isOpen, closeModal } = useContactModal()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile: '',
    company: '',
    interest: '',
    message: '',
    budget: '',
    honeypot: '',
  })

  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState(null) // 'success' or 'error'
  const modalRef = useRef(null)
  const formRef = useRef(null)

  // Handle escape key
  useEffect(() => {
    if (!isOpen) return

    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        closeModal()
      }
    }

    document.addEventListener('keydown', handleEscape)
    document.body.style.overflow = 'hidden'

    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = 'auto'
    }
  }, [isOpen, closeModal])

  // Handle click outside modal
  const handleBackdropClick = (e) => {
    if (e.target === modalRef.current) {
      closeModal()
    }
  }

  // Validation functions
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  const validatePhone = (phone) => {
    // Accept numbers, +, -, (), spaces. Min 10 digits
    const digitsOnly = phone.replace(/\D/g, '')
    return digitsOnly.length >= 10
  }

  const validateForm = () => {
    const newErrors = {}

    // Check honeypot
    if (formData.honeypot) {
      return { isValid: false, isSpam: true, errors: {} }
    }

    // Required fields
    if (!formData.name.trim()) {
      newErrors.name = 'Full name is required'
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email address is required'
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email address'
    }

    if (!formData.mobile.trim()) {
      newErrors.mobile = 'Phone/WhatsApp number is required'
    } else if (!validatePhone(formData.mobile)) {
      newErrors.mobile = 'Please enter a valid phone number (minimum 10 digits)'
    }

    if (!formData.interest.trim()) {
      newErrors.interest = 'Service required is required'
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Project details are required'
    }

    return {
      isValid: Object.keys(newErrors).length === 0,
      isSpam: false,
      errors: newErrors,
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))

    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: '',
      }))
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (isSubmitting) return

    setSubmitStatus(null)

    const validation = validateForm()

    if (!validation.isValid) {
      if (validation.isSpam) {
        // Silently fail spam attempts
        return
      }
      setErrors(validation.errors)
      return
    }

    setIsSubmitting(true)

    try {
      const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID
      const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID
      const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY

      if (!serviceId || !templateId || !publicKey) {
        setSubmitStatus('error')
        return
      }

      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        {
          name: formData.name.trim(),
          email: formData.email.trim(),
          mobile: formData.mobile.trim(),
          interest: formData.interest,
          message: formData.message.trim()
        },
        {
          publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY
        }
      );

      setSubmitStatus('success')
      setFormData({
        name: '',
        email: '',
        mobile: '',
        company: '',
        interest: '',
        message: '',
        budget: '',
        honeypot: '',
      })
      setErrors({})

      // Auto-close modal after 3 seconds on success
      setTimeout(() => {
        closeModal()
        setSubmitStatus(null)
      }, 3000)
    } catch {
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (!isOpen) return null

  return (
    <div
      ref={modalRef}
      onClick={handleBackdropClick}
      className="fixed inset-0 z-[999] flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
    >
      <div className="relative max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white shadow-2xl">
        {/* Close Button */}
        <button
          onClick={closeModal}
          className="absolute right-6 top-6 z-10 text-3xl font-light leading-none text-slate-400 transition duration-300 hover:rotate-90 hover:text-slate-700"
          aria-label="Close modal"
          type="button"
        >
          ×
        </button>

        <div className="px-8 py-12 sm:px-12 lg:px-16">
          {submitStatus === 'success' ? (
            // Success Message
            <div className="flex min-h-[400px] flex-col items-center justify-center text-center">
              <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
                <svg
                  className="h-8 w-8 text-green-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-slate-900">Thank You!</h3>
              <p className="mt-4 max-w-sm text-lg leading-7 text-slate-600">
                Thank you! Your details have been submitted. We’ll contact you soon.
              </p>
              <p className="mt-2 text-sm text-slate-500">
                Closing in a moment...
              </p>
            </div>
          ) : (
            // Form
            <>
              <div className="mb-8">
                <h2 className="text-3xl font-bold text-slate-900 md:text-4xl">
                  Get Started Today
                </h2>
                <p className="mt-3 text-lg text-slate-600">
                  Tell us about your project and we'll be in touch shortly.
                </p>
              </div>

              <form onSubmit={handleSubmit} ref={formRef} className="space-y-5">
                {/* Honeypot field - hidden */}
                <input
                  type="text"
                  name="honeypot"
                  value={formData.honeypot}
                  onChange={handleChange}
                  style={{ display: 'none' }}
                  tabIndex="-1"
                  autoComplete="off"
                />

                {/* Full Name */}
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-semibold text-slate-700"
                  >
                    Full Name *
                  </label>
                  <input
                    id="name"
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="John Doe"
                    className={`mt-2 w-full rounded-lg border px-4 py-3 text-slate-900 placeholder-slate-400 outline-none transition ${
                      errors.name
                        ? 'border-red-500 focus:ring-2 focus:ring-red-200'
                        : 'border-slate-300 focus:ring-2 focus:ring-teal-200'
                    }`}
                    required
                  />
                  {errors.name && (
                    <p className="mt-1 text-sm text-red-600">{errors.name}</p>
                  )}
                </div>

                {/* Email Address */}
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-semibold text-slate-700"
                  >
                    Email Address *
                  </label>
                  <input
                    id="email"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="john@example.com"
                    className={`mt-2 w-full rounded-lg border px-4 py-3 text-slate-900 placeholder-slate-400 outline-none transition ${
                      errors.email
                        ? 'border-red-500 focus:ring-2 focus:ring-red-200'
                        : 'border-slate-300 focus:ring-2 focus:ring-teal-200'
                    }`}
                    required
                  />
                  {errors.email && (
                    <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                  )}
                </div>

                {/* Phone / WhatsApp Number */}
                <div>
                  <label
                    htmlFor="phone"
                    className="block text-sm font-semibold text-slate-700"
                  >
                    Phone / WhatsApp Number *
                  </label>
                  <input
                    id="phone"
                    type="tel"
                    name="mobile"
                    value={formData.mobile}
                    onChange={handleChange}
                    placeholder="+91 90370 71916"
                    className={`mt-2 w-full rounded-lg border px-4 py-3 text-slate-900 placeholder-slate-400 outline-none transition ${
                      errors.mobile
                        ? 'border-red-500 focus:ring-2 focus:ring-red-200'
                        : 'border-slate-300 focus:ring-2 focus:ring-teal-200'
                    }`}
                    required
                  />
                  {errors.mobile && (
                    <p className="mt-1 text-sm text-red-600">{errors.mobile}</p>
                  )}
                </div>

                {/* Company / Business Name */}
                <div>
                  <label
                    htmlFor="company"
                    className="block text-sm font-semibold text-slate-700"
                  >
                    Company / Business Name
                  </label>
                  <input
                    id="company"
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    placeholder="Your company name"
                    className="mt-2 w-full rounded-lg border border-slate-300 px-4 py-3 text-slate-900 placeholder-slate-400 outline-none transition focus:ring-2 focus:ring-teal-200"
                  />
                </div>

                {/* Service Required */}
                <div>
                  <label
                    htmlFor="service"
                    className="block text-sm font-semibold text-slate-700"
                  >
                    Service Required *
                  </label>
                  <select
                    id="service"
                    name="interest"
                    value={formData.interest}
                    onChange={handleChange}
                    className={`mt-2 w-full rounded-lg border px-4 py-3 text-slate-900 outline-none transition ${
                      errors.interest
                        ? 'border-red-500 focus:ring-2 focus:ring-red-200'
                        : 'border-slate-300 focus:ring-2 focus:ring-teal-200'
                    }`}
                    required
                  >
                    <option value="">Select a service</option>
                    {serviceOptions.map((service) => (
                      <option key={service} value={service}>
                        {service}
                      </option>
                    ))}
                  </select>
                  {errors.interest && (
                    <p className="mt-1 text-sm text-red-600">{errors.interest}</p>
                  )}
                </div>

                {/* Project Details */}
                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-semibold text-slate-700"
                  >
                    Project Details *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell us about your project, goals, and requirements..."
                    rows={4}
                    className={`mt-2 w-full resize-none rounded-lg border px-4 py-3 text-slate-900 placeholder-slate-400 outline-none transition ${
                      errors.message
                        ? 'border-red-500 focus:ring-2 focus:ring-red-200'
                        : 'border-slate-300 focus:ring-2 focus:ring-teal-200'
                    }`}
                    required
                  />
                  {errors.message && (
                    <p className="mt-1 text-sm text-red-600">{errors.message}</p>
                  )}
                </div>

                {/* Estimated Budget */}
                <div>
                  <label
                    htmlFor="budget"
                    className="block text-sm font-semibold text-slate-700"
                  >
                    Estimated Budget
                  </label>
                  <select
                    id="budget"
                    name="budget"
                    value={formData.budget}
                    onChange={handleChange}
                    className="mt-2 w-full rounded-lg border border-slate-300 px-4 py-3 text-slate-900 outline-none transition focus:ring-2 focus:ring-teal-200"
                  >
                    <option value="">Select a budget range (optional)</option>
                    {budgetOptions.map((budget) => (
                      <option key={budget} value={budget}>
                        {budget}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Submit Error Message */}
                {submitStatus === 'error' && (
                  <div className="rounded-lg bg-red-50 p-4">
                    <p className="text-sm text-red-800">
                      Something went wrong. Please try again or email us at
                      info@evorise.com.
                    </p>
                  </div>
                )}

                {/* Submit Button */}
                <div className="pt-4">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full rounded-lg bg-teal-700 px-6 py-4 text-base font-bold uppercase tracking-[0.1em] text-white transition-all duration-300 hover:bg-teal-800 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? 'Submitting...' : 'Submit Details'}
                  </button>
                </div>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
