const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = (config) => {
  config.plugins.push(new webpack.DefinePlugin({
    'process.env.NODE_ENV': JSON.stringify('production')
  }));

  config.plugins.push(new webpack.optimize.UglifyJsPlugin({
    beautify: false,
    comments: false,
    sourceMap: true,
    compress: {
      drop_console: true,
      collapse_vars: true,
      reduce_vars: true,
      drop_debugger: true,
      warnings: false
    }
  }));

  config.plugins.push(new MiniCssExtractPlugin({
    filename: '[name]-[chunkhash].css',
    chunkFilename: '[id]-[chunkhash].css'
  }));

  config.mode = 'production';

  return config;
};
