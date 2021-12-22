import { getObj, getPagination } from './handler';

// @ts-ignore
const userinfo = {
  id: 1,
  name: '超级管理员',
  account: 'admin',
  phone: '15308047222',
  mail: '1212',
  status: 1,
  headimg: 'http://www.fly.com/uploads/images/2020-03-14/d4b34a35073aaca1ff251627daa97567.jpeg',
  password: '$2y$10$iixP17LTpl0NoLc.S.Nit.FWiaBD/p3EgNldvjVo3zjxht5nbjTIi',
  remark: '',
  is_admin: 1,
  remember_token: 'csmVmzxVh9edsjvSLHDBvaV4ccyXorOnMn7qHeDWXaYgcgJGtICUKUS4mLYT',
  created_at: null,
  role_name: '超级管理员',
  role_id: 0,
  updated_at: '2020-06-04 11:40:58',
  permission_Ids: [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26,
    27, 28, 29, 30, 31,
  ],
};

const getMessage = async (req: any, res: any) => {
  let config = {};
  switch (req.body.type) {
    case 'notification':
      config = {
        data: {
          'list|10': [
            {
              'id|+1': 1,
              avatar: 'https://gw.alipayobjects.com/zos/rmsportal/OKJXDXrmkNshAMvwtvhu.png',
              title: '已通过第三轮面试',
              desc: '你推荐的 曲妮妮 已通过第三轮面试',
              date: '3 年前',
              is_urgent: 2,
              is_urgent_name: '重要',
              read: false,
              content:
                '<p>大神大神大d大神大神大d大神大神大d大神大神大d大神大神大d</p><p></p><p></p><div class="media-wrap image-wrap"><img src="http://www.adminapi.com/uploads/api/files/2021-10-14/ab1f561f86378b43e264e1860f3afc44/WechatIMG20988.jpeg"/></div><p>adasdasdasdasdasd</p><p>大神大神大是啊实打实的</p><ol><li>阿萨德啊实打实大声道</li><li>阿萨德1啊实打实的</li><li>11212sssssasdasdasda</li></ol><p></p>',
            },
          ],
        },
        timeout: 1000,
      };
      break;
    default:
      config = {
        data: {
          'list|10': [
            {
              'id|+1': 1,
              read: false,
              avatar: 'https://gw.alipayobjects.com/zos/rmsportal/fcHMVNCjPOsbUGdEduuv.jpeg',
              title: '曲丽丽 评论了你',
              date: '3 年前',
              desc: '描述信息描述信息描述信息',
              is_urgent: 2,
              is_urgent_name: '重要',
              content:
                '<p>大神大神大d大神大神大d大神大神大d大神大神大d大神大神大d</p><p></p><p></p><div class="media-wrap image-wrap"><img src="http://www.adminapi.com/uploads/api/files/2021-10-14/ab1f561f86378b43e264e1860f3afc44/WechatIMG20988.jpeg"/></div><p>adasdasdasdasdasd</p><p>大神大神大是啊实打实的</p><ol><li>阿萨德啊实打实大声道</li><li>阿萨德1啊实打实的</li><li>11212sssssasdasdasda</li></ol><p></p>',
            },
          ],
        },
        timeout: 1000,
      };
      break;
  }

  return await getPagination(config, req, res);
};

export default {
  'POST /wechat/miniprogram/login': getObj.bind(null, {
    data: userinfo,
    timeout: 1000,
  }),
  // 用户消息数据
  'POST /api/user/message': getMessage.bind(null),

  'POST /api/table/list': getPagination.bind(null, {
    data: {
      'list|20': [
        {
          'id|+1': 1,
          avatar: "@image('100x100','@color')",
          title: '@ctitle',
          datetime: '@datetime',
          description: '@title',
          'user_id|+1|1-20': 1,
          'status|1-3': 1,
          'type|1-3': 1,
        },
      ],
    },
    timeout: 1000,
  }),

  // 删除
  'POST /api/protable/proTableDelete': getObj.bind(null, {
    data: {},
    timeout: 1000,
    mock: false,
    // code: -1,
    // reason: '删除失败',
  }),

  'POST /api/log/index': getPagination.bind(null, {
    data: {
      'list|20': [
        {
          created_at: '@datetime',
          'id|+1': 1,
          ip: '127.0.0.1',
          route_name: '',
          route_zh_name: '日志详情',
          source: 'admin',
          'user_id|+1|1-20': 1,
          user_name: '超级管理员',
          'type|1-2': 1,
        },
      ],
    },
    timeout: 1000,
  }),

  'POST /api/areaPlate': getPagination.bind(null, {
    data: {
      areaPlate: [
        {
          city: '成都',
          id: 860028,
          province: '四川',
          area: '区域',
          plate: '板块',
        },
        {
          city: '绵阳',
          id: 860029,
          area: '区域',
          province: '四川',
          plate: '板块',
        },
      ],
    },
    timeout: 1000,
  }),
};
