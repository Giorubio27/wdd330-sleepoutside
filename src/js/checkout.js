import { loadHeaderFooter } from "./utils.mjs";
import CheckoutProcess from "./CheckoutProcess.mjs";



loadHeaderFooter();

const myCheckout = new CheckoutProcess("so-cart", ".order-summary");

myCheckout.init();

document.querySelector("#zip").addEventListener("blur", () => {
    myCheckout.calculateOrderTotal();
});


document.forms["checkout-form"].addEventListener("submit", (e) => {
    e.preventDefault();
    const myForm = document.forms[0];
    const chk_status = myForm.checkValidity();
    myForm.checkValidity();
    if (chk_status)
        myCheckout.checkout(e.target);
});