const paths = require('./paths');
const nodeExternals = require('webpack-node-externals');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  bail: true,
  output: {
    filename: 'index.js',
    path: paths.projectBuild
  },
  entry: paths.projectIndexJs,
  // Don't touch node core modules like "fs", "path", etc.
  target: 'node',
  // Don't touch module specific globals like __dirname, __filename etc.
  node: false,
  // Don't bundle modules located in the project's `node_modules` folder
  externals: [nodeExternals()],
  // When webpack is resolving modules, let it first look up modules in the
  // projects "node_modules" folder and only after that search in our own.
  resolve: {
    modules: ['node_modules', paths.selfNodeModules]
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: {
          loader: require.resolve('babel-loader'),
          options: {
            presets: [require.resolve('babel-preset-env')],
            plugins: [
              // TODO: Get rid of "transform-class-properties" when there's a
              // plugin for the class fields proposal
              //
              // https://github.com/babel/proposals/issues/12
              require.resolve('babel-plugin-transform-class-properties')
            ]
          }
        }
      }
    ]
  },
  plugins: [
    // We're using the `context` property in addition to the `from` property to
    // not throw any errors when the "assets" folder doesn't exist.
    new CopyWebpackPlugin([
      {
        context: paths.projectAssets,
        from: '**/*',
        to: paths.projectBuildAssets
      }
    ])
  ]
};
