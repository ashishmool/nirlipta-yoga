import styles from '../Styles/Quote.module.css'
import React from 'react'
import foto from '../assets/pc.jpg'

const Quote = () => {
    return (
        <section className={`container ${styles.quoteContainer}`}>
            <figure className={styles.citation}>
                <blockquote>
                    The calmness of the mind is the key to a successful life. Inner peace enables clearer focus and better decision-making.
                </blockquote>
            </figure>
            <div className={styles.img}>
                <img src={foto} alt='Woman working on a laptop'></img>
            </div>
        </section>
    )
}

export default Quote
