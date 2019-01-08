const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextWebpackPlugin = require('extract-text-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const webpack = require('webpack')

let style = new ExtractTextWebpackPlugin('css/style.css');
let indexHtml = new HtmlWebpackPlugin({
  template: './index.html',
  hash: true
});

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
    rules: [{
        test: /\.css$/,
        use: ExtractTextWebpackPlugin.extract({
          use: ['css-loader', 'postcss-loader']
        })
      },
      {
        test: /\.less$/, // 解析css
        use: ['style-loader', 'css-loader', 'postcss-loader', 'less-loader'] //从右向左解析
      },
      //npm i file-loader url-loader -D  background url 引图片
      {
        test: /\.(jpe?g|png|gif)$/,
        use: [{
          loader: 'url-loader',
          options: {
            limit: 8192, // 小于8k的图片自动转成base64格式，并且不会存在实体图片
            outputPath: 'img/'
          }
        }]
      },
      //npm i html-withimg-loader -D   img引的图片
      {
        test: /\.(htm|html)$/,
        use: 'html-withimg-loader'
      },
      // 引svg等
      {
        test: /\.(eto|ttf|woff|svg)$/,
        use: 'file-loader'
      },
      //
      {
        test: /\.js$/,
        use: 'babel-loader',
        include: /src/, //只转化src目录下的js
        exclude: /node_modules/ //排除掉node_modules,优化打包速度
      }
    ]
  }, // 处理对应模块
  plugins: [
    // 通过new一下这个类来使用插件
    indexHtml,
    style,
    // 打包前先清空 npm i clean-webpack-plugin -D
    // new CleanWebpackPlugin('dist'),
    //热更新
    new webpack.HotModuleReplacementPlugin()

  ], // 对应的插件
  devServer: {
    contentBase: './dist',
    host: 'localhost', // 默认是localhost
    port: 3000, // 端口
    open: true, // 自动打开浏览器
    hot: true // 开启热更新
  }, // 开发服务器配置
  resolve: {
    // 别名
    alias: {
        $: './src/jquery.js'
    },
    // 省略后缀
    extensions: ['.js', '.json', '.css']
  },
  //提取公共代码
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendor: { //抽离第三方插件
          test: /node_modules/, // 指定node_modules下的第三方包
          chunks: 'initial',
          name: 'vendor',
          //设置优先级，防止和自定义的公共代码提取时被覆盖，不进行打包
          priority: 10
        },
        utils: {
          chunks: 'initial',
          name: 'utils',  // 任意命名
          minSize: 0    // 只要超出0字节就生成一个新包
        }
      }
    }
  },

  mode: 'development' // 模式配置
}