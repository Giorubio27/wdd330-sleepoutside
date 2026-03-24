import ProductData from "./ProductData.mjs";
import ProductList from "./ProductList.mjs";
import { loadHeaderFooter } from "./utils.mjs";


loadHeaderFooter();

const productData = new ProductData("tents");
const productList = new ProductList("tents", productData, document.getElementById("product-list"));

productList.init();