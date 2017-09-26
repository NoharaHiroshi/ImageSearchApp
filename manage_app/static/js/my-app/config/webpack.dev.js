var webpackMerge = require('webpack-merge');
var commonConfig = require('./webpack.common.js');
const helpers = require('./helpers');

module.exports = webpackMerge(commonConfig, {
  output   : {
    path      : helpers.root('dist/debug'),
    publicPath: '/',
    filename  : '[name].js'
  },
  devServer: {
    port              : 6666,
    historyApiFallback: true
  }
});