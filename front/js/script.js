// Déborah Scheuren
// Script d'affichage de la page produit sur la page d'accueil
// 12.12.2022

//Appel API des différents produits
fetch('http://localhost:3000/api/products')
    .then(response => response.json())
    .then(data => {
        displayProducts(data);
    })
    .catch(error => {
        alert("Erreur : " + error);
    });

//Affichage des produits
function displayProducts(data) {
    const itemsHtml = document.querySelector('#items');
    for (let product of data) {
        itemsHtml.innerHTML += `<a href="./product.html?id=${product._id}">
        <article>
            <img src="${product.imageUrl}" alt="${product.altTxt}">
            <h3 class="productName">${product.name}</h3>
            <p class="productDescription">${product.description}</p>
        </article>
        </a>`;
    }
}

