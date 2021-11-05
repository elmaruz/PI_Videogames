import { useState } from "react";
import styles from "../css_modules/DbDropdown.module.css";

export default function FilterDb({ onDb }) {
  let [value, setValue] = useState("");
  function onChangeHandler(e) {
    onDb(e.target.value);
    setValue(e.target.value);
  }

  return (
    // <select
    //   name="select"
    //   onChange={onChangeHandler}
    //   className={`${styles.select}`}
    // >
    //   <option value="" className={`${styles.item}`}>
    //     All
    //   </option>
    //   <option value="db" className={`${styles.item}`}>
    //     My DB
    //   </option>
    //   <option value="rawg" className={`${styles.item}`}>
    //     rawg API
    //   </option>
    // </select>
    <div className={`${styles.drop}`}>
      <button value="db" className={`${styles.menu}`}>
        {value ? value : "Select DB"}
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
