var fs = require('fs');
var path = require('path');
var petsPath = path.join(__dirname, 'pets.json');

var node = path.basename(process.argv[0]);
var file = path.basename(process.argv[1]);
var cmd = process.argv[2];

if (cmd === 'read') {
  fs.readFile(petsPath, 'utf8', function(err, data) {
    if (err) throw err;

    var index = process.argv[3];
    var animals = JSON.parse(data);
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
  })
} else if (cmd === 'create') {
  fs.readFile(petsPath, 'utf8', function(readErr, data) {
    if (readErr) throw readErr;

    var animals = JSON.parse(data);
    var age = process.argv[3];
    var kind = process.argv[4];
    var name = process.argv[5];

    if (age && kind && name) {
      var animal = {};
      animal.age = Number.parseInt(age);
      animal.kind = kind;
      animal.name = name;
      animals.push(animal);
      var JSONanimals = JSON.stringify(animals);
    } else {
      console.error(`Usage: ${node} ${file} create AGE KIND NAME`);
      process.exit(1);
    }

    fs.writeFile(petsPath, JSONanimals, function(writeErr) {
      if (writeErr) throw writeErr;
    })
    console.log(animal);
  })
} else if (cmd === 'update'){
  fs.readFile(petsPath, 'utf8', function(readErr, data) {
    if (readErr) throw readErr;

    var animals = JSON.parse(data);
    var index = Number.parseInt(process.argv[3]);
    var age = process.argv[4];
    var kind = process.argv[5];
    var name = process.argv[6];
    var newAnimals = [];

    if (index && age && kind && name) {
      var animal = {};
      animal.age = Number.parseInt(age);
      animal.kind = kind;
      animal.name = name;

      for (var i = 0; i < animals.length; i++) {
        if (index === i) {
          newAnimals.push(animal);
        }
        newAnimals.push(animals[i]);
      }
      var JSONanimals = JSON.stringify(newAnimals);
    } else {
      console.error(`Usage: ${node} ${file} create INDEX AGE KIND NAME`);
      process.exit(1);
    }

    fs.writeFile(petsPath, JSONanimals, function(writeErr) {
      if (writeErr) throw writeErr;
    })
    console.log(animal);
  })
} else if (cmd === 'destroy') {
  fs.readFile(petsPath, 'utf8', function(readErr, data) {
    if (readErr) throw readErr;

    var animals = JSON.parse(data);
    var index = process.argv[3];

    if (!index || index < 0 || animals.length - 1 < index) {
      console.error(`Usage: ${node} ${file} destroy INDEX`);
      process.exit(1);
    }
    var animal = animals.splice(index, 1);
    JSONanimals = JSON.stringify(animals);
    fs.writeFile(petsPath, JSONanimals, function(writeErr) {
      if (writeErr) throw writeErr;
    })
    console.log(animal);
  })
} else {
  console.error(`Usage: ${node} ${file} [read | create | update | destroy]`);
  process.exit(1);
}
