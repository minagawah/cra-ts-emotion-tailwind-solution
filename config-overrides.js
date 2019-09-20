const {
  override,
  addBabelPreset,
  // addBabelPlugin, // method (1): babel plugins
  addPostcssPlugins, // method (2): PostCSS presets
} = require('customize-cra');

module.exports = override(
  addBabelPreset('@emotion/babel-preset-css-prop'),
  // addBabelPlugin('macros') // method (1): babel plugins
  addPostcssPlugins([ // method (2): PostCSS presets
    require('tailwindcss')('./src/tailwind.config.js')
  ])
)
