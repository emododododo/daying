import React from 'react';
import styles from './list.css';

function List(itemList) {
  if (itemList.isLoadingList) {
    return (
      <div>
        loading
      </div>
    );
  }
  return (
    <div className={styles.list}>
      <ul>
        {
          itemList.list.map((item, index) => {
            return (
              <li key={index}>
                <a href={item.url} onClick={e => itemList.gotoUrl(e, item.url)}>
                  {item.title}
                </a>
              </li>);
          })
        }
      </ul>
    </div>
  );
}

export default List;
