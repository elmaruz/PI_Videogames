import { useSelector } from 'react-redux';
import { useState } from 'react';
import styles from '../css_modules/GenDropdown.module.css';

export default function FilterGen({ onFilterGen, genre }) {
  let [value, setValue] = useState('');
  let genres = useSelector((state) => state.genres);

  function onChangeHandler(e) {
    onFilterGen(e.target.value);
    setValue(e.target.value);
  }

  return (
    <div className={`${styles.drop}`}>
      <button
        className={`${value && genre ? styles.menu_active : styles.menu}`}>
        {value && genre ? value : 'Select Genre'}
      </button>
      <div className={`${styles.select}`}>
        <button className={`${styles.btn}`} value='' onClick={onChangeHandler}>
          All Genres
        </button>
        {genres &&
          genres.map((elem, index) => (
            <button
              className={`${styles.btn}`}
              key={elem + index}
              value={elem.name}
              onClick={onChangeHandler}>
              {elem.name}
            </button>
          ))}
      </div>
    </div>
  );
}
