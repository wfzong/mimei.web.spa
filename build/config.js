const fs = require('fs')
const path = require('path')

module.exports = {
  loading: {
    html: fs.readFileSync(path.join(__dirname, '../src/preLoad/loading.html')),
    css: '<style>' + fs.readFileSync(path.join(__dirname, '../src/preLoad/loading.css')) + '</style>'
  },
  build: {
    // Run the build command with an extra argument to
    // View the bundle analyzer report after build finishes:
    // `npm run build --report`
    // Set to `true` or `false` to always turn it on or off
    bundleAnalyzerReport: process.env.npm_config_report
  }
}