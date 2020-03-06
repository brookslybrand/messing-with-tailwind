// taken and modifiied from https://dev.to/rohanfaiyazkhan/recreating-the-material-design-ripple-effect-in-react-54p
import React, { useState, useLayoutEffect } from 'react'
import { number, string, bool } from 'prop-types'

// color can be any valid bg class
const Ripple = ({ duration = 400, color = 'bg-gray-700', center = true }) => {
  const [ripples, addRipple] = useRipples(duration, center)

  return (
    <div className="absolute inset-0" onMouseDown={addRipple}>
      {ripples.map(({ size, x, y }, index) => {
        return (
          <span
            key={index}
            className={`${color} ripple`}
            style={{
              width: size,
              height: size,
              top: y,
              left: x,
              animationDuration: `${duration}ms`
            }}
          />
        )
      })}
    </div>
  )
}

const useRipples = (duration, center) => {
  const [ripples, setRipples] = useState([])

  // this function resets the array of ripple spans (duration * 2)ms after the last 1 was added
  useLayoutEffect(() => {
    // skip if there is no rippleCount
    if (ripples.length > 0) {
      const timeoutID = setTimeout(() => setRipples([]), duration * 2)
      return () => clearTimeout(timeoutID)
    }
  }, [ripples.length, duration])

  const addRipple = event => {
    const rippleContainer = event.currentTarget.getBoundingClientRect()
    const size = Math.max(rippleContainer.width, rippleContainer.height)
    const x = center ? 0 : event.pageX - rippleContainer.x - size / 2
    const y = center ? 0 : event.pageY - rippleContainer.y - size / 2
    const newRipple = { size, x, y }
    setRipples(prevRipples => prevRipples.concat(newRipple))
  }

  return [ripples, addRipple]
}

Ripple.propTypes = {
  duration: number,
  color: string,
  center: bool
}

export default Ripple
