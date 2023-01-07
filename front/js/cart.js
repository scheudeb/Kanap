// Déborah Scheuren
// Script d'affichage de la page panier
// 05.01.2023

// Modification de la balise title du navigateur
document.title = "Mon panier | Kanap";

let objLinesOut = localStorage.getItem("cart");
//-----------------JSON.parse c'est pour convertir les données au format JSON qui sont dans le localStorage en objet javascript--------------------

var productCart = JSON.parse(objLinesOut);

//--------------------Sélection de la balise de la page product.html dans laquel on va insérer les produits et leurs infos-------------------------
// const cartItemsHtml = document.getElementById("cart__items");
console.log("productCart");
console.log(productCart);
console.log("product");
for (let product of productCart) {
    console.log(product);
    fetch('http://localhost:3000/api/products/' + product.id)
        .then(response => response.json())
        .then(data => {
            // console.log(data);
            displayProductCart(data, product)
        });
}

function displayProductCart(data, product) {
    console.log(data);
    const cartItemsHtml = document.getElementById("cart__items");
    cartItemsHtml.innerHTML += `<article class="cart__item" data-id="${product.id}" data-color="${product.colors}">
    <div class="cart__item__img">
      <img src="${data.imageUrl}" alt="${data.altTxt}">
    </div>
    <div class="cart__item__content">
      <div class="cart__item__content__description">
        <h2>${data.name}</h2>
        <p>${product.colors}</p>
        <p>${data.price} €</p>
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


let imgProduct = document.querySelector('.item__img');
imgProduct.innerHTML += '<img src="' + productInfo.imageUrl + '" alt="' + productInfo.altTxt + '"></img>';
//_______________________________________________Déclaration des variables________________________________________________________________________
let compositionProduitsPanier = [];
//-----------On déclare nos variables globales pour pouvoir calculer la quantité total d'articles et le prix total du panier----------------------
let totalPrice = 0;
let totalQuantity = 0;
let quantityProductPanier = 0;
let priceProductPanier = 0;
let totalProductPricePanier = 0;
let myProducts = [];
const findProducts = 0;
