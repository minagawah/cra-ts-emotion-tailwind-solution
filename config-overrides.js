const {
  override,
  addBabelPreset,
  addBabelPlugin,
} = require('customize-cra');

module.exports = {
  jest: override((config) => ({
    preset: "ts-jest",
    roots: [
      "<rootDir>/src"
    ],
    globals: {
      'ts-jest': {
        tsConfig: "<rootDir>/tsconfig.json",
        // babelConfig: true, // https://github.com/kulshekhar/ts-jest/issues/904#issuecomment-448631567
      },
    },
    transform: {
      "^.+\\.jsx?$": "<rootDir>/node_modules/babel-jest",
      "^.+\\.tsx?$": "ts-jest",
    },
    transformIgnorePatterns: [
      "<rootDir>/src/setupTests.ts",
      "<rootDir>/node_modules/(?!anime)"
    ],
    setupFilesAfterEnv: ["<rootDir>/src/setupTests.ts"],
    // testMatch: [
    //   "**/__tests__/**/*.tsx?",
    //   "**/?(*.)+(test).tsx?"
    // ],
    testRegex: "(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$",
    moduleFileExtensions: [
      "ts",
      "tsx",
      "js",
      "jsx",
      "json",
      "node"
    ],
    moduleNameMapper: {
      "\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$": "<rootDir>/__mocks__/fileMock.ts",
      "\\.(css|less)$": "<rootDir>/__mocks__/styleMock.ts"
    },
    snapshotSerializers: [
      // "ts-jest",
      "enzyme-to-json/serializer",
      "jest-emotion"
    ],
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
