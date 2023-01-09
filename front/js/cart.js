// Déborah Scheuren
// Script d'affichage des produits dans la page panier
// 05.01.2023

// ---------------Modification de la balise title du navigateur
document.title = "Mon panier | Kanap";

let objLinesOut = localStorage.getItem("cart");
//-----------------JSON.parse pour convertir les données au format JSON qui sont dans le localStorage en objet javascript
var productCart = JSON.parse(objLinesOut);
// ----------------Déclaration des variables
const totalQuantityHtml = document.getElementById("totalQuantity");
const totalPriceHtml = document.getElementById("totalPrice");
const cartItemsHtml = document.getElementById("cart__items");

let totalQuantity = 0;
let totalPrice = 0;

// Fonction qui permet de rechercher les données dans l'API 
function getApiDataById(id) {
  return fetch('http://localhost:3000/api/products/' + id)
    .then(response => response.json())
    .then(data => {
      return data;
    });
}

// ----------------Récupération  des informations de l'API en fonction des éléments ajoutés au panier
async function displayCart() {
  totalQuantity = 0;
  totalPrice = 0;
  cartItemsHtml.innerHTML = "";
  for (let product of productCart) {
    console.log(product);
    let dataApiProduct = await getApiDataById(product.id);
    displayProductCart(dataApiProduct, product);
    // -----------------Récupération de la quantité des produits et le prix ajoutés au panier
    totalQuantity += parseInt(product.quantity, 10);
    totalPrice += dataApiProduct.price * parseInt(product.quantity, 10);
  }

  // Permet d'afficher la quantité et le prix
  totalQuantityHtml.innerHTML = totalQuantity;
  totalPriceHtml.innerHTML = totalPrice;

  // constante qui permet de rechercher tous les éléments de la classe itemQuantity
  const inputsQuantityHtml = document.getElementsByClassName("itemQuantity");
  console.log(inputsQuantityHtml);

  // Boucle qui permet d'ajouter un listener sur chaque élément
  for (let inputQuantityHtml of inputsQuantityHtml) {
    inputQuantityHtml.addEventListener('change', async (event) => {
      console.log('Value changed');
      let currentInputHtml = event.target;
      console.log(currentInputHtml.value);
      let currentArticleHtml = currentInputHtml.closest("article");
      console.log(currentArticleHtml.dataset.id);

      totalQuantity = 0;
      totalPrice = 0;
      for (let indexProduct in productCart) {
        if (currentArticleHtml.dataset.id == productCart[indexProduct].id && currentArticleHtml.dataset.color == productCart[indexProduct].colors) {
          console.log('bonjour');
          productCart[indexProduct].quantity = parseInt(currentInputHtml.value, 10);
        }

        let dataApiProduct = await getApiDataById(productCart[indexProduct].id);
        totalQuantity += parseInt(productCart[indexProduct].quantity, 10);
        totalPrice += dataApiProduct.price * parseInt(productCart[indexProduct].quantity, 10);
      }

      // Permet d'afficher la quantité et le prix mis à jour 
      totalQuantityHtml.innerHTML = totalQuantity;
      totalPriceHtml.innerHTML = totalPrice;

      let objLines = JSON.stringify(productCart);
      localStorage.setItem("cart", objLines);
    }, false);
  }

  const inputsDeleteHtml = document.getElementsByClassName("deleteItem");
  console.log(inputsDeleteHtml);
  // Boucle qui permet d'ajouter un listener sur chaque élément
  for (let inputDeleteHtml of inputsDeleteHtml) {
    inputDeleteHtml.addEventListener('click', async (event) => {
      console.log('Bouton supprimer cliqué');
      let currentDeleteHtml = event.target;
      let currentArticleHtml = currentDeleteHtml.closest("article");
      console.log(currentArticleHtml.dataset.id);

      totalQuantity = 0;
      totalPrice = 0;

      // Boucle qui permet de parcourir les indexs du panier
      let productCartCopy = Array.from(productCart);
      for (let indexProduct in productCart) {
        if (currentArticleHtml.dataset.id == productCart[indexProduct].id && currentArticleHtml.dataset.color == productCart[indexProduct].colors) {
          console.log("supression de l'élément");
          productCartCopy.splice(indexProduct, 1);
          currentArticleHtml.remove();
        }
        else {
          let dataApiProduct = await getApiDataById(productCart[indexProduct].id);
          totalQuantity += parseInt(productCart[indexProduct].quantity, 10);
          totalPrice += dataApiProduct.price * parseInt(productCart[indexProduct].quantity, 10);
        }
      }
      productCart = productCartCopy;
      // Permet d'afficher la quantité et le prix mis à jour 
      totalQuantityHtml.innerHTML = totalQuantity;
      totalPriceHtml.innerHTML = totalPrice;

      let objLines = JSON.stringify(productCart);
      localStorage.setItem("cart", objLines);
    }, false);
  }

}

// ---------------- Fonction qui va modifier le HTML en fonction des éléments ajoutés
function displayProductCart(dataApiProduct, product) {
  console.log(dataApiProduct);
  cartItemsHtml.innerHTML += `<article class="cart__item" data-id="${product.id}" data-color="${product.colors}">
    <div class="cart__item__img">
      <img src="${dataApiProduct.imageUrl}" alt="${dataApiProduct.altTxt}">
    </div>
    <div class="cart__item__content">
      <div class="cart__item__content__description">
        <h2>${dataApiProduct.name}</h2>
        <p>${product.colors}</p>
        <p>${dataApiProduct.price} €</p>
      </div>
      <div class="cart__item__content__settings">
        <div class="cart__item__content__settings__quantity">
          <p>Qté : </p>
          <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${product.quantity}">
        </div>
        <div class="cart__item__content__settings__delete">
          <p class="deleteItem">Supprimer</p>
        </div>
      </div>
    </div>
  </article>`;
}

displayCart();

// const itemQuantityHtml = document.getElementsByClassName("itemQuantity");
// itemQuantityHtml.addEventListener('change', changeQuantity(), false);