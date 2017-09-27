var webpackMerge = require('webpack-merge');
var commonConfig = require('./webpack.common.js');
var webpack = require('webpack');

var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require("extract-text-webpack-plugin");

const helpers = require('./helpers');

module.exports = webpackMerge(commonConfig, {
	entry : {
		'polyfills' : './src/polyfills.ts', // 运行Angular时所需的一些标准js
		'vendor' : [ './src/vendor.ts', './src/common.js' ], // Angular、Lodash、bootstrap.css......
		'app' : [ './src/main.ts' ], // 应用代码
		
		'manage_index' : [ './src/manage_index.ts' ], // 应用代码
	},
	output: {
		path: helpers.js_root('dist/debug'),
		publicPath: './',
		filename: '[name].js'
	},
	devServer: {
		port: 2222,
		historyApiFallback: true
	},
	watch: true,
});