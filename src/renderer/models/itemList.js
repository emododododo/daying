import { query } from '../services/list';
import { getStorage, setStorage, resetStorage } from '../utils/localStorage'
const ipcRenderer = require('electron').ipcRenderer;

const dataList = getStorage('selectedData').dataList;
// const dataList = [{
//   title: '知乎日报',
//   id: 'dailyZhihu',
// },
// {
//   title: '博客园',
//   id: 'cnblogs',
// }, {
//   title: 'csdn',
//   id: 'csdn',
// }, {
//   title: '湾区',
//   id: 'wanqu',
// }, {
//   title: 'IT之家',
//   id: 'ithome',
// }, {
//   title: 'solidot奇客',
//   id: 'solidot',
// }];

export default {

  namespace: 'itemList',

  state: {
    list: [],
    queryName: '',
    isLoadingList: false,
    dataList,
  },
  subscriptions: {
    queryItemLists({ dispatch }) {
      dispatch({
        type: 'query',
        payload: {
          isLoadingList: true,
          queryName: dataList[0].id,
          list: [],
        },
      });
    },
  },
  effects: {
    query: [function*({ payload }, { call, put }) {
      yield put({ type: 'showLoading' });
      const { data } = yield call(query, payload);
      if (data) {
        yield put({
          type: 'querySuccess',
          payload: {
            isLoadingList: false,
            queryName: 'dailyZhihu',
            list: data.data,
            url: data.data[0].url,
          },
        });
      }
    }, { type: 'takeLatest' }],
  },
  reducers: {
    showLoading(state) {
      return { ...state, isLoadingList: true };
    },
    querySuccess(state, action) {
      return { ...state, ...action.payload };
    },
    viewContent(state, action) {
      return { ...state, ...action.payload };
    },
    updateDataList(state, action) {
      // 同步刷新主窗口事件。
      setStorage('selectedData', action.payload);
      ipcRenderer.sendSync('sync-EditPage');
      return { ...state, ...action.payload };
    },
  },

};
