var webpackMerge = require('webpack-merge');
var commonConfig = require('./webpack.common.js');
var webpack = require('webpack');

var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require("extract-text-webpack-plugin");

const helpers = require('./helpers');

// 关于配置文件路径相关问题的详细解答：http://www.cnblogs.com/libin-1/p/6592114.html

module.exports = webpackMerge(commonConfig, {
	// 参考见：https://segmentfault.com/a/1190000008288240
	// ./是以命令执行的目录为根目录
	// 如果不希望这里涉及到的路径和执行webpack命令时的具体路径相关，而是希望相对于配置文件的路径的话，就使用path模块
	// key还可以是路径字符串。此时webpack会自动生成路径目录，并将路径的最后作为[name]。
	// value如果是字符串，必须是合理的node require函数参数字符串。比如文件路径：'./app.js'(require('./app.js'))；比如安装的npm模块：'lodash'(require('lodash'))
	// value如果是数组，则数组中元素需要是上面描述的合理字符串值。数组中的文件一般是没有相互依赖关系的，但是又处于某些原因需要将它们打包在一起。
	entry : {
		'common/polyfills' : './src/polyfills.ts', // 运行Angular时所需的一些标准js
		'common/vendor' : [ './src/vendor.ts' ], // Angular、Lodash、bootstrap.css......
	},
	// 打包entry对象中的文件，并以key(对应[name])作为打包后文件的名字，输出到dist/debug
	output: {
		// path：用来存放打包后文件的存放位置，不能用于html中
		// publicPath：虚拟目录，自动指向path编译目录，html中引用js文件时，必须引用此虚拟路径
		path: helpers.js_root('dist/debug/'),
		// publishPath使用/assets/时，html中的引用会变成src=/assets/common/polyfills.js，使用./或不显示声明publicPath时，html中的引用会变成src=common/polyfills.js
		// publicPath主要用于静态文件存放cdn不同于运行环境的情况，在webpack-dev-server环境中打包的内容是放在内存中，publiPath和path引用的是相同的内存地址
		publicPath: '/assets/',
		filename: '[name].js'
	},
	devServer: {
		port: 2222,
		historyApiFallback: true
	},
	watch: true,
});