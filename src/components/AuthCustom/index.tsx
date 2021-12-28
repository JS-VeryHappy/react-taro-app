import React from 'react';
import { View } from '@tarojs/components';
import styles from './index.module.scss';

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
  const { className } = Props;
  return (
    <View className={`${styles.authCustomWrapper} ${className ? className : ''}`}>
      {Props.children}
      <View className={styles.authModal} />
    </View>
  );
};

export default AuthCustom;
