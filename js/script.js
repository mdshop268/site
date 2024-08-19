const tg = window.Telegram.WebApp;

const telegraph = () => {
	window.location.href = "https://google.com";
	tg.BackButton.show();
};

window.onload = function () {
	tg.ready();
	tg.expand();
	
	// tg.CloudStorage.getItem(key, func(err, res));
};

tg.BackButton.onClick(function () {
	const shop = document.querySelector(".shop");
	const cart = document.querySelector(".cart");
	
	shop.classList.add("enable");
	cart.classList.add("disable");
	shop.style.display = "block";
	
	setTimeout(() => {
		cart.classList.remove("disable");
		cart.style.display = "none";
	}, animation);
	
	tg.BackButton.hide();
	tg.MainButton.setText(`КОШИК (${products.size})`);
});

tg.MainButton.onClick(function () {
	if (tg.MainButton.text.startsWith("КОШИК")) {
		const shop = document.querySelector(".shop");
		const cart = document.querySelector(".cart");
		const price = document.querySelector(".cart .total__price");
		const realprice = document.querySelector(".cart .total__realprice");
		price.innerHTML = Array.from(products.keys())
			.reduce(function (sum, product) {
				return sum + PRICES[product]["price"] * products.get(product);
			}, 0) + "₴";
		realprice.innerHTML = Array.from(products.keys())
			.reduce(function (sum, product) {
				return sum + PRICES[product]["realprice"] * products.get(product);
			}, 0) + "₴";
		
		shop.classList.add("disable");
		cart.classList.add("enable");
		cart.style.display = "block";
		setTimeout(() => {
			shop.style.display = "none";
			shop.classList.remove("disable");
		}, animation);
		
		tg.BackButton.show();
		tg.MainButton.setText(`КУПИТИ ${total__price}`);

		const add = document.querySelectorAll(".cart .add");
		const remove = document.querySelectorAll(".cart .remove");
		add.forEach(button => {
			button.addEventListener("click", addProduct);
		});
		remove.forEach(button => {
			button.addEventListener("click", removeProduct);
		})

	} else if (tg.MainButton.text.startsWith("КУПИТИ")) {
		tg.close();
	}
});
