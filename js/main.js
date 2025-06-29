

// Script Js qui fait fonctionne le formulaire de contact
document
  .getElementById("contact-form")
  .addEventListener("submit", function (event) {
    event.preventDefault(); // Empêche le rechargement de la page
    emailjs.init("Eshqmhpw5ASzioUtU");
    // Récupère les données du formulaire

    // Envoie les données à EmailJS
    emailjs
      .sendForm("service_sw51fap", "template_eeft5zp", this) 
      .then(
        function (response) {
          // Affiche d'un message de confirmation
          document.getElementById("confirmation-message").style.display =
            "block";
          document.getElementById("contact-form").style.display = "none";
          console.log("Message envoyé avec succès", response);
        },
        function (error) {
          console.error("Erreur lors de l'envoi du message", error);
        }
      );
  });
