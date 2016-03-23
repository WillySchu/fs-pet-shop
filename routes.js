const express = require('express')
const app = express();
const fs = require('fs');
const path = require('path');
const petsPath = path.join(__dirname, 'pets.json');
const routes = {
  getAll: function(req, res) {
    fs.readFile(petsPath, 'utf8', (err, data) => {
      if (err) throw err;

      res.status(200).send(data);
    })
  },
  getInd: function(req, res) {
    fs.readFile(petsPath, 'utf8', (err, data) => {
      if (err) throw err;

      const animals = JSON.parse(data);
      if (req.params.index > animals.length -1) {
        res.status(404).send(`No entry at index ${req.params.index}`)
      }
      const animal = animals[req.params.index]
      res.status(200).send(animal);
    })
  },
  post: function(req, res) {
    if (req.body.age && req.body.kind && typeof parseInt(req.body.age, 10) === 'number') {
      fs.readFile(petsPath, 'utf8', (readErr, data) => {
        if(readErr) throw readErr;

        const animals = JSON.parse(data);
        const animal = {};
        animal.age = parseInt(req.body.age, 10);
        animal.kind = req.body.kind;
        animal.name = req.body.name;
        animals.push(animal);
        fs.writeFile(petsPath, JSON.stringify(animals), (writeErr) => {
          if (writeErr) throw writeErr;
        });
        res.send(animal);
      });
    } else {
      res.status(400).send('Bad Request')
    }
  }
}

module.exports = routes;
