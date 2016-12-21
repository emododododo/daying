import { query } from '../services/list';

export default {

  namespace: 'itemList',

  state: {
    lists: [],
  },
  subscriptions: {
    queryItemLists({dispatch}) {
      dispatch({
        type: 'query',
        payload: 'dailyZhihu',
      });
      console.log(1111);
    },
  },
  effects: {
    * query({ payload },{call, put}) {
      const { data } = yield call( query );
      if (data) {
        yield put({
          type: 'querySuccess',
          payload: {
            list: data.data,
          },
        });
      }
    }
  },
  reducers: {
    querySuccess ( state, action ) {
      return  {...state, ...action.payload };
    }
  },

};
