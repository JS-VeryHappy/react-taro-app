import React, { useEffect } from 'react';
import { View, Text } from '@tarojs/components';
import { AtButton } from 'taro-ui';
import AuthCustom from '@/components/AuthCustom';

import styles from './index.module.scss';

const Index = () => {
  const handlerClick = (event: any) => {
    console.log('====================================');
    console.log(event);
    console.log('====================================');
  };
  return (
    <View className={styles.wrapper}>
      <Text className={styles.title}>为Taro而设计的Hooks Library</Text>
      <AuthCustom>
        <AtButton type="primary" size="small" onClick={handlerClick}>
          获取用户信息
        </AtButton>
      </AuthCustom>
    </View>
  );
};

export default Index;
