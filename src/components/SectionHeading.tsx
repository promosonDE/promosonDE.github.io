import { useScrollAnimation } from '../hooks/useScrollAnimation'

interface SectionHeadingProps {
  /** Pixel-font title, e.g. "⚔️ Quest Log". */
  title: string
  /** Human-readable explanation shown under the title. */
  subtitle?: string
  /** Optional smaller line above the title. */
  eyebrow?: string
}

/**
 * Shared Minecraft-styled section header. Keeps every section visually
 * consistent and wires the scroll-in animation in one place.
 */
export default function SectionHeading({ title, subtitle, eyebrow }: SectionHeadingProps) {
  const anim = useScrollAnimation()

  return (
    <div ref={anim.ref} className="text-center mb-12 scroll-animate-up">
      {eyebrow && (
        <p className="pixel-font text-[8px] sm:text-[10px] text-[#4AEDD9] mb-3 tracking-wider">
          {eyebrow}
        </p>
      )}
      <h2 className="pixel-font text-xl sm:text-2xl text-[#FCDB05] mb-4 drop-shadow-[2px_2px_0px_#3C3C3C]">
        {title}
      </h2>
      {subtitle && <p className="text-gray-400 text-lg max-w-2xl mx-auto">{subtitle}</p>}
      <div className="w-32 h-1 bg-[#FCDB05] mx-auto mt-4" />
    </div>
  )
}
