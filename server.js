const express = require('express');
const app = express();
const routes = require('./routes');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const ba = require('basic-auth');

app.use((req, res, next) => {
  var user = ba(req);

  if (! user || !user.name || !user.pass) {
    return res.status(401).send('Unauthorized');
  };

  if (user.name === 'admin' && user.pass === 'password') {
    return next();
  } else {
    return res.status(401).send('Unauthorized');
  };
});

app.disable('x-powered-by');
app.use(morgan('short'));
app.use(bodyParser.json());

app.get('/pets' || '/pets/', routes.getAll);

app.get('/pets/:index', routes.getInd);

app.post('/pets' || '/pets/', routes.post);

app.put('/pets/:index', routes.put);

app.delete('/pets/:index', routes.delete);

app.patch('/pets/:index', routes.patch);

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
