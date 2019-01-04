var fs = require('fs');

var rolodexFile = fs.open('My rollodex file');
var rolodex = { a: 'We know this name' };

function retrieve(file, name, cb) {

    //	Searches for name in file, and
    //	invokes cb with record found
}

function processEntry(name, cb) {

    if (rolodex[name]) {
        cb(rolodex[name]);
    }
    else {
        retrieve(rolodexFile, name, function (val) {
            rolodex[name] = val;
            cb(val);
        });
    }
}

function test() {

    for (var n in testNames) {
        console.log('processing ', n);
        processEntry(n, function (res) {
            console.log('processed ', n);
        })

    }
}

var testNames = ['a', 'b', 'c'];

test();
