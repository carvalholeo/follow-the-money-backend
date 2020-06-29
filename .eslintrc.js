module.exports = {
  "env": {
    "es2020": true,
    "node": true
  },
  "extends": [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended"
  ],
  "parser": "@typescript-eslint/parser",
  "parserOptions": {
    "ecmaVersion": 11,
    "sourceType": "module",
    "impliedStrict": true
  },
  "plugins": [
    "@typescript-eslint"
  ],
  "rules": {
    "eqeqeq": 2,
    "curly": "error",
    "quotes": ["error", "double"],
    "strict": 2,
    "camelcase": 2,
    "indent": ["error", 2],
    "comma-spacing": ["error", { "before": false, "after": true }],
    "init-declarations": ["error", "never", { "ignoreForLoopInit": true }],
    "block-spacing": 2,
    "no-lonely-if": 0,
    "no-nested-ternary": 0,
    "arrow-spacing": 2,
    "prefer-const": 2,
    "prefer-destructuring": ["error", {
      "array": true,
      "object": true
    }],
    "prefer-numeric-literals": 2,
  },
  "globals": {
    "Promise": "off"
  }
};
