import ExternalServices from "./ExternalServices.mjs";
import ProductList from "./ProductList.mjs";
import { getParam, loadHeaderFooter } from "./utils.mjs";


loadHeaderFooter();

const category = getParam("category");
const externalData = new ExternalServices();
const listElement = document.querySelector(".product-list");
const productList = new ProductList(category, externalData, listElement);

productList.init();

