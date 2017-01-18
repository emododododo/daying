import React from 'react';
import styles from './about.css';

const openExternal = require('electron').remote.shell.openExternal;

function About() {
  const about = {
    version: '0.1.0',
    author: 'smackgg&emodo',
    mail: 'xysmackdown@gmail.com',
    github: <a href="#1" onClick={() => { openExternal('https://github.com/emododododo/daying'); }}>https://github.com/emododododo/daying</a>,
  };
  return (
    <div className={styles['about-wrapper']}>
      {
        Object.keys(about).map((item, index) => {
          return (
            <div key={index} className={styles.row}>
              <p>{item}:</p>
              <p>{about[item]}</p>
            </div>
          );
        })
      }
    </div>
  );
}

export default About;
