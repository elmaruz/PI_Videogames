import React from 'react';
import { Link } from 'react-router-dom';
import styles from '../css_modules/Landing.module.css';

export default function Landing() {
  return (
    <div className={`${styles.landing}`}>
      <div className={`${styles.link}`}>
        <Link to='/videogames' className={`${styles.linklink}`}>
          <button className={`${styles.innerLink} ${styles.linkbox}`}>
            INSERT COIN
          </button>
        </Link>
      </div>
    </div>
  );
}
