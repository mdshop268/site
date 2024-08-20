// Карта продуктов с их ID и количеством
const products = new Map();

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
const updateProductPrice = (product, term) => {
    const priceElement = product.querySelector('.product__price');
    const realPriceElement = product.querySelector('.product__realprice');
    const productId = product.id + term;

    if (priceElement) {
        priceElement.textContent = PRICES[productId].price + '₴';
    }

    if (realPriceElement) {
        realPriceElement.textContent = PRICES[productId].realprice + '₴';
    }
};

// Обработчик изменения опции продукта
const changeOption = (e) => {
    const product = e.currentTarget.closest('.product');
    const term = e.currentTarget.value;
    updateProductPrice(product, term);
};

// Добавление продукта в корзину
const addToCart = (e) => {
    const product = e.currentTarget.closest('.product');
    const productList = document.querySelector(".cart .product__list");
    const productTerm = product.querySelector(".product__term");
    const term = productTerm.selectedOptions[0].innerHTML;
    const productId = product.id + productTerm.value;
    const count = products.get(productId) || 0;

    // Обновление количества продукта в корзине
    products.set(productId, count + 1);

    if (count) {
        const item = productList.querySelector(`[id="${productId}"]`);
        item.querySelector(".counter__count").innerHTML = count + 1;
        item.querySelector(".product__price").innerHTML = PRICES[productId].price * (count + 1) + "₴";
        item.querySelector(".product__realprice").innerHTML = PRICES[productId].realprice * (count + 1) + "₴";
    } else {
        productList.innerHTML += generateProductHTML(productId, product.id, term, PRICES[productId].price, PRICES[productId].realprice);
    }

    e.currentTarget.style.display = "none";
    product.querySelector(".counter").style.display = "flex";

    if (!tg.MainButton.isVisible) tg.MainButton.show();
    tg.MainButton.setText(`КОШИК (${products.size})`);
};

// Установка обработчиков событий для изменения опций и добавления в корзину
document.querySelectorAll(".product__term").forEach(selector => {
    selector.addEventListener('change', changeOption);
});

document.querySelectorAll(".shop .add").forEach(button => {
    button.addEventListener("click", addToCart);
});
