var shoppingCart = [];

exports.getCart = function () {
    return new Promise(function () {
        return shoppingCart;
    });
}

exports.addToCart = function (item) {
    return new Promise(function (resolve) {
        shoppingCart.push(item);
        resolve();
    });
}

exports.removeFromCart = function (itemId) {
    return new Promise(function (resolve, reject) {
        itemIndex = shoppingCart.findIndex(item => item.id == itemId);
        if (itemIndex > -1) {
            shoppingCart.splice(itemIndex, 1);
            resolve();
        } else {
            reject();
        }
    });
}