import s from '../css_modules/Menu.module.css';
import SortAZ from './SortAZ';
import SortRating from './SortRating';
import FilterDbMobile from './FilterDbMobile';
import FilterGenMobile from './FilterGenMobile';

export default function Menu({
  sort,
  onSort,
  ratings,
  onRating,
  db,
  onDb,
  onFilterGen,
  genre,
}) {
  return (
    <div className={s.menu}>
      <div className={s.section}>
        <label className={s.lab}>DB</label>
        <div>
          <FilterDbMobile db={db} onDb={onDb} />
        </div>
      </div>
      <div className={s.section_gen}>
        <label>Genres</label>
        <div className={s.sub_gen}>
          <FilterGenMobile genre={genre} onFilterGen={onFilterGen} />
        </div>
      </div>
      <div className={s.section_sort}>
        <label className={s.lab}>Sort By Name</label>
        <div>
          <SortAZ sort={sort} onSort={onSort} />
        </div>
      </div>
      <div className={s.section_sort}>
        <label className={s.lab}>Sort By Rating</label>
        <div>
          <SortRating ratings={ratings} onRating={onRating} />
        </div>
      </div>
    </div>
  );
}
