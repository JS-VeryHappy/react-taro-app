import React, { useEffect, useState } from 'react';
import { View, Text } from '@tarojs/components';
import TabbarCustom from '@/components/TabbarCustom';
import NavBarCustom from '@/components/NavBarCustom';
import useLoadMore from '@/hooks/useLoadMore';
import Taro, { useReachBottom } from '@tarojs/taro';
import { lists } from '@/services/api/user';
import styles from './index.module.scss';

/**
 * 分页使用加载更多使用
 * @returns
 */
const LoadMoreCustomDemo1 = () => {
  const [optionState, LoadMoreNode, showLoading, hideLoading, isCheckLoading, loadHandle] =
    useLoadMore();
  const [Info, setInfo] = useState<any>([]);

  const InfoHttp = (page?: any) => {
    if (!isCheckLoading()) {
      return false;
    }
    showLoading();
    lists({
      page: page || optionState.page,
      limit: 30,
    })
      .then((res: any) => {
        const datas = [...Info, ...res.data.data];
        setInfo(datas);
        loadHandle(res.data);
      })
      .finally(() => {
        hideLoading();
      });
  };

  useEffect(() => {
    InfoHttp(1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useReachBottom(() => {
    InfoHttp();
  });

  return (
    <>
      <NavBarCustom title="首页" />
      <View className={styles.wrapper}>
        {Info.map((item, key) => {
          return (
            <View key={item.id} className={styles.title}>
              <View> 为Taro而设计的Hooks Library</View>
              <View> asdasdasdasdas Library</View>
            </View>
          );
        })}
        <LoadMoreNode optionState={optionState} data={Info} />
      </View>
      <TabbarCustom />
    </>
  );
};

export default LoadMoreCustomDemo1;
