module.exports = {
  "roots": [
    "<rootDir>/src"
  ],
  "transform": {
    "^.+\\.tsx?$": "ts-jest"
  },
  "testMatch": [
    "**/__tests__/**/*.tsx?",
    "**/?(*.)+(test).tsx?"
  ],
  "moduleFileExtensions": [
    "ts", "tsx", "js", "jsx", "json", "node"
  ],
}
