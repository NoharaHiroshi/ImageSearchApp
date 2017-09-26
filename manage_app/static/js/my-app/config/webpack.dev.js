var webpackMerge = require('webpack-merge');
var commonConfig = require('./webpack.common.js');
const helpers = require('./helpers');

module.exports = webpackMerge(commonConfig, {
	entry : {
		'polyfills' : './src/polyfills.ts', // 运行Angular时所需的一些标准js
		'vendor' : [ './src/vendor.ts', './src/common.js' ], // Angular、Lodash、bootstrap.css......
		'app' : [ './src/main.ts' ], // 应用代码
	},
	resolve: { // 解析模块路径时的配置
		extensions: ['.ts', '.js'] // 制定模块的后缀，在引入模块时就会自动补全
	},
	output: {
		path: helpers.js_root('dist/debug'),
		publicPath: './',
		filename: '[name].js'
	},
	devServer: {
		port: 6666,
		historyApiFallback: true
	},
	watch: true,
});