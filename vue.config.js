const path = require('path')
const glob = require('glob')
const webpack = require('webpack')
const resolve = dir=> path.join(__dirname,dir)

let baseUrl = '/vue-multipage/'

function _configPages () {
  let pages = {}
  glob.sync('./src/pages/*/*.js').forEach(filepath => {
    let fileList = filepath.split('/')
    let fileName = fileList[fileList.length - 2]
    console.log( console.log(fileName))
    pages[fileName] = {
      entry: `src/pages/${fileName}/main.js`,
      // 模板来源
      template: `src/pages/${fileName}/${fileName}.html`,
      title: "vue-multipage",
      // 在 dist/index.html 的输出
      filename: process.env.NODE_ENV === 'development' ? `${fileName}.html` : `${fileName}.html`,
      // 提取出来的通用 chunk 和 vendor chunk。
      chunks: ['chunk-vendors', 'chunk-common', fileName]
    }
  })
  return pages
}

module.exports = {
  pages:_configPages(),
  // 基本路径
  publicPath: baseUrl,
  // 输出文件目录
  outputDir: 'pan_'+process.env.VUE_APP_MODE.trim(),
  // eslint-loader 是否在保存的时候检查
  lintOnSave: true,
  // webpack-dev-server 相关配置
  devServer: {
    open: true,
    host: 'localhost',
    port: 8090,
    https: false,
    hotOnly: true,
     // 设置代理
    proxy: {
        '/api':{
          target:'http://localhost:8080',
          ws:true,
          changeOrigin:true,
          pathRewrite: {
            '^/api': '/' 
          }
        }
    },
  },
  // 第三方插件配置
  pluginOptions: {
    "style-resources-loader": {
      preProcessor: "less",
      patterns: ["./src/assets/css/public.less"]
   }
  },
  chainWebpack:config=>{
    config.resolve.alias
    .set('@',resolve('src'))
    .set('@c',resolve('src/components'))
    //打包文件带hash
    config.output.filename('[name].[hash].js').end(); 
  },
  productionSourceMap:false, //打包不生成.map文件
}
