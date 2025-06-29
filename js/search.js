// Script affichant une liste de produit recupérés dans un fichier JSON

fetch("/data.json")
  .then((response) => response.json())
  .then((data) => {
    const productsList = document.getElementById("products-list");

    function createProductList(data) {
      data.forEach((product) => {
        const productDiv = document.createElement("div");
        productDiv.className = "product";
        // Ajout de code html a la page
        productDiv.innerHTML = `
          <a href="/html/product.html?id=${product.id}">
            <img src="${product.images[0]}" alt="${product.nom}">
            <div class="product-details">
              <div class="product-title">${product.nom}</div>
              <div class="product-price">$${product.prix.toFixed(2)}</div>
            </div>
          </a>
          
        `;

        productsList.appendChild(productDiv);
      });
    }
    createProductList(data);
    // Barre de recherche
    const resetBtn = document.querySelector(".reset");

    resetBtn.addEventListener("click", () => {
      createProductList(data);
    });
    const searchInput = document.querySelector("#search");

    searchInput.addEventListener("input", filterData);
    function filterData(e) {
      productsList.innerHTML = "";
      const searchedString = e.target.value.toLowerCase();
      const filteredArray = data.filter((el) =>
        el.nom.toLowerCase().includes(searchedString)
      );

      createProductList(filteredArray);
    }
  })
  // Affiche un message d'erreur dans la console si jamais une erreur est remarqué
  .catch((error) => console.error("Erreur de chargement des produits:", error));
