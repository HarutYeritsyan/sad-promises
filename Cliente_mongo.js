var mongo = require('./connect_mongo_V3.js');
var assert = require('assert');

var defaultUrl = 'mongodb://test:abc123@ds141368.mlab.com:41368/sad-promises';

var db;

exports.connect = function (url) {
  var dbUrl = url ? url : defaultUrl;
  return mongo.connect(dbUrl).then(function (database) {
    db = database;
  });
}

exports.disconnect = function () {
  return mongo.disconnect();
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

exports.getProductById = function (productId) {
  return new Promise(function (resolve, reject) {
    if (!db) reject('DB is NOT connected');

    var collection = db.collection('products');
    collection.find({ cod: productId }).toArray(function (err, product) {
      if (err) throw err;
      if (product && product.length) {
        resolve(product[0]);
      } else {
        resolve(null);
      }
    });
  });
}

exports.checkProductHasStockById = function (productId) {
  return new Promise(function (resolve, reject) {
    if (!db) reject('DB is NOT connected');

    var collection = db.collection('products');
    collection.find({ cod: productId }).toArray(function (err, product) {
      if (err) throw err;
      if (product && product.length) {
        resolve(true);
      } else {
        console.log('ERROR: Product ', productId, ' has no stock');
        resolve(false);
      }
    });
  });
}