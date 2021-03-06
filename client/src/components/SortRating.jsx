import { useState } from 'react';
import styles from '../css_modules/SortRating.module.css';

export default function SortRating({ onRating, ratings }) {
  let [btnAZ, setBtnAZ] = useState(ratings === 'ASC' || 0);
  let [btnZA, setBtnZA] = useState(ratings === 'DESC' || 0);

  function onChangeHandler(e) {
    if (e.target.value === 'ASC') {
      if (!btnAZ) {
        onRating(e.target.value);
        setBtnAZ(1);
        setBtnZA(0);
      } else {
        onRating('');
        setBtnAZ(0);
      }
    } else if (e.target.value === 'DESC') {
      if (!btnZA || btnAZ) {
        onRating(e.target.value);
        setBtnZA(1);
        setBtnAZ(0);
      } else {
        onRating('');
        setBtnZA(0);
      }
    }
  }

  return (
    <div className={`${styles.container}`}>
      <button
        value='ASC'
        onClick={onChangeHandler}
        className={`${
          btnAZ && ratings ? styles.btn_rate_active : styles.btn_rate
        }`}>
        Rating ▲
      </button>
      <button
        value='DESC'
        onClick={onChangeHandler}
        className={`${
          btnZA && ratings ? styles.btn_rate_active : styles.btn_rate
        }`}>
        Rating ▼
      </button>
    </div>
  );
}
