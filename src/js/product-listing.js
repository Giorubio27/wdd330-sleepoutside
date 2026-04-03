import ExternalServices from "./ExternalServices.mjs";
import ProductList from "./ProductList.mjs";
import { getParam, loadHeaderFooter } from "./utils.mjs";


loadHeaderFooter();

const category = getParam("category");
const productData = new ExternalServices();
const listElement = document.querySelector(".product-list");
const productList = new ProductList(category, productData, listElement);

productList.init();

// const productData = new ProductData("tents");
// const productList = new ProductList("tents", productData, document.getElementById("product-list"));

// productList.init();