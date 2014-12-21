'use strict';

var noteDao = require('./dao');
var util = require('./util');

exports.addNote = function(obj, callback) {
    noteDao.addNote(obj, function(returnValue) {
        util.handleErrors(returnValue, callback);
    });
};

exports.getNotes = function(callback) {
    noteDao.getNotes(callback);
};

exports.editNote = function(obj, callback) {
    /*noteDao.editNote(obj, function(msg, returnValue) {
        util.handleErrors(msg, returnValue, callback);
    });*/

    noteDao.editNote(obj, function(returnValue) {
        util.handleErrors(returnValue, callback);
    });
};
