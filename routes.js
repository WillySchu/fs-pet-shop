const fs = require('fs');
const path = require('path');
const petsPath = path.join(__dirname, 'pets.json');
const routes = {
  '/pets': function(req, res) {
    if (req.method === 'GET') {
      fs.readFile(petsPath, 'utf8', (err, data) => {
        if (err) throw err;

        res.statusMessage = 200;
        res.end(data);
      });
    } else if (req.method === 'POST') {
      fs.readFile(petsPath, 'utf8', (readErr, data) => {
        if (readErr) throw readErr;

        const animals = JSON.parse(data);
        req.on('data', (chunk) => {
          const animal = JSON.parse(chunk.toString());
          animal.age = parseInt(animal.age, 10);
          if (animal.name && animal.kind && typeof animal.age === 'number') {
            animals.push(animal);
            fs.writeFile(petsPath, JSON.stringify(animals), (writeErr) => {
              if (writeErr) throw writeErr;
            });
            res.end(chunk);
          }
          res.statusMessage = 400;
          res.end('Bad Request');
        });
      });
    }
  },
  '/pets/': function(req, res) {
    if (req.method === 'GET') {
      fs.readFile(petsPath, 'utf8', (err, data) => {
        if (err) throw err;

        const index = req.url[req.url.length - 1];
        if (index !== '/') {
          var animals = JSON.parse(data);
          if (index > animals.length - 1) {
            res.statusMessage = 404;
            res.end('No entry at index ${index}');
          }
          const animal = animals[index];
          res.statusMessage = 200;
          res.end(JSON.stringify(animal));
        } else {
          routes['/pets'](req, res);
        }
      });
    }
  },
  unknown: function(req, res) {
    res.statusMessage = 404;
    res.end('Not found');
  },
};

module.exports = routes;
