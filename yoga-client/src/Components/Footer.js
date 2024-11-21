import React from 'react'
import styles from '../Styles/Footer.module.css'

const Footer = () => {
  return (
      <footer className={styles.footer}>
        <div className={`container ${styles.containerFooter}`}>
          <div className={styles.menu}>
            <p className={styles.title}>Menu</p>
            <nav>
              <ul>
                <li><a href='/'>Home</a></li>
                <li><a href='/'>Classes</a></li>
                <li><a href='/'>Categories</a></li>
                <li><a href='/'>Instructors</a></li>
                <li><a href='/'>About</a></li>
                <li><a href='/'>User Area</a></li>
                <li><a href='/'>Contact</a></li>
              </ul>
            </nav>
          </div>
          <div>
            <p className={styles.title}>Contact</p>
            <div className={styles.itemsFooter}>
              <span>hello@nirliptah-yoga.com.au</span>
              <span>(12) 3456-7890</span>
            </div>
          </div>
          <div>
            <p className={styles.title}>Address</p>
            <div className={styles.itemsFooter}>
              <p>Ratopul, Kathmandu</p>
              <p>Nepal</p>
              <p>+977 1 4520661 </p>
            </div>
          </div>
          <div className={styles.copy}>
            <span>Copyright © 2024 - All rights reserved</span>
            <span className={styles.links}>
            <a href='/'>Terms and Conditions</a>
            <a href='/'>Privacy Policy</a>
          </span>
          </div>
          <a href='https://github.com/ashishmool/nirlipta-yoga' className={styles.by}>By Ashish Mool</a>
        </div>
      </footer>
  )
}

export default Footer
