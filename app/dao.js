'use strict';

var pg = require('pg');
var conString = "postgres://postgres:jackal@localhost:5432/notes";
var queries = {
    "getNotes": "SELECT * from notes",
    "addNote": "INSERT INTO notes(title, description, created, editable) VALUES($1, $2, now(), $3) RETURNING id",
    "editNote": "UPDATE notes SET title = $1, description = $2, updated = now(), editable = $3 WHERE id = $4"
};


exports.getNotes = function(callback) {
    try {
        var client = new pg.Client(conString);
        var getNotesSQL = queries.getNotes;
        client.connect(function(err) {
            if (err) {
                return console.error('could not connect to postgres', err);
            }
            client.query(getNotesSQL, function(err, result) {
                if (err) {
                    return console.error('error running query', err);
                }
                client.end();
                callback(result.rows);
            });
        });

    } catch (e) {
        console.log(e);
    }
};

exports.addNote = function(obj, callback) {
    try {
        var client = new pg.Client(conString);
        var addNoteSQL = queries.addNote;
        client.connect(function(err) {
            if (err) {
                return console.error('could not connect to postgres', err);
            }
            client.query(addNoteSQL, obj, function(err, result) {
                console.log('-----------------------');
                console.log(result);
                console.log(result.rows[0].id);
                if (err) {
                    return console.error('error running query', err);
                }
                client.end();
                callback(result.rows[0].id);
            });
        });
    } catch (e) {
        console.log(e);
    }
};

exports.editNote = function(obj, callback) {
    console.log(obj)
    try {
        var client = new pg.Client(conString);
        var editNoteSQL = queries.editNote;
        client.connect(function(err) {
            if (err) {
                return console.error('could not connect to postgres', err);
            }
            client.query(editNoteSQL, obj, function(err, result) {
                if (err) {
                    return console.error('error running query', err);
                }
                client.end();
                callback(result.rows);
            });
        });

    } catch (e) {
        console.log(e);
    }
};
