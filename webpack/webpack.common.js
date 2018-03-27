const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WorkboxPlugin = require('workbox-webpack-plugin');
const webpack = require('webpack');

const parentDir = path.join(__dirname, '../');

module.exports = {
  entry: [
    path.join(parentDir, 'src/index.js')
  ],
  module: {
    rules: [
      {
        test: /\.(jsx?)$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test: /\.css$/,
        loader: ['style-loader', 'css-loader']
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Ima PWA',
      template: path.join(parentDir, 'src/index.html')
    }),
    new webpack.NamedModulesPlugin(),
    new WorkboxPlugin.GenerateSW({
      clientsClaim: true,
      skipWaiting: true
    })
  ],
  output: {
    path: parentDir + 'dist',
    filename: '[name].[chunkhash].bundle.js'
  },
  optimization: {
    runtimeChunk: {
      name: "vendor"
    },
    splitChunks: {
      cacheGroups: {
        default: false,
        commons: {
          test: /node_modules/,
          name: "vendor",
          chunks: "initial",
          minSize: 1
        }
      }
    }
  }
}