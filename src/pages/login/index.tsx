import React, { useState } from 'react';
import { Cell, Field, Button } from '@taroify/core';
import { authLogin } from '@/services/api/user';
import { useDispatch } from 'react-redux';
import { userInfoAction } from '@/store/action';
import { setToken } from '@/utils/storage';
import Taro from '@tarojs/taro';

const Login = () => {
  const dispatch = useDispatch();
  const [from, setFrom] = useState<any>({});
  const onSubmit = () => {
    authLogin(from)
      .then((res: any) => {
        setToken(res.data.token);
        dispatch(userInfoAction(res.data.user));
        Taro.navigateBack();
      })
      .catch((err: any) => {});
  };

  const onValueChange = (name: any, value: any) => {
    const oldFrom = { ...from };
    setFrom({
      ...oldFrom,
      [name]: value,
    });
  };
  return (
    <>
      <Cell.Group inset>
        <Field
          clearable
          name="phone"
          label="账号"
          maxlength={11}
          placeholder="请输入电话"
          value={from.value}
          onChange={onValueChange.bind(null, 'phone')}
        />
        <Field
          clearable
          name="password"
          label="密码"
          type="password"
          maxlength={20}
          placeholder="请输入密码"
          value={from.value}
          onChange={onValueChange.bind(null, 'password')}
        />
        <Button color="primary" size="small" block formType="submit" onClick={onSubmit}>
          提交
        </Button>
      </Cell.Group>
    </>
  );
};

export default Login;
