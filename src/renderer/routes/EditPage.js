import React, { PropTypes } from 'react';
import { connect } from 'dva';
import styles from './EditPage.css';
import SubscribesEdit from '../components/subscribesEdit';
import About from '../components/about';

class EditPage extends React.Component {

  constructor(props) {
    super(props);
    this.editNav = ['订阅源', '关于'];
    this.state = {
      editNavSelected: 0,
    };
  }

  selectedNav(index) {
    this.setState({ editNavSelected: index });
  }

  render() {
    const { itemList, dispatch } = this.props;
    const navList = itemList.navList;
    const checkBoxProps = {
      navList,
      allNavList: itemList.allNavList,
      dispatch,
    };

    let editContent = '';
    switch (this.state.editNavSelected) {
      case 0:
        editContent = <SubscribesEdit {...checkBoxProps} />;
        break;
      case 1:
        editContent = <About />;
        break;
      default:
        editContent = <SubscribesEdit {...checkBoxProps} />;
    }

    return (
      <div className={styles.editPage}>
        <div className={styles.editNav}>
          {
            this.editNav.map((item, index) => {
              let className = styles.editNavItem;
              if (this.state.editNavSelected === index) {
                className += ` ${styles['editNavItem--selected']}`;
              }
              return (
                <a key={index} onClick={() => { this.selectedNav(index); }}>
                  <p className={className}>{item}</p>
                </a>
              );
            })
          }
        </div>
        <div className={styles.editContent}>{editContent}</div>
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
