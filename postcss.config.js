// css 添加前缀，这里需要注意的是postcss的配置信息需要单独在外面写配置文件才可以使用
module.exports = {
  plugins: [
    require('autoprefixer')
  ]
}