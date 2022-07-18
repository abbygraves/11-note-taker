const util = require('util');
const fs = require('fs');

// import uuid package for id's
const {uuid} = require('uuidv4');

const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);

class db {
  read(){
    return readFileAsync('db.json', 'utf-8');
  }

  write(note){
    return writeFileAsync('db.json',JSON.stringify(note));
  }

  getNotes(){
    //method to get notes
    
  }

  addNote(note){
    // method to add notes
  }

  removeNote(id){
    //method to remove notes
  }
}


function newNote(data) {
  notesArray.push(data);
  fs.writeFileSync(
    path.join(__dirname, './db/db.json'),
    JSON.stringify({ notes: notesArray }, null, 2)
  );

  return data;
};