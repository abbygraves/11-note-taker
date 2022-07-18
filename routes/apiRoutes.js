const router = require('express').Router();
const path = require('path');


// API ROUTES
app.get('/api/notes', (req, res) => {
  res.json(notesArray);
});

app.post('/api/notes', (req, res) => {
  const note = newNote(req.body);
  res.json(note);
});