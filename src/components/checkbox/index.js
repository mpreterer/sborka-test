import Checkbox from './Checkbox.js';

const checkboxes = document.querySelectorAll('.js-checkbox');
checkboxes.forEach(element => new Checkbox(element));
