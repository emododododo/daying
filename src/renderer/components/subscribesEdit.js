import React from 'react';
import Checkbox from 'material-ui/Checkbox';
import RaisedButton from 'material-ui/RaisedButton';
import styles from './subscribesEdit.css';

const dialog = require('electron').remote.dialog;

class SubscribesEdit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      slectedIdList: props.navList,
    };
  }

  onConfirm() {
    // 限制订阅数量
    // if (this.state.slectedIdList.length <= 0 || this.state.slectedIdList.length > 15) {
    //   dialog.showErrorBox(
    //     '<U+274C>',
    //     `您只能订阅 1~15 个信息源，请重新选择。但您选择了${this.state.slectedIdList.length}个信息源`,
    //   );
    //   return;
    // }
    // Dispatch updateNavList action
    this.props.dispatch({
      type: 'itemList/updateNavList',
      payload: {
        navList: this.state.slectedIdList,
      },
    });
    dialog.showMessageBox({
      type: 'info',
      title: '✔️',
      buttons: ['确定'],
      message: '更改订阅源',
      detail: '订阅源更改成功!',
    });
  }

  navListChanged(newIdList) {
    this.setState({
      slectedIdList: newIdList,
    });
  }

  updateSubscribes() {
    dialog.showMessageBox({
      type: 'info',
      buttons: ['确定', '取消'],
      message: '更新订阅源',
      detail: '确定检查并更新订阅源？',
    }, (response) => {
      if (response === 0) {
        this.props.dispatch({
          type: 'itemList/updateAllNavList',
          payload: {
            queryName: 'getList',
            callback: (res) => {
              let detail = '更新失败❌';
              if (res.status === 'success') {
                detail = '更新成功✔️';
              }
              dialog.showMessageBox({
                type: 'info',
                buttons: ['确定'],
                message: '更新结果',
                detail,
              });
            },
          },
        });
      }
    });
  }

  handleCheck(isInputChecked, checkedItem) {
    let newSlectedIdList = this.state.slectedIdList;
    const idObj = this.state.slectedIdList.reduce((obj, item) => {
      const result = obj;
      result[item.id] = item.id;
      return result;
    }, {});

    if (isInputChecked && !idObj[checkedItem.id]) {
      newSlectedIdList.push(checkedItem);
    } else if (!isInputChecked && idObj[checkedItem.id]) {
      newSlectedIdList = newSlectedIdList.reduce((arr, item) => {
        const result = arr;
        if (item.id !== checkedItem.id) {
          result.push(item);
        }
        return result;
      }, []);
    }

    this.setState({
      slectedIdList: newSlectedIdList,
    });
  }

  checkBoxJSX(item, single) {
    const idObj = this.state.slectedIdList.reduce((obj, itemI) => {
      const result = obj;
      result[itemI.id] = itemI.id;
      return result;
    }, {});

    const checked = !!idObj[item.id];
    const label = single ? '热门' : item.title;
    return (
      <Checkbox
        label={label}
        checked={checked}
        onCheck={(e, isInputChecked) => {
          this.handleCheck(isInputChecked, item);
        }}
      />
    );
  }

  render() {
    const allNavList = this.props.allNavList;
    return (
      <div className={styles.wrapper}>
        <div className={styles['checkBox-wrapper']}>
          {
            allNavList.map((item, index) => {
              // itemListJSX
              let itemListJSX = (
                <div className={styles['item-content']}>
                  { this.checkBoxJSX(item, true) }
                </div>
              );
              if (item.data && item.data.length > 0) {
                itemListJSX = item.data.map((itemI, indexI) => {
                  return (
                    <div key={indexI} className={styles['item-content']}>
                      { this.checkBoxJSX(itemI) }
                    </div>
                  );
                });
              }

              return (
                <div className={styles.wrapper} key={index}>
                  <div className={styles.title}>{item.title}</div>
                  <div className={styles.itemList}>{itemListJSX}</div>
                </div>
              );
            })
          }
        </div>
        <div className={styles['confirm-button']} onClick={this.onConfirm.bind(this)}>
          <RaisedButton label="确定" primary className={styles['confirm-button']} />
        </div>
        <div className={styles['update-button']} onClick={this.updateSubscribes.bind(this)}><a>更新订阅源</a></div>
      </div>
    );
  }
}

export default SubscribesEdit;
