'use-strict';

const express = require('express');
const app = express();
const routes = require('./routes');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const ba = require('basic-auth');

app.use(morgan('short'));
app.disable('x-powered-by');

app.use((req, res, next) => {
  const user = ba(req);

  if (user && user.name === 'admin' && user.pass === 'password') {
    return next();
  } else {
    res.set('WWW-Authenticate', 'Basic realm="Required"');
    return res.status(401).send('Unauthorized');
  };
});

app.use(bodyParser.json());

app.get('/pets/', routes.getAll);

app.get('/pets/:index', routes.getInd);

app.post('/pets/', routes.post);

app.put('/pets/:index', routes.put);

app.delete('/pets/:index', routes.delete);

app.patch('/pets/:index', routes.patch);

app.all('/*', (req, res) => {
  res.status(404).send('404, file not found');
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  return res.send(500, { message: err.message });
});

app.listen(process.env.PORT || 8000, () => {
  console.log('listening on port 8000');
});
