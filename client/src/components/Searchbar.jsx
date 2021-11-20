import React, { useState } from "react";
import styles from "../css_modules/Searchbar.module.css";

export default function Searchbar({
  onSearch,
  onSort,
  onFilterGen,
  onRating,
  onDb,
}) {
  let [input, setInput] = useState("");

  function changeHandler(e) {
    if (e.target.value.length > 0) {
      setInput(e.target.value);
    } else {
      setInput("");
      onSearch("");
      onSort("");
      onFilterGen("");
      onRating("");
      onDb("");
    }
  }

  function reset(e) {
    setInput("");
    onSearch("");
    onSort("");
    onFilterGen("");
    onRating("");
    onDb("");
  }

  function submitHandler(e) {
    e.preventDefault();
    onSort("");
    onFilterGen("");
    onRating("");
    onDb("");
    onSearch(input);
  }

  return (
    <div>
      <form className={`${styles.form}`} onSubmit={submitHandler}>
        <input
          className={`${styles.searchbar}`}
          type="text"
          value={input}
          onChange={changeHandler}
        />
        <button className={`${styles.search_btn}`} type="submit"></button>
        <button value="" className={`${styles.del_btn}`} onClick={reset}>
          X
        </button>
      </form>
    </div>
  );
}
