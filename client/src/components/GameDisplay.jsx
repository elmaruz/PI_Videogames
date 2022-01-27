import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  getVids,
  searchVids,
  getGenres,
  filterGenres,
  selectDb,
} from '../actions/index.js';
import VideogameList from './VideogameList';
import Searchbar from './Searchbar';
import SortAZ from './SortAZ.jsx';
import FilterGen from './FilterGen.jsx';
import SortRating from './SortRating.jsx';
import FilterDb from './FilterDb.jsx';
import { Link } from 'react-router-dom';
import styles from '../css_modules/GameDisplay.module.css';
import { AiOutlineMenu } from 'react-icons/ai';
import Menu from './Menu.jsx';

export default function GameDisplay() {
  let vids = useSelector((state) => state.vidsList);
  const dispatch = useDispatch();
  let [page, setPage] = useState(0);
  let [vars, setVars] = useState([0, 15]);
  let [search, setSearch] = useState('');
  let [sort, setSort] = useState('');
  let [genre, setGenre] = useState('');
  let [ratings, setRatings] = useState('');
  let [db, setDb] = useState('');
  let [mobile, setMobile] = useState(false);

  if (ratings && !sort) {
    if (ratings === 'ASC') {
      vids.sort(function (a, b) {
        return a.rating - b.rating;
      });
    } else if (ratings === 'DESC') {
      vids.sort(function (a, b) {
        return b.rating - a.rating;
      });
    }
  }
  if (sort && !ratings) {
    vids.sort((a, b) => {
      if (a.name.toLowerCase() > b.name.toLowerCase()) {
        return sort === 'ASC' ? 1 : -1;
      }
      if (a.name.toLowerCase() < b.name.toLowerCase()) {
        return sort === 'ASC' ? -1 : 1;
      }
      return 0;
    });
  }

  if (sort && ratings) {
    vids.sort((a, b) => {
      if (a.name.toLowerCase() > b.name.toLowerCase()) {
        return sort === 'ASC' ? 1 : -1;
      }
      if (a.name.toLowerCase() < b.name.toLowerCase()) {
        return sort === 'ASC' ? -1 : 1;
      }
      return 0;
    });
    if (ratings === 'ASC') {
      vids.sort(function (a, b) {
        return a.rating - b.rating;
      });
    } else if (ratings === 'DESC') {
      vids.sort(function (a, b) {
        return b.rating - a.rating;
      });
    }
  }

  useEffect(() => {
    if (!search && !genre && !db) {
      dispatch(getVids());
      dispatch(getGenres());
    }
    if (search && !genre && !db) {
      dispatch(searchVids(search));
    }
    if (genre) {
      dispatch(filterGenres(genre));
    }
    if (db === 'DB' || db === 'Rawg') {
      dispatch(selectDb(db, search, genre));
    }
  }, [search, genre, db, sort, ratings, dispatch]);

  function nextPage() {
    let maxPages = Math.floor(vids.length / 15);
    setPage(page + 1);
    if (page < maxPages) {
      setVars([vars[0] + 15, vars[1] + 15]);
    } else {
      setPage(maxPages);
    }
  }

  function prevPage() {
    if (page > 0) {
      setPage(page - 1);
      setVars([vars[0] - 15, vars[1] - 15]);
    } else {
      setPage(0);
    }
  }

  function onSearch(name) {
    setSearch(name);
    setPage(0);
    setVars([0, 15]);
  }

  function onSort(value) {
    setSort(value);
    setDb(db);
  }

  function onFilterGen(value) {
    setGenre(value);
    setPage(0);
    setVars([0, 15]);
    setDb(db);
  }

  function onRating(value) {
    setRatings(value);
    setDb(db);
  }

  function onDb(value) {
    setDb(value);
  }

  return (
    <div className={`${styles.master}`}>
      <div className={`${styles.banner}`}>
        <div className={`${styles.banner_cont}`}>
          <div className={`${styles.bannerbox}`}>RetroDB</div>
          <div className={styles.mob_create}>
            <Link className={styles.mob_link} to='/create'>
              <button className={`${styles.create}`}>Create Game</button>
            </Link>
          </div>
          <div className={styles.mob_icon}>
            <AiOutlineMenu
              size={28}
              style={{ float: 'right', top: 0, color: 'whitesmoke' }}
              onClick={() => setMobile(!mobile)}
            />
          </div>
        </div>
        <div className={`${styles.macro}`}>
          <div className={`${styles.hide0}`}>
            <FilterDb db={db} onDb={onDb} />
          </div>
          <div className={`${styles.hide1}`}>
            <SortRating ratings={ratings} onRating={onRating} />
          </div>

          <div className={`${styles.search}`}>
            <Searchbar
              onSearch={onSearch}
              onSort={onSort}
              onFilterGen={onFilterGen}
              onRating={onRating}
              onDb={onDb}
            />
          </div>

          <div className={`${styles.hide2}`}>
            <SortAZ sort={sort} onSort={onSort} />
            <FilterGen genre={genre} onFilterGen={onFilterGen} />
            <Link to='/create'>
              <button className={`${styles.create}`}>Create Game</button>
            </Link>
          </div>
        </div>
      </div>

      {mobile ? (
        <Menu
          sort={sort}
          onSort={onSort}
          ratings={ratings}
          onRating={onRating}
          db={db}
          onDb={onDb}
          genre={genre}
          onFilterGen={onFilterGen}
        />
      ) : (
        ''
      )}
      <div className={`${styles.container}`}>
        <VideogameList
          vids={vids}
          vars={vars}
          prevPage={prevPage}
          nextPage={nextPage}
        />
        {/* <div className={`${styles.btn_box}`}>
          <button className={`${styles.btn}`} onClick={prevPage}>
            {`<`}
          </button>
          <button className={`${styles.btn}`} onClick={nextPage}>
            {`>`}
          </button>
        </div> */}
      </div>
    </div>
  );
}
