import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getDetails } from '../actions/index.js';
import styles from '../css_modules/Detail.module.css';

export default function Detail({ id }) {
  let details = useSelector((state) => state.details);
  let dispatch = useDispatch();

  useEffect(() => {
    dispatch(getDetails(id));
  }, [dispatch, id]);

  return (
    <div className={`${styles.box}`}>
      <img className={`${styles.img}`} src={details.image} alt='Not Found' />
      <div className={`${styles.container}`}>
        <div className={`${styles.det}`}>{details.name}</div>
        <div className={`${styles.det}`}>{details.genres}</div>
        <div className={`${styles.det}`}>Rating: {details.rating}</div>
        <div className={`${styles.det}`}>Released: {details.released}</div>
        <div className={`${styles.desc}`}>{details.description}</div>
        <div className={`${styles.det}`}>{details.platforms}</div>
      </div>
    </div>
  );
}
