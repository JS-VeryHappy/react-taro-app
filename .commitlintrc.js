console.log('====================================');
console.log(1);
console.log('====================================');
module.exports = {
  /* type(scope?): subject  例子：feat(server): test */
  extends: ['@commitlint/config-conventional'], // 使用预设的配置 https://github.com/conventional-changelog/commitlint/blob/master/@commitlint/config-conventional/index.js
  rules: {
    'type-enum': [
      2,
      'always',
      ['💥 feat', '🐛 fix', '📝 docs', '🌷 UI', '🏰 chore', '🌐 locale', 'chore', 'revert'],
    ], // 改变预设中的提交类型
    'type-case': [2, 'always', 'lower-case'], // 提交类型必须使用小写
    'type-empty': [2, 'never'], // type不能为空
    // 'header-max-length': [2, 'always', 5], // header内容的最大长度为5
    // 'subject-min-length': [2, 'always', 1], // subject内容的最小长度为1
    // 'body-max-length': [2, 'always', 10], // body内容的最大长度为10
    // 'footer-max-length': [2, 'always', 5], // footer内容的最大长度为5
  },
};
