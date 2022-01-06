import React from 'react';
import { View, Text } from '@tarojs/components';
import AuthCustom from '@/components/AuthCustom';
import styles from './index.module.scss';
import { Button } from '@taroify/core';

/**
 * 用户点击 按钮等 需要先授权然后才能点击
 * @returns
 */
const AuthCustomDemo1 = () => {
  const handlerClick = (event: any) => {
    console.log('====================================');
    console.log(event);
    console.log('====================================');
  };

  return (
    <>
      <View className={styles.wrapper}>
        <Text className={styles.title}>为Taro而设计的Hooks Library</Text>
        <AuthCustom>
          <Button color="primary" size="small" block onClick={handlerClick}>
            获取用户信息
          </Button>
        </AuthCustom>
      </View>
    </>
  );
};

export default AuthCustomDemo1;
