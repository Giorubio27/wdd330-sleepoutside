import ExternalServices from "./ExternalServices.mjs";
import { getLocalStorage } from "./utils.mjs";

const services = new ExternalServices();

function formDataToJSON(formElement) {
    const formData = new FormData(formElement);
    const convertedJSON = {};

    formData.forEach(function (value, key) {
        convertedJSON[key] = value;
    });

    return convertedJSON;
}

function packageItems(items) {
    return items.map((item) => ({
        id: item.Id || item.id, // Handle potential casing differences
        price: item.FinalPrice,
        name: item.Name,
        quantity: 1,
    }));
}



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



    async checkout(form) {
        // Force calculations to ensure this.tax, this.shipping, etc. are set
        this.calculateOrderTotal();

        const json = formDataToJSON(form);

        // Add these required fields directly to the json object
        json.orderDate = new Date().toISOString();

        // Convert numbers to strings with 2 decimal places to match server expectations
        json.orderTotal = this.orderTotal.toFixed(2);
        json.tax = this.tax.toFixed(2);
        json.shipping = this.shipping; // This is usually fine as a number, or use .toString()
        json.items = packageItems(this.list);

        console.log("Submitting Order Payload:", json);

        try {
            const res = await services.checkout(json);
            console.log("Order placed successfully:", res);

            // Success: Clear cart and redirect
            localStorage.removeItem(this.key);


        } catch (err) {
            // If it hits this catch, the redirect above is skipped.
            // This log will tell you exactly what the server didn't like.
            console.log("Server Error:", err);
        }
    }


}




