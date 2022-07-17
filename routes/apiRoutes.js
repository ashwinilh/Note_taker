const fs = require("fs");

// imported 'uuid' npm package for unique id
const { v4: uuidv4 } = require('uuid');

// ROUTING
module.exports = function (app) {

    // API GET Request
    app.get("/api/notes", (request, response) => {
        
        // Read 'db.json' file 
        let data = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));
        
        // Send read data to response of 'GET' request
        response.json(data);
    });


    // API POST Request
    app.post("/api/notes", (request, response) => {
        const newNote = request.body;
        newNote.id = uuidv4();
        let data = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));
        data.push(newNote);
        fs.writeFileSync('./db/db.json', JSON.stringify(data));
               // Send response
        response.json(data);
    });


    // API DELETE request
    app.delete("/api/notes/:id", (request, response) => {
        // Fetched id to delete
        let noteId = request.params.id.toString();

        // Read data from 'db.json' file
        let data = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));

        // filter data to get notes except the one to delete
        const newData = data.filter( note => note.id.toString() !== noteId );

        // Write new data to 'db.json' file
        fs.writeFileSync('./db/db.json', JSON.stringify(newData));
        
        // Send response
        response.json(newData);
    });
};