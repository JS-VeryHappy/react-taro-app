import Taro from '@tarojs/taro';
import Serv from '@service/index';

const userInfoAction = () => {
  return (dispatch) => {
    try {
      const token = Taro.getStorageSync('token');
      if (token) {
        Serv.fetchUserInfo().then((res) => {
          const { data } = res;
          if (!data.avatar) {
            data.avatar = `${IMG_HTTP_URL}1.0.0/avatar.png`;
          }
          dispatch({
            type: 'global/UPDATE_STATE',
            payload: {
              userInfo: data,
            },
          });
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export default {
  userInfoAction,
};
