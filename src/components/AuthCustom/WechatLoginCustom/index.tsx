import React from 'react';
import { View } from '@tarojs/components';
import styles from './index.module.scss';
import { useSelector } from 'react-redux';

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

const WechatLoginCustom = (Props: AuthCustomType) => {
  const handlerClick = (e: any) => {
    console.log('====================================');
    console.log(e);
    console.log('====================================');
  };
  return (
    <View className={styles.wechatLoginCustom} onClick={handlerClick}>
      cxxxx
    </View>
  );
};

export default WechatLoginCustom;
