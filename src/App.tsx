import { useState, useEffect } from 'react'
import Navbar from './components/Navbar'
import HeroSection from './components/HeroSection'
import AboutSection from './components/AboutSection'
import ImpactSection from './components/ImpactSection'
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

const BASE_TITLE = 'Promoson Poudel | Senior Data Engineer — Azure, Databricks & Snowflake'

/** Browser tab title for each in-page section. */
const SECTION_TITLES: Record<string, string> = {
  home: BASE_TITLE,
  about: 'Player Stats | Promoson Poudel',
  impact: 'Impact & Blueprint | Promoson Poudel',
  skills: 'Skills Inventory | Promoson Poudel',
  experience: 'Experience — Quest Log | Promoson Poudel',
  education: 'Education & Certifications | Promoson Poudel',
  contact: 'Contact | Promoson Poudel',
}

/** Sections in document order — used by the scroll spy. */
const SECTION_IDS = ['home', 'about', 'impact', 'skills', 'experience', 'education', 'contact']

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
  const [isLoading, setIsLoading] = useState(() => {
    if (typeof window === 'undefined') return true
    try {
      // The themed loading screen is a nice first impression, but showing it
      // on every internal navigation is annoying. Once per session is plenty.
      return sessionStorage.getItem('pp-visited') !== '1'
    } catch {
      return true
    }
  })
  const [isNotFound] = useState(isUnknownPath)

  // Loading screen (skipped on the 404 page)
  useEffect(() => {
    if (isNotFound || !isLoading) return
    const timer = setTimeout(() => {
      setIsLoading(false)
      try {
        sessionStorage.setItem('pp-visited', '1')
      } catch {
        // Storage can be disabled; the gate still closes.
      }
    }, 1800)
    return () => clearTimeout(timer)
  }, [isNotFound, isLoading])

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
          const scrollPosition = window.scrollY + 200

          for (const section of SECTION_IDS) {
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
      {/* Keyboard users can jump straight to the content */}
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>

      {/* Minecraft Village Background */}
      <MinecraftVillage />
      
      {/* Floating particles */}
      <Particles />
      
      {/* Navigation */}
      <Navbar activeSection={activeSection} />
      
      {/* Main Content */}
      <main id="main-content" tabIndex={-1} className="relative z-10 outline-none">
        <HeroSection />
        <AboutSection />
        <ImpactSection />
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
      className="fixed bottom-6 right-6 z-50 mc-btn text-xs animate-bounce transition-transform hover:scale-105"
      style={{ animationDuration: '2s' }}
      aria-label="Back to top"
    >
      ⬆️ Top
    </button>
  )
}

export default App
