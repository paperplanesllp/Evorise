import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import evoriseLogo from '../assets/Evoriselogo.jpeg'

const navLinks = [
  { label: 'Home', sectionId: 'home' },
  { label: 'About', sectionId: 'about' },
  { label: 'Services', sectionId: 'services' },
  { label: 'Mentors', sectionId: 'mentors' },
  { label: 'Contact Us', sectionId: 'contact' },
]

const contactItems = [
  {
    label: 'Email',
    value: 'info@evorise.in',
    icon: (
      <svg viewBox="0 0 24 24" className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M4 6h16v12H4z" />
        <path d="m4 7 8 6 8-6" />
      </svg>
    ),
  },
  {
    label: 'Phone',
    value: '+91 90370 71916',
    icon: (
      <svg viewBox="0 0 24 24" className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.4 2.1L8.1 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.8.7A2 2 0 0 1 22 16.9Z" />
      </svg>
    ),
  },
  {
    label: 'Location',
    value: 'Kochi, Kerala, India',
    icon: (
      <svg viewBox="0 0 24 24" className="h-7 w-7" fill="currentColor">
        <path d="M12 2a7 7 0 0 0-7 7c0 5.2 7 13 7 13s7-7.8 7-13a7 7 0 0 0-7-7Zm0 9.8A2.8 2.8 0 1 1 12 6a2.8 2.8 0 0 1 0 5.8Z" />
      </svg>
    ),
  },
]

const socialLinks = [
  { label: 'IG', href: 'https://www.instagram.com/evorise.in/' },
  { label: 'FB', href: 'https://www.facebook.com/profile.php?id=61591238267194' },
  { label: 'YT', href: 'https://www.youtube.com/@evoriseecosystem' },
  { label: 'X', href: 'https://x.com/TheEvorise' },
]

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  useEffect(() => {
    if (!isMenuOpen) return undefined

    const previousOverflow = document.body.style.overflow
    const closeOnEscape = (event) => {
      if (event.key === 'Escape') setIsMenuOpen(false)
    }

    document.body.style.overflow = 'hidden'
    document.addEventListener('keydown', closeOnEscape)

    return () => {
      document.body.style.overflow = previousOverflow
      document.removeEventListener('keydown', closeOnEscape)
    }
  }, [isMenuOpen])

  const scrollToSection = (sectionId) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' })
    setIsMenuOpen(false)
  }

  return (
    <>
      <header className="fixed left-0 top-0 z-50 w-full border-b border-black/10 bg-white/90 backdrop-blur-xl">
        <nav className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 sm:h-24 sm:px-6 lg:px-10">
          <Link
            to="/"
            onClick={() => scrollToSection('home')}
            className="block h-11 w-32 shrink-0 overflow-hidden rounded-lg shadow-sm sm:h-14 sm:w-40"
            aria-label="Evorise home"
          >
            <img
              src={evoriseLogo}
              alt="Evorise"
              className="h-full w-full object-cover object-center"
            />
          </Link>

          <div className="hidden items-center gap-9 lg:flex">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                to={`/#${link.sectionId}`}
                onClick={() => scrollToSection(link.sectionId)}
                className="text-[13px] font-semibold uppercase tracking-[0.28em] text-black/55 transition-all duration-300 hover:-translate-y-1 hover:text-black"
              >
                {link.label}
              </Link>
            ))}
          </div>

          <button
            type="button"
            aria-label="Open menu"
            onClick={() => setIsMenuOpen(true)}
            className="group flex h-12 items-center justify-center gap-3 rounded-full bg-[#151515] px-4 text-white shadow-sm transition-colors duration-300 hover:bg-teal-700 sm:px-5 lg:hidden"
          >
            <span className="hidden text-xs font-bold uppercase tracking-[0.18em] sm:inline">
              Menu
            </span>
            <span className="flex w-5 flex-col items-end gap-1.5">
              <span className="block h-px w-5 rounded-full bg-white" />
              <span className="block h-px w-3.5 rounded-full bg-white transition-all duration-300 group-hover:w-5" />
            </span>
          </button>
        </nav>
      </header>

      <div
        className={`fixed inset-0 z-[60] bg-black/55 backdrop-blur-[2px] transition-opacity duration-500 ${
          isMenuOpen ? 'opacity-100' : 'pointer-events-none opacity-0'
        }`}
        onClick={() => setIsMenuOpen(false)}
      />

      <aside
        role="dialog"
        aria-modal="true"
        aria-label="Site menu"
        aria-hidden={!isMenuOpen}
        className={`fixed right-0 top-0 z-[70] h-screen w-full max-w-[560px] overflow-y-auto bg-[#151515] px-6 py-6 text-white shadow-2xl transition-transform duration-500 sm:px-10 sm:py-8 lg:px-12 ${
          isMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <button
          type="button"
          aria-label="Close menu"
          onClick={() => setIsMenuOpen(false)}
          className="absolute right-6 top-6 flex h-11 w-11 items-center justify-center rounded-full border border-white/15 text-2xl font-light leading-none text-white/70 transition-colors duration-300 hover:border-teal-600 hover:bg-teal-700 hover:text-white sm:right-10 sm:top-8"
        >
          ×
        </button>

        <div className="pt-16 sm:pt-14">
          <Link
            to="/"
            onClick={() => scrollToSection('home')}
            className="block h-14 w-40 overflow-hidden rounded-lg"
            aria-label="Evorise home"
          >
            <img src={evoriseLogo} alt="Evorise" className="h-full w-full object-cover" />
          </Link>

          <nav aria-label="Menu navigation" className="mt-10 border-y border-white/15 py-4">
            {navLinks.map((link, index) => (
              <Link
                key={link.label}
                to={`/#${link.sectionId}`}
                onClick={() => scrollToSection(link.sectionId)}
                className="group flex items-center justify-between border-b border-white/10 py-4 text-xl font-semibold last:border-b-0 hover:text-teal-300 sm:text-2xl"
              >
                <span>{link.label}</span>
                <span className="text-xs font-medium text-white/35 group-hover:text-teal-300">
                  0{index + 1}
                </span>
              </Link>
            ))}
          </nav>

          <p className="mt-8 max-w-[440px] text-base font-medium leading-7 text-white/70">
            Evorise is built around forex education, strategy backtesting, and
            trading automation for traders at different stages of the same
            journey.
          </p>

          <div className="my-8 h-px w-full bg-white/15" />

          <h2 className="text-xl font-extrabold">Let's Talk</h2>

          <div className="mt-6 space-y-5">
            {contactItems.map((item) => (
              <div key={item.label} className="flex items-center gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-teal-700 text-white [&_svg]:h-5 [&_svg]:w-5">
                  {item.icon}
                </div>
                <div>
                  <p className="text-sm font-medium text-white/55">{item.label}</p>
                  <p className="text-base font-semibold leading-7 text-white">
                    {item.value}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="my-8 h-px w-full bg-white/15" />

          <div className="flex flex-wrap gap-3 pb-4">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noreferrer"
                aria-label={social.label}
                className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 text-sm font-extrabold text-white transition-colors duration-300 hover:border-teal-700 hover:bg-teal-700"
              >
                {social.label}
              </a>
            ))}
          </div>
        </div>
      </aside>
    </>
  )
}

export default Navbar
