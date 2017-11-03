module.exports = {
  parserOptions: {
    ecmaVersion: 8
  },
  env: {
    node: true
  },
  extends: ["airbnb", "prettier"],
  rules: {
    "global-require": "off",
    "no-console": "off",
    "import/no-dynamic-require": "off",
    "import/newline-after-import": "off",
    "import/prefer-default-export": "off",
    "import/max-dependencies": "off"
  }
};
