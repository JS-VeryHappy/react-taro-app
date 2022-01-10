import React, { useState, useEffect } from 'react';
import type { ComponentsPropsType, OptionsType } from './../types';
import { Input, Popup, Picker } from '@taroify/core';
import { View } from '@tarojs/components';
import { deepCopy } from '@/utils';
import { Success } from '@taroify/icons';
import Taro from '@tarojs/taro';

const SelectCustom = (Props: ComponentsPropsType) => {
  const [open, setOpen] = useState<boolean>(false);
  const [valueName, setValueName] = useState<any>();
  const [defaultValue, setDefaultValue] = useState<any>();
  const [defaultOptions, setDefaultOptions] = useState<any>([]);
  const [multipleValue, setMultipleValue] = useState<any>([]);

  const { value, onChange, options, multiple = false, multipleLength = 3, ...rest } = Props;

  const nowOnChange = (newValue: any) => {
    if (typeof onChange === 'function') {
      onChange(newValue);
    }
  };
  useEffect(() => {
    if (!value) {
      return;
    }
    let defaultValues: OptionsType[] = [];
    if (multiple) {
      defaultValues = value;
    } else {
      defaultValues = [value];
    }
    setDefaultValue(defaultValues);
    setMultipleValue(defaultValues);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!value) {
      return;
    }
    if (multiple) {
      const labels: any = [];
      value.forEach((c: any) => {
        const has = options?.find((i: any) => i.value === c);
        if (has) {
          labels.push(has.label);
        }
      });
      setValueName(labels.join('、'));
    } else {
      const has = options?.find((i: any) => i.value === value);
      if (has) {
        setValueName(has.label);
      }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value, options]);

  useEffect(() => {
    setDefaultOptions(deepCopy(options));
  }, [options]);

  const multipleOnClick = (item: OptionsType) => {
    if (item.disabled) {
      return;
    }
    const newMultipleValue: any = [...multipleValue];
    if (newMultipleValue.includes(item.value)) {
      const index = newMultipleValue.findIndex((i: any) => i === item.value);
      newMultipleValue.splice(index, 1);
    } else {
      if (newMultipleValue.length >= multipleLength) {
        Taro.showToast({ title: `最多选择${multipleLength}项`, icon: 'none', duration: 2000 });
        return;
      }
      newMultipleValue.push(item.value);
    }
    setMultipleValue(newMultipleValue);
  };

  const multipleConfirm = () => {
    if (typeof onChange === 'function') {
      onChange(multipleValue);
    }
    setOpen(false);
  };
  return (
    <>
      <Input readonly value={valueName} {...rest} onClick={() => setOpen(true)} />
      <Popup mountOnEnter={false} open={open} rounded placement="bottom" onClose={setOpen}>
        {multiple ? (
          <View className="picker-custom-multiple">
            <View className="picker-custom-multiple-handlers">
              <View className="btn cancel" onClick={() => setOpen(false)}>
                取消
              </View>
              <View className="btn confirm" onClick={multipleConfirm}>
                确认
              </View>
            </View>
            <View className="picker-custom-multiple-columns">
              {defaultOptions.map((item: any) => {
                const { disabled = false } = item;
                return (
                  <View
                    key={item.value}
                    className={`picker-custom-multiple-columns-item ${
                      multipleValue && multipleValue.includes(item.value) ? 'is-selected' : ''
                    } ${disabled ? 'is-disabled' : ''}`}
                    onClick={() => multipleOnClick(item)}
                  >
                    <View className="label"> {item.label}</View>
                    {multipleValue.includes(item.value) && (
                      <View className="icon">
                        <Success />
                      </View>
                    )}
                  </View>
                );
              })}
            </View>
          </View>
        ) : (
          <Picker
            defaultValue={defaultValue}
            onCancel={() => setOpen(false)}
            onConfirm={(newValue) => {
              nowOnChange(newValue[0]);
              setOpen(false);
            }}
          >
            <Picker.Toolbar>
              <Picker.Button>取消</Picker.Button>
              <Picker.Button>确认</Picker.Button>
            </Picker.Toolbar>
            {defaultOptions.length > 0 && (
              <Picker.Column>
                {defaultOptions.map((item: any) => {
                  const { disabled = false } = item;
                  return (
                    <Picker.Option value={item.value} key={item.value} disabled={disabled}>
                      {item.label}
                    </Picker.Option>
                  );
                })}
              </Picker.Column>
            )}
          </Picker>
        )}
      </Popup>
    </>
  );
};

export default SelectCustom;
