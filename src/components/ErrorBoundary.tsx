import { Component, type ReactNode, type ErrorInfo } from 'react'

interface ErrorBoundaryProps {
  children: ReactNode
}

interface ErrorBoundaryState {
  error: Error | null
}

/**
 * Last line of defence: if any section throws during render the whole tree
 * would otherwise unmount and leave a blank page. Instead we show a themed
 * error screen with a reload button (the error is still logged to console).
 */
export default class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state: ErrorBoundaryState = { error: null }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { error }
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('Unhandled render error:', error, info.componentStack ?? '')
  }

  render() {
    if (this.state.error) {
      return (
        <div className="min-h-screen bg-[#1a1a2e] flex items-center justify-center px-4">
          <div className="mc-panel max-w-lg text-center">
            <div className="flex justify-center gap-2 mb-6">
              {['#B02E26', '#FCDB05', '#7F7F7F'].map((color, idx) => (
                <div
                  key={idx}
                  className="w-8 h-8 border-2"
                  style={{ backgroundColor: color, borderColor: `${color}88` }}
                />
              ))}
            </div>

            <p className="pixel-font text-lg sm:text-xl text-[#FCDB05] mb-4 drop-shadow-[2px_2px_0px_#3C3C3C]">
              ⚠ Game Crashed
            </p>

            <p className="text-gray-300 text-sm sm:text-base mb-2">
              Something went wrong while rendering this page
              <span className="text-[#B02E26]"> ({this.state.error.message})</span>.
            </p>
            <p className="text-gray-500 text-xs mb-6">
              Details have been written to the browser console.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
              <button
                type="button"
                onClick={() => window.location.reload()}
                className="mc-btn text-xs"
              >
                🔄 Reload World
              </button>
              <button
                type="button"
                onClick={() => window.location.assign('/')}
                className="mc-btn text-xs"
              >
                🏠 Return Home
              </button>
            </div>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}
