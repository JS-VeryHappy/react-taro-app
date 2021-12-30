import React, { useState } from 'react';
import Taro from '@tarojs/taro';
import { FriendsOutlined, HomeOutlined, Search, SettingOutlined } from '@taroify/icons';
import { Tabbar } from '@taroify/core';

declare type AuthCustomType = {
  /**
   * 被选中的高亮
   */
  pageCur?: 'home' | 'my';
};

const TabbarCustom = (Props: AuthCustomType) => {
  const { pageCur = 'home' } = Props;

  const handlerClick = (value: any) => {
    let page = '/pages/index/index';
    if (value === 'my') {
      page = '/pages/my/index';
    }
    Taro.switchTab({
      url: page,
    });
  };

  return (
    <>
      <Tabbar
        defaultValue={pageCur}
        bordered={true}
        fixed={true}
        placeholder={true}
        onChange={handlerClick}
      >
        <Tabbar.TabItem value="home" icon={<HomeOutlined />}>
          首页
        </Tabbar.TabItem>
        <Tabbar.TabItem value="2" icon={<Search />}>
          标签
        </Tabbar.TabItem>
        <Tabbar.TabItem value="3" icon={<FriendsOutlined />}>
          标签
        </Tabbar.TabItem>
        <Tabbar.TabItem value="my" icon={<SettingOutlined />}>
          我的
        </Tabbar.TabItem>
      </Tabbar>
    </>
  );
};

export default TabbarCustom;
