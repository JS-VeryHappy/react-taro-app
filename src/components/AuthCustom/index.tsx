import React from 'react';
import { View } from '@tarojs/components';
import styles from './index.module.scss';
import { useSelector } from 'react-redux';
import Taro from '@tarojs/taro';

declare type AuthCustomType = {
  /**
   * 需要限制权限的按钮或者内容
   */
  children: React.ReactNode;
  /**
   * 自定义的父级的className
   */
  className?: string;
};

const AuthCustom = (Props: AuthCustomType) => {
  const userInfo = useSelector<any>((state) => state.userInfo);

  const { className } = Props;
  const handlerClick = () => {
    if (Taro.getEnv() === 'WEAPP') {
    } else {
      Taro.navigateTo({
        url: '/pages/login/index',
      });
    }
  };
  return (
    <View className={`${styles.authCustomWrapper} ${className ? className : ''}`}>
      {Props.children}
      {!userInfo && <View className={styles.authModal} onClick={handlerClick} />}
    </View>
  );
};

export default AuthCustom;
