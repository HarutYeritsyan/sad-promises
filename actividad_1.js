// synchronous loading
var rolodexFile = {
    a: 'We know A',
    b: 'We know B',
    c: 'We know C'
};

var rolodex = { a: 'We know this name' };

function retrieve(file, name, cb) {

    //	Searches for name in file, and
    //	invokes cb asynchronously
    setTimeout(function () {
        var person = file[name];
        cb(person);
    }, 0);
}

function processEntry(name, cb) {

    if (rolodex[name]) {
        // callback is called synchronously
        cb(rolodex[name]);
    }
    else {
        // callback function will be called asynchronously by retrieve()
        retrieve(rolodexFile, name, function (val) {
            rolodex[name] = val;
            cb(val);
        });
    }
}

function test() {

    for (var n of testNames) {
        console.log('processing ', n);
        processEntry(n, function (res) {
            console.log('processed ', n);
        })

    }
}

var testNames = ['a', 'b', 'c'];

test();
