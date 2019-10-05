const {
  override,
  addBabelPreset,
  addBabelPlugin,
} = require('customize-cra');

module.exports = {
  webpack: override(
    addBabelPreset('@emotion/babel-preset-css-prop'),
    addBabelPlugin('macros')
  ),
};
