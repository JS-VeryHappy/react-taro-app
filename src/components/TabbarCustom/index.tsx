import React, { useState } from 'react';
import { View, Text, Image } from '@tarojs/components';
import styles from './index.module.scss';
import Taro from '@tarojs/taro';
import indexOPng from '@/assets/icons/index-o.png';
import indexPng from '@/assets/icons/index.png';
import myOPng from '@/assets/icons/my-o.png';
import myPng from '@/assets/icons/my.png';

declare type AuthCustomType = {
  /**
   * 被选中的高亮
   */
  pageCur?: 'home' | 'my';
};

const TabbarCustom = (Props: AuthCustomType) => {
  const { pageCur = 'home' } = Props;

  const handlerClick = (page: any) => {
    Taro.switchTab({
      url: page,
    });
  };

  return (
    <View className={`${styles.tabbarCustom}`}>
      <View className={`${styles.tabbar} shadow `}>
        <View
          className={`${styles.item} ${pageCur === 'home' ? styles.active : ''}`}
          onClick={handlerClick.bind(null, '/pages/index/index')}
        >
          <Image className={styles.icon} src={indexPng} />
          <Image className={styles['focus-icon']} src={indexOPng} />
          <Text className={styles.label}>首页</Text>
        </View>

        <View
          className={`${styles.item} ${pageCur === 'my' ? styles.active : ''}`}
          onClick={handlerClick.bind(null, '/pages/my/index')}
        >
          <Image className={styles.icon} src={myPng} />
          <Image className={styles['focus-icon']} src={myOPng} />
          <Text className={styles.label}>我的</Text>
        </View>
      </View>
    </View>
  );
};

export default TabbarCustom;
