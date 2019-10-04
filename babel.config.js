module.exports = {
  presets: [
    [
      '@babel/preset-env',
      { modules: 'commonjs' }
    ],
    '@babel/preset-typescript',
    '@babel/preset-react',
    '@emotion/babel-preset-css-prop'
  ],
  plugins: [
    'macros',
  ],
  env: {
    test: {
      presets: [
        [
          '@babel/preset-env',
          { modules: 'commonjs' }
        ],
        '@babel/preset-typescript',
        '@babel/preset-react',
        '@emotion/babel-preset-css-prop'
      ],
      plugins: [
        'transform-export-extensions'
      ],
      only: [
        "./**/*.js",
        "node_modules/jest-runtime"
      ]
    }
  },
};
