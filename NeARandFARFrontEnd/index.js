const path = require('path');
const express = require('express');
const http = require('http');
const https = require('https');
const fs = require('fs');

var app = express();

var staticPath = __dirname;
app.use(express.static(staticPath));
var port = 8080;
var sport = 8040;

const credentials = {
    key: fs.readFileSync('certs/key.pem'),
    cert: fs.readFileSync('certs/cert.pem')
  };

let httpServer = http.createServer(app);
let httpsServer = https.createServer(credentials, app);

httpsServer.listen(sport);
httpServer.listen(port);

/*app.listen(port, function() {
  console.log('listening on ' + port);
});*/

