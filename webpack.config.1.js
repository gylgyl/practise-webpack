const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextWebpackPlugin = require('extract-text-webpack-plugin');

module.exports = {
  //1.写成数组的方式可以打出多入口文件，不过这里打包后的文件都合成了一个
  //entry: ['./src/index.js','./src/login.js'], // 入口文件
  entry: {
    index: './src/index.js',
    login: './src/login.js'
  },
  output: {
    // 1. filename: 'bundle.js',
    // 2. [name]就可以将出口文件名和入口文件名一一对应
    //filename: 'bundle.js', // 打包后的文件名称
    filename: '[name].js',
    path: path.resolve('dist') // 打包后的目录，必须是绝对路径 
  }, // 出口文件
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ExtractTextWebpackPlugin.extract({
          use: 'css-loader'
        })
      },
      // {
      // test:/\.css$/, // 解析css
      // use: ['style-loader','css-loader'] //从右向左解析
      // },
      {
      test:/\.less$/, // 解析css
      use: ['style-loader','css-loader','less-loader'] //从右向左解析
      }
    ]
  }, // 处理对应模块
  plugins: [
    // 通过new一下这个类来使用插件
    // new HtmlWebpackPlugin({
    //   // 用哪个html作为模版
    //   // 在src目录下创建一个index.html页面当作模板来用
    //   template: './index.html',
    //   hash: true // 会在打包好的bundle.js后面加上hash串
    // })
    //多页面开发，配置多页面
    new HtmlWebpackPlugin({
      template: './index.html',
      filename: 'index.html',
      chunks: ['index'], // 对应的关系，
      hash: true
    }),
    new HtmlWebpackPlugin({
      template: './login.html',
      filename: 'login.html',
      chunks: ['login'], // 对应的关系，
      hash: true
    }),
    new ExtractTextWebpackPlugin('css/style.css')
  ], // 对应的插件
  devServer: {}, // 开发服务器配置
  mode: 'development' // 模式配置
}