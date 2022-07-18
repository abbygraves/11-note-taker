const util = require('util');
const fs = require('fs');

// import uuid package for id's
const {uuid} = require('uuidv4');

const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);

class Store {
  read(){
    return readFileAsync('db/db.json', 'utf-8');
  }

  write(note){
    return writeFileAsync('db/db.json',JSON.stringify(note));
  }

  getNotes(){
    // console.log("inside getNotes")
    //method to get notes
    // use read() method to pull data from db.json, then return an array of the JSON notes
    return this.read().then((notes)=> {
      // return an array of the notes
      return [].concat(JSON.parse(notes));
    })

  }

  addNote(note){
    // method to add notes
    // destructure title and text from note
    const {title, text} = note

    // should probably check if title and text exist, if not throw error

    //adding uuid to the new note
    const newNote = {title, text, id: uuid()};

    // get all the notes, add the new notes, write all the updated notes, return newNote

    return this.getNotes()
      .then((notes)=> [...notes, newNote])
      .then((updatedNotes)=> this.write(updatedNotes))
      .then(()=> newNote);
  }

  removeNote(id) {
    // Get all notes, remove the note with the given id, write the filtered notes
    return this.getNotes()
      .then((notes) => notes.filter((note) => note.id !== id))
      .then((filteredNotes) => this.write(filteredNotes));
  }
}



module.exports = new Store();