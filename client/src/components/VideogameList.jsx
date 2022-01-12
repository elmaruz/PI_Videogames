import Videogame from './Videogame.jsx';
import styles from '../css_modules/VideogameList.module.css';

export default function VideogameList({ vids, vars }) {
  console.log(vids, vars);
  return (
    <div className={`${styles.macro}`}>
      <div className={`${styles.container}`}>
        {vids &&
          vars &&
          vids.slice(vars[0], vars[1]).map((elem, index) => {
            if (elem.name !== 'Videogame not found') {
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
                <div>
                  <h1 className={`${styles.error}`}>GAME OVER</h1>
                  <h3 className={`${styles.error}`}>videogame not found</h3>
                </div>
              );
            }
          })}
      </div>
    </div>
  );
}
