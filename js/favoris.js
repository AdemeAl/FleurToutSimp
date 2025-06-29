document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("favoris-list");
  const emptyMessage = document.getElementById("empty-message");
  const clearBtn = document.getElementById("clear-favoris");

  let favoris = JSON.parse(localStorage.getItem("favoris")) || [];

  // Affichage des favoris
  if (!favoris.length) {
    emptyMessage.style.display = "block";
    return;
  }

  favoris.forEach((produit) => {
    if (!produit || !produit.images || !produit.images[0]) return;

    const card = document.createElement("div");
    card.className = "favoris-card";
    card.innerHTML = `
      <a href="product.html?id=${produit.id}" style="text-decoration: none;">
        <img src="${produit.images[0]}" alt="${produit.nom}">
        <h3>${produit.nom}</h3>
        <p>${produit.description || ""}</p>
      </a>
    `;
    container.appendChild(card);
  });

  //  Supprimer tous les favoris
  clearBtn.addEventListener("click", () => {
    if (confirm("Êtes-vous sûr de vouloir tout supprimer ?")) {
      localStorage.removeItem("favoris");
      container.innerHTML = "";
      emptyMessage.style.display = "block";
    }
  });
});
