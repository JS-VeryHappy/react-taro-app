import React, { useEffect } from 'react';
import { View, Text } from '@tarojs/components';
import { miniprogramLogin } from '@/services/api/user';

import styles from './index.module.scss';

const Index = () => {
  useEffect(() => {
    miniprogramLogin({
      a: 1,
    })
      .then((res: any) => {
        console.log(res);
      })
      .catch((err: any) => {
        console.log(err);
      });
  }, []);

  return (
    <View className={styles.wrapper}>
      <Text className={styles.title}>为Taro而设计的Hooks Library</Text>
      <Text className={styles.desc}>
        目前覆盖70%官方API. 抹平部分API在H5端短板. 提供近40+Hooks! 并结合ahook适配Taro!
      </Text>
    </View>
  );
};

export default Index;
