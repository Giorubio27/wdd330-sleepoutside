// wrapper for querySelector...returns matching element
export function qs(selector, parent = document) {
  return parent.querySelector(selector);
}
// or a more concise version if you are into that sort of thing:
// export const qs = (selector, parent = document) => parent.querySelector(selector);

// retrieve data from localstorage
export function getLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}
// save data to local storage
export function setLocalStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}
// set a listener for both touchend and click
export function setClick(selector, callback) {
  qs(selector).addEventListener("touchend", (event) => {
    event.preventDefault();
    callback();
  });
  qs(selector).addEventListener("click", callback);
}

export function getParam(param) {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const product = urlParams.get(param);
  return product;
}

export function renderListWithTemplate(templateFn, parentElement, list, position = "afterbegin", clear = false) {
  const htmlStrings = list.map(templateFn);

  if (clear) {
    parentElement.innerHTML = "";

  }
  parentElement.insertAdjacentHTML(position, htmlStrings.join(''));
}

export function renderWithTemplate(template, parentElement, data, callback) {
  parentElement.innerHTML = template;
  if (callback) {
    callback(data);
  }


}
export async function loadTemplate(templatePath) {
  const response = await fetch(templatePath);
  const template = await response.text();
  return template;
}

export async function loadHeaderFooter(headerPath = "../partials/header.html", footerPath = "../partials/footer.html") {
  const headerTemplate = await loadTemplate(headerPath);
  const footerTemplate = await loadTemplate(footerPath);

  const headerElement = document.querySelector("header");
  const footerElement = document.querySelector("footer");


  renderWithTemplate(headerTemplate, headerElement);
  renderWithTemplate(footerTemplate, footerElement);

}

export function alertMessage(message, scroll = true) {

  const alert = document.createElement("div");
  alert.classList.add("alert");

  alert.innerHTML = `<span>${message}</span> <span>X</span>`;

  alert.addEventListener("click", function (e) {

    if (e.target.innerText === "X") {
      main.removeChild(this);
    }
  })

  const body = document.querySelector("body");
  body.prepend(alert);

  if (scroll) {
    window.scroll(0, 0);
  }
}


