import React from 'react';
import { Checkbox, CheckboxGroup } from 'react-checkbox-group';
import styles from './subscribesEdit.css';

const dialog = require('electron').remote.dialog;

class CheckBox extends React.Component {
  constructor(props) {
    super(props);
    const slectedIdList = props.navList.map(item => item.id);
    this.state = {
      slectedIdList,
    };
  }

  onConfirm() {
    // 限制订阅数量
    // if (this.state.slectedIdList.length <= 0 || this.state.slectedIdList.length > 10) {
      // dialog.showErrorBox('❌', `您只能订阅 1~10 个信息源，请重新选择。但您选择了${this.state.slectedIdList.length}个信息源`);
      // return;
    // }

    const objList = {};
    this.state.slectedIdList.forEach((item) => {
      objList[item] = item;
    });

    // 处理选中数据
    const updateList = this.props.allNavList.reduce((arr, item) => {
      let result = arr;
      if (item.data && item.data.length > 0) {
        const resultJ = item.data.reduce((arrI, itemI) => {
          const resultI = arrI;
          if (objList[itemI.id]) {
            resultI.push({
              id: itemI.id,
              title: itemI.title,
            });
          }
          return resultI;
        }, []);
        result = result.concat(resultJ);
      } else if (objList[item.id]) {
        result.push({
          id: item.id,
          title: item.title,
        });
      }
      return result;
    }, []);

    // Dispatch updateNavList action
    this.props.dispatch({
      type: 'itemList/updateNavList',
      payload: {
        navList: updateList,
      },
    });
    dialog.showErrorBox('✔️', '订阅源更改成功');
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
      message: '确定检查并更新订阅源？',
    }, (response) => {
      if (response === 0) {
        this.props.dispatch({
          type: 'itemList/updateAllNavList',
          payload: {
            queryName: 'getList',
            callback: (res) => {
              let message = '更新失败❌';
              if (res.status === 'success') {
                message = '更新成功✔️';
              }
              dialog.showErrorBox(message, '');
            },
          },
        });
      }
    });
  }

  render() {
    const allNavList = this.props.allNavList;
    return (
      <div className={styles.wrapper}>
        <div className={styles['checkBox-wrapper']}>
          <CheckboxGroup name="navList" value={this.state.slectedIdList} onChange={this.navListChanged.bind(this)}>
            {
              allNavList.map((item, index) => {
                // itemListJSX
                let itemListJSX = (
                  <div className={styles['item-content']}>
                    <Checkbox value={item.id} />
                    <span>热门</span>
                  </div>
                );
                if (item.data && item.data.length > 0) {
                  itemListJSX = item.data.map((itemI, indexI) => {
                    return (
                      <div key={indexI} className={styles['item-content']}>
                        <Checkbox value={itemI.id} />
                        <span>{itemI.title}</span>
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
          </CheckboxGroup>
        </div>
        <button className={styles['confirm-button']} onClick={this.onConfirm.bind(this)}>确定</button>
        <div className={styles['update-button']} onClick={this.updateSubscribes.bind(this)}><a>更新订阅源</a></div>
      </div>
    );
  }
}

export default CheckBox;
