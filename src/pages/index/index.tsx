import React, { useState } from 'react';
import { View, Text } from '@tarojs/components';

import styles from './index.module.scss';

const Index = () => {
  const [a, setA] = useState(null);
  const d: any = {};
  d.dd = 2;
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
