import React, { useEffect, useState, useRef } from 'react';
import type { FormCustomType, ColumnsType, RulesType, FormCustomRefType } from './types';
import { Cell, Button } from '@taroify/core';
import { View } from '@tarojs/components';
import './index.scss';
import * as components from './components';
import { validateRules } from './validation';
import Taro from '@tarojs/taro';
import { ArrowRight } from '@taroify/icons';
import { deepCopy } from '@/utils';
import { responseConfig } from '@/services/config';

declare type newColumnsType = ColumnsType & {
  componentProps?: any;
};

const FormCustom = (Props: FormCustomType) => {
  const [formData, setFormData] = useState<any>(null);
  const [formRules, setFormRules] = useState<Record<string, RulesType[]>>();
  const [formColumns, setFormColumns] = useState<any>();
  const [oldFormColumns, setOldFormColumns] = useState<any>();
  const customFormRef = useRef<FormCustomRefType>();

  const {
    initialValues,
    initialValuesRequest,
    initialValuesRequestParams,
    initialValuesBefor,
    submitValuesBefor,
    submitRequest,
    submitOnDone,
    columnBefor,
    columns,
    onValueChange,
    formRef,
    onSubmit,
  } = Props;

  const validateValues = async (values: any) => {
    const promises: any = [];
    Object.keys(values).forEach((field: any) => {
      let rules: any = [];
      if (formRules) {
        rules = formRules[field];
      }
      if (rules) {
        const promise: any = validateRules(formData[field], rules);
        promises.push(promise);
      }
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
        reject(['????????????']);
      }
    });
  };

  const onFormSubmit = async () => {
    try {
      let submitFormData = { ...formData };

      await validateValues(submitFormData);

      if (typeof submitValuesBefor === 'function') {
        submitFormData = submitValuesBefor(submitFormData);
      }

      // ???????????????????????????
      if (submitRequest) {
        try {
          const result = await submitRequest(submitFormData);
          // ????????????????????????
          if (submitOnDone) {
            submitOnDone({
              status: 'success',
              result,
              formData: submitFormData,
              formRef: customFormRef,
            });
          }
          return true;
        } catch (error) {
          if (submitOnDone) {
            submitOnDone({
              status: 'error',
              result: error,
              formData: submitFormData,
              formRef: customFormRef,
            });
          }
          return false;
        }
      }

      if (typeof onSubmit === 'function') {
        onSubmit(submitFormData);
      }
    } catch (error: any) {
      Taro.showToast({ title: error[0], icon: 'none', duration: 2000 });
    }
  };

  const customFn = {
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

  useEffect(() => {
    let newinitialValues: any = {};

    if (columns && columns.length > 0) {
      let newFormRules: any = {};
      let newColumns: any = [];
      let newFormData: any = {};

      columns.map((item: ColumnsType) => {
        const newColumn: any = { ...item };
        // ???????????????
        newFormData = {
          ...newFormData,
          [`${newColumn.dataIndex}`]: null,
        };
        // cell???????????????
        const cellProps: any = {
          title: item.title,
          align: 'start',
          size: 'large',
        };

        // ??????????????????????????????
        const rightIcon = ['SelectCustom', 'DatetimePickerCustom'];
        if (rightIcon.includes(newColumn.ValueType)) {
          cellProps.clickable = true;
          cellProps.rightIcon = <ArrowRight />;
        } else {
          cellProps.rightIcon = <ArrowRight style={{ position: 'relative', zIndex: -1 }} />;
        }

        if (newColumn.cellProps) {
          const { rules, ...cellRest } = newColumn.cellProps;
          let hasRequired = false;
          // ??????????????????*???
          if (rules && rules.find((i: any) => i.required === true)) {
            hasRequired = true;
          }
          newColumn.cellProps = { ...cellProps, required: hasRequired, ...cellRest };

          newFormRules = {
            ...newFormRules,
            [`${newColumn.dataIndex}`]: rules,
          };
        } else {
          newColumn.cellProps = { ...cellProps };
        }

        // ?????????????????????
        let componentProps = {
          placeholder: `?????????${newColumn.title}`,
        };
        if (newColumn.fieldProps) {
          componentProps = { ...componentProps, ...newColumn.fieldProps };
        }
        newColumn.componentProps = componentProps;

        newColumns.push(newColumn);
      });

      setOldFormColumns(newColumns);

      // ???????????????????????????????????????
      if (typeof columnBefor === 'function') {
        const deepColumn = deepCopy(newColumns);
        newColumns = columnBefor(deepColumn, initialValues);
      }

      setFormColumns(newColumns);
      setFormRules(newFormRules);

      if (initialValuesRequest) {
        (async () => {
          try {
            const requestParams = { ...initialValuesRequestParams };

            const data = await initialValuesRequest(requestParams);

            if (
              data[responseConfig.code] !== undefined &&
              data[responseConfig.message] &&
              data[responseConfig.data]
            ) {
              newinitialValues = data.data;
            } else {
              newinitialValues = data;
            }
            // ????????????????????????????????????????????????
            if (initialValuesBefor) {
              newinitialValues = initialValuesBefor(newinitialValues);
            }

            setFormData(newinitialValues);
          } catch (error) {}
        })();
      } else {
        // ???????????????????????????????????? ?????????????????????null
        if (initialValues) {
          newinitialValues = { ...initialValues };
        } else {
          newinitialValues = { ...newFormData };
        }

        // ????????????????????????????????????????????????
        if (initialValuesBefor) {
          newinitialValues = initialValuesBefor(newinitialValues);
        }

        setFormData(newinitialValues);
      }
    }
    customFormRef.current = customFn;
    if (formRef) {
      formRef.current = customFn;
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
        // ??????????????????
        const Component = components[ValueType];

        const value = formData[dataIndex] || null;

        const onChange = (changeValue: any) => {
          const nowFormData = { ...formData };
          setFormData({
            ...nowFormData,
            [`${dataIndex}`]: changeValue,
          });
          // ????????????????????????
          if (typeof onValueChange === 'function') {
            onValueChange(
              {
                [`${dataIndex}`]: changeValue,
              },
              {
                oldFormColumns,
                formColumns,
                setFormColumns,
                customFormRef,
                formData,
              },
            );
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
          ??????
        </Button>
      </View>
    </View>
  );
};

export default FormCustom;
