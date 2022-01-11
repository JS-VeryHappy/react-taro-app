import React, { useState, useEffect } from 'react';
import type { ComponentsPropsType } from './../types';
import { DatetimePicker, Popup, Input } from '@taroify/core';
import moment from 'moment';

const DatetimePickerCustom = (Props: ComponentsPropsType) => {
  const {
    value,
    onChange,
    datetimePickerType = 'date',
    datetimePickerMinDate,
    datetimePickermaxDate,
    datetimeDefaultValue,
    datetimeShowFormat = 'YYYY-MM-DD',
    placeholder,
    ...rest
  } = Props;

  const [newValue, setNewValue] = useState<any>();
  const [open, setOpen] = useState<boolean>(false);

  useEffect(() => {
    if (value) {
      setNewValue(new Date(value));
    } else {
      if (datetimeDefaultValue) {
        setNewValue(new Date(datetimeDefaultValue));
      } else {
        setNewValue(new Date());
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  const nowOnChange = (nValue: any) => {
    if (typeof onChange === 'function') {
      onChange(moment(nValue).format('YYYY-MM-DD HH:mm:ss'));
    }
  };
  if (!newValue) {
    return null;
  }

  return (
    <>
      <Input
        readonly
        value={value ? moment(value).format(datetimeShowFormat) : ''}
        placeholder={placeholder}
        onClick={() => setOpen(true)}
      />
      <Popup mountOnEnter={false} open={open} rounded placement="bottom" onClose={setOpen}>
        <DatetimePicker
          {...rest}
          value={newValue}
          type={datetimePickerType}
          min={datetimePickerMinDate}
          max={datetimePickermaxDate}
          onCancel={() => setOpen(false)}
          onConfirm={(nValue) => {
            nowOnChange(nValue);
            setOpen(false);
          }}
        >
          <DatetimePicker.Toolbar>
            <DatetimePicker.Button>取消</DatetimePicker.Button>
            {/* <DatetimePicker.Title>选择年月</DatetimePicker.Title> */}
            <DatetimePicker.Button>确认</DatetimePicker.Button>
          </DatetimePicker.Toolbar>
        </DatetimePicker>
      </Popup>
    </>
  );
};

export default DatetimePickerCustom;
