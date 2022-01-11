import { postUploadFile } from '../handler';

export const publicUploadFile = (file: string, data?: any) => {
  return postUploadFile('/public/upload/file', file, data);
};
