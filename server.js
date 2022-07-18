const express = require('express');
const fs = require('fs');
const path = require('path');
const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: true }));  // ⬅︎ parse incoming string or array data
app.use(express.json());  // ⬅︎ parse incoming JSON data
app.use(express.static('public'));

const { notes } = require('./Develop/db/db.json');

const notesArray = [];

function newNote(body, notesArray) {
  const note = body;
  notesArray.push(note);
  fs.writeFileSync(
    path.join(__dirname, './Develop/db/db.json'),
    JSON.stringify({ notes: notesArray }, null, 2)
  );

  return note;
}


// API ROUTES
app.get('/api/notes', (req, res) => {
  let results = notes;
  res.json(results);
});

app.post('/api/notes', (req, res) => {
  req.body.id = notes.length.toString();
  const note = createNewNote(req.body, notes);
  res.json(note);
});





// HTML ROUTES
app.get('/notes', (req, res) => {
  res.sendFile(path.join(__dirname, './Develop/public/notes.html'));
});


app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, './Develop/public/index.html'));
});



// LISTENER
app.listen(PORT, () => {
  console.log('API server now on port ${PORT}!');
});

