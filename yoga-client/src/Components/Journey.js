import React from 'react'
import styles from '../Styles/Journey.module.css'
import fotoJourney from '../assets/journey.jpg'

const cards = [
  {
    title: 'Specialized Instructors',
    quantity: 3
  },
  {
    title: 'Courses',
    quantity: 12
  },
  {
    title: 'Enrolled Students',
    quantity: 32
  },
]
const Journey = () => {

  return (
    <section className={`container ${styles.journey}`}>
      <div className={styles.content}>
        <div className={styles.texts}>
          <h1 className={styles.title}>Start Your Yoga Journey</h1>
          <p>Start your journey to balance, wellness, and inner peace with Nirlipta Yoga. Whether you're a beginner or experienced, we offer personalized classes, expert guidance, and a supportive community. Discover the benefits of yoga for your mind, body, and spirit. Take the first step toward a healthier, happier you. ✨🧘‍♀️️</p>
          <a href='/' className={`btnBlack`}>Start Your Journey, <strong>Now!</strong></a>
        </div>
        <ul className={styles.listNumber}>
          {cards.map(card =>
            <li key={card.title}>
              <p className={styles.Number}>{card.quantity}</p>
              <p>{card.title}</p>
            </li>
          )}
        </ul>
      </div>
      <div className={styles.imgContainer}>
        <div className={styles.address}>
          <span><strong>Lessons</strong></span>
          <span>by Nivedita Pradhan</span>
        </div>
        <div className={styles.img}>
          <img src={fotoJourney} alt='Nirlipta' width='19rem' height='27rem'></img>
        </div>
      </div>
    </section>
  )
}

export default Journey