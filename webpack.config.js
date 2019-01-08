const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextWebpackPlugin = require('extract-text-webpack-plugin');


let style = new ExtractTextWebpackPlugin('css/style.css');
let indexHtml = new HtmlWebpackPlugin({template: './index.html',hash: true });

module.exports = {
  entry: {
    index: './src/index.js',
    login: './src/login.js'
  },
  output: {
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
      {
      test:/\.less$/, // 解析css
      use: ['style-loader','css-loader','less-loader'] //从右向左解析
      },
      //npm i file-loader url-loader -D
      {
        test: /\.(jpe?g|png|gif)$/,
        use: [
          {
            loader: 'url-loader',
            options:{
              limit: 8192, // 小于8k的图片自动转成base64格式，并且不会存在实体图片
              outputPath: 'images/'
            }
          }
        ]
      }
    ]
  }, // 处理对应模块
  plugins: [
    // 通过new一下这个类来使用插件
    indexHtml,
    style
    
  ], // 对应的插件
  devServer: {}, // 开发服务器配置
  mode: 'development' // 模式配置
}