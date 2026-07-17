import { BrowserRouter, Route, Routes } from 'react-router-dom'
import About from './components/About'
import Contact from './components/Contact'
import { ContactFormModal } from './components/ContactFormModal'
import Footer from './components/Footer'
import Hero from './components/Hero'
import Mentors from './components/Mentors'
import Navbar from './components/Navbar'
import Services from './components/Services'
import { ContactModalProvider } from './context/ContactModalContext'


function LandingPage() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Services />
        <Mentors />
       
        <Contact />
        <Footer />
      </main>
    </>
  )
}

function App() {
  return (
    <BrowserRouter>
      <ContactModalProvider>
        <Routes>
          <Route path="/" element={<LandingPage />} />
        </Routes>
        <ContactFormModal />
      </ContactModalProvider>
    </BrowserRouter>
  )
}

export default App
