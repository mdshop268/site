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

const removeProduct = () => {

};
