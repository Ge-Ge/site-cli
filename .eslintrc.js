module.exports = {
  "env": {
    "node": true,
    "es6": true,
    mocha: true,
  },
  "extends": "eslint:recommended",
  "parserOptions": {
    "ecmaVersion": 2017
  },
  "rules": {
    "indent": [
      "error",
      2
    ],
    'object-curly-spacing': [ 'error', 'always' ],
    "space-before-function-paren": ["error", "always"],
    "linebreak-style": [
      "error",
      "unix"
    ],
    "quotes": [
      "error",
      "single"
    ],
    "semi": [
      "error",
      "always"
    ]
  }
};
