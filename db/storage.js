
const fs = require('fs');
const util = require('util');


// Use util.promisify to return reponses in a promise object
const readNotes = util.promisify(fs.readFile);
const writeNotes = util.promisify(fs.writeFile);

// create storage class for member methods to handle notes

// Return notes written to json file
const read = () => {
    return readNotes('db/db.json', 'utf8');
};
// Write note to json file
const write = note => {
    return writeNotes('db/db.json', JSON.stringify(note));
};
// Return saved notes
const getNotes = () => {
    return this.read().then((notes) => {

        let savedNotes;
        try {
            savedNotes = [].concat(JSON.parse(notes));
        } catch (err) {
            savedNotes = [];
        }
        return savedNotes;
    });
};
// Only add new note if both note title and text fields have content
const addNote = note => {

    const { title, text } = note;
    if (!title || text) {
        throw new Error("Both 'title' and 'text' field cannot be empty!");
    }

    const newNote = { title, text };

    return this.getNotes()
        .then((notes) => [...notes, newNote]);
};

module.exports = { read, write, getNotes, addNote };