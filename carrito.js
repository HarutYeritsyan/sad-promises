var dbClient = require('./Cliente_mongo');

var shoppingCart = [];

exports.initialize = function (url) {
    return dbClient.connect(url);
}

exports.finalize = function () {
    return dbClient.disconnect();
}

exports.getItems = function () {
    return new Promise(function (resolve) {
        resolve(shoppingCart);
    });
}

exports.addItemToCart = function (item) {
    return new Promise(function (resolve) {
        dbClient.getProductById(item.cod).then(function (product) {
            if (product) {
                shoppingCart.push(product);
            } else {
                console.log('ERROR: No stock for ', item.desc);
            }
            resolve();
        });
    });
}

exports.removeItemFromCartById = function (itemCode) {
    return new Promise(function (resolve, reject) {
        itemIndex = shoppingCart.findIndex(item => item.code == itemCode);
        if (itemIndex > -1) {
            shoppingCart.splice(itemIndex, 1);
            resolve();
        } else {
            reject('Item not found in cart');
        }
    });
}