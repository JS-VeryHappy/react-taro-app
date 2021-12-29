import { combineReducers } from 'redux';
import { USER_INFO_UPDATE_STATE, USER_INFO_CLEAR_STATE } from './constants';
import defaultState from './state';

export declare type ActionTypes = {
  /**
   * 更新的类型
   * 更新整个状态：global/UPDATE_STATE
   */
  type: string;
  /**
   * 传递的数据
   */
  payload: any;
};

function userInfo(state: any = defaultState.userInfo, action: ActionTypes): any {
  switch (action.type) {
    case USER_INFO_UPDATE_STATE:
      return { ...state, ...action.payload };
    case USER_INFO_CLEAR_STATE:
      return null;
    default:
      return state;
  }
}

export default combineReducers({
  userInfo,
});
