import styles from '../css_modules/GenDropdownMob.module.css';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

export default function FilterGenMobile({ onFilterGen, genre }) {
  let [value, setValue] = useState(genre);
  let genres = useSelector((state) => state.genres);

  useEffect(() => {
    onFilterGen(genre);
    setValue(genre);
  }, [genre, onFilterGen]);

  function onChangeHandler(e) {
    onFilterGen(e.target.value);
    setValue(e.target.value);
  }

  return (
    <div className={`${styles.select}`}>
      <button className={`${styles.btn}`} value='' onClick={onChangeHandler}>
        All Genres
      </button>
      {genres &&
        genres.map((elem, index) => (
          <button
            className={`${
              value === elem.name ? styles.btn_active : styles.btn
            }`}
            key={elem + index}
            value={elem.name}
            onClick={onChangeHandler}>
            {elem.name}
          </button>
        ))}
    </div>
  );
}
