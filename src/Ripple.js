// taken from https://dev.to/rohanfaiyazkhan/recreating-the-material-design-ripple-effect-in-react-54p

import { useState, useLayoutEffect } from 'react'
/**@jsx jsx */
import { jsx, css } from '@emotion/core'
import PropTypes from 'prop-types'

const rippleContainerCss = (color, duration) => css`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;

  span {
    transform: scale(0);
    border-radius: 100%;
    position: absolute;
    opacity: 0.75;
    background-color: ${color};
    animation-name: ripple;
    animation-duration: ${duration}ms;
  }

  @keyframes ripple {
    to {
      opacity: 0;
      transform: scale(2);
    }
  }
`

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

const Ripple = ({ duration = 850, color = '#fff' }) => {
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
    <div css={rippleContainerCss(color, duration)} onMouseDown={addRipple}>
      {rippleArray.length > 0 &&
        rippleArray.map((ripple, index) => {
          return (
            <span
              key={'span' + index}
              style={{
                top: ripple.y,
                left: ripple.x,
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
