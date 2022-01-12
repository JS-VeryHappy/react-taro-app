import React, { useRef } from 'react';
import { View } from '@tarojs/components';
import FormCustom from '@/components/FormCustom';
import type { ColumnsType, FormCustomRefType, OptionsType } from '@/components/FormCustom/types';
import { authLogin, lists } from '@/services/api/user';

import styles from './index.module.scss';

/**
 * 表单组件高级使用
 * 设置表单字段，远侧获取赋值表单默认值，监听数据变化
 * 赋值和提交前钩子改变数据，配置请求地址自动请求，监听请求结构处理业务逻辑
 */
const FormCustomDemo2 = () => {
  const formCustomRef = useRef<FormCustomRefType>();

  const options: OptionsType[] = [
    {
      label: '数值1',
      value: 1,
      disabled: true,
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
      title: '日期',
      dataIndex: 'date',
      ValueType: 'DatetimePickerCustom',
      fieldProps: {
        placeholder: '请选择日期',
        datetimePickerType: 'date',
      },
    },
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
    {
      title: '图片',
      dataIndex: 'imgs',
      ValueType: 'UploaderCustom',
      fieldProps: {
        placeholder: '请选择图片',
        maxFiles: 3,
      },
    },
  ];

  const onValueChange = (values: any, config: any) => {
    console.log('表单数据变换钩子');
    console.log(values, config, formCustomRef);
  };

  const initialValuesBefor = (initialValues: any) => {
    console.log('表单赋值前钩子');
    return initialValues;
  };
  const submitValuesBefor = (fromData: any) => {
    console.log('表单提交前钩子');
    return fromData;
  };
  const submitOnDone = (params: any) => {
    console.log('表单提交完成钩子');
    console.log(params);
    // ...处理业务逻辑
  };
  return (
    <>
      <View className={styles.wrapper}>
        <FormCustom
          columns={columns}
          formRef={formCustomRef}
          initialValuesRequest={lists}
          initialValuesRequestParams={{ id: 1 }}
          initialValuesBefor={initialValuesBefor}
          onValueChange={onValueChange}
          submitValuesBefor={submitValuesBefor}
          submitRequest={authLogin}
          submitOnDone={submitOnDone}
        />
      </View>
    </>
  );
};

export default FormCustomDemo2;
