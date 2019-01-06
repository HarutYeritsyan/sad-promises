
var mgdb = require('mongodb');
var assert = require('assert');

var mongoclient = mgdb.MongoClient;

var defaultUrl = 'mongodb://test:abc123@ds141368.mlab.com:41368/sad-promises';

var db;

exports.connect = function (url) {
  return new Promise(function (resolve, reject) {
    var dbUrl = defaultUrl;
    if (url != null) {
      dbUrl = url;
    }

    mongoclient.connect(dbUrl, function (err, client) {
      if (err) { reject(err) };
      assert.equal(err, null);

      console.log('conectado');
      db = client.db('sad-promises');
      resolve();
    });
  });
}

exports.disconnect = function (callback) {
  if (db) {
    db.close();
  }
  callback();
}

var insertDocuments = function (callback) {
  if (!db) throw 'DB is NOT connected';

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
    callback(result);
  });
}

exports.getProducts = function (callback) {
  if (!db) throw 'DB is NOT connected';

  var collection = db.collection('products');
  collection.find({ stock: { $gte: 5 } }).toArray(function (err, docs) {
    if (err) throw err;
    callback(docs);
  });
}

exports.checkProductStock = function (productId, callback) {
  if (!db) throw 'DB is NOT connected';

  var collection = db.collection('products');
  collection.findOne({ cod: productId }).toArray(function (err, product) {
    if (err) throw err;
    console.log(product);
    callback(product);
  });
}