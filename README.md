# blogfoster-scripts

> Single-command, zero-config tooling for Node.js projects

`blogfoster-scripts` is a thin wrapper around some of our favorite JavaScript tools. It unifies developer experience across multiple Node.js projects by hiding other tools and their configs. A minimal CLI with subcommands like `lint`, `format`, and `build` lets us manage tooling for multiple projects much easier. Also, developers don't need to waste time by copy-pasting boilerplate code around just to get tooling working.

## Installation

We recommend installing `blogfoster-scripts` locally in your Node.js project with `npm i --save-dev blogfoster-scripts`.

After that, you can use it with `npx` or by defining scripts in your `package.json`:

```json
{
  "scripts": {
    "lint": "blogfoster-scripts lint",
    "format": "blogfoster-scripts format",
    "build": "blogfoster-scripts build"
  }
}
```

## Commands

### lint

```sh
blogfoster-scripts lint
```
Check your code for linting issues with ESLint and fix all (fixable) issues.

### --check

```sh
blogfoster-scripts lint --check
```

By default, `blogfoster-scripts lint` will try to fix any fixable linting issues. With the `--check` argument it will only check your code for issues and exit with a non-zero exit code if there are any.

### format

```sh
blogfoster-scripts format
```
Check your code for formatting issues with Prettier and fix all (fixable) issues.

### --check

```sh
blogfoster-scripts format --check
```

By default, `blogfoster-scripts format` will try to fix any fixable formatting issues. With the `--check` argument it will only check your code for issues and exit with a non-zero exit code if there are any.

### build

```sh
blogfoster-scripts build
```

Compile JavaScript starting off from `src/index.js` file, copy static assets from `assets` folder and package everything into the `build` folder with Webpack and Babel.

## LICENSE

MIT
