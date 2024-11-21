import React from 'react'
import styles from '../Styles/Categories.module.css'

const categories = [
  {
    title: 'Yoga Retreats',
    description: 'Escape the everyday and rejuvenate your mind, body, and soul in serene surroundings.',
    link: '/'
  },
  {
    title: 'Yoga Sessions',
    description: 'Tailored yoga classes designed to enhance your strength, flexibility, and peace of mind.',
    link: '/'
  },
  {
    title: 'Personal Guidance',
    description: 'One-on-one sessions to focus on your individual needs and deepen your yoga practice.',
    link: '/'
  },


]

const Categories = () => {
  return (
    <section className={`container ${styles.categories}`}>
      <div className={styles.texts}>
        <h2>Our Community</h2>
        <a href='/' className='btnBlack'>Know More...</a>
      </div>
      <ul className={styles.ul}>
        {categories.map(category =>
          <li key={category.title}>
            <a href={category.link}>
              <h3>{category.title}</h3>
              <p>{category.description}</p>
              <span className={styles.points}>...</span>
            </a>
          </li>
        )}
      </ul>
    </section>
  )
}

export default Categories