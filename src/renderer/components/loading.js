import React from 'react';
import styles from './loading.css';

function Loading(props) {
  const loadingClass = props.isLoading ? styles.loading : '';
  console.log(loadingClass);
  return (
    <div className={`${styles.wrapper} ${loadingClass}`}>
      <div className={styles.children}>
        {props.children}
      </div>
      <div className={styles.left} />
      <div className={styles.right} />
    </div>
  );
}

export default Loading;
