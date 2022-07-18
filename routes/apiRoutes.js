const router = require('express').Router();
const db = require('../db/db')


// API ROUTES
router.get('/api/notes', (req, res) => {
  db
    .getNotes()
    .then((notes)=>{
      return res.json(notes);
    })
    .catch((error)=> res.status(500).json(error))
});

router.post('/api/notes', (req, res) => {
  const newNote = req.body;
  
  db
    .addNote(newNote)
    .then((note)=> res.json(note))
    .catch((error)=> res.status(500).json(error))
});

module.exports = router