import ExternalServices from "./ExternalServices.mjs";
import { getLocalStorage } from "./utils.mjs";

function formDataToJSON(formElement) {
    const formData = new FormData(formElement);
    const convertedJSON = {};

    formData.forEach(function (value, key) {
        convertedJSON[key] = value;
    });

    return convertedJSON;
}

const services = new ExternalServices();

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
        this.list = getLocalStorage(this.key) || [];

        this.calculateItemSummary();
    }

    calculateItemSummary() {
        // Select the summary elements from the HTML
        const subtotalElement = document.querySelector(this.outputSelector + " #subtotal");


        this.itemTotal = this.list.reduce((sum, item) =>
            sum + parseFloat(item.FinalPrice), 0);

        if (subtotalElement) {
            subtotalElement.innerText = `$${this.itemTotal.toFixed(2)}`;
        }
    }

    calculateOrderTotal() {
        if (this.list.length > 0) {
            this.tax = this.itemTotal * .06;
            this.shipping = 10 + (this.list.length - 1) * 2;

            this.orderTotal = this.itemTotal + this.tax + this.shipping;

            this.displayOrderTotals();
        }
    }

    displayOrderTotals() {
        const shippingElement = document.querySelector(this.outputSelector + " #shipping");
        const taxElement = document.querySelector(this.outputSelector + " #tax");
        const totalElement = document.querySelector(this.outputSelector + " #orderTotal");

        shippingElement.innerText = `$${this.shipping.toFixed(2)}`;
        taxElement.innerText = `$${this.tax.toFixed(2)}`;
        totalElement.innerText = `$${this.orderTotal.toFixed(2)}`;
    }

    packageItems(items) {
        return items.map((item) => ({
            id: item.id,
            price: item.FinalPrice,
            name: item.Name,
            quantity: 1,
        }));
    }

    async CheckoutProcess(form) {
        const json = formDataToJSON(form);

        json.orderDate = new Date().toISOString();
        json.orderTotal = this.orderTotal;
        json.tax = this.tax;
        json.shipping = this.shipping;
        json.items = this.packageItems(this.list);

        console.log("Submitting Order:", json);

        try {
            const res = await services.checkout(json)
            console.log("Server Response:", res)
        } catch (err) {
            console.error("Checkout Error", err)
        }



    }
}



