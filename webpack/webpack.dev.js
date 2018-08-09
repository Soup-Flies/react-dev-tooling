const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');

const parentDir = path.join(__dirname, '../');

module.exports = merge(common, {
  devtool: 'inline-source-map',
  devServer: {
    contentBase: parentDir + 'src',
    port: 3000,
    historyApiFallback: true,
    proxy: {
      '/api': 'http://localhost:8080'
    }
  },
  mode: "development"
});