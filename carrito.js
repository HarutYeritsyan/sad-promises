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

exports.addItemToCart = function (itemCode) {
    return new Promise(function (resolve, reject) {
        dbClient.checkProductHasStockById(itemCode).then(function (hasStock) {
            if (hasStock) {
                // separated functions for checking for stock and retrieving data for product
                dbClient.getProductById(itemCode).then(function (product) {
                    if (product) {
                        shoppingCart.push(product);
                        resolve();
                    } else {
                        reject();
                    }
                });
            } else {
                console.log('ERROR: No stock for ', itemCode);
                reject();
            }
        })
    });
}

exports.removeItemFromCartById = function (itemCode) {
    return new Promise(function (resolve, reject) {
        itemIndex = shoppingCart.findIndex(item => item.cod == itemCode);
        if (itemIndex > -1) {
            shoppingCart.splice(itemIndex, 1);
            resolve();
        } else {
            reject('Item not found in cart');
        }
    });
}