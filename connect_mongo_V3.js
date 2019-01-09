// Use with mongodb V3
var mgdb = require('mongodb');
var assert = require('assert');

var mongoClient = mgdb.MongoClient;

var connection;

exports.connect = function (url) {
  return new Promise(function (resolve, reject) {

    mongoClient.connect(url, function (err, client) {
      if (err) reject(err);
      assert.equal(err, null);

      console.log('connected');
      connection = client;
      db = client.db('sad-promises');
      resolve(db);
    });
  });
}

exports.disconnect = function () {
  return new Promise(function (resolve) {
    if (connection) {
      connection.close();
    }
    resolve();
  });
}