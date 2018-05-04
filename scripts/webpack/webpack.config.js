const { resolve } = require('path');
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const rucksack = require('rucksack-css');
const autoprefixer = require('autoprefixer');
const entries = require('./webpack.entries');

const supportBrowsers = ['Electron>=1.8.6'];

const PostcssOptions = {
  sourceMap: true,
  plugins: [
    rucksack(),
    autoprefixer({
      browsers: supportBrowsers
    })
  ]
};

const babelOptions = {
  cacheDirectory: require('os').tmpdir(),
  presets: [
    require.resolve('babel-preset-react'),
    [require.resolve('babel-preset-es2015'), { modules: false }],
    [require.resolve('babel-preset-stage-0')],
    [require.resolve('babel-preset-env'), {
      targets: {
        browsers: supportBrowsers
      }
    }]
  ],
  plugins: [
    require.resolve('babel-plugin-transform-class-properties'),
    require.resolve('babel-plugin-add-module-exports'),
    require.resolve('babel-plugin-transform-decorators-legacy'),
    [
      require.resolve('babel-plugin-import'),
      {
        libraryName: 'antd',
        libraryDirectory: 'es'
      }
    ]
  ]
};

module.exports = (config) => {
  config.entry = Object.keys(entries).reduce((total, key) => {
    const entry = Array.isArray(entries[key]) ? entries[key] : [entries[key]];

    total[key] = entry;

    return total;
  }, {});

  config.output = {
    path: resolve(__dirname, '../../dist'),
    filename: '[name]-[chunkhash].js',
    chunkFilename: 'chunk/[chunkhash].js',
    publicPath: '/',
    crossOriginLoading: 'anonymous'
  };

  config.devtool = '#source-map';

  config.resolve = {
    modules: [
      'node_modules'
    ],
    mainFiles: ['index.web', 'index'],
    extensions: ['.web.tsx', '.web.ts', '.web.jsx', '.web.js', '.ts', '.tsx', '.js', '.jsx', '.json'],
    mainFields: ['browser', 'module', 'main']
  };

  config.module = {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: require.resolve('babel-loader'),
            options: babelOptions
          }
        ]
      },
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: require.resolve('css-loader'),
            options: {
              sourceMap: true,
              restructuring: true,
              autoprefixer: true,
              minimize: false
            }
          },
          {
            loader: require.resolve('postcss-loader'),
            options: PostcssOptions
          }
        ]
      },
      {
        test: /\.less$/,
        include: /(node_modules)|(\.plain\.less$)/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: require.resolve('css-loader'),
            options: {
              sourceMap: true,
              minimize: false
            }
          },
          {
            loader: require.resolve('postcss-loader'),
            options: PostcssOptions
          },
          {
            loader: require.resolve('less-loader'),
            options: {
              javascriptEnabled: true,
              sourceMap: true
            }
          }
        ]
      },
      {
        test: /\.less$/,
        exclude: /(node_modules)|(\.plain\.less$)/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: require.resolve('css-loader'),
            options: {
              sourceMap: true,
              modules: true,
              localIdentName: '[local]___[hash:base64:5]',
              camelCase: true,
              minimize: false
            }
          },
          {
            loader: require.resolve('postcss-loader'),
            options: PostcssOptions
          },
          {
            loader: require.resolve('less-loader'),
            options: {
              javascriptEnabled: true,
              sourceMap: true
            }
          }
        ]
      },
      {
        test: /\.(woff|woff2|ttf|svg|otf)(\?.*)?$/,
        use: `${require.resolve('url-loader')}?limit=10000`
      },
      {
        test: /\.eot(\?.*)?$/,
        use: require.resolve('url-loader')
      },
      {
        test: /\.(png|jpg|jpeg|gif)(\?.*)?$/,
        use: `${require.resolve('url-loader')}?limit=10000`
      }
    ]
  };

  config.plugins = [
    new CaseSensitivePathsPlugin(),

    new HtmlWebpackPlugin({
      title: '宜泊',
      inject: 'body',
      filename: 'index.html',
      template: require.resolve('../../src/index.html'),
      hash: true,
      cache: true
    })
  ];

  config.optimization = {
    splitChunks: {
      chunks: 'async',
      name: true
    }
  };

  config.stats = {
    assets: true,
    colors: true,
    cached: true,
    chunks: false,
    children: false,
    errors: true,
    modules: false,
    reasons: false,
    source: false,
    timings: true,
    warnings: true,
    version: true
  };

  config.target = 'electron-renderer';

  return config;
};
