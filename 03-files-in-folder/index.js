const path = require('path');
const fs = require('fs');
const { readdir } = require('fs/promises');
const { LOADIPHLPAPI } = require('dns');

const pathToFolder = path.join(__dirname, 'secret-folder');


async function logFiles(pathToFolder) {
   try {
      const folderFiles = await readdir(pathToFolder, { withFileTypes: true });
      folderFiles.forEach(element => {
         if (element.isFile()) {
            fs.stat(path.join(pathToFolder, element.name), (error, stat) => {
               if (error) {
                  console.log(error.message);
               } else {
                  const pathToFile = path.join(pathToFolder, element.name);
                  console.log(`${path.parse(pathToFile).name} - ${path.extname(pathToFile).slice(1)} - ${stat.size / 1000}Kb`);
               }
            });
         }
      });
   } catch (error) {
      console.log(error.message);
   }
};