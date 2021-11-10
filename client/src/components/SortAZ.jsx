import { useState } from "react";
import styles from "../css_modules/SortAZ.module.css";

export default function SortAZ({ onSort, sort }) {
  let [btnAZ, setBtnAZ] = useState(0);
  let [btnZA, setBtnZA] = useState(0);

  function onChangeHandler(e) {
    // onSort(e.target.value);
    if (e.target.value === "ASC") {
      if (!btnAZ) {
        onSort(e.target.value);
        setBtnAZ(1);
        setBtnZA(0);
      } else {
        onSort("");
        setBtnAZ(0);
      }
    } else if (e.target.value === "DESC") {
      if (!btnZA || btnAZ) {
        onSort(e.target.value);
        setBtnZA(1);
        setBtnAZ(0);
      } else {
        onSort("");
        setBtnZA(0);
      }
    }
  }

  return (
    //   <select name="select" onChange={onChangeHandler}>
    //     <option value="">---Sort By Name---</option>
    //     <option value="ASC">A-Z</option>
    //     <option value="DESC">Z-A</option>
    //   </select>
    // );
    <div className={`${styles.container}`}>
      <button
        value="ASC"
        onClick={onChangeHandler}
        className={`${btnAZ && sort ? styles.btn_active : styles.btn}`}
      >
        A-Z
      </button>
      <button
        value="DESC"
        onClick={onChangeHandler}
        className={`${btnZA && sort ? styles.btn_active : styles.btn}`}
      >
        Z-A
      </button>
    </div>
  );
}
