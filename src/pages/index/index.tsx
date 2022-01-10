import React, { useRef, useState } from 'react';
import { View, Text } from '@tarojs/components';
import TabbarCustom from '@/components/TabbarCustom';
import NavBarCustom from '@/components/NavBarCustom';
import FormCustom from '@/components/FormCustom';
import type { ColumnsType, FormCustomRefType, OptionsType } from '@/components/FormCustom/types';

import styles from './index.module.scss';

const Index = () => {
  const formCustomRef = useRef<FormCustomRefType>();

  const options: OptionsType[] = [
    {
      label: '数值1',
      value: 1,
    },
    {
      label: '数值2',
      value: 2,
    },
    {
      label: '数值3',
      value: 3,
    },
    {
      label: '数值4',
      value: 4,
    },
    {
      label: '数值5',
      value: 5,
    },
    {
      label: '数值11',
      value: 11,
    },
    {
      label: '数值21',
      value: 21,
    },
    {
      label: '数值31',
      value: 31,
    },
    {
      label: '数值41',
      value: 41,
    },
    {
      label: '数值51',
      value: 51,
    },
  ];
  const columns: ColumnsType[] = [
    {
      title: '选择器(单选)',
      dataIndex: 'select1',
      ValueType: 'SelectCustom',
      fieldProps: {
        options: options,
        placeholder: '请选择单选',
      },
      cellProps: {
        rules: [{ required: true, message: '请选择单选' }],
      },
    },
    {
      title: '选择器(多选)',
      dataIndex: 'select2',
      ValueType: 'SelectCustom',
      fieldProps: {
        options: options,
        placeholder: '请选择多选',
        multiple: true,
      },
      cellProps: {
        rules: [{ required: true, message: '请选择多选' }],
      },
    },
    {
      title: '手机',
      dataIndex: 'phone',
      ValueType: 'InputCustom',
      fieldProps: {
        maxlength: 11,
        clearable: true,
      },
      cellProps: {
        rules: [
          { required: true, message: '请填写手机' },
          // { type: 'isTel', message: '电话格式错误' },
        ],
      },
    },
    {
      title: '密码',
      dataIndex: 'password',
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
        <FormCustom
          initialValues={{ select1: 1, select2: [1, 2, 3], phone: '12', password: 'asdasd' }}
          columns={columns}
          formRef={formCustomRef}
          onSubmit={onSubmit}
        />
      </View>
      <TabbarCustom />
    </>
  );
};

export default Index;
