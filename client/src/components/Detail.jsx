import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDetails } from "../actions/index.js";
import styles from "../css_modules/Detail.module.css";

export default function Detail({ id }) {
  let details = useSelector((state) => state.details);
  let dispatch = useDispatch();

  useEffect(() => {
    dispatch(getDetails(id));
  }, []);

  return (
    <div>
      <div className={`${styles.box}`}>
        <img className={`${styles.img}`} src={details.image} alt="Not Found" />
        <div>{details.name}</div>
        <div>{details.genres}</div>
        <div>{details.rating}</div>
        <div>{details.released}</div>
        <div className={`${styles.desc}`}>{details.description}</div>
        <div>{details.platforms}</div>
      </div>
    </div>
  );
}
