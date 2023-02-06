const { defineConfig } = require('@vue/cli-service')
const NodePolyfillPlugin = require('node-polyfill-webpack-plugin')
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,
  // 前端端口
  devServer:{
    host:"127.0.0.1",
    port:8080
  },
  configureWebpack: {
    resolve: {
      fallback: {
        fs: false,
        net:false
      } },
    // target: 'node',
    // externals: [nodeExternals()],
    // externals: {
    //   fs: require('fs'),

    //   net: require('net'),
    //   chokidar:require('chokidar')
    //  },
    plugins: [new NodePolyfillPlugin()]
  },

})




// module.exports = {
//   resolve: {
//     // 如果确认需要node polyfill，设置resolve.fallback安装对应的依赖
//     fallback: {
//       crypto: require.resolve('crypto-browserify'),
//       path: require.resolve('path-browserify'),
//       url: require.resolve('url'),
//       buffer: require.resolve('buffer/'),
//       util: require.resolve('util/'),
//       stream: require.resolve('stream-browserify/'),
//       vm: require.resolve('vm-browserify')
//     },
//     // 如果确认不需要node polyfill，设置resolve.alias设置为false
//     alias: {
//       crypto: false
//     }
//   }
// }

