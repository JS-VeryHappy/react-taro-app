import React, { useState } from 'react';
import { View, Text } from '@tarojs/components';
import { AtForm, AtInput, AtButton } from 'taro-ui';
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
    <AtForm onSubmit={onSubmit}>
      <AtInput
        clear
        name="phone"
        title="账号"
        maxlength={11}
        type="phone"
        placeholder="请输入电话"
        value={from.value}
        onChange={onValueChange.bind(null, 'phone')}
      />
      <AtInput
        clear
        name="password"
        title="密码"
        type="password"
        maxlength={20}
        placeholder="请输入密码"
        value={from.value}
        onChange={onValueChange.bind(null, 'password')}
      />
      <AtButton type="primary" size="small" formType="submit">
        提交
      </AtButton>
      {/* <AtButton formType="reset">重置</AtButton> */}
    </AtForm>
  );
};

export default Login;
