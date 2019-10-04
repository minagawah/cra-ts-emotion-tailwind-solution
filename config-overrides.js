const {
  override,
  addBabelPreset,
  addBabelPlugin,
} = require('customize-cra');

module.exports = {
  jest: override((config) => ({
    transform: {
      "^.+\\.(js|jsx|ts|tsx)$": "<rootDir>/node_modules/babel-jest"
    },
    transformIgnorePatterns: [
      "<rootDir>/src/setupTests.ts",
      "<rootDir>/node_modules/(?!anime)"
    ],
    moduleNameMapper: {
      "\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$": "<rootDir>/__mocks__/fileMock.ts",
      "\\.(css|less)$": "<rootDir>/__mocks__/styleMock.ts"
    },
    snapshotSerializers: [
      "ts-jest",
      "enzyme-to-json/serializer",
      "jest-emotion"
    ],
    setupFilesAfterEnv: ["<rootDir>/src/setupTests.ts"],
    collectCoverageFrom: [
      "src/**/*.{js,jsx,ts,tsx}",
      "!src/index.tsx",
      "!src/setupTests.ts",
      "!src/components/**/index.{js,jsx,ts,tsx}",
      "!src/containers/**/index.{js,jsx,ts,tsx}"
    ],
    coverageThreshold: {
      "global": {
        "branches": 80,
        "functions": 80,
        "lines": 80,
        "statements": 80
      }
    },
  })),
  webpack: override(
    addBabelPreset('@emotion/babel-preset-css-prop'),
    addBabelPlugin('macros')
  ),
};
