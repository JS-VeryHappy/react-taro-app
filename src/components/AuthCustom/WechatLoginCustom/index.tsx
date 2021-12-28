import React from 'react';
import { View, OpenData } from '@tarojs/components';
import styles from './index.module.scss';
import { AtButton } from 'taro-ui';
import Taro from '@tarojs/taro';
import { miniprogramLogin } from '@/services/api/miniprogram';
import { setToken } from '@/utils/storage';
import { userInfoAction } from '@/store/action';
import { useDispatch } from 'react-redux';

declare type WechatLoginCustomType = {
  /**
   * 遮罩被点击
   */
  modelClick?: () => void;
};

const WechatLoginCustom = (Props: WechatLoginCustomType) => {
  const dispatch = useDispatch();
  const { modelClick } = Props;
  const handlerClick = (e: any) => {
    if (typeof modelClick === 'function') {
      modelClick();
    }
  };
  const handle = (e: any) => {
    e.stopPropagation();
  };

  const getUserProfile = async (e: any) => {
    const userProfile = e.detail;
    // const userProfile: any = await Taro.getUserProfile({
    //   desc: '完善用户资料',
    // });
    if (userProfile.errMsg !== 'getPhoneNumber:ok') {
      Taro.showToast({
        title: '授权失败',
        icon: 'none',
        duration: 2000,
      });
      return;
    }

    miniprogramLogin({
      iv: userProfile.iv,
      encryptedData: userProfile.encryptedData,
    })
      .then((res) => {
        setToken(res.data.token);
        dispatch(userInfoAction(res.data.user));
      })
      .catch((err: any) => {});
  };

  return (
    <View className={styles.wechatLoginCustom} onClick={handlerClick}>
      <View className={`${styles.content}`} onClick={handle}>
        <View className={styles['content-intro']}>
          <View className={styles['content-intro-img']}>
            <OpenData type="userAvatarUrl" />
          </View>
          <View className={styles['content-intro-tips']}>
            <OpenData type="userNickName" />
          </View>
        </View>
        <View className={styles['content-bottom']}>
          <AtButton
            type="primary"
            size="small"
            openType="getPhoneNumber"
            circle
            ripple-bg-color="#EC5959"
            onGetPhoneNumber={getUserProfile}
          >
            微信一键登录
          </AtButton>
        </View>
        <View className={styles['content-agree']}>授权登录即表示已阅读并同意《隐私协议》</View>
      </View>
    </View>
  );
};

export default WechatLoginCustom;
