import ProductCard from './ProductCard.js';

const productCards = document.querySelectorAll('.js-product-card');
productCards.forEach(element => new ProductCard(element));
