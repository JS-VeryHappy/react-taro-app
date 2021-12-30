# 框架说明
> 1. Taro及其生态 进行二次封装的脚手架。
> 2. 项目中的业务资源和业务相关配置需要根据业务调整和自行补齐。

# 框架特点

> 1. 框架思想：让开发变得简单，从编写式开发提升为开发配置综合式开发，大大提升开发效率和开发统一性。
> 1. 组件思想：业务组件是以项目业务的UI呈现形式为主的组件、具有特定业务性、贴近业务本身。
> 2. 通用性：具备相同业务通用性（例如：一家公司有多个管理后台、UI呈现都基本一致、可以使用相同的组件）。
> 3. 脚手架封装二次封装表单和表格等组件、让编写业务可以配置化。

## 项目架构

(taro + taroify + sass + TypeScript  )

Taro中文网： [http://taro-docs.jd.com/taro/docs/README](http://taro-docs.jd.com/taro/docs/README)

React官网： [https://react.docschina.org/](https://react.docschina.org/)

TaroifyUI： [https://taroify.gitee.io/taroify.com/introduce/](https://taroify.gitee.io/taroify.com/introduce/)

Sass官网： [https://sass.bootcss.com/documentation](https://sass.bootcss.com/documentation)

TypeScript官网： [https://www.tslang.cn/](https://www.tslang.cn/)


## vscode 插件安装
[ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) 代码格式风格验证

[Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode) 代码格式风格验证自动补全

[stylelint](https://marketplace.visualstudio.com/items?itemName=stylelint.vscode-stylelint) 样式风格验证

[git-commit-plugin](https://marketplace.visualstudio.com/items?itemName=redjue.git-commit-plugin) 提交git文案工具

### vscode本地settings.json
```
{
  "editor.formatOnSave": true,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "[javascript]": {
    "editor.formatOnSave": true,
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  // 检索过滤
  "search.exclude": {
    "**/node_modules": true,
    "**/bower_components": true,
    "**/dist": true
  },
  "GitCommitPlugin.CustomCommitType": [
    {
      "label": "feat",
      "detail": "add 'comments' option"
    },
    {
      "label": "fix",
      "detail": "fix some bug"
    },
    {
      "label": "docs",
      "detail": "add some docs"
    },
    {
      "label": "UI",
      "detail": "better styles"
    },
    {
      "label": "chore",
      "detail": "Made some changes to the scaffolding"
    },
    {
      "label": "locale",
      "detail": "Made a small contribution to internationalization"
    }
  ]
}

```

## 文件结构

```txt
├── README.md //说明文件
├── config //配置目录
│   ├── dev.js //开发配置
│   ├── index.js //公用配置
│   └── prod.js //正式配置
├── mock //mock模拟数据目录
│   └── api.ts 
├── package.json
├── src
│   ├── app.config.ts //页面相关配置
│   ├── app.css //全局样式文件
│   ├── app.tsx //入口文件
│   ├── assets //资源存放目录
│   │   └── images
│   ├── components //组件目录
│   │   ├── TabbarCustom //全局Tabbar
│   │   ├── FormCustom //全局表单封装组件
│   │   ├── NavBarCustom //全局NavBar
│   │   ├── LoadMoreCustom //全局加载更多
│   │   └── AuthCustom //全局点击需要验证登录
│   ├── store //全局状态目录  
│   │   ├── action.ts //存放常用的action
│   │   ├── constants.ts //存放常量
│   │   ├── index.ts 
│   │   ├── reducers.ts //编写的 reducers状态
│   │   └── state.ts //默认值
│   ├── pages
│   │   └── index //存放页面
│   ├── hooks //自定义hooks存放文件夹
│   │   └── usexxxx.ts 
│   ├── services //请求目录
│   │   ├── config.ts //请求拦截器
│   │   ├── handler.ts //请求类型封装
│   │   └── api //存放请求目录
│   └── utils //公用工具或方法存放目录
│       ├── eventsBus.ts //全局事件触发
│       ├── storage.ts //全局存入本地库
│       ├── validator.ts //全局表单和提交验证库
│       ├── wechat.ts //微信网页授权封装
│       └── index.ts //业务公用 单独引入使用
├── global.d.d.ts //ts类型声明
└── tsconfig.json //ts配置文件

```

## 打包


本地开发环境： `yarn dev:weapp`

线上正式环境： `yarn build:h5`


### 地址和说明


项目逻辑，交互，功能请阅读RP

项目GIT： ``

项目RP： ``

项目UI： [蓝湖地址]()

接口API： [接口文档]()

测试JIRA： [JIRA地址]()



### 测试/开发登录路径


/login



### 账号


# LICENSE
MIT