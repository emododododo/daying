import React, { PropTypes } from 'react';
import { connect } from 'dva';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';
import Paper from 'material-ui/Paper';
import styles from './EditPage.css';
import SubscribesEdit from '../components/subscribesEdit';
import About from '../components/about';
// Needed for onTouchTap
injectTapEventPlugin();

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
      <MuiThemeProvider>
        <div className={styles.editPage}>
          <Paper className={styles.editNav} zDepth={2} >
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
          </Paper>
          <Paper className={styles.editContent} zDepth={2} >
            {editContent}
          </Paper>
        </div>
      </MuiThemeProvider>
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
