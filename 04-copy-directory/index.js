
const path = require('path');
const { mkdir, copyFile, readdir, rm } = require('fs/promises');

const pathToFile = path.join(__dirname, 'files');
const pathToCopy = path.join(__dirname, 'files-copy');

async function copyDirectoryFiles(pathToFile, pathToCopy) {
   try {
      await rm(pathToCopy, { recursive: true, force: true });
      await mkdir(pathToCopy, { recursive: true });
      const folderFiles = await readdir(pathToFile, { withFileTypes: true });
      for (let file of folderFiles) {
         if (file.isDirectory()) {
            copyDirectoryFiles(path.join(pathToFile, file.name), path.join(pathToCopy, file.name));
         } else {
            await copyFile(path.join(pathToFile, file.name), path.join(pathToCopy, file.name));
         }
      }
   } catch (error) {
      console.log(error.message);
   }
};


copyDirectoryFiles(pathToFile, pathToCopy);