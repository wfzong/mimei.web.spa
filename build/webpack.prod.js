const webpack = require('webpack');
const Merge = require('webpack-merge');
const CommonConfig = require('./webpack.common.js');
const CleanWebpackPlugin = require('clean-webpack-plugin');
// const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const config = require('./config.js')


// const cssExtract = new ExtractTextPlugin('css/[name].[chunkhash].css');
//const scssExtract = new ExtractTextPlugin("css/[name]_scss.[chunkhash].css")

const webpackConfig = Merge(CommonConfig, {
  output: {
    filename: 'js/[name].[chunkhash].js',
    publicPath: '/', //根据具体访问路径做修改
    sourceMapFilename: 'js/[name].[chunkhash].map'
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use:['style-loader', 'css-loader']
        // use: cssExtract.extract({
        //   fallback: 'style-loader',
        //   use: 'css-loader'
        // })
      },
      {
        test: /\.scss$/,
        use:['style-loader', 'css-loader', 'sass-loader']
        // use: cssExtract.extract({
        //   fallback: 'style-loader',
        //   use: ['css-loader', 'sass-loader']
        // })
      }
    ]
  },
  plugins: [
    // cssExtract,
    new HtmlWebpackPlugin({
      template: 'src/index.html',
      loading: config.loading,
      inject: true
    }),
    //scssExtract,
    new CleanWebpackPlugin(path.join(__dirname, '../dist/'), {
      root: path.join(__dirname, '../')
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true,
      debug: false
    }),
    new webpack.DefinePlugin({
      'process.env': {
        //'NODE_ENV': JSON.stringify('production')
        NODE_ENV: '"production"'
      }
    }),
    new webpack.HashedModuleIdsPlugin(),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'common'
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      },
      sourceMap:
        CommonConfig.devtool &&
        (CommonConfig.devtool.indexOf('sourcemap') >= 0 ||
          CommonConfig.devtool.indexOf('source-map') >= 0)
    })
  ]
});
if (config.build.bundleAnalyzerReport) {
  const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
  webpackConfig.plugins.push(new BundleAnalyzerPlugin())
}
module.exports = webpackConfig;
