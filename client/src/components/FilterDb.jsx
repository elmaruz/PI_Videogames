export default function FilterDb({ onDb }) {
  function onChangeHandler(e) {
    onDb(e.target.value);
  }

  return (
    <select name="select" onChange={onChangeHandler}>
      <option value="">---Select DB---</option>
      <option value="db">My DB</option>
      <option value="rawg">rawg API</option>
    </select>
  );
}
