const express = require('express');
const app = express();
const routes = require('./routes');
const bodyParser = require('body-parser');
app.use(bodyParser.json());

app.get('/pets' || '/pets/', routes.getAll);

app.get('/pets/:index', routes.getInd);

app.post('/pets' || '/pets/', routes.post);

app.all('/*', function(req, res) {
  res.status = 404;
  res.send('404, file not found');
});

app.use(function(err, req, res, next) {
  console.error(err.stack);
  return res.send(500, { message: err.message });
});

app.listen(8000, function() {
  console.log('listening on port 8000');
});
