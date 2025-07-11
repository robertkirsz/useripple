import React, { useState, useRef, type CSSProperties, type MouseEvent } from 'react'

const MINIMUM_RIPPLE_SIZE = 100

// Type for individual ripple object
interface RippleItem {
  key: number
  style: CSSProperties
}

// Return type for the useRipple hook
type UseRippleReturn = [
  (event: MouseEvent<HTMLElement>) => void, // showRipple function
  React.ReactElement[] // ripplesArray
]

export default function useRipple(style?: CSSProperties): UseRippleReturn {
  const [ripples, setRipples] = useState<RippleItem[]>([])
  const rippleCounter = useRef(0)

  const showRipple = (event: MouseEvent<HTMLElement>): void => {
    const { left, top } = event.currentTarget.getBoundingClientRect()
    const x = event.clientX - left
    const y = event.clientY - top
    const rippleSize = Math.min(event.currentTarget.clientHeight, event.currentTarget.clientWidth, MINIMUM_RIPPLE_SIZE)

    const newRipple: RippleItem = {
      key: rippleCounter.current++,
      style: {
        display: 'block',
        width: rippleSize,
        height: rippleSize,
        position: 'absolute',
        left: x - rippleSize / 2,
        top: y - rippleSize / 2,
        background: 'currentColor',
        borderRadius: '50%',
        opacity: 0.4,
        pointerEvents: 'none',
        animationName: 'useRippleAnimation',
        animationDuration: '0.7s',
        animationFillMode: 'forwards',
        ...style
      }
    }

    setRipples(state => [...state, newRipple])
  }

  const ripplesArray: React.ReactElement[] = ripples.map((currentRipple: RippleItem) => {
    const handleAnimationEnd = (): void => {
      setRipples(state => state.filter(previousRipple => previousRipple.key !== currentRipple.key))
    }

    return <span key={currentRipple.key} style={currentRipple.style} onAnimationEnd={handleAnimationEnd} />
  })

  return [showRipple, ripplesArray]
}
