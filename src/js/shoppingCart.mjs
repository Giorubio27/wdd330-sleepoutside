import { getLocalStorage, renderListWithTemplate } from "./utils.mjs";

function cartItemTemplate(item) {
  // Logic to find the best available image URL
  const imageUrl = item.Image ||
    (item.Images && item.Images.PrimaryMedium) ||
    (item.Images && item.Images.PrimaryLarge);
    

  const newItem = `<li class="cart-card divider">
      <a href="#" class="cart-card__image">
        <img
          src="${imageUrl}"
          alt="${item.Name}"
        />
      </a>
      <a href="#">
        <h2 class="card__name">${item.Name}</h2>
      </a>
      <p class="cart-card__color">${item.Colors[0].ColorName}</p>
      <p class="cart-card__quantity">qty: 1</p>
      <p class="cart-card__price">$${item.FinalPrice}</p>
    </li>`;

  return newItem;
}

export default class ShoppingCart {
  constructor(key, listElement) {
    this.key = key;
    this.listElement = listElement;
  }

  async init() {
      const list = await getLocalStorage(this.key) || [];
    this.renderList(list);
    
    if (list.length > 0) {
      this.calculateTotal(list);
    }
  }
  displayCartTotal(total) {
    const cartFooter = document.querySelector(".cart-footer");
    const cartTotalElement = document.querySelector(".cart-total");

    cartTotalElement.innerHTML = `Total: $${total.toFixed(2)}`;

    cartFooter.classList.remove("hide");
  }
  
  calculateTotal(list) {
    const total = list.reduce((accumulator, item) => {
      return accumulator + parseFloat(item.FinalPrice);
    }, 0);

    this.displayCartTotal(total);
  }


  calculateTotal(list) {
    const total = list.reduce((accumulator, item) => {
      return accumulator + parseFloat(item.FinalPrice);
    }, 0);

    this.displayCartTotal(total);
  }

  displayCartTotal(total) {
    const cartFooter = document.querySelector(".cart-footer");
    const cartTotalElement = document.querySelector(".cart-total");

    cartTotalElement.innerText = `Total: $${total.toFixed(2)}`;

    cartFooter.classList.remove("hide");
  }

  renderList(list) {
    renderListWithTemplate(cartItemTemplate, this.listElement, list);
  }
}