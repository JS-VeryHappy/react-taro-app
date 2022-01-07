import React, { useEffect, useState, useRef } from 'react';
import type { FormCustomType, ColumnsType, FormCustomRefType, RulesType } from './types';
import { Form, Cell, Button, Field } from '@taroify/core';
import { View } from '@tarojs/components';
import './index.scss';
import * as components from './components';
import { validateRules } from './validation';
import Taro from '@tarojs/taro';

declare type newColumnsType = ColumnsType & {
  componentProps?: any;
};

const FormCustom = (Props: FormCustomType) => {
  const [formData, setFormData] = useState<any>(null);
  const [formRules, setFormRules] = useState<Record<string, RulesType[]>>();
  const [formColumns, setFormColumns] = useState<any>();
  const { columns, initialValues, onValueChange, formRef, onSubmit } = Props;

  const validateValues = async (values: any) => {
    const promises: any = [];
    Object.keys(values).forEach((field: any) => {
      let rules: any = [];
      if (formRules) {
        rules = formRules[field];
      }
      const promise: any = validateRules(formData[field], rules);

      promises.push(promise);
    });

    return new Promise(async (resolve, reject) => {
      try {
        const res = await Promise.all(promises);
        const errors: any = [];
        res.forEach((item: any) => {
          if (typeof item !== 'string') {
            item.forEach((i: any) => {
              errors.push(i);
            });
          } else {
            errors.push(item);
          }
        });
        if (errors.length > 0) {
          reject(errors);
        } else {
          resolve(true);
        }
      } catch (error) {
        reject(['未知错误']);
      }
    });
  };

  const onFormSubmit = async () => {
    try {
      await validateValues(formData);
      if (typeof onSubmit === 'function') {
        onSubmit(formData);
      }
    } catch (error: any) {
      Taro.showToast({ title: error[0], icon: 'none', duration: 2000 });
    }
  };

  useEffect(() => {
    if (columns && columns.length > 0) {
      let newFormRules: any = {};
      const newColumns: any = [];
      let newFormData: any = {};

      columns.map((item: ColumnsType) => {
        const newColumn: any = { ...item };
        // 设置初始值
        newFormData = {
          ...newFormData,
          [`${newColumn.dataIndex}`]: null,
        };
        // cell属性值处理
        const cellProps: any = {
          title: item.title,
          align: 'start',
          size: 'large',
        };
        if (newColumn.cellProps) {
          const { rules, ...cellRest } = newColumn.cellProps;
          let hasRequired = false;
          // 查看是否限制*号
          if (rules && rules.find((i: any) => i.required === true)) {
            hasRequired = true;
          }
          newColumn.cellProps = { ...cellProps, required: hasRequired, ...cellRest };

          newFormRules = {
            ...newFormRules,
            [`${newColumn.dataIndex}`]: rules,
          };
        }

        // 子组件属性处理
        let componentProps = {
          placeholder: `请输入${newColumn.title}`,
        };
        if (newColumn.fieldProps) {
          componentProps = { ...componentProps, ...newColumn.fieldProps };
        }
        newColumn.componentProps = componentProps;

        newColumns.push(newColumn);
      });

      setFormColumns(newColumns);
      setFormRules(newFormRules);
      // 如果有传递初始值默认复制 否者全部设置为null
      if (initialValues) {
        setFormData(initialValues);
      } else {
        setFormData(newFormData);
      }
    }

    if (formRef) {
      formRef.current = {
        getFieldsValue: (name: string | string[]) => {
          if (typeof name === 'string') {
            return {
              [`${name}`]: formData[name],
            };
          }

          const fieldsValue = {};
          name.forEach((item: any) => {
            fieldsValue[item] = formData[item];
          });

          return fieldsValue;
        },
        setFieldsValue: (params: any) => {
          const nowFormData = { ...formData };
          setFormData({
            ...nowFormData,
            ...params,
          });
        },
        validateFields: async (name: string | string[]) => {
          const fieldsValue = {};
          if (typeof name === 'string') {
            fieldsValue[name] = formData[name];
          } else {
            name.forEach((item: any) => {
              fieldsValue[item] = formData[item];
            });
          }
          try {
            await validateValues(fieldsValue);
            return true;
          } catch (error: any) {
            return error;
          }
        },
        resetFieldsValue: () => {
          setFormData(initialValues);
        },
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [columns]);

  if (!formData) {
    return null;
  }

  return (
    <View className="form-custom">
      {formColumns?.map((item: newColumnsType, index) => {
        if (item.ValueType === 'CellGroup') {
          return <Cell.Group key={`${index + 1}-CellGroup`} inset {...item} />;
        }
        const { componentProps, cellProps, dataIndex, ValueType } = item || {};
        const { rules, ...cellRest } = cellProps || {};
        // 渲染表单组件
        const Component = components[ValueType];

        const value = formData[dataIndex] || null;

        const onChange = (changeValue: any) => {
          const nowFormData = { ...formData };
          setFormData({
            ...nowFormData,
            [`${dataIndex}`]: changeValue,
          });
          // 如果有监听值变黄
          if (typeof onValueChange === 'function') {
            onValueChange({
              [`${dataIndex}`]: changeValue,
            });
          }
        };

        return (
          <Cell key={dataIndex} {...cellRest}>
            <Component value={value} onChange={onChange} {...componentProps} />
          </Cell>
        );
      })}

      <View style={{ margin: '16px' }}>
        <Button shape="round" block color="primary" formType="submit" onClick={onFormSubmit}>
          提交
        </Button>
      </View>
    </View>
  );
};

export default FormCustom;
