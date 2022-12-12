// Déborah Scheuren
// Fichier de gestion des éléments produits
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
        let htmlAAjoute = "";
        htmlAAjoute += '<a href="./product.html?id=' + product._id + '">';
        htmlAAjoute += '<article>';
        htmlAAjoute += '<img src="' + product.imageUrl + '" alt="' + product.altTxt + '">';
        htmlAAjoute += '<h3 class="productName">' + product.name + '</h3>';
        htmlAAjoute += '<p class="productDescription">' + product.description + '</p>';
        htmlAAjoute += '</article>';
        htmlAAjoute += '</a>';

        itemsHtml.innerHTML += htmlAAjoute;
    }
}

