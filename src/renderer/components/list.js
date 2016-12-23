import React, { PropTypes } from 'react';

function List(itemList) {
  if (itemList.isLoadingList) {
    return (
      <div>
        loading
      </div>
    );
  }
  return (
    <div>
      <ul>
        {
          itemList.list.map((item, index) => {
            return <li key={index}><a rel="noopener noreferrer" target="_blank" href={item.url}>{item.title}</a></li>;
          })
        }
      </ul>
    </div>
  );
}

export default List;
