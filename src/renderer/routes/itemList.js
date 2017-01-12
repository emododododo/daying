import React, { PropTypes } from 'react';
import { connect } from 'dva';
import List from '../components/list';
import Nav from '../components/nav';
import Webview from '../components/webview';
import styles from './itemList.css';

class ListPage extends React.Component {

  constructor(props) {
    super(props);
    this.dispatch = props.dispatch;
    this.state = {
      webviewCanGoBack: false,
    };
  }

  render() {
    const { itemList, dispatch } = this.props;
    const listProps = Object.assign({}, itemList, {
      gotoUrl(e, url) {
        e.preventDefault();
        dispatch({
          type: 'itemList/viewContent',
          payload: {
            url,
          },
        });
      },
    });
    const navProps = {
      dataList: itemList.dataList,
      onChangeTitle(title) {
        dispatch({
          type: 'itemList/query',
          payload: {
            isLoadingList: true,
            queryName: title,
            list: [],
          },
        });
      },
    };

    return (
      <div>
        <div className={styles['list-view']}>
          <Nav {...navProps} />
          <List {...listProps} />
        </div>
        <Webview {...itemList} />
      </div>
    );
  }
}

ListPage.propTypes = {
  itemList: PropTypes.object,
};

function mapStateToProps({ itemList }) {
  return { itemList };
}

export default connect(mapStateToProps)(ListPage);
