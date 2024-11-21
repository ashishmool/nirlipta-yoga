import React from 'react'
import useSlide from '../CustomHooks/useSlide'
import styles from '../Styles/Plans.module.css'
import Plan from './Plan'
import useMedia from '../CustomHooks/useMedia'

const plans = [
  {
    price: 159.00,
    name: 'Yoga'
  },
  {
    price: 319.00,
    name: 'Complete'
  },
  {
    price: 129.00,
    name: 'Pilates'
  },
  {
    price: 109.00,
    name: 'Meditation'
  }
];

const Plans = () => {

  const [itemsAtATime, setItemsAtATime] = React.useState(3)
  const { slideNext, slidePrev, positionWidth, containerSlideRef, setSlidePosition } = useSlide(itemsAtATime)
  const matchMedium = useMedia('(max-width: 800px)').matches
  const matchSmall = useMedia('(max-width: 550px)').matches

  React.useEffect(() => {
    function changeItemsAtATime() {
      if (matchSmall) {
        setItemsAtATime(1)
      } else if (matchMedium) {
        setItemsAtATime(2)
      } else {
        setItemsAtATime(3)
      }
    }
    setSlidePosition(0)
    changeItemsAtATime()
    window.addEventListener('resize', changeItemsAtATime)
    return () => {
      window.removeEventListener('resize', changeItemsAtATime)
    }

  }, [matchMedium, matchSmall, setSlidePosition])

  return (
      <section className={`container ${styles.plans}`}>
        <header className={styles.header}>
          <h2>Our Offers & Services</h2>
          <div className={styles.btns}>
            <button onClick={slidePrev} aria-label='previous plan'>Previous</button>
            <button onClick={slideNext} aria-label='next plan'>Next</button>
          </div>
        </header>
        <div className={styles.containerPlans}>
          <ul className={styles.listPlans} style={{ left: `${positionWidth}px` }} ref={containerSlideRef}>
            {plans.map(plan =>
                <Plan plan={plan.name} price={plan.price} key={plan.name} />
            )}
          </ul>
        </div>
        <a href='/' className={`btnBlack ${styles.linkStart}`}>Start your 7-day free trial</a>
      </section>
  )
}

export default Plans
