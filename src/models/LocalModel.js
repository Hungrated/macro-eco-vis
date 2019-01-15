import { getLocalData } from '../services/RequestApi';

export default {

  namespace: 'local',

  state: {
    data: {}
  },

  subscriptions: {
    setup ({dispatch, history}) {  // eslint-disable-line
    }
  },

  effects: {
    * fetch ({payload}, {put, call}) {
      const response = yield call(getLocalData, payload);
      yield put({
        type: 'refresh',
        payload: response.data
      });
    }
  },

  reducers: {
    refresh (state, action) {
      return {
        ...state,
        data: action.payload
      };
    }
  }

};
