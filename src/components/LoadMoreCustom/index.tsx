import React, { useState } from 'react';
import { View } from '@tarojs/components';
import styles from './index.module.scss';

declare type LoadMoreCustomType = {
  /**
   * 暂无数据的显示内容 如果有则显示传进来的
   */
  children?: React.ReactNode;
  /**
   * 当前列表的数据集合
   */
  data: [];
  /**
   * 状态对象
   */
  optionState: {
    /**
     * 是否结束分页加载
     */
    isEnd: boolean;
    /**
     * 是否在加载中
     */
    isLoading: boolean;
  };
  /**
   * more 状态显示文案
   * @default 查看更多
   */
  moreText?: string;
  /**
   * loading 状态显示文案
   * @default 加载中
   */
  loadingText?: string;
  /**
   * noMore 状态显示文案
   * @default 没有更多
   */
  noMoreText?: string;
  /**
   * 没有数据 状态显示文案
   * @default 暂无数据
   */
  noDataText?: string;
};

const LoadMoreCustom = (Props: LoadMoreCustomType) => {
  const {
    data,
    optionState,
    children,
    moreText = '继续上拉，加载更多',
    loadingText = '正在加载更多...',
    noMoreText = '没有更多了',
    noDataText = '暂无数据',
  } = Props;

  return (
    <>
      {optionState.isEnd && data.length === 0 ? (
        children ? (
          children
        ) : (
          <View>{noDataText}</View>
        )
      ) : (
        <View className={styles.loadMoreCustom}>
          <View className={styles['list-ts']}>
            {!optionState.isEnd && !optionState.isLoading && <View>{moreText}</View>}
            {!optionState.isEnd && optionState.isLoading && <View>{loadingText}</View>}
            {optionState.isEnd && <View>{noMoreText}</View>}
          </View>
        </View>
      )}
    </>
  );
};

export default LoadMoreCustom;
