import { useEffect, useRef, useState } from 'react'
import cvPdf from '../assets/PROMOSON_POUDEL_MASTER_ALL.pdf'

type DownloadState = 'idle' | 'done'

interface DownloadCVButtonProps {
  /** Extra classes (spacing, responsive sizing) merged into the base mc-btn. */
  className?: string
  /** Button label for the idle state. */
  label?: string
}

/** Name the browser saves the file as (the source asset name is fingerprinted by Vite). */
const CV_FILENAME = 'Promoson_Poudel_CV.pdf'

/**
 * "Download CV" link that serves the pre-built PDF résumé from `src/assets`.
 * Vite fingerprints the asset and hands us its final URL at build time, so
 * the `download` attribute gives the file a stable, human-readable name.
 */
export default function DownloadCVButton({
  className = '',
  label = '📄 Download CV',
}: DownloadCVButtonProps) {
  const [state, setState] = useState<DownloadState>('idle')
  const resetTimer = useRef<ReturnType<typeof setTimeout>>()

  useEffect(() => () => clearTimeout(resetTimer.current), [])

  const handleClick = () => {
    setState('done')
    clearTimeout(resetTimer.current)
    resetTimer.current = setTimeout(() => setState('idle'), 2500)
  }

  const text = state === 'done' ? '✅ CV Saved!' : label

  return (
    <a
      href={cvPdf}
      download={CV_FILENAME}
      onClick={handleClick}
      aria-live="polite"
      className={`mc-btn bg-[#4A7A2E] hover:bg-[#5D8C3E] ${className}`}
    >
      {text}
    </a>
  )
}
