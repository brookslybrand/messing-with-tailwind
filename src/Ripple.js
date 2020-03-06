// taken from https://dev.to/rohanfaiyazkhan/recreating-the-material-design-ripple-effect-in-react-54p

import React, { useState, useLayoutEffect } from 'react'
import PropTypes from 'prop-types'

const useDebouncedRippleCleanUp = (rippleCount, duration, cleanUpFunction) => {
  useLayoutEffect(() => {
    let bounce = null
    if (rippleCount > 0) {
      clearTimeout(bounce)

      bounce = setTimeout(() => {
        cleanUpFunction()
        clearTimeout(bounce)
      }, duration * 4)
    }

    return () => clearTimeout(bounce)
  }, [rippleCount, duration, cleanUpFunction])
}

const Ripple = ({ duration = 850, center = true }) => {
  const [rippleArray, setRippleArray] = useState([])

  useDebouncedRippleCleanUp(rippleArray.length, duration, () => {
    setRippleArray([])
  })

  const addRipple = event => {
    const rippleContainer = event.currentTarget.getBoundingClientRect()
    const size =
      rippleContainer.width > rippleContainer.height
        ? rippleContainer.width
        : rippleContainer.height
    const x = event.pageX - rippleContainer.x - size / 2
    const y = event.pageY - rippleContainer.y - size / 2
    const newRipple = {
      x,
      y,
      size
    }

    setRippleArray([...rippleArray, newRipple])
  }

  return (
    <div className="absolute inset-0" onMouseDown={addRipple}>
      {rippleArray.length > 0 &&
        rippleArray.map((ripple, index) => {
          return (
            <span
              key={index}
              className="bg-gray-700 ripple"
              style={{
                top: center ? 0 : ripple.y,
                left: center ? 0 : ripple.x,
                width: ripple.size,
                height: ripple.size
              }}
            />
          )
        })}
    </div>
  )
}

Ripple.propTypes = {
  duration: PropTypes.number,
  color: PropTypes.string
}

export default Ripple
