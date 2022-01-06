import React, { useEffect, useState } from 'react';
import { View, Text } from '@tarojs/components';
import TabbarCustom from '@/components/TabbarCustom';
import NavBarCustom from '@/components/NavBarCustom';
import FormCustom from '@/components/FormCustom';

import styles from './index.module.scss';

const Index = () => {
  return (
    <>
      <NavBarCustom title="首页" />
      <View className={styles.wrapper}>
        <FormCustom />
      </View>
      <TabbarCustom />
    </>
  );
};

export default Index;
