module.exports = {
  env: {
    test: {
      presets: [
        // 'module:ts-jest',
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
      // only: [
      //   "./src/**/*.tsx?",
      //   "node_modules/jest-runtime"
      // ]
    }
  },
};
