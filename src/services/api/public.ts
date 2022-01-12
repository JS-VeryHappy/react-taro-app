import { postUploadFile } from '../handler';

export const publicUploadFile = (file: string, fileName: string, data?: any) => {
  return postUploadFile('/public/upload/file', file, fileName, data);
};
