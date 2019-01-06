var dbClient = require('./Cliente_mongo');

var shoppingCart = [];

exports.initialize = function () {
    return dbClient.connect();
}

exports.getItems = function () {
    return new Promise(function (resolve) {
        resolve(shoppingCart);
    });
}

exports.addItemToCart = function (item) {
    return new Promise(function (resolve) {
        shoppingCart.push(item);
        resolve();
    });
}

exports.removeItemFromCartById = function (itemId) {
    return new Promise(function (resolve, reject) {
        itemIndex = shoppingCart.findIndex(item => item.code == itemId);
        if (itemIndex > -1) {
            shoppingCart.splice(itemIndex, 1);
            resolve();
        } else {
            reject('Item not found in cart');
        }
    });
}