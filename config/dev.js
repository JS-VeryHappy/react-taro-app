module.exports = {
  env: {
    NODE_ENV: '"development"',
  },
  plugins: ['@tarojs/plugin-mock'],
  defineConstants: {
    API_URL: '"http://127.0.0.1:9527/wechat"',
    VERSION: '"1.0.0"',
    SIGN_KEY: '"zycfly"',
  },
  mini: {},
  h5: {
    sourceMapType: 'source-map',
  },
};
