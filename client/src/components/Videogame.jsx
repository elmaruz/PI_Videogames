import React from "react";
import styles from "../css_modules/Videogame.module.css";
import { Link } from "react-router-dom";

export default function Videogame({ name, image, genres, id, rating }) {
  return (
    <React.Fragment>
      <Link to={`/videogames/${id}`} className={`${styles.link}`}>
        <div className={`${styles.box}`}>
          <img className={`${styles.img}`} src={image} alt="Not found" />
          <div className={`${styles.details}`}>
            {name}
            <div>{genres.map((elem) => elem.name).join(" / ")}</div>
            <div>Rating: {rating}</div>
          </div>
        </div>
      </Link>
    </React.Fragment>
  );
}
