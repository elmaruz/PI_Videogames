import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  getVids,
  searchVids,
  getGenres,
  filterGenres,
  searchFilter,
  selectDb,
} from "../actions/index.js";
import VideogameList from "./VideogameList";
import Searchbar from "./Searchbar";
import SortAZ from "./SortAZ.jsx";
import FilterGen from "./FilterGen.jsx";
import SortRating from "./SortRating.jsx";
import FilterDb from "./FilterDb.jsx";
import { Link } from "react-router-dom";
import styles from "../css_modules/GameDisplay.module.css";

export default function GameDisplay({ def }) {
  let vids = useSelector((state) => state.vidsList);
  const api = useSelector((state) => state.apiList);
  let genres = useSelector((state) => state.genres);
  const dispatch = useDispatch();
  let [page, setPage] = useState(0);
  let [vars, setVars] = useState([0, 15]);
  let [search, setSearch] = useState("");
  let [sort, setSort] = useState("");
  let [genre, setGenre] = useState("");
  let [ratings, setRatings] = useState("");
  let [db, setDb] = useState("");

  if (ratings) {
    if (ratings === "ASC") {
      vids.sort(function (a, b) {
        return a.rating - b.rating;
      });
    } else if (ratings === "DESC") {
      vids.sort(function (a, b) {
        return b.rating - a.rating;
      });
    }
    if (sort) {
      vids.sort((a, b) => {
        if (a.name.toLowerCase() > b.name.toLowerCase()) {
          return sort === "ASC" ? 1 : -1;
        }
        if (a.name.toLowerCase() < b.name.toLowerCase()) {
          return sort === "ASC" ? -1 : 1;
        }
        return 0;
      });
    }
  }

  if (sort) {
    vids.sort((a, b) => {
      if (a.name.toLowerCase() > b.name.toLowerCase()) {
        return sort === "ASC" ? 1 : -1;
      }
      if (a.name.toLowerCase() < b.name.toLowerCase()) {
        return sort === "ASC" ? -1 : 1;
      }
      return 0;
    });
    if (ratings) {
      if (ratings === "ASC") {
        vids.sort(function (a, b) {
          return a.rating - b.rating;
        });
      } else if (ratings === "DESC") {
        vids.sort(function (a, b) {
          return b.rating - a.rating;
        });
      }
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
    if (search && genre && !db) {
      dispatch(searchFilter(search, genre));
    }
    if (!search && genre && !db) {
      dispatch(filterGenres(genre));
    }
    if (db) {
      dispatch(selectDb(db, search));
    }
  }, [search, genre, db]);

  function nextPage() {
    let maxPages = Math.floor(vids.length / 15);
    setPage(page + 1);
    if (page < maxPages) {
      setVars([vars[0] + 15, vars[1] + 15]);
      console.log(vars);
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
  }

  function onFilterGen(value) {
    setGenre(value);
  }

  function onRating(value) {
    setRatings(value);
  }

  function onDb(value) {
    setDb(value);
  }

  function reset(value) {
    onFilterGen(value);
    setGenre(value);
    setSort(value);
    setSearch(value);
    setPage(0);
    setRatings("");
    setDb("");
  }

  return (
    <div className={`${styles.master}`}>
      <div className={`${styles.macro}`}>
        <SortAZ onSort={onSort} />
        <Searchbar onSearch={onSearch} onSort={onSort} />
        <FilterGen genres={genres} onFilterGen={onFilterGen} />
        <SortRating onRating={onRating} />
        <FilterDb onDb={onDb} />
        <button onClick={() => reset(def)}>Reset</button>
        <Link to="/create">Create Game</Link>
      </div>
      <div className={`${styles.container}`}>
        <VideogameList vids={vids} vars={vars} />
      </div>
      <div className={`${styles.btn_box}`}>
        <button className={`${styles.btn}`} onClick={prevPage}>
          Prev
        </button>
        <button className={`${styles.btn}`} onClick={nextPage}>
          Next
        </button>
      </div>
    </div>
  );
}
