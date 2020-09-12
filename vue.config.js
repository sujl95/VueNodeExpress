const path = require("path");

module.exports = { 
  devServer: {
    proxy: { 
      '/api': { 
        target: 'http://localhost:80/api',
        changeOrigin: true, 
        pathRewrite: { 
          '^/api': ''
        } 
      } 
    } 
  },
  configureWebpack: {
    resolve: {
      alias: {
        "~": path.resolve("src"),
      },
      extensions: [".js", ".vue", ".json"],
    },
  },
  outputDir: './express/public',
}