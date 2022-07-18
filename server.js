const express = require('express');
const fs = require('fs');
const path = require('path');
const db = require('./db/db.json');
const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: true }));  // ⬅︎ parse incoming string or array data
app.use(express.json());  // ⬅︎ parse incoming JSON data
app.use(express.static('./public'));

const { notes } = require('./db/db.json');

const notesArray = [];


function newNote(data) {
  notesArray.push(data);
  fs.writeFileSync(
    path.join(__dirname, './db/db.json'),
    JSON.stringify({ notes: notesArray }, null, 2)
  );

  return data;
}




// API ROUTES
app.get('/api/notes', (req, res) => {
  res.json(notesArray);
});

app.post('/api/notes', (req, res) => {
  const note = newNote(req.body);
  res.json(note);
});





// HTML ROUTES
app.get('/notes', (req, res) => {
  res.sendFile(path.join(__dirname, '/public/notes.html'));
});


app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/public/index.html'));
});






// LISTENER
app.listen(PORT, () => {
  console.log('API server now on port ${PORT}!');
});

