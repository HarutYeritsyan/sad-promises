// Use with mongodb V2
var mgdb = require('mongodb');
var assert = require('assert');

var mongoClient = mgdb.MongoClient;

var db;

exports.connect = function (url) {
    return new Promise(function (resolve, reject) {

        mongoClient.connect(url, function (err, database) {
            if (err) reject(err);
            assert.equal(err, null);

            db = database;
            console.log('connected');
            resolve(db);
        });
    });
}

exports.disconnect = function () {
    return new Promise(function (resolve) {
        if (db) {
            db.close();
        }
        resolve();
    });
}