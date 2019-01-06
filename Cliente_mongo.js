
var mgdb = require('mongodb');
var assert = require('assert');

var mongoclient = mgdb.MongoClient;

var url = 'mongodb://test:abc123@ds141368.mlab.com:41368/sad-promises'

mongoclient.connect(url, function (err, client) {
  assert.equal(err, null);
  console.log('conectado');

  var db = client.db('sad-promises');

  /*
  db.createCollection("documents", function (err, res) {
    if (err) throw err;
    console.log("Collection created!");
    insertDocuments(db, function () {
      if (err) throw err;
      console.log('success with insertion!');
      client.close();
    });
  });
  */

  getDocuments(db, function (documents) {
    console.log(documents);
    client.close();
  });
});



var insertDocuments = function (db, callback) {
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

var getDocuments = function (db, callback) {
  var collection = db.collection('products');
  collection.find({ stock: { $gte: 5 } }).toArray(function (err, docs) {
    if (err) throw err;
    callback(docs);
  });
}