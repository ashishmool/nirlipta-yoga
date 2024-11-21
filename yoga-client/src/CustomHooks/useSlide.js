import React from 'react'

const useSlide = (itemsLength) => {

  const [positionWidth, setPositionWidth] = React.useState(0)
  const [slidePosition, setSlidePosition] = React.useState(0)
  const containerSlideRef = React.useRef()

  React.useEffect(() => {
    const { width } = containerSlideRef.current.getBoundingClientRect()
    setPositionWidth(-((width / itemsLength) * slidePosition))
  }, [slidePosition, itemsLength])

  const slideNext = React.useCallback(() => {
    if (slidePosition < containerSlideRef.current.children.length - itemsLength) {
      setSlidePosition(slidePosition + 1)
    }
  }, [slidePosition, itemsLength])


  const slidePrev = React.useCallback(() => {
    if (slidePosition !== 0) {
      setSlidePosition(slidePosition - 1)
    }

  }, [slidePosition])

  return { slideNext, slidePrev, positionWidth, containerSlideRef, setSlidePosition }
}

export default useSlide