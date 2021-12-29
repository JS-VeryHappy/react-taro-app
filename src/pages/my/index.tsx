import React, { useState } from 'react';
import { View, Text } from '@tarojs/components';
import TabbarCustom from '@/components/TabbarCustom';

const My = () => {
  return (
    <View>
      我的
      <TabbarCustom pageCur="my" />
    </View>
  );
};

export default My;
