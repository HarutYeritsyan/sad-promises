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

function processEntry(name) {
    // any path inside the promise is asynchronous
    return new Promise(function(resolve) {
        if (rolodex[name]) {
            resolve(rolodex[name]);
        }
        else {
            retrieve(rolodexFile, name, function (val) {
                rolodex[name] = val;
                resolve(val);
            });
        }
    });
}

function test() {

    testNames.forEach(function (name) {
        console.log('processing ', name);
        // processEntry is always asynchronous
        processEntry(name).then(function (res) {
            console.log('processed ', name);
        });
    });
}

var testNames = ['a', 'b', 'c'];

test();
