import Videogame from "./Videogame.jsx";
import styles from "../css_modules/VideogameList.module.css";
import { useSelector } from "react-redux";

export default function VideogameList({ vids, vars }) {
  return (
    <div className={`${styles.macro}`}>
      <div className={`${styles.container}`}>
        {vids.slice(vars[0], vars[1]).map((elem, index) => {
          if (elem.name !== "Videogame not found") {
            return (
              <Videogame
                key={index}
                id={elem.id}
                name={elem.name}
                image={elem.image}
                genres={elem.genres}
                rating={elem.rating}
              />
            );
          } else {
            return (
              <label className={`${styles.error}`}>Videogame not found</label>
            );
          }
        })}
      </div>
    </div>
  );
}

// {vids.slice(vars[0], vars[1]).map((elem, index) => {
//   return (
//     <Videogame
//       key={index}
//       id={elem.id}
//       name={elem.name}
//       image={elem.image}
//       genres={elem.genre}
//     />
//   );
// })}
