
const fs = require('fs');
const util = require('util');


// Use util.promisify to return reponses in a promise object
const readNotes = util.promisify(fs.readFile);
const writeNotes = util.promisify(fs.writeFile);

// create storage class for member methods to handle notes
class Storage {

    read() {
        return readNotes('db/db.json', 'utf8');
    }
    // Return 
    write(note) {
        return writeNotes('db/db.json', JSON.stringify(note));
    }

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
    }

}

module.exports = Storage;