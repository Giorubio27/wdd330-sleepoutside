import { renderListWithTemplate } from "./utils.mjs";

function productCardTemplate(product) {
    return `<li class="product-card">
    <a href="product_pages/index.html?product=${product.Id}">
        <img src="${product.Image.PrimaryMedium}" alt="${product.NameWithoutBrand}">
        <h2 class="card_name">${product.NameWithoutBrand}</h2>
        <h3 class="card_brand">${product.Brand.Name}</h3>
        <p class="product-card_price">${product.FinalPrice}</p>`;
}

export default class ProductList {

    constructor(category, dataSource, listElement) {
        this.category = category;
        this.dataSource = dataSource;
        this.listElement = listElement;

    }

    async init() {
        // Inside ProductList class init()
        const list = await this.dataSource.getData(this.category);
        this.renderList(list);
    }

    renderList(list) {

        renderListWithTemplate(productCardTemplate, this.listElement, list);
    }

}


