var products = new Map();
const sample = (id, name, term, price, realprice) => {
	const file = name.toLowerCase()
		.replace(/ /g, "_");
	
	return `
<div class="product" id="${id}">
    <div class="wrap">
        <img src="./images/${name}/${file}.png" alt="${name}" class="product__img">

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
</div>
`;
}

const changeOption = (e) => {
	const product = e.currentTarget.closest('.product');
	const term = e.currentTarget.value;
	
	const price = product.querySelector('.product__price');
	const realprice = product.querySelector('.product__realprice');
	
	if (price) {
		price.textContent = PRICES[product.id + term]["price"] + '₴';
	}
	
	if (realprice) {
		realprice.textContent = PRICES[product.id + term]["realprice"] + '₴';
	}
};


const addToCart = (e) => {
	const product = e.currentTarget.parentElement;
	e.currentTarget.style.display = "none"; product.querySelector(".counter").style.display = "flex";
	const product__list = document.querySelector(".cart .product__list");
	const product__term = product.querySelector(".product__term");
	const term = product__term.selectedOptions[0].innerHTML;
	const id = product.id + product__term.value;
	const count = products.get(id);
	
	products.set(id, count ? count + 1 : 1);
	if (count) {
		let item = product__list.querySelector(`[id="${id}"]`);
		item.querySelector(".counter__count")
			.innerHTML = count + 1;
		item.querySelector(".product__price")
			.innerHTML = PRICES[id]["price"] * (count + 1) + "₴";
		item.querySelector(".product__realprice")
			.innerHTML = PRICES[id]["realprice"] * (count + 1) + "₴";
	} else {
		product__list.innerHTML += (sample(id, product.id, term, PRICES[id]["price"], PRICES[id]["realprice"]));
	}
	
	if (!tg.MainButton.isVisible) tg.MainButton.show();
	tg.MainButton.setText(`КОШИК (${products.size})`);
};

const selectors = document.querySelectorAll(".product__term");
for (const selector of selectors) {
	selector.addEventListener('change', changeOption);
}

const buttons = document.querySelectorAll(".shop .add");
buttons.forEach(button => {
	button.addEventListener("click", addToCart);
});
