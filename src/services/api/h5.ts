import { postBody } from '../handler';

export const h5Login = (data: any) => {
  return postBody('/h5/login', data);
};
export const h5ShareConfig = (data: any) => {
  return postBody('/h5/shareConfig', data);
};
