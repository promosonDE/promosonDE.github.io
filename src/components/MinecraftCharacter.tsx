import { useEffect, useState, useRef } from 'react'

export default function MinecraftCharacter() {
  const [scrollProgress, setScrollProgress] = useState(0)
  const [isRunning, setIsRunning] = useState(false)
  const [direction, setDirection] = useState<'left' | 'right'>('right')
  // clientWidth excludes the scrollbar, so the character can never be placed
  // past the right edge of the visible viewport.
  const [viewportWidth, setViewportWidth] = useState(() =>
    typeof window !== 'undefined' ? document.documentElement.clientWidth : 1200
  )
  const lastScrollRef = useRef(0)
  const rafRef = useRef<number>(0)
  const reducedMotion = useRef(typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches)

  useEffect(() => {
    const handleResize = () => setViewportWidth(document.documentElement.clientWidth)
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  useEffect(() => {
    if (reducedMotion.current) return

    let ticking = false
    let stopTimer: ReturnType<typeof setTimeout>

    const handleScroll = () => {
      if (!ticking) {
        rafRef.current = requestAnimationFrame(() => {
          const currentScroll = window.scrollY
          const maxScroll = document.documentElement.scrollHeight - window.innerHeight
          const progress = maxScroll > 0 ? (currentScroll / maxScroll) * 100 : 0
          
          // Determine direction
          if (currentScroll > lastScrollRef.current) {
            setDirection('right')
          } else if (currentScroll < lastScrollRef.current) {
            setDirection('left')
          }
          
          setScrollProgress(progress)
          
          // Detect running state
          const scrollDelta = Math.abs(currentScroll - lastScrollRef.current)
          if (scrollDelta > 2) {
            setIsRunning(true)
          }
          lastScrollRef.current = currentScroll
          ticking = false
        })
        ticking = true
      }

      setIsRunning(true)
      clearTimeout(stopTimer)
      stopTimer = setTimeout(() => setIsRunning(false), 200)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', handleScroll)
      cancelAnimationFrame(rafRef.current)
      clearTimeout(stopTimer)
    }
  }, [])

  // Character horizontal position based on scroll
  const maxLeft = Math.max(0, viewportWidth - 70)
  const charX = (scrollProgress / 100) * maxLeft

  return (
    <div 
      className="fixed z-40 pointer-events-none"
      style={{ 
        bottom: '58px',
        left: reducedMotion.current ? '50%' : `${Math.min(charX, maxLeft)}px`,
        transform: reducedMotion.current ? 'translateX(-50%)' : undefined,
        transition: reducedMotion.current ? 'none' : 'left 0.05s linear',
        willChange: reducedMotion.current ? 'auto' : 'left',
      }}
    >
      <div className={`minecraft-character ${isRunning ? 'running' : 'idle'} ${direction === 'left' ? 'facing-left' : 'facing-right'}`}>
        {/* Character built with CSS pixel art */}
        <div className="character-container">
          {/* Head */}
          <div className="char-head">
            <div className="char-hair" />
            <div className="char-face">
              {/* Eyes */}
              <div className="char-eye char-eye-left" />
              <div className="char-eye char-eye-right" />
              {/* Nose */}
              <div className="char-nose" />
              {/* Mouth */}
              <div className="char-mouth" />
            </div>
          </div>
          
          {/* Body */}
          <div className="char-body">
            <div className="char-shirt" />
          </div>
          
          {/* Arms */}
          <div className="char-arm char-arm-left">
            <div className="char-hand" />
          </div>
          <div className="char-arm char-arm-right">
            <div className="char-hand" />
          </div>
          
          {/* Legs */}
          <div className="char-leg char-leg-left">
            <div className="char-shoe" />
          </div>
          <div className="char-leg char-leg-right">
            <div className="char-shoe" />
          </div>
        </div>
      </div>
      
      {/* Dust particles when running */}
      {isRunning && !reducedMotion.current && (
        <div className="dust-container">
          {[...Array(5)].map((_, i) => (
            <div 
              key={i} 
              className="dust-particle"
              style={{ 
                animationDelay: `${i * 0.08}s`,
                '--dust-x': `${direction === 'right' ? -1 : 1} * ${8 + (i * 3) % 16}px`,
                '--dust-y': `${-3 - (i * 2) % 8}px`,
              } as React.CSSProperties}
            />
          ))}
        </div>
      )}
    </div>
  )
}
