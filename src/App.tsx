import { useState, useEffect } from 'react'
import Navbar from './components/Navbar'
import HeroSection from './components/HeroSection'
import AboutSection from './components/AboutSection'
import SkillsSection from './components/SkillsSection'
import ExperienceSection from './components/ExperienceSection'
import EducationSection from './components/EducationSection'
import ContactSection from './components/ContactSection'
import Footer from './components/Footer'
import LoadingScreen from './components/LoadingScreen'
import NotFound from './components/NotFound'
import Particles from './components/Particles'
import MinecraftCharacter from './components/MinecraftCharacter'
import MinecraftVillage from './components/MinecraftVillage'

const BASE_TITLE = 'Promoson Poudel | Senior Data Engineer Portfolio'

/** Browser tab title for each in-page section. */
const SECTION_TITLES: Record<string, string> = {
  home: BASE_TITLE,
  about: 'Player Stats | Promoson Poudel',
  skills: 'Inventory | Promoson Poudel',
  experience: 'Quest Log | Promoson Poudel',
  education: 'Achievements | Promoson Poudel',
  contact: 'Mailbox | Promoson Poudel',
}

/**
 * This is a single-page site with no router, so any URL that is not the site
 * root (or index.html) is an unknown page and should show the 404 screen.
 * BASE_URL is stripped first so the site still works when deployed under a
 * sub-path (e.g. GitHub Pages project sites).
 */
function isUnknownPath(): boolean {
  if (typeof window === 'undefined') return false

  const base = import.meta.env.BASE_URL
  let path = window.location.pathname

  if (base && base !== '/' && path.startsWith(base)) {
    path = path.slice(base.length)
  }

  path = path.replace(/^\/+|\/+$/g, '').toLowerCase()

  return !['', 'index.html', '404.html'].includes(path)
}

function App() {
  const [activeSection, setActiveSection] = useState('home')
  const [isLoading, setIsLoading] = useState(true)
  const [isNotFound] = useState(isUnknownPath)

  // Loading screen (skipped on the 404 page)
  useEffect(() => {
    if (isNotFound) return
    const timer = setTimeout(() => setIsLoading(false), 2200)
    return () => clearTimeout(timer)
  }, [isNotFound])

  // Page title follows the section currently in view
  useEffect(() => {
    if (isNotFound) return // NotFound sets its own title
    document.title = SECTION_TITLES[activeSection] ?? BASE_TITLE
  }, [activeSection, isNotFound])

  // Scroll tracking
  useEffect(() => {
    if (isNotFound) return
    let ticking = false
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const sections = ['home', 'about', 'skills', 'experience', 'education', 'contact']
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
          ticking = false
        })
        ticking = true
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [isNotFound])

  // Scroll animation observer
  useEffect(() => {
    if (isLoading || isNotFound) return

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
  }, [isLoading, isNotFound])

  if (isNotFound) {
    return <NotFound />
  }

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
        <ContactSection />
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
    let ticking = false
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          setVisible(window.scrollY > 500)
          ticking = false
        })
        ticking = true
      }
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
      aria-label="Back to top"
    >
      ⬆️ Top
    </button>
  )
}

export default App
