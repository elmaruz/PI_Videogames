import { useState } from "react";
import styles from "../css_modules/DbDropdown.module.css";

export default function FilterDb({ onDb, db }) {
  let [value, setValue] = useState("");
  function onChangeHandler(e) {
    onDb(e.target.value);
    setValue(e.target.value);
  }

  return (
    <div className={`${styles.drop}`}>
      <button
        value="db"
        className={`${value && db ? styles.menu_active : styles.menu}`}
      >
        {value && db ? value : "Select DB"}
      </button>
      <div className={`${styles.select}`}>
        <button className={`${styles.btn}`} value="" onClick={onChangeHandler}>
          All
        </button>
        <button
          className={`${styles.btn}`}
          value="DB"
          onClick={onChangeHandler}
        >
          DB
        </button>
        <button
          className={`${styles.btn}`}
          value="Rawg"
          onClick={onChangeHandler}
        >
          Rawg
        </button>
      </div>
    </div>
  );
}
