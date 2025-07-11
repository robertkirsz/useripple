import React, { CSSProperties, MouseEvent } from 'react'

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

/**
 * A React Hook for adding ripple effect to clickable elements
 * 
 * @param style - Optional CSS properties to override the default ripple styles
 * @returns A tuple containing:
 *   - showRipple: Function to call on click events to trigger the ripple effect
 *   - ripplesArray: Array of JSX elements representing active ripples to render
 * 
 * @example
 * ```tsx
 * function Button() {
 *   const [showRipple, ripples] = useRipple({ background: 'rgba(255, 255, 255, 0.5)' })
 *   
 *   return (
 *     <button onClick={showRipple} style={{ position: 'relative', overflow: 'hidden' }}>
 *       Click me!
 *       {ripples}
 *     </button>
 *   )
 * }
 * ```
 */
declare function useRipple(style?: CSSProperties): UseRippleReturn

export default useRipple