import React, { PropTypes } from 'react';
import { connect } from 'dva';
import styles from './IndexPage.css';
import CheckBox from '../components/checkBox';

const allDataList = [{
  title: '知乎日报',
  id: 'dailyZhihu',
  data: [
    {
      title: '日常心理学',
      id: 'dailyZhihu_13',
    },
    {
      title: '用户推荐日报',
      id: 'dailyZhihu_12',
    },
    {
      title: '电影日报',
      id: 'dailyZhihu_3',
    },
    {
      title: '不许无聊',
      id: 'dailyZhihu_11',
    },
    {
      title: '设计日报',
      id: 'dailyZhihu_4',
    },
    {
      title: '大公司日报',
      id: 'dailyZhihu_5',
    },
  ],
}, {
  title: '前端',
  id: 'qianduan',
}, {
  title: '博客园',
  id: 'cnblogs',
}, {
  title: 'csdn',
  id: 'csdn',
}, {
  title: '湾区',
  id: 'wanqu',
}, {
  title: 'IT之家',
  id: 'ithome',
}, {
  title: 'solidot奇客',
  id: 'solidot',
}];

class EditPage extends React.Component {
  render() {
    const { itemList, dispatch } = this.props;
    const selectedDataList = itemList.dataList;
    const checkBoxProps = {
      selectedDataList,
      allDataList,
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
