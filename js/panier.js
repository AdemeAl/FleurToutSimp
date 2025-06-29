
// Lorsque la page est affiche , la fonction est executé
document.addEventListener("DOMContentLoaded", () => {
  afficherPanier(); 
});

function afficherPanier() {
  // On récupère dans le localStorage(stockage du site , une sorte de cookies ), les éléments du panier 
  const panier = JSON.parse(localStorage.getItem("panier")) || []; 
  const container = document.getElementById("panier-container");
  const emptyMessage = document.getElementById("empty-message");
  const totalPanier = document.getElementById("total-panier");

  container.innerHTML = "";
  let total = 0;


  if (!panier.length) {
    emptyMessage.style.display = "block";
    totalPanier.style.display = "none";
    return;
  }

  emptyMessage.style.display = "none";


  // Pour chaque produit ajouté au panier ce script ajoute l'article dans le code html
  panier.forEach((produit) => {
    const item = document.createElement("div");
    item.classList.add("cart-item");

    item.innerHTML = `
        <img src="${produit.images[0]}" alt="${
      produit.nom
    }" class="cart-item-img" />
        <div class="cart-item-details">
          <h3>${produit.nom}</h3>
          <p>Quantité : ${produit.quantite}</p>
          <p>${(produit.prix * produit.quantite).toFixed(2)} €</p>
          <button onclick="supprimerUneQuantite(${
            produit.id
          })" class="remove-btn">Supprimer</button>
        </div>
    `;

    container.appendChild(item);
    total += produit.prix * produit.quantite;
  });

  totalPanier.innerText = `Total : ${total.toFixed(2)} €`;
}




function supprimerUneQuantite(id) {
  let panier = JSON.parse(localStorage.getItem("panier")) || [];
  const index = panier.findIndex((p) => p.id === id);

  if (index !== -1) {
    if (panier[index].quantite > 1) {
      panier[index].quantite -= 1; // on diminue la quantité
    } else {
      panier.splice(index, 1); // on supprime le produit s’il ne reste qu’un seul
    }

    localStorage.setItem("panier", JSON.stringify(panier));
    afficherPanier();
  }
}

