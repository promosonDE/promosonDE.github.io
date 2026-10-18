import { useState, useEffect } from 'react'
import Navbar from './components/Navbar'
import HeroSection from './components/HeroSection'
import AboutSection from './components/AboutSection'
import SkillsSection from './components/SkillsSection'
import ExperienceSection from './components/ExperienceSection'
import EducationSection from './components/EducationSection'
import Footer from './components/Footer'
import LoadingScreen from './components/LoadingScreen'
import Particles from './components/Particles'
import MinecraftCharacter from './components/MinecraftCharacter'
import MinecraftVillage from './components/MinecraftVillage'

function App() {
  const [activeSection, setActiveSection] = useState('home')
  const [isLoading, setIsLoading] = useState(true)

  // Loading screen
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2500)
    return () => clearTimeout(timer)
  }, [])

  // Scroll tracking
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about', 'skills', 'experience', 'education']
      const scrollPosition = window.scrollY + 200

      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const { offsetTop, offsetHeight } = element
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section)
            break
          }
        }
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Scroll animation observer
  useEffect(() => {
    if (isLoading) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
          }
        })
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    )

    const elements = document.querySelectorAll(
      '.scroll-animate, .scroll-animate-up, .scroll-animate-left, .scroll-animate-right, .scroll-animate-scale, .scroll-animate-rotate'
    )
    elements.forEach((el) => observer.observe(el))

    return () => observer.disconnect()
  }, [isLoading])

  if (isLoading) {
    return <LoadingScreen />
  }

  return (
    <div className="min-h-screen bg-[#1a1a2e] relative">
      {/* Minecraft Village Background */}
      <MinecraftVillage />
      
      {/* Floating particles */}
      <Particles />
      
      {/* Navigation */}
      <Navbar activeSection={activeSection} />
      
      {/* Main Content */}
      <main className="relative z-10">
        <HeroSection />
        <AboutSection />
        <SkillsSection />
        <ExperienceSection />
        <EducationSection />
        <Footer />
      </main>
      
      {/* Running Minecraft Character */}
      <MinecraftCharacter />
      
      {/* Back to top button */}
      <BackToTop />
    </div>
  )
}

function BackToTop() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 500)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  if (!visible) return null

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      className="fixed bottom-6 right-6 z-50 mc-btn text-xs animate-bounce"
      style={{ animationDuration: '2s' }}
    >
      ⬆️ Top
    </button>
  )
}

export default App
