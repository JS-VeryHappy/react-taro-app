import React from 'react';
import type { ComponentsPropsType } from './../types';
import { Input } from '@taroify/core';

const InputCustom = (Props: ComponentsPropsType) => {
  const { value, onChange, ...rest } = Props;

  const nowOnChange = (e: any) => {
    if (typeof onChange === 'function') {
      onChange(e.detail.value);
    }
  };
  return (
    <>
      <Input value={value} onChange={nowOnChange} {...rest} />
    </>
  );
};

export default InputCustom;
