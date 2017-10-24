require('zone.js/dist/zone-node');
const fs = require('fs');
const path = require('path');
const http = require('http');
const Static = require('node-static');
const files = new Static.Server(path.join(__dirname, 'dist'));

require('core-js/es6/reflect');
require('core-js/es7/reflect');
const { AppServerModule } = require('./dist-ssr/main.bundle');
const { renderModule } = require('@angular/platform-server');

http.createServer((req, res) => {
  const path = req.url;
  if(
    path.indexOf('/assets') === 0 || 
    path === '/favicon.ico' ||
    /\.js(?:\.map)?$/.test(path)
  ) {
    files.serve(req, res);
  } else {
    renderModule(AppServerModule, {
      url: path,
      document: fs.readFileSync('dist/index.html', 'utf8')
    }).then(html => {
      res.end(html);
    });
  }
}).listen(4200);

console.log('open browser for http://localhost:4200')