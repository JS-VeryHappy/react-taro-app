import React, { useState } from 'react';
import { View } from '@tarojs/components';
import DialogOpenCustom from '@/components/DialogCustom/DialogOpenCustom';
import { Cell } from '@taroify/core';
import { ArrowRight } from '@taroify/icons';

import styles from './index.module.scss';

const Index = () => {
  const [open, setOpen] = useState(false);

  const onOk = () => {
    setOpen(false);
    console.log('====================================');
    console.log('点击确认');
    console.log('====================================');
  };

  const onCancel = () => {
    setOpen(false);
    console.log('====================================');
    console.log('点击取消');
    console.log('====================================');
  };

  return (
    <>
      <View className={styles.wrapper}>
        <Cell
          title="提示弹窗"
          clickable
          bordered
          rightIcon={<ArrowRight />}
          onClick={() => setOpen(true)}
        />
      </View>
      <DialogOpenCustom
        open={open}
        title="提示弹窗"
        content="说点什么"
        onOk={onOk}
        onCancel={onCancel}
      />
    </>
  );
};

export default Index;
