// Déborah Scheuren
// Script d'affichage du numéro de commande 
// 15.01.2023

//stockage dans la variable urlStr de l'url de la page courante
let urlStr = window.location.href;
// console.log('url = ' + urlStr);

//création d'un objet URL stocké dans la variable url à partir de urlStr
let url = new URL(urlStr);
// création d'un objet URLSearchParams stocké dans la variable searchParams à partir de url.search
let searchParams = new URLSearchParams(url.search);
// console.log(url.search)
// Création d'une variable id qui va stocker le paramètre id dans l'url trouvé grâce à la méthode get de l'objet URLSearchParams
let orderId = searchParams.get('orderId');
// console.log(id);


document.getElementById("orderId").textContent = orderId; 