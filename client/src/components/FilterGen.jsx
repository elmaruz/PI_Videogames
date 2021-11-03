import { useSelector } from "react-redux";

export default function FilterGen({ onFilterGen }) {
  let genres = useSelector((state) => state.genres);

  function onChangeHandler(e) {
    onFilterGen(e.target.value);
  }

  return (
    <select name="select" onChange={onChangeHandler}>
      <option value="">---Select Genre---</option>
      {genres.map((elem, index) => (
        <option key={elem + index} value={elem.name}>
          {elem.name}{" "}
        </option>
      ))}
    </select>
  );
}
