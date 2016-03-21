#!/usr/bin/env node
'use strict';

const fs = require('fs');
const path = require('path');
const petsPath = path.join(__dirname, 'pets.json');

const node = path.basename(process.argv[0]);
const file = path.basename(process.argv[1]);
const cmd = process.argv[2];

if (cmd === 'read') {
  fs.readFile(petsPath, 'utf8', function(err, data) {
    if (err) throw err;

    const index = process.argv[3];
    const animals = JSON.parse(data);

    if (index) {
      if (index > animals.length - 1) {
        console.error('Please use valid index');
        process.exit(1);
      } else {
        console.log(animals[index]);
      }
    } else {
      console.log(animals);
    }
  });
} else if (cmd === 'create') {
  fs.readFile(petsPath, 'utf8', function(readErr, data) {
    if (readErr) throw readErr;

    const animals = JSON.parse(data);
    const age = process.argv[3];
    const kind = process.argv[4];
    const name = process.argv[5];
    let JSONanimals;
    let animal;

    if (age && kind && name) {
      animal = {};
      animal.age = Number.parseInt(age);
      animal.kind = kind;
      animal.name = name;
      animals.push(animal);
      JSONanimals = JSON.stringify(animals);
    } else {
      console.error(`Usage: ${node} ${file} create AGE KIND NAME`);
      process.exit(1);
    }

    fs.writeFile(petsPath, JSONanimals, function(writeErr) {
      if (writeErr) throw writeErr;
    });
    console.log(animal);
  });
} else if (cmd === 'update') {
  fs.readFile(petsPath, 'utf8', function(readErr, data) {
    if (readErr) throw readErr;

    const animals = JSON.parse(data);
    const index = Number.parseInt(process.argv[3]);
    const age = process.argv[4];
    const kind = process.argv[5];
    const name = process.argv[6];
    let newAnimals = [];
    let JSONanimals;
    let animal = {};

    if ((index >= 0) && age && kind && name) {
      animal.age = Number.parseInt(age);
      animal.kind = kind;
      animal.name = name;

      for (let i = 0; i < animals.length; i++) {
        if (index === i) {
          newAnimals.push(animal);
        }
        newAnimals.push(animals[i]);
      }
      JSONanimals = JSON.stringify(newAnimals);
    } else {
      console.error(`Usage: ${node} ${file} create INDEX AGE KIND NAME`);
      process.exit(1);
    }

    fs.writeFile(petsPath, JSONanimals, function(writeErr) {
      if (writeErr) throw writeErr;
    });
    console.log(animal);
  });
} else if (cmd === 'destroy') {
  fs.readFile(petsPath, 'utf8', function(readErr, data) {
    if (readErr) throw readErr;

    let animals = JSON.parse(data);
    const index = process.argv[3];
    let animal;
    let JSONanimals;

    if (!index || index < 0 || animals.length - 1 < index) {
      console.error(`Usage: ${node} ${file} destroy INDEX`);
      process.exit(1);
    }
    animal = animals.splice(index, 1);
    JSONanimals = JSON.stringify(animals);
    fs.writeFile(petsPath, JSONanimals, function(writeErr) {
      if (writeErr) throw writeErr;
    });
    console.log(animal);
  });
} else {
  console.error(`Usage: ${node} ${file} [read | create | update | destroy]`);
  process.exit(1);
}
