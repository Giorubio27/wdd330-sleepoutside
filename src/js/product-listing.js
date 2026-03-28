import ProductData from "./ProductData.mjs";
import ProductList from "./ProductList.mjs";
import { getParam, loadHeaderFooter } from "./utils.mjs";


loadHeaderFooter();

const category = getParam("category");
const productData = new ProductData(category);
const productList = new ProductList(category, productData, document.querySelector(".product-list"));

productList.init();

// const productData = new ProductData("tents");
// const productList = new ProductList("tents", productData, document.getElementById("product-list"));

// productList.init();