const clearCart = () => {
	products.clear();
	
	const price = document.querySelector(".cart .total__price");
	const realprice = document.querySelector(".cart .total__realprice");
	const product__list = document.querySelector(".cart .product__list");
	
	price.innerHTML = "0₴";
	realprice.innerHTML = "0₴";
	product__list.innerHTML = "";
	
	tg.MainButton.hide();
};

const addProduct = (e) => {
	const product = e.currentTarget.parentElement;
	const product__list = document.querySelector(".cart .product__list");
	const count = products.get(product.id);
	const price = document.querySelector(".cart .total__price");
	const realprice = document.querySelector(".cart .total__realprice");
	products.set(product.id, count + 1);
	console.log(products);
	const total__price = Array.from(products.keys())
	.reduce(function (sum, p) {
	console.log(PRICES[p]);
	console.log(PRICES[p]["price"]);
		return sum + PRICES[p]["price"] * products.get(p);
	}, 0) + "₴";
	price.innerHTML = total__price;
	realprice.innerHTML = Array.from(products.keys())
	.reduce(function (sum, p) {
		return sum + PRICES[p]["realprice"] * products.get(p);
	}, 0) + "₴";
	
	let item = product__list.querySelector(`[id="${product.id}"]`);
	item.querySelector(".counter__count")
		.innerHTML = count + 1;
	item.querySelector(".product__price")
		.innerHTML = PRICES[product.id]["price"] * (count + 1) + "₴";
	item.querySelector(".product__realprice")
		.innerHTML = PRICES[product.id]["realprice"] * (count + 1) + "₴";

	tg.MainButton.setText(`КУПИТИ ${total__price}`);
};

const removeProduct = () => {

};
