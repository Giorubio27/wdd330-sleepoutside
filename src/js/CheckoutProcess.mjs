import { getLocalStorage } from "./utils.mjs";

export default class CheckoutProcess {

    constructor(key, outputSelector) {
        this.key = key;
        this.outputSelector = outputSelector;
        this.list = [];
        this.itemTotal = 0;
        this.shipping = 0;
        this.tax = 0;
        this.orderTotal = 0;

    }
    async init() {
        this.list = getLocalStorage(this.key);
        this.calculateItemSummary();
    }

    calculateItemSubtotal() {

    }

    calculateOrderTotal() {
        this.tax = (this.itemTotal * .06);
        this.shipping = 10 + (this.list.length - 1) * 2;
        this.orderTotal = (
            parseFloat(this.itemTotal) +
            parseFloat(this.tax) +
            parseFloat(this.shipping)
        )

        this.displayOrderTotals();
    }

    displayOrderTotals() {
        const taxElement = document.querySelector(`${this.outputSelector} #tax`);
        const shippingElement = document.querySelector(`${this.outputSelector} #shipping`);
        const totalElement = document.querySelector(`${this.outputSelector} #orderTotal`);

        taxElement.innerText = `$${this.tax.toFixed(2)}`;
        shippingElement.innerText = `$${this.shipping.toFixed(2)}`;
        totalElement.innerText = `$${this.orderTotal.toFixed(2)}`;
    }


}


