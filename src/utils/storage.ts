import Taro from '@tarojs/taro';

/**
 *  设置传播人fromUid
 * @type {string}
 */
export const setFromUid = (fid: any, scenes: any = {}) => {
  let selfid = fid;
  if (!fid && scenes.fid) {
    selfid = scenes.fid;
  }
  if (!selfid) {
    return;
  }
  return Taro.setStorageSync('FROM_UID', selfid);
};

/**
 *  设置传播人fromUid
 * @type {string}
 */
export const getFromUid = () => {
  return Taro.getStorageSync('FROM_UID');
};

/**
 *  删除传播人fromUid
 * @type {string}
 */
export const removeFromUid = () => {
  return Taro.removeStorageSync('FROM_UID');
};

/**
 *  设置传播人fromUid
 * @type {string}
 */
export const setId = (id: any, scenes: any = {}) => {
  let selfid = id;
  if (!id && scenes.id) {
    selfid = scenes.id;
  }
  if (!selfid) {
    return;
  }
  return Taro.setStorageSync('ID', selfid);
};

/**
 *  设置传播人fromUid
 * @type {string}
 */
export const getId = () => {
  return Taro.getStorageSync('ID');
};

/**
 *  删除传播人fromUid
 * @type {string}
 */
export const removeId = () => {
  return Taro.removeStorageSync('ID');
};

/**
 *  设置小程序 进入场景值
 * @type {string}
 */
export const setScene = (scene: string) => {
  if (!scene) {
    return;
  }
  return Taro.setStorageSync('SCENE', scene);
};

/**
 *  设置用户本地openid
 * @type {string}
 */
export const setOpenId = (openid: string) => {
  if (!openid) {
    return;
  }
  return Taro.setStorageSync('OPENID', openid);
};

/**
 *  获取本地openid
 * @type {string}
 */
export const getOpenId = () => {
  return Taro.getStorageSync('OPENID');
};

/**
 *  设置用户本地token
 * @type {string}
 */
export const setToken = (token: string) => {
  if (!token) {
    return;
  }
  return Taro.setStorageSync('TOKEN', token);
};

/**
 *  获取本地openid
 * @type {string}
 */
export const getToken = () => {
  return Taro.getStorageSync('TOKEN');
};
