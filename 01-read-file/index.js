let fs = require('fs');
const path = require('node:path');

let fileContent = fs.createReadStream(path.join(__dirname, 'text.txt'));

fileContent.on('data', data => console.log(data.toString()));
