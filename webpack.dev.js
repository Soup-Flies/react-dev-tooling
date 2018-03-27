const merge = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  devtool: 'inline-source-map',
  module: {
    loaders: [
      {
        loader: "babel-loader",
        include: [
          path.resolve(__dirname, "src"),
        ],
        test: /\.jsx?$/,
        query: {
          plugins: ['transform-runtime', 'syntax-dynamic-import'],
          presets: ['es2015', 'react'],
        }
      }
    ],
  },
  devServer: {
    contentBase: './dist'
  },
  mode: "development"
});