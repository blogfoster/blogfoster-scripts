module.exports = {
  parserOptions: {
    ecmaVersion: 6
  },
  env: {
    node: true
  },
  extends: ["eslint:recommended", "prettier"],
  rules: {
    "no-console": "off"
  }
};
