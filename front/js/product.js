// Déborah Scheuren
// Script d'affichage de la page produit
// 12.12.2022

//stockage dans la variable urlStr de l'url de la page courante
var urlStr = window.location.href;
console.log('url = ' + urlStr);

//création d'un objet URL stocké dans la variable url à partir de urlStr
var url = new URL(urlStr);
// création d'un objet URLSearchParams stocké dans la variable searchParams à partir de url.search
var searchParams = new URLSearchParams(url.search);
console.log(url.search)
// Création d'une variable id qui va stocker le paramètre id dans l'url trouvé grâce à la méthode get de l'objet URLSearchParams
var id = searchParams.get('id');
console.log(id);

// Récupération id des produits

fetch('http://localhost:3000/api/products/' + id)
    .then(response => response.json())
    .then(data => {
        console.log(data);
        displayProduct(data)
    });

function displayProduct(productInfo) {
    const titleProduct = document.querySelector('#title');
    titleProduct.innerHTML = productInfo.name;
    const priceProduct = document.querySelector('#price');
    priceProduct.innerHTML = productInfo.price;
    const descriptionProduct = document.querySelector('#description');
    descriptionProduct.innerHTML = productInfo.description;
    //en cours de création

    const colorProduct = document.querySelector('#colors');
    for (let color of productInfo.colors) {

    }
    colorProduct.innerHTML = productInfo.colors;
}
