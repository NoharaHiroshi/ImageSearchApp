const helpers = require('./helpers');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require("extract-text-webpack-plugin");

const ENV = process.env.NODE_ENV = 'dev';

module.exports = {
  resolve: { // 解析模块路径时的配置
	extensions: ['.ts', '.js'] // 制定模块的后缀，在引入模块时就会自动补全
  },
  devtool: false,
  module: {
    rules: [ // 告诉webpack每一类文件需要使用什么加载器来处理
      {
        test   : /\.ts$/,
        loaders: ['awesome-typescript-loader', 'angular2-template-loader']
        //awesome-typescript-loader - 一个用于把TypeScript代码转译成ES5的加载器，它会由tsconfig.json文件提供指导
        //angular2-template-loader - 用于加载Angular组件的模板和样式
      }, {
        test: /\.json$/,
        use : 'json-loader'
      }, {
        test: /\.styl$/,
        loader: 'css-loader!stylus-loader'
      }, {
        test: /\.css$/,
        loaders: ['to-string-loader', 'css-loader']
		// loader: ExtractTextPlugin.extract({fallbackLoader : 'style-loader', loader : 'css-loader'})
      }, {
        test: /\.html$/,
        use: 'raw-loader',
        exclude: [helpers.root('src/index.html')]
        //html - 为组件模板准备的加载器
      }, {
        test:/\.(jpg|png|gif)$/,
        use:"file-loader"
      }, {
        test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        use : "url-loader?limit=10000&minetype=application/font-woff"
      }, {
        test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        use : "file-loader"
      }
    ]
  },
  plugins: [
	new webpack.DefinePlugin({
		'process.env': {
			'NODE_ENV': JSON.stringify(ENV)
		}
	}),
    //热替换
    new webpack.HotModuleReplacementPlugin(),
    new webpack.optimize.CommonsChunkPlugin({
      name: ['vendor', 'polyfills']
      //多个html共用一个js文件，提取公共代码
    }),

    new HtmlWebpackPlugin({
      // template: './src/index.html'
      // 自动向目标.html文件注入script和link标签
    }),
	
	new ExtractTextPlugin("[name].css"),

	new webpack.ProvidePlugin({
		$ : "jquery",
		jQuery : "jquery"
	}), 
	
	new webpack.LoaderOptionsPlugin({
		minimize: true,
		debug: false,
		
		options: {
		}
	}),
  ]
};