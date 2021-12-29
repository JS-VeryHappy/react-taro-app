import { postBody } from '../handler';

export const authIsLogin = () => {
  return postBody('/auth/isLogin', {}, { autoLoading: false });
};
export const authLogin = (data: any) => {
  return postBody('/auth/login', data);
};
