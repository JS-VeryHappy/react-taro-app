import { postBody } from '../handler';

export const miniprogramLogin = (data: any) => {
  return postBody('/miniprogram/login', data);
};
export const miniprogramEncryptor = (data: any) => {
  return postBody('/miniprogram/encryptor', data);
};
export const miniprogramStart = (data: any, options: any) => {
  return postBody('/miniprogram/start', data, options);
};
