const webpack = require('webpack');
const path = require("path");
const Merge = require('webpack-merge');
const CommonConfig = require('./webpack.common.js');

module.exports = Merge(CommonConfig,{
	plugins:[
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