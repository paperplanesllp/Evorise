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
    title: '2. Definitions',
    content: [
      'Account — a unique account created to access the Service.',
      'Personal Data — any data that can identify an individual (name, email, phone number, image, etc.).',
      'Usage Data — automatically collected data related to your use of the Service (IP address, browser type, device information, pages visited).',
      'Strategy Data — any trading strategy, algorithm logic, code, backtest data, or related materials a client submits to Evorise Strategy Lab.',
      'Service Provider — any third party processing data on behalf of Evorise.',
    ],
  },
  {
    title: '3. Data We Collect',
    content: [
      'Personal Data: name, email, phone number, and other identifiers you provide voluntarily through enrollment or contact forms.',
      'Usage Data: device details, IP address, browser type, and time spent on the site, collected automatically.',
      'Strategy Data (Strategy Lab clients only): any strategy logic, rules, code, or performance history submitted for backtesting, consultation, or automation.',
      'We do not collect or store banking credentials, card details, or trading account passwords.',
    ],
  },
  {
    title: '4. Purpose of Collecting Data',
    content: [
      'Your data is used solely to:',
      'Provide and improve Evorise Academy and Strategy Lab services',
      'Manage enrollment, accounts, and communication',
      "Send service updates or, where you've opted in, marketing communication",
      'Analyze usage to improve the Service',
      'Meet legal and regulatory obligations',
      'We do not sell, rent, or trade your data to third parties for marketing purposes.',
    ],
  },
  {
    title: '5. Strategy Data — Special Handling',
    content: [
      'Strategy Data submitted to Evorise Strategy Lab remains the intellectual property of the client who submits it. Evorise will:',
      'Use Strategy Data solely for the purpose of backtesting, consultation, or automation as engaged by the client',
      "Not share, reuse, or repurpose a client's Strategy Data for any other client's benefit",
      'Retain Strategy Data only as long as necessary to deliver the engaged service, or as otherwise agreed in writing',
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
      'Your data may be shared with service providers assisting our operations (hosting, analytics, communication tools), affiliates under common ownership adhering to this Policy, or regulatory authorities where legally required. Cross-border transfers, if any, will comply with the Digital Personal Data Protection Act, 2023.',
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
    title: '2. Evorise Academy - Enrollment',
    content: [
      '2.1 Enrollment is confirmed upon selection of a course format (online, offline, or live trading floor) at registration.',
      '2.2 Access to recorded content or materials is provided for a limited duration as specified at enrollment.',
      '2.3 Enrollment is non-transferable and valid only for the individual named on the admission form.',
    ],
  },
  {
    title: '3. Evorise Strategy Lab - Engagement',
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
      '12.3 By enrolling or engaging Strategy Lab, you acknowledge that all trading decisions and outcomes remain your own responsibility.',
    ],
  },
  {
    title: '13. General Provisions',
    content: [
      'Severability, waiver, force majeure, and notice provisions apply as standard. These Terms constitute the entire agreement between the parties regarding the Services.',
    ],
  },
]

const legalModalContent = {
  privacy: {
    title: 'EVORISE — PRIVACY POLICY',
    closeLabel: 'Close privacy policy',
    lastUpdated: 'Last Updated: July 18, 2026',
    sections: privacyPolicySections,
  },
  terms: {
    title: 'TERMS AND CONDITIONS',
    closeLabel: 'Close terms and conditions',
    lastUpdated: null,
    sections: termsAndConditionsSections,
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
    { label: 'Refund Policy', to: '/#refund' },
    { label: 'Online Training', to: '/#services' },
    { label: 'Offline Training', to: '/#services' },
    { label: 'Live Trading Floor', to: '/#mentors' },
  ]

  const pageLinks = [
    { label: 'Home', to: '/#home' },
    { label: 'About', to: '/#about' },
    { label: 'Services', to: '/#services' },
    { label: 'Mentors', to: '/#mentors' },
    { label: 'Stories', to: '/#snaps' },
    { label: 'Contact', to: '/#contact' },
  ]

  return (
    <footer className="relative overflow-hidden bg-[radial-gradient(circle_at_top_left,#d9f7e5_0%,transparent_32%),radial-gradient(circle_at_top_right,#f7e1ff_0%,transparent_28%),linear-gradient(135deg,#f8fff9_0%,#fff8ef_45%,#f8f7ff_100%)] px-6 py-16 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-10 rounded-[32px] border border-slate-300/40 bg-white/80 p-8 shadow-2xl shadow-slate-200/70 backdrop-blur-xl lg:grid-cols-[1.9fr_0.85fr_0.85fr_1.1fr] lg:p-12">
          <div className="space-y-6">
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
            <div className="mt-6 grid gap-3 text-sm text-slate-600 sm:grid-cols-2">
              {quickLinks.map((link) => (
                link.action === 'privacy' || link.action === 'terms' ? (
                  <button
                    key={link.label}
                    type="button"
                    onClick={link.action === 'privacy' ? openPrivacyPolicy : openTermsAndConditions}
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
            <div className="mt-6 grid gap-3 text-sm text-slate-600">
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

          <div className="rounded-[28px] border border-slate-200/70 bg-slate-50/90 p-6 shadow-sm shadow-slate-200/50">
            <h3 className="text-xl font-bold text-slate-950">Contact Us</h3>
            <div className="mt-6 space-y-4 text-sm leading-7 text-slate-600">
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
                <a href="#contact" className="transition hover:text-teal-800">
                   +91 90370 71916

                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 space-y-6 border-t border-slate-300/40 pt-8 sm:flex sm:items-center sm:justify-between sm:space-y-0">
          <p className="text-sm text-slate-600">Copyright © 2026 Evorise. All Rights Reserved.</p>

          <div className="flex flex-wrap items-center justify-center gap-4 text-sm text-slate-600">
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

          <div className="flex items-center justify-center gap-3">
            <a
              href="https://www.instagram.com/evorise.in/"
              target="_blank"
              rel="noreferrer"
              className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-[#0f766e] transition hover:bg-[#0f766e] hover:text-white"
            >
              <FaInstagram className="h-5 w-5" />
            </a>
            <a
              href="https://www.facebook.com/profile.php?id=61591238267194"
              target="_blank"
              rel="noreferrer"
              className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-[#0f766e] transition hover:bg-[#0f766e] hover:text-white"
            >
              <FaFacebookF className="h-5 w-5" />
            </a>
            <a
              href="https://x.com/TheEvorise"
              target="_blank"
              rel="noreferrer"
              className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-[#0f766e] transition hover:bg-[#0f766e] hover:text-white"
            >
              <FaXTwitter className="h-5 w-5" />
            </a>
            <a
              href="https://www.youtube.com/@evoriseecosystem"
              target="_blank"
              rel="noreferrer"
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
        className="fixed bottom-6 right-6 z-50 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500 text-white shadow-2xl shadow-emerald-500/30 transition-all duration-300 hover:bg-emerald-600"
      >
        <span className="absolute -right-1 -top-1 h-3 w-3 rounded-full bg-red-500 shadow-lg shadow-red-500/40" />
        <FaWhatsapp className="h-7 w-7" />
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
            className="relative max-h-[90vh] w-full max-w-4xl overflow-y-auto rounded-2xl bg-white shadow-2xl"
          >
            <button
              onClick={closeLegalModal}
              className="absolute right-5 top-5 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 text-2xl font-light leading-none text-slate-500 transition hover:bg-slate-200 hover:text-slate-800"
              aria-label={activeLegalContent.closeLabel}
              type="button"
            >
              ×
            </button>

            <div className="px-6 py-10 sm:px-10 lg:px-12">
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
