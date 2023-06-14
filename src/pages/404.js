import React from 'react';
import style from '@styles/404.module.css';
const error = () => {
  return (
    <div className={`${style.parent} `}>
      <div className={style.noise}></div>
      <div className={style.overlay}></div>
      <div className={style.terminal}>
        <h1>Error 404</h1>
        <p className={style.output}>
          The page you are looking for might have been removed, had its name
          changed or is temporarily unavailable.
        </p>
        <p className={style.output}>
          Please try to <a href='#1'>go back</a> or{' '}
          <a className={style.a} href='#2'>
            return to the homepage
          </a>
          .
        </p>
        <p className={style.output}>Good luck.</p>
      </div>
    </div>
  );
};

export default error;
