var cart = require('./carrito.js');

var itemList = [];

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
    cart.addItemToCart({ cod: 1, desc: 'prueba-item' }).then(function () {
        updateItemList().then(function () {
            cart.finalize().then(function () {
                console.log('updated items: ', itemList);
                console.log('testCart finished');
            });
        });
    }).catch(function (err) {
        console.log('Could not add item to cart: ', err);
    });
}