const fabric = require('@umijs/fabric');

module.exports = {
  ...fabric.stylelint,
  plugins: [
    'stylelint-order',
    'stylelint-scss',
    'stylelint-declaration-block-no-ignored-properties',
  ],
};
