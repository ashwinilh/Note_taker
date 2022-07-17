const path = require("path");

module.exports = function (app){

    // Get requests for HTML
    // The following code handles when the user handles when the user enters on landing page
    // The user is shown html page in both of the below cases
    
    app.get('/notes', function(request, response) {
        response.sendFile(path.join(__dirname, '../public/notes.html'));
    });

    app.get('*', function(request, response) {
        response.sendFile(path.join(__dirname, '../public/index.html'));
    });
    
};