import React, { useRef } from 'react';
import { View } from '@tarojs/components';
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
        rules: [
          { required: true, message: '请填写手机' },
          // 验证规则 可以使用utils/validator.ts
          { type: 'isNumeric', message: '格式错误' },
        ],
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
      <View className={styles.wrapper}>
        <FormCustom columns={columns} formRef={formCustomRef} onSubmit={onSubmit} />
      </View>
    </>
  );
};

export default Index;
