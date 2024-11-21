import React from 'react'

import { ReactComponent as Logo } from '../assets/nirlipta-logo.svg';
import styles from '../Styles/HeaderMobile.module.css'

const HeaderMobile = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false)

  return (
    <>
      <button className={`${styles.btnMenu} ${isMenuOpen ? styles.active : ''}`} onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label='menu mobile'>
        <div></div>
        <div></div>
      </button>
      {
        isMenuOpen &&
        <nav className={styles.navItens}>
          <a href='/'>Home</a>
          <a href='/'>Courses</a>
          <a href='/'>Instructors</a>
          <a href='/'>Retreats</a>
          <a href='/'>About Contact</a>
          <a href='/'>Contato</a>
          <a href='/'>Login</a>
        </nav>
      }
        <a href='/' className={styles.logo}>
            <Logo />
        </a>
      <a href='/' className={`btnBlack ${styles.btnLogin}`}>Login</a>
    </>
  )
}

export default HeaderMobile