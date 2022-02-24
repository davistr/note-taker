const fs = require('fs');
const util = require('util');


// Use util.promisify to return reponses in a promise object
const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);

// create storage class for member methods to handle notes 
const storage = {
    // Return notes written to json file
    read() {
        return readFileAsync('db/db.json', 'utf8');
    },
    // Write note to json file
    write(notes) {
        return writeFileAsync('db/db.json', JSON.stringify(notes));
    },
    // Return saved notes
    getNotes() {
        return this.read().then((notes) => {

            let savedNotes;
            try {
                savedNotes = [].concat(JSON.parse(notes));
            } catch (err) {
                savedNotes = [];
            }
            return savedNotes;
        });
    },
    // Only add new note if both note title and text fields have content
    addNote(note) {

        const { title, text } = note;
        if (!title || !text) {
            throw new Error("Both 'title' and 'text' field cannot be empty!");
        }

        const newNote = { title, text };

        return this.getNotes()
            .then((notes) => {
                const newArray = [...notes, newNote]
                this.write(newArray)
            });
    }
}

module.exports = storage;