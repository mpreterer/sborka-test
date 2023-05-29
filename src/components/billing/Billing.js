class Billing {
	constructor(domParent) {
		this.$container = domParent;
		this._init();
	}

	_init() {
		this._initElements();
		this.radios.forEach(element => {
			if (element.value === 'card') {
				element.checked = true;
				this.containerPaypal.style.display = 'none';
			}
		});
		this._initEventListeners();
	}

	handleClickRadio() {
		this.radios.forEach(element => {
			if (element.value === 'card' && element.checked === true) {
				this.containerCard.style.display = 'block';
				this.containerPaypal.style.display = 'none';
			}

			if (element.value === 'paypal' && element.checked === true) {
				this.containerPaypal.style.display = 'block';
				this.containerCard.style.display = 'none';
			}
		});
	}

	_initEventListeners() {
		this.radios.forEach(el => {
			el.addEventListener('click', this.handleClickRadio.bind(this));
		});
	}

	_initElements() {
		this.radios = this.$container.querySelectorAll('.js-radio-input');
		this.containerCard = this.$container.querySelector('.js-credit-card-container');
		this.containerPaypal = this.$container.querySelector('.js-container-paypal');
	}
}

export default Billing;
