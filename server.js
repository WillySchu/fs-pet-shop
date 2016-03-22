const http = require('http');
const routes = require('./routes');
const pets = /^\/pets\/(.*)$/;
const port = process.env.PORT || 8080;
const server = http.createServer((req, res) => {
  if (routes[req.url]) {
    routes[req.url](req, res);
  } else if (req.url.match(pets)) {
    routes[req.url.slice(0, -1)](req, res);
  } else {
    routes.unknown(req, res);
  }
});

server.listen(port, function() {
  console.log('listening on port ${port}');
});
