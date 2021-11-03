import React, { useState } from "react";
import styles from "../css_modules/Searchbar.module.css";

export default function Searchbar({ onSearch, onSort }) {
  let [input, setInput] = useState("");

  function changeHandler(e) {
    if (e.target.value.length > 0) {
      setInput(e.target.value);
    } else {
      setInput("");
      onSearch("");
      onSort("");
    }
  }

  function submitHandler(e) {
    e.preventDefault();
    onSearch(input);
  }

  return (
    <div>
      <form onSubmit={submitHandler}>
        <input
          className={`${styles.searchbar}`}
          type="text"
          value={input}
          onChange={changeHandler}
        />
        <button className={`${styles.search_btn}`} type="submit">
          Search
        </button>
      </form>
    </div>
  );
}
