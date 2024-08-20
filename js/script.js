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
		
		console.log(1);
		const add = document.querySelectorAll(".cart .add");
		console.lot(2);
		const remove = document.querySelectorAll(".cart .remove");
		console.lot(3);
		add.forEach(button => {
			console.log(button);
			button.addEventListener("click", (e) => {
				products.set(id, count + 1);
			
				const product = e.currentTarget.parentElement;
				const product__list = document.querySelector(".cart .product__list");
				const product__term = product.querySelector(".product__term");
				const id = product.id + product__term.value;
				const count = products.get(id);
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
		console.lot(4);
		remove.forEach(button => {
			button.addEventListener("click", removeProduct);
		});
		console.lot(5);

		tg.BackButton.show();
		tg.MainButton.setText(`КУПИТИ ${total__price}`);
		console.lot(6);
	} else if (tg.MainButton.text.startsWith("КУПИТИ")) {
		tg.close();
	}
});
