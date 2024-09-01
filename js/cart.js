const updateCartDisplay = () => {
    const totalPriceElement = document.querySelector(".cart .total__price");
    const totalRealPriceElement = document.querySelector(".cart .total__realprice");

    const totalPrice = Array.from(products.entries())
        .reduce((sum, [id, count]) => sum + PRICES[id].price * count, 0);
    const totalRealPrice = Array.from(products.entries())
        .reduce((sum, [id, count]) => sum + PRICES[id].realprice * count, 0);

    totalPriceElement.innerHTML = `${totalPrice}₴`;
    totalRealPriceElement.innerHTML = `${totalRealPrice}₴`;

    tg.MainButton.setText(`КУПИТИ ${totalPrice}₴`);
};

const clearCart = () => {
    products.clear();
    updateCartDisplay();

    const productList = document.querySelector(".cart .product__list");
    productList.innerHTML = "";

    tg.MainButton.hide();
};

const cartAddProduct = (e) => {
    const product = e.currentTarget.closest('.product');
    const productTerm = product.querySelector(".product__term");
    const productId = product.id + productTerm.value;
    const cartProductList = document.querySelector(".cart .product__list");
    const cartItem = cartProductList.querySelector(`[id="${productId}"]`);
    const count = (products.get(productId) || 0) + 1;

    products.set(productId, count);

    product.querySelector(".counter__count").innerHTML = count;
    product.querySelector(".product__price").innerHTML = PRICES[productId].price * (count) + "₴";
    product.querySelector(".product__realprice").innerHTML = PRICES[productId].realprice * (count) + "₴";

    cartItem.querySelector(".counter__count").innerHTML = count;
    cartItem.querySelector(".product__price").innerHTML = PRICES[productId].price * (count) + "₴";
    cartItem.querySelector(".product__realprice").innerHTML = PRICES[productId].realprice * (count) + "₴";

    updateCartDisplay();
};

const cartRemoveProduct = () => {
    const product = e.currentTarget.closest('.product');
    const productTerm = product.querySelector(".product__term");
    const productId = product.id + productTerm.value;
    const count = (products.get(productId) || 0) - 1;
    const cartProductList = document.querySelector(".cart .product__list");
    const cartItem = cartProductList.querySelector(`[id="${productId}"]`);

    // Обновление количества продукта в корзине
    products.set(productId, count);

    if (count === 0) {
        cartItem.remove();

        product.querySelector(".append").style.display = "inline-flex";
        product.querySelector(".counter").style.display = "none";
        
        if (Array.from(myMap.values()).some(value => value !== 0) && !tg.MainButton.isVisible) tg.MainButton.show();
        else tg.MainButton.hide();
    } else {
        product.querySelector(".counter__count").innerHTML = count;
        product.querySelector(".product__price").innerHTML = PRICES[productId].price * (count) + "₴";
        product.querySelector(".product__realprice").innerHTML = PRICES[productId].realprice * (count) + "₴";

        cartItem.querySelector(".counter__count").innerHTML = count;
        cartItem.querySelector(".product__price").innerHTML = PRICES[productId].price * (count) + "₴";
        cartItem.querySelector(".product__realprice").innerHTML = PRICES[productId].realprice * (count) + "₴";
    }

    tg.MainButton.setText(`КУПИТИ (${products.size})`);
};
