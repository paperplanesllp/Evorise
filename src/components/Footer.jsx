import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  FaInstagram,
  FaFacebookF,
  FaYoutube,
  FaWhatsapp,
} from 'react-icons/fa'
import { FaXTwitter } from 'react-icons/fa6'

const privacyPolicySections = [
  {
    title: '1. Introduction',
    content: [
      'This Privacy Policy describes how Evorise ("the Company," "We," "Us," "Our") collects, uses, discloses, and safeguards your personal information when you use our website, enroll in Evorise Academy, or engage Evorise Strategy Lab services (collectively, the "Service").',
      'By using our Service, you consent to the practices described in this Policy. This Policy is intended to align with applicable Indian data protection law, including the Information Technology Act, 2000, the IT (Reasonable Security Practices and Procedures and Sensitive Personal Data or Information) Rules, 2011, and the Digital Personal Data Protection Act, 2023.',
    ],
  },
  {
    title: '2. Data We Collect',
    content: [
      '● Personal Data: name, email, phone number, and other identifiers you provide voluntarily through enrollment or contact forms.',
      '● Usage Data: device details, IP address, browser type, and time spent on the site, collected automatically.',
      '● Strategy Data (Strategy Lab clients only): any strategy logic, rules, code, or performance history submitted for backtesting, consultation, or automation.',
      "● LMS Access Data (Recorded Session students only): if you enroll in the Recorded Sessions format, your name, email, and enrollment details are shared with Royal Academy for Financial Studies to create and manage your access on their Learning Management System (LMS). Your activity on that platform (progress, login data, etc.) is governed by Royal Academy's own privacy practices, in addition to this Policy.",
      'We do not collect or store banking credentials, card details, or trading account passwords.',
    ],
  },
  {
    title: '3. Purpose of Collecting Data',
    content: [
      'Your data is used solely to:',
      '● Provide and improve Evorise Academy and Strategy Lab services',
      '● Manage enrollment, accounts, and communication',
      "● Send service updates or, where you've opted in, marketing communication",
      '● Analyze usage to improve the Service',
      '● Meet legal and regulatory obligations',
      'We do not sell, rent, or trade your data to third parties for marketing purposes.',
    ],
  },
  {
    title: '4. Strategy Data — Special Handling',
    content: [
      'Strategy Data submitted to Evorise Strategy Lab remains the intellectual property of the client who submits it. Evorise will:',
      '● Use Strategy Data solely for the purpose of backtesting, consultation, or automation as engaged by the client',
      "● Not share, reuse, or repurpose a client's Strategy Data for any other client's benefit",
      '● Retain Strategy Data only as long as necessary to deliver the engaged service, or as otherwise agreed in writing',
    ],
  },
  {
    title: '6. Legal Basis for Processing',
    content: [
      "We process personal data only when you've given explicit consent, when it's necessary to provide the Service, when required by law, or where necessary for legitimate business interests. You may withdraw consent at any time by contacting us.",
    ],
  },
  {
    title: '7. Data Retention',
    content: [
      'Data is retained only as long as necessary for the purposes above or as required by law, after which it is securely deleted or anonymized.',
    ],
  },
  {
    title: '8. Data Sharing and Transfer',
    content: [
      'Your data may be shared with:',
      '● Service providers assisting our operations (hosting, analytics, communication tools)',
      '● Royal Academy for Financial Studies, specifically for students enrolled in the Recorded Sessions format, to enable access to their LMS platform. This is a necessary transfer to deliver that specific service, limited to the data required for enrollment and access (name, email, and course details).',
      '● Affiliates under common ownership adhering to this Policy',
      '● Regulatory authorities, where legally required',
      'Cross-border transfers, if any, will comply with the Digital Personal Data Protection Act, 2023.',
    ],
  },
  {
    title: '9. Security',
    content: [
      'We apply reasonable technical and organizational measures to protect your data. No method of transmission over the internet is completely secure, and absolute security cannot be guaranteed.',
    ],
  },
  {
    title: '10. Your Rights',
    content: [
      'You have the right to access, update, delete, or request portability of your personal data, and to withdraw consent at any time, subject to applicable law.',
    ],
  },
  {
    title: '11. Use by Minors',
    content: [
      'Our Services are intended for individuals 18 years and older. We do not knowingly collect data from anyone under 18. If we learn we have, we will delete it promptly.',
    ],
  },
  {
    title: '12. Disclaimer on Financial Advice',
    content: [
      'Evorise Academy provides forex trading education. Evorise Strategy Lab provides strategy backtesting, consultation, and automation services based on strategies the client already owns. Evorise is not a SEBI-registered investment advisor, research analyst, or portfolio manager, and does not provide personalized investment advice, buy/sell recommendations, or manage client funds. All content and services are educational or technical in nature. Users are encouraged to consult a SEBI-registered financial advisor before making investment decisions.',
    ],
  },
  {
    title: '13. Cookies and Analytics',
    content: [
      'Our website may use cookies or analytics tools to understand usage and improve performance. You can manage cookie preferences through your browser.',
    ],
  },
  {
    title: '14. Changes to This Policy',
    content: [
      'We may update this Policy periodically. The current version, with its "Last Updated" date, will be available on our website until a next update, if made.',
    ],
  },
]

const termsAndConditionsSections = [
  {
    title: '1. Acceptance of Terms',
    content: [
      'By accessing this website, enrolling in Evorise Academy, or engaging Evorise Strategy Lab (collectively, "Services"), you ("Client," "Student," "You") agree to these Terms. If you are under 18, a parent or guardian must review and accept these Terms on your behalf. Continued use after any update constitutes acceptance of revised Terms.',
    ],
  },
  {
    title: '2. Evorise Academy — Enrollment',
    content: [
      '2.1 Evorise Academy offers instruction through five formats: Recorded Sessions, Online Trading Sessions, Offline Trading Sessions, Live Trading Floor, and One-on-One Sessions. Enrollment is confirmed upon selection of a format at registration.',
      "2.2 Recorded Sessions are delivered through the Learning Management System (LMS) of Royal Academy for Financial Studies, a third-party platform. Upon enrollment in this format, the student's enrollment details (name, email, course selection) will be shared with Royal Academy to provision access on their LMS, and such access is subject to Royal Academy's own platform terms in addition to these Terms. Access is provided for a limited duration as specified at enrollment.",
      '2.3 Online Trading Sessions and Offline Trading Sessions are conducted live, as scheduled at the time of enrollment, and access is valid for the batch/schedule the student is enrolled in.',
      "2.4 Live Trading Floor access is provided at Evorise's Kochi office, subject to availability and scheduling communicated at enrollment.",
      '2.5 One-on-One Sessions are scheduled individually based on client requirement and mentor availability, as agreed at the time of booking.',
      '2.6 Enrollment is non-transferable and valid only for the individual named on the admission form, regardless of format selected.',
    ],
  },
  {
    title: '3. Evorise Strategy Lab — Engagement',
    content: [
      '3.1 Strategy Lab services are offered in three forms: strategy backtesting, strategy consultation, and full algorithm development, as selected by the client at engagement.',
      '3.2 The client warrants that any strategy submitted is their own, or that they hold the rights necessary to submit it for review, testing, or automation.',
      "3.3 Evorise will not use a client's submitted strategy for any purpose beyond the engaged service, and will not share it with other clients or third parties.",
      '3.4 Backtesting results and consultation feedback are provided for informational purposes and do not constitute a guarantee of future strategy performance.',
      '3.5 Where full algorithm development is engaged, ownership of the resulting automated system will be defined in a separate written agreement between Evorise and the client at the time of engagement.',
    ],
  },
  {
    title: '4. Fees, Payment, and Refunds',
    content: [
      '4.1 Fees for Academy or Strategy Lab services must be paid in full at the time of enrollment/engagement, unless otherwise agreed in writing.',
      '4.2 All fees paid are final and non-refundable under any circumstances, including but not limited to withdrawal, non-attendance, dissatisfaction with course content or delivery, or discontinuation of the Service by the Client/Student for any reason.',
    ],
  },
  {
    title: '5. Client/Student Obligations',
    content: [
      '5.1 Attend scheduled sessions, complete assignments, and engage with materials as required for Academy enrollment.',
      '5.2 Maintain respectful conduct with instructors, mentors, and staff.',
      '5.3 Not reproduce, distribute, or resell course materials, recordings, or Strategy Lab deliverables without written permission.',
      '5.4 Not post defamatory or misleading content about Evorise on public or social platforms.',
    ],
  },
  {
    title: "6. Evorise's Responsibilities",
    content: [
      '6.1 Deliver educational content through qualified instructors and mentors.',
      '6.2 Provide agreed access to digital platforms, portals, or recorded sessions.',
      '6.3 Safeguard personal and Strategy Data per the IT Act, 2000, SPDI Rules, and DPDP Act, 2023.',
      '6.4 Communicate any material changes to syllabus, schedule, or service scope in advance.',
    ],
  },
  {
    title: '7. Intellectual Property',
    content: [
      '7.1 All Academy course content, materials, and branding are the exclusive property of Evorise.',
      '7.2 Any strategy, algorithm logic, or Strategy Data submitted to Strategy Lab remains the intellectual property of the client, except where a separate written agreement specifies otherwise for jointly developed automation systems.',
      "7.3 Evorise's proprietary automation methodology, tools, and infrastructure remain Evorise's property, separate from the client's underlying strategy.",
    ],
  },
  {
    title: '8. Limitation of Liability',
    content: [
      '8.1 Evorise is an educational and technology service provider. Evorise does not provide financial, trading, or investment advice, and is not SEBI-registered as an investment advisor, research analyst, or portfolio manager.',
      '8.2 Evorise is not liable for trading losses, financial outcomes, or market risk arising from strategies taught, reviewed, backtested, or automated through our Services.',
      '8.3 Clients and students are solely responsible for their own trading and investment decisions.',
    ],
  },
  {
    title: '9. Term & Termination',
    content: [
      'Enrollment/engagement remains valid for the agreed course or project duration. Evorise reserves the right to terminate access for misconduct or breach of these Terms. Clauses on confidentiality, IP, and liability survive termination.',
    ],
  },
  {
    title: '10. Dispute Resolution',
    content: [
      "Disputes will first be addressed through direct discussion. If unresolved, disputes shall be referred to arbitration in Kochi, Kerala, under the Arbitration and Conciliation Act, 1996, with the arbitrator's decision being final and binding.",
    ],
  },
  {
    title: '11. Governing Law',
    content: [
      'These Terms are governed by the laws of India, with exclusive jurisdiction in the courts of Kochi, Kerala.',
    ],
  },
  {
    title: '12. Disclaimer',
    content: [
      '12.1 Evorise does not guarantee trading profits, funded-account approval, or business outcomes from any course or service. Results depend on individual effort, discipline, and market conditions.',
      '12.2 Evorise is not SEBI-registered and does not provide buy/sell recommendations.',
      '12.3 By enrolling or engaging with Strategy Lab, you acknowledge that all trading decisions and outcomes remain your own responsibility.',
    ],
  },
  {
    title: '13. General Provisions',
    content: [
      'Severability, waiver, force majeure, and notice provisions apply as standard. These Terms constitute the entire agreement between the parties regarding the Services.',
    ],
  },
]

const refundPolicySections = [
  {
    title: 'General Policy:',
    content: [
      '● All fees paid to Evorise for Academy or Strategy Lab services are final and non-refundable, including but not limited to withdrawal, non-attendance, dissatisfaction with course content or delivery, or discontinuation of the service by the participant for any reason.',
    ],
  },
  {
    title: 'Cancellation by Evorise:',
    content: [
      "● In the event that Evorise cancels a course, session, or engagement, or is unable to provide the service as agreed — including, for Recorded Sessions, where access cannot be provisioned through Royal Academy for Financial Studies' LMS for reasons attributable to Evorise or Royal Academy — a full refund will be issued to the enrolled participant, or an alternative arrangement will be offered at the participant's choice.",
    ],
  },
  {
    title: 'Contact Information:',
    content: [
      '● For any questions or concerns regarding our refund policy, please contact our support team at info@evorise.in or call 90370 71916.',
    ],
  },
  {
    title: 'Policy Updates:',
    content: [
      '● Evorise reserves the right to update or modify this refund policy at any time. Any changes will be communicated to enrolled participants.',
      '● By enrolling in our courses or engaging our services, you acknowledge that you have read and agree to abide by the terms of this refund policy.',
    ],
  },
]

const legalModalContent = {
  privacy: {
    title: 'EVORISE — PRIVACY POLICY',
    closeLabel: 'Close privacy policy',
    lastUpdated: 'Last Updated: 04 August 2026',
    sections: privacyPolicySections,
  },
  terms: {
    title: 'EVORISE — TERMS AND CONDITIONS',
    closeLabel: 'Close terms and conditions',
    lastUpdated: 'Effective Date: 04 August 2026',
    details: [
      'Website: evorise.in',
      'Entity: [Legal entity name] ("Evorise," "We," "Us," "Our")',
    ],
    sections: termsAndConditionsSections,
  },
  refund: {
    title: 'EVORISE — REFUND POLICY',
    closeLabel: 'Close refund policy',
    lastUpdated: 'Effective Date: 04 August 2026',
    details: [
      'Thank you for choosing Evorise for your trading education and strategy automation needs. We are committed to providing high-quality services to help you build your knowledge and skills in the forex market. Please review our refund policy carefully.',
    ],
    sections: refundPolicySections,
  },
}

function Footer() {
  const [activeLegalModal, setActiveLegalModal] = useState(null)
  const legalModalRef = useRef(null)
  const activeLegalContent = activeLegalModal ? legalModalContent[activeLegalModal] : null

  const scrollToSection = (id) => {
    const section = document.querySelector(id)
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' })
    }
  }

  useEffect(() => {
    if (!activeLegalModal) return

    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        setActiveLegalModal(null)
      }
    }

    document.addEventListener('keydown', handleEscape)
    document.body.style.overflow = 'hidden'

    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = 'auto'
    }
  }, [activeLegalModal])

  const openPrivacyPolicy = (event) => {
    event.preventDefault()
    setActiveLegalModal('privacy')
  }

  const openTermsAndConditions = (event) => {
    event.preventDefault()
    setActiveLegalModal('terms')
  }

  const openRefundPolicy = (event) => {
    event.preventDefault()
    setActiveLegalModal('refund')
  }

  const closeLegalModal = () => {
    setActiveLegalModal(null)
  }

  const handleLegalBackdropClick = (event) => {
    if (event.target === legalModalRef.current) {
      closeLegalModal()
    }
  }

  const quickLinks = [
    { label: 'TERMS AND CONDITIONS', action: 'terms' },
    { label: 'EVORISE — PRIVACY POLICY', action: 'privacy' },
    { label: 'Refund Policy', action: 'refund' },
    { label: 'Online Training', to: '/#services' },
    { label: 'Offline Training', to: '/#services' },
    { label: 'Live Trading Floor', to: '/#mentors' },
  ]

  const pageLinks = [
    { label: 'Home', to: '/#home' },
    { label: 'About', to: '/#about' },
    { label: 'Services', to: '/#services' },
    { label: 'Mentors', to: '/#mentors' },
    { label: 'Contact', to: '/#contact' },
  ]

  return (
    <footer className="relative overflow-hidden bg-[#f4fbf9] px-4 py-8 sm:px-6 sm:py-16 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-2 items-start gap-x-5 gap-y-8 rounded-2xl border border-slate-200 bg-white p-4 shadow-xl shadow-slate-200/60 sm:gap-x-8 sm:gap-y-10 sm:rounded-[32px] sm:p-8 md:grid-cols-2 lg:p-10 xl:grid-cols-[1.6fr_0.8fr_0.65fr_1.1fr] xl:gap-10 xl:p-12">
          <div className="col-span-2 space-y-4 sm:space-y-5 md:col-span-2 xl:col-span-1">
            <div>
              <p className="text-3xl font-extrabold tracking-tight text-slate-950">EVORISE</p>
              <p className="mt-2 text-sm font-semibold uppercase tracking-[0.35em] text-teal-700">
                FOREX ECOSYSTEM
              </p>
            </div>

            <p className="max-w-[520px] text-base leading-8 text-slate-600 lg:text-justify lg:[text-align-last:left]">
              Evorise provides educational content and strategy automation
              services. Trading involves risk, and outcomes are not guaranteed.
              Nothing on this site constitutes financial advice.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-bold text-slate-950">Quick Links</h3>
            <div className="mt-4 grid gap-2.5 text-sm leading-6 text-slate-600 sm:mt-5 sm:grid-cols-2 sm:gap-3 md:grid-cols-1">
              {quickLinks.map((link) => (
                link.action === 'privacy' || link.action === 'terms' || link.action === 'refund' ? (
                  <button
                    key={link.label}
                    type="button"
                    onClick={
                      link.action === 'privacy'
                        ? openPrivacyPolicy
                        : link.action === 'refund'
                          ? openRefundPolicy
                          : openTermsAndConditions
                    }
                    className="block text-left transition hover:text-teal-800"
                  >
                    {link.label}
                  </button>
                ) : (
                  <Link
                    key={link.label}
                    to={link.to}
                    onClick={(event) => {
                      event.preventDefault()
                      if (link.to.includes('#')) {
                        scrollToSection(link.to.split('#')[1] ? `#${link.to.split('#')[1]}` : '#home')
                      }
                    }}
                    className="block transition hover:text-teal-800"
                  >
                    {link.label}
                  </Link>
                )
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-xl font-bold text-slate-950">Pages</h3>
            <div className="mt-4 grid gap-2.5 text-sm leading-6 text-slate-600 sm:mt-5 sm:gap-3">
              {pageLinks.map((link) => (
                <Link
                  key={link.label}
                  to={link.to}
                  onClick={(event) => {
                    event.preventDefault()
                    scrollToSection(link.to.replace('/#', '#'))
                  }}
                  className="block transition hover:text-teal-800"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          <div className="col-span-2 rounded-2xl border border-slate-200/70 bg-slate-50/90 p-4 shadow-sm shadow-slate-200/50 sm:p-6 md:col-span-2 xl:col-span-1">
            <h3 className="text-xl font-bold text-slate-950">Contact Us</h3>
            <div className="mt-4 grid grid-cols-2 gap-x-5 gap-y-3 text-sm leading-6 text-slate-600 sm:mt-6 sm:gap-y-4">
              <div>
                <p className="font-semibold text-slate-900">Location</p>
                <p>Kochi, Kerala, India</p>
              </div>
              <div>
                <p className="font-semibold text-slate-900">Address</p>
                <p>Kochi, Kerala</p>
                <p>India</p>
              </div>
              <div>
                <p className="font-semibold text-slate-900">Email</p>
                <a href="mailto:info@evorise.in" className="transition hover:text-teal-800">
                  info@evorise.in
                </a>
              </div>
              <div>
                <p className="font-semibold text-slate-900">Phone</p>
                <a href="tel:+919037071916" className="transition hover:text-teal-800">
                   +91 90370 71916

                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 grid gap-4 border-t border-slate-300/40 pt-6 text-center sm:mt-12 sm:grid-cols-2 sm:items-center sm:gap-6 sm:pt-8 sm:text-left xl:grid-cols-[1fr_auto_1fr]">
          <p className="text-sm text-slate-600">Copyright © 2026 Evorise. All Rights Reserved.</p>

          <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-sm leading-6 text-slate-600 sm:justify-end xl:justify-center">
            <button
              type="button"
              onClick={openTermsAndConditions}
              className="transition hover:text-teal-800"
            >
              TERMS AND CONDITIONS
            </button>
            <span className="hidden sm:inline-block">|</span>
            <button
              type="button"
              onClick={openPrivacyPolicy}
              className="transition hover:text-teal-800"
            >
              EVORISE — PRIVACY POLICY
            </button>
          </div>

          <div className="flex items-center justify-center gap-3 sm:col-span-2 xl:col-span-1 xl:justify-end">
            <a
              href="https://www.instagram.com/evorise.in/"
              target="_blank"
              rel="noreferrer"
              aria-label="Evorise on Instagram"
              className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-[#0f766e] transition hover:bg-[#0f766e] hover:text-white"
            >
              <FaInstagram className="h-5 w-5" />
            </a>
            <a
              href="https://www.facebook.com/profile.php?id=61591238267194"
              target="_blank"
              rel="noreferrer"
              aria-label="Evorise on Facebook"
              className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-[#0f766e] transition hover:bg-[#0f766e] hover:text-white"
            >
              <FaFacebookF className="h-5 w-5" />
            </a>
            <a
              href="https://x.com/TheEvorise"
              target="_blank"
              rel="noreferrer"
              aria-label="Evorise on X"
              className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-[#0f766e] transition hover:bg-[#0f766e] hover:text-white"
            >
              <FaXTwitter className="h-5 w-5" />
            </a>
            <a
              href="https://www.youtube.com/@evoriseecosystem"
              target="_blank"
              rel="noreferrer"
              aria-label="Evorise on YouTube"
              className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-[#0f766e] transition hover:bg-[#0f766e] hover:text-white"
            >
              <FaYoutube className="h-5 w-5" />
            </a>
          </div>
        </div>
      </div>

      <a
        href="https://wa.me/919037071916"
        target="_blank"
        rel="noreferrer"
        aria-label="Chat with Evorise on WhatsApp"
        className="fixed bottom-4 right-4 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-teal-700 text-white shadow-2xl shadow-teal-700/30 transition-all duration-300 hover:bg-teal-800 sm:bottom-6 sm:right-6 sm:h-16 sm:w-16"
      >
        <FaWhatsapp className="h-5 w-5 sm:h-7 sm:w-7" />
      </a>

      {activeLegalContent && (
        <div
          ref={legalModalRef}
          onClick={handleLegalBackdropClick}
          className="fixed inset-0 z-[999] flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="legal-modal-title"
            className="relative w-full max-w-4xl overflow-hidden rounded-2xl bg-white shadow-2xl"
          >
            <button
              onClick={closeLegalModal}
              className="absolute right-4 top-4 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 text-2xl font-light leading-none text-slate-500 shadow-sm transition hover:bg-slate-200 hover:text-slate-800 sm:right-5 sm:top-5"
              aria-label={activeLegalContent.closeLabel}
              type="button"
            >
              ×
            </button>

            <div className="max-h-[90vh] overflow-y-auto px-6 py-10 sm:px-10 lg:px-12">
              <p className="text-sm font-bold uppercase tracking-[0.25em] text-teal-700">
                Evorise
              </p>
              <h2
                id="legal-modal-title"
                className="mt-3 pr-12 text-3xl font-extrabold tracking-tight text-slate-950 sm:text-4xl"
              >
                {activeLegalContent.title}
              </h2>
              {activeLegalContent.lastUpdated && (
                <p className="mt-3 text-sm font-medium text-slate-500">
                  {activeLegalContent.lastUpdated}
                </p>
              )}
              {activeLegalContent.details?.map((detail, index) => (
                <p
                  key={detail}
                  className={`${index === 0 ? 'mt-5' : 'mt-1'} text-sm font-medium text-slate-500`}
                >
                  {detail}
                </p>
              ))}

              <div className="mt-8 space-y-7 text-sm leading-7 text-slate-600 sm:text-base">
                {activeLegalContent.sections.map((section) => (
                  <section key={section.title}>
                    <h3 className="text-lg font-bold text-slate-950">
                      {section.title}
                    </h3>
                    <div className="mt-3 space-y-3 text-slate-600">
                      {section.content.map((paragraph) => (
                        <p key={paragraph}>{paragraph}</p>
                      ))}
                    </div>
                  </section>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </footer>
  )
}

export default Footer
