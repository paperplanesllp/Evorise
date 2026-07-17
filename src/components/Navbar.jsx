import { useState } from 'react'
import { Link } from 'react-router-dom'

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

  const scrollToSection = (sectionId) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' })
    setIsMenuOpen(false)
  }

  return (
    <>
      <header className="fixed left-0 top-0 z-50 w-full border-b border-black/10 bg-white/40 backdrop-blur-xl">
        <nav className="mx-auto flex h-24 max-w-7xl items-center justify-between px-6 lg:px-10">
          <Link to="/" onClick={() => scrollToSection('home')} className="shrink-0">
            <span className="block text-2xl font-extrabold tracking-[0.22em] text-black">
              EVORISE
            </span>
            <span className="mt-1 block text-[10px] font-semibold tracking-[0.35em] text-black/50">
              FOREX ECOSYSTEM
            </span>
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
            className="flex h-14 w-14 items-center justify-center rounded-2xl border border-black/10 bg-white/70 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:bg-white"
          >
            <span className="flex flex-col gap-1.5">
              <span className="block h-0.5 w-6 rounded-full bg-black" />
              <span className="block h-0.5 w-6 rounded-full bg-black" />
              <span className="block h-0.5 w-6 rounded-full bg-black" />
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
        className={`fixed right-0 top-0 z-[70] h-screen w-full max-w-[560px] overflow-y-auto bg-[#111515] px-9 py-9 text-white shadow-2xl transition-transform duration-500 sm:px-12 lg:px-16 ${
          isMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <button
          type="button"
          aria-label="Close menu"
          onClick={() => setIsMenuOpen(false)}
          className="absolute right-9 top-9 text-5xl font-light leading-none text-white/30 transition duration-300 hover:rotate-90 hover:text-white"
        >
          x
        </button>

        <div className="pt-20">
          <Link to="/" onClick={() => scrollToSection('home')} className="inline-block">
            <span className="block text-2xl font-extrabold tracking-[0.22em] text-teal-600">
              EVORISE
            </span>
            <span className="mt-1 block text-[10px] font-semibold tracking-[0.35em] text-teal-600/80">
              FOREX ECOSYSTEM
            </span>
          </Link>

          <p className="mt-14 max-w-[440px] text-xl font-semibold leading-[1.65] text-white">
            Evorise is built around forex education, strategy backtesting, and
            trading automation for traders at different stages of the same
            journey.
          </p>

          <div className="my-11 h-px w-full bg-white/15" />

          <h2 className="text-2xl font-extrabold">Let's Talk</h2>

          <div className="mt-8 space-y-7">
            {contactItems.map((item) => (
              <div key={item.label} className="flex gap-6">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-teal-700 text-white">
                  {item.icon}
                </div>
                <div>
                  <p className="text-lg font-medium text-white">{item.label}</p>
                  <p className="mt-1 text-xl font-bold leading-8 text-white">
                    {item.value}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="my-11 h-px w-full bg-white/15" />

          <div className="flex flex-wrap gap-5">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noreferrer"
                aria-label={social.label}
                className="flex h-14 w-14 items-center justify-center rounded-xl bg-white text-base font-extrabold text-teal-700 transition-all duration-300 hover:-translate-y-1 hover:bg-teal-700 hover:text-white"
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
