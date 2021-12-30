import React, { useEffect, useState } from 'react';
import { View, Text } from '@tarojs/components';
import { AtButton } from 'taro-ui';
import AuthCustom from '@/components/AuthCustom';
import TabbarCustom from '@/components/TabbarCustom';
import NavBarCustom from '@/components/NavBarCustom';
import useLoadMore from '@/hooks/useLoadMore';
import Taro, { useReachBottom } from '@tarojs/taro';
import { lists } from '@/services/api/user';
import styles from './index.module.scss';

const Index = () => {
  const [optionState, LoadMoreNode, showLoading, hideLoading, isCheckLoading, loadHandle] =
    useLoadMore();
  const [Info, setInfo] = useState<any>([]);

  const handlerClick = (event: any) => {
    console.log('====================================');
    console.log(event);
    console.log('====================================');
  };

  const InfoHttp = (page?: any) => {
    if (!isCheckLoading()) {
      return false;
    }
    showLoading();
    lists({
      page: page || optionState.page,
      limit: 20,
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
        <Text className={styles.title}>为Taro而设计的Hooks Library</Text>
        <AuthCustom>
          <AtButton type="primary" size="small" onClick={handlerClick}>
            获取用户信息
          </AtButton>
        </AuthCustom>

        {Info.map((item, key) => {
          return (
            <Text key={item.id} className={styles.title}>
              为Taro而设计的Hooks Library
            </Text>
          );
        })}
        <LoadMoreNode optionState={optionState} data={Info}>
          没有更多了！！！！！
        </LoadMoreNode>
      </View>
      <TabbarCustom />
    </>
  );
};

export default Index;
