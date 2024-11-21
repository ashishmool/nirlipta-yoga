import React from 'react'
import styles from '../Styles/HeaderDefault.module.css'
import { ReactComponent as Logo } from '../assets/nirlipta-logo.svg';

const HeaderDefault = () => {
  return (
    <>
      <div className={styles.col1Nav}>
        <a href='/'>Home</a>
        <a href='/courses'>Courses</a>
        <a href='/'>Instructors</a>
        <a href='/'>Events</a>
      </div>
        <a href='/' className={styles.logo}>
            <Logo />
        </a>
      <div className={styles.col2Nav}>
        <a href='/'>About</a>
        <a href='/'>Contact</a>
        <a href='/' className='btnBlack'>Login</a>
      </div>
    </>
  )
}

export default HeaderDefault