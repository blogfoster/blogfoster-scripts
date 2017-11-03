module.exports = {
  // Use "babel-eslint" as a parser to support experimental language features
  parser: "babel-eslint",
  env: {
    node: true
  },
  // Use the "airbnb" config but ignore rules about formatting
  extends: ["airbnb", "prettier"],
  // Turn off rules that are too strict
  rules: {
    "global-require": "off",
    "no-console": "off",
    "no-underscore-dangle": "off",
    "import/no-dynamic-require": "off",
    "import/newline-after-import": "off",
    "import/prefer-default-export": "off",
    "import/max-dependencies": "off"
  }
};
