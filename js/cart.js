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
    const product = e.currentTarget.closest(".product");
    const productId = product.id;
    const count = products.get(productId) || 0;
    products.set(productId, count + 1);

    const productList = document.querySelector(".cart .product__list");
    let item = productList.querySelector(`[id="${productId}"]`);

    item.querySelector(".counter__count").innerHTML = count + 1;
    item.querySelector(".product__price").innerHTML = PRICES[productId].price * (count + 1) + "₴";
    item.querySelector(".product__realprice").innerHTML = PRICES[productId].realprice * (count + 1) + "₴";

    updateCartDisplay();
};

const cartRemoveProduct = () => {
    // Функция удаления продукта, которую можно будет реализовать по аналогии с добавлением
};
