// Генерация HTML-кода для продукта
const generateProductHTML = (id, name, term, price, realprice) => {
    const fileName = name.toLowerCase().replace(/ /g, "_");
    return `
<div class="product" id="${id}">
    <div class="wrap">
        <img src="./images/${name}/${fileName}.png" alt="${name}" class="product__img">
        <div class="product__info">
            <p class="product__name">${name}</p>
            <p class="product__term">${term}</p>
            <div class="counter">
                <button class="counter__button remove">
                    <i class="material-icons minus">remove</i>
                </button>
                <span class="counter__count">1</span>
                <button class="counter__button add">
                    <i class="material-icons plus">add</i>
                </button>
            </div>
        </div>
    </div>
    <div class="wrap__price">
        <span class="product__price">${price}₴</span>
        <span class="product__realprice">${realprice}₴</span>
    </div>
</div>`;
};

// Обновление цены продукта при изменении опции
const updateProductPrice = (product, term, count = 1) => {
    const priceElement = product.querySelector('.product__price');
    const realPriceElement = product.querySelector('.product__realprice');
    const productId = product.id + term;

    if (priceElement) {
        priceElement.textContent = PRICES[productId].price * count + '₴';
    }

    if (realPriceElement) {
        realPriceElement.textContent = PRICES[productId].realprice * count + '₴';
    }
};

// Обработчик изменения опции продукта
const changeOption = (e) => {
    const product = e.currentTarget.closest('.product');
    const append = product.querySelector(".append");
    const counter = product.querySelector(".counter");
    const term = e.currentTarget.value;
    const productId = product.id + term;
    const count = (products.get(productId) || 0);
    updateProductPrice(product, term, count ? count : 1);

    if (counter.style.display === "none" && count) {
        append.style.display = "none";
        counter.style.display = "flex";
    } else {
        if (count) {
            counter.querySelector(".counter__count").innerHTML = count;
        } else {
            counter.querySelector(".counter__count").innerHTML = 1;
            append.style.display = "inline-flex";
            counter.style.display = "none";
        }
    }
};

// Добавление продукта в корзину
const shopAddProduct = (e) => {
    const product = e.currentTarget.closest('.product');
    const cartProductList = document.querySelector(".cart .product__list");
    const productTerm = product.querySelector(".product__term");
    const term = productTerm.selectedOptions[0].innerHTML;
    const productId = product.id + productTerm.value;
    const count = (products.get(productId) || 0) + 1;

    // Обновление количества продукта в корзине
    products.set(productId, count);

    if (count === 1) {
        cartProductList.innerHTML += generateProductHTML(productId, product.id, term, PRICES[productId].price, PRICES[productId].realprice);
        e.currentTarget.style.display = "none";
        product.querySelector(".counter").style.display = "flex";
        
        if (!tg.MainButton.isVisible) tg.MainButton.show();
    } else {
        const cartItem = cartProductList.querySelector(`[id="${productId}"]`);

        product.querySelector(".counter__count").innerHTML = count;
        product.querySelector(".product__price").innerHTML = parseFloat((PRICES[productId].price * count).toFixed(1)) + "₴";
        product.querySelector(".product__realprice").innerHTML = parseFloat((PRICES[productId].realprice * count).toFixed(1)) + "₴";

        cartItem.querySelector(".counter__count").innerHTML = count;
        cartItem.querySelector(".product__price").innerHTML = parseFloat((PRICES[productId].price * count).toFixed(1)) + "₴";
        cartItem.querySelector(".product__realprice").innerHTML = parseFloat((PRICES[productId].realprice * count).toFixed(1)) + "₴";
    }

    tg.MainButton.setText(`КОШИК (${products.size})`);
    tg.CloudStorage.setItem("cart", JSON.stringify(Array.from(products.entries())), (error, value) => {if(error) console.log("!!!ERROR!!!\n" + error)});
};

const shopRemoveProduct = (e) => {
    const product = e.currentTarget.closest('.product');
    const productTerm = product.querySelector(".product__term");
    const productId = product.id + productTerm.value;
    const count = (products.get(productId) || 0) - 1;
    const cartProductList = document.querySelector(".cart .product__list");
    const cartItem = cartProductList.querySelector(`[id="${productId}"]`);

    // Обновление количества продукта в корзине
    if(!count) products.delete(productId);
    else products.set(productId, count);

    if (count === 0) {
        cartItem.remove();

        product.querySelector(".append").style.display = "inline-flex";
        product.querySelector(".counter").style.display = "none";
    } else {
        product.querySelector(".counter__count").innerHTML = count;
        product.querySelector(".product__price").innerHTML = parseFloat((PRICES[productId].price * count).toFixed(1)) + "₴";
        product.querySelector(".product__realprice").innerHTML = parseFloat((PRICES[productId].realprice * count).toFixed(1)) + "₴";

        cartItem.querySelector(".counter__count").innerHTML = count;
        cartItem.querySelector(".product__price").innerHTML = parseFloat((PRICES[productId].price * count).toFixed(1)) + "₴";
        cartItem.querySelector(".product__realprice").innerHTML = PparseFloat((PRICES[productId].realprice * count).toFixed(1)) + "₴";
    }

    if (products.size) tg.MainButton.setText(`КОШИК (${products.size})`);
    else tg.MainButton.hide();
    tg.CloudStorage.setItem("cart", JSON.stringify(Array.from(products.entries())), (error, value) => {if(error) console.log("!!!ERROR!!!\n" + error)});
};

// Установка обработчиков событий для изменения опций и добавления в корзину
document.querySelectorAll(".product__term").forEach(selector => {
    selector.addEventListener('change', changeOption);
});

document.querySelectorAll(".shop .append, .shop .add").forEach(button => {
    button.addEventListener("click", shopAddProduct);
});
document.querySelectorAll(".shop .remove").forEach(button => {
    button.addEventListener("click", shopRemoveProduct);
});
