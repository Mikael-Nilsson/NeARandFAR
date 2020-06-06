// webpack.config.js
const { VueLoaderPlugin } = require('vue-loader');
const path = require('path');
const nodeSassMagicImporter = require('node-sass-magic-importer');

const HtmlWebpackPlugin = require('html-webpack-plugin');

const env = process.env.NODE_ENV;
const sourceMap = env === 'development';

const config = {
  entry: path.join(__dirname, 'src', 'index.js'),
  devtool: sourceMap ? 'cheap-module-eval-source-map' : undefined,
  mode: env,
  output: {
    publicPath: '/',
  },
  optimization: {
    splitChunks: {
      // Must be specified for HtmlWebpackPlugin to work correctly.
      // See: https://github.com/jantimon/html-webpack-plugin/issues/882
      chunks: 'all',
    },
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: [path.join(__dirname, 'src')],
      },
      {
        test: /\.scss$/,
        use: [
          'vue-style-loader',
          'css-loader',
          {
            loader: 'sass-loader',
          },
        ],
      },
      {
        test: /\.scss$/,
        use: [
          // ...
          {
            loader: 'sass-loader',
            options: {
              importer: nodeSassMagicImporter(),
              sourceMap,
            },
          },
          {
            loader: 'css-loader',
            options: {
              sourceMap,
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new VueLoaderPlugin(),
    new HtmlWebpackPlugin({
      filename: path.join(__dirname, 'dist', 'index.html'),
      template: path.join(__dirname, 'static', 'index.html'),
      inject: true,
    }),
  ],
};

module.exports = config;