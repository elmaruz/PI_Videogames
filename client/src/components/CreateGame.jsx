import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { createGame, getGenres } from "../actions/index.js";
import styles from "../css_modules/Create.module.css";

export default function CreateGame() {
  const history = useHistory();
  const dispatch = useDispatch();
  const genres = useSelector((state) => state.genres);
  const api = useSelector((state) => state.apiList);
  const allPlatforms = api.map((elem) => elem.platforms);
  let platformsSet = new Set(allPlatforms.flat(Infinity));
  let platforms = [];
  let errors = {};
  for (let i of platformsSet) {
    platforms.push(i);
  }
  let [checkState, setCheckState] = useState({
    genres: new Array(genres.length).fill(false),
    platforms: new Array(platforms.length).fill(false),
  });
  let [input, setInput] = useState({
    name: "",
    description: "",
    released: "",
    genres: [],
    rating: 0,
    platforms: [],
  });
  let [error, setError] = useState({
    name: "Name required",
    description: "Description required",
    released: "Date required",
    genres: "Genre required",
    platforms: "Platform required",
    rating: "Rating must be higher than zero",
  });

  useEffect(() => {
    dispatch(getGenres());
  }, []);

  function validate(input) {
    if (input.name) {
      errors.name = "";
    } else {
      errors.name = "Name required";
    }
    if (input.description) {
      errors.description = "";
    } else {
      errors.description = "Description required";
    }
    if (input.released) {
      errors.released = "";
    } else {
      errors.released = "Date required";
    }
    if (input.rating) {
      errors.rating = "";
    } else {
      errors.rating = "Rating required";
    }
    if (input.genres.length > 0) {
      errors.genres = "";
    } else {
      errors.genres = "Genre required";
    }
    if (input.platforms.length > 0) {
      errors.platforms = "";
    } else {
      errors.platforms = "Platform required";
    }
    return errors;
  }

  function handleGenre(pos) {
    let genCheckState = checkState.genres.map((elem, index) => {
      if (index === pos) {
        return !elem;
      } else {
        return elem;
      }
    });
    setCheckState({ ...checkState, genres: genCheckState });
    var genArr = genCheckState
      .map((elem, index) => {
        if (elem === true) {
          return genres[index].name;
        }
      })
      .filter((elem) => typeof elem === "string");
    setInput({ ...input, genres: genArr });
    setError(validate({ ...input, genres: genArr }));
  }

  function handlePlatform(pos) {
    let platCheckState = checkState.platforms.map((elem, index) => {
      if (index === pos) {
        return !elem;
      } else {
        return elem;
      }
    });
    setCheckState({ ...checkState, platforms: platCheckState });
    var platArr = platCheckState
      .map((elem, index) => {
        if (elem === true) {
          return platforms[index];
        }
      })
      .filter((elem) => typeof elem === "string");
    setInput({ ...input, platforms: platArr });
    setError(validate({ ...input, platforms: platArr }));
  }

  function handleInput(e) {
    setInput({ ...input, [e.target.name]: e.target.value });
    setError(validate({ ...input, [e.target.name]: e.target.value }));
  }

  function onSubmit(e) {
    e.preventDefault();
    if (!Object.values(error).includes("")) {
      alert("Please fill in the required fields");
    } else {
      let newGame = {
        name: input.name,
        description: input.description,
        released: input.released,
        image:
          "https://icons.iconarchive.com/icons/iconsmind/outline/512/Gamepad-icon.png",
        rating: input.rating,
        platforms: input.platforms,
        genres: input.genres,
      };
      dispatch(createGame(newGame));
      history.push("/videogames");
    }
  }
  return (
    <div>
      <form className={`${styles.container}`} onSubmit={onSubmit}>
        <div>
          Name
          <input
            type="text"
            name="name"
            value={input.name}
            onChange={handleInput}
            className={`${error.name ? styles.error : ""}`}
          />
        </div>
        <div>
          Description
          <input
            type="text"
            name="description"
            value={input.description}
            onChange={handleInput}
            className={`${error.description ? styles.error : ""}`}
          />
        </div>
        <div>
          Released
          <input
            type="date"
            name="released"
            value={input.released}
            onChange={handleInput}
            className={`${error.released ? styles.error : ""}`}
          />
        </div>
        <div>
          Rating
          <input
            type="number"
            name="rating"
            value={input.rating}
            onChange={handleInput}
            min="0"
            max="5"
            className={`${error.rating ? styles.error : ""}`}
          />
        </div>
        <div className={`${styles.genDiv}`}>
          Genres
          <label
            className={`${
              error.genres ? styles.errorMsg : styles.errorMsgHide
            }`}
          >
            Genre required
          </label>
          {genres.map((elem, index) => (
            <div>
              {elem.name}
              <input
                type="checkbox"
                name={elem.name}
                value={elem.name}
                onChange={() => handleGenre(index)}
                checked={checkState.genres[index]}
              />
            </div>
          ))}
        </div>
        <div className={`${styles.platDiv}`}>
          Platforms
          <label
            className={`${
              error.platforms ? styles.errorMsg : styles.errorMsgHide
            }`}
          >
            Platform required
          </label>
          {platforms.map((elem, index) => (
            <div>
              {elem}
              <input
                type="checkbox"
                name={elem}
                value={elem}
                onChange={() => handlePlatform(index)}
                checked={checkState.platforms[index]}
              />
            </div>
          ))}
        </div>
        <button type="submit">Create</button>
      </form>
    </div>
  );
}
