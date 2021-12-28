import { combineReducers } from 'redux';

declare type ActionTypes = {
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

declare type GlobalTypes = {
  /**
   * 用户信息
   */
  userInfo?: object;
  [propName: string]: any;
};

function global(
  state: GlobalTypes = {
    userInfo: {},
  },
  action: ActionTypes,
): object {
  switch (action.type) {
    case 'global/UPDATE_STATE':
      return { ...state, ...action.payload };
    default:
      return state;
  }
}

export default combineReducers({
  global,
});
