import s from '../css_modules/Menu.module.css';
import SortAZ from './SortAZ';
import SortRating from './SortRating';
import FilterDbMobile from './FilterDbMobile';
import FilterGenMobile from './FilterGenMobile';
import { IoIosArrowDropright } from 'react-icons/io';
import { useState } from 'react';

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
  let [press, setPress] = useState({
    db: false,
    genres: false,
    az: false,
    ratings: false,
  });

  const onClickHandler = (e) => {
    setPress({ ...press, [e]: !press[e] });
  };

  return (
    <div className={s.menu}>
      <div className={s.cont}>
        <div className={s.section}>
          <div className={s.section_cont}>
            <label className={s.lab}>DB</label>
            <div className={press.db ? s.icon_rot : s.icon}>
              <IoIosArrowDropright
                onClick={() => onClickHandler('db')}
                size={20}
              />
            </div>
          </div>
          <div className={press.db ? s.show : s.hide}>
            <FilterDbMobile db={db} onDb={onDb} />
          </div>
        </div>
        <div className={s.section}>
          <div className={s.section_cont}>
            <label className={s.lab}>Genres</label>
            <div className={press.genres ? s.icon_rot : s.icon}>
              <IoIosArrowDropright
                onClick={() => onClickHandler('genres')}
                size={20}
              />
            </div>
          </div>
          <div className={press.genres ? s.show_gen : s.hide}>
            <FilterGenMobile genre={genre} onFilterGen={onFilterGen} />
          </div>
        </div>
        <div className={s.section}>
          <div className={s.section_cont}>
            <label className={s.lab}>A-Z</label>
            <div className={press.az ? s.icon_rot : s.icon}>
              <IoIosArrowDropright
                onClick={() => onClickHandler('az')}
                size={20}
              />
            </div>
          </div>
          <div className={press.az ? s.show : s.hide}>
            <SortAZ sort={sort} onSort={onSort} />
          </div>
        </div>
        <div className={s.section}>
          <div className={s.section_cont}>
            <label className={s.lab}>Rating</label>
            <div className={press.ratings ? s.icon_rot : s.icon}>
              <IoIosArrowDropright
                onClick={() => onClickHandler('ratings')}
                size={20}
              />
            </div>
          </div>
          <div className={press.ratings ? s.show : s.hide}>
            <SortRating ratings={ratings} onRating={onRating} />
          </div>
        </div>
      </div>
    </div>
  );
}
