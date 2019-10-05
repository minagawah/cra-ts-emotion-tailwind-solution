module.exports = {
  "roots": [
    "<rootDir>/src"
  ],
  "transform": {
    "^.+\\.tsx?$": "ts-jest"
  },
  "testRegex": "(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$",
  "transformIgnorePatterns": [
    "<rootDir>/node_modules/(?!anime)"
  ],
  "moduleFileExtensions": [
    "ts",
    "tsx",
    "js",
    "jsx",
    "json",
    "node"
  ],
  "snapshotSerializers": [
    "enzyme-to-json/serializer",
    "jest-emotion"
  ],
  "moduleNameMapper": {
    "\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$": "<rootDir>/__mocks__/fileMock.ts",
    "\\.(css|less)$": "<rootDir>/__mocks__/styleMock.ts"
  },
  "collectCoverageFrom": [
    "src/**/*.{js,jsx,ts,tsx}",
    "!src/index.tsx",
    "!src/setupTests.ts",
    "!src/components/**/index.{js,jsx,ts,tsx}",
    "!src/containers/**/index.{js,jsx,ts,tsx}"
  ],
  "coverageThreshold": {
    "global": {
      "branches": 80,
      "functions": 80,
      "lines": 80,
      "statements": 80
    }
  },
}
