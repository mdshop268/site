const tg = window.Telegram.WebApp;
var products = new Map();

const getCart = (error, value) => {
    if (error) console.log(error);
    else {
        // Карта продуктов с их ID и количеством
        products = new Map(JSON.parse(value));

        products.forEach((count, productId) => {
            const id = productId.replace(/[0-9]/g, '');
            console.log(11);
            const product = document.getElementById(id);
            console.log(12);
            const cartProductList = document.querySelector(".cart .product__list");
            console.log(13);
            const term = parseInt(productId.slice(id.length));
            console.log(14);
            const productTerm = product.querySelector(".product__term");
            console.log(15);
            productTerm.value = term;
            
            console.log(productId, count);
            console.log(id);
            console.log(product);
            console.log(cartProductList);
            console.log(term);
            console.log(productTerm);
            console.log(product.value);

            cartProductList.innerHTML += generateProductHTML(productId, id, term, PRICES[productId].price, PRICES[productId].realprice);
            product.querySelector(".append").style.display = "none";
            product.querySelector(".counter").style.display = "flex";

            console.log(1);
                
            if(count > 1) {
                console.log(2);
                const cartItem = cartProductList.querySelector(`[id="${productId}"]`);
                
                product.querySelector(".counter__count").innerHTML = count;
                product.querySelector(".product__price").innerHTML = PRICES[productId].price * (count) + "₴";
                product.querySelector(".product__realprice").innerHTML = PRICES[productId].realprice * (count) + "₴";
                
                console.log(3);

                cartItem.querySelector(".counter__count").innerHTML = count;
                cartItem.querySelector(".product__price").innerHTML = PRICES[productId].price * (count) + "₴";
                cartItem.querySelector(".product__realprice").innerHTML = PRICES[productId].realprice * (count) + "₴";
            }

            console.log(4);
        });
        console.log(5);
        if (products.size) {
            console.log(6);
            tg.MainButton.show();
            tg.MainButton.setText(`КОШИК (${products.size})`);
            console.log(7);
        }
        console.log(8);
    }
};

window.onload = function () {
    tg.ready();
    tg.expand();
    tg.CloudStorage.getItem("cart", getCart);
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
