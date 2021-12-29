import { USER_INFO_UPDATE_STATE, USER_INFO_CLEAR_STATE } from './constants';

export const userInfoAction = (userInfo: any) => {
  return (dispatch) => {
    dispatch({
      type: USER_INFO_UPDATE_STATE,
      payload: userInfo,
    });
  };
};

export const clearUserInfoAction = () => {
  return (dispatch) => {
    dispatch({
      type: USER_INFO_CLEAR_STATE,
      payload: null,
    });
  };
};
