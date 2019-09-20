module.exports = {
  "parser": "@typescript-eslint/parser"
  "plugins": ["react", "@typescript-eslint"],
  "extends": [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:@typescript-eslint/recommended"
  ],
  "env": {
    "browser": true,
    "node": true,
    "jest": true
  },
  "parserOptions": {
    "ecmaVersion": 2018,
    "sourceType": "module"
  },
  "overrides": [
    {
      "files": ["**/*.ts", "**/*.tsx"],
      "rules": {
        "@typescript-eslint/explicit-function-return-type": [0],
        "@typescript-eslint/indent": ["error", 2],
        "@typescript-eslint/no-var-requires": [1]
      }
    }
  ],
  // Shared throughout the plugins.
  "settings": {
    "react": {
      "pragma": "React",
      "version": "detect"
    }
  },
  "globals": {
    "tw": true
  }
}
