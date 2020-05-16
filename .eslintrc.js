module.exports = exports = {
  "parserOptions": {
    "ecmaVersion": 2018,
    "sourceType": "module"
  },
  "extends": [
    "eslint:recommended",
    "plugin:react/recommended"
  ],
  "env": {
    "browser": true,
    "node": true,
    "es6": true,
    "jest": true
  },
  "plugins": ["react", "jest"],
  "settings": {
    "react": {
      "version": "detect"
    }
  },
  "rules": {
    "no-inner-declarations": ["warn", "functions"],
    "generator-star-spacing": ["warn", { "before": true, "after": false }],
    "semi": "off",
    "semi-style": ["warn", "last"],
    "curly": ["error", "all"],
    "no-extend-native": "error",
    "no-console": ["error", { "allow": ["debug", "error", "dir", "info"] }],
    "no-loop-func": "warn",
    "no-iterator": "warn",
    "no-multi-str": "warn",
    "no-script-url": "warn",
    "no-undefined": "error",
    "no-unused-vars": "error",
    "no-ex-assign": "warn",
    "no-caller": "error",
    "no-eval": "warn",
    "require-yield": "warn",
    "no-new": "warn",
    "block-scoped-var": "error",
    "new-cap": "warn",
    "wrap-iife": "warn",
    "arrow-spacing": "warn",
    "no-empty": ["warn", { "allowEmptyCatch": true }],
    "react/prop-types": ["off"],
    "react/display-name": "warn",
    "eqeqeq": "off"
  }
};
