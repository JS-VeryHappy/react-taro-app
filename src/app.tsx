import React, { Component } from 'react';
import configStore from './store';
import { Provider } from 'react-redux';
import Taro from '@tarojs/taro';
import {
  setFromUid,
  removeFromUid,
  setId,
  removeId,
  setScene,
  setOpenId,
  getOpenId,
} from '@/utils/storage';
import { sceneToObject } from '@/utils';
import { miniprogramStart } from '@/services/api/miniprogram';
import './app.scss';

const store = configStore();

/**
 * 应用有新版本
 */
const updateApp = (option: any) => {
  const scene = option.scene;

  if (Taro.getEnv() === 'WEAPP') {
    if (scene !== 1154) {
      // 监听更新
      const updateManager = Taro.getUpdateManager();

      updateManager.onCheckForUpdate(function (res) {
        // 请求完新版本信息的回调
        console.log(res);
      });

      updateManager.onUpdateReady(function () {
        Taro.showModal({
          title: '更新提示',
          showCancel: false,
          content: '新版本已经准备好，是否重启应用？',
          success() {
            // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
            updateManager.applyUpdate();
          },
        });
      });
    }
  }
};

/**
 * 处理业务参数
 */
const storageBusinessData = async (option: any) => {
  /**
   * 进入参数规定
   * fid:传播人
   * id:主业务id
   */
  const { query }: any = option;
  // 进入业务场景值
  const gscene = option.scene;
  // 进入的参数
  const { fid, id, scene } = query;

  // 进入程序删除本地记录值
  removeFromUid();
  removeId();

  // 如果是扫码进入取参数
  const scenes = sceneToObject(scene);
  // 存入全局传播人 关系可以本地打开全局使用
  setFromUid(fid, scenes);
  // 存入全局业务id
  setId(id, scenes);
  // 存入进入场景值
  setScene(gscene);

  if (Taro.getEnv() === 'WEAPP') {
    if (!getOpenId()) {
      const loginRes: any = await Taro.login();

      if (loginRes.errMsg === 'login:ok') {
        try {
          const data = await miniprogramStart(
            {
              code: loginRes.code,
            },
            {
              autoLoading: false,
            },
          );
          setOpenId(data.data.openid);
        } catch (e) {
          //TODO handle the exception
        }
      }
    }
  }
};

class App extends Component {
  componentDidMount() {}

  onLaunch(option: any) {
    console.log('App Launch');
    // 更新应用
    updateApp(option);
    // 业务参数处理
    storageBusinessData(option);
  }

  componentDidShow() {
    console.log('App Show');
  }

  componentDidHide() {
    console.log('App Hide');
  }

  componentDidCatchError() {}

  // 在 App 类中的 render() 函数没有实际作用
  // 请勿修改此函数
  render() {
    return <Provider store={store}>{this.props.children}</Provider>;
  }
}

export default App;
