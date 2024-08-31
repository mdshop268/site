const tg = window.Telegram.WebApp;

window.onload = function () {
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
        tg.close();
    }
};

// Установка обработчиков событий
tg.BackButton.onClick(handleBackButtonClick);
tg.MainButton.onClick(handleMainButtonClick);
