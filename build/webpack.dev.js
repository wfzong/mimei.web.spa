const webpack = require('webpack');
const path = require("path");
const Merge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CommonConfig = require('./webpack.common.js');
const config = require('./config.js')

module.exports = Merge(CommonConfig,{
	plugins:[
    new HtmlWebpackPlugin({
			template: 'src/index.html',
      loading: config.loading
		}),
		new webpack.HotModuleReplacementPlugin()
	],
	module:{
		rules:[
			{
				test:/\.css$/,
				use:['style-loader','css-loader']
			},
			{
				test:/\.scss$/,
				use:['style-loader','css-loader','sass-loader']
			}
		]
	},
    devServer:{
		contentBase:path.join(__dirname, '../dist/'),
		hot:true,
		publicPath:'/'
	}
})