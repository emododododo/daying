import React, { PropTypes } from 'react';
import { connect } from 'dva';
import styles from './IndexPage.css';
import List from '../components/list';
import Nav from '../components/nav';

function ListPage({ itemList }) {
  return (
    <div className={styles.normal}>
      <Nav />
      <List {...itemList} />
    </div>
  );
}

ListPage.propTypes = {
  itemList: PropTypes.object,
};

function mapStateToProps({ itemList }) {
  return { itemList };
}

export default connect(mapStateToProps)(ListPage);
