'use strict';

const express = require('express')
const app = express();
const fs = require('fs');
const path = require('path');
const petsPath = path.join(__dirname, 'pets.json');
const routes = {
  getAll: function(req, res, next) {
    fs.readFile(petsPath, 'utf8', (err, data) => {
      if (err) return next(err);

      res.status(200).send(JSON.parse(data));
    })
  },
  getInd: function(req, res, next) {
    fs.readFile(petsPath, 'utf8', (err, data) => {
      if (err) return next(err);

      const animals = JSON.parse(data);
      const index = parseInt(req.params.index, 10);
      if (index >= animals.length || index < 0) {
        res.status(404).send(`No entry at index ${req.params.index}`)
      }
      const animal = animals[req.params.index]
      res.status(200).send(animal);
    })
  },
  post: function(req, res, next) {
    const index = parseInt(req.body.age, 10);
    if (req.body.age && req.body.kind && typeof index === 'number') {
      fs.readFile(petsPath, 'utf8', (readErr, data) => {
        if(readErr) return next(readErr);

        const animals = JSON.parse(data);
        const animal = {};
        animal.age = index;
        animal.kind = req.body.kind;
        animal.name = req.body.name;
        animals.push(animal);
        fs.writeFile(petsPath, JSON.stringify(animals), (writeErr) => {
          if (writeErr) return next(writeErr);
        });
        res.status(200).send(animal);
      });
    } else {
      res.status(400).send('Bad Request');
    }
  },
  put: function(req, res, next) {
    const index = parseInt(req.params.index, 10)
    if (req.body.age && req.body.kind && typeof index === 'number') {
      fs.readFile(petsPath, 'utf8', (readErr, data) => {
        if(readErr) return next(readErr);

        let animals = JSON.parse(data);
        if (index >= animals.length || index < 0) {
          res.status(400).send(`Bad Request: No entry at index ${req.params.index}`);
        }
        const animal = {};
        animal.age = parseInt(req.body.age, 10);
        animal.kind = req.body.kind;
        animal.name = req.body.name;
        animals[req.params.index] = animal;
        fs.writeFile(petsPath, JSON.stringify(animals), (writeErr) => {
          if(writeErr) return next(writeErr);
        });
        res.status(200).send(animal);
      });
    } else {
      res.status(400).send('Bad Request');
    }
  },
  delete: function(req, res, next) {
    fs.readFile(petsPath, 'utf8', (readErr, data) => {
      if (readErr) return next(readErr);

      const animals = JSON.parse(data);
      const index = parseInt(req.params.index, 10);

      if (index >= animals.length || index < 0) {
        res.status(400).send(`Bad Request: No entry at index ${req.params.index}`);
      }

      const animal = animals.splice(parseInt(req.params.index), 1)[0];

      fs.writeFile(petsPath, JSON.stringify(animals), (writeErr) => {
        if (writeErr) return next(writeErr);
      })
      res.status(200).send(animal);
    })
  },
  patch: function(req, res, next) {
    const index = parseInt(req.params.index, 10)
    if (req.body.age || req.body.kind || typeof index === 'number') {
      fs.readFile(petsPath, 'utf8', (readErr, data) => {
        if(readErr) return next(readErr);

        const animals = JSON.parse(data);
        if (index >= animals.length || index < 0) {
          res.status(400).send(`Bad Request: No entry at index ${req.params.index}`);
        }
        const animal = animals[index];
        if (req.body.age) {
          animal.age = parseInt(req.body.age, 10);
        }
        if (req.body.kind) {
          animal.kind = req.body.kind;
        }
        if (req.body.name) {
          animal.name = req.body.name;
        }
        animals[index] = animal;
        fs.writeFile(petsPath, JSON.stringify(animals), (writeErr) => {
          if(writeErr) return next(writeErr);
        });
        res.status(200).send(animal);
      });
    } else {
      res.status(400).send('Bad Request');
    }
  }
}

module.exports = routes;
