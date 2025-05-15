import { setLocalStorage, getLocalStorage } from "./utils.mjs";

export default class ProductDetails {
  constructor(productId, dataSource) {
    this.productId = productId;
    this.product = {};
    this.dataSource = dataSource;
  }
  async init() {
    // use the datasource to get the details for the current product.
    // findProductById will return a promise! use await or .then() to process it
    this.product = await this.dataSource.findProductById(this.productId);
    // the product details are needed before rendering the HTML
    this.renderProductDetails();
    // once the HTML is rendered, add a listener to the Add to Cart button
    // Notice the .bind(this). This callback will not work if the bind(this) is missing. Review the readings from this week on 'this' to understand why.
    document
      .getElementById("addToCart")
      .addEventListener("click", this.addProductToCart.bind(this));
  }
  addProductToCart() {
    let cart;

    if (getLocalStorage("so-cart") === null) {
      cart = [];
    } else {
      cart = getLocalStorage("so-cart");
    }

    cart.push(this.product);
    setLocalStorage("so-cart", cart);
  }
  renderProductDetails() {
    productDetailsTemplate(this.product);
  }
}

// Versión principal usando IDs para mayor claridad y mantenibilidad
function productDetailsTemplate(product) {
  //document.querySelector(".divider").textContent = ''
  document.querySelector("#product__image").src = product.Image;
  document.querySelector("#product__image").alt = product.NameWithoutBrand;
  document.querySelector(".product-card__price").textContent =`$${product.FinalPrice}`;
  document.querySelector(".product__color").textContent = product.Colors[0].ColorName;
  document.querySelector(".product__description").innerHTML = product.DescriptionHtmlSimple;
}

/*
  Una solución alternativa más directa:
  Utiliza el orden de los hijos dentro del contenedor .product-detail.
  Esto funciona bien si el HTML no cambia de estructura.
*/
// Una solución alternativa
// function productDetailsTemplate(product) {
  // const sectionBody = document.querySelector(".product-detail").children;
  // console.log(sectionBody);
  // sectionBody[0].textContent = product.Brand.Name;
  // sectionBody[1].textContent = product.NameWithoutBrand;
  // sectionBody[2].src = product.Image;
  // sectionBody[3].textContent = `$${product.FinalPrice}`;
  // sectionBody[4].textContent = product.Colors[0].ColorName;
  // sectionBody[5].innerHTML = product.DescriptionHtmlSimple;
// }

// BrotherBlazzard Solution;
// ************* Alternative Display Product Details Method *******************
// function productDetailsTemplate(product) {
//   return `<section class="product-detail"> <h3>${product.Brand.Name}</h3>
//     <h2 class="divider">${product.NameWithoutBrand}</h2>
//     <img
//       class="divider"
//       src="${product.Image}"
//       alt="${product.NameWithoutBrand}"
//     />
//     <p class="product-card__price">$${product.FinalPrice}</p>
//     <p class="product__color">${product.Colors[0].ColorName}</p>
//     <p class="product__description">
//     ${product.DescriptionHtmlSimple}
//     </p>
//     <div class="product-detail__add">
//       <button id="addToCart" data-id="${product.Id}">Add to Cart</button>
//     </div></section>`;
// }