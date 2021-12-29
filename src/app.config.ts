export default {
  pages: ['pages/index/index', 'pages/login/index', 'pages/my/index'],
  // subpackages: [
  //   {
  //     root: 'pagesA',
  //     pages: [],
  //   },
  // ],
  tabBar: {
    backgroundColor: '#F7F7FA',
    color: '#707070',
    selectedColor: '#ffad00',
    borderStyle: 'white',
    list: [
      {
        pagePath: 'pages/index/index',
        text: '首页',
      },
      {
        pagePath: 'pages/my/index',
        text: '我的',
      },
    ],
    custom: true,
  },
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#fff',
    navigationBarTitleText: 'WeChat',
    navigationBarTextStyle: 'black',
  },
};
