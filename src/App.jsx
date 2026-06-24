import { BrowserRouter, Route, Routes } from 'react-router-dom'
import About from './components/About'
import Contact from './components/Contact'
import Footer from './components/Footer'
import Hero from './components/Hero'
import Mentors from './components/Mentors'
import Navbar from './components/Navbar'
import Services from './components/Services'
import Snaps from './components/Snaps'

function LandingPage() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Services />
        <Mentors />
        <Snaps />
        <Contact />
        <Footer />
      </main>
    </>
  )
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
