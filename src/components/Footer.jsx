import { Link } from 'react-router-dom'
import {
  FaInstagram,
  FaFacebookF,
  FaTwitter,
  FaYoutube,
  FaWhatsapp,
} from 'react-icons/fa'

function Footer() {
  const scrollToSection = (id) => {
    const section = document.querySelector(id)
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const quickLinks = [
    { label: 'Terms & Conditions', to: '/#terms' },
    { label: 'Privacy Policy', to: '/#privacy' },
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
            <Link
              to="/#terms"
              onClick={(event) => {
                event.preventDefault()
                scrollToSection('#terms')
              }}
              className="transition hover:text-teal-800"
            >
              Terms & Conditions
            </Link>
            <span className="hidden sm:inline-block">|</span>
            <Link
              to="/#privacy"
              onClick={(event) => {
                event.preventDefault()
                scrollToSection('#privacy')
              }}
              className="transition hover:text-teal-800"
            >
              Privacy Policy
            </Link>
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
              <FaTwitter className="h-5 w-5" />
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
        href="#contact"
        target="_blank"
        rel="noreferrer"
        className="fixed bottom-6 right-6 z-50 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500 text-white shadow-2xl shadow-emerald-500/30 transition-all duration-300 hover:bg-emerald-600"
      >
        <span className="absolute -right-1 -top-1 h-3 w-3 rounded-full bg-red-500 shadow-lg shadow-red-500/40" />
        <FaWhatsapp className="h-7 w-7" />
      </a>
    </footer>
  )
}

export default Footer
