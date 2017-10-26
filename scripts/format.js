const { spawnSync } = require("child_process");
const {
  projectSrc,
  selfPrettierBin,
  selfPrettierConfig,
  selfPrettierIgnore
} = require("../config/paths");

const supportedOptions = ["--write", "--debug-check", "--list-different"];
const userOption = process.argv.length > 2 ? process.argv[3] : undefined;
const option = supportedOptions.includes(userOption) ? userOption : undefined;

const prettierArgs = [
  option || "--write",
  "--config",
  selfPrettierConfig,
  "--ignore-path",
  selfPrettierIgnore,
  `./**/*.{js,json}`
];

const result = spawnSync(selfPrettierBin, prettierArgs, {
  env: process.env,
  cwd: projectSrc,
  stdio: "inherit"
});

if (result.error) {
  console.error("Command failed with the following error:\n");
  console.error(result.error);

  process.exit(1);
}
