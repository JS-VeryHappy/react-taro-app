import { postBody } from '../handler';

export const miniprogramLogin = (data: any) => {
  return postBody('/miniprogram/login', data);
};
