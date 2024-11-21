import React from 'react'
import img from '../assets/carac.jpg'
import styles from '../Styles/Retreats.module.css'

const Retreats = () => {
  return (
      <section className={`container ${styles.services}`}>
          <div className={styles.img}>
              <img src={img} alt='woman stretching'></img>
          </div>
          <ul className={styles.ul}>
              <li><p>Recorded classes & live classes with specialized professionals</p></li>
              <li><p>Personalized training to best meet your needs</p></li>
              <li><p>Over 1000 recorded classes in various styles</p></li>
          </ul>
      </section>

  )
}

export default Retreats