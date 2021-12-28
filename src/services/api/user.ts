import { postBody } from '../handler';

export const authIsLogin = () => {
  return postBody('/auth/isLogin', {}, { autoLoading: false });
};
