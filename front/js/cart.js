// Déborah Scheuren
// Script d'affichage des produits dans la page panier
// 05.01.2023

// ---------------Modification de la balise title du navigateur
document.title = "Mon panier | Kanap";

let objLinesOut = localStorage.getItem("cart");
//-----------------JSON.parse pour convertir les données au format JSON qui sont dans le localStorage en objet javascript--------------------

var productCart = JSON.parse(objLinesOut);

let totalQuantity = 0;
let totalPrice = 0;
let currentIndex = 0;

// ----------------Récupération  des informations de l'API en fonction des éléments ajoutés au panier 
for (let product of productCart) {
    console.log(product);
    fetch('http://localhost:3000/api/products/' + product.id)
        .then(response => response.json())
        .then(data => {
            // console.log(data);
            displayProductCart(data, product);
            // -----------------Récupération de la quantité des produits et le prix ajoutés au panier et affichage de celui-ci
            totalQuantity += product.quantity;
            totalPrice += data.price * product.quantity;
            if (currentIndex == productCart.length - 1) {
                const totalQuantityHtml = document.getElementById("totalQuantity");
                totalQuantityHtml.innerHTML = totalQuantity;
                console.log(totalQuantity);

                const totalPriceHtml = document.getElementById("totalPrice");
                totalPriceHtml.innerHTML = totalPrice;
                console.log(totalPrice);
            }
            currentIndex += 1;
        });
}

// ---------------- Fonction qui va modifier le HTML en fonction des éléments ajoutés
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

// ------------------- Modification de l'image et du titre 
let imgProduct = document.querySelector('.item__img');
imgProduct.innerHTML += '<img src="' + productInfo.imageUrl + '" alt="' + productInfo.altTxt + '"></img>';
