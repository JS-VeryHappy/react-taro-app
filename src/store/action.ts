import { USER_INFO_UPDATE_STATE } from './constants';

export const userInfoAction = (userInfo: any) => {
  return (dispatch) => {
    dispatch({
      type: USER_INFO_UPDATE_STATE,
      payload: userInfo,
    });
  };
};
