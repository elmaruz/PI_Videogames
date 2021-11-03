export default function SortAZ({ onSort }) {
  function onChangeHandler(e) {
    onSort(e.target.value);
  }

  return (
    <select name="select" onChange={onChangeHandler}>
      <option value="">---Sort By Name---</option>
      <option value="ASC">A-Z</option>
      <option value="DESC">Z-A</option>
    </select>
  );
}
