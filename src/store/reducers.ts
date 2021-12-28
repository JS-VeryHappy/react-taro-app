import { combineReducers } from 'redux';
import { USER_INFO_UPDATE_STATE } from './constants';

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

function userInfo(state: any = null, action: ActionTypes): object {
  switch (action.type) {
    case USER_INFO_UPDATE_STATE:
      return { ...state, ...action.payload };
    default:
      return state;
  }
}

export default combineReducers({
  userInfo,
});
