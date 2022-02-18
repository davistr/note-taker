
const router = require('express').Router();
const storage = require('../db/storage');


router.get('/notes', (req, res) => {
    storage
        .getNotes()
        .then((notes) => {
            return res.json(notes);
        })
        .catch((err) => res.status(500).json(err));
});


router.post('/notes', (req, res) => {
    storage
        .addNote(req.body)
        .then((note) => res.json(note))
        .catch((err) => res.status(500).json(err));
})


module.exports = router;