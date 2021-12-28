var jweixin = require('jweixin-module');
import { h5ShareConfig } from '@/http/api';

/**
 * 微信sdk相关封装
 * @param Vue
 * @param vm
 */
const install = (Vue, vm) => {
  //判断是否在微信中
  const isWechat = () => {
    // @ts-ignore
    const ua = window.navigator.userAgent.toLowerCase();
    // @ts-ignore
    if (ua.match(/micromessenger/i) == 'micromessenger') {
      return true;
    } else {
      return false;
    }
  };
  //初始化sdk配置
  const initJssdk = (callback: any, url: string) => {
    //服务端进行签名 ，可使用uni.request替换。 签名算法请看文档
    h5ShareConfig({
      url: window.location.href,
    }).then((res) => {
      if (res.data.scalar) {
        jweixin.config(JSON.parse(res.data.scalar));
        //配置完成后，再执行分享等功能
        if (callback) {
          callback(res.data);
        }
      }
    });
  };
  //在需要自定义分享的页面中调用
  const share = (data, surl) => {
    const url = surl ? surl : window.location.href;

    //每次都需要重新初始化配置，才可以进行分享
    initJssdk((signData: any) => {
      jweixin.ready(() => {
        const shareData = {
          title: data.title || '',
          desc: data.desc || '',
          link: url,
          imgUrl: data.img || '',
          success: function (res: any) {
            //用户点击分享后的回调，这里可以进行统计，例如分享送金币之类的
            console.log('分享成功');
          },
          cancel: function (res: any) {},
        };
        //分享给朋友接口
        jweixin.onMenuShareAppMessage(shareData);
        //分享到朋友圈接口
        jweixin.onMenuShareTimeline(shareData);
      });
    }, url);
  };
  if (isWechat()) {
    Vue.prototype.$wechat = {
      isWechat,
      initJssdk,
      share,
    };
  }
};

export default {
  install,
};
