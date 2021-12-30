import Taro from '@tarojs/taro';
import { convertObjToUrl } from '@/utils';
import { MD5 } from 'crypto-js';
import { getOpenId, getToken } from '@/utils/storage';
import { removeToken } from '@/utils/storage';
import { Store } from '@/store';
import { clearUserInfoAction } from '@/store/action';

declare type optionsTypes = {
  /**
   * body传递参数
   */
  data?: object;
  /**
   * query 传递参数
   */
  params?: object;
  /**
   * 是否错误提示
   * @default true
   */
  errorMessageShow?: boolean;
  /**
   * 是否请求自动显示loading
   * @default false
   */
  autoLoading?: boolean;

  [propName: string]: any;
};

export const responseConfig = {
  data: 'data', // 存放数据字段
  success: 0, // 判断成功值
  code: 'code', // 错误码字段
  message: 'msg', // 返回信息字段
};

export const responseTableConfig = {
  data: 'data', // 表格数据列表字段名称
  total: 'total', // 表格数据列表总数字段名称
};

const httpError = (http: any, errorMessageShow: boolean) => {
  const httpErrorMsg = {
    500: '服务器错误',
    401: '登陆失效',
    404: '数据不存在',
    403: '权限不足',
    503: '服务器维护中',
  };
  const message = httpErrorMsg[http.statusCode] || '未知错误';

  if (http.statusCode == 401) {
    removeToken();
    // @ts-ignore
    Store.dispatch(clearUserInfoAction());
  }
  if (errorMessageShow) {
    Taro.showToast({ title: message, icon: 'none', duration: 2000 });
  }
};

const codeError = (data: any, errorMessageShow: boolean) => {
  const codeErrorMsg = {
    10000: '系统错误',
  };
  let message = '未知错误';

  if (data[responseConfig.code]) {
    message = codeErrorMsg[data[responseConfig.code]] || data[responseConfig.message];
  }

  if (errorMessageShow) {
    Taro.showToast({ title: message, icon: 'none', duration: 2000 });
  }
};

/**
 * 拦截器
 * @param chain
 * @returns
 */
const interceptor = function (chain: any) {
  const requestParams = chain.requestParams;

  const time: any = parseInt(new Date().getTime() / 1000 + '');
  const token: string = getToken();

  const header: any = {
    version: VERSION,
    sign: MD5(VERSION + time + SIGN_KEY).toString(),
    time: time,
  };
  if (getOpenId()) {
    header.openid = getOpenId();
  }
  if (token) {
    header.Authorization = `Bearer ${token}`;
  }
  return chain
    .proceed({
      ...requestParams,
      header: {
        ...requestParams.header,
        ...header,
      },
    })
    .then((res: any) => {
      return res;
    });
};
/**
 * 请求封装
 * @param url 接口地址
 * @param data 请求参数
 * @param options 配置
 * @returns Promise
 */
const request = (url: string, options?: optionsTypes) => {
  const { data, params, errorMessageShow = true, autoLoading = false, ...rest } = options || {};

  return new Promise<any>((resolve, reject) => {
    if (autoLoading) {
      Taro.showLoading({
        title: '数据请求中...',
        mask: true,
      });
    }
    let uri = url;
    if (params) {
      uri = convertObjToUrl(url, params);
    }
    Taro.addInterceptor(interceptor);

    Taro.request({
      url: API_URL + uri,
      data: data,
      ...rest,
      success: (res: any) => {
        if (autoLoading) {
          Taro.hideLoading();
        }
        if (res.statusCode === 200) {
          const { code } = res.data;
          if (code === 0) {
            resolve(res.data);
          } else {
            // 业务错误
            codeError(res.data, errorMessageShow);
            reject(res.data);
          }
        } else {
          // http码错误
          httpError(res, errorMessageShow);
          reject(res);
        }
      },
      fail(err: any) {
        if (autoLoading) {
          Taro.hideLoading();
        }
        if (Taro.getEnv() === 'WEB') {
          httpError(
            {
              statusCode: err.status,
            },
            errorMessageShow,
          );
        } else {
          Taro.showToast({
            title: '服务器连接异常，请稍后重试或联系我们！',
            icon: 'none',
            duration: 2000,
          });
        }
        reject(err);
      },
      complete() {},
    });
  });
};

export default request;
