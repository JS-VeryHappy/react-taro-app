import React, { useRef, useState } from 'react';
import { View, Text } from '@tarojs/components';
import TabbarCustom from '@/components/TabbarCustom';
import NavBarCustom from '@/components/NavBarCustom';
import FormCustom from '@/components/FormCustom';
import type { ColumnsType, FormCustomRefType } from '@/components/FormCustom/types';

import styles from './index.module.scss';

const Index = () => {
  const formCustomRef = useRef<FormCustomRefType>();

  const columns: ColumnsType[] = [
    {
      title: '手机',
      dataIndex: 'phone',
      ValueType: 'InputCustom',
      fieldProps: {
        maxlength: 11,
        clearable: true,
      },
      cellProps: {
        rules: [{ required: true, message: '请填写手机' }],
      },
    },
    {
      title: '密码',
      dataIndex: 'passwrod',
      ValueType: 'InputCustom',
      fieldProps: {
        maxlength: 20,
        password: true,
        clearable: true,
      },
      cellProps: {
        rules: [{ required: true, message: '请填写密码' }],
      },
    },
  ];

  const onSubmit = (value: any) => {
    console.log('====================================');
    console.log(value);
    console.log('====================================');
  };

  return (
    <>
      <NavBarCustom title="首页" />
      <View className={styles.wrapper}>
        <FormCustom columns={columns} formRef={formCustomRef} onSubmit={onSubmit} />
      </View>
      <TabbarCustom />
    </>
  );
};

export default Index;
