import React, { useState } from 'react';
import styles from './index.module.scss';
import Taro from '@tarojs/taro';
import { AtNavBar } from 'taro-ui';
import { View } from '@tarojs/components';

declare type NavBarCustomType = {
  /**
   * 链接文字跟图标颜色，不包括标题
   * @default #6190E8
   */
  color?: string;
  /**
   * 标题文字
   */
  title?: string;
  /**
   * 左边文字
   */
  leftText?: string;
  /**
   * 左边图标类型，图标类型请看
   * @default chevron-left
   */
  leftIconType?: string;
  /**
   * 是否固定顶部
   * @default true
   */
  fixed?: boolean;
  /**
   * 是否显示下划线
   * @default true
   */
  border?: boolean;
};

const NavBarCustom = (Props: NavBarCustomType) => {
  const {
    color = '#6190E8',
    title,
    leftText,
    leftIconType = 'chevron-left',
    fixed = true,
    border = true,
  } = Props;
  const handleClick = (type: string) => {
    if (type === 'LeftIcon') {
      Taro.navigateBack();
    }
  };
  return (
    <>
      <AtNavBar
        className={`${styles.navBarCustom}`}
        onClickRgIconSt={handleClick.bind(null, 'LeftIcon')}
        onClickRgIconNd={handleClick.bind(null, 'RgIconSt')}
        onClickLeftIcon={handleClick.bind(null, 'RgIconNd')}
        color={color}
        title={title}
        leftText={leftText}
        fixed={fixed}
        border={border}
        leftIconType={leftIconType}
      />
      {fixed && <View className={styles.emptyBlock}> </View>}
    </>
  );
};

export default NavBarCustom;
