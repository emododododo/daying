import React, { PropTypes } from 'react';
import { connect } from 'dva';
import styles from './IndexPage.css';
import CheckBox from '../components/checkBox';

class EditPage extends React.Component {
  render() {
    const { itemList, dispatch } = this.props;
    const navList = itemList.navList;
    const checkBoxProps = {
      navList,
      allNavList: itemList.allNavList,
      dispatch,
    };
    return (
      <div className={styles.normal}>
        <CheckBox {...checkBoxProps} />
      </div>
    );
  }
}

EditPage.propTypes = {
  itemList: PropTypes.object,
};

function mapStateToProps({ itemList }) {
  return { itemList };
}

export default connect(mapStateToProps)(EditPage);
