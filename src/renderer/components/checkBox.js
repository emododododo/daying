import React from 'react';
import { Checkbox, CheckboxGroup } from 'react-checkbox-group';
import styles from './checkBox.css';

class CheckBox extends React.Component {
  constructor(props) {
    super(props);
    const slectedIdList = props.selectedDataList.map(item => item.id);
    this.state = {
      slectedIdList,
    };
  }

  onConfirm() {
    const objList = {};
    this.state.slectedIdList.forEach((item) => {
      objList[item] = item;
    });

    // 处理选中数据
    const updateList = this.props.allDataList.reduce((arr, item) => {
      let result = arr;
      if (item.data && item.data.length > 0) {
        const resultJ = item.data.reduce((arrI, itemI) => {
          const resultI = arrI;
          if (objList[itemI.id]) {
            resultI.push({
              id: objList[itemI.id],
              title: objList[itemI.title],
            });
          }
          return resultI;
        }, []);
        result = result.concat(resultJ);
      } else if (objList[item.id]) {
        result.push({
          id: objList[item.id],
          title: item.title,
        });
      }
      return result;
    }, []);

    // Dispatch updateDataList action
    this.props.dispatch({
      type: 'itemList/updateDataList',
      payload: {
        dataList: updateList,
      },
    });
  }

  dataListChanged(newIdList) {
    this.setState({
      slectedIdList: newIdList,
    });
  }

  render() {
    const allDataList = this.props.allDataList;
    return (
      <div className={`${styles.wrapper}`}>
        <CheckboxGroup name="dataList" value={this.state.slectedIdList} onChange={this.dataListChanged.bind(this)}>
          {
            allDataList.map((item, index) => {
              if (item.data && item.data.length > 0) {
                return (
                  <div className={styles.wrapper} key={index}>
                    <div className={styles.title}>{item.title}: </div>
                    <div className={styles.itemList}>
                      {
                        item.data.map((itemI, indexI) => {
                          return (
                            <div key={indexI}>
                              <Checkbox value={itemI.id} />
                              <span>{itemI.title}</span>
                            </div>
                          );
                        })
                      }
                    </div>
                  </div>
                );
              }
              return (
                <div className={styles.wrapper} key={index}>
                  <Checkbox value={item.id} />
                  <span>{item.title}</span>
                </div>
              );
            })
          }
        </CheckboxGroup>
        <button onClick={this.onConfirm.bind(this)}>confirm</button>
        <button onClick={this.onConfirm.bind(this)}>close</button>
      </div>
    );
  }
}

export default CheckBox;
