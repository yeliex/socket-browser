const minimist = require('minimist');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const styleHot = require.resolve('../libs/stylehot.js');

const args = Object.assign({}, minimist(process.argv), minimist(JSON.parse(process.env.npm_config_argv).original));

const port = args.port || 18430;

module.exports = (config) => {
  config.entry = Object.keys(config.entry).reduce((total, key) => {
    total[key] = config.entry[key];
    total[key].push(styleHot);
    return total;
  }, {});

  config.devtool = '#cheap-module-source-map';

  config.devServer = {
    compress: false,
    host: '0.0.0.0',
    port,
    hot: true,
    disableHostCheck: true,
    publicPath: '/',
    overlay: {
      warnings: false,
      errors: true
    },
    watchContentBase: false,
    historyApiFallback: {
      index: '/index.html'
    }
  };

  config.output.filename = '[name].js';

  config.output.chunkFilename = '[id]-[name].js';

  config.plugins.push(new webpack.DefinePlugin({
    'process.env.NODE_ENV': JSON.stringify('development'),
  }));

  config.plugins.push(new MiniCssExtractPlugin({
    filename: '[name].css',
    chunkFilename: '[id].css'
  }));

  config.mode = 'development';

  return config;
};
