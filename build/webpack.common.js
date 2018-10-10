const webpack = require('webpack');
const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const PrerenderSPAPlugin = require('prerender-spa-plugin');
const Renderer = PrerenderSPAPlugin.PuppeteerRenderer;

module.exports = {
  entry: {
    app: path.join(__dirname, '../src/index.js')
  },
  output: {
    filename: '[name].js',
    path: path.join(__dirname, '../dist'),
    sourceMapFilename: '[name].map'
  },
  resolve: {
    extensions: ['.js', '.vue', '.json', '.css', '.scss'],
    modules: [path.join(__dirname, '../src'), 'node_modules'],
    alias: {
      vue: 'vue/dist/vue.esm.js'
    }
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader' //需安装 babel-plugin-syntax-dynamic-import 插件用于支持 ()=>import('xxx')
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          // extractCSS: process.env.NODE_ENV === 'production',
        }
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        loader: 'file-loader',
        options: {
          name: 'img/[name].[hash].[ext]'
        }
      }
    ]
  },
  //devtool:'inline-source-map',//会一直生成map
  devtool: '#cheap-module-source-map', //当 NODE_ENV=production 时，只会map文件框架~
  plugins: [
    // 主要是为了把robots.txt 拷到根目录下
    new CopyWebpackPlugin([
      {
        from: path.join(__dirname, '../src/static/forRoot'),
        to: path.join(__dirname, '../dist'),
        ignore: ['.*']
      }
    ]),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery'
    }),


    // new PrerenderSPAPlugin({
    //   // Required - The path to the webpack-outputted app to prerender.
    //   staticDir: path.join(__dirname, '../dist'),
    //   // Required - Routes to render.
    //   routes: [ '/'],
    //   renderer: new Renderer({
    //     headless:true,
    //     renderAfterDocumentEvent: 'render-event'
    //   })
    // })


    // == PRERENDER SPA PLUGIN == //
    new PrerenderSPAPlugin({
      // Index.html is in the root directory.
      staticDir: path.join(__dirname, '../dist/'),
      routes: [ '/' ],
      // Optional minification.
      minify: {
        collapseBooleanAttributes: true,
        collapseWhitespace: true,
        decodeEntities: true,
        keepClosingSlash: true,
        sortAttributes: true
      },
      renderer: new Renderer({
        headless:true,
        // renderAfterTime: 5000,
        renderAfterDocumentEvent: 'render-event'
      })
    })


  ]
};
