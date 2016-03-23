var express = require('express');
var app = express();
var multer = require('multer');
var upload = multer();
var routes = require('./routes');
var bodyParser = require('body-parser');
app.use(bodyParser.json());

app.get('/pets' || '/pets/', routes.getAll);

app.get('/pets/:index', routes.getInd);

app.post('/pets' || '/pets/', upload.array(), routes.post);

app.get('/*', function(req, res) {
  res.status = 404;
  res.send('404, file not found');
});

app.listen(8000, function() {
  console.log('listening on port 8000');
});
