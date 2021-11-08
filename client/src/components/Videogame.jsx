import React from "react";
import styles from "../css_modules/Videogame.module.css";
import { Link } from "react-router-dom";

export default function Videogame({ name, image, genres, id, rating }) {
  return (
    <div className={`${styles.master}`}>
      <Link to={`/videogames/${id}`} className={`${styles.link}`}>
        <div className={`${styles.box}`}>
          <img className={`${styles.img}`} src={image} alt="Not found" />
          <div className={`${styles.details}`}>{name}</div>
          <div className={`${styles.genrate}`}>
            <div className={`${styles.content}`}>
              {genres.map((elem) => elem.name).join(" / ")}
            </div>
            <div className={`${styles.content}`}>Rating: {rating}</div>
          </div>
        </div>
      </Link>
    </div>
  );
}
