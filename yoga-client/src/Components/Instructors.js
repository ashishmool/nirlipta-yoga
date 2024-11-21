import React from 'react'
import useMedia from '../CustomHooks/useMedia'
import useSlide from '../CustomHooks/useSlide'
import styles from '../Styles/Instrutors.module.css'

const instructors = [
    {
    name: 'Nivedita Pradhan',
    description: 'Yogi',
    img: 'inst2.jpg'
  },
  {
    name: 'Yanish Singh',
    description: 'Yoga Trainer',
    img: 'inst4.jpg'
  },
  {
    name: 'Heather',
    description: 'Yoga Trainer',
    img: 'inst3.jpg'
  },
  {
    name: 'Ashish Mool',
    description: 'Trainer',
    img: 'inst1.jpg'
  },

]

const Instructors = () => {

  const [itemsAtATime, setItemsAtATime] = React.useState(4)
  const { slideNext, slidePrev, positionWidth, containerSlideRef, setSlidePosition } = useSlide(itemsAtATime)
  const matchMedium = useMedia('(max-width: 800px)').matches
  const matchSmall = useMedia('(max-width: 550px)').matches
  const matchExtraSmall = useMedia('(max-width: 390px)').matches

  React.useEffect(() => {
    function changeItensAtATime() {
      if (matchExtraSmall) {
        setItemsAtATime(1)
      } else if (matchSmall) {
        setItemsAtATime(2)
      } else if (matchMedium) {
        setItemsAtATime(3)
      } else {
        setItemsAtATime(4)
      }
    }
    setSlidePosition(0)
    changeItensAtATime()
    window.addEventListener('resize', changeItensAtATime)
    return () => {
      window.removeEventListener('resize', changeItensAtATime)
    }

  }, [matchMedium, matchSmall, setSlidePosition, matchExtraSmall])

  return (
    <section className={`container ${styles.instructors}`}>
      <h2>Our Instructors</h2>
      <div className={styles.btns}>
        <button onClick={slidePrev} aria-label='instrutor previous'> Previous </button>
        <button onClick={slideNext} aria-label='next instrutor'>Next</button>
      </div>
      <div className={styles.containerInstructors}>
        <ul className={styles.listInstructors} ref={containerSlideRef} style={{ left: `${positionWidth}px` }} >
          {instructors.map(instrutor => (
            <li key={instrutor.name}>
              <a href='/'>
                <img src={require(`../assets/${instrutor.img}`)} alt={instrutor.name} className={styles.img}></img>
                <p className={styles.name}>{instrutor.name}</p>
                <p>{instrutor.description}</p>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

export default Instructors