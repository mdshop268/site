const tg = window.Telegram.WebApp;
var products = new Map();

const getCart = (error, value) => {
    if (error) console.log(error);
    else {
        // Карта продуктов с их ID и количеством
        products = new Map(JSON.parse(value));

        products.forEach((count, productId) => {
            const id = productId.replace(/[0-9]/g, '');
            const product = document.getElementById(id);
            const cartProductList = document.querySelector(".cart .product__list");
            const productTerm = product.querySelector(".product__term");
            productTerm.value = parseInt(productId.slice(id.length));
            const term = productTerm.selectedOptions[0].innerHTML;

            cartProductList.innerHTML += generateProductHTML(productId, id, term, PRICES[productId].price, PRICES[productId].realprice);
            product.querySelector(".append").style.display = "none";
            product.querySelector(".counter").style.display = "flex";
                
            if(count > 1) {
                const cartItem = cartProductList.querySelector(`[id="${productId}"]`);
                
                product.querySelector(".counter__count").innerHTML = count;
                product.querySelector(".product__price").innerHTML = PRICES[productId].price * (count) + "₴";
                product.querySelector(".product__realprice").innerHTML = PRICES[productId].realprice * (count) + "₴";

                cartItem.querySelector(".counter__count").innerHTML = count;
                cartItem.querySelector(".product__price").innerHTML = PRICES[productId].price * (count) + "₴";
                cartItem.querySelector(".product__realprice").innerHTML = PRICES[productId].realprice * (count) + "₴";
            }
        });
        if (products.size) {
            tg.MainButton.show();
            tg.MainButton.setText(`КОШИК (${products.size})`);
        }
    }
};

window.onload = function () {
    tg.CloudStorage.getItem("cart", getCart);
    tg.ready();
    tg.expand();
};

// Обработка клика на кнопку "Назад"
const handleBackButtonClick = () => {
    const shop = document.querySelector(".shop");
    const cart = document.querySelector(".cart");

    toggleDisplay(shop, cart, true);

    tg.BackButton.hide();
    tg.MainButton.setText(`КОШИК (${products.size})`);
};

// Переключение видимости элементов shop и cart
const toggleDisplay = (showElement, hideElement, showBackButton = false) => {
    showElement.classList.add("enable");
    hideElement.classList.add("disable");
    showElement.style.display = "block";

    setTimeout(() => {
        hideElement.classList.remove("disable");
        hideElement.style.display = "none";
    }, animation);

    if (showBackButton) {
        tg.BackButton.show();
    }
};

// Расчет общей суммы корзины
const calculateTotalPrice = () => {
    return Array.from(products.keys()).reduce((sum, product) => {
        return sum + PRICES[product].price * products.get(product);
    }, 0);
};

// Обновление итоговых цен в корзине
const updateCartPrices = () => {
    const totalPriceElement = document.querySelector(".cart .total__price");
    const totalRealPriceElement = document.querySelector(".cart .total__realprice");

    const totalPrice = calculateTotalPrice();
    const totalRealPrice = Array.from(products.keys()).reduce((sum, product) => {
        return sum + PRICES[product].realprice * products.get(product);
    }, 0);

    totalPriceElement.innerHTML = `${totalPrice}₴`;
    totalRealPriceElement.innerHTML = `${totalRealPrice}₴`;
};

// Обработка клика на главную кнопку
const handleMainButtonClick = () => {
    if (tg.MainButton.text.startsWith("КОШИК")) {
        const shop = document.querySelector(".shop");
        const cart = document.querySelector(".cart");

        updateCartPrices();
        toggleDisplay(cart, shop, true);

        const addButtons = document.querySelectorAll(".cart .add");
        const removeButtons = document.querySelectorAll(".cart .remove");

        addButtons.forEach(button => {
            button.addEventListener("click", cartAddProduct);
        });
        removeButtons.forEach(button => {
            button.addEventListener("click", cartRemoveProduct);
        });

		const totalPrice = calculateTotalPrice();
    	tg.MainButton.setText(`КУПИТИ ${totalPrice}₴`);
    } else if (tg.MainButton.text.startsWith("КУПИТИ")) {
        tg.CloudStorage.setItem("cart", "");
        tg.close();
    }
};

// Установка обработчиков событий
tg.BackButton.onClick(handleBackButtonClick);
tg.MainButton.onClick(handleMainButtonClick);
