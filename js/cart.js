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
    const shopProductList = document.querySelector(".shop .product__list");
    const shopItem = shopProductList.querySelector(`[id="${product.id.replace(/[0-9]/g, '')}"]`);
    const count = (products.get(product.id) || 0) + 1;

    products.set(product.id, count);

    product.querySelector(".counter__count").innerHTML = count;
    product.querySelector(".product__price").innerHTML = PRICES[product.id].price * (count) + "₴";
    product.querySelector(".product__realprice").innerHTML = PRICES[product.id].realprice * (count) + "₴";

    shopItem.querySelector(".counter__count").innerHTML = count;
    shopItem.querySelector(".product__price").innerHTML = PRICES[product.id].price * (count) + "₴";
    shopItem.querySelector(".product__realprice").innerHTML = PRICES[product.id].realprice * (count) + "₴";

    updateCartDisplay();
    tg.MainButton.setText(`КУПИТИ (${products.size})`);
    tg.CloudStorage.setItem("cart", JSON.stringify(Array.from(products.entries())), (error, value) => {if(error) console.log(error)});
};

const cartRemoveProduct = (e) => {
    const product = e.currentTarget.closest('.product');
    const shopProductList = document.querySelector(".shop .product__list");
    const shopItem = shopProductList.querySelector(`[id="${product.id.replace(/[0-9]/g, '')}"]`);
    const count = (products.get(product.id) || 0) - 1;

    // Обновление количества продукта в корзине
    products.set(product.id, count);

    if (count === 0) {
        product.remove();

        shopItem.querySelector(".append").style.display = "inline-flex";
        shopItem.querySelector(".counter").style.display = "none";
        
        if (Array.from(products.values()).some(value => value !== 0) && !tg.MainButton.isVisible) tg.MainButton.show();
        else tg.MainButton.hide();
    } else {
        product.querySelector(".counter__count").innerHTML = count;
        product.querySelector(".product__price").innerHTML = PRICES[product.id].price * (count) + "₴";
        product.querySelector(".product__realprice").innerHTML = PRICES[product.id].realprice * (count) + "₴";

        shopItem.querySelector(".counter__count").innerHTML = count;
        shopItem.querySelector(".product__price").innerHTML = PRICES[product.id].price * (count) + "₴";
        shopItem.querySelector(".product__realprice").innerHTML = PRICES[product.id].realprice * (count) + "₴";
    }

    updateCartDisplay();
    tg.MainButton.setText(`КУПИТИ (${products.size})`);
    tg.CloudStorage.setItem("cart", JSON.stringify(Array.from(products.entries())), (error, value) => {if(error) console.log(error)});
};
