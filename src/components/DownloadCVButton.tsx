import { useState } from 'react'
import { downloadCV } from '../utils/generateCV'

type DownloadState = 'idle' | 'working' | 'done' | 'error'

interface DownloadCVButtonProps {
  /** Extra classes (spacing, responsive sizing) merged into the base mc-btn. */
  className?: string
  /** Button label for the idle state. */
  label?: string
}

/**
 * "Download CV" button with loading / success / failure feedback.
 * The PDF is generated on demand (jsPDF is lazy-loaded), so without this
 * a failed import would silently do nothing.
 */
export default function DownloadCVButton({
  className = '',
  label = '📄 Download CV',
}: DownloadCVButtonProps) {
  const [state, setState] = useState<DownloadState>('idle')

  const handleClick = async () => {
    if (state === 'working') return
    setState('working')
    try {
      await downloadCV()
      setState('done')
      setTimeout(() => setState('idle'), 2500)
    } catch (err) {
      console.error('Failed to generate CV:', err)
      setState('error')
      setTimeout(() => setState('idle'), 3500)
    }
  }

  const text =
    state === 'working'
      ? '⏳ Crafting PDF…'
      : state === 'done'
        ? '✅ CV Saved!'
        : state === 'error'
          ? '⚠️ Failed – Retry'
          : label

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={state === 'working'}
      aria-live="polite"
      className={`mc-btn bg-[#4A7A2E] hover:bg-[#5D8C3E] disabled:opacity-70 disabled:cursor-wait ${className}`}
    >
      {text}
    </button>
  )
}
