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

const addProduct = () => {
	const product = e.currentTarget.parentElement;
	const product__list = document.querySelector(".cart .product__list");
	const product__term = product.querySelector(".product__term");
	const term = product__term.selectedOptions[0].innerHTML;
	const id = product.id + product__term.value;
	const count = products.get(id);
};