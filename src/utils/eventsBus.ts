import Taro, { Events } from '@tarojs/taro';

const events = new Events();

/**
 * 单页面事件处理
 */
const eventsBus = {
  $on(eventName: string, event: () => void) {
    events.on(eventName, event);
  },
  $off(eventName: string) {
    events.off(eventName);
  },
  $emit(eventName: string, data: any) {
    events.trigger(eventName, data);
  },
};
export default eventsBus;
