var cart = require('./carrito.js');

var itemList = [];

var updateItemList = function () {
    return cart.getItems().then(function (items) {
        itemList = items;
        console.log('items: ', itemList);
    }).catch(function (err) {
        console.log('Could not retrieve item list from shopping cart: ', err);
    });
}

cart.initialize().then(function () {
    updateItemList().then(function () {
        testCart();
    });
}).catch(function (err) {
    console.log('Could not initialize cart: ', err);
});

var testCart = function () {
    cart.addItemToCart({ cod: 999, desc: 'prueba-item' }).then(function () {
        updateItemList();
    }).catch(function (err) {
        console.log('Could not add item to cart: ', err);
    });
}