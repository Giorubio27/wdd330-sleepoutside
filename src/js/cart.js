import { loadHeaderFooter } from "./utils.mjs";
import ShoppingCart from "./shoppingCart.mjs";

loadHeaderFooter();

const cart = new ShoppingCart("so-cart", document.querySelector(".product-list"));
cart.init();


