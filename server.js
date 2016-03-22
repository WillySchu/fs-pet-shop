var http = require('http');
var fs = require('fs');
var routes = require('./routes');
var path = require('path');
var petsPath = path.join(__dirname, 'pets.json');
var pets = /^\/pets\/(.*)$/;
var port = process.env.PORT || 8080;
var server = http.createServer(function(req, res) {
  if (routes[req.url]) {
    routes[req.url](req, res);
  } else if (req.url.match(pets)) {
    routes[req.url.slice(0, -1)](req, res);
  } else {
    routes.unknown(req, res);
  }
});

server.listen(port, function() {
  console.log('listening on port ' + port);
});
