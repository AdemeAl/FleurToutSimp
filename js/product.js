// Récupérer l'ID du produit depuis l'URL
const urlParams = new URLSearchParams(window.location.search);
const productId = parseInt(urlParams.get("id")); // ID du produit passé dans l'URL

// Charger les produits depuis le fichier JSON dans une page produit à l'aide de la fonction fetch()
fetch("/data.json")
  .then((response) => response.json())
  .then((data) => {
    // Trouver le produit avec l'ID correspondant
    const product = data.find((p) => p.id === productId);

    if (product) {
      const leftContent = document.querySelector(".left-content");
      const rightContent = document.querySelector(".right-content");

      // Vérifie la présence des images secondaires(en bas de l'image principale)
      const hasSecond = product.images[1];
      const hasThird = product.images[2];

      // Génère les miniatures seulement si disponibles
      let thumbnailsHTML = "";
      if (hasSecond && hasThird) {
        thumbnailsHTML = `
          <div class="thumbnails">
            <img src="${product.images[0]}" class="thumb" alt="miniature 1">
            <img src="${product.images[1]}" class="thumb" alt="miniature 2">
            <img src="${product.images[2]}" class="thumb" alt="miniature 3">
          </div>`;
      }
      // Changer le titre
      document.title = `${product.nom}`;
      // Injecter le HTML dans .left-content(partie gauche de l'affichage)
      leftContent.innerHTML = `
        <div class="gallery">
          <div class="zoom-container">
            <img
              id="main-image"
              class="zoom-target"
              src="${product.images[0]}"
              data-zoom="${product.images[0]}"
              alt="${product.nom}"
            />
          </div>
          ${thumbnailsHTML}
        </div>
      `;

      // Injecter le HTML dans .right-content(partie droite)
      rightContent.innerHTML = `
        <div class="top">
          <h1 class="product-name">${product.nom}</h1>
          <div className="icons">
            <i class="fas fa-shopping-cart" onclick='ajouterAuPanier(this)' data-produit='${JSON.stringify(
              product
            )}'></i> 
            <i onclick='ajouterFavoris(this)' data-produit='${JSON.stringify(
              product
            )}' class="fa-solid fa-heart"></i>
          </div>
        
        </div>
        <div class="categorie">Catégorie: ${product.categorie}</div>
        <div class="description">
          <h3>Description</h3>
          <p class="product-description">${product.description}</p>
        </div>
        <div class="price">$${product.prix.toFixed(2)}</div>
        
        <button class="buy-button"><a style="text-decoration: none; color:white;" href="https://buy.stripe.com/test_aFa9AM5ve1pG9seeVE6c000"> Acheter</a></button>
      `;

      // Initialiser Drift.js après insertion de l'image, il s'agit d'une librairie permettant de zoomez sur les images
      const mainImage = document.getElementById("main-image");
      const zoomContainer = document.querySelector(".zoom-container");

      const drift = new Drift(mainImage, {
        paneContainer: zoomContainer,
        inlinePane: false,
        hoverBoundingBox: true,
      });

      

      // Gérer les miniatures en bas de l'image si elles existent
      const thumbs = document.querySelectorAll(".thumb");
      if (thumbs.length > 0) {
        thumbs.forEach((thumb) => {
          thumb.addEventListener("click", () => {
            mainImage.src = thumb.src;
            mainImage.setAttribute("data-zoom", thumb.src);
            drift.setZoomImageURL(thumb.src);
          });
        });
      }
    } else {
      document.body.innerHTML = "<h2>Produit introuvable</h2>";
    }
    // Code permetttant l'ajout aux favoris d'un article
    window.ajouterFavoris = function (el) {
      const produit = JSON.parse(el.getAttribute("data-produit"));
      let favoris = JSON.parse(localStorage.getItem("favoris")) || [];

      const dejaDansFavoris = favoris.some(
        (item) => item && item.id === produit.id
      );

      if (!dejaDansFavoris) {
        favoris.push(produit);
        localStorage.setItem("favoris", JSON.stringify(favoris));
        el.classList.add("favori");

        alert("Ajouté aux favoris !");
      } else {
        alert("Ce produit est déjà dans vos favoris.");
      }
    };
    // La meme chose pour l'ajout au panier
    window.ajouterAuPanier = function (el) {
      const produit = JSON.parse(el.getAttribute("data-produit"));
      let panier = JSON.parse(localStorage.getItem("panier")) || [];

      const existant = panier.find((p) => p.id === produit.id);
      if (existant) {
        existant.quantite += 1;
      } else {
        produit.quantite = 1;
        panier.push(produit);
      }

      localStorage.setItem("panier", JSON.stringify(panier));
      alert("Produit ajouté au panier !");
    };
  })
  .catch((error) => console.error("Erreur de chargement du produit :", error));
