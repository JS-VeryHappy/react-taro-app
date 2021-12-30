import { postBody } from '../handler';

export const authIsLogin = () => {
  return postBody('/auth/isLogin', {}, { autoLoading: false, errorMessageShow: false });
};
export const authLogin = (data: any) => {
  return postBody('/auth/login', data);
};

export const lists = (data: any) => {
  return postBody('/lists', data);
};
