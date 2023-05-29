class Checkbox {
	constructor(domParent) {
		this.$container = domParent;
		this.checked = false;
		this._init();
	}

	_init() {
		this.input = this.$container.querySelector('.checkbox__input');
		this.$container.addEventListener('click', this._handleClickCheckbox.bind(this));
	}

	_handleClickCheckbox() {
		this.checked = !this.checked;
		this.input.checked = this.checked;
	}
}

export default Checkbox;
