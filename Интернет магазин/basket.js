'use strict';
//все элементы в корзине



const getBasketCheckBox = document.querySelector('.header__basket-check-box');
const getBasketTotalValue = document.querySelector('.header__basket-total-all');
const getBasketTotalValueSpan = document.querySelector('.header__basket-total-value');
const getIconWrap = document.querySelector('.header__cartIconWrap span')

const basket = {};

document.querySelector('.product__box__content').addEventListener('click', event => { 
    if (!event.target.closest('.product__add')) {
        return;
    }
    const getProduct = event.target.closest('.product');
    const id = +getProduct.dataset.id;
    const price = +getProduct.dataset.price;
    const name = getProduct.dataset.name;

    addToCart(id, name, price);
})

function addToCart(id, name, price) {
    if(!(id in basket)) {
        basket[id] = {id: id, name: name, price: price, count: 0}
    }
    basket[id].count++;
    getIconWrap.textContent = getTotalBasketCount().toString();
    getBasketTotalValueSpan.textContent = getTotalBasketPrice().toFixed(2);
    renderProductInBasket(id);
}

function getTotalBasketCount() {
    return Object.values(basket).reduce((acc, product) => acc + product.count, 0);
}

function getTotalBasketPrice() {
   return Object
    .values(basket)
    .reduce((acc, product) => acc + product.price * product.count, 0);
}

function renderProductInBasket(productID) {
    const basketRowEl = getBasketCheckBox
        .querySelector(`.header__basket-check-row[data-id = "${productID}"]`);
    if(!basketRowEl) {
        renderNewProductInBasket(productID);
        return;
    }

    const product = basket[productID];
    basketRowEl.querySelector(".productCount").textContent = product.count;
    basketRowEl.querySelector(".productTotalRow")
        .textContent = (product.price * product.count).toFixed();
}

function renderNewProductInBasket(productID) {
    const productRow = 
        `<div class = "header__basket-check-row" data-id = "${productID}">
            <div> ${basket[productID].name}</div>
            <div>
                <span class = "productCount">${basket[productID].count}</span> шт.
            </div>
            <div>${basket[productID].price}</div>
            <div>
            <span class = "productTotalRow">
                ${(basket[productID].price * basket[productID].count).toFixed(2)}
            </span>
            </div>
        </div>
        `;
        getBasketTotalValue.insertAdjacentHTML("beforebegin", productRow);
}