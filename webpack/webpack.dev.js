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
    historyApiFallback: true
  },
  mode: "development"
});