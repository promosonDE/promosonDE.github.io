import { useEffect } from 'react'

/**
 * Client-side 404 screen. Rendered by <App /> when the URL does not match
 * any known path, so unknown links get a themed error page instead of a
 * blank/broken view. Pair with public/404.html for static hosts.
 */
export default function NotFound() {
  useEffect(() => {
    const previousTitle = document.title
    document.title = '404 – Page Not Found | Promoson Poudel'
    return () => {
      document.title = previousTitle
    }
  }, [])

  const goHome = () => {
    window.location.assign('/')
  }

  const goBack = () => {
    if (window.history.length > 1) {
      window.history.back()
    } else {
      goHome()
    }
  }

  return (
    <div className="min-h-screen bg-[#1a1a2e] relative flex items-center justify-center px-4 overflow-hidden">
      {/* Decorative floating blocks */}
      <div className="absolute top-[20%] left-[10%] w-12 h-12 bg-[#4AEDD9] border-2 border-[#2ABCA9] opacity-60 animate-float" />
      <div className="absolute top-[30%] right-[15%] w-10 h-10 bg-[#FCDB05] border-2 border-[#C4A804] opacity-60 animate-float" style={{ animationDelay: '1s' }} />
      <div className="absolute bottom-[25%] left-[20%] w-8 h-8 bg-[#17DD62] border-2 border-[#10A848] opacity-60 animate-float" style={{ animationDelay: '2s' }} />
      <div className="absolute bottom-[20%] right-[25%] w-6 h-6 bg-[#B02E26] border-2 border-[#7A1F1A] opacity-60 animate-float" style={{ animationDelay: '1.5s' }} />

      <div className="relative z-10 text-center max-w-xl">
        {/* Block icons */}
        <div className="flex justify-center gap-2 mb-8">
          {['#5D8C3E', '#8B6914', '#7F7F7F', '#4AEDD9'].map((color, idx) => (
            <div
              key={idx}
              className="w-8 h-8 sm:w-10 sm:h-10 border-2 animate-float"
              style={{ backgroundColor: color, borderColor: `${color}88`, animationDelay: `${idx * 0.2}s` }}
            />
          ))}
        </div>

        <p className="pixel-font text-5xl sm:text-7xl text-[#FCDB05] mb-4 drop-shadow-[3px_3px_0px_#3C3C3C] animate-glow-pulse">
          404
        </p>

        <h1 className="pixel-font text-sm sm:text-lg text-[#4AEDD9] mb-4">
          Chunk Not Found
        </h1>

        <p className="text-gray-300 text-base sm:text-lg mb-8 leading-relaxed">
          This page failed to generate (<span className="text-[#B02E26]">error: chunk_not_found</span>).
          The block you are looking for may have been mined, or the link is broken.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center">
          <button onClick={goHome} className="mc-btn text-xs w-full sm:w-auto">
            🏠 Return to Home
          </button>
          <button onClick={goBack} className="mc-btn text-xs w-full sm:w-auto">
            ◀ Go Back
          </button>
        </div>
      </div>

      {/* Grass/dirt ground */}
      <div className="absolute bottom-0 left-0 right-0">
        <div
          className="h-4 grass-top"
          style={{
            backgroundImage:
              'repeating-linear-gradient(90deg, transparent, transparent 31px, rgba(0,0,0,0.1) 31px, rgba(0,0,0,0.1) 32px)',
          }}
        />
        <div className="h-12 dirt-bg opacity-40" />
      </div>
    </div>
  )
}
