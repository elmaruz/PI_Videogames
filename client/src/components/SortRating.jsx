import { useState } from "react";

export default function SortRating({ onRating }) {
  function onChangeHandler(e) {
    onRating(e.target.value);
  }

  return (
    <select name="select" onChange={onChangeHandler}>
      <option value="">---Sort By Rating---</option>
      <option value="ASC">Lo ti Hi</option>
      <option value="DESC">Hi to Lo</option>
    </select>
  );
}
