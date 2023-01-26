// Déborah Scheuren
// Script d'affichage de la page produit
// 12.12.2022

//stockage dans la variable urlStr de l'url de la page courante
let urlStr = window.location.href;
// console.log('url = ' + urlStr);

//création d'un objet URL stocké dans la variable url à partir de urlStr
let url = new URL(urlStr);
// création d'un objet URLSearchParams stocké dans la variable searchParams à partir de url.search
let searchParams = new URLSearchParams(url.search);
// console.log(url.search)
// Création d'une variable id qui va stocker le paramètre id dans l'url trouvé grâce à la méthode get de l'objet URLSearchParams
let id = searchParams.get('id');
// console.log(id);

// Récupération id des produits

fetch('http://localhost:3000/api/products/' + id)
    .then(response => response.json())
    .then(data => {
        // console.log(data);
        displayProduct(data)
    });

// Fonction qui va récupère les données de la promesse .then(data) pour injecter les valeurs dans le fichier html
function displayProduct(productInfo) {

    //Modification du titre de la page
    document.title = productInfo.name;

    let imgProduct = document.querySelector('.item__img');
    imgProduct.innerHTML += '<img src="' + productInfo.imageUrl + '" alt="' + productInfo.altTxt + '"></img>';

    // console.log(imgProduct);
    //Modification du titre
    let titleProduct = document.querySelector('#title');
    titleProduct.innerHTML = productInfo.name;

    //Modification du prix
    let priceProduct = document.querySelector('#price');
    priceProduct.innerHTML = productInfo.price;

    //Modification de la description
    let descriptionProduct = document.querySelector('#description');
    descriptionProduct.innerHTML = productInfo.description;

    //Modification des couleurs
    const colorProduct = document.querySelector('#colors');
    for (let color of productInfo.colors) {
        // console.log(color);
        colorProduct.innerHTML += '<option value="' + color + '">' + color + '</option>';
    }
}

// Récupération des données par l'utilisateur pour l'envoyer au panier
const buttonAddCart = document.querySelector('#addToCart');
buttonAddCart.addEventListener("click", function (event) {

    let addProduct = {
        id: 0,
        quantity: 0,
        colors: ''
    };

    addProduct.id = id;
    addProduct.quantity = parseInt(document.getElementById('quantity').value, 10);
    addProduct.colors = document.getElementById('colors').value;

    let indexPanier = 0;
    let objetFound = false;

    let objLinesOut = localStorage.getItem("cart");
    let productCart = JSON.parse(objLinesOut);
    // console.log(objLinesOut);
    // console.log(productCart);

    if (productCart == undefined) {
        productCart = [];
    }

    for (let i in productCart) {
        // console.log("Produit dans le panier : " + productCart[i].id);
        if (addProduct.id == productCart[i].id && addProduct.colors == productCart[i].colors) {
            indexPanier = i;
            objetFound = true;
            // console.log('Objet déjà trouvé dans le panier');
            break;
        }
    }
    // Alerte pour obliger l'utilisateur a entrer une valeur comprise entre 1 et 100

    if (addProduct.quantity < 1) {
        alert("La quantité minimale est de 1");
        addProduct.quantity = 1;
    } else if (addProduct.quantity > 100) {
        alert("La quantité maximale est de 100");
        addProduct.quantity = 100;
    }

    if (objetFound == true) {
        productCart[indexPanier].quantity += addProduct.quantity;
    } else {
        productCart.push(addProduct);
    }
    // console.log(productCart);

    let objLines = JSON.stringify(productCart);
    localStorage.setItem("cart", objLines);
}, false);
