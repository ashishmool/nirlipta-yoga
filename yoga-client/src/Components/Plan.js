import styles from '../Styles/Plan.module.css'
import React from 'react'

const Plan = ({ price, plan }) => {
    return (
        <li className={styles.itemPlan}>
            <h3 className={styles.category}>{plan}</h3>
            <div className={styles.price}>
                <span className={styles.rs}>$</span>
                <span className={styles.quantity}>{price}</span>
                <span className={styles.aomes}>per month</span>
            </div>
            <ul className={styles.list}>
                <li>Access seamless service</li>
                <li>Efficient support available</li>
                <li>Exclusive features included</li>
                <li>Comprehensive analytics and insights</li>
                <li>Optimized performance and experience</li>
                <li>Guaranteed support and satisfaction</li>
            </ul>
            <a href='/' className={`btnBlack ${styles.btnSign}`}>Choose Plan</a>
        </li>
    )
}

export default Plan
