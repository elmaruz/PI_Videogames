import styles from '../css_modules/DbDropdownMob.module.css';
import { useState, useEffect } from 'react';

export default function FilterDbMobile({ onDb, db }) {
  let [value, setValue] = useState(db);

  useEffect(() => {
    onDb(db);
    setValue(db);
  }, [db, onDb]);

  function onChangeHandler(e) {
    setValue(e.target.value);
    onDb(e.target.value);
  }

  return (
    <div className={`${styles.select}`}>
      <button className={`${styles.btn}`} value='' onClick={onChangeHandler}>
        All
      </button>
      <button
        className={`${value === 'DB' ? styles.btn_active : styles.btn}`}
        value='DB'
        onClick={onChangeHandler}>
        DB
      </button>
      <button
        className={`${value === 'Rawg' ? styles.btn_active : styles.btn}`}
        value='Rawg'
        onClick={onChangeHandler}>
        Rawg
      </button>
    </div>
  );
}
