import React, { useState } from 'react';
import Taro from '@tarojs/taro';
import { Navbar } from '@taroify/core';

declare type NavBarCustomType = {
  /**
   * 标题文字
   */
  title?: string;
  /**
   * 左边文字
   */
  leftText?: string;

  /**
   * 是否固定顶部
   * @default true
   */
  fixed?: boolean;
  /**
   * 是否显示下划线
   * @default true
   */
  bordered?: boolean;
};

const NavBarCustom = (Props: NavBarCustomType) => {
  const { title, leftText, fixed = true, bordered = true } = Props;
  const handleClick = (type: string) => {
    if (type === 'left') {
      Taro.navigateBack();
    }
  };
  return (
    <>
      <Navbar fixed={fixed} bordered={bordered} placeholder={true}>
        <Navbar.NavLeft onClick={handleClick.bind(null, 'left')}>{leftText}</Navbar.NavLeft>
        <Navbar.Title>{title}</Navbar.Title>
        <Navbar.NavRight>按钮</Navbar.NavRight>
      </Navbar>
    </>
  );
};

export default NavBarCustom;
