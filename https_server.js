var cart = require('./carrito.js');

var itemList = [];

var ITEM_CODE_EXAMPLE = 1;

var updateItemList = function () {
    return cart.getItems().then(function (items) {
        itemList = items;
    }).catch(function (err) {
        console.log('Could not retrieve item list from shopping cart: ', err);
    });
}

cart.initialize().then(function () {
    updateItemList().then(function () {
        console.log('initial items: ', itemList);
        testCart();
    });
}).catch(function (err) {
    console.log('Could not initialize cart: ', err);
});

var testCart = function () {
    // using itemCode for a master/detail setup
    cart.addItemToCart(ITEM_CODE_EXAMPLE).then(function () {
        updateItemList().then(function () {
            console.log('added an item: ', itemList);
            cart.removeItemFromCartById(ITEM_CODE_EXAMPLE).then(function () {
                updateItemList().then(function () {
                    console.log('removed an item: ', itemList);
                    closeCart();
                });
            }).catch(function (err) {
                console.log(err);
                closeCart();
            });
        });
    }).catch(function (err) {
        console.log('Could not add item to cart: ', err);
        closeCart();
    });
}

var closeCart = function () {
    cart.finalize().then(function () {
        console.log('testCart finished');
    });
}