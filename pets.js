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

} else if (cmd === 'update'){

} else if (cmd === 'destroy') {

} else {
  console.error(`Usage: ${node} ${file} [read | create | update | destroy]`);
  process.exit(1);
}
