const tg = window.Telegram.WebApp;

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
		const total__price = Array.from(products.keys())
			.reduce(function (sum, product) {
				return sum + PRICES[product]["price"] * products.get(product);
			}, 0) + "₴";

		price.innerHTML = total__price;
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
		
		const add = document.querySelectorAll(".cart .add");
		const remove = document.querySelectorAll(".cart .remove");
		add.forEach(button => {
			button.addEventListener("click", (e) => {
				const product = e.currentTarget.parentElement;
				const product__list = document.querySelector(".cart .product__list");
				const product__term = product.querySelector(".product__term");
				const id = product.id + product__term.value;
				const count = products.get(id);
				const price = document.querySelector(".cart .total__price");
				const realprice = document.querySelector(".cart .total__realprice");
				products.set(id, count + 1);
				const total__price = Array.from(products.keys())
				.reduce(function (sum, product) {
					return sum + PRICES[product]["price"] * products.get(product);
				}, 0) + "₴";
				price.innerHTML = total__price;
				realprice.innerHTML = Array.from(products.keys())
				.reduce(function (sum, product) {
					return sum + PRICES[product]["realprice"] * products.get(product);
				}, 0) + "₴";
				
				let item = product__list.querySelector(`[id="${id}"]`);
				item.querySelector(".counter__count")
					.innerHTML = count + 1;
				item.querySelector(".product__price")
					.innerHTML = PRICES[id]["price"] * (count + 1) + "₴";
				item.querySelector(".product__realprice")
					.innerHTML = PRICES[id]["realprice"] * (count + 1) + "₴";
			
				tg.MainButton.setText(`КУПИТИ ${total__price}`);
			});
		});
		remove.forEach(button => {
			button.addEventListener("click", removeProduct);
		});

		tg.BackButton.show();
		tg.MainButton.setText(`КУПИТИ ${total__price}`);
	} else if (tg.MainButton.text.startsWith("КУПИТИ")) {
		tg.close();
	}
});
