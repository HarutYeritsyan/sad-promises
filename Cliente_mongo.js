
var mgdb = require('mongodb');
var assert = require('assert');

var mongoClient = mgdb.MongoClient;

var defaultUrl = 'mongodb://test:abc123@ds141368.mlab.com:41368/sad-promises';

var connection;
var db;

exports.connect = function (url) {
  return new Promise(function (resolve, reject) {
    var dbUrl = defaultUrl;
    if (url != null) {
      dbUrl = url;
    }

    mongoClient.connect(dbUrl, function (err, client) {
      if (err) reject(err);
      assert.equal(err, null);

      console.log('conectado');
      connection = client;
      db = client.db('sad-promises');
      resolve();
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

var insertDocuments = function () {
  return new Promise(function (resolve, reject) {
    if (!db) reject('DB is NOT connected');

    // Get the documents collection
    var collection = db.collection('products');
    // Insert some documents
    collection.insertMany([
      { cod: 1, desc: 'palos', stock: 0 }, { cod: 2, desc: 'hierros', stock: 10 }, { cod: 3, desc: 'muelles', stock: 5 }
    ], function (err, result) {
      assert.equal(err, null);
      assert.equal(3, result.result.n);
      assert.equal(3, result.ops.length);
      console.log("Inserted 3 products into the collection");
      resolve(result);
    });
  });
}

exports.getProducts = function () {
  return new Promise(function (resolve, reject) {
    if (!db) reject('DB is NOT connected');

    var collection = db.collection('products');
    collection.find({ stock: { $gte: 0 } }).toArray(function (err, docs) {
      if (err) throw err;
      resolve(docs);
    });
  });
}

exports.checkProductHasStock = function (productId) {
  return new Promise(function (resolve, reject) {
    if (!db) reject('DB is NOT connected');

    var collection = db.collection('products');
    collection.find({ cod: productId }).toArray(function (err, product) {
      if (err) throw err;
      console.log(product);
      resolve(product);
    });
  });
}