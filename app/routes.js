'use strict';

var noteService = require('./services');

module.exports = function(app) {

    app.post('/addNote', function(req, res) {
        var o = req.body;
        console.log(o);
        noteService.addNote([o.title, o.description, o.editable], function(returnValue) {
            res.json(returnValue);
        });
    });

    app.get('/getNotes', function(req, res) {
        noteService.getNotes(function(returnValue) {
            res.json(returnValue);
        });
    });

    app.post('/editNote', function(req, res) {
        var o = req.body;
        console.log(o);
        noteService.editNote([o.title, o.description, o.editable, o.id], function(returnValue) {
            res.json(returnValue);
        });
    });

};
