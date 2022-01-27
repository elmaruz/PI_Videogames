import Videogame from './Videogame.jsx';
import styles from '../css_modules/VideogameList.module.css';

export default function VideogameList({ vids, vars }) {
  return (
    <div className={`${styles.macro}`}>
      <div className={`${styles.vid_container}`}>
        {vids.length > 0 ? (
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
                <div className={`${styles.error}`}>
                  <h1>GAME OVER</h1>
                  <h3>videogame not found</h3>
                </div>
              );
            }
          })
        ) : (
          <div className={`${styles.error}`}>
            <h1>LOADING...</h1>
          </div>
        )}
      </div>
    </div>
  );
}
