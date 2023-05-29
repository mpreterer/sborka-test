import prices from './constants';

class ProductCard {
	constructor(domParent) {
		this.$container = domParent;
		this._init();
	}

	_init() {
		this._initElements();
		this._initEventListeners();
		this._calculateTotalPrice();
		this._calculateSubPrice();
	}

	formatNumber(number) {
		number = number.toString();
		let result = '';

		for (let k = number.length - 1, c = 0; k >= 0; k--, c++) {
			if (c === 3) {
				c = 0;
				result = number.substr(k, 1) + ' ' + result;
			} else {
				result = number.substr(k, 1) + result;
			}
		}

		return result;
	}

	removeSpacesNumber(number) {
		return number
			.split('')
			.filter(item => item !== ' ')
			.join('');
	}

	_initElements() {
		this.minus = this.$container.querySelector('.js-btn-minus');
		this.plus = this.$container.querySelector('.js-btn-plus');
		this.delete = this.$container.querySelector('.js-btn-delete');
		this.price = this.$container.querySelector('.js-price');
		this.itemsPrice = document.body.querySelectorAll('.js-price');
		this.defaultPrice = +this.$container
			.querySelector('.js-price')
			.getAttribute('data-default-price');
		this.quantity = this.$container.querySelector('.js-quantity');
		this.totalPrice = document.body.querySelector('.js-total-price');
		this.subtotal = document.body.querySelector('.js-subtotal-price');
		this.basket = document.body.querySelector('.js-basket-products');
	}

	_handleClickMinus() {
		if (this.quantity.value - 1 === 0) {
			this._handleClickDelete();
			return;
		}

		this.quantity.value = Number(this.quantity.value) - 1;
		this.price.value = Number(this.price.value) - this.defaultPrice;
		this._calculateTotalPrice();
		this._calculateSubPrice();
	}

	_handleClickPlus() {
		this.quantity.value = Number(this.quantity.value) + 1;
		this.price.value = Number(this.price.value) + this.defaultPrice;
		this._calculateTotalPrice();
		this._calculateSubPrice();
	}

	_handleClickDelete() {
		if (document.body.querySelectorAll('.js-product-card').length === 1) {
			this.basket.innerHTML = 'У вас пустая корзина';
			this.totalPrice.innerHTML =
				Number(this.removeSpacesNumber(this.totalPrice.textContent)) - this.price.value;
			this.subtotal.innerHTML =
				Number(this.removeSpacesNumber(this.subtotal.textContent)) - this.price.value;
			return;
		}

		this.totalPrice.innerHTML =
			Number(this.removeSpacesNumber(this.totalPrice.textContent)) - this.price.value;
		this.subtotal.innerHTML =
			Number(this.removeSpacesNumber(this.subtotal.textContent)) - this.price.value;
		this.$container.remove();
	}

	_calculateTotalPrice() {
		const amountValues = [];
		this.itemsPrice.forEach(item => {
			amountValues.push(Number(item.value));
		});
		const sumPrices =
			amountValues.reduce((acc, item) => acc + item, 0) + prices.shipping + prices.tax;
		this.totalPrice.innerHTML = this.formatNumber(sumPrices);
	}

	_calculateSubPrice() {
		const amountValues = [];
		this.itemsPrice.forEach(item => {
			amountValues.push(Number(item.value));
		});
		const sumPrices = amountValues.reduce((acc, item) => acc + item, 0);
		this.subtotal.innerHTML = this.formatNumber(sumPrices);
	}

	_initEventListeners() {
		this.minus.addEventListener('click', this._handleClickMinus.bind(this));
		this.plus.addEventListener('click', this._handleClickPlus.bind(this));
		this.delete.addEventListener('click', this._handleClickDelete.bind(this));
	}
}

export default ProductCard;
