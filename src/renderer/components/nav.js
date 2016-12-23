import React, { PropTypes } from 'react';

const itemNav = [{
  title:'知乎',
  id: 'zhihu',
}, {
  title:'1111',
  id: '2222',
}, {
  title:'3333',
  id: '44444',
 }]

function Nav(itemList) {
  return (
    <div>
      <ul>
        {
          itemNav.map((item, index) => {
            return <li key={index}><a>{item.title}</a></li>;
          })
        }
      </ul>
    </div>
  );
}

export default Nav;
