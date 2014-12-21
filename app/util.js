'use strict';

var errors = require("../errors.json");
exports.handleErrors = function(obj, callback) {
    console.log('handleErrors');
    console.log(obj);

    var res = {};
    res.data = {};

    if (obj.errno) {
        res.message = 'failure';
        res.data.errno = obj.errno;
        res.data.code = obj.code;
        if (obj.errno === errors.sqlcode.ER_DUP_ENTRY) {
            res.data.message = errors.sqlerror.ER_DUP_ENTRY;
        } else {
            res.data.message = errors.common.error;
        }
        callback(res);
    } else {
        res.message = 'success';
        res.data.message = errors.success.common;
        res.data = obj;
        callback(res);
    }
}
