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

const addProduct = (e) => {
    const product = e.currentTarget.closest(".product");
    console.log(product);
    const productId = product.id;
    const count = products.get(productId) || 0;
    products.set(productId, count + 1);

    const productList = document.querySelector(".cart .product__list");
    let item = productList.querySelector(`[id="${productId}"]`);

    if (!item) {
        // Если продукта нет в списке, добавляем новый элемент
        item = document.createElement('div');
        item.id = productId;
        item.innerHTML = `
            <span class="product__name">${product.querySelector('.product__name').textContent}</span>
            <span class="counter__count">${count + 1}</span>
            <span class="product__price">${PRICES[productId].price * (count + 1)}₴</span>
            <span class="product__realprice">${PRICES[productId].realprice * (count + 1)}₴</span>
        `;
        productList.appendChild(item);
    } else {
        // Если продукт уже есть, обновляем его данные
        item.querySelector(".counter__count").innerHTML = count + 1;
        item.querySelector(".product__price").innerHTML = PRICES[productId].price * (count + 1) + "₴";
        item.querySelector(".product__realprice").innerHTML = PRICES[productId].realprice * (count + 1) + "₴";
    }

    updateCartDisplay();
};

const removeProduct = () => {
    // Функция удаления продукта, которую можно будет реализовать по аналогии с добавлением
};
