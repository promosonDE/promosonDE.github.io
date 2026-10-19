import { useEffect, useState, useMemo, useRef } from 'react'

export default function MinecraftVillage() {
  const [scrollY, setScrollY] = useState(0)
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1200)
  const villageRef = useRef<HTMLDivElement>(null)
  const rafRef = useRef<number>(0)
  const reducedMotion = useRef(typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches)

  useEffect(() => {
    if (reducedMotion.current) {
      setScrollY(0)
      return
    }

    let ticking = false
    const handleScroll = () => {
      if (!ticking) {
        rafRef.current = requestAnimationFrame(() => {
          setScrollY(window.scrollY)
          ticking = false
        })
        ticking = true
      }
    }
    const handleResize = () => setWindowWidth(window.innerWidth)
    
    window.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('resize', handleResize, { passive: true })
    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', handleResize)
      cancelAnimationFrame(rafRef.current)
    }
  }, [])

  // Calculate total page height for village width
  const totalHeight = typeof document !== 'undefined' 
    ? Math.max(document.documentElement.scrollHeight, 5000) 
    : 5000
  const villageWidth = Math.max(totalHeight * 0.8, windowWidth * 4)

  // Generate village elements once
  const houses = useMemo(() => 
    Array.from({ length: 18 }, (_, i) => ({
      x: i * 320 + (i % 2) * 80 + (i * 17) % 40,
      type: i % 4,
    })), []
  )

  const trees = useMemo(() => 
    Array.from({ length: 30 }, (_, i) => ({
      x: i * 190 + (i % 3) * 50 + (i * 23) % 60,
      height: 35 + (i % 4) * 12,
    })), []
  )

  const lamps = useMemo(() => 
    Array.from({ length: 12 }, (_, i) => ({
      x: i * 450 + 200,
    })), []
  )

  const crops = useMemo(() => 
    Array.from({ length: 8 }, (_, i) => ({
      x: i * 600 + 400,
    })), []
  )

  const fences = useMemo(() => 
    Array.from({ length: 15 }, (_, i) => ({
      x: i * 350 + 100,
    })), []
  )

  const stars = useMemo(() => 
    Array.from({ length: 40 }).map((_, i) => ({
      id: i,
      top: (i * 31) % 30,
      left: (i * 43) % 100,
      duration: 2 + (i % 4),
      delay: i % 3,
    })), []
  )

  const mountains = useMemo(() => 
    Array.from({ length: 12 }).map((_, i) => ({
      id: i,
      left: i * 200 - 50,
      height: 100 + (i % 3) * 50,
    })), []
  )

  const grassTufts = useMemo(() => 
    Array.from({ length: 50 }).map((_, i) => ({
      id: i,
      left: i * 60 + (i * 7) % 30,
      height: 6 + (i % 6),
      color: i % 2 === 0 ? '#4A7A2E' : '#5D8C3E',
    })), []
  )

  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
      {/* Sky gradient */}
      <div 
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(180deg, #0a0a2e 0%, #1a2a4e 20%, #2a4a6e 40%, #4a7a9e 60%, #7BA4D4 80%, #9BC4E4 100%)',
          transform: reducedMotion.current ? undefined : `translate3d(0, ${scrollY * 0.03}px, 0)`,
          willChange: reducedMotion.current ? 'auto' : 'transform',
        }}
      />

      {/* Stars */}
      {stars.map((s) => (
        <div
          key={`star-${s.id}`}
          className="star absolute bg-white"
          style={{
            width: '2px',
            height: '2px',
            top: `${s.top}%`,
            left: `${s.left}%`,
            '--duration': `${s.duration}s`,
            '--delay': `${s.delay}s`,
          } as React.CSSProperties}
        />
      ))}

      {/* Sun */}
      <div 
        className="absolute w-20 h-20 bg-[#FCDB05] border-2 border-[#C4A804]"
        style={{
          top: `${80 + scrollY * 0.015}px`,
          right: '12%',
          boxShadow: '0 0 60px rgba(252, 219, 5, 0.5), 0 0 120px rgba(252, 219, 5, 0.2)',
          transform: reducedMotion.current ? undefined : `translate3d(0, 0, 0)`,
          willChange: reducedMotion.current ? 'auto' : 'top',
        }}
      >
        <div className="absolute inset-2 bg-[#FFE44D] opacity-60" />
      </div>

      {/* Clouds - far background */}
      <div 
        className="absolute top-[5%] w-full"
        style={{ 
          transform: reducedMotion.current ? undefined : `translate3d(${-scrollY * 0.03}px, 0, 0)`,
          willChange: reducedMotion.current ? 'auto' : 'transform',
        }}
      >
        {[...Array(6)].map((_, i) => (
          <div
            key={`cloud-${i}`}
            className="absolute"
            style={{
              left: `${i * 20}%`,
              top: `${i * 8}px`,
            }}
          >
            <div className="bg-white/[0.07]" style={{ width: `${80 + i * 20}px`, height: '16px' }} />
            <div className="bg-white/[0.07] absolute -top-2 left-3" style={{ width: `${50 + i * 10}px`, height: '12px' }} />
            <div className="bg-white/[0.07] absolute -top-4 left-6" style={{ width: `${30 + i * 8}px`, height: '12px' }} />
          </div>
        ))}
      </div>

      {/* Far mountains */}
      <div 
        className="absolute bottom-[100px] left-0 h-[180px]"
        style={{ 
          width: `${villageWidth * 0.5}px`,
          transform: reducedMotion.current ? undefined : `translate3d(${-scrollY * 0.06}px, 0, 0)`,
          willChange: reducedMotion.current ? 'auto' : 'transform',
        }}
      >
        {mountains.map((m) => (
          <div
            key={`mountain-${m.id}`}
            className="absolute bottom-0"
            style={{
              left: `${m.left}px`,
              width: '180px',
              height: `${m.height}px`,
              background: `linear-gradient(to bottom, #2A4A1A 0%, #1A3A0A 100%)`,
              clipPath: 'polygon(0% 100%, 15% 40%, 30% 55%, 50% 15%, 70% 45%, 85% 30%, 100% 100%)',
              opacity: 0.6,
            }}
          />
        ))}
      </div>

      {/* Village layer - main parallax */}
      <div 
        ref={villageRef}
        className="absolute bottom-[60px] left-0 h-[220px]"
        style={{ 
          width: `${villageWidth}px`,
          transform: reducedMotion.current ? undefined : `translate3d(${-scrollY * 0.15}px, 0, 0)`,
          willChange: reducedMotion.current ? 'auto' : 'transform',
        }}
      >
        {/* Houses */}
        {houses.map((house, i) => (
          <VillageHouse key={i} index={i} x={house.x} type={house.type} />
        ))}

        {/* Trees */}
        {trees.map((tree, i) => (
          <VillageTree key={`tree-${i}`} index={i} x={tree.x} height={tree.height} />
        ))}

        {/* Lamp posts */}
        {lamps.map((lamp, i) => (
          <LampPost key={`lamp-${i}`} index={i} x={lamp.x} />
        ))}

        {/* Crop fields */}
        {crops.map((crop, i) => (
          <CropField key={`crop-${i}`} index={i} x={crop.x} />
        ))}

        {/* Fences */}
        {fences.map((fence, i) => (
          <Fence key={`fence-${i}`} index={i} x={fence.x} />
        ))}

        {/* Well */}
        <VillageWell x={500} />
        <VillageWell x={2800} />
      </div>

      {/* Ground - grass and dirt */}
      <div className="absolute bottom-0 left-0 right-0 h-[80px]">
        {/* Grass top */}
        <div 
          className="absolute top-0 left-0 right-0 h-[16px]"
          style={{
            background: 'linear-gradient(to bottom, #5D8C3E 0%, #4A7A2E 50%, #3B5E2B 100%)',
            backgroundImage: 'repeating-linear-gradient(90deg, transparent, transparent 15px, rgba(0,0,0,0.05) 15px, rgba(0,0,0,0.05) 16px)',
          }}
        />
        {/* Dirt */}
        <div 
          className="absolute top-[16px] left-0 right-0 bottom-0"
          style={{
            backgroundColor: '#8B6914',
            backgroundImage: `
              repeating-linear-gradient(0deg, transparent, transparent 15px, rgba(0,0,0,0.08) 15px, rgba(0,0,0,0.08) 16px),
              repeating-linear-gradient(90deg, transparent, transparent 15px, rgba(0,0,0,0.08) 15px, rgba(0,0,0,0.08) 16px)
            `,
          }}
        />
        {/* Stone path */}
        <div 
          className="absolute top-0 left-0 right-0 h-[16px] opacity-40"
          style={{
            background: 'repeating-linear-gradient(90deg, #BC9862 0px, #BC9862 30px, #A08050 30px, #A08050 32px, #BC9862 32px, #BC9862 60px, #9A7844 60px, #9A7844 62px)',
          }}
        />
      </div>

      {/* Foreground grass tufts */}
      <div 
        className="absolute bottom-[60px] left-0 h-[20px]"
        style={{ 
          width: `${villageWidth * 0.7}px`,
          transform: reducedMotion.current ? undefined : `translate3d(${-scrollY * 0.2}px, 0, 0)`,
          willChange: reducedMotion.current ? 'auto' : 'transform',
        }}
      >
        {grassTufts.map((g) => (
          <div
            key={`grass-${g.id}`}
            className="absolute bottom-0"
            style={{
              left: `${g.left}px`,
              width: '3px',
              height: `${g.height}px`,
              backgroundColor: g.color,
            }}
          />
        ))}
      </div>
    </div>
  )
}

function VillageHouse({ index, x, type }: { index: number; x: number; type: number }) {
  const types = [
    { wallColor: '#BC9862', roofColor: '#8B4513', width: 60, height: 50 },
    { wallColor: '#D4C4A0', roofColor: '#6B4F12', width: 72, height: 56 },
    { wallColor: '#A08050', roofColor: '#5A3A0A', width: 55, height: 45 },
    { wallColor: '#E8D8B8', roofColor: '#7F5020', width: 68, height: 52 },
  ]
  const t = types[type]

  return (
    <div
      className="absolute bottom-[16px]"
      style={{ left: `${x}px` }}
    >
      {/* Chimney */}
      {index % 3 === 0 && (
        <div
          className="absolute"
          style={{
            top: '-10px',
            right: '10px',
            width: '8px',
            height: '14px',
            backgroundColor: '#7F7F7F',
            border: '1px solid #5A5A5A',
          }}
        />
      )}
      {/* Roof */}
      <div
        style={{
          width: `${t.width + 12}px`,
          height: '18px',
          backgroundColor: t.roofColor,
          marginLeft: '-6px',
          clipPath: 'polygon(0% 100%, 8% 0%, 92% 0%, 100% 100%)',
          backgroundImage: `repeating-linear-gradient(90deg, transparent, transparent 6px, rgba(0,0,0,0.12) 6px, rgba(0,0,0,0.12) 7px)`,
        }}
      />
      {/* Walls */}
      <div
        className="relative"
        style={{
          width: `${t.width}px`,
          height: `${t.height}px`,
          backgroundColor: t.wallColor,
          backgroundImage: `
            repeating-linear-gradient(0deg, transparent, transparent 9px, rgba(0,0,0,0.06) 9px, rgba(0,0,0,0.06) 10px),
            repeating-linear-gradient(90deg, transparent, transparent 9px, rgba(0,0,0,0.06) 9px, rgba(0,0,0,0.06) 10px)
          `,
          border: '2px solid rgba(0,0,0,0.15)',
        }}
      >
        {/* Door */}
        <div
          className="absolute bottom-0"
          style={{
            left: `${t.width / 2 - 7}px`,
            width: '14px',
            height: '22px',
            backgroundColor: '#4A3520',
            border: '1px solid #2A1A10',
          }}
        >
          <div className="absolute top-[11px] right-[2px] w-[2px] h-[2px] bg-[#FCDB05] rounded-none" />
        </div>
        {/* Window left */}
        <div
          className="absolute"
          style={{
            top: '8px',
            left: '6px',
            width: '14px',
            height: '14px',
            backgroundColor: '#7BA4D4',
            border: '2px solid #4A3520',
          }}
        >
          <div className="absolute top-[5px] left-0 right-0 h-[1px] bg-[#4A3520]" />
          <div className="absolute top-0 bottom-0 left-[5px] w-[1px] bg-[#4A3520]" />
        </div>
        {/* Window right */}
        <div
          className="absolute"
          style={{
            top: '8px',
            right: '6px',
            width: '14px',
            height: '14px',
            backgroundColor: '#7BA4D4',
            border: '2px solid #4A3520',
          }}
        >
          <div className="absolute top-[5px] left-0 right-0 h-[1px] bg-[#4A3520]" />
          <div className="absolute top-0 bottom-0 left-[5px] w-[1px] bg-[#4A3520]" />
        </div>
        {/* Flower box */}
        {index % 2 === 0 && (
          <div
            className="absolute"
            style={{
              bottom: '24px',
              left: '6px',
              width: '14px',
              height: '4px',
              backgroundColor: '#6B4F12',
            }}
          >
            <div className="absolute -top-3 left-1 w-[3px] h-[4px] bg-[#B02E26]" />
            <div className="absolute -top-2 left-[6px] w-[3px] h-[3px] bg-[#FCDB05]" />
          </div>
        )}
      </div>
    </div>
  )
}

function VillageTree({ index, x, height }: { index: number; x: number; height: number }) {
  return (
    <div
      className="absolute bottom-[16px]"
      style={{ left: `${x}px` }}
    >
      {/* Leaves - layered */}
      <div
        style={{
          width: '32px',
          height: `${height}px`,
          backgroundColor: '#2D6B1E',
          marginLeft: '-4px',
          backgroundImage: `
            repeating-linear-gradient(0deg, transparent, transparent 5px, rgba(0,0,0,0.08) 5px, rgba(0,0,0,0.08) 6px),
            repeating-linear-gradient(90deg, transparent, transparent 5px, rgba(0,0,0,0.08) 5px, rgba(0,0,0,0.08) 6px)
          `,
          clipPath: 'polygon(15% 100%, 0% 35%, 25% 0%, 75% 0%, 100% 35%, 85% 100%)',
        }}
      />
      {/* Trunk */}
      <div
        style={{
          width: '8px',
          height: '22px',
          backgroundColor: '#6B4F12',
          marginLeft: '8px',
          backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 4px, rgba(0,0,0,0.12) 4px, rgba(0,0,0,0.12) 5px)',
        }}
      />
    </div>
  )
}

function LampPost({ index, x }: { index: number; x: number }) {
  return (
    <div
      className="absolute bottom-[16px]"
      style={{ left: `${x}px` }}
    >
      {/* Light glow */}
      <div
        className="absolute -top-1 left-[-4px]"
        style={{
          width: '16px',
          height: '16px',
          backgroundColor: 'rgba(252, 219, 5, 0.15)',
          borderRadius: '50%',
        }}
      />
      {/* Light */}
      <div
        style={{
          width: '8px',
          height: '8px',
          backgroundColor: '#FCDB05',
          boxShadow: '0 0 6px rgba(252, 219, 5, 0.8)',
          border: '1px solid #C4A804',
          marginLeft: '0px',
        }}
      />
      {/* Post */}
      <div
        style={{
          width: '3px',
          height: '42px',
          backgroundColor: '#5A5A5A',
          marginLeft: '2px',
          border: '1px solid #3C3C3C',
        }}
      />
    </div>
  )
}

function CropField({ index, x }: { index: number; x: number }) {
  return (
    <div
      className="absolute bottom-[16px]"
      style={{ left: `${x}px` }}
    >
      {/* Soil */}
      <div
        style={{
          width: '80px',
          height: '8px',
          backgroundColor: '#5A3A0A',
          border: '1px solid #3A2A06',
        }}
      />
      {/* Crops */}
      <div className="flex gap-1 absolute -top-3 left-1">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            style={{
              width: '3px',
              height: `${8 + (i % 3) * 4}px`,
              backgroundColor: i % 2 === 0 ? '#4A7A2E' : '#5D8C3E',
            }}
          />
        ))}
      </div>
    </div>
  )
}

function Fence({ index, x }: { index: number; x: number }) {
  return (
    <div
      className="absolute bottom-[16px] flex items-end"
      style={{ left: `${x}px` }}
    >
      {[...Array(5)].map((_, i) => (
        <div key={i} className="flex items-end">
          {/* Post */}
          <div
            style={{
              width: '4px',
              height: '16px',
              backgroundColor: '#BC9862',
              border: '1px solid #8B6914',
            }}
          />
          {/* Rail */}
          {i < 4 && (
            <div
              style={{
                width: '20px',
                height: '3px',
                backgroundColor: '#BC9862',
                marginBottom: '8px',
                border: '1px solid #8B6914',
              }}
            />
          )}
        </div>
      ))}
    </div>
  )
}

function VillageWell({ x }: { x: number }) {
  return (
    <div
      className="absolute bottom-[16px]"
      style={{ left: `${x}px` }}
    >
      {/* Roof */}
      <div
        style={{
          width: '40px',
          height: '12px',
          backgroundColor: '#8B4513',
          marginLeft: '-5px',
          clipPath: 'polygon(0% 100%, 50% 0%, 100% 100%)',
        }}
      />
      {/* Posts */}
      <div className="flex justify-between" style={{ width: '30px' }}>
        <div style={{ width: '3px', height: '22px', backgroundColor: '#6B4F12' }} />
        <div style={{ width: '3px', height: '22px', backgroundColor: '#6B4F12' }} />
      </div>
      {/* Base */}
      <div
        style={{
          width: '30px',
          height: '16px',
          backgroundColor: '#7F7F7F',
          border: '1px solid #5A5A5A',
          backgroundImage: 'repeating-linear-gradient(90deg, transparent, transparent 5px, rgba(0,0,0,0.1) 5px, rgba(0,0,0,0.1) 6px)',
        }}
      >
        {/* Water */}
        <div className="absolute bottom-[2px] left-[3px] right-[3px] h-[6px] bg-[#3F76E4] opacity-60" />
      </div>
    </div>
  )
}
