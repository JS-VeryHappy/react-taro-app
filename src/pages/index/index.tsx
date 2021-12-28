import React, { useEffect } from 'react';
import { View, Text } from '@tarojs/components';
// import { miniprogramLogin } from '@/services/api/user';
import { AtButton } from 'taro-ui';
import AuthCustom from '@/components/AuthCustom';

import styles from './index.module.scss';

const Index = () => {
  useEffect(() => {}, []);

  return (
    <View className={styles.wrapper}>
      <Text className={styles.title}>为Taro而设计的Hooks Library</Text>
      <AuthCustom>
        <AtButton type="primary" size="small">
          获取用户信息
        </AtButton>
      </AuthCustom>
    </View>
  );
};

export default Index;
